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
    slots?: Slots | undefined | null,
    classes?: string | Array<string> | TRecord | undefined | null,
    styles?: string | Array<string> | TRecord | undefined | null,
): VNode {
    if (styles) {
        return h(
            // @ts-ignore
            tag, {class: classes, style: styles},
            slots ? slots.default && slots.default() : null,
        )
    } else {
        return h(
            // @ts-ignore
            tag, {class: classes},
            slots ? slots.default && slots.default() : null,
        )
    }
}
