import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import type {TBsNumericField, TNumericFieldOptionProps, TNumericOpsOptions, TRecord} from "../../types";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import {useCreateTextFieldClasses, useFieldWrapperClasses, useShowClearButton} from "./mixins/textFieldApi";
import {useRenderNumericField} from "./mixins/numericFieldApi";
import {numericFieldProps} from "./mixins/fieldProps";
import Helper from "../../utils/Helper";


export default defineComponent<TBsNumericField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsNumericField",
    props: numericFieldProps,
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
         * Triggers when cursor is still in the `<input>` element and keyboard key is pressed.
         */
        "keydown",
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TNumericFieldOptionProps>;
        const autocomplete = thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
            ? thisProps.autocomplete
            : (thisProps.autocomplete ? "on" : Helper.uuid());
        const localValue = ref<number | null>(thisProps.modelValue === undefined ? null : thisProps.modelValue);
        const inputRef = ref<HTMLElement | null>(null);
        const hasFocus = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, hasFocus.value));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));
        const showAppendIcon = computed(() =>
            (slots.appendInner !== undefined) || !Helper.isEmpty(thisProps.appendIcon) || showClearButton.value
            || (thisProps.actionButton === true && !thisProps.disabled && !thisProps.readonly)
            || (thisProps.spinButton === true && thisProps.spinButtonPlacement === "right"
                && !thisProps.disabled && !thisProps.readonly)
        );
        const fieldWrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(thisProps, hasValidated.value, hasError.value)
        );
        const fieldControlClasses = computed<TRecord>(() =>
            ({
                ...useCreateTextFieldClasses(slots, thisProps, localValue, hasFocus, showAppendIcon.value),
                [`${cssPrefix}numeric-field`]: true,
            })
        );
        const operationOptions: TNumericOpsOptions = {
            locale: thisProps.locale || navigator.language,
            maxValue: Helper.parseFloatLoose(<string>thisProps.maxValue),
            minValue: Helper.parseFloatLoose(<string>thisProps.minValue),
            step: Helper.parseFloatLoose(<string>thisProps.step) || 1.0,
        };
        const formatOptions: Intl.NumberFormatOptions = {
            maximumFractionDigits: Helper.parseIntLoose(<string>thisProps.maxFraction) || 3,
            useGrouping: thisProps.useGrouping
        };

        watch(
            () => thisProps.modelValue,
            (value) => {
                localValue.value = value === undefined ? null : value;
            }
        );

        return () =>
            useRenderNumericField(
                slots, emit, thisProps,
                operationOptions,
                formatOptions,
                fieldWrapperClasses,
                fieldControlClasses,
                localValue,
                inputRef,
                hasFocus,
                autocomplete,
                showClearButton,
                showHelpText,
                showValidationError,
                hasValidated,
                hasError,
                errorItems,
            );
    }
});
