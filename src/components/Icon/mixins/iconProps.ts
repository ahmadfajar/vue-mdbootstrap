import type {Prop, PropType} from "vue";
import type {TFlipMode, TIconVariant} from "../types";
import { booleanProp, stringProp, validStringOrNumberProp } from '../../../mixins/CommonProps';

export const iconSizeProp = {
    type: [String, Number],
    default: 24,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export const iconName = {
    type: String,
    required: true
}

export const iconVariant = {
    type: String as PropType<TIconVariant>,
    default: "filled",
    validator: (value: string): boolean => ["outlined", "filled", "rounded", "sharp"].includes(value),
} as Prop<TIconVariant>

export const flip = {
    type: String as PropType<TFlipMode>,
    default: undefined,
    validator: (value: string): boolean => ["horizontal", "vertical", "both"].includes(value),
} as Prop<TFlipMode>

export const rotate = {
    type: [String, Number],
    default: undefined,
    validator: (value: string | number): boolean => [90, 180, 270].includes(parseInt(String(value), 10))
}

export const iconProps = {
    /**
     * The icon’s name or alias.
     */
    icon: iconName,
    /**
     * The icon’s height in pixel.
     */
    height: validStringOrNumberProp,
    /**
     * The icon’s width in pixel.
     */
    width: validStringOrNumberProp,
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse: booleanProp,
    /**
     * Apply **spin** animation to the icon.
     */
    spin: booleanProp,
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     */
    flip,
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     */
    rotate,
}

export const iconSpinnerProps = {
    /**
     * The Icon color.
     */
    color: stringProp,
    /**
     * The icon’s size in pixel.
     */
    size: iconSizeProp,
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse: booleanProp,
    /**
     * Apply **spin** animation to the icon.
     */
    spin: booleanProp,
}

export const toggleIconProps = {
    /**
     * The icon’s name or alias.
     */
    icon: iconName,
    /**
     * The icon to display when `value` property is `true`.
     */
    toggleIcon: iconName,
    /**
     * Value monitored by `v-model` to maintain this component state.
     */
    modelValue: booleanProp,
    /**
     * The icon size in pixels.
     */
    size: iconSizeProp,
}
