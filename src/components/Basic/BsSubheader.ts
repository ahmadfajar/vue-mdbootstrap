/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsSubheader, TSubheaderOptionProps } from '@/components/Basic/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
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
import { defineComponent } from 'vue';

export default defineComponent<TBsSubheader>({
  name: 'BsSubheader',
  props: {
    dark: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TSubheaderOptionProps>;

    return () =>
      useWrapSlotDefault('div', slots, [
        `${cssPrefix}subheader`,
        'flex',
        'items-center',
        thisProps.dark ? 'subheader--dark' : 'subheader--light',
      ]);
  },
}) as DefineComponent<
  TBsSubheader,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TSubheaderOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsSubheader>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
