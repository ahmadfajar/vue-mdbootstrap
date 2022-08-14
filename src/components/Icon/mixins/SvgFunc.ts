import axios from "axios";
import {h, VNode} from "vue";
import {XMLParser} from "fast-xml-parser";
import {IconLib} from "./IconLib";
import {TIconData} from "./types"
import Helper from "../../../utils/Helper";

function googleIconUrl(theme: string | undefined, icon: string, version: number): string {
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

// function hasFillNoneAttr(attrs: Array<[string, unknown]>): boolean {
//     const ret = attrs.find(it => it[0] === '@_fill' && it[1] === 'none')
//     return ret !== null && ret !== undefined;
// }

// function createNodeAttrs(attrs: Array<[string, unknown]>, parent?: [string, unknown]): object {
function createNodeAttrs(attrs: Array<[string, unknown]>): Record<string, unknown> {
    const props: Record<string, unknown> = {};
    const filtered = attrs
        .filter(el => el[0].startsWith("@_"))
        .map<[string, unknown]>(el => {
            const attr = el[0].replace("@_", "");
            return [attr, el[1]];
        });

    // if (!parent || !hasFillNoneAttr(parent[1] as Array<[string, unknown]>)) {
    //     if (filtered.length > 0 && !filtered.find(el => el[0] === "fill")) {
    //         filtered.push(["fill", "currentColor"]);
    //     }
    // }
    filtered.forEach(el => props[el[0]] = el[1]);

    return props;
}

// function parentAttr(tag: string, attrs:Array<[string, unknown]>): [string, unknown] {
//     const filtered = attrs.filter(it => it[0].startsWith("@_"));
//     return [tag, filtered];
// }

// function renderChildNodes(children: Array<[string, unknown]>, parent?: [string, unknown]): Array<VNode> {
function renderChildNodes(children: Array<[string, unknown]>): Array<VNode> {
    const results: Array<VNode> = [];

    children.forEach(el => {
        if (Helper.isArray(el[1])) {
            (el[1] as Array<object>).forEach(it => {
                const entries = Object.entries(it);
                const childNodes = entries.filter(it => it[0].startsWith("@_") === false);
                // const elValue: [string, unknown] = parentAttr(el[0], entries);
                // const rh = h(el[0], createNodeAttrs(entries, parent), renderChildNodes(childNodes, elValue));
                const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));
                results.push(rh);
            });
        } else if (Helper.isObject(el[1])) {
            const entries = Object.entries(el[1] as object);
            const childNodes = entries.filter(it => it[0].startsWith("@_") === false);
            // const elValue: [string, unknown] = parentAttr(el[0], entries);
            // const rh = h(el[0], createNodeAttrs(entries, parent), renderChildNodes(childNodes, elValue));
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
    const parser = new XMLParser({ignoreAttributes: false});
    const jsonObj = parser.parse(iconData.data);
    const svgData = Object.entries(jsonObj.svg);
    const props = createNodeAttrs(svgData);
    const children = svgData.filter(el => el[0].startsWith("@_") === false);
    props["height"] = height;
    props["width"] = width;
    props["class"] = classes;
    props["fill"] = "currentColor";
    props["xmlns"] = "http://www.w3.org/2000/svg";

    return h("svg", props, renderChildNodes(children))
}

export {findIcon, googleIconUrl, useGoogleIcon, useRenderSvgIcon}
