import type { TInputBaseProps, TValidationProps } from '@/components/Field/types';
import type { TRadioInputProps, TRadioOptionProps } from '@/components/Radio/types';
import type { Numberish, TContextColor, TRecord } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals';
import type {
  Component,
  ComponentObjectPropsOptions,
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

export declare type TInputGroupProps<D, M> = TInputBaseProps &
  TValidationProps & {
    /**
     * Sets this component color.
     *
     * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `default`.
     */
    color?: TContextColor | string;

    /**
     * Sets the maximum number of columns to display the checkbox or radio-button.
     * When the number of items exceed the number of columns, then the remaining
     * items will be displayed on the next row. The maximum number of columns
     * must be less than 7.
     */
    column?: Numberish;

    /**
     * The collection of `<bs-radio>` or `<bs-checkbox>` property-value.
     */
    items: D[];

    /**
     * The value monitored by `v-model` to maintain the checked state.
     */
    modelValue?: M;
  };

export declare interface TCheckboxInputProps extends TRadioInputProps {
  indeterminate?: boolean;
}

export declare type TCheckboxOptionProps = TRadioOptionProps & {
  indeterminate?: boolean;
};

export declare type TCheckboxGroupOptionProps = TInputGroupProps<
  TCheckboxInputProps,
  Numberish[] | unknown[]
> & {
  indeterminate?: boolean;
};

export declare type TBsCheckbox = ComponentObjectPropsOptions<TCheckboxOptionProps>;

export declare type TBsCheckboxGroup = ComponentObjectPropsOptions<TCheckboxGroupOptionProps>;

export declare type CheckboxEventProps = UpdateModelValueEventProps<Numberish | boolean | null> & {
  /**
   * Fired when this checkbox component's "checked" state is updated.
   */
  checked?: (checked: boolean) => void;
};

export declare interface CheckboxEventPublic extends UpdateModelValueEventPublic<
  Numberish | boolean | null
> {
  /**
   * Fired when this checkbox component's "checked" state is updated.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this checkbox component's "checked" state is updated.
   */
  '@checked'?: (checked: boolean) => void;
}

export declare type BsCheckboxConstructor = DefineComponent<
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
  true,
  TRecord,
  never
>;

export declare const BsCheckbox: {
  new (): {
    $props: TCheckboxOptionProps & CheckboxEventPublic & PublicProps;
    $slots: VoidDefaultSlots;
    $emit: CheckboxEventProps;
  };
};

export declare interface CheckboxGroupSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place the custom help text of the CheckboxGroup.
   */
  'help-text'?: () => VNode[] | VNode;
}

export declare type BsCheckboxGroupConstructor = DefineComponent<
  TBsCheckboxGroup,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateModelValueEventProps<(string | number | unknown)[]>,
  string,
  PublicProps,
  Readonly<TCheckboxGroupOptionProps> &
    Readonly<UpdateModelValueEventPublic<(string | number | unknown)[]>>,
  ExtractDefaultPropTypes<TBsCheckboxGroup>,
  SlotsType<CheckboxGroupSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCheckboxGroup: {
  new (): {
    $props: TCheckboxGroupOptionProps &
      UpdateModelValueEventPublic<(string | number | unknown)[]> &
      PublicProps;
    $slots: CheckboxGroupSlots;
    $emit: UpdateModelValueEventProps<(string | number | unknown)[]>;
  };
};
