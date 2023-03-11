import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TRecord} from "../../../types";
import {TInputFieldProps, TPopoverPosition} from "../../../types";

export declare type TDateTimePickerMode = "date" | "datetime" | "year" | "month" | "time";

export declare type TTimePickerMode = "time" | "hour" | "minute" | "second";

export declare type TDatePickerBaseProps = {
    locale?: string;
    modelValue?: Date;
}

export declare type TDatePickerHeaderProps = TDatePickerBaseProps & {
    displayMode?: TDateTimePickerMode;
    pickerMode?: TDateTimePickerMode;
    color?: string;
    enableTime?: boolean;
    readonly?: boolean;
    landscape?: boolean;
}

export declare type TDatePickerNavProps = TDatePickerBaseProps & {
    buttonColor?: string;
    displayMode?: TDateTimePickerMode;
    disabled?: boolean;
}

export declare type TDatePickerCalendarProps = TDatePickerBaseProps & {
    calendarDate?: Date;
    disabled?: boolean;
    selectedColor?: string;
}

export declare type TTimePickerProps = TDatePickerBaseProps & {
    backButton?: boolean;
    disabled?: boolean;
    selectedColor?: string;
}

export declare type TDatePickerOptionProps = {
    /**
     * Display this component in 100% width or occupy its parent element width.
     */
    fullWidth?: boolean;
    /**
     * This component's container background color.
     */
    surfaceColor?: string;
    /**
     * This component's header panel background color.
     */
    headerColor?: string;
    /**
     * Show or hide header panel.
     */
    headerPanel?: boolean;
    /**
     * Display this component in landscape orientation.
     */
    landscape?: boolean;
    /**
     * Define default locale to be used. Defaults is using browser's locale.
     */
    locale?: string;
    /**
     * Put this component in readonly state.
     */
    readonly?: boolean;
    /**
     * This component's value which is monitored by `v-model`.
     *
     * The initial value can be:
     * - From an ISO 8601 valid string.
     * - From a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC).
     */
    modelValue?: string | number | Date;
    /**
     * This component's view mode, valid values are: `datetime`, `date`, `month`, `year`, `time`
     */
    mode?: TDateTimePickerMode;
    /**
     * @deprecated
     * Use `mode` property instead.
     */
    viewMode?: TDateTimePickerMode;
    /**
     * DatePicker's container width, default is 300px.
     */
    width?: number | string;
}

export declare type TDateTimeFieldOptionProps = TInputFieldProps & {
    /**
     * Autofocus field when this component is mounted.
     */
    autofocus?: boolean;
    /**
     * Sets the field placeholder.
     */
    placeholder?: string;
    /**
     * This component's header panel background color.
     */
    headerColor?: string;
    /**
     * Show or hide header panel.
     */
    headerPanel?: boolean;
    /**
     * Display DatePicker component in landscape orientation.
     */
    landscapeMode?: boolean;
    /**
     * Define default locale to be used. Defaults is using browser's locale.
     */
    locale?: string;
    /**
     * This component's value which is monitored by `v-model`.
     *
     * The initial value can be:
     * - From an ISO 8601 valid string.
     * - From a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC).
     */
    modelValue?: string | number;
    /**
     * The format string to display the datetime value.
     */
    displayFormat?: string;
    /**
     * The format string for the datetime output value and also format pattern to
     * parse the initial `modelValue` data.
     */
    valueFormat?: string;
    /**
     * DatePicker popup state: show or hide.
     */
    open?: boolean;
    /**
     * Triggers the DatePicker to display when `mouseenter`.
     */
    openOnHover?: boolean;
    /**
     * @deprecated
     * Use `pickerMode` property instead.
     */
    viewMode?: TDateTimePickerMode;
    /**
     * This component's DatePicker view mode,
     * valid values are: `datetime`, `date`, `month`, `year`, `time`
     */
    pickerMode?: TDateTimePickerMode;
    /**
     * Custom CSS class for the DatePicker container.
     */
    pickerCls?: string | string[];
    /**
     * The DatePicker surface background color.
     */
    pickerColor?: string;
    /**
     * Sets the DatePicker popup display placement.
     */
    pickerPlacement?: TPopoverPosition;
    /**
     * DatePicker's container width, default is 300px.
     */
    pickerWidth?: number | string;
    /**
     * Transition animation when showing the DateTime picker. This animation is
     * effected by picker-placement property.
     */
    pickerTransition?: string;
    /**
     * @deprecated
     * Use `pickerTransition` property instead.
     */
    transition?: string;
}

export declare type TBsDatePicker = ComponentObjectPropsOptions<TDatePickerOptionProps>;

export declare type TBsDatePickerHeader = ComponentObjectPropsOptions<TDatePickerHeaderProps>;

export declare type TBsDatePickerNav = ComponentObjectPropsOptions<TDatePickerNavProps>;

export declare type TBsDatePickerCalendar = ComponentObjectPropsOptions<TDatePickerCalendarProps>;

export declare type TBsDatePickerTimes = ComponentObjectPropsOptions<TTimePickerProps>;

export declare type TBsDateTimeField = ComponentObjectPropsOptions<TDateTimeFieldOptionProps>;

export declare const BsDatePicker: DefineComponent<TBsDatePicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsDateTimeField: DefineComponent<TBsDateTimeField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
