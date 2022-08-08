import axios from "axios";
import {h, VNode} from "vue";
import {XMLParser} from "fast-xml-parser";
import {IconLib} from "./IconLib";
import {TIconData} from "./types"
import Helper from "../../../utils/Helper";

function googleIconUrl(theme: string, icon: string, version: number): string {
    return `https://fonts.gstatic.com/s/i/materialicons${theme}/${icon}/v${version}/24px.svg`;
}

// function useSvgClasses(props) {
//     return [
//         `${cssPrefix}-svg-inline`, 'mx-auto',
//         {
//             [`${cssPrefix}-icon-spin`]: props.spin,
//             [`${cssPrefix}-icon-pulse`]: props.pulse,
//             [`${cssPrefix}-flip-both`]: props.flip === 'both',
//             [`${cssPrefix}-flip-vertical`]: props.flip === 'vertical',
//             [`${cssPrefix}-flip-horizontal`]: props.flip === 'horizontal',
//             [`${cssPrefix}-rotate-90`]: props.rotate && parseInt(String(props.rotate), 10) === 90,
//             [`${cssPrefix}-rotate-180`]: props.rotate && parseInt(String(props.rotate), 10) === 180,
//             [`${cssPrefix}-rotate-270`]: props.rotate && parseInt(String(props.rotate), 10) === 270,
//         },
//     ];
// }

/**
 * Find an icon on the Google's icon library.
 *
 * @param {string} name The icon name
 * @returns {TIconData} Icon data if icon exists on the library otherwise `undefined`.
 */
function findIcon(name: string | undefined): TIconData | undefined {
    if (!name) {
        return undefined;
    }

    const strIcon = name.trim().toLowerCase()
        .replace(" ", "_")
        .replace("-", "_");
    const variant = strIcon.endsWith("_round") || strIcon.endsWith("_rounded")
        ? "round"
        : strIcon.endsWith("_outlined")
            ? "outlined"
            : (strIcon.endsWith("_sharp") ? "sharp" : "");
    const realName = strIcon.replace(/_outlined|_filled|_round|_rounded|_sharp/g, "");
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

async function useGoogleIcon(iconObj: TIconData): Promise<TIconData> {
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

function createNodeAttrs(attrs: Array<[string, unknown]>): object {
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
                const childNodes = entries.filter(it => it[0].startsWith("@_") === false);
                const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));
                results.push(rh);
            });
        } else if (Helper.isObject(el[1])) {
            const entries = Object.entries(el[1] as object);
            const childNodes = entries.filter(it => it[0].startsWith("@_") === false);
            const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));

            results.push(rh);
        }
    });

    return results;
}

function useRenderSvgIcon(
    iconData: TIconData | undefined,
    height: number | string,
    width: number | string,
    classes: unknown,
): VNode {
    if (!iconData || !iconData.data) {
        return h("span");
    }
    // console.log("svg_icon:", iconData.icon);
    const parser = new XMLParser({ignoreAttributes: false});
    const jsonObj = parser.parse(iconData.data);
    const svgData = Object.entries(jsonObj.svg);
    // console.log("svg_data:", svgData);
    const filteredAttrs = svgData
        .filter(el => el[0].startsWith("@_"))
        .map<[string, unknown]>(el => {
            const attr = el[0].replace("@_", "");
            const value = attr === "height" ? height : attr === "width" ? width : el[1];

            return [attr, value];
        });
    filteredAttrs.push(["class", classes]);
    filteredAttrs.push(["xmlns", "http://www.w3.org/2000/svg"]);
    const children = svgData.filter(el => el[0].startsWith("@_") === false);
    const props: Record<string, unknown> = {};
    filteredAttrs.forEach(el => props[el[0]] = el[1]);

    return h("svg", props, renderChildNodes(children))
}

export {findIcon, googleIconUrl, useGoogleIcon, useRenderSvgIcon}
