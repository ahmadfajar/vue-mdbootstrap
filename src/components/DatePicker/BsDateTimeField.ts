import { DateTime } from 'luxon';
import { computed, defineComponent, ref, watch } from 'vue';
import { cssPrefix, isServer } from '../../mixins/CommonApi';
import type {
    TBsDateTimeField,
    TDateTimeFieldOptionProps,
    TDateTimePickerMode,
    TRecord,
} from '../../types';
import Helper from '../../utils/Helper';
import {
    useFieldControlClasses,
    useFieldWrapperClasses,
    useShowClearButton,
} from '../Field/mixins/textFieldApi';
import { useGetValidationResult } from '../Field/mixins/validationApi';
import { DatePickerConst } from './mixins/datePickerApi';
import { dateTimeFieldProps } from './mixins/datePickerProps';
import { useParseDateTimeFromFormat, useRenderDateTimeField } from './mixins/dateTimeFieldApi';

export default defineComponent<TBsDateTimeField>({
    name: 'BsDateTimeField',
    props: dateTimeFieldProps,
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
         * Fired when the DatePicker is closed or hide.
         */
        'close',
        /**
         * Fired when the DatePicker popup is open or showed.
         */
        'open',
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TDateTimeFieldOptionProps>;
        const isFocused = ref(false);
        const isPopoverOpen = ref(false);
        const locale = ref<string>(
            thisProps.locale || (isServer ? 'en-US' : window.navigator.language)
        );
        const displayFormat = computed(() => thisProps.displayFormat || thisProps.valueFormat);
        const localFieldValue = ref<DateTime | undefined>(
            useParseDateTimeFromFormat(thisProps.modelValue, thisProps.valueFormat, locale.value)
        );
        const displayValue = ref<string | undefined>(
            localFieldValue.value?.toFormat(displayFormat.value as string)
        );
        const activator = ref<HTMLElement | null>(null);
        const pickerMode = computed(
            () =>
                (thisProps.viewMode ||
                    thisProps.pickerMode ||
                    DatePickerConst.DATE) as TDateTimePickerMode
        );
        const calendarIcon = computed(() => {
            return thisProps.appendIcon || `calendar_month_${thisProps.actionIconVariant}`;
        });
        const validator = useGetValidationResult(thisProps, isFocused);
        const showClearButton = computed<boolean>(() =>
            useShowClearButton(thisProps, displayValue)
        );
        const showAppendIcon = computed(
            () =>
                slots['append-inner'] != null ||
                !Helper.isEmpty(calendarIcon.value) ||
                showClearButton.value
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
                displayValue,
                isFocused,
                showAppendIcon.value
            ),
            [`${cssPrefix}datetime-field`]: true,
        }));

        watch(
            () => thisProps.modelValue,
            (value) => {
                localFieldValue.value = useParseDateTimeFromFormat(
                    value,
                    thisProps.valueFormat,
                    locale.value
                );
                displayValue.value = localFieldValue.value?.toFormat(displayFormat.value as string);
            }
        );

        return () =>
            useRenderDateTimeField(
                slots,
                emit,
                props,
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
                validator.showHelpText,
                validator.showValidationError,
                validator.hasValidated,
                validator.hasError,
                validator.errorItems
            );
    },
});
