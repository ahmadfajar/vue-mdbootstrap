/* eslint-disable @typescript-eslint/no-empty-object-type */
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
import type { Numberish } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
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
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  RadioGroupEventProps,
  string,
  PublicProps,
  Readonly<TRadioGroupOptionProps> & Readonly<RadioGroupEventPublic>,
  ExtractDefaultPropTypes<TBsRadioGroup>,
  SlotsType<RadioGroupSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  never
>;

declare type RadioGroupEventProps = UpdateModelValueEventProps<Numberish | boolean>;

declare interface RadioGroupEventPublic extends UpdateModelValueEventPublic<Numberish | boolean> {}

declare interface RadioGroupSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place the custom help text of the RadioGroup.
   */
  'help-text'?: () => VNode[] | VNode;
}
