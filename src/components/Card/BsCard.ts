import { useRenderCardImg } from '@/components/Card/mixins/cardApi.ts';
import { cardProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCard, TCardOptionProps } from '@/components/Card/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { createCommentVNode, defineComponent, h } from 'vue';

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
            [`${cssPrefix}card`]: true,
            shadow: thisProps.shadow,
          },
          style: {
            [`--${cssPrefix}card-border-radius`]: thisProps.roundedOff === true ? 0 : undefined,
            [`--${cssPrefix}card-border-width`]: thisProps.borderOff === true ? 0 : undefined,
          },
        },
        [
          thisProps.imgTopSrc
            ? useRenderCardImg(thisProps.imgTopSrc, thisProps.imgTopAlt, 'card-img-top')
            : createCommentVNode(' v-if-img-top '),
          slots.default && slots.default(),
          thisProps.imgBottomSrc
            ? useRenderCardImg(thisProps.imgBottomSrc, thisProps.imgBottomAlt, 'card-img-bottom')
            : createCommentVNode(' v-if-img-bottom '),
        ]
      );
  },
});
