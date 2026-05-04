import type { TButtonColor } from '@/components/Button/types';
import type { TDateTimePickerMode } from '@/components/DatePicker/types/index.ts';
import type { TContextColor } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import type { ComponentObjectPropsOptions } from 'vue';

export declare type TTimePickerMode = 'time' | 'hour' | 'minute' | 'second';

export declare type TDatePickerBaseProps = {
  locale?: string;
  modelValue?: Date;
};

export declare type TDatePickerHeaderProps = TDatePickerBaseProps & {
  displayMode?: TDateTimePickerMode;
  pickerMode?: TDateTimePickerMode;
  color?: TContextColor | string;
  enableTime?: boolean;
  readonly?: boolean;
  landscape?: boolean;
};

export declare type TDatePickerNavProps = TDatePickerBaseProps & {
  buttonColor?: TButtonColor | string;
  displayMode?: TDateTimePickerMode;
  disabled?: boolean;
};

export declare type TDatePickerCalendarProps = TDatePickerBaseProps & {
  disabled?: boolean;
  calendarDate?: Date;
  calendarButton: TButtonColor | string;
  selectedColor?: TButtonColor | string;
};

export declare type TTimePickerProps = TDatePickerBaseProps & {
  backButton?: boolean;
  disabled?: boolean;
  selectedColor?: string;
  calendarButton: TButtonColor | string;
};

export declare type TBsDatePickerTimes = ComponentObjectPropsOptions<TTimePickerProps>;

export declare type TBsDatePickerCalendar = ComponentObjectPropsOptions<TDatePickerCalendarProps>;

export declare type TBsDatePickerHeader = ComponentObjectPropsOptions<TDatePickerHeaderProps>;

export declare type TBsDatePickerNav = ComponentObjectPropsOptions<TDatePickerNavProps>;

export declare type DatePickerCalendarEventProps = UpdateModelValueEventProps<Date> & {
  'change:calendar'?: (value: Date) => void;
};

export declare interface DatePickerCalendarEventPublic extends UpdateModelValueEventPublic<Date> {
  'onChange:calendar'?: (value: Date) => void;
  '@change:calendar'?: (value: Date) => void;
}
