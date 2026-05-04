/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsDivider, TDividerOptionProps } from '@/components/Basic/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { defineComponent } from 'vue';

export default defineComponent<TBsDivider>({
  name: 'BsDivider',
  props: {
    dark: booleanProp,
    leftIndent: validStringOrNumberProp,
    rightIndent: validStringOrNumberProp,
    thickness: validStringOrNumberProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TDividerOptionProps>;

    return () =>
      useWrapSlotDefault(
        'hr',
        undefined,
        { [`${cssPrefix}divider`]: true, 'divider--dark': thisProps.dark },
        {
          marginLeft: thisProps.leftIndent ? Helper.cssUnit(thisProps.leftIndent) : undefined,
          marginRight: thisProps.rightIndent ? Helper.cssUnit(thisProps.rightIndent) : undefined,
          height: thisProps.thickness ? Helper.cssUnit(thisProps.thickness) : undefined,
        }
      );
  },
}) as DefineComponent<
  TBsDivider,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TDividerOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsDivider>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
