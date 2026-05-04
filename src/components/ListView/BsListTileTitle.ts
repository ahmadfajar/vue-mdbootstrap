/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderListTileText } from '@/components/ListView/mixins/listTileApi.ts';
import type { TBsListTileTitle, TListTileTextOptionProps } from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { stringProp } from '@/mixins/CommonProps.ts';
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

export default defineComponent<TBsListTileTitle>({
  name: 'BsListTileTitle',
  props: {
    rawHtml: stringProp,
  },
  setup(props, { slots }) {
    return () =>
      useRenderListTileText(slots, props as Readonly<TListTileTextOptionProps>, [
        `${cssPrefix}list-tile-title`,
        'w-full',
      ]);
  },
}) as DefineComponent<
  TBsListTileTitle,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TListTileTextOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsListTileTitle>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
