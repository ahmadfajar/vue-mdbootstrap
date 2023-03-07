import type {PropType} from "vue";
import {
    booleanProp,
    booleanTrueProp,
    dateProp,
    primaryColorProp,
    stringProp,
    whiteColorProp
} from "../../../mixins/CommonProps";
import type {TDateTimePickerMode} from "../types";
import {DatePickerConst} from "./datePickerApi";

export const pickerModeProp = {
    type: String as PropType<TDateTimePickerMode>,
    default: "date",
    validator: (value: TDateTimePickerMode) => DatePickerConst.viewModes.includes(value)
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
    width: {
        type: [Number, String],
        default: 300,
        validator: (value: string) => parseInt(value, 10) > 0
    },
}
