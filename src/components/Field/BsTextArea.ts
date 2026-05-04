/* eslint-disable @typescript-eslint/no-empty-object-type */
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { inputFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useRenderTextArea,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import type { TBsTextArea, TTextAreaOptionProps } from '@/components/Field/types';
import type {
  FieldSlots,
  TextAreaEventProps,
  TextAreaEventPublic,
} from '@/components/Field/types/internals.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, stringProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import type { MaybeNumberish, MaybeString, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, ref, watchEffect } from 'vue';

const textAreaProps = {
  ...inputProps,
  ...inputFieldProps,
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
};

export default defineComponent<TBsTextArea>({
  name: 'BsTextArea',
  props: textAreaProps,
  emits: ['blur', 'focus', 'clear', 'keydown', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TTextAreaOptionProps>;
    const autocomplete =
      thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
        ? thisProps.autocomplete
        : thisProps.autocomplete
          ? 'on'
          : null;
    const localValue = ref<MaybeString>(thisProps.modelValue);
    const rowHeight = ref<MaybeNumberish>(thisProps.rowHeight);
    const inputRef = ref<HTMLTextAreaElement>();
    const isFocused = ref(false);
    const { hasError, hasValidated, showValidationError, showHelpText, errorItems } =
      useGetValidationResult(thisProps, isFocused);
    const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));

    const showAppendIcon = computed(
      () =>
        slots['append-inner'] != null ||
        !Helper.isEmpty(thisProps.appendIcon) ||
        showClearButton.value
    );

    const wrapperClasses = computed<TRecord>(() =>
      useFieldWrapperClasses(thisProps, hasValidated.value, hasError.value)
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

      if (
        thisProps.autoGrow &&
        !thisProps.noResize &&
        inputRef.value &&
        inputRef.value.parentElement
      ) {
        localValue.value && (inputRef.value.parentElement.dataset.clone = localValue.value);
      }
    });

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
        showHelpText,
        showValidationError,
        hasValidated,
        hasError,
        errorItems
      );
  },
}) as DefineComponent<
  TBsTextArea,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TextAreaEventProps,
  string,
  PublicProps,
  Readonly<TTextAreaOptionProps> & Readonly<TextAreaEventPublic>,
  ExtractDefaultPropTypes<TBsTextArea>,
  SlotsType<FieldSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
