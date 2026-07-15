import type {
  OverlayEventProps,
  OverlayEventPublic,
  TBsOverlay,
  TOverlayOptionProps,
} from '@/components/Animation/types';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  stringProp,
  validStringOrFloatProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals';
import {
  computed,
  createCommentVNode,
  defineComponent,
  h,
  type Component,
  type ComponentOptionsMixin,
  type ComponentProvideOptions,
  type ComputedOptions,
  type DefineComponent,
  type Directive,
  type ExtractDefaultPropTypes,
  type MethodOptions,
  type PublicProps,
  type SlotsType,
} from 'vue';

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
  TRecord,
  TRecord,
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
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
