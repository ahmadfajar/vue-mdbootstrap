import { iconVariant } from '@/components/Avatar/mixins/avatarProps.ts';
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { validationProps } from '@/components/Field/mixins/validationProps';
import {
  popoverDefaultTransitionProp,
  popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps.ts';
import { useGenerateId } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  booleanTrueProp,
  numberProp,
  stringProp,
  validStringOrFloatProp,
} from '@/mixins/CommonProps.ts';
import type { TPlusMinusButtonPlacement, TSpinButtonPlacement } from '@/types';
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
  locale: stringProp,
  rounded: booleanProp,
  useGrouping: booleanTrueProp,
  spinButton: booleanTrueProp,
  spinButtonPlacement: {
    type: String as PropType<TSpinButtonPlacement>,
    default: 'right',
    validator: (v: TSpinButtonPlacement) => ['left', 'right'].includes(v),
  } as Prop<TSpinButtonPlacement>,
  actionButton: booleanProp,
  actionButtonPlacement: {
    type: String as PropType<TPlusMinusButtonPlacement>,
    default: 'right',
    validator: (v: TPlusMinusButtonPlacement) => ['left', 'right', 'both'].includes(v),
  } as Prop<TPlusMinusButtonPlacement>,
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
  prefix: stringProp,
  suffix: stringProp,
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
    default: 'shadow',
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
