import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import {booleanProp, stringOrNumberProp, stringProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import {inputProps, textFieldProps} from "./mixins/fieldProps";
import {validationProps} from "../Radio/mixins/validationProps";
import {useFieldWrapperClasses, useRenderTextArea, useShowClearButton} from "./mixins/fieldApi";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import type {TBsTextArea, TRecord, TTextAreaOptionProps} from "../../types";
import Helper from "../../utils/Helper";


export default defineComponent<TBsTextArea, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsTextArea",
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
         * Enable/disable `<textarea>` element to auto grow.
         * @type {boolean}
         */
        autoGrow: booleanProp,
        /**
         * The value monitored by `v-model` to maintain this field value.
         * @type {string|number}
         */
        modelValue: stringOrNumberProp,
        /**
         * Disable resizing the `<textarea>` element.
         * @type {boolean}
         */
        noResize: booleanProp,
        /**
         * Sets the field placeholder.
         * @type {string}
         */
        placeholder: stringProp,
        /**
         * Sets `<textarea>` height in rows.
         * @type {string|number}
         */
        rows: {
            type: [String, Number],
            default: 2,
            validator: (v: string): boolean => !isNaN(parseInt(v, 10))
        },
        /**
         * Sets `<textarea>` height in pixel.
         * @type {string|number}
         */
        rowHeight: validStringOrNumberProp,
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
         * Triggers when cursor is still in the `<textarea>` element and keyboard key is pressed.
         */
        "keydown",
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TTextAreaOptionProps>;
        const autocomplete = cmpProps.autocomplete && Helper.isString(cmpProps.autocomplete)
            ? cmpProps.autocomplete
            : (cmpProps.autocomplete ? "on" : Helper.uuid());
        const localValue = ref<string | number | undefined | null>(cmpProps.modelValue);
        const rowHeight = ref<string | number | undefined | null>(cmpProps.rowHeight);
        const isFocused = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(cmpProps, isFocused.value));
        const errorItems = computed(() => useGetErrorItems(cmpProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(cmpProps, localValue));
        const textAreaClasses = computed<TRecord>(
            () => useFieldWrapperClasses(
                cmpProps, hasValidated.value, hasError.value
            )
        );
        watch(
            () => cmpProps.modelValue,
            (value) => {
                localValue.value = value;
            }
        );

        return () =>
            useRenderTextArea(
                slots, emit, cmpProps,
                textAreaClasses,
                localValue,
                rowHeight,
                isFocused,
                autocomplete,
                showClearButton.value,
                showHelpText.value,
                showValidationError.value,
                hasValidated.value,
                hasError.value,
                errorItems.value,
                24,
            );
    }
});
