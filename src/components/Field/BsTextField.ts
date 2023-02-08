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
import {useFieldWrapperClasses, useRenderTextField, useShowClearButton} from "./mixins/fieldApi";
import type {TBsTextField, TRecord, TTextFieldOptionProps} from "../../types";
import Helper from "../../utils/Helper";


export default defineComponent<TBsTextField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsTextField",
    props: {
        ...inputProps,
        ...textFieldProps,
        ...validationProps,
        /**
         * Sets browsers autocomplete predictions on/off.
         * @type {string|boolean}
         */
        autocomplete: {
            type: [String, Boolean],
            default: false
        },
        /**
         * Autofocus field when this component is mounted.
         * @type {boolean}
         */
        autofocus: booleanProp,
        /**
         * Sets <input> element type attribute. Valid values are: `text`, `password`, `email`, `url`, `tel`.
         * @type {string}
         */
        type: {
            type: String,
            default: 'text',
            validator: (v: string): boolean => ['text', 'email', 'password', 'tel', 'url'].includes(v)
        } as Prop<'text' | 'email' | 'password' | 'tel' | 'url'>,
        /**
         * Sets target `<datalist>` element ID.
         * @type {string}
         */
        datalist: stringProp,
        /**
         * The value monitored by `v-model` to maintain this field value.
         * @type {string|number}
         */
        modelValue: stringOrNumberProp,
        /**
         * Enable toggle password field.
         * @type {boolean}
         */
        passwordToggle: booleanTrueProp,
        /**
         * Sets the field placeholder.
         * @type {string}
         */
        placeholder: stringProp,
        /**
         * Sets `<input>` element maximum characters allowed.
         * @type {string|number}
         */
        maxlength: validStringOrNumberProp,
        /**
         * Sets `<input>` element minimum characters allowed.
         * @type {string|number}
         */
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
        const isPasswordToggled = ref(false);
        const isFocused = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(cmpProps, isFocused.value));
        const errorItems = computed(() => useGetErrorItems(cmpProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(cmpProps, localValue));
        const fieldClasses = computed<TRecord>(
            () => useFieldWrapperClasses(
                cmpProps, hasValidated.value, hasError.value,
            )
        );
        const showPasswordToggle = computed<boolean>(
            () => cmpProps.type === 'password' && cmpProps.passwordToggle === true
        );
        const fieldType = computed<string | undefined>(
            () => {
                if (showPasswordToggle.value) {
                    return isPasswordToggled.value ? 'text' : 'password';
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
            isPasswordToggled.value = value;
        };

        return () =>
            useRenderTextField(
                slots, emit, cmpProps,
                fieldClasses,
                fieldType.value,
                localValue, isFocused,
                isPasswordToggled,
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
