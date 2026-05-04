/* eslint-disable @typescript-eslint/no-empty-object-type */
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
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
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
  {},
  () => VNode,
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<{}>,
  {},
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
