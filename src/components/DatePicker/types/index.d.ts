import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import type {
    EventClosableProps,
    EventUpdateModelValueProps,
    TInputFieldProps,
    TPopoverPosition
} from '../../../types';

export declare type TDateTimePickerMode = 'date' | 'datetime' | 'year' | 'month' | 'time';

export declare type TTimePickerMode = 'time' | 'hour' | 'minute' | 'second';

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
     * Show the DatePicker on `mouseenter` event.
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
     * effected by `pickerPlacement` property.
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

declare type AllowedDatePickerProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string>;

declare type AllowedDateTimeFieldProps = AllowedComponentProps & ComponentCustomProps & VNodeProps &
    EventClosableProps & EventUpdateModelValueProps<string> & {
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    onClear?: VoidFunction;
    onOpen?: VoidFunction;
}

export declare const BsDatePicker: {
    new(): {
        $props: AllowedDatePickerProps & TDatePickerOptionProps;
        $emit: ['update:model-value'];
    };
};

export declare const BsDateTimeField: {
    new(): {
        $props: AllowedDateTimeFieldProps & TDateTimeFieldOptionProps;
        $slots: {
            default?: (arg: { id: string }) => VNode[];
            appendInner?: () => VNode;
            appendOuter?: () => VNode;
            prependInner?: () => VNode;
            prependOuter?: () => VNode;
            helpText?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component lost focus.
             */
            'blur',
            /**
             * Fired when this component got focused.
             */
            'focus',
            /**
             * Fired when this component's value is being cleared.
             */
            'clear',
            /**
             * Fired when the DatePicker is closed or hide.
             */
            'close',
            /**
             * Fired when the DatePicker popup is open or showed.
             */
            'open',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
        ];
    };
};

export declare const BsDatePickerPlugin: {
    new(): Plugin;
};
