import type {VNode} from "vue";
import {h} from "vue";
import type {TRecord} from "../../../types";

export function useRenderCardImg(
    imgSrc?: string | undefined,
    altText?: string | undefined,
    classes?: string | Array<string> | TRecord,
): VNode {
    return h("img", {
        class: classes,
        src: imgSrc,
        alt: altText,
    })
}

export function useContentTag(type?: string | undefined, tag?: string | undefined): string {
    if (!tag) {
        return (type === 'title' ? 'h4' : type === 'subtitle' ? 'h5' : 'p');
    }
    return tag
}

