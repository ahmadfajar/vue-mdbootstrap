import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, stringOrArrayProp, stringProp} from "../../mixins/CommonProps";
import {inputProps, textFieldProps} from "./mixins/fieldProps";
import {validationProps} from "../Radio/mixins/validationProps";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import type {TBsChipField, TChipFieldOptionProps, TRecord} from "../../types";
import {useRenderChipField} from "./mixins/chipFieldApi";
import {useFieldWrapperClasses, useShowClearButton} from "./mixins/textFieldApi";
import Helper from "../../utils/Helper";


export default defineComponent<TBsChipField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsChipField",
    props: {
        ...inputProps,
        ...textFieldProps,
        ...validationProps,
        autocomplete: {
            type: [String, Boolean],
            default: false
        },
        autofocus: booleanProp,
        chipColor: stringProp,
        chipDeletable: booleanProp,
        chipPill: booleanProp,
        chipOutlined: booleanProp,
        modelValue: stringOrArrayProp,
        placeholder: stringProp,
    },
    emits: [
        /**
         * Fired when this ChipField lost focus.
         */
        "blur",
        /**
         * Fired when this ChipField got focused.
         */
        "focus",
        /**
         * Fired when this ChipField's value is being cleared.
         */
        "clear",
        /**
         * Fired when `KeyboardEvent` is triggered from the `<input>` element.
         */
        "keydown",
        /**
         * Fired when a chip is deleted from this ChipField.
         */
        "delete-item",
        /**
         * Fired when this ChipField's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TChipFieldOptionProps>;
        const autocomplete = thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
            ? thisProps.autocomplete
            : (thisProps.autocomplete ? "on" : Helper.uuid());
        const inputValue = ref<string>("");
        const localValue = ref<string[]>(
            Array.isArray(thisProps.modelValue)
                ? thisProps.modelValue
                : (Helper.isEmpty(thisProps.modelValue) ? [] : [<string>thisProps.modelValue])
        );
        const isFocused = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, isFocused.value));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));
        const wrapperClasses = computed<TRecord>(
            () => useFieldWrapperClasses(
                thisProps, hasValidated.value, hasError.value, `${cssPrefix}chip-field`
            )
        );

        watch(
            () => thisProps.modelValue,
            (value) => {
                // console.info("Watch values:", value);
                localValue.value = Array.isArray(value)
                    ? value
                    : (
                        Helper.isEmpty(value) ? [] : (<string>value).split(",").map(v => v.trim())
                    );
            }
        );

        return () =>
            useRenderChipField(
                slots, emit, props,
                wrapperClasses,
                inputValue,
                localValue,
                isFocused,
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
