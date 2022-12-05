import {defaultColorProp} from "../../../mixins/CommonProps";
import {inputProps} from "../../Field/mixins/fieldProps";


export const radioProps = {
    ...inputProps,
    /**
     * Sets this component color.
     * @type {string}
     */
    color: defaultColorProp,
    /**
     * The `<input>` element `value` attribute.
     * @type {string|number|boolean|Object}
     */
    value: {
        type: [String, Number, Boolean, Object],
        default: 'on',
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

export const radioGroupProps = {
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
     * The collection of `<bs-radio>` property-value.
     * @type {Array<TRadioProps>}
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * The value monitored by `v-model` to maintain the checked state.
     * @type {string|number|boolean|Object}
     */
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined
    },
}
