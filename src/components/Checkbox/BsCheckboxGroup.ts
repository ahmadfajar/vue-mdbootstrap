import { useCreateCheckboxItems } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { baseInputProps, checkboxGroupProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import {
  useInputGroupClasses,
  useInputGroupValidation,
  useRenderRadioOrCheckboxGroup,
} from '@/components/Radio/mixins/radioApi.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type {
  Numberish,
  TBsCheckboxGroup,
  TCheckboxGroupOptionProps,
  TCheckboxInputProps,
} from '@/types';
import { computed, defineComponent } from 'vue';

export default defineComponent<TBsCheckboxGroup>({
  name: 'BsCheckboxGroup',
  props: {
    ...baseInputProps,
    ...checkboxGroupProps,
    ...validationProps,
  },
  emits: ['update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TCheckboxGroupOptionProps>;

    const { showHelpText, hasValidated, hasError, showValidationError, errorItems } =
      useInputGroupValidation(thisProps);
    const checkboxClasses = computed(() => ({
      ...useInputGroupClasses(thisProps, hasValidated.value, hasError.value),
      [`${cssPrefix}checkbox-group`]: true,
    }));

    const toggleCheckHandler = (
      values: Numberish | unknown | Numberish[] | unknown[],
      item: TCheckboxInputProps
    ): void => {
      if (!thisProps.disabled && !thisProps.readonly && !item.disabled && !item.readonly) {
        emit('update:model-value', Array.isArray(values) ? values : [values]);
      }
    };

    return () =>
      useRenderRadioOrCheckboxGroup(
        slots,
        thisProps,
        checkboxClasses,
        useCreateCheckboxItems(thisProps, toggleCheckHandler),
        showValidationError.value,
        showHelpText.value,
        hasError.value,
        errorItems.value
      );
  },
});
