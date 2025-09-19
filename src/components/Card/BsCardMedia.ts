import { cardMediaProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardMedia, TCardMediaOptionProps } from '@/components/Card/types';
import { cssPrefix, useWrapSlot } from '@/mixins/CommonApi.ts';
import { createCommentVNode, createTextVNode, defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsCardMedia>({
  name: 'BsCardMedia',
  props: cardMediaProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TCardMediaOptionProps>;

    return () =>
      h('div', { class: [`${cssPrefix}card-media`] }, [
        h(
          'div',
          {
            class: {
              [`${cssPrefix}card-media-overlay`]: true,
              [`${cssPrefix}overlay-top`]: thisProps.overlayTop,
              [`${cssPrefix}overlay-bottom`]: !thisProps.overlayTop,
            },
            style: {
              top: thisProps.overlayTop ? 0 : undefined,
              bottom: !thisProps.overlayTop ? 0 : undefined,
            },
          },
          [
            useWrapSlot(
              slots,
              'title',
              'slot-title',
              { class: [`${cssPrefix}card-media-title`] },
              createTextVNode(toDisplayString(thisProps.title))
            ),
            thisProps.subtitle || slots.subtitle
              ? useWrapSlot(
                  slots,
                  'subtitle',
                  'slot-subtitle',
                  { class: [`${cssPrefix}card-media-subtitle`] },
                  createTextVNode(toDisplayString(thisProps.subtitle))
                )
              : createCommentVNode(' v-if-subtitle '),
          ]
        ),
        slots.default && slots.default(),
      ]);
  },
});
