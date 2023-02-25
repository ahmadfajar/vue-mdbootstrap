import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, PropType} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {inputProps, textFieldProps} from "./mixins/fieldProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, booleanTrueProp, numberProp, stringProp, validStringOrFloatProp} from "../../mixins/CommonProps";
import type {
    TBsNumericField,
    TLabelPosition,
    TNumericFieldOptionProps,
    TNumericOpsOptions,
    TRecord,
    TSpaceAround
} from "../../types";
import {validationProps} from "../Radio/mixins/validationProps";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import {useCreateTextFieldClasses, useFieldWrapperClasses, useShowClearButton} from "./mixins/textFieldApi";
import {useRenderNumericField} from "./mixins/numericFieldApi";
import Helper from "../../utils/Helper";


export default defineComponent<TBsNumericField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsNumericField",
    props: {
        ...inputProps,
        ...textFieldProps,
        ...validationProps,
        autocomplete: {
            type: [String, Boolean],
            default: false
        },
        autofocus: booleanProp,
        modelValue: numberProp,
        placeholder: stringProp,
        locale: stringProp,
        useGrouping: booleanTrueProp,
        spinButton: booleanTrueProp,
        spinButtonPlacement: {
            type: String as PropType<TLabelPosition>,
            default: "right",
            validator: (v: TLabelPosition) => ["left", "right"].includes(v)
        },
        actionButton: booleanProp,
        actionButtonPlacement: {
            type: String as PropType<TSpaceAround>,
            default: "right",
            validator: (v: TSpaceAround) => ["left", "right", "both"].includes(v)
        },
        maxFraction: {
            type: [Number, String],
            default: 3,
            validator: (v: string) => !isNaN(parseInt(v))
        },
        maxValue: validStringOrFloatProp,
        minValue: validStringOrFloatProp,
        step: {
            type: [Number, String],
            default: 1.0,
            validator: (v: string) => !isNaN(parseFloat(v))
        },
    },
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
                autocomplete, 24,
                showClearButton,
                showHelpText,
                showValidationError,
                hasValidated,
                hasError,
                errorItems,
            );
    }
});
