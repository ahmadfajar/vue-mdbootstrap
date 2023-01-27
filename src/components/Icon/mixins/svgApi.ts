import axios from "axios";
import type {VNode, VNodeArrayChildren, VNodeProps} from "vue";
import {h} from "vue";
import {XMLParser} from "fast-xml-parser";
import {IconLib} from "./IconLib";
import {cssPrefix} from "../../../mixins/CommonApi";
import type {TIconData, TIconOptionProps, TRecord} from "../../../types";
import Helper from "../../../utils/Helper";

/**
 * Find an icon on the Google's icon library.
 *
 * @param {string} name The icon name
 * @returns {TIconData} Icon data if icon exists on the library otherwise `undefined`.
 */
export function findIcon(name: string | undefined): TIconData | undefined {
    if (!name) {
        return undefined;
    }

    const strIcon = name.trim().toLowerCase()
        .replace(" ", "_")
        .replace("-", "_");
    const variant = (strIcon.endsWith("_rounded") || strIcon.endsWith("_round"))
        ? "round"
        : (strIcon.endsWith("_outlined") || strIcon.endsWith("_outline"))
            ? "outlined"
            : (strIcon.endsWith("_sharp") ? "sharp" : "");
    const realName = strIcon.replace(/_outlined|_outline|_filled|_rounded|_round|_sharp/g, "");
    const found = Object.entries(IconLib).find((el) => {
        const arr = el[0].split("::");
        return arr[1] === realName
    });

    if (found !== undefined) {
        return {
            id: found[1],
            name: realName,
            icon: strIcon,
            category: found[0].split("::")[0],
            variant: variant,
        }
    }

    return undefined
}

export function googleIconUrl(theme: string | undefined, icon: string, version: number): string {
    return `https://fonts.gstatic.com/s/i/materialicons${theme}/${icon}/v${version}/24px.svg`;
}

export async function useGoogleIcon(iconObj: TIconData): Promise<TIconData> {
    const resp = await axios.get(googleIconUrl(iconObj.variant, iconObj.name, iconObj.id))
    return {
        id: iconObj.id,
        name: iconObj.name,
        icon: iconObj.icon,
        category: iconObj.category,
        variant: iconObj.variant,
        data: resp.data,
    }
}

function createNodeAttrs(attrs: Array<[string, unknown]>): TRecord {
    const props: Record<string, unknown> = {};
    const filtered = attrs
        .filter(el => el[0].startsWith("@_"))
        .map<[string, unknown]>(el => {
            const attr = el[0].replace("@_", "");
            return [attr, el[1]];
        });

    filtered.forEach(el => props[el[0]] = el[1]);

    return props;
}

function renderChildNodes(children: Array<[string, unknown]>): Array<VNode> {
    const results: Array<VNode> = [];

    children.forEach(el => {
        if (Helper.isArray(el[1])) {
            (el[1] as Array<object>).forEach(it => {
                const entries = Object.entries(it);
                const childNodes = entries.filter(it => !it[0].startsWith("@_"));
                const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));
                results.push(rh);
            });
        } else if (Helper.isObject(el[1])) {
            const entries = Object.entries(el[1] as object);
            const childNodes = entries.filter(it => !it[0].startsWith("@_"));
            const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));

            results.push(rh);
        }
    });

    return results;
}

export function useRenderSvgIcon(
    iconData: TIconData | undefined,
    height: number | string | undefined,
    width: number | string | undefined,
    clazz: unknown,
): VNode {
    if (!iconData || !iconData.data) {
        return h("span");
    }
    const parser = new XMLParser({ignoreAttributes: false});
    const jsonObj = parser.parse(iconData.data);
    const svgData = Object.entries(jsonObj.svg);
    const props = createNodeAttrs(svgData);
    const children = svgData.filter(el => !el[0].startsWith("@_"));
    props["height"] = height;
    props["width"] = width;
    props["class"] = clazz;
    props["fill"] = "currentColor";
    props["xmlns"] = "http://www.w3.org/2000/svg";

    return h("svg", props, renderChildNodes(children))
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
        [`${cssPrefix}rotate-90`]: props.rotate && parseInt(<string>props.rotate, 10) === 90,
        [`${cssPrefix}rotate-180`]: props.rotate && parseInt(<string>props.rotate, 10) === 180,
        [`${cssPrefix}rotate-270`]: props.rotate && parseInt(<string>props.rotate, 10) === 270,
    }
}

export function useCreateSvgComponent(
    data: string,
    height: number | string,
    width: number | string,
    clazz: unknown,
): VNode {
    const svgData = {id: 123, name: 'svg', data: data} as TIconData;
    return useRenderSvgIcon(svgData, height, width, clazz);
}

export const spinnerSvgData = "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z";

type RawProps = VNodeProps & TRecord;

export function useCreateSvgNode(
    clazz: Array<string> | TRecord,
    style: Array<string> | TRecord,
    focusable: boolean,
    aspectRatio?: string | null,
    viewBox?: string | null,
    otherProps?: TRecord,
    children?: string | VNode | VNodeArrayChildren,
): VNode {
    const nodeProps: RawProps = {
        xmlns: "http://www.w3.org/2000/svg",
        class: clazz,
        style: style,
        focusable: focusable ? "true" : "false",
        preserveAspectRatio: aspectRatio,
        viewBox: viewBox,
        ...otherProps
    }
    // @ts-ignore
    return h("svg", nodeProps, children);
}

export function useCreateSvgCircleNode(
    clazz: Array<string> | TRecord,
    style: Array<string> | TRecord,
    radius: number,
): VNode {
    return h("circle", {
        class: clazz,
        style: style,
        cx: "50%",
        cy: "50%",
        r: radius,
    });
}

export function useCircleSizeStyles(diameter: number): Record<string, string> {
    const size = `${diameter}px`;

    return {
        width: size,
        height: size
    }
}
