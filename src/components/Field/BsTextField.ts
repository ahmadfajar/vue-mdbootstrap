import { inputProps, textFieldProps } from '@/components/Field/mixins/fieldProps';
import {
    useFieldControlClasses,
    useFieldWrapperClasses,
    useRenderTextField,
    useShowClearButton,
} from '@/components/Field/mixins/textFieldApi';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi';
import { validationProps } from '@/components/Field/mixins/validationProps';
import { cssPrefix } from '@/mixins/CommonApi';
import {
    booleanProp,
    booleanTrueProp,
    stringOrNumberProp,
    stringProp,
    validStringOrNumberProp,
} from '@/mixins/CommonProps';
import type { TBsTextField, TFieldType, TRecord, TTextFieldOptionProps } from '@/types';
import Helper from '@/utils/Helper';
import type { Prop } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsTextField>({
    name: 'BsTextField',
    props: {
        ...inputProps,
        ...textFieldProps,
        ...validationProps,
        autocomplete: {
            type: [String, Boolean],
            default: false,
        },
        autofocus: booleanProp,
        type: {
            type: String,
            default: 'text',
            validator: (v: string): boolean =>
                ['text', 'email', 'password', 'tel', 'url'].includes(v),
        } as Prop<TFieldType>,
        datalist: stringProp,
        modelValue: stringOrNumberProp,
        passwordToggle: booleanTrueProp,
        placeholder: stringProp,
        maxlength: validStringOrNumberProp,
        minlength: validStringOrNumberProp,
        rounded: booleanProp,
        prefix: stringProp,
        suffix: stringProp,
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
         * Triggers when cursor is still in the `<input>` element and keyboard key is pressed.
         */
        'keydown',
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TTextFieldOptionProps>;
        const autocomplete =
            thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
                ? thisProps.autocomplete
                : thisProps.autocomplete
                  ? 'on'
                  : Helper.uuid();
        const localValue = ref<string | number | undefined | null>(thisProps.modelValue);
        const passwordToggled = ref(false);
        const isFocused = ref(false);
        const validator = useGetValidationResult(thisProps, isFocused);
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));
        const showPasswordToggle = computed<boolean>(
            () => thisProps.type === 'password' && thisProps.passwordToggle === true
        );
        const showAppendIcon = computed(
            () =>
                slots['append-inner'] != null ||
                !Helper.isEmpty(thisProps.appendIcon) ||
                showClearButton.value ||
                showPasswordToggle.value
        );
        const fieldWrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(
                thisProps,
                validator.hasValidated.value,
                validator.hasError.value
            )
        );
        const fieldControlClasses = computed<TRecord>(() => ({
            ...useFieldControlClasses(
                slots,
                thisProps,
                localValue,
                isFocused,
                showAppendIcon.value
            ),
            [`${cssPrefix}field-rounded`]:
                (thisProps.outlined || thisProps.filled) && thisProps.rounded,
            [`${cssPrefix}text-field`]: true,
        }));
        const fieldType = computed<string | undefined>(() => {
            if (showPasswordToggle.value) {
                return passwordToggled.value ? 'text' : 'password';
            }

            return thisProps.type;
        });
        const onPasswordToggleHandler = (value: boolean): void => {
            passwordToggled.value = value;
        };
        watch(
            () => thisProps.modelValue,
            (value) => {
                localValue.value = value;
            }
        );

        return () =>
            useRenderTextField(
                slots,
                emit,
                thisProps,
                fieldWrapperClasses,
                fieldControlClasses,
                fieldType.value,
                localValue,
                isFocused,
                passwordToggled,
                autocomplete,
                showClearButton,
                showPasswordToggle,
                validator.showHelpText,
                validator.showValidationError,
                validator.hasValidated,
                validator.hasError,
                validator.errorItems,
                onPasswordToggleHandler
            );
    },
});
