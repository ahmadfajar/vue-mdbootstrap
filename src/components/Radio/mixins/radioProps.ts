import { defaultColorProp } from '../../../mixins/CommonProps';
import { inputProps } from '../../Field/mixins/fieldProps';

export const radioProps = {
    ...inputProps,
    /**
     * Sets this component color.
     */
    color: defaultColorProp,
    /**
     * The `<input>` element `value` attribute.
     */
    value: {
        type: [String, Number, Boolean, Object],
        default: 'on',
    },
    /**
     * The input value to be monitored by `v-model`.
     */
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined,
    },
};

export const radioGroupProps = {
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
        validator: (value: string): boolean => {
            const pVal = parseInt(value, 10);
            return pVal > 0 && pVal < 7;
        },
    },
    /**
     * The collection of `<bs-radio>` property-value.
     */
    items: {
        type: Array,
        default: undefined,
        required: true,
    },
    /**
     * The value monitored by `v-model` to maintain the checked state.
     */
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: undefined,
    },
};
