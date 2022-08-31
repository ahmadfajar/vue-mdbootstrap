import {booleanProp, booleanTrueProp, stringProp} from "../../../mixins/CommonProps";
import {chipDefaultColor} from "./chipProps";

export const chipGroupProps = {
    /**
     * Custom CSS class to apply when the chip's item is in `active` state.
     * @type {string}
     */
    activeClass: stringProp,
    /**
     * Sets the default Chip items color.
     * @type {string}
     */
    color: chipDefaultColor,
    /**
     * Show checked icon when the Chip is selected.
     * @type {boolean}
     */
    checkedIcon: booleanProp,
    /**
     * Enable multi rows if total width of items beyond the container width.
     * @type {boolean}
     */
    column: booleanProp,
    /**
     * Create chip item's avatar with circle shape.
     * @type {boolean}
     */
    imgCircle: booleanProp,
    /**
     * Adjust Chip's avatar size to match the Chip height by eliminating the margin around the avatar.
     * @type {boolean}
     */
    imgPadding: booleanTrueProp,
    /**
     * Render this component with rounded-pill style.
     * @type {boolean}
     */
    pill: booleanProp,
    /**
     * Allow multiple selection or not.
     * @type {boolean}
     */
    multiple: booleanProp,
    /**
     * Render Chip items with outlined style or not.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
     * @type {string}
     */
    size: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ['sm', 'lg'].includes(value)
    },
    /**
     * Show slider's button or not.
     * @type {boolean}
     */
    sliderButton: {
        type: Boolean,
        default: false
    },
    /**
     * Slider button color appearance.
     * @type {string}
     */
    sliderButtonColor: {
        type: String,
        default: 'secondary'
    },
    /**
     * The collection of `<BsChip>` property-value.
     * @type {Array<TChipOptionItem>}
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * The value monitored by `v-model` for the selected items.
     * @type {TChipValue | Array<TChipValue>}
     */
    modelValue: {
        type: [Object, Array],
        default: undefined
    },
}
