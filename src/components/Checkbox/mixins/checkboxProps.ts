import {booleanProp, defaultColorProp} from "../../../mixins/CommonProps";
import {inputProps} from "../../Field/mixins/fieldProps";

export const checkboxProps = {
    ...inputProps,
    /**
     * Sets this component color.
     */
    color: defaultColorProp,
    /**
     * Sets this component state type.
     */
    indeterminate: booleanProp,
    /**
     * The `<input>` element `value` attribute.
     */
    value: {
        type: [String, Number, Boolean, Object],
        default: undefined,
        required: true
    },
    /**
     * The input value to be monitored by `v-model`.
     */
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined
    },
}

export const checkboxGroupProps = {
    /**
     * Sets this component color.
     */
    color: defaultColorProp,
    /**
     * Sets the maximum number of columns to display the checkbox. When the number of items
     * exceed the number of columns, then the remaining items will be displayed on the
     * next row. The maximum number of columns must be less than 7.
     */
    column: {
        type: [String, Number],
        default: undefined,
        validator: (value: string | number): boolean => (value as number) > 0 && (value as number) < 7
    },
    /**
     * Sets this component state type.
     */
    indeterminate: booleanProp,
    /**
     * The collection of `<bs-checkbox>` property-value.
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * The value monitored by `v-model` to maintain the checked state.
     */
    modelValue: {
        type: Array,
        default: undefined
    },
}
