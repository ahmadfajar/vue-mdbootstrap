import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent} from "vue";
import {datePickerCalendarProps} from "./mixins/datePickerProps";
import {useCalendarTableMonths, useDatePickerCalenderSetup, useRenderDatePickerMonths} from "./mixins/datePickerApi";
import type {TBsDatePickerCalendar, TDatePickerCalendarProps, TRecord} from "../../types";

export default defineComponent<TBsDatePickerCalendar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDatePickerMonths",
    props: datePickerCalendarProps,
    emits: [
        "update:model-value",
    ],
    setup(props, {emit}) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const {localValue, calendarDate, transitionName} = useDatePickerCalenderSetup(thisProps);
        const tableMonths = computed(() => useCalendarTableMonths(calendarDate.value));

        return () =>
            useRenderDatePickerMonths(
                thisProps, emit, transitionName, tableMonths,
                localValue, calendarDate,
            )
    }
});
