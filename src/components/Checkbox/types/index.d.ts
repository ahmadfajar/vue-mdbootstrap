import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  Numberish,
  TContextColor,
  TInputBaseProps,
  TRadioInputProps,
  TRadioOptionProps,
  TValidationProps,
} from '@/types';
import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';

export declare type TInputGroupProps<D, M> = TInputBaseProps &
  TValidationProps & {
    /**
     * Sets this component color.
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

declare interface AllowedCheckboxProps
  extends BaseComponentProps,
    EventUpdateModelValueProps<Numberish | boolean | null> {
  /**
   * Fired when this component's checked state is updated.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this component's checked state is updated.
   */
  '@checked'?: (checked: boolean) => void;
}

export declare const BsCheckbox: {
  new (): {
    $props: AllowedCheckboxProps & TCheckboxOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'checked', checked: boolean): void;
      (event: 'update:model-value', value: Numberish | boolean | null): void;
    };
  };
};

declare type AllowedCheckboxGroupProps = BaseComponentProps &
  EventUpdateModelValueProps<string[] | number[] | unknown[]>;

export declare const BsCheckboxGroup: {
  new (): {
    $props: AllowedCheckboxGroupProps & TCheckboxGroupOptionProps;
    $slots: {
      default?: () => VNode[];
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'update:model-value', value: string[] | number[] | unknown[]): void;
    };
  };
};

export declare const BsCheckboxPlugin: ObjectPlugin;
