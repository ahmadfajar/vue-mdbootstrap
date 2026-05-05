import type { TInputGroupProps } from '@/components/Checkbox/types';
import type { TInputBaseProps } from '@/components/Field/types';
import type { Numberish, TContextColor } from '@/types';
import type { ComponentObjectPropsOptions } from 'vue';

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
//
// export declare const BsRadioPlugin: ObjectPlugin;
