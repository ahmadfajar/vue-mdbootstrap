/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsListTileContent, TListTileContentOptionProps } from '@/components/ListView/types';
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
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TListTileContentOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsListTileContent>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
