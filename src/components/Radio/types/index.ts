import type { TInputGroupProps } from '@/components/Checkbox/types';
import type { TInputBaseProps } from '@/components/Field/types';
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

export declare interface TRadioInputProps {
  /**
   * Sets the `<input>` element `ID` attribute. This property value is auto generates.
   */
  id?: string;

  /**
   * Sets the `<input>` element `name` attribute.
   */
  name?: Numberish;

  /**
   * This input field state: enabled or disabled.
   */
  disabled?: boolean;

  /**
   * Sets this input field into readonly state.
   */
  readonly?: boolean;

  /**
   * Sets this component color.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `default`.
   */
  color?: TContextColor | string;

  /**
   * The `<input>` element `value` attribute.
   */
  value: Numberish | boolean | unknown;

  /**
   * The text label to display.
   */
  label: string;
}

export declare type TRadioOptionProps = TInputBaseProps & {
  /**
   * Sets this component color.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `default`.
   */
  color?: TContextColor | string;

  /**
   * The `<input>` element `value` attribute.
   */
  value?: Numberish | boolean | unknown;

  /**
   * The input value to be monitored by `v-model`.
   */
  modelValue?: Numberish | boolean | unknown;
};

export declare type TRadioGroupOptionProps = TInputGroupProps<
  TRadioInputProps,
  Numberish | boolean | unknown
>;

export declare type TBsRadio = ComponentObjectPropsOptions<TRadioOptionProps>;

export declare type TBsRadioGroup = ComponentObjectPropsOptions<TRadioGroupOptionProps>;

// declare interface AllowedRadioProps
//   extends PublicComponentProps, UpdateModelValueEventPublic<Numberish | boolean> {
//   /**
//    * Fired when this component's checked state is updated.
//    */
//   onChecked?: (checked: boolean) => void;
//
//   /**
//    * Fired when this component's checked state is updated.
//    */
//   '@checked'?: (checked: boolean) => void;
// }
//
// export declare const BsRadio: {
//   new (): {
//     $props: AllowedRadioProps & TRadioOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'checked', checked: boolean): void;
//       (event: 'update:model-value', value: Numberish | boolean): void;
//     };
//   };
// };
//
// declare interface AllowedRadioGroupProps
//   extends PublicComponentProps, UpdateModelValueEventPublic<Numberish | boolean> {}
//
// export declare const BsRadioGroup: {
//   new (): {
//     $props: AllowedRadioGroupProps & TRadioGroupOptionProps;
//     $slots: {
//       default?: () => VNode[];
//       'help-text'?: () => VNode;
//     };
//     $emits: {
//       (event: 'update:model-value', value: Numberish | boolean): void;
//     };
//   };
// };

export declare type RadioEventProps = UpdateModelValueEventProps<Numberish | boolean | null> & {
  /**
   * Fired when this Radio component's "checked" state is updated.
   */
  checked?: (checked: boolean) => void;
};

export declare interface RadioEventPublic extends UpdateModelValueEventPublic<
  Numberish | boolean | null
> {
  /**
   * Fired when this Radio component's "checked" state is updated.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this Radio component's "checked" state is updated.
   */
  '@checked'?: (checked: boolean) => void;
}

export declare type BsRadio = DefineComponent<
  TBsRadio,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  RadioEventProps,
  string,
  PublicProps,
  Readonly<TRadioOptionProps> & Readonly<RadioEventPublic>,
  ExtractDefaultPropTypes<TBsRadio>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  never
>;

export declare interface RadioGroupSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place the custom help text of the RadioGroup.
   */
  'help-text'?: () => VNode[] | VNode;
}

export declare type BsRadioGroup = DefineComponent<
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
