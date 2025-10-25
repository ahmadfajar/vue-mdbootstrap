import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { useRenderChipField } from '@/components/Field/mixins/chipFieldApi.ts';
import { textFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, stringOrArrayProp, stringProp } from '@/mixins/CommonProps.ts';
import type { TBsChipField, TChipFieldOptionProps, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsChipField>({
  name: 'BsChipField',
  props: {
    ...inputProps,
    ...textFieldProps,
    ...validationProps,
    autocomplete: {
      type: [String, Boolean],
      default: false,
    },
    autofocus: booleanProp,
    chipColor: stringProp,
    chipDeletable: booleanProp,
    chipPill: booleanProp,
    chipOutlined: booleanProp,
    modelValue: stringOrArrayProp,
    placeholder: stringProp,
  },
  emits: ['blur', 'focus', 'clear', 'keydown', 'delete-item', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TChipFieldOptionProps>;
    const autocomplete =
      thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
        ? thisProps.autocomplete
        : thisProps.autocomplete
          ? 'on'
          : null;
    const inputValue = ref<string>('');
    const localValue = ref<string[]>(convertValues(thisProps.modelValue));
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
      useFieldWrapperClasses(thisProps, validator.hasValidated.value, validator.hasError.value)
    );
    const controlClasses = computed<TRecord>(() => ({
      ...useFieldControlClasses(slots, thisProps, localValue, isFocused, showAppendIcon.value),
      [`${cssPrefix}chip-field`]: true,
    }));

    watch(
      () => thisProps.modelValue,
      (value) => {
        localValue.value = convertValues(value);
      }
    );

    return () =>
      useRenderChipField(
        slots,
        emit,
        props,
        wrapperClasses,
        controlClasses,
        inputValue,
        localValue,
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

function convertValues(sources: string | string[] | undefined | null) {
  return Array.isArray(sources)
    ? sources
    : !Helper.isEmpty(sources)
      ? sources.split(',').map((v) => v.trim())
      : [];
}
