import { iconVariant } from '@/components/Avatar/mixins/avatarProps.ts';
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { validationProps } from '@/components/Field/mixins/validationProps';
import {
  popoverDefaultTransitionProp,
  popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps.ts';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  booleanTrueProp,
  numberProp,
  stringProp,
  validStringOrFloatProp,
} from '@/mixins/CommonProps.ts';
import type { TActionButtonPlacement, TActionButtonType } from '@/types';
import type { Prop, PropType } from 'vue';

export const textFieldProps = {
  filled: booleanProp,
  floatingLabel: booleanProp,
  outlined: booleanProp,
  clearButton: booleanProp,
  validationIcon: booleanProp,
  appendIcon: stringProp,
  appendIconOuter: stringProp,
  prependIcon: stringProp,
  prependIconOuter: stringProp,
  actionIconVariant: iconVariant,
};

export const numericFieldProps = {
  ...inputProps,
  ...textFieldProps,
  ...validationProps,
  autocomplete: {
    type: [String, Boolean],
    default: false,
  },
  autofocus: booleanProp,
  modelValue: numberProp,
  placeholder: stringProp,
  prefix: stringProp,
  suffix: stringProp,
  locale: stringProp,
  rounded: booleanProp,
  useGrouping: booleanTrueProp,
  actionButton: {
    type: String as PropType<TActionButtonType>,
    default: 'up-down',
    validator: (v: TActionButtonType) => ['up-down', 'plus-minus'].includes(v),
  } as Prop<TActionButtonType>,
  actionButtonPlacement: {
    type: String as PropType<TActionButtonPlacement>,
    default: 'right',
    validator: (v: TActionButtonPlacement) => ['left', 'right', 'both'].includes(v),
  } as Prop<TActionButtonPlacement>,
  maxFraction: {
    type: [Number, String],
    default: 3,
    validator: (v: string) => !isNaN(parseInt(v, 10)),
  },
  maxValue: validStringOrFloatProp,
  minValue: validStringOrFloatProp,
  step: {
    type: [Number, String],
    default: 1.0,
    validator: (v: string) => !isNaN(parseFloat(v)),
  },
};

export const searchFieldProps = {
  id: {
    type: String,
    default: () => useGenerateId(),
  },
  name: stringProp,
  disabled: booleanProp,
  readonly: booleanProp,
  autofocus: booleanProp,
  advanceSearch: booleanProp,
  modelValue: stringProp,
  darkMode: booleanProp,
  placeholder: {
    type: String,
    default: 'Search...',
  },
  minlength: {
    type: [String, Number],
    default: 4,
    validator: (value: string) => parseInt(value, 10) > 0,
  },
  popoverCls: {
    type: [String, Array],
    default: `${cssPrefix}shadow-1`,
  },
  popoverMinWidth: {
    type: [Number, String],
    default: 480,
    validator: (value: string) => parseInt(value, 10) > 0,
  },
  popoverOpen: booleanProp,
  popoverPlacement: popoverPlacementProp,
  popoverTransition: popoverDefaultTransitionProp,
};
