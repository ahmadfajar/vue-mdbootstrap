import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentPropsOptions,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  Slots,
  SlotsType,
  VNode,
} from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BsAppbarItems',
  setup(_, { slots }) {
    return () =>
      useWrapSlotDefault('div', slots as Slots, [`${cssPrefix}appbar-items`, 'flex', 'max-w-full']);
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
  Readonly<ComponentPropsOptions>,
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
