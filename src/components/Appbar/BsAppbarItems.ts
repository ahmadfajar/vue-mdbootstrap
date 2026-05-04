/* eslint-disable @typescript-eslint/no-empty-object-type */
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
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
