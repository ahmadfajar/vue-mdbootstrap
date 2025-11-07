import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  EventVoidClosableProps,
  Numberish,
  TButtonColor,
  TContextColor,
  TInputFieldProps,
  TPopoverPosition,
} from '../../../types';

export declare type TDateTimePickerMode = 'date' | 'datetime' | 'year' | 'month' | 'time';

export declare type TTimePickerMode = 'time' | 'hour' | 'minute' | 'second';

export declare type TDatePickerBaseProps = {
  locale?: string;
  modelValue?: Date;
};

export declare type TDatePickerHeaderProps = TDatePickerBaseProps & {
  displayMode?: TDateTimePickerMode;
  pickerMode?: TDateTimePickerMode;
  color?: string;
  enableTime?: boolean;
  readonly?: boolean;
  landscape?: boolean;
};

export declare type TDatePickerNavProps = TDatePickerBaseProps & {
  buttonColor?: string;
  displayMode?: TDateTimePickerMode;
  disabled?: boolean;
};

export declare type TDatePickerCalendarProps = TDatePickerBaseProps & {
  disabled?: boolean;
  calendarDate?: Date;
  calendarButton: string;
  selectedColor?: string;
};

export declare type TTimePickerProps = TDatePickerBaseProps & {
  backButton?: boolean;
  disabled?: boolean;
  selectedColor?: string;
  calendarButton: string;
};

export declare type TDatePickerOptionProps = {
  /**
   * Display this component in 100% width or occupy its parent element width.
   */
  fullWidth?: boolean;

  /**
   * Sets calendar `date`, `month`, `year` `time` and `navigation` button color.
   * Default is `dark`.
   */
  buttonColor?: TButtonColor | string;

  /**
   * Sets selected calendar `date`, `month`, `year` and `time` button color.
   * Default is interpolated from `headerColor`.
   */
  selectedColor?: TButtonColor | string;

  /**
   * Optional, sets this component's container background color.
   *
   * @deprecated
   * Use `surfaceClass` instead.
   */
  surfaceColor?: string;

  /**
   * Optional, sets custom css class for component's background and text color.
   */
  surfaceClass?: string | string[];

  /**
   * Sets component's header panel background color. Default is `primary`.
   *
   * Custom CSS class can also be used as the value for this property.
   */
  headerColor?: TContextColor | string;

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
  modelValue?: string | number | Date | null;

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
  width?: Numberish;
};

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
   * Optional, sets DatePicker's header panel background color. Default is `primary`.
   *
   * Custom CSS class can also be used as the value for this property.
   */
  headerColor?: TContextColor | string;

  /**
   * Show or hide DatePicker's header panel.
   */
  headerPanel?: boolean;

  /**
   * Optional, sets custom CSS class for DatePicker's surface background and text color.
   */
  surfaceCls?: string | string[];

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
  modelValue?: Numberish | null;

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
   * Optional, sets custom CSS class for the DatePicker popover container.
   */
  pickerCls?: string | string[];

  /**
   * This DatePicker calendar date button and navigation button color. Default is `dark`.
   */
  pickerButton?: TButtonColor | string;

  /**
   * Sets DatePicker selected calendar `date`, `month`, `year` and `time` button color.
   * Default is interpolated from `headerColor`.
   */
  pickerSelectedColor?: TButtonColor | string;

  /**
   * Optional, sets DatePicker surface background color.
   *
   * @deprecated
   * Use `surfaceCls` property instead.
   */
  pickerColor?: string;

  /**
   * Sets the DatePicker popup display placement.
   */
  pickerPlacement?: TPopoverPosition;

  /**
   * DatePicker's container width, default is 300px.
   */
  pickerWidth?: Numberish;

  /**
   * Transition animation when showing the DateTime picker. This animation is
   * effected by `pickerPlacement` property.
   */
  pickerTransition?: string;
};

export declare type TBsDatePicker = ComponentObjectPropsOptions<TDatePickerOptionProps>;

export declare type TBsDatePickerHeader = ComponentObjectPropsOptions<TDatePickerHeaderProps>;

export declare type TBsDatePickerNav = ComponentObjectPropsOptions<TDatePickerNavProps>;

export declare type TBsDatePickerCalendar = ComponentObjectPropsOptions<TDatePickerCalendarProps>;

export declare type TBsDatePickerTimes = ComponentObjectPropsOptions<TTimePickerProps>;

export declare type TBsDateTimeField = ComponentObjectPropsOptions<TDateTimeFieldOptionProps>;

export declare const BsDatePicker: {
  new (): {
    $props: BaseComponentProps & EventUpdateModelValueProps<string> & TDatePickerOptionProps;
    $emits: {
      (event: 'update:model-value', value: string): void;
    };
  };
};

declare interface DateTimeFieldEvents
  extends EventVoidClosableProps,
    EventUpdateModelValueProps<string> {
  /**
   * Fired when this component lost focus.
   */
  onBlur?: EventListener;

  /**
   * Fired when this component got focused.
   */
  onFocus?: EventListener;

  /**
   * Fired when this component's value is being cleared.
   */
  onClear?: VoidFunction;

  /**
   * Fired when the DatePicker popup is open or showed.
   */
  onOpen?: VoidFunction;

  /**
   * Fired when this component lost focus.
   */
  '@blur'?: EventListener;

  /**
   * Fired when this component got focused.
   */
  '@focus'?: EventListener;

  /**
   * Fired when this component's value is being cleared.
   */
  '@clear'?: VoidFunction;

  /**
   * Fired when the DatePicker popup is open or showed.
   */
  '@open'?: VoidFunction;
}

export declare const BsDateTimeField: {
  new (): {
    $props: BaseComponentProps & DateTimeFieldEvents & TDateTimeFieldOptionProps;
    $slots: {
      default?: (arg: { id: string }) => VNode[];
      'append-inner'?: () => VNode;
      'append-outer'?: () => VNode;
      'prepend-inner'?: () => VNode;
      'prepend-outer'?: () => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'close'): void;
      (event: 'open'): void;
      (event: 'blur', target: Event): void;
      (event: 'focus', target: Event): void;
      (event: 'update:model-value', value: string): void;
    };
  };
};

export declare const BsDatePickerPlugin: ObjectPlugin;
