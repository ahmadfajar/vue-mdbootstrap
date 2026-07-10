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
import type { Numberish, TRecord } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
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
}) as DefineComponent<
  TBsRadioGroup,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateModelValueEventProps<Numberish | boolean>,
  string,
  PublicProps,
  Readonly<TRadioGroupOptionProps> & Readonly<UpdateModelValueEventPublic<Numberish | boolean>>,
  ExtractDefaultPropTypes<TBsRadioGroup>,
  SlotsType<RadioGroupSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

declare interface RadioGroupSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place the custom help text of the RadioGroup.
   */
  'help-text'?: () => VNode[] | VNode;
}
