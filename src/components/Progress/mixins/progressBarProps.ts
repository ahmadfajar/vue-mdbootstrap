import {booleanProp, booleanTrueProp, stringOrNumberProp, stringProp} from "../../../mixins/CommonProps";

export const progressBarProps = {
    /**
     * The component color appearance.
     */
    color: stringProp,
    /**
     * The ProgressBar thickness.
     */
    height: stringOrNumberProp,
    /**
     * The value monitored by `v-model` to control the progress bar value.
     */
    modelValue: {
        type: Number,
        default: 0,
        validator: (value: number): boolean => value >= 0 && value <= 100
    },
    /**
     * Set to `false` to remove the rounded border on the side of the progress bar.
     */
    rounded: booleanTrueProp,
    /**
     * Create striped ProgressBar.
     */
    striped: booleanProp,
    /**
     * Create animated stripe ProgressBar.
     */
    stripedAnimation: booleanProp,
    /**
     * Display progress bar's value or not.
     */
    showValue: booleanProp,
}
