import {h, Slots, VNode} from "vue";

export function useRenderCardImg(
    imgSrc: string | undefined,
    altText: string | undefined,
    classes: string | Array<string> | Record<string, unknown>,
): VNode {
    return h("img", {
        class: classes,
        src: imgSrc,
        alt: altText,
    })
}

export function useContentTag(type: string | undefined, tag?: string | undefined): string {
    if (!tag) {
        return (type === 'title' ? 'h4' : type === 'subtitle' ? 'h5' : 'p');
    }
    return tag
}

export function useSimpleRenderWithSlots(
    type: string,
    slots?: Slots | undefined | null,
    classes?: string | Array<string> | Record<string, unknown> | undefined | null,
    styles?: string | Array<string> | Record<string, unknown> | undefined | null,
): VNode {
    if (styles) {
        return h(
            // @ts-ignore
            type, {class: classes, style: styles},
            slots ? slots.default && slots.default() : null,
        )
    } else {
        return h(
            // @ts-ignore
            type, {class: classes},
            slots ? slots.default && slots.default() : null,
        )
    }
}
