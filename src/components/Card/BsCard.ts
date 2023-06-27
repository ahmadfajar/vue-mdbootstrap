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
        const cmpProps = props as Readonly<TCardOptionProps>;
        return () => h(
            cmpProps.tag || 'div', {
                class: {
                    'card': true,
                    'rounded-0': cmpProps.rounded === false,
                    [`${cssPrefix}shadow`]: props.shadow
                }
            }, [
                cmpProps.imgTopSrc
                    ? useRenderCardImg(cmpProps.imgTopSrc, cmpProps.imgTopAlt, 'card-img-top')
                    : createCommentVNode(' v-if-imgTop '),
                slots.default && slots.default(),
                cmpProps.imgBottomSrc
                    ? useRenderCardImg(cmpProps.imgBottomSrc, cmpProps.imgBottomAlt, 'card-img-bottom')
                    : createCommentVNode(' v-if-imgBottom '),
            ]
        )
    },
});
