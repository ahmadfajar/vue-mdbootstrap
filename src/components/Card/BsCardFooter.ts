import type { TBsCardFooter, TTagProp } from '@/components/Card/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { tagProp } from '@/mixins/CommonProps.ts';
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
} from 'vue';
import { defineComponent } from 'vue';

export default defineComponent<TBsCardFooter>({
  name: 'BsCardFooter',
  props: {
    tag: tagProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TTagProp>;

    return () => useWrapSlotDefault(thisProps.tag || 'div', slots, `${cssPrefix}card-footer`);
  },
}) as DefineComponent<
  TBsCardFooter,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TTagProp>,
  ExtractDefaultPropTypes<TBsCardFooter>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
