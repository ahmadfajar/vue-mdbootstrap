import { createCommentVNode, defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { useRenderCardImg } from './mixins/cardApi';
import { cardProps } from './mixins/cardProps';
import type { TBsCard, TCardOptionProps } from './types';

export default defineComponent<TBsCard>({
    name: 'BsCard',
    props: cardProps,
    setup(props, { slots }) {
        const thisProps = props as Readonly<TCardOptionProps>;

        return () =>
            h(
                thisProps.tag || 'div',
                {
                    class: {
                        card: true,
                        [`${cssPrefix}shadow`]: thisProps.shadow,
                    },
                    style: {
                        ['--bs-card-border-radius']: thisProps.roundedOff === true ? 0 : undefined,
                        ['--bs-card-border-width']: thisProps.borderOff === true ? 0 : undefined,
                    },
                },
                [
                    thisProps.imgTopSrc
                        ? useRenderCardImg(thisProps.imgTopSrc, thisProps.imgTopAlt, 'card-img-top')
                        : createCommentVNode(' v-if-imgTop '),
                    slots.default && slots.default(),
                    thisProps.imgBottomSrc
                        ? useRenderCardImg(
                              thisProps.imgBottomSrc,
                              thisProps.imgBottomAlt,
                              'card-img-bottom'
                          )
                        : createCommentVNode(' v-if-imgBottom '),
                ]
            );
    },
});
