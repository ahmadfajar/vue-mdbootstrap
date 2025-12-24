import { numericFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import { useRenderNumericField } from '@/components/Field/mixins/numericFieldApi.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { cssPrefix, isServer } from '@/mixins/CommonApi.ts';
import type { TBsNumericField, TNumericFieldOptionProps, TNumericOptions, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsNumericField>({
  name: 'BsNumericField',
  props: numericFieldProps,
  emits: ['blur', 'focus', 'clear', 'keydown', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TNumericFieldOptionProps>;
    const autocomplete =
      thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
        ? thisProps.autocomplete
        : thisProps.autocomplete
          ? 'on'
          : null;
    const localValue = ref<number | null | undefined>(thisProps.modelValue);
    const inputRef = ref<HTMLElement | null>(null);
    const hasFocus = ref(false);
    const validator = useGetValidationResult(thisProps, hasFocus);
    const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));
    const showAppendIcon = computed(
      () =>
        slots['append-inner'] != null ||
        !Helper.isEmpty(thisProps.appendIcon) ||
        showClearButton.value ||
        (!!thisProps.actionButton &&
          ['right', 'both'].includes(thisProps.actionButtonPlacement as string) &&
          !thisProps.disabled &&
          !thisProps.readonly)
    );
    const showPrependIcon = computed(
      () =>
        slots['prepend-inner'] != null ||
        !Helper.isEmpty(thisProps.prependIcon) ||
        (!thisProps.disabled &&
          !thisProps.readonly &&
          ((thisProps.actionButton === 'up-down' && thisProps.actionButtonPlacement === 'left') ||
            (thisProps.actionButton === 'plus-minus' &&
              ['left', 'both'].includes(thisProps.actionButtonPlacement as string))))
    );
    const fieldWrapperClasses = computed<TRecord>(() =>
      useFieldWrapperClasses(thisProps, validator.hasValidated.value, validator.hasError.value)
    );
    const fieldControlClasses = computed<TRecord>(() => ({
      ...useFieldControlClasses(
        slots,
        thisProps,
        localValue,
        hasFocus,
        showAppendIcon.value,
        showPrependIcon.value
      ),
      [`${cssPrefix}field-rounded`]: (thisProps.outlined || thisProps.filled) && thisProps.rounded,
      [`${cssPrefix}numeric-field`]: true,
    }));

    const operationOptions: TNumericOptions = {
      locale: thisProps.locale || (isServer ? 'en-US' : window.navigator.language),
      maxValue: Helper.parseFloatLoose(thisProps.maxValue as string),
      minValue: Helper.parseFloatLoose(thisProps.minValue as string),
      step: Helper.parseFloatLoose(thisProps.step as string) || 1.0,
    };
    const formatOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits: Helper.parseIntLoose(thisProps.maxFraction as string) ?? 3,
      useGrouping: thisProps.useGrouping,
    };

    watch(
      () => thisProps.modelValue,
      (value) => {
        localValue.value = value ?? null;
      }
    );

    return () =>
      useRenderNumericField(
        slots,
        emit,
        thisProps,
        operationOptions,
        formatOptions,
        fieldWrapperClasses,
        fieldControlClasses,
        localValue,
        inputRef,
        hasFocus,
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
