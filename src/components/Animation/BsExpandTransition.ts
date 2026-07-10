import {
  afterEnter,
  afterLeave,
  beforeEnter,
  beforeLeave,
  onEnter,
  onLeave,
} from '@/components/Animation/mixins/expandTransitionApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { defineComponent, h, Transition } from 'vue';

export default defineComponent({
  name: 'BsExpandTransition',
  setup(_, { slots }) {
    return () =>
      h(
        Transition,
        {
          name: 'expand',
          onBeforeEnter: beforeEnter,
          onEnter: onEnter,
          onAfterEnter: afterEnter,
          onBeforeLeave: beforeLeave,
          onLeave: onLeave,
          onAfterLeave: afterLeave,
        },
        {
          default: () => slots.default && slots.default(),
        }
      );
  },
}) as DefineComponent<
  TRecord,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TRecord>,
  ExtractDefaultPropTypes<TRecord>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;
