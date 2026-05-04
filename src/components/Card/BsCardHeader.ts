/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsCardHeader, TTagProp } from '@/components/Card/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { tagProp } from '@/mixins/CommonProps.ts';
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

export default defineComponent<TBsCardHeader>({
  name: 'BsCardHeader',
  props: {
    tag: tagProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TTagProp>;

    return () => useWrapSlotDefault(thisProps.tag || 'div', slots, `${cssPrefix}card-header`);
  },
}) as DefineComponent<
  TBsCardHeader,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TTagProp> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsCardHeader>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
