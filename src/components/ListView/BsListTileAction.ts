import type { TBsListTileAction, TListTileActionOptionProps } from '@/components/ListView/types';
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

export default defineComponent<TBsListTileAction>({
  name: 'BsListTileAction',
  props: {
    tag: tagProp,
    center: booleanProp,
    stack: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TListTileActionOptionProps>;

    return () =>
      useWrapSlotDefault(thisProps.tag || 'div', slots, {
        [`${cssPrefix}list-tile-action`]: true,
        'max-w-full': true,
        [`${cssPrefix}action-stack`]: thisProps.stack === true,
        flex: !thisProps.stack && thisProps.center === true,
        'self-center': thisProps.center === true,
      });
  },
}) as DefineComponent<
  TBsListTileAction,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TListTileActionOptionProps>,
  ExtractDefaultPropTypes<TBsListTileAction>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
