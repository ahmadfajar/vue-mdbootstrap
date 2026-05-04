/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import { useWatchOfDatePickerBaseProps } from '@/components/DatePicker/mixins/datePickerCalendar.ts';
import { datePickerTimesProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import {
  useCalendarTableHours,
  useCalendarTableMinutes,
  useCalendarTableSeconds,
  useRenderDatePickerTimes,
} from '@/components/DatePicker/mixins/datePickerTimes.ts';
import type {
  TBsDatePickerTimes,
  TTimePickerMode,
  TTimePickerProps,
} from '@/components/DatePicker/types/internals.ts';
import type { TRecord } from '@/types';
import type {
  ClosableVoidEventProps,
  ClosableVoidEventPublic,
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
} from '@/types/internals.ts';
import { DateTime } from 'luxon';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsDatePickerTimes>({
  name: 'BsDatePickerTimes',
  props: datePickerTimesProps,
  emits: ['close', 'update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TTimePickerProps>;
    const localValue = ref<DateTime>(
      thisProps.modelValue ? DateTime.fromJSDate(thisProps.modelValue) : DateTime.now()
    );
    const currentView = ref<TTimePickerMode>(DatePickerConst.TIME);
    const tableHours = computed(() => useCalendarTableHours(localValue.value));
    const tableMinutes = computed(() => useCalendarTableMinutes(localValue.value));
    const tableSeconds = computed(() => useCalendarTableSeconds(localValue.value));

    thisProps.locale && (localValue.value = localValue.value.setLocale(thisProps.locale));
    useWatchOfDatePickerBaseProps(thisProps, localValue);

    return () =>
      useRenderDatePickerTimes(
        emit,
        thisProps,
        tableHours,
        tableMinutes,
        tableSeconds,
        currentView,
        localValue
      );
  },
}) as DefineComponent<
  TBsDatePickerTimes,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TimePickerEventProps,
  string,
  PublicProps,
  Readonly<TTimePickerProps> & Readonly<TimePickerEventPublic>,
  ExtractDefaultPropTypes<TBsDatePickerTimes>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type TimePickerEventProps = ClosableVoidEventProps & UpdateModelValueEventProps<Date>;

declare interface TimePickerEventPublic
  extends ClosableVoidEventPublic, UpdateModelValueEventPublic<Date> {}
