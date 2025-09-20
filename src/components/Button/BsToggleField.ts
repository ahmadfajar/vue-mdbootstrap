import { useRenderToggleFieldButton } from '@/components/Button/mixins/buttonApi.ts';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TBsToggleField, TRecord, TToggleFieldOptionProps } from '@/types';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsToggleField>({
  name: 'BsToggleField',
  props: {
    ...toggleButtonProps,
    ...validationProps,
  },
  emits: ['update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TToggleFieldOptionProps>;
    const hasFocused = ref(false);

    const { hasError, hasValidated, showValidationError, showHelpText, errorItems } =
      useGetValidationResult(thisProps, hasFocused);

    const wrapperClasses = computed<TRecord>(() => ({
      [`${cssPrefix}field`]: true,
      [`${cssPrefix}toggle-field row`]: true,
      required: thisProps.required,
      readonly: thisProps.readonly,
      disabled: thisProps.disabled,
      'has-error': hasError.value,
      'has-success': hasValidated.value && !hasError.value,
    }));

    return () =>
      useRenderToggleFieldButton(
        slots,
        emit,
        props,
        wrapperClasses,
        hasFocused,
        showHelpText,
        showValidationError,
        hasError,
        errorItems
      );
  },
});
