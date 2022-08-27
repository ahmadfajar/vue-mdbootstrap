import {booleanProp, stringProp} from "../../../mixins/CommonProps";

export const height = {
    type: [String, Number],
    default: 24,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export const width = {
    type: [String, Number],
    default: 24,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export const iconName = {
    type: String,
    required: true
}

export const iconSize = {
    type: [String, Number],
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export const iconVariant = {
    type: String,
    default: "filled",
    validator: (value: string): boolean => ["outlined", "filled", "round", "sharp"].includes(value),
}

export const flip = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ['horizontal', 'vertical', 'both'].includes(value),
}

export const rotate = {
    type: [String, Number],
    default: undefined,
    validator: (value: string | number): boolean => [90, 180, 270].includes(parseInt(String(value), 10))
}

export const iconProps = {
    /**
     * The icon’s name or alias.
     * @type {string}
     */
    icon: iconName,
    /**
     * The icon’s height in pixel.
     * @type {string|number}
     */
    height,
    /**
     * The icon’s width in pixel.
     * @type {string|number}
     */
    width,
    /**
     * Apply **pulse** animation to the icon.
     * @type {boolean}
     */
    pulse: booleanProp,
    /**
     * Apply **spin** animation to the icon.
     * @type {boolean}
     */
    spin: booleanProp,
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     * @type {string}
     */
    flip,
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     * @type {string|number}
     */
    rotate,
}

export const iconSpinnerProps = {
    /**
     * The Icon color.
     * @type {string}
     */
    color: stringProp,
    /**
     * The icon’s size in pixel.
     * @type {string|number}
     */
    size: width,
    /**
     * Apply **pulse** animation to the icon.
     * @type {boolean}
     */
    pulse: booleanProp,
    /**
     * Apply **spin** animation to the icon.
     * @type {boolean}
     */
    spin: booleanProp,
}

export const toggleIconProps = {
    /**
     * The icon’s name or alias.
     * @type {string}
     */
    icon: iconName,
    /**
     * The icon to display when `value` property is `true`.
     * @type {string}
     */
    toggleIcon: iconName,
    /**
     * Value monitored by `v-model` to maintain this component state.
     * @type {boolean}
     */
    modelValue: booleanProp,
    /**
     * The icon size in pixels.
     * @type {string|number}
     */
    size: width,
}
