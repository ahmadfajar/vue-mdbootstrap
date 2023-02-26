import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, Prop} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {
    booleanProp,
    booleanTrueProp,
    stringOrNumberProp,
    stringProp,
    validStringOrNumberProp
} from "../../mixins/CommonProps";
import {inputProps, textFieldProps} from "./mixins/fieldProps";
import {validationProps} from "../Radio/mixins/validationProps";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import {
    useCreateTextFieldClasses,
    useFieldWrapperClasses,
    useRenderTextField,
    useShowClearButton
} from "./mixins/textFieldApi";
import type {TBsTextField, TRecord, TTextFieldOptionProps} from "../../types";
import Helper from "../../utils/Helper";


export default defineComponent<TBsTextField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsTextField",
    props: {
        ...inputProps,
        ...textFieldProps,
        ...validationProps,
        autocomplete: {
            type: [String, Boolean],
            default: false
        },
        autofocus: booleanProp,
        type: {
            type: String,
            default: 'text',
            validator: (v: string): boolean => ['text', 'email', 'password', 'tel', 'url'].includes(v)
        } as Prop<'text' | 'email' | 'password' | 'tel' | 'url'>,
        datalist: stringProp,
        modelValue: stringOrNumberProp,
        passwordToggle: booleanTrueProp,
        placeholder: stringProp,
        maxlength: validStringOrNumberProp,
        minlength: validStringOrNumberProp,
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
        const cmpProps = props as Readonly<TTextFieldOptionProps>;
        const autocomplete = cmpProps.autocomplete && Helper.isString(cmpProps.autocomplete)
            ? cmpProps.autocomplete
            : (cmpProps.autocomplete ? "on" : Helper.uuid());
        const localValue = ref<string | number | undefined | null>(cmpProps.modelValue);
        const passwordToggled = ref(false);
        const isFocused = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(cmpProps, isFocused.value));
        const errorItems = computed(() => useGetErrorItems(cmpProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(cmpProps, localValue));
        const showPasswordToggle = computed<boolean>(
            () => cmpProps.type === 'password' && cmpProps.passwordToggle === true
        );
        const showAppendIcon = computed(() =>
            (slots.appendInner !== undefined) || !Helper.isEmpty(cmpProps.appendIcon)
            || showClearButton.value || showPasswordToggle.value
        );
        const fieldWrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(cmpProps, hasValidated.value, hasError.value)
        );
        const fieldControlClasses = computed<TRecord>(() =>
            useCreateTextFieldClasses(slots, cmpProps, localValue, isFocused, showAppendIcon.value)
        );
        const fieldType = computed<string | undefined>(
            () => {
                if (showPasswordToggle.value) {
                    return passwordToggled.value ? 'text' : 'password';
                }

                return cmpProps.type;
            }
        );
        watch(
            () => cmpProps.modelValue,
            (value) => {
                localValue.value = value;
            }
        );
        const onPasswordToggleHandler = (value: boolean): void => {
            passwordToggled.value = value;
        };

        return () =>
            useRenderTextField(
                slots, emit, cmpProps,
                fieldWrapperClasses,
                fieldControlClasses,
                fieldType.value,
                localValue, isFocused,
                passwordToggled,
                autocomplete,
                showClearButton.value,
                showPasswordToggle.value,
                showHelpText.value,
                showValidationError.value,
                hasValidated.value,
                hasError.value,
                errorItems.value, 24,
                onPasswordToggleHandler,
            );
    }
});
