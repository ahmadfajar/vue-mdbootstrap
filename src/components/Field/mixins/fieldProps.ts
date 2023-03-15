import type {Prop, PropType} from "vue";
import {
    booleanProp,
    booleanTrueProp,
    numberProp,
    stringOrNumberProp,
    stringProp,
    validStringOrFloatProp
} from "../../../mixins/CommonProps";
import {useGenerateId} from "../../../mixins/CommonApi";
import {validationProps} from "../../Radio/mixins/validationProps";
import type {TIconVariant, TLabelPosition, TSpaceAround} from "../../../types";
import {popoverDefaultTransitionProp, popoverPlacementProp} from "../../Popover/mixins/popoverProps";

export const baseInputProps = {
    /**
     * Sets the `<input>` element `name` attribute.
     * @type {string|number}
     */
    name: stringOrNumberProp,
    /**
     * This input field state.
     * @type {boolean}
     */
    disabled: booleanProp,
    /**
     * This input field state.
     * @type {boolean}
     */
    readonly: booleanProp,
    /**
     * Whether this input field is required or not.
     * @type {boolean}
     */
    required: booleanProp
}

export const inputProps = {
    /**
     * Sets the `<input>` element `ID` attribute. This property value is auto generates.
     * @type {string}
     */
    id: {
        type: String,
        default: () => useGenerateId()
    },
    ...baseInputProps,
}

export const textFieldProps = {
    /**
     * Create this component with **flat** appearance, and removes the borders.
     * The component appearance will be styled like plain text.
     * @type {boolean}
     */
    flat: booleanProp,
    /**
     * Create this component with **filled** appearance.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     * @type {boolean}
     */
    filled: booleanProp,
    /**
     * Create this component with floating field label.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     * @type {boolean}
     */
    floatingLabel: booleanProp,
    /**
     * Create this component with **outlined** appearance.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     * @type {boolean}
     */
    outlined: booleanProp,
    /**
     * Sets auto show the clear button.
     * @type {boolean}
     */
    clearButton: booleanProp,
    /**
     * Display validation icon or not, when this field has been validated.
     * @type {boolean}
     */
    validationIcon: booleanProp,
    /**
     * Sets icon to display on inner right side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    appendIcon: stringProp,
    /**
     * Sets icon to display on outer right side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    appendIconOuter: stringProp,
    /**
     * Sets icon to display on inner left side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    prependIcon: stringProp,
    /**
     * Sets icon to display on outer left side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     * @type {string}
     */
    prependIconOuter: stringProp,
    /**
     * Sets the action icon style variant.
     * @type {string}
     */
    actionIconVariant: {
        type: String as PropType<TIconVariant>,
        default: 'outlined',
        validator: (value: string): boolean => ["outlined", "filled", "round", "sharp"].includes(value),
    } as Prop<TIconVariant>,
}

export const numericFieldProps = {
    ...inputProps,
    ...textFieldProps,
    ...validationProps,
    autocomplete: {
        type: [String, Boolean],
        default: false
    },
    autofocus: booleanProp,
    modelValue: numberProp,
    placeholder: stringProp,
    locale: stringProp,
    useGrouping: booleanTrueProp,
    spinButton: booleanTrueProp,
    spinButtonPlacement: {
        type: String as PropType<TLabelPosition>,
        default: "right",
        validator: (v: TLabelPosition) => ["left", "right"].includes(v)
    } as Prop<TLabelPosition>,
    actionButton: booleanProp,
    actionButtonPlacement: {
        type: String as PropType<TSpaceAround>,
        default: "right",
        validator: (v: TSpaceAround) => ["left", "right", "both"].includes(v)
    } as Prop<TSpaceAround>,
    maxFraction: {
        type: [Number, String],
        default: 3,
        validator: (v: string) => !isNaN(parseInt(v))
    },
    maxValue: validStringOrFloatProp,
    minValue: validStringOrFloatProp,
    step: {
        type: [Number, String],
        default: 1.0,
        validator: (v: string) => !isNaN(parseFloat(v))
    },
}

export const searchFieldProps = {
    id: {
        type: String,
        default: () => useGenerateId()
    },
    name: stringProp,
    disabled: booleanProp,
    readonly: booleanProp,
    autofocus: booleanProp,
    advanceSearch: booleanProp,
    modelValue: stringProp,
    open: booleanProp,
    darkMode: booleanProp,
    placeholder: {
        type: String,
        default: 'Search...'
    },
    minlength: {
        type: [String, Number],
        default: 4,
        validator: (value: string) => parseInt(value, 10) > 0
    },
    popoverCls: {
        type: [String, Array],
        default: "bg-white rounded shadow"
    },
    popoverMinWidth: {
        type: [Number, String],
        default: 480,
        validator: (value: string) => parseInt(value, 10) > 0
    },
    popoverPlacement: popoverPlacementProp,
    popoverTransition: popoverDefaultTransitionProp,
}
