/* eslint-disable @typescript-eslint/no-empty-object-type */
import { cardMediaProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardMedia, TCardMediaOptionProps } from '@/components/Card/types';
import { cssPrefix, useWrapSlot } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
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
}) as DefineComponent<
  TBsCardMedia,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TCardMediaOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsCardMedia>,
  SlotsType<CardMediaSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface CardMediaSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place the CardMedia's title.
   */
  title?: () => VNode[] | VNode;

  /**
   * Additional slot used to place the CardMedia's subtitle.
   */
  subtitle?: () => VNode[] | VNode;
}
