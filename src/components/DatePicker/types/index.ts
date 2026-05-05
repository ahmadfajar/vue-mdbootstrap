import type { TButtonColor } from '@/components/Button/types';
import type { TPopoverPosition } from '@/components/Popover/types';
import type { Numberish, TContextColor } from '@/types';
import type { ComponentObjectPropsOptions } from 'vue';
import type { TInputFieldProps } from '../../Field/types';

export declare type TDateTimePickerMode = 'date' | 'datetime' | 'year' | 'month' | 'time';

export declare type TDatePickerOptionProps = {
  /**
   * Display this component in 100% width or occupy its parent element width.
   */
  fullWidth?: boolean;

  /**
   * Sets calendar `date`, `month`, `year` `time` and `navigation` button color.
   * Default is `secondary`.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`,
   * `dark`, `default`.
   */
  buttonColor?: TButtonColor | string;

  /**
   * Sets selected calendar `date`, `month`, `year` and `time` button color.
   * Default is interpolated from `headerColor`.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`,
   * `dark`, `default`.
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
   * Optional, sets custom CSS class for component's background and text color.
   */
  surfaceClass?: string | string[];

  /**
   * Sets component's header panel background color. Default is `primary`.
   *
   * Custom CSS class can also be used as the value for this property.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `default`.
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
  modelValue?: Numberish | Date | null;

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
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `default`.
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
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`,
   * `dark`, `default`.
   */
  pickerButton?: TButtonColor | string;

  /**
   * Sets DatePicker selected calendar `date`, `month`, `year` and `time` button color.
   * Default is interpolated from `headerColor`.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`,
   * `dark`, `default`.
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

export declare type TBsDateTimeField = ComponentObjectPropsOptions<TDateTimeFieldOptionProps>;

// export declare const BsDatePicker: {
//   new (): {
//     $props: PublicComponentProps & UpdateModelValueEventPublic<string> & TDatePickerOptionProps;
//     $emits: {
//       (event: 'update:model-value', value: string): void;
//     };
//   };
// };

// declare interface DateTimeFieldEvents
//   extends ClosableVoidEventPublic, UpdateModelValueEventPublic<string> {
//   /**
//    * Fired when this component lost focus.
//    */
//   onBlur?: EventListener;
//
//   /**
//    * Fired when this component got focused.
//    */
//   onFocus?: EventListener;
//
//   /**
//    * Fired when this component's value is being cleared.
//    */
//   onClear?: VoidFunction;
//
//   /**
//    * Fired when the DatePicker popup is open or showed.
//    */
//   onOpen?: VoidFunction;
//
//   /**
//    * Fired when this component lost focus.
//    */
//   '@blur'?: EventListener;
//
//   /**
//    * Fired when this component got focused.
//    */
//   '@focus'?: EventListener;
//
//   /**
//    * Fired when this component's value is being cleared.
//    */
//   '@clear'?: VoidFunction;
//
//   /**
//    * Fired when the DatePicker popup is open or showed.
//    */
//   '@open'?: VoidFunction;
// }
//
// export declare const BsDateTimeField: {
//   new (): {
//     $props: PublicComponentProps & DateTimeFieldEvents & TDateTimeFieldOptionProps;
//     $slots: {
//       default?: (arg: { id: string }) => VNode[];
//       'append-inner'?: () => VNode;
//       'append-outer'?: () => VNode;
//       'prepend-inner'?: () => VNode;
//       'prepend-outer'?: () => VNode;
//       'help-text'?: () => VNode;
//     };
//     $emits: {
//       (event: 'clear'): void;
//       (event: 'close'): void;
//       (event: 'open'): void;
//       (event: 'blur', target: Event): void;
//       (event: 'focus', target: Event): void;
//       (event: 'update:model-value', value: string): void;
//     };
//   };
// };
//
// export declare const BsDatePickerPlugin: ObjectPlugin;
