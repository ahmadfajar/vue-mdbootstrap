import {DateTime} from "luxon";
import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref} from "vue";
import type {TBsDatePickerHeader, TDatePickerHeaderProps, TRecord} from "../../types";
import {
    DatePickerConst,
    useDatePickerHeaderStyles,
    useRenderDatePickerHeader,
    useWatchOfDatePickerHeaderProps
} from "./mixins/datePickerApi";
import {datePickerHeaderProps} from "./mixins/datePickerProps";

export default defineComponent<TBsDatePickerHeader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDatePickerHeader",
    props: datePickerHeaderProps,
    emits: [
        "change-view",
    ],
    setup(props, {emit}) {
        const thisProps = props as Readonly<TDatePickerHeaderProps>;
        const reverse = ref(false);
        const formatOpts = ref<Intl.DateTimeFormatOptions>({
            weekday: "long",
            month: "short",
            day: "numeric"
        });
        const localValue = ref<DateTime>(
            thisProps.modelValue ? DateTime.fromJSDate(thisProps.modelValue) : DateTime.now()
        );
        const isTimeActive = computed(() =>
            thisProps.displayMode === DatePickerConst.TIME && !thisProps.readonly
        );
        const isYearActive = computed(() =>
            thisProps.displayMode === DatePickerConst.YEAR && !thisProps.readonly
        );
        const isTitleActive = computed(() =>
                thisProps.displayMode === (
                    DatePickerConst.DATE || DatePickerConst.MONTH
                ) && !thisProps.readonly
        );
        const transitionName = computed(() =>
            reverse.value === true ? "slide-top-bottom" : "slide-bottom-top"
        );
        const styles = computed<TRecord>(() =>
            useDatePickerHeaderStyles(thisProps, isYearActive, isTimeActive, isTitleActive)
        );

        thisProps.locale && (localValue.value = localValue.value.setLocale(thisProps.locale));
        useWatchOfDatePickerHeaderProps(thisProps, formatOpts, localValue, reverse);

        return () =>
            useRenderDatePickerHeader(
                thisProps, emit, styles, isYearActive, isTimeActive,
                isTitleActive, transitionName, formatOpts, localValue,
            )
    }
})
