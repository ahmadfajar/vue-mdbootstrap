import {booleanProp, booleanTrueProp, stringProp} from "../../../mixins/CommonProps";
import {chipDefaultColor} from "./chipProps";

export const chipGroupProps = {
    /**
     * Custom CSS class to apply when the chip's item is in `active` state.
     */
    activeClass: stringProp,
    /**
     * Sets the default Chip items color.
     */
    color: chipDefaultColor,
    /**
     * Show checked icon when the Chip is selected.
     */
    checkedIcon: booleanProp,
    /**
     * Enable multi rows if total width of items beyond the container width.
     */
    column: booleanProp,
    /**
     * Create chip item's avatar with circle shape.
     */
    imgCircle: booleanProp,
    /**
     * Adjust Chip's avatar size to match the Chip height by eliminating the margin around the avatar.
     */
    imgPadding: booleanTrueProp,
    /**
     * Render this component with rounded-pill style.
     */
    pill: booleanProp,
    /**
     * Allow multiple selection or not.
     */
    multiple: booleanProp,
    /**
     * Render Chip items with outlined style or not.
     */
    outlined: booleanProp,
    /**
     * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
     */
    size: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ["sm", "lg"].includes(value)
    },
    /**
     * Show slider's button or not.
     */
    sliderButton: {
        type: Boolean,
        default: false
    },
    /**
     * Slider button color appearance.
     */
    sliderButtonColor: {
        type: String,
        default: "secondary"
    },
    /**
     * The collection of `<BsChip>` property-value.
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * The value monitored by `v-model` for the selected items.
     */
    modelValue: {
        type: [Object, Array],
        default: undefined
    },
}
