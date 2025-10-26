import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import type { TDateTimePickerMode } from '@/components/DatePicker/types';
import { textFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import {
  popoverDefaultTransitionProp,
  popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps.ts';
import {
  booleanProp,
  booleanTrueProp,
  dateProp,
  primaryColorProp,
  stringOrArrayProp,
  stringOrNumberProp,
  stringProp,
  whiteColorProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

const pickerModeProp = {
  type: String,
  default: 'date',
  validator: (value: TDateTimePickerMode) => DatePickerConst.viewModes.includes(value),
} as Prop<TDateTimePickerMode>;

const pickerWidthProp = {
  type: [Number, String],
  default: 300,
  validator: (value: string) => parseInt(value, 10) > 0,
};

export const datePickerHeaderProps = {
  color: primaryColorProp,
  displayMode: pickerModeProp,
  pickerMode: pickerModeProp,
  enableTime: booleanTrueProp,
  landscape: booleanProp,
  locale: stringProp,
  readonly: booleanProp,
  modelValue: dateProp,
};

export const datePickerNavProps = {
  buttonColor: stringProp,
  displayMode: pickerModeProp,
  disabled: booleanProp,
  locale: stringProp,
  modelValue: dateProp,
};

export const datePickerTimesProps = {
  backButton: booleanTrueProp,
  disabled: booleanProp,
  locale: stringProp,
  modelValue: dateProp,
  selectedColor: stringProp,
  calendarButton: stringProp,
};

export const datePickerCalendarProps = {
  disabled: booleanProp,
  locale: stringProp,
  modelValue: dateProp,
  calendarDate: dateProp,
  calendarButton: stringProp,
  selectedColor: stringProp,
};

export const datePickerProps = {
  fullWidth: booleanProp,
  buttonColor: stringProp,
  selectedColor: stringProp,
  surfaceColor: whiteColorProp,
  surfaceClass: stringOrArrayProp,
  headerColor: primaryColorProp,
  headerPanel: booleanTrueProp,
  landscape: booleanProp,
  readonly: booleanProp,
  locale: stringProp,
  mode: pickerModeProp,
  viewMode: {
    type: String,
    default: undefined,
    validator: (value: TDateTimePickerMode) => DatePickerConst.viewModes.includes(value),
  } as Prop<TDateTimePickerMode>,
  modelValue: {
    type: [String, Number, Date],
    default: undefined,
  },
  width: pickerWidthProp,
};

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
    default: 'yyyy-MM-dd',
  },
  headerColor: primaryColorProp,
  headerPanel: booleanTrueProp,
  landscapeMode: booleanProp,
  openOnHover: booleanProp,
  viewMode: {
    type: String,
    default: undefined,
    validator: (value: TDateTimePickerMode) => DatePickerConst.viewModes.includes(value),
  } as Prop<TDateTimePickerMode>,
  pickerCls: {
    type: [String, Array],
    default: 'rounded shadow',
  },
  pickerButton: stringProp,
  pickerColor: whiteColorProp,
  pickerMode: pickerModeProp,
  pickerPlacement: popoverPlacementProp,
  pickerTransition: popoverDefaultTransitionProp,
  pickerWidth: pickerWidthProp,
};
