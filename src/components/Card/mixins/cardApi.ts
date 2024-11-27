import type { TCardContentType, TRecord } from '@/types';
import type { VNode } from 'vue';
import { h } from 'vue';

export function useRenderCardImg(
    imgSrc?: string,
    altText?: string,
    classes?: string | string[] | TRecord
): VNode {
    return h('img', {
        class: classes,
        src: imgSrc,
        alt: altText,
    });
}

export function useContentTag(type?: TCardContentType, tag?: string): string {
    if (!tag) {
        return type === 'title' ? 'h4' : type === 'subtitle' ? 'h5' : 'p';
    }

    return tag;
}
