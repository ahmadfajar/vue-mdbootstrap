import type { Prop, PropType } from 'vue';
import { booleanProp, booleanTrueProp, defaultColorProp, stringProp } from '../../../mixins/CommonProps';
import type { TButtonMode, TButtonSize, TButtonType, TLabelPosition } from '../../../types';
import { iconProps } from '../../Avatar/mixins/avatarProps';
import { inputProps } from '../../Field/mixins/fieldProps';
import { iconSizeProp } from '../../Icon/mixins/iconProps';

export const buttonMode = {
    type: String,
    default: 'default',
    validator: (value: string): boolean => ['default', 'icon', 'fab', 'floating'].includes(value)
} as Prop<TButtonMode>

export const buttonSize = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ['xs', 'sm', 'lg'].includes(value)
} as Prop<TButtonSize>

export const buttonType = {
    type: String,
    default: 'button',
    validator: (value: string): boolean => ['button', 'submit', 'reset', 'div'].includes(value)
} as Prop<TButtonType>

export const iconPosition = {
    type: String as PropType<TLabelPosition>,
    default: 'left',
    validator: (value: string): boolean => ['left', 'right'].includes(value)
} as Prop<TLabelPosition>

export const buttonInnerProps = {
    dropdownToggle: booleanProp,
    iconMode: booleanProp,
    hasIcon: booleanProp,
    rippleOff: booleanProp,
    tagName: {
        type: String,
        default: 'span',
    }
}

export const buttonProps = {
    active: booleanProp,
    color: defaultColorProp,
    disabled: booleanProp,
    readonly: booleanProp,
    mode: buttonMode,
    dropdownToggle: booleanProp,
    flat: booleanProp,
    outlined: booleanProp,
    raised: booleanProp,
    rounded: booleanProp,
    pill: booleanTrueProp,
    href: stringProp,
    size: buttonSize,
    iconSize: iconSizeProp,
    rippleOff: booleanProp,
    tonal: booleanProp,
    type: buttonType,
    iconPosition,
    ...iconProps,
}

export const toggleButtonProps = {
    ...inputProps,
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    multiple: booleanProp,
    modelValue: {
        type: [String, Number, Boolean, Array],
        default: undefined
    },
    flat: booleanProp,
    outlined: booleanProp,
    raised: booleanProp,
    rounded: booleanProp,
    pill: booleanTrueProp,
    size: buttonSize,
    color: defaultColorProp,
    tonal: booleanProp,
    toggleColor: stringProp,
    iconPosition,
}
