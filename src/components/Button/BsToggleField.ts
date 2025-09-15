import { useRenderToggleFieldButton } from '@/components/Button/mixins/buttonApi';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps';
import {
  useGetErrorItems,
  useHasValidated,
  useHasValidationError,
  useShowHelpText,
  useShowValidationError,
} from '@/components/Field/mixins/validationApi';
import { validationProps } from '@/components/Field/mixins/validationProps';
import { cssPrefix } from '@/mixins/CommonApi';
import type { TBsToggleField, TRecord, TToggleFieldOptionProps } from '@/types';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsToggleField>({
  name: 'BsToggleField',
  props: {
    ...toggleButtonProps,
    ...validationProps,
  },
  emits: [
    /**
     * Callback fired when this component's value is updated.
     */
    'update:model-value',
  ],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TToggleFieldOptionProps>;
    const hasFocused = ref(false);
    const hasError = computed<boolean>(() => useHasValidationError(thisProps));
    const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
    const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
    const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, hasFocused.value));
    const errorItems = computed(() => useGetErrorItems(thisProps));
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
