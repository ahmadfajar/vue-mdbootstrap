import { DateTime } from 'luxon';
import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import type { TBsDatePickerTimes, TRecord, TTimePickerMode, TTimePickerProps } from '../../types';
import {
    DatePickerConst,
    useCalendarTableHours,
    useCalendarTableMinutes,
    useCalendarTableSeconds,
    useRenderDatePickerTimes,
    useWatchOfDatePickerBaseProps
} from './mixins/datePickerApi';
import { datePickerTimesProps } from './mixins/datePickerProps';

export default defineComponent<TBsDatePickerTimes, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsDatePickerTimes',
    props: datePickerTimesProps,
    emits: [
        /**
         * Fired when the `BACK` button is clicked.
         */
        'close',
        /**
         * Fired when this component's `modelValue` is updated.
         */
        'update:model-value',
    ],
    setup(props, {emit}) {
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
                thisProps, emit, tableHours,
                tableMinutes, tableSeconds,
                currentView, localValue,
            )
    }
});
