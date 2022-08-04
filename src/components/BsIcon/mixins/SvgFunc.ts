import axios from "axios";
import {h, VNode} from "vue";
import {XMLParser} from "fast-xml-parser";
import {cssPrefix} from "../../../mixins/Commons";
import {IconLib} from "./IconLib";
import Helper from "../../../utils/Helper";

function googleIconUrl(theme: string, icon: string, version: number): string {
    return `https://fonts.gstatic.com/s/i/materialicons${theme}/${icon}/v${version}/24px.svg`;
}

function useSvgClasses(props) {
    return [
        `${cssPrefix}-svg-inline`, 'mx-auto',
        {
            [`${cssPrefix}-icon-spin`]: props.spin,
            [`${cssPrefix}-icon-pulse`]: props.pulse,
            [`${cssPrefix}-flip-both`]: props.flip === 'both',
            [`${cssPrefix}-flip-vertical`]: props.flip === 'vertical',
            [`${cssPrefix}-flip-horizontal`]: props.flip === 'horizontal',
            [`${cssPrefix}-rotate-90`]: props.rotate && parseInt(String(props.rotate), 10) === 90,
            [`${cssPrefix}-rotate-180`]: props.rotate && parseInt(String(props.rotate), 10) === 180,
            [`${cssPrefix}-rotate-270`]: props.rotate && parseInt(String(props.rotate), 10) === 270,
        },
    ];
}

interface IIconData {
    id: number,
    name: string,
    icon: string,
    category: string,
    variant: string,
    data?: string,
}

/**
 * Find an icon on the Google's icon library.
 *
 * @param {string} name The icon name
 * @returns {IIconData} Icon data if icon exists on the library otherwise `undefined`.
 */
function findIcon(name: string): IIconData {
    const strIcon = name.trim().toLowerCase().replace(" ", "_");
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
            category: found[0],
            variant: variant,
        }
    }

    return undefined
}

async function useGoogleIcon(icon: string): Promise<IIconData> {
    const iconObj = findIcon(icon);

    if (iconObj) {
        const resp = await axios.get(googleIconUrl(iconObj.variant, iconObj.name, iconObj.id))
        iconObj.data = resp.data;

        return iconObj
    }

    return undefined
}

function createNodeAttrs(attrs: Array<[string, unknown]>): object {
    const props = {};
    const filtered = attrs.filter(el => el[0].startsWith("@_"));
    filtered.forEach(el => props[el[0]] = el[1]);

    return props;
}

function renderChildNodes(children: Array<[string, unknown]>): Array<VNode> {
    const results = [];

    children.forEach(el => {
        if (Helper.isObject(el[1])) {
            const entries = Object.entries(el[1]);
            const childNodes = entries.filter(it => it[0].startsWith("@_") === false);
            const rh = h(el[0], createNodeAttrs(entries), renderChildNodes(childNodes));

            results.push(rh);
        }
    });

    return results;
}

function useRenderSvgIcon(iconData: IIconData, height: number, width: number, classes): VNode {
    const parser = new XMLParser({ignoreAttributes: false});
    const jsonObj = parser.parse(iconData.data);
    const svgData = Object.entries(jsonObj.svg);
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
    const props = {};
    filteredAttrs.forEach(el => props[el[0]] = el[1]);

    return h("svg", props, renderChildNodes(children))
}

export {findIcon, googleIconUrl, useSvgClasses, useGoogleIcon, useRenderSvgIcon}
