import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import { dateTimeFieldProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import {
  useParseDateTimeFromFormat,
  useRenderDateTimeField,
} from '@/components/DatePicker/mixins/dateTimeFieldApi.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { cssPrefix, isServer } from '@/mixins/CommonApi.ts';
import type {
  TBsDateTimeField,
  TDateTimeFieldOptionProps,
  TDateTimePickerMode,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { DateTime } from 'luxon';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsDateTimeField>({
  name: 'BsDateTimeField',
  props: dateTimeFieldProps,
  emits: ['blur', 'focus', 'clear', 'close', 'open', 'update:model-value'],
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
        (thisProps.viewMode || thisProps.pickerMode || DatePickerConst.DATE) as TDateTimePickerMode
    );
    const calendarIcon = computed(() => {
      return thisProps.appendIcon || `calendar_month_${thisProps.actionIconVariant}`;
    });
    const validator = useGetValidationResult(thisProps, isFocused);
    const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, displayValue));
    const showAppendIcon = computed(
      () =>
        slots['append-inner'] != null ||
        !Helper.isEmpty(calendarIcon.value) ||
        showClearButton.value
    );
    const fieldWrapperClasses = computed<TRecord>(() =>
      useFieldWrapperClasses(thisProps, validator.hasValidated.value, validator.hasError.value)
    );
    const fieldControlClasses = computed<TRecord>(() => ({
      ...useFieldControlClasses(slots, thisProps, displayValue, isFocused, showAppendIcon.value),
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
        thisProps,
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
