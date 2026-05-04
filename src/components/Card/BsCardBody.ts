/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsCardBody, TTagProp } from '@/components/Card/types';
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

export default defineComponent<TBsCardBody>({
  name: 'BsCardBody',
  props: {
    tag: tagProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TTagProp>;

    return () => useWrapSlotDefault(thisProps.tag || 'div', slots, `${cssPrefix}card-body`);
  },
}) as DefineComponent<
  TBsCardBody,
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
  ExtractDefaultPropTypes<TBsCardBody>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
