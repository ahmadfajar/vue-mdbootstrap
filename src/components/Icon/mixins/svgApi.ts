import {
    useFilledIconStyle,
    useNormalizeIconName,
    useResolveRealIconName,
    useResolveIconTheme,
} from '@/components/Icon/mixins/iconApi';
import { cssPrefix } from '@/mixins/CommonApi';
import { CacheManager } from '@/model/CacheManager';
import type { TIconData, TIconOptionProps, TRawCacheItem, TRecord } from '@/types';
import Helper from '@/utils/Helper';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import type { VNode, VNodeArrayChildren, VNodeProps } from 'vue';
import { h } from 'vue';

/**
 * Make an icon data based on the [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) library.
 *
 * @param name   The android icon name with suffix: `_outlined`, `_rounded`,
 *               `_sharp`, `_filled`, `_outlined_filled`, `_rounded_filled`, or `_sharp_filled`.
 * @param filled Use fill style or not.
 * @returns {TIconData} The icon data.
 */
function makeIconData(name?: string, filled?: boolean): TIconData | undefined {
    if (!name) {
        return undefined;
    }

    const strIcon = useNormalizeIconName(name);
    const theme = useResolveIconTheme(strIcon);
    const realName = useResolveRealIconName(strIcon);
    const isFilled = useFilledIconStyle(strIcon) || filled;

    return {
        name: realName,
        icon: strIcon,
        theme: theme,
        variant: isFilled ? 'fill1' : 'default',
    };
}

function googleIconUrl(theme: string, name: string, variant: string): string {
    return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbols${theme}/${name}/${variant}/24px.svg`;
}

/**
 * Get an icon data based on the [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.size=24&icon.color=%23e8eaed&icon.platform=web) icon library.
 *
 * @param name   The android icon name with suffix: `_outlined`, `_rounded` or `_sharp`.
 * @param filled Use fill style or not.
 * @returns {TIconData} Icon data if it is found on the Google Material Symbol.
 */
export async function useGetGoogleIcon(
    name: string,
    filled?: boolean
): Promise<TIconData | undefined> {
    const iconObj = makeIconData(name, filled);
    if (!iconObj) {
        return iconObj;
    }

    const url = googleIconUrl(iconObj.theme, iconObj.name, iconObj.variant!);
    const cache = CacheManager.getItem(url);

    if (cache) {
        return {
            name: iconObj.name,
            icon: iconObj.icon,
            theme: iconObj.theme,
            variant: iconObj.variant,
            data: cache.getValue() as string,
        };
    } else {
        const response = await axios.get(url);

        if (response.status === 200) {
            const item = { key: url, value: response.data } as TRawCacheItem;
            CacheManager.save(item);

            return {
                name: iconObj.name,
                icon: iconObj.icon,
                theme: iconObj.theme,
                variant: iconObj.variant,
                data: response.data,
            };
        }

        return undefined;
    }
}

function createNodeAttrs(attrs: Array<[string, unknown]>): TRecord {
    const props: Record<string, unknown> = {};
    const filtered = attrs
        .filter((el) => el[0].startsWith('@_'))
        .map<[string, unknown]>((el) => {
            const attr = el[0].replace('@_', '');
            return [attr, el[1]];
        });

    filtered.forEach((el) => (props[el[0]] = el[1]));

    return props;
}

function renderChildNodes(children: Array<[string, unknown]>): Array<VNode> {
    const results: Array<VNode> = [];

    children.forEach((el) => {
        if (Helper.isArray(el[1])) {
            (el[1] as Array<object>).forEach((it) => {
                const entries = Object.entries(it);
                const childNodes = entries.filter((it) => !it[0].startsWith('@_'));
                const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));
                results.push(rh);
            });
        } else if (Helper.isObject(el[1])) {
            const entries = Object.entries(el[1] as object);
            const childNodes = entries.filter((it) => !it[0].startsWith('@_'));
            const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));

            results.push(rh);
        }
    });

    return results;
}

export function useRenderIconFromSvg(
    data: string | undefined,
    height: number | string | undefined,
    width: number | string | undefined,
    clazz: unknown
): VNode {
    if (!data) {
        return h('span');
    }

    const parser = new XMLParser({ ignoreAttributes: false });
    const jsonObj = parser.parse(data);
    const svgData = Object.entries(jsonObj.svg);
    const props = createNodeAttrs(svgData);
    const children = svgData.filter((el) => !el[0].startsWith('@_'));
    props['height'] = height;
    props['width'] = width;
    props['class'] = clazz;
    props['fill'] = 'currentColor';
    props['xmlns'] = 'http://www.w3.org/2000/svg';

    return h('svg', props, renderChildNodes(children));
}

export function useSvgClasses(props: Readonly<TIconOptionProps>): TRecord {
    return {
        'mx-auto': true,
        [`${cssPrefix}svg-inline`]: true,
        [`${cssPrefix}spin`]: props.spin,
        [`${cssPrefix}pulse`]: props.pulse,
        [`${cssPrefix}flip-both`]: props.flip === 'both',
        [`${cssPrefix}flip-vertical`]: props.flip === 'vertical',
        [`${cssPrefix}flip-horizontal`]: props.flip === 'horizontal',
        [`${cssPrefix}rotate-90`]: props.rotate && parseInt(props.rotate as string, 10) === 90,
        [`${cssPrefix}rotate-180`]: props.rotate && parseInt(props.rotate as string, 10) === 180,
        [`${cssPrefix}rotate-270`]: props.rotate && parseInt(props.rotate as string, 10) === 270,
    };
}

export const spinnerSvgData =
    'M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z';

type RawProps = VNodeProps & TRecord;

export function useCreateSvgNode(
    clazz: Array<string> | TRecord,
    style: Array<string> | TRecord,
    focusable: boolean,
    aspectRatio?: string | null,
    viewBox?: string | null,
    otherProps?: TRecord,
    children?: string | VNode | VNodeArrayChildren
): VNode {
    const nodeProps: RawProps = {
        xmlns: 'http://www.w3.org/2000/svg',
        class: clazz,
        style: style,
        focusable: focusable ? 'true' : 'false',
        preserveAspectRatio: aspectRatio,
        viewBox: viewBox,
        ...otherProps,
    };
    // @ts-ignore
    return h('svg', nodeProps, children);
}

export function useCreateSvgCircleNode(
    clazz: Array<string> | TRecord,
    style: Array<string> | TRecord,
    radius: number
): VNode {
    return h('circle', {
        class: clazz,
        style: style,
        cx: '50%',
        cy: '50%',
        r: radius,
    });
}

export function useCircleSizeStyles(diameter: number): Record<string, string> {
    const size = `${diameter}px`;

    return {
        width: size,
        height: size,
    };
}

export function useRenderSVG(
    data: string,
    height: number | string,
    width: number | string,
    clazz: unknown
): VNode {
    return useRenderIconFromSvg(data, height, width, clazz);
}
