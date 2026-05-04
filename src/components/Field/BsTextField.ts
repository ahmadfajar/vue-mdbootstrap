/* eslint-disable @typescript-eslint/no-empty-object-type */
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { inputFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useRenderTextField,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import type { TBsTextField, TFieldType, TTextFieldOptionProps } from '@/components/Field/types';
import type {
  FieldSlots,
  TextFieldEventProps,
  TextFieldEventPublic,
} from '@/components/Field/types/internals.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  booleanTrueProp,
  stringOrNumberProp,
  stringProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import type { MaybeNumberish, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  Prop,
  PropType,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

const textFieldProps = {
  ...inputProps,
  ...inputFieldProps,
  ...validationProps,
  autocomplete: {
    type: [String, Boolean],
    default: false,
  },
  autofocus: booleanProp,
  type: {
    type: String as PropType<TFieldType>,
    default: 'text',
    validator: (v: TFieldType): boolean => ['text', 'email', 'password', 'tel', 'url'].includes(v),
  } as Prop<TFieldType>,
  datalist: stringProp,
  modelValue: stringOrNumberProp,
  passwordToggle: booleanTrueProp,
  placeholder: stringProp,
  maxlength: validStringOrNumberProp,
  minlength: validStringOrNumberProp,
  rounded: booleanProp,
  prefix: stringProp,
  suffix: stringProp,
};

export default defineComponent<TBsTextField>({
  name: 'BsTextField',
  props: textFieldProps,
  emits: ['blur', 'focus', 'clear', 'keydown', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TTextFieldOptionProps>;
    const autocomplete =
      thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
        ? thisProps.autocomplete
        : thisProps.autocomplete
          ? 'on'
          : null;
    const localValue = ref<MaybeNumberish>(thisProps.modelValue);
    const passwordToggled = ref(false);
    const isFocused = ref(false);
    const { hasError, hasValidated, showValidationError, showHelpText, errorItems } =
      useGetValidationResult(thisProps, isFocused);
    const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));

    const showPasswordToggle = computed<boolean>(
      () => thisProps.type === 'password' && thisProps.passwordToggle === true
    );

    const showAppendIcon = computed(
      () =>
        slots['append-inner'] != null ||
        !Helper.isEmpty(thisProps.appendIcon) ||
        showClearButton.value ||
        showPasswordToggle.value
    );

    const fieldWrapperClasses = computed<TRecord>(() =>
      useFieldWrapperClasses(thisProps, hasValidated.value, hasError.value)
    );

    const fieldControlClasses = computed<TRecord>(() => ({
      ...useFieldControlClasses(slots, thisProps, localValue, isFocused, showAppendIcon.value),
      [`${cssPrefix}field-rounded`]: (thisProps.outlined || thisProps.filled) && thisProps.rounded,
      [`${cssPrefix}text-field`]: true,
    }));

    const fieldType = computed<TFieldType | undefined>(() => {
      if (showPasswordToggle.value) {
        return passwordToggled.value ? 'text' : 'password';
      }

      return thisProps.type;
    });

    const onPasswordToggleHandler = (value: boolean): void => {
      passwordToggled.value = value;
    };

    watch(
      () => thisProps.modelValue,
      (value) => {
        localValue.value = value;
      }
    );

    return () =>
      useRenderTextField(
        slots,
        emit,
        thisProps,
        fieldWrapperClasses,
        fieldControlClasses,
        fieldType.value,
        localValue,
        isFocused,
        passwordToggled,
        autocomplete,
        showClearButton,
        showPasswordToggle,
        showHelpText,
        showValidationError,
        hasValidated,
        hasError,
        errorItems,
        onPasswordToggleHandler
      );
  },
}) as DefineComponent<
  TBsTextField,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TextFieldEventProps,
  string,
  PublicProps,
  Readonly<TTextFieldOptionProps> & Readonly<TextFieldEventPublic>,
  ExtractDefaultPropTypes<TBsTextField>,
  SlotsType<FieldSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
