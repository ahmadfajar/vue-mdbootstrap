import {booleanProp, booleanTrueProp, defaultColorProp, inputProps, stringProp} from "../../../mixins/CommonProps";
import {width as iconSize} from "../../Icon/mixins/iconProps";
import {iconProps} from "../../Avatar/mixins/avatarProps";

export const buttonMode = {
    type: String,
    default: "default",
    validator: (value: string): boolean => ["default", "icon", "floating"].includes(value)
}

export const buttonSize = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ["xs", "sm", "lg"].includes(value)
}

export const buttonType = {
    type: String,
    default: "button",
    validator: (value: string): boolean => ["button", "submit", "reset", "div"].includes(value)
}

export const iconPosition = {
    type: String,
    default: "left",
    validator: (value: string): boolean => ["left", "right"].includes(value)
}

export const buttonInnerProps = {
    dropdownToggle: booleanProp,
    iconMode: booleanProp,
    hasIcon: booleanProp,
    rippleOff: booleanProp,
    tagName: {
        type: String,
        default: "span",
    }
}

export const buttonProps = {
    /**
     * Sets this button state: `active` or `normal`.
     * @type {boolean}
     */
    active: booleanProp,
    /**
     * Sets this button color.
     * @type {string}
     */
    color: defaultColorProp,
    /**
     * Sets this button state: `enabled` or `disabled`.
     * @type {boolean}
     */
    disabled: booleanProp,
    /**
     * This button component mode, valid values are: `default, icon, floating`.
     * @type {string}
     */
    mode: buttonMode,
    /**
     * Render this button component as dropdowns button or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/dropdowns/)}
     * for details.
     * @type {boolean}
     */
    dropdownToggle: booleanProp,
    /**
     * Render this button with flat style (Google Material Text Button) or not.
     * @type {boolean}
     */
    flat: booleanProp,
    /**
     * Render this button with outlined style (Google Material Outlined Button) or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#outline-buttons)}
     * for details.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Render this button with raised style (Google Material Elevated Button) or not.
     * @type {boolean}
     */
    raised: booleanProp,
    /**
     * Render this button with rounded style or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/)}
     * for details.
     * @type {boolean}
     */
    rounded: booleanProp,
    /**
     * Render button with rounded-pill style (Google Material Button) or not.
     * @type {boolean}
     */
    pill: booleanTrueProp,
    /**
     * Render component as `<a>` element and define its `href` property and
     * apply button styles to the element.
     * @type {string}
     */
    href: stringProp,
    /**
     * This button size, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#sizes)}
     * for details.
     * @type {string}
     */
    size: buttonSize,
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     * @type {string}
     */
    iconPosition,
    /**
     * Render the icon with predefined size.
     * @type {number}
     */
    iconSize,
    /**
     * Enabled or disabled **ripple** effect.
     * @type {boolean}
     */
    rippleOff: booleanProp,
    /**
     * Render button with transparent style or not.
     * @type {boolean}
     */
    transparent: booleanProp,
    /**
     * The value to set to the button’s type attribute. Valid values are: `button`, `submit`, `reset`.
     * @type {string}
     */
    type: buttonType,
    ...iconProps,
}

export const toggleButtonProps = {
    ...inputProps,
    /**
     * The number of items stored in the collection.
     * @type {Array<TInputOptionItem>}
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * Allow multiple choice or not.
     * @type {boolean}
     */
    multiple: booleanProp,
    /**
     * The input value to be monitored by `v-model`.
     * @type {string|boolean|Number|Array}
     */
    modelValue: {
        type: [String, Number, Boolean, Array],
        default: undefined
    },
    /**
     * Render this button with flat style (Google Material Text Button) or not.
     * @type {boolean}
     */
    flat: booleanProp,
    /**
     * Render this button with outlined style (Google Material Outlined Button) or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#outline-buttons)}
     * for details.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Render this button with raised style (Google Material Elevated Button) or not.
     * @type {boolean}
     */
    raised: booleanProp,
    /**
     * Render this button with rounded style or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/)}
     * for details.
     * @type {boolean}
     */
    rounded: booleanProp,
    /**
     * Render button with rounded-pill style (Google Material Button) or not.
     * @type {boolean}
     */
    pill: booleanTrueProp,
    /**
     * This button size, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#sizes)}
     * for details.
     * @type {string}
     */
    size: buttonSize,
    /**
     * Sets this button color.
     * @type {string}
     */
    color: defaultColorProp,
    /**
     * Color to apply when Button is active or selected.
     * @type {string}
     */
    toggleColor: stringProp,
    /**
     * Place icon at `left` (before text) or at `right` (after text).
     * @type {string}
     */
    iconPosition,
}
