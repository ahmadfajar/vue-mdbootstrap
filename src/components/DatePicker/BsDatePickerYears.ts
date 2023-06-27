import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, reactive } from 'vue';
import type { TBsDatePickerCalendar, TDatePickerCalendarProps, TDebounce, TRecord } from '../../types';
import { useCalendarTableYears, useDatePickerCalenderSetup, useRenderDatePickerYears } from './mixins/datePickerApi';
import { datePickerCalendarProps } from './mixins/datePickerProps';

export default defineComponent<TBsDatePickerCalendar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsDatePickerYears',
    props: datePickerCalendarProps,
    emits: [
        'change:calendar',
        'update:model-value',
    ],
    setup(props, {emit}) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const {localValue, calendarDate, transitionName} = useDatePickerCalenderSetup(thisProps);
        const tableYears = computed(() => useCalendarTableYears(calendarDate.value));
        const debounce = reactive<TDebounce>({timerId: undefined, lastExec: undefined});

        return () =>
            useRenderDatePickerYears(
                thisProps, emit, transitionName, tableYears,
                localValue, calendarDate, debounce
            )
    }
});
