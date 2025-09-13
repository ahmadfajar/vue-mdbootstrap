import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps';
import { iconPosition } from '@/components/Button/mixins/buttonProps';
import type { TChipOptionItem, TChipSize, TChipValue } from '@/components/Chip/types';
import { booleanProp, booleanTrueProp, stringProp } from '@/mixins/CommonProps';
import type { Prop } from 'vue';

export const chipDefaultColor = {
    type: String,
    default: 'grey',
};

export const chipProps = {
    active: booleanProp,
    activeClass: stringProp,
    color: chipDefaultColor,
    disabled: booleanProp,
    readonly: booleanProp,
    dismissible: booleanProp,
    href: stringProp,
    imgSrc: stringProp,
    imgCircle: booleanProp,
    imgPadding: booleanTrueProp,
    imgPaddingOff: booleanProp,
    modelValue: booleanTrueProp,
    outlined: booleanProp,
    pill: booleanProp,
    rippleOff: booleanProp,
    size: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ['sm', 'lg'].includes(value),
    } as Prop<TChipSize>,
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition,
    ...iconBaseProps,
};

export const chipGroupProps = {
    activeClass: stringProp,
    color: chipDefaultColor,
    checkedIcon: booleanProp,
    column: booleanProp,
    imgCircle: booleanProp,
    imgPadding: booleanTrueProp,
    imgPaddingOff: booleanProp,
    pill: booleanProp,
    multiple: booleanProp,
    outlined: booleanProp,
    size: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ['sm', 'lg'].includes(value),
    } as Prop<TChipSize>,
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
