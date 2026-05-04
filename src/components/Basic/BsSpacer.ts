/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsSpacer, TSpacerOptionProps } from '@/components/Basic/types';
import { useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanTrueProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
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

export default defineComponent<TBsSpacer>({
  name: 'BsSpacer',
  props: {
    fill: booleanTrueProp,
    width: validStringOrNumberProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TSpacerOptionProps>;

    return () =>
      useWrapSlotDefault(
        'div',
        undefined,
        { 'flex-grow': thisProps.fill && !thisProps.width },
        { width: thisProps.width ? Helper.cssUnit(thisProps.width) : undefined }
      );
  },
}) as DefineComponent<
  TBsSpacer,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TSpacerOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsSpacer>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
