import {booleanProp, booleanTrueProp, stringOrNumberProp, stringProp} from "../../../mixins/CommonProps";

export const progressBarProps = {
    /**
     * The component color appearance.
     * @type {string}
     */
    color: stringProp,
    /**
     * The ProgressBar thickness.
     * @type {string|number}
     */
    height: stringOrNumberProp,
    /**
     * The value monitored by `v-model` to control the progress bar value.
     * @type {number}
     */
    modelValue: {
        type: Number,
        default: 0,
        validator: (value: number): boolean => value >= 0 && value <= 100
    },
    /**
     * Set to `false` to remove the rounded border on the side of the progress bar.
     * @type {boolean}
     */
    rounded: booleanTrueProp,
    /**
     * Create striped ProgressBar.
     * @type {boolean}
     */
    striped: booleanProp,
    /**
     * Create animated stripe ProgressBar.
     * @type {boolean}
     */
    stripedAnimation: booleanProp,
    /**
     * Display progress bar's value or not.
     * @type {boolean}
     */
    showValue: booleanProp,
}
