import type { TBsSpinLoader, TSpinLoaderOptionProps } from '@/components/Progress/types';
import { cssPrefix } from '@/mixins/CommonApi';
import { stringOrNumberProp, stringProp } from '@/mixins/CommonProps';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper';
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
import { defineComponent, h } from 'vue';

export default defineComponent<TBsSpinLoader>({
  name: 'BsSpinLoader',
  props: {
    tag: stringProp,
    size: stringOrNumberProp,
    thickness: stringOrNumberProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TSpinLoaderOptionProps>;

    return () =>
      h(thisProps.tag || 'div', {
        class: [`${cssPrefix}spinner-border`],
        style:
          thisProps.size || thisProps.thickness
            ? {
                [`--${cssPrefix}spinner-width`]: Helper.cssUnit(thisProps.size),
                [`--${cssPrefix}spinner-height`]: Helper.cssUnit(thisProps.size),
                [`--${cssPrefix}spinner-border-width`]: Helper.cssUnit(thisProps.thickness),
              }
            : undefined,
      });
  },
}) as DefineComponent<
  TBsSpinLoader,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TSpinLoaderOptionProps>,
  ExtractDefaultPropTypes<TBsSpinLoader>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
