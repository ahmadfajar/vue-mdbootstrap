import {primaryColorProp} from "../../../mixins/CommonProps";

export const progressProps = {
    /**
     * ProgressBar buffer length.
     * @type {string|number}
     */
    buffer: {
        type: [String, Number],
        default: 0,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * The component color appearance.
     * @type {string}
     */
    color: primaryColorProp,
    /**
     * Spinner diameter value.
     * @type {string|number}
     */
    diameter: {
        type: [String, Number],
        default: 60,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * ProgressBar thickness.
     * @type {string|number}
     */
    height: {
        type: [String, Number],
        default: 5,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * Spinner thickness.
     * @type {string|number}
     */
    stroke: {
        type: [String, Number],
        default: 6,
        validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
    /**
     * The value monitored by `v-model` to control the progress value.
     * @type {number}
     */
    modelValue: {
        type: Number,
        default: 0,
        validator: (value: number): boolean => value >= 0 && value <= 100
    },
    /**
     * ProgressControl mode, valid values are: `determinate`, `indeterminate`, `buffer`.
     * @type {string}
     */
    mode: {
        type: String,
        default: 'indeterminate',
        validator: (value: string): boolean => ['determinate', 'indeterminate', 'buffer'].includes(value)
    },
    /**
     * ProgressControl type, valid values are: `spinner`, `bar`.
     * @type {string}
     */
    type: {
        type: String,
        default: 'bar',
        validator: (value: string): boolean => ['spinner', 'bar'].includes(value)
    },
}
