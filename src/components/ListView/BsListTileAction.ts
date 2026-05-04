/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsListTileAction, TListTileActionOptionProps } from '@/components/ListView/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp, tagProp } from '@/mixins/CommonProps.ts';
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
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TListTileActionOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsListTileAction>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
