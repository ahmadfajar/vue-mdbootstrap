/* eslint-disable @typescript-eslint/no-empty-object-type */
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { useRenderChipField } from '@/components/Field/mixins/chipFieldApi.ts';
import { inputFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import type { TBsChipField, TChipFieldOptionProps } from '@/components/Field/types';
import type {
  ChipFieldEventProps,
  ChipFieldEventPublic,
  FieldSlots,
} from '@/components/Field/types/internals.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, stringOrArrayProp, stringProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
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
import { computed, defineComponent, ref, watch } from 'vue';

function convertValues(sources: string | string[] | undefined | null): string[] {
  return Helper.isString(sources) && !Helper.isEmpty(sources)
    ? sources.split(',').map((v) => v.trim())
    : Array.isArray(sources)
      ? sources
      : [];
}

const chipFieldProps = {
  ...inputProps,
  ...inputFieldProps,
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
};

export default defineComponent<TBsChipField>({
  name: 'BsChipField',
  props: chipFieldProps,
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
        thisProps,
        wrapperClasses,
        controlClasses,
        inputValue,
        localValue,
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
  TBsChipField,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ChipFieldEventProps,
  string,
  PublicProps,
  Readonly<TChipFieldOptionProps> & Readonly<ChipFieldEventPublic>,
  ExtractDefaultPropTypes<TBsChipField>,
  SlotsType<FieldSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
