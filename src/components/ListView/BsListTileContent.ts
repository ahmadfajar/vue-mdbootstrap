import type { TBsListTileContent, TListTileContentOptionProps } from '@/components/ListView/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp, tagProp } from '@/mixins/CommonProps.ts';
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

export default defineComponent<TBsListTileContent>({
  name: 'BsListTileContent',
  props: {
    tag: tagProp,
    multiLine: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TListTileContentOptionProps>;

    return () =>
      useWrapSlotDefault(thisProps.tag || 'div', slots, {
        [`${cssPrefix}list-tile-content`]: true,
        'flex flex-col self-center overflow-hidden max-w-full': true,
        [`${cssPrefix}multiline`]: thisProps.multiLine === true,
      });
  },
}) as DefineComponent<
  TBsListTileContent,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TListTileContentOptionProps>,
  ExtractDefaultPropTypes<TBsListTileContent>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
