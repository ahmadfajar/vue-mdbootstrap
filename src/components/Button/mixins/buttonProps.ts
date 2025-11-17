import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { iconSizeProp } from '@/components/Icon/mixins/iconProps.ts';
import {
  booleanProp,
  booleanTrueProp,
  defaultColorProp,
  stringArrayOrObjectProp,
  stringOrNumberProp,
  stringProp,
} from '@/mixins/CommonProps.ts';
import type { TButtonMode, TButtonSize, TButtonType, TInputOptionItem } from '@/types';
import type { Prop } from 'vue';

export const buttonMode = {
  type: String,
  default: 'default',
  validator: (value: string): boolean => ['default', 'icon', 'fab', 'floating'].includes(value),
} as Prop<TButtonMode>;

export const buttonSize = {
  type: String,
  default: undefined,
  validator: (value: string): boolean => ['xs', 'sm', 'lg'].includes(value),
} as Prop<TButtonSize>;

export const buttonType = {
  type: String,
  default: 'button',
  validator: (value: string): boolean => ['button', 'submit', 'reset', 'div'].includes(value),
} as Prop<TButtonType>;

export const iconPosition = {
  type: String,
  default: 'left',
  validator: (value: string): boolean => ['left', 'right'].includes(value),
};

export const buttonProps = {
  active: booleanProp,
  color: defaultColorProp,
  disabled: booleanProp,
  dropdownToggle: booleanProp,
  flat: booleanProp,
  href: stringProp,
  mode: buttonMode,
  outlined: booleanProp,
  pill: booleanTrueProp,
  pillOff: booleanProp,
  raised: booleanProp,
  readonly: booleanProp,
  rippleOff: booleanProp,
  rounded: booleanProp,
  size: buttonSize,
  tonal: booleanProp,
  type: buttonType,
  iconClass: stringArrayOrObjectProp,
  iconSize: iconSizeProp,
  iconPosition,
  ...iconBaseProps,
};

export const toggleButtonProps = {
  ...inputProps,
  items: {
    type: Array,
    default: undefined,
    required: true,
  } as Prop<TInputOptionItem[]>,
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined,
  },
  color: defaultColorProp,
  multiple: booleanProp,
  outlined: booleanProp,
  pill: booleanTrueProp,
  pillOff: booleanProp,
  raised: booleanProp,
  rounded: booleanProp,
  size: buttonSize,
  toggleColor: stringProp,
  tonal: booleanProp,
  iconSize: stringOrNumberProp,
  iconPosition,
};
