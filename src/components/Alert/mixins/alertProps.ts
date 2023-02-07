import {booleanProp, booleanTrueProp, defaultTransitionProp, stringProp} from "../../../mixins/CommonProps";
import {iconProps} from "../../Avatar/mixins/avatarProps";
import {iconVariant} from "../../Icon/mixins/iconProps";

export const alertProps = {
    /**
     * Alert color
     * @type {string}
     */
    color: stringProp,
    /**
     * When sets, display the close button to dismiss/hide the component.
     * @type {boolean}
     */
    dismissible: booleanProp,
    /**
     * Use predefined icon style to create contextual alert.
     * @type {string}
     */
    iconVariant,
    /**
     * Deprecated, use `variant` property instead.
     * @type {string}
     */
    iconType: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ["success", "info", "warning", "danger", "help"].includes(value)
    },
    /**
     * Use predefined icon to create contextual alert.
     * @type {string}
     */
    variant: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ["success", "info", "warning", "danger", "help"].includes(value)
    },
    /**
     * Create outlined alert style.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Create alert with solid fill style.
     * @type {boolean}
     */
    filled: booleanProp,
    /**
     * Deprecated, use `filled` property instead.
     * @type {boolean}
     */
    solidFill: booleanProp,
    /**
     * The component animation transition to display/hide.
     * @type {string}
     */
    transition: defaultTransitionProp,
    /**
     * The value monitored by `v-model` to display or hide the alert component.
     * @type {boolean}
     */
    modelValue: booleanTrueProp,
    ...iconProps,
}
