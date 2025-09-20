import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { iconPosition } from '@/components/Button/mixins/buttonProps.ts';
import type { TChipOptionItem, TChipSize, TChipValue } from '@/components/Chip/types';
import { booleanProp, booleanTrueProp, stringProp } from '@/mixins/CommonProps.ts';
import type { TContextColor } from '@/types';
import type { Prop } from 'vue';

const chipDefaultColor = {
  type: String,
  default: 'secondary',
} as Prop<TContextColor>;

const chipSize = {
  type: String,
  default: undefined,
  validator: (value: string): boolean => ['sm', 'lg'].includes(value),
} as Prop<TChipSize>;

export const chipProps = {
  active: booleanProp,
  activeClass: stringProp,
  color: chipDefaultColor,
  closeButtonColor: stringProp,
  disabled: booleanProp,
  readonly: booleanProp,
  dismissible: booleanProp,
  href: stringProp,
  imgSrc: stringProp,
  imgCircle: booleanProp,
  imgPaddingOff: booleanProp,
  modelValue: booleanTrueProp,
  outlined: booleanProp,
  pill: booleanProp,
  rippleOff: booleanProp,
  size: chipSize,
  /**
   * Place icon on the `left` side (before text) or on the `right` side (after text).
   */
  iconPosition,
  ...iconBaseProps,
};

export const chipGroupProps = {
  activeClass: stringProp,
  color: chipDefaultColor,
  closeButtonColor: stringProp,
  checkedIcon: booleanProp,
  column: booleanProp,
  imgCircle: booleanProp,
  imgPaddingOff: booleanProp,
  pill: booleanProp,
  multiple: booleanProp,
  outlined: booleanProp,
  size: chipSize,
  sliderButton: booleanProp,
  sliderButtonColor: {
    type: String,
    default: 'secondary',
  },
  items: {
    type: Array,
    default: undefined,
    required: true,
  } as Prop<TChipOptionItem[]>,
  modelValue: {
    type: [Object, Array],
    default: undefined,
  } as Prop<TChipValue | TChipValue[]>,
};
