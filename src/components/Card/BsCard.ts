import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { createCommentVNode, defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsCard, TCardOptionProps, TRecord } from '../../types';
import { useRenderCardImg } from './mixins/cardApi';
import { cardProps } from './mixins/cardProps';

export default defineComponent<TBsCard, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCard',
    props: cardProps,
    setup(props, {slots}) {
        const thisProps = props as Readonly<TCardOptionProps>;

        return () => h(
            thisProps.tag || 'div', {
                class: {
                    'card': true,
                    'rounded-0': thisProps.rounded === false,
                    [`${cssPrefix}shadow`]: thisProps.shadow
                }
            }, [
                thisProps.imgTopSrc
                    ? useRenderCardImg(thisProps.imgTopSrc, thisProps.imgTopAlt, 'card-img-top')
                    : createCommentVNode(' v-if-imgTop '),
                slots.default && slots.default(),
                thisProps.imgBottomSrc
                    ? useRenderCardImg(thisProps.imgBottomSrc, thisProps.imgBottomAlt, 'card-img-bottom')
                    : createCommentVNode(' v-if-imgBottom '),
            ]
        )
    },
});
