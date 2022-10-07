import {booleanProp, booleanTrueProp, stringProp} from "../../../mixins/CommonProps";
import {iconProps} from "../../Avatar/mixins/avatarProps";
import {iconVariant} from "../../Icon/mixins/iconProps";

export const chipDefaultColor = {
    type: String,
    default: 'grey'
}

export const chipProps = {
    /**
     * Sets this component state: `active` or `normal`.
     * @type {boolean}
     */
    active: booleanProp,
    /**
     * Custom CSS class to apply when the chip is in active state.
     * @type {string}
     */
    activeClass: stringProp,
    /**
     * The default chip color to apply.
     * @type {string}
     */
    color: chipDefaultColor,
    /**
     * Sets this component state: `enabled` or `disabled`.
     * @type {boolean}
     */
    disabled: booleanProp,
    /**
     * When sets, display the close button to dismiss/hide this component.
     * @type {boolean}
     */
    dismissible: booleanProp,
    /**
     * Render as `<a>` element and define its `href` property and apply chip styles to the element.
     * @type {string}
     */
    href: stringProp,
    /**
     * Enable avatar and set the image location url.
     * @type {string}
     */
    imgSrc: stringProp,
    /**
     * Create avatar with circle shape style.
     * @type {boolean}
     */
    imgCircle: booleanProp,
    /**
     * Adjust avatar size to match the Chip height by eliminating the margin around the avatar.
     * @type {boolean}
     */
    imgPadding: booleanTrueProp,
    /**
     * The value monitored by `v-model` to show or hide the Chip component.
     * @type {boolean}
     */
    modelValue: booleanTrueProp,
    /**
     * Render this component with outlined style or not.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Render this component with rounded-pill style.
     * @type {boolean}
     */
    pill: booleanProp,
    /**
     * Enabled or disabled ripple effect.
     * Ripple effect is automatically disabled when `click` event or `href` property is not defined.
     * @type {boolean}
     */
    rippleOff: booleanProp,
    /**
     * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
     * @type {string}
     */
    size: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ['sm', 'lg'].includes(value)
    },
    /**
     * Use predefined icon style to be used inside this component.
     * @type {string}
     */
    iconVariant,
    ...iconProps,
}
