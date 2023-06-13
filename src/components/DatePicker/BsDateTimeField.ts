import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {dateTimeFieldProps} from "./mixins/datePickerProps";
import {DatePickerConst} from "./mixins/datePickerApi";
import {useParseDateTimeFromFormat, useRenderDateTimeField} from "./mixins/dateTimeFieldApi";
import {useCreateTextFieldClasses, useFieldWrapperClasses, useShowClearButton} from "../Field/mixins/textFieldApi";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Field/mixins/validationApi";
import type {TBsDateTimeField, TDateTimeFieldOptionProps, TDateTimePickerMode, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsDateTimeField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDateTimeField",
    props: dateTimeFieldProps,
    emits: [
        /**
         * Fired when this component lost focus.
         */
        "blur",
        /**
         * Fired when this component got focused.
         */
        "focus",
        /**
         * Fired when this component's value is being cleared.
         */
        "clear",
        /**
         * Fired when the DatePicker is closed or hide.
         */
        "close",
        /**
         * Fired when the DatePicker popup is open or showed.
         */
        "open",
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TDateTimeFieldOptionProps>;
        const isFocused = ref(false);
        const isPopoverOpen = ref(false);
        const locale = ref<string>(thisProps.locale || navigator.language);
        const displayFormat = computed(() => thisProps.displayFormat || thisProps.valueFormat);
        const localFieldValue = ref(
            useParseDateTimeFromFormat(thisProps.modelValue, thisProps.valueFormat, locale.value)
        );
        const displayValue = ref<string | undefined>(
            localFieldValue.value?.toFormat(<string>displayFormat.value)
        );
        const activator = ref<HTMLElement | null>(null);
        const pickerMode = computed(() =>
            <TDateTimePickerMode>(thisProps.pickerMode || thisProps.viewMode || DatePickerConst.DATE)
        );
        const calendarIcon = computed(() => {
            return thisProps.appendIcon || `calendar_month_${thisProps.actionIconVariant}`;
        });
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, isFocused.value));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, displayValue));
        const showAppendIcon = computed(() =>
            (slots.appendInner !== undefined) || !Helper.isEmpty(calendarIcon.value) || showClearButton.value
        );
        const fieldWrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(thisProps, hasValidated.value, hasError.value)
        );
        const fieldControlClasses = computed<TRecord>(() =>
            ({
                ...useCreateTextFieldClasses(
                    slots, thisProps, displayValue, isFocused, showAppendIcon.value
                ),
                [`${cssPrefix}datetime-field`]: true,
            })
        );

        watch(
            () => thisProps.modelValue,
            (value) => {
                localFieldValue.value = useParseDateTimeFromFormat(
                    value, thisProps.valueFormat, locale.value
                );
                displayValue.value = localFieldValue.value?.toFormat(<string>displayFormat.value);
            }
        );

        return () =>
            useRenderDateTimeField(
                slots, emit, props,
                fieldWrapperClasses,
                fieldControlClasses,
                activator,
                pickerMode,
                localFieldValue,
                displayValue,
                locale,
                calendarIcon,
                isPopoverOpen,
                isFocused,
                showClearButton,
                showHelpText,
                showValidationError,
                hasValidated,
                hasError,
                errorItems,
            )
    }
});
