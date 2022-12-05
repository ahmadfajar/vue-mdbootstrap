import {booleanProp, stringProp, validStringOrNumberProp} from "../../../mixins/CommonProps";
import {flip, rotate} from "../../Icon/mixins/iconProps";

export const iconProps = {
    /**
     * Shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    icon: stringProp,
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     * @type {string}
     */
    iconFlip: flip,
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     * @type {string|number}
     */
    iconRotation: rotate,
    /**
     * Apply **spin** animation to the icon.
     * @type {boolean}
     */
    iconSpin: booleanProp,
    /**
     * Apply **pulse** animation to the icon.
     * @type {boolean}
     */
    iconPulse: booleanProp,
}

export const imageProps = {
    /**
     * Create this component with circle shape.
     * @type {boolean}
     */
    circle: booleanProp,
    /**
     * Create this component with rounded shape.
     * @type {boolean}
     */
    rounded: booleanProp,
    /**
     * The image location to place inside this component.
     * @type {string}
     */
    imgSrc: stringProp,
    /**
     * Shortcut to create this component with equal height and width.
     * @type {string|number|TSizeProps}
     */
    size: {
        type: [Number, String, Object],
        default: 48,
    },
}

export const avatarProps = {
    /**
     * This component's height.
     * @type {string|number}
     */
    height: validStringOrNumberProp,
    /**
     * This component's width.
     * @type {string|number}
     */
    width: validStringOrNumberProp,
    /**
     * The text to display inside the component.
     * Use short text (1 to 3 characters) to properly display it.
     * The text will be transformed to uppercase.
     * @type {string}
     */
    text: stringProp,
    ...iconProps,
    ...imageProps,
}

