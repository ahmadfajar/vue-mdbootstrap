import type { TIconFlip, TIconRotation, TSizeProps } from '@/components/Icon/types';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps';
import type { Numberish } from '@/types';
import type { Prop } from 'vue';

export const iconSizeProp = {
  type: [String, Number],
  default: 24,
  validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
};

export const iconSizeObjectProp = {
  type: [String, Number, Object],
  default: undefined,
} as Prop<Numberish | TSizeProps>;

export const iconName = {
  type: String,
  required: true,
};

export const flip = {
  type: String,
  default: undefined,
  validator: (value: string): boolean => ['horizontal', 'vertical', 'both'].includes(value),
} as Prop<TIconFlip>;

export const rotate = {
  type: [String, Number],
  default: undefined,
  validator: (value: string | number): boolean =>
    [90, 180, 270].includes(parseInt(String(value), 10)),
} as Prop<TIconRotation>;

export const iconProps = {
  icon: iconName,
  height: validStringOrNumberProp,
  width: validStringOrNumberProp,
  pulse: booleanProp,
  spin: booleanProp,
  flip,
  rotate,
};

export const iconSpinnerProps = {
  color: stringProp,
  size: iconSizeProp,
  pulse: booleanProp,
  spin: booleanProp,
};

export const toggleIconProps = {
  icon: iconName,
  toggleIcon: iconName,
  filled: booleanProp,
  modelValue: booleanProp,
  size: iconSizeProp,
};
