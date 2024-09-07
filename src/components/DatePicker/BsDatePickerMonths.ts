import { computed, defineComponent, reactive } from 'vue';
import type { TBsDatePickerCalendar, TDatePickerCalendarProps, TDebounce } from '../../types';
import {
    useCalendarTableMonths,
    useDatePickerCalenderSetup,
    useRenderDatePickerMonths,
} from './mixins/datePickerApi';
import { datePickerCalendarProps } from './mixins/datePickerProps';

export default defineComponent<TBsDatePickerCalendar>({
    name: 'BsDatePickerMonths',
    props: datePickerCalendarProps,
    emits: ['change:calendar', 'update:model-value'],
    setup(props, { emit }) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const { localValue, calendarDate, transitionName } = useDatePickerCalenderSetup(thisProps);
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
