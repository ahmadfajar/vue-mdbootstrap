import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { textFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useRenderTextArea,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import type { MaybeNumberish, TBsTextArea, TRecord, TTextAreaOptionProps } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, ref, watchEffect } from 'vue';

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
  emits: ['blur', 'focus', 'clear', 'keydown', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TTextAreaOptionProps>;
    const autocomplete =
      thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
        ? thisProps.autocomplete
        : thisProps.autocomplete
          ? 'on'
          : Helper.uuid();
    const localValue = ref<string | undefined | null>(thisProps.modelValue);
    const rowHeight = ref<MaybeNumberish>(thisProps.rowHeight);
    const inputRef = ref<HTMLTextAreaElement>();
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
      [`${cssPrefix}textarea`]: true,
      [`${cssPrefix}textarea-autogrow`]: thisProps.autoGrow && !thisProps.noResize,
      [`${cssPrefix}textarea-noresize`]:
        thisProps.noResize || (thisProps.autoGrow && !thisProps.noResize),
    }));

    watchEffect(() => {
      localValue.value = thisProps.modelValue;
      if (thisProps.autoGrow && !thisProps.noResize && inputRef.value) {
        inputRef.value.parentElement &&
          (inputRef.value.parentElement.dataset.clone = localValue.value as string);
      }
    });
    // watch(
    //     () => thisProps.modelValue,
    //     (value) => {
    //         localValue.value = value;
    //     }
    // );

    return () =>
      useRenderTextArea(
        slots,
        emit,
        thisProps,
        wrapperClasses,
        controlClasses,
        inputRef,
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
