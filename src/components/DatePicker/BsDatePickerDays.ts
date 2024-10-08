import { computed, defineComponent, reactive } from 'vue';
import type { TBsDatePickerCalendar, TDatePickerCalendarProps, TDebounce } from '../../types';
import {
    useCalendarTableDays,
    useDatePickerCalenderSetup,
    useRenderDatePickerDays,
} from './mixins/datePickerApi';
import { datePickerCalendarProps } from './mixins/datePickerProps';

export default defineComponent<TBsDatePickerCalendar>({
    name: 'BsDatePickerDays',
    props: datePickerCalendarProps,
    emits: ['change:calendar', 'update:model-value'],
    setup(props, { emit }) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const { localValue, calendarDate, transitionName } = useDatePickerCalenderSetup(thisProps);
        const tableDays = computed(() => useCalendarTableDays(calendarDate.value));
        const debounce = reactive<TDebounce>({ timerId: undefined, lastExec: undefined });

        return () =>
            useRenderDatePickerDays(
                thisProps,
                emit,
                transitionName,
                tableDays,
                localValue,
                calendarDate,
                debounce
            );
    },
});
