import {h, Slots, VNode} from "vue";
import {TRecord} from "../../../types";

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

export function useSimpleRenderWithSlots(
    tag: string,
    slots?: Slots,
    classes?: string | Array<string> | TRecord,
    styles?: string | Array<string> | TRecord,
): VNode {
    if (styles) {
        return h(
            tag, {class: classes, style: styles},
            slots ? slots.default && slots.default() : undefined,
        )
    } else {
        return h(
            tag, {class: classes},
            slots ? slots.default && slots.default() : undefined,
        )
    }
}
