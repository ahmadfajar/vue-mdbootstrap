import { useCheckboxClasses, useToggleChecked } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { checkboxProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import type {
  CheckboxEventProps,
  CheckboxEventPublic,
  TBsCheckbox,
  TCheckboxOptionProps,
} from '@/components/Checkbox/types';
import {
  useCreateInputRadioOrCheckbox,
  useRenderRadioOrCheckbox,
} from '@/components/Radio/mixins/radioApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
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
} from 'vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsCheckbox>({
  name: 'BsCheckbox',
  props: checkboxProps,
  emits: ['checked', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TCheckboxOptionProps>;
    const rippleActive = ref(false);
    const checkboxClasses = computed(() => useCheckboxClasses(thisProps));

    const toggleCheckHandler = () => useToggleChecked(emit, thisProps, rippleActive);

    return () =>
      useRenderRadioOrCheckbox(
        slots,
        thisProps,
        checkboxClasses,
        rippleActive,
        'checkbox',
        useCreateInputRadioOrCheckbox(thisProps, 'checkbox', {
          indeterminate: props.indeterminate,
          'true-value': true,
          'false-value': false,
        }),
        toggleCheckHandler
      );
  },
}) as DefineComponent<
  TBsCheckbox,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  CheckboxEventProps,
  string,
  PublicProps,
  Readonly<TCheckboxOptionProps> & Readonly<CheckboxEventPublic>,
  ExtractDefaultPropTypes<TBsCheckbox>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
