import { useRenderToggleFieldButton } from '@/components/Button/mixins/buttonApi.ts';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps.ts';
import type {
  TBsToggleField,
  TInputOptionItem,
  TToggleFieldOptionProps,
} from '@/components/Button/types';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { MaybeNumberish, TRecord } from '@/types';
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
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsToggleField>({
  name: 'BsToggleField',
  props: {
    ...toggleButtonProps,
    ...validationProps,
  },
  emits: ['update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TToggleFieldOptionProps>;
    const hasFocused = ref(false);

    const { hasError, hasValidated, showValidationError, showHelpText, errorItems } =
      useGetValidationResult(thisProps, hasFocused);

    const wrapperClasses = computed<TRecord>(() => ({
      [`${cssPrefix}field row`]: true,
      required: thisProps.required,
      readonly: thisProps.readonly,
      disabled: thisProps.disabled,
      'has-error': hasError.value,
      'has-success': hasValidated.value && !hasError.value,
    }));

    return () =>
      useRenderToggleFieldButton(
        slots,
        emit,
        thisProps,
        wrapperClasses,
        hasFocused,
        showHelpText,
        showValidationError,
        hasError,
        errorItems
      );
  },
}) as DefineComponent<
  TBsToggleField,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ToggleFieldEventProps,
  string,
  PublicProps,
  Readonly<TToggleFieldOptionProps> &
    Readonly<UpdateModelValueEventPublic<MaybeNumberish | unknown[]>>,
  ExtractDefaultPropTypes<TBsToggleField>,
  SlotsType<ToggleFieldSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

declare type ToggleFieldEventProps = UpdateModelValueEventProps<MaybeNumberish | unknown[]>;

declare interface ToggleFieldSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place custom item's label of the ToggleField.
   */
  label?: (props: TInputOptionItem) => VNode[] | VNode;

  /**
   * Additional slot used to place custom item's icon of the ToggleField.
   */
  icon?: (props: TInputOptionItem) => VNode[] | VNode;

  /**
   * Additional slot used to place custom help text of the ToggleField.
   */
  'help-text'?: () => VNode[] | VNode;
}
