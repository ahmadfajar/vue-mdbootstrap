import {booleanProp, defaultColorProp, inputProps} from "../../../mixins/CommonProps";

export const checkboxProps = {
    ...inputProps,
    /**
     * Sets this component color.
     * @type {string}
     */
    color: defaultColorProp,
    /**
     * Sets this component state type.
     * @type {boolean}
     */
    indeterminate: booleanProp,
    /**
     * The `<input>` element `value` attribute.
     * @type {string|number|boolean|Object}
     */
    value: {
        type: [String, Number, Boolean, Object],
        default: undefined
    },
    /**
     * The input value to be monitored by `v-model`.
     * @type {string|number|boolean|Object}
     */
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined
    },
}
