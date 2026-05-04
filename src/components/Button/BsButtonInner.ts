/* eslint-disable @typescript-eslint/no-empty-object-type */
import { BsRipple } from '@/components/Animation';
import type { TBsButtonInner, TButtonInnerOptionProps } from '@/components/Button/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
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
import { defineComponent, h } from 'vue';

export default defineComponent<TBsButtonInner>({
  name: 'BsButtonInner',
  props: {
    dropdownToggle: booleanProp,
    iconMode: booleanProp,
    hasIcon: booleanProp,
    rippleOff: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TButtonInnerOptionProps>;

    return () =>
      h(
        BsRipple,
        {
          class: { flex: true, 'dropdown-toggle': thisProps.dropdownToggle && !thisProps.iconMode },
          disabled: thisProps.rippleOff,
          tag: 'span',
        },
        {
          default: () =>
            useWrapSlotDefault('span', slots, [
              `${cssPrefix}btn-inner`,
              'flex',
              'items-center',
              'justify-center',
              'w-full',
              thisProps.hasIcon ? 'has-icon' : '',
            ]),
        }
      );
  },
}) as DefineComponent<
  TBsButtonInner,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TButtonInnerOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsButtonInner>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
