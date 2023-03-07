import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {DatePickerConst, useParseDate, useRenderDatePicker} from "./mixins/datePickerApi";
import {datePickerProps} from "./mixins/datePickerProps";
import type {TBsDatePicker, TDatePickerOptionProps, TDateTimePickerMode, TRecord} from "../../types";

export default defineComponent<TBsDatePicker, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDatePicker",
    props: datePickerProps,
    emits: [
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit}) {
        const thisProps = props as Readonly<TDatePickerOptionProps>;
        const locale = ref<string>(thisProps.locale || navigator.language);
        const localValue = ref(useParseDate(thisProps.modelValue).setLocale(locale.value));
        const calendarDate = ref<Date>(localValue.value.toJSDate());
        const currentView = ref<TDateTimePickerMode>(
            <TDateTimePickerMode | undefined>(thisProps.mode || thisProps.viewMode) || "date"
        );
        const showTime = computed(() =>
            ["datetime", "time"].includes(<TDateTimePickerMode>thisProps.mode)
            || ["datetime", "time"].includes(<TDateTimePickerMode>thisProps.viewMode)
        );
        const ensureViewMode = () => {
            if (currentView.value === DatePickerConst.DATETIME) {
                currentView.value = <TDateTimePickerMode>DatePickerConst.DATE;
            }
        }

        thisProps.locale && (localValue.value = localValue.value.setLocale(locale.value));
        ensureViewMode();
        watch(
            () => <TDateTimePickerMode>(thisProps.mode || thisProps.viewMode),
            (value) => {
                value && (currentView.value = value);
                ensureViewMode();
            }
        );
        watch(
            () => thisProps.modelValue,
            (value) => {
                localValue.value = useParseDate(value).setLocale(locale.value);
                calendarDate.value = localValue.value.toJSDate();
            }
        );
        watch(
            () => thisProps.locale,
            (value) => {
                if (value) {
                    locale.value = value;
                    localValue.value = localValue.value.setLocale(value);
                }
            }
        );

        return () =>
            useRenderDatePicker(
                props, emit, showTime, currentView, locale, localValue, calendarDate,
            )
    }
});
