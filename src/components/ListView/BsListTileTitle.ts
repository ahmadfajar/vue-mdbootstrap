import { useRenderListTileText } from '@/components/ListView/mixins/listTileApi.ts';
import type { TBsListTileTitle, TListTileTextOptionProps } from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { stringProp } from '@/mixins/CommonProps.ts';
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
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TListTileTextOptionProps>,
  ExtractDefaultPropTypes<TBsListTileTitle>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
