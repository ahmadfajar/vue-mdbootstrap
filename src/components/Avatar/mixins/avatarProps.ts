import { flip, iconVariant, rotate } from '@/components/Icon/mixins/iconProps';
import type { TSizeProps } from '@/components/Icon/types';
import {
    booleanProp,
    stringOrNumberProp,
    stringProp,
    validStringOrNumberProp,
} from '@/mixins/CommonProps';
import type { Prop } from 'vue';

export const baseIconProps = {
    icon: stringProp,
    iconFlip: flip,
    iconRotation: rotate,
    iconSpin: booleanProp,
    iconPulse: booleanProp,
    iconVariant,
};

export const baseImageProps = {
    circle: booleanProp,
    rounded: booleanProp,
    imgSrc: stringProp,
    size: {
        type: [Number, String, Object],
        default: 48,
    } as Prop<string | number | TSizeProps>,
};

export const avatarProps = {
    border: stringOrNumberProp,
    borderColor: stringProp,
    height: validStringOrNumberProp,
    width: validStringOrNumberProp,
    text: stringProp,
    ...baseIconProps,
    ...baseImageProps,
};
