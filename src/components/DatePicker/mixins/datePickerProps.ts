import type {Prop, PropType} from "vue";
import {
    booleanProp,
    booleanTrueProp,
    dateProp,
    primaryColorProp,
    stringOrNumberProp,
    stringProp,
    whiteColorProp
} from "../../../mixins/CommonProps";
import {inputProps, textFieldProps} from "../../Field/mixins/fieldProps";
import {validationProps} from "../../Field/mixins/validationProps";
import {popoverDefaultTransitionProp, popoverPlacementProp} from "../../Popover/mixins/popoverProps";
import type {TDateTimePickerMode} from "../types";
import {DatePickerConst} from "./datePickerApi";

const pickerModeProp = {
    type: String as PropType<TDateTimePickerMode>,
    default: "date",
    validator: (value: TDateTimePickerMode) => DatePickerConst.viewModes.includes(value)
} as Prop<TDateTimePickerMode>

const pickerWidthProp = {
    type: [Number, String],
    default: 300,
    validator: (value: string) => parseInt(value, 10) > 0
}

export const datePickerHeaderProps = {
    color: primaryColorProp,
    displayMode: pickerModeProp,
    pickerMode: pickerModeProp,
    enableTime: booleanTrueProp,
    landscape: booleanProp,
    locale: stringProp,
    readonly: booleanProp,
    modelValue: dateProp,
}

export const datePickerNavProps = {
    buttonColor: stringProp,
    displayMode: pickerModeProp,
    disabled: booleanProp,
    locale: stringProp,
    modelValue: dateProp,
}

export const datePickerTimesProps = {
    backButton: booleanTrueProp,
    disabled: booleanProp,
    locale: stringProp,
    modelValue: dateProp,
    selectedColor: stringProp,
}

export const datePickerCalendarProps = {
    disabled: booleanProp,
    locale: stringProp,
    modelValue: dateProp,
    calendarDate: dateProp,
    selectedColor: stringProp,
}

export const datePickerProps = {
    fullWidth: booleanProp,
    surfaceColor: whiteColorProp,
    headerColor: primaryColorProp,
    headerPanel: booleanTrueProp,
    landscape: booleanProp,
    readonly: booleanProp,
    locale: stringProp,
    mode: pickerModeProp,
    viewMode: pickerModeProp,
    modelValue: {
        type: [String, Number, Date],
        default: undefined
    },
    width: pickerWidthProp,
}

export const dateTimeFieldProps = {
    ...inputProps,
    ...textFieldProps,
    ...validationProps,
    autofocus: booleanProp,
    modelValue: stringOrNumberProp,
    placeholder: stringProp,
    locale: stringProp,
    displayFormat: stringProp,
    valueFormat: {
        type: String,
        default: "yyyy-MM-dd",
    },
    headerColor: primaryColorProp,
    headerPanel: booleanTrueProp,
    landscapeMode: booleanProp,
    openOnHover: booleanProp,
    viewMode: stringProp as Prop<TDateTimePickerMode>,
    transition: stringProp,
    pickerCls: {
        type: [String, Array],
        default: "bg-white rounded shadow"
    },
    pickerColor: whiteColorProp,
    pickerMode: pickerModeProp,
    pickerPlacement: popoverPlacementProp,
    pickerTransition: popoverDefaultTransitionProp,
    pickerWidth: pickerWidthProp,
}
