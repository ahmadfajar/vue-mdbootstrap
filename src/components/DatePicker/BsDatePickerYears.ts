import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent} from "vue";
import {datePickerCalendarProps} from "./mixins/datePickerProps";
import {useCalendarTableYears, useDatePickerCalenderSetup, useRenderDatePickerYears} from "./mixins/datePickerApi";
import type {TBsDatePickerCalendar, TDatePickerCalendarProps, TRecord} from "../../types";

export default defineComponent<TBsDatePickerCalendar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDatePickerYears",
    props: datePickerCalendarProps,
    emits: [
        "update:model-value",
    ],
    setup(props, {emit}) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const {localValue, calendarDate, transitionName} = useDatePickerCalenderSetup(thisProps);
        const tableYears = computed(() => useCalendarTableYears(calendarDate.value));

        return () =>
            useRenderDatePickerYears(
                thisProps, emit, transitionName, tableYears,
                localValue, calendarDate,
            )
    }
});
