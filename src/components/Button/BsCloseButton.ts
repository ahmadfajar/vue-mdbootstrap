/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TBsCloseButton, TCloseButtonOptionProps } from '@/components/Button/types';
import { booleanProp, defaultColorProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
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
import BsButton from './BsButton.ts';

export default defineComponent<TBsCloseButton>({
  name: 'BsCloseButton',
  props: {
    color: defaultColorProp,
    disabled: booleanProp,
    flat: booleanProp,
    readonly: booleanProp,
    rippleOff: booleanProp,
    tonal: booleanProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TCloseButtonOptionProps>;

    return () => {
      return h(BsButton, {
        mode: 'icon',
        size: 'sm',
        color: thisProps.color,
        flat: thisProps.flat,
        tonal: thisProps.tonal,
        disabled: thisProps.disabled,
        readonly: thisProps.readonly,
        rippleOff: thisProps.rippleOff,
        icon: 'close',
        iconSize: 22,
        class: ['btn-close-action'],
        ariaLabel: 'Close',
      });
    };
  },
}) as DefineComponent<
  TBsCloseButton,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TCloseButtonOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsCloseButton>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
