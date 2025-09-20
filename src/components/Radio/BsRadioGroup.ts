import { baseInputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import {
  useCreateRadioItems,
  useInputGroupClasses,
  useInputGroupValidation,
  useRenderRadioOrCheckboxGroup,
} from '@/components/Radio/mixins/radioApi.ts';
import { radioGroupProps } from '@/components/Radio/mixins/radioProps.ts';
import type {
  TBsRadioGroup,
  TRadioGroupOptionProps,
  TRadioInputProps,
} from '@/components/Radio/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { computed, defineComponent } from 'vue';

export default defineComponent<TBsRadioGroup>({
  name: 'BsRadioGroup',
  props: {
    ...baseInputProps,
    ...radioGroupProps,
    ...validationProps,
  },
  emits: ['update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TRadioGroupOptionProps>;

    const { showHelpText, hasValidated, hasError, showValidationError, errorItems } =
      useInputGroupValidation(thisProps);

    const checkboxClasses = computed(() => ({
      ...useInputGroupClasses(thisProps, hasValidated.value, hasError.value),
      [`${cssPrefix}radio-group`]: true,
    }));

    const toggleCheckHandler = (item: TRadioInputProps): void => {
      if (!thisProps.disabled && !thisProps.readonly && !item.disabled && !item.readonly) {
        emit('update:model-value', item.value);
      }
    };

    return () =>
      useRenderRadioOrCheckboxGroup(
        slots,
        thisProps,
        checkboxClasses,
        useCreateRadioItems(thisProps, toggleCheckHandler),
        showValidationError.value,
        showHelpText.value,
        hasError.value,
        errorItems.value
      );
  },
});
