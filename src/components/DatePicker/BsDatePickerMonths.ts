import {
    useCalendarTableMonths,
    useSetupDatePickerCalender,
    useRenderDatePickerMonths,
} from '@/components/DatePicker/mixins/datePickerApi.ts';
import { datePickerCalendarProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type { TBsDatePickerCalendar, TDatePickerCalendarProps, TDebounce } from '@/types';
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
                thisProps,
                emit,
                transitionName,
                tableMonths,
                localValue,
                calendarDate,
                debounce
            );
    },
});
