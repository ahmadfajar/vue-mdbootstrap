import type { VNode } from 'vue';
import { h } from 'vue';
import type { TRecord } from '../../../types';

export function useRenderCardImg(
    imgSrc?: string,
    altText?: string,
    classes?: string | Array<string> | TRecord
): VNode {
    return h('img', {
        class: classes,
        src: imgSrc,
        alt: altText,
    });
}

export function useContentTag(type?: string, tag?: string): string {
    if (!tag) {
        return type === 'title' ? 'h4' : type === 'subtitle' ? 'h5' : 'p';
    }
    return tag;
}
