import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent} from "vue";
import type {TBsDatePickerCalendar, TDatePickerCalendarProps, TRecord} from "../../types";
import {datePickerCalendarProps} from "./mixins/datePickerProps";
import {useCalendarTableDays, useDatePickerCalenderSetup, useRenderDatePickerDays} from "./mixins/datePickerApi";

export default defineComponent<TBsDatePickerCalendar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDatePickerDays",
    props: datePickerCalendarProps,
    emits: [
        "update:model-value",
    ],
    setup(props, {emit}) {
        const thisProps = props as Readonly<TDatePickerCalendarProps>;
        const {localValue, calendarDate, transitionName} = useDatePickerCalenderSetup(thisProps);
        const tableDays = computed(() => useCalendarTableDays(calendarDate.value));

        return () =>
            useRenderDatePickerDays(
                thisProps, emit, transitionName, tableDays,
                localValue, calendarDate,
            )
    }
});
