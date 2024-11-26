import {
    useCalendarTableYears,
    useSetupDatePickerCalender,
    useRenderDatePickerYears,
} from '@/components/DatePicker/mixins/datePickerApi.ts';
import { datePickerCalendarProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type { TBsDatePickerCalendar, TDatePickerCalendarProps, TDebounce } from '@/types';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent<TBsDatePickerCalendar>({
    name: 'BsDatePickerYears',
    props: datePickerCalendarProps,
    emits: ['change:calendar', 'update:model-value'],
    setup(props, { emit }) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const { localValue, calendarDate, transitionName } = useSetupDatePickerCalender(thisProps);
        const tableYears = computed(() => useCalendarTableYears(calendarDate.value));
        const debounce = reactive<TDebounce>({ timerId: undefined, lastExec: undefined });

        return () =>
            useRenderDatePickerYears(
                thisProps,
                emit,
                transitionName,
                tableYears,
                localValue,
                calendarDate,
                debounce
            );
    },
});
