import { useContentTag } from '@/components/Card/mixins/cardApi.ts';
import { cardContentProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardContent, TCardContentOptionProps } from '@/components/Card/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import type { HtmlTagName, TRecord } from '@/types';
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
import { computed, defineComponent } from 'vue';

export default defineComponent<TBsCardContent>({
  name: 'BsCardContent',
  props: cardContentProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TCardContentOptionProps>;
    const tagName = computed(() => useContentTag(thisProps.type, thisProps.tag as HtmlTagName));

    return () =>
      useWrapSlotDefault(tagName.value, slots, {
        [`${cssPrefix}card-${thisProps.type}`]: tagName.value,
      });
  },
}) as DefineComponent<
  TBsCardContent,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TCardContentOptionProps>,
  ExtractDefaultPropTypes<TBsCardContent>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
