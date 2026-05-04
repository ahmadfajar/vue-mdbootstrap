/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsSpinLoader, TSpinLoaderOptionProps } from '@/components/Progress/types';
import { cssPrefix } from '@/mixins/CommonApi';
import { stringOrNumberProp, stringProp } from '@/mixins/CommonProps';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
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
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TSpinLoaderOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsSpinLoader>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
