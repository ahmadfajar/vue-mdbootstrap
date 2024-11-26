import { validationProps } from '@/components/Field/mixins/validationProps';
import { iconVariant } from '@/components/Icon/mixins/iconProps.ts';
import {
    popoverDefaultTransitionProp,
    popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps';
import { useGenerateId } from '@/mixins/CommonApi';
import {
    booleanProp,
    booleanTrueProp,
    numberProp,
    stringOrNumberProp,
    stringProp,
    validStringOrFloatProp,
} from '@/mixins/CommonProps';
import type { TLabelPosition, TSpaceAround } from '@/types';
import type { Prop, PropType } from 'vue';

export const baseInputProps = {
    /**
     * Sets the `<input>` element `name` attribute.
     */
    name: stringOrNumberProp,
    /**
     * This input field state.
     */
    disabled: booleanProp,
    /**
     * This input field state.
     */
    readonly: booleanProp,
    /**
     * Whether this input field is required or not.
     */
    required: booleanProp,
};

export const inputProps = {
    /**
     * Sets the `<input>` element `ID` attribute. This property value is auto generates.
     */
    id: {
        type: String,
        default: () => useGenerateId(),
    },
    ...baseInputProps,
};

export const textFieldProps = {
    flat: booleanProp,
    filled: booleanProp,
    floatingLabel: booleanProp,
    outlined: booleanProp,
    clearButton: booleanProp,
    validationIcon: booleanProp,
    appendIcon: stringProp,
    appendIconOuter: stringProp,
    prependIcon: stringProp,
    prependIconOuter: stringProp,
    actionIconVariant: iconVariant,
};

export const numericFieldProps = {
    ...inputProps,
    ...textFieldProps,
    ...validationProps,
    autocomplete: {
        type: [String, Boolean],
        default: false,
    },
    autofocus: booleanProp,
    modelValue: numberProp,
    placeholder: stringProp,
    locale: stringProp,
    rounded: booleanProp,
    useGrouping: booleanTrueProp,
    spinButton: booleanTrueProp,
    spinButtonPlacement: {
        type: String as PropType<TLabelPosition>,
        default: 'right',
        validator: (v: TLabelPosition) => ['left', 'right'].includes(v),
    } as Prop<TLabelPosition>,
    actionButton: booleanProp,
    actionButtonPlacement: {
        type: String as PropType<TSpaceAround>,
        default: 'right',
        validator: (v: TSpaceAround) => ['left', 'right', 'both'].includes(v),
    } as Prop<TSpaceAround>,
    maxFraction: {
        type: [Number, String],
        default: 3,
        validator: (v: string) => !isNaN(parseInt(v)),
    },
    maxValue: validStringOrFloatProp,
    minValue: validStringOrFloatProp,
    step: {
        type: [Number, String],
        default: 1.0,
        validator: (v: string) => !isNaN(parseFloat(v)),
    },
    prefix: stringProp,
    suffix: stringProp,
};

export const searchFieldProps = {
    id: {
        type: String,
        default: () => useGenerateId(),
    },
    name: stringProp,
    disabled: booleanProp,
    readonly: booleanProp,
    autofocus: booleanProp,
    advanceSearch: booleanProp,
    modelValue: stringProp,
    darkMode: booleanProp,
    placeholder: {
        type: String,
        default: 'Search...',
    },
    minlength: {
        type: [String, Number],
        default: 4,
        validator: (value: string) => parseInt(value, 10) > 0,
    },
    popoverCls: {
        type: [String, Array],
        default: 'bg-white rounded shadow',
    },
    popoverMinWidth: {
        type: [Number, String],
        default: 480,
        validator: (value: string) => parseInt(value, 10) > 0,
    },
    popoverPlacement: popoverPlacementProp,
    popoverTransition: popoverDefaultTransitionProp,
};
