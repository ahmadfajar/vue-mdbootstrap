import type { TIconVariant } from '@/components/Avatar/types';
import { flip, rotate } from '@/components/Icon/mixins/iconProps';
import type { TSizeProps } from '@/components/Icon/types';
import { booleanProp, stringOrNumberProp, stringProp, validStringOrNumberProp, } from '@/mixins/CommonProps';
import type { Numberish } from '@/types';
import type { Prop } from 'vue';

export const iconVariant = {
  type: String,
  default: 'outlined',
  validator: (value: string): boolean =>
    [
      'outlined',
      'rounded',
      'sharp',
      'filled',
      'outlined_filled',
      'rounded_filled',
      'sharp_filled',
    ].includes(value),
} as Prop<TIconVariant>;

export const iconBaseProps = {
    icon: stringProp,
    iconFlip: flip,
    iconRotation: rotate,
    iconSpin: booleanProp,
    iconPulse: booleanProp,
    iconVariant,
};

export const imageBaseProps = {
    circle: booleanProp,
    rounded: booleanProp,
    imgSrc: stringProp,
    size: {
        type: [Number, String, Object],
        default: 48,
    } as Prop<Numberish | TSizeProps>,
};

export const avatarProps = {
    border: stringOrNumberProp,
    borderColor: stringProp,
    height: validStringOrNumberProp,
    width: validStringOrNumberProp,
    text: stringProp,
    ...iconBaseProps,
    ...imageBaseProps,
};
