/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsOverlay, TOverlayOptionProps } from '@/components/Animation/types';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  stringProp,
  validStringOrFloatProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
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
} from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';

export default defineComponent<TBsOverlay>({
  name: 'BsOverlay',
  props: {
    color: stringProp,
    fixed: booleanProp,
    opacity: validStringOrFloatProp,
    show: booleanProp,
    zIndex: validStringOrNumberProp,
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TOverlayOptionProps>;
    const styles = computed<TRecord>(() => ({
      opacity: thisProps.opacity,
      'background-color': thisProps.color,
      position: thisProps.fixed ? 'fixed' : null,
      'z-index': thisProps.zIndex,
    }));

    return () =>
      useRenderTransition(
        { name: 'fade' },
        thisProps.show
          ? h(
              'div',
              {
                class: [`${cssPrefix}overlay`],
                style: styles.value,
                onClick: (event: Event) => emit('click', event),
                onTouchmove: (event: Event) => preventEventTarget(event),
              },
              slots.default && slots.default()
            )
          : createCommentVNode(' BsOverlay ', true)
      );
  },
}) as DefineComponent<
  TBsOverlay,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  OverlayEventProps,
  string,
  PublicProps,
  Readonly<TOverlayOptionProps> & Readonly<OverlayEventPublic>,
  ExtractDefaultPropTypes<TBsOverlay>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type OverlayEventProps = {
  /**
   * Fired when the Overlay component is clicked.
   */
  click?: (event: Event) => void;
};

declare interface OverlayEventPublic {
  /**
   * Fired when the Overlay component is clicked.
   */
  onClick?: (event: Event) => void;

  /**
   * Fired when the Overlay component is clicked.
   */
  '@click'?: (event: Event) => void;
}
