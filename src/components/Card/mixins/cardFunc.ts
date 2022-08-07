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

export function useSimpleNodeWithSlots(
    tagName: string | unknown,
    slots: Readonly<Slots>,
    classes?: string | Array<string> | Record<string, unknown>,
): VNode {
    return h(
        tagName, {class: classes}, [slots.default && slots.default()],
    )
}
