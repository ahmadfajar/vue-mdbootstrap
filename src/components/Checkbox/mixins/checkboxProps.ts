import {booleanProp, booleanTrueProp, defaultColorProp, inputProps, stringProp} from "../../../mixins/CommonProps";

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
        default: undefined,
        required: true
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

export const checkboxGroupProps = {
    /**
     * Sets this component color.
     * @type {string}
     */
    color: defaultColorProp,
    /**
     * Sets the maximum number of columns to display the checkbox. When the number of items
     * exceed the number of columns, then the remaining items will be displayed on the
     * next row. The maximum number of columns must be less than 7.
     * @type {string|number}
     */
    column: {
        type: [String, Number],
        default: undefined,
        validator: (value: string | number): boolean => (value as number) > 0 && (value as number) < 7
    },
    /**
     * Sets this component state type.
     * @type {boolean}
     */
    indeterminate: booleanProp,
    /**
     * The collection of `<bs-checkbox>` property-value.
     * @type {Array<TCheckboxProps>}
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * The value monitored by `v-model` to maintain the checked state.
     * @type {Array<string|number|*>}
     */
    modelValue: {
        type: Array,
        default: undefined
    },
}

const validator = {
    type: Object,
    validator: (v: object): boolean =>
        v.hasOwnProperty('validators') &&
        v.hasOwnProperty('messages') &&
        v.hasOwnProperty('hasError')
}

export const validationProps = {
    /**
     * The help text to display below the field component.
     * @type {string}
     */
    helpText: stringProp,
    /**
     * Show persistent help text or not.
     * @type {boolean}
     */
    persistentHelpText: booleanTrueProp,
    /**
     * The external validator plugin to be used to validate this field value.
     * @type {Object}
     */
    validator,
    /**
     * Deprecated, use `validator` property instead.
     * @type {Object}
     */
    externalValidator: validator,
}
