import {
  useCalendarTableMonths,
  useRenderDatePickerMonths,
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
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent<TBsDatePickerCalendar>({
  name: 'BsDatePickerMonths',
  props: datePickerCalendarProps,
  emits: ['change:calendar', 'update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TDatePickerCalendarProps>;
    const { localValue, calendarDate, transitionName } = useSetupDatePickerCalender(thisProps);
    const tableMonths = computed(() => useCalendarTableMonths(calendarDate.value));
    const debounce = reactive<TDebounce>({ timerId: undefined, lastExec: undefined });

    return () =>
      useRenderDatePickerMonths(
        emit,
        thisProps,
        transitionName,
        tableMonths,
        localValue,
        calendarDate,
        debounce
      );
  },
}) as DefineComponent<
  TBsDatePickerCalendar,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  DatePickerCalendarEventProps,
  string,
  PublicProps,
  Readonly<TDatePickerCalendarProps> & Readonly<DatePickerCalendarEventPublic>,
  ExtractDefaultPropTypes<TBsDatePickerCalendar>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;
