import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TRecord} from "../../../types";

export declare type TDateTimePickerMode = "date" | "datetime" | "year" | "month" | "time";

export declare type TTimePickerMode = "time" | "hour" | "minute" | "second";

export declare type TDatePickerBaseProps = {
    locale?: string;
    modelValue?: Date;
}

export declare type TDatePickerHeaderProps = TDatePickerBaseProps & {
    displayMode?: TDateTimePickerMode | string;
    pickerMode?: TDateTimePickerMode | string;
    color?: string;
    enableTime?: boolean;
    readonly?: boolean;
}

export declare type TDatePickerNavProps = TDatePickerBaseProps & {
    buttonColor?: string;
    displayMode?: TDateTimePickerMode | string;
    disabled?: boolean;
}

export declare type TDatePickerCalendarProps = TDatePickerBaseProps & {
    calendarDate?: Date;
    disabled?: boolean;
    selectedColor?: string;
}

export declare type TTimePickerProps = TDatePickerBaseProps & {
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
    mode?: TDateTimePickerMode | string;
    /**
     * @deprecated
     * Use `mode` property instead.
     */
    viewMode?: TDateTimePickerMode | string;
    /**
     * DatePicker's container width, default is 300px.
     */
    width?: number | string;
}

export declare type TBsDatePicker = ComponentObjectPropsOptions<TDatePickerOptionProps>;

export declare type TBsDatePickerHeader = ComponentObjectPropsOptions<TDatePickerHeaderProps>;

export declare type TBsDatePickerNav = ComponentObjectPropsOptions<TDatePickerNavProps>;

export declare type TBsDatePickerCalendar = ComponentObjectPropsOptions<TDatePickerCalendarProps>;

export declare type TBsDatePickerTimes = ComponentObjectPropsOptions<TTimePickerProps>;

export declare const BsDatePicker: DefineComponent<TBsDatePicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
