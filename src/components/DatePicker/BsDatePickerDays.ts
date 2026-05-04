/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  useCalendarTableDays,
  useRenderDatePickerDays,
  useSetupDatePickerCalender,
} from '@/components/DatePicker/mixins/datePickerCalendar.ts';
import { datePickerCalendarProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type {
  DatePickerCalendarEventProps,
  DatePickerCalendarEventPublic,
  TBsDatePickerCalendar,
  TDatePickerCalendarProps,
} from '@/components/DatePicker/types/internals.ts';
import type { TRecord } from '@/types';
import type { TDebounce } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent<TBsDatePickerCalendar>({
  name: 'BsDatePickerDays',
  props: datePickerCalendarProps,
  emits: ['change:calendar', 'update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TDatePickerCalendarProps>;
    const { localValue, calendarDate, transitionName } = useSetupDatePickerCalender(thisProps);
    const tableDays = computed(() => useCalendarTableDays(calendarDate.value));
    const debounce = reactive<TDebounce>({ timerId: undefined, lastExec: undefined });

    return () =>
      useRenderDatePickerDays(
        emit,
        thisProps,
        transitionName,
        tableDays,
        localValue,
        calendarDate,
        debounce
      );
  },
}) as DefineComponent<
  TBsDatePickerCalendar,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  DatePickerCalendarEventProps,
  string,
  PublicProps,
  Readonly<TDatePickerCalendarProps> & Readonly<DatePickerCalendarEventPublic>,
  ExtractDefaultPropTypes<TBsDatePickerCalendar>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
