import { computed, defineComponent, ref, watch } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { booleanProp, stringProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import type { TBsTextArea, TRecord, TTextAreaOptionProps } from '../../types';
import Helper from '../../utils/Helper';
import { inputProps, textFieldProps } from './mixins/fieldProps';
import {
    useFieldControlClasses,
    useFieldWrapperClasses,
    useRenderTextArea,
    useShowClearButton,
} from './mixins/textFieldApi';
import { useGetValidationResult } from './mixins/validationApi';
import { validationProps } from './mixins/validationProps';

export default defineComponent<TBsTextArea>({
    name: 'BsTextArea',
    props: {
        ...inputProps,
        ...textFieldProps,
        ...validationProps,
        autocomplete: {
            type: [String, Boolean],
            default: false,
        },
        autofocus: booleanProp,
        autoGrow: booleanProp,
        modelValue: stringProp,
        noResize: booleanProp,
        placeholder: stringProp,
        rows: {
            type: [String, Number],
            default: 2,
            validator: (v: string): boolean => !isNaN(parseInt(v, 10)),
        },
        rowHeight: validStringOrNumberProp,
    },
    emits: [
        /**
         * Fired when this component lost focus.
         */
        'blur',
        /**
         * Fired when this component got focused.
         */
        'focus',
        /**
         * Fired when this component's value is being cleared.
         */
        'clear',
        /**
         * Triggers when cursor is still in the `<textarea>` element and keyboard key is pressed.
         */
        'keydown',
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TTextAreaOptionProps>;
        const autocomplete =
            thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
                ? thisProps.autocomplete
                : thisProps.autocomplete
                  ? 'on'
                  : Helper.uuid();
        const localValue = ref<string | number | undefined | null>(thisProps.modelValue);
        const rowHeight = ref<string | number | undefined | null>(thisProps.rowHeight);
        const isFocused = ref(false);
        const validator = useGetValidationResult(thisProps, isFocused);
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));
        const showAppendIcon = computed(
            () =>
                slots['append-inner'] != null ||
                !Helper.isEmpty(thisProps.appendIcon) ||
                showClearButton.value
        );
        const wrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(
                thisProps,
                validator.hasValidated.value,
                validator.hasError.value
            )
        );
        const controlClasses = computed<TRecord>(() => ({
            ...useFieldControlClasses(
                slots,
                thisProps,
                localValue,
                isFocused,
                showAppendIcon.value
            ),
            [`${cssPrefix}textarea`]: true,
            [`${cssPrefix}textarea-autogrow`]: thisProps.autoGrow && !thisProps.noResize,
            [`${cssPrefix}textarea-noresize`]:
                thisProps.noResize || (thisProps.autoGrow && !thisProps.noResize),
        }));

        watch(
            () => thisProps.modelValue,
            (value) => {
                localValue.value = value;
            }
        );

        return () =>
            useRenderTextArea(
                slots,
                emit,
                thisProps,
                wrapperClasses,
                controlClasses,
                localValue,
                rowHeight,
                isFocused,
                autocomplete,
                showClearButton,
                validator.showHelpText,
                validator.showValidationError,
                validator.hasValidated,
                validator.hasError,
                validator.errorItems
            );
    },
});
