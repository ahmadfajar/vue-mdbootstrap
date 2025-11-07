import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  MaybeNumberish,
  Numberish,
  TAllowedIconProps,
  TClassList,
  TInputBaseProps,
  TValidationProps,
} from '../../../types';

export declare type TButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark'
  | 'default';

export declare type TButtonMode = 'default' | 'icon' | 'fab';

export declare type TButtonType = 'button' | 'submit' | 'reset';

export declare type TButtonSize = 'xs' | 'sm' | 'lg';

export declare type TIconPosition = 'left' | 'right';

export declare type TButtonInnerOptionProps = {
  dropdownToggle?: boolean;
  hasIcon?: boolean;
  iconMode?: boolean;
  rippleOff?: boolean;
};

export declare type TButtonBaseProps = {
  /**
   * Sets this button color.
   */
  color?: TButtonColor | string;

  /**
   * Render this button with flat style like Google Material
   * [Text Button](https://m3.material.io/components/buttons/specs).
   */
  flat?: boolean;

  /**
   * Render this button with outlined style like Google Material
   * [Outlined Button](https://m3.material.io/components/buttons/specs).
   */
  outlined?: boolean;

  /**
   * Render this button with raised style like Google Material
   * [Elevated Button](https://m3.material.io/components/buttons/specs).
   */
  raised?: boolean;

  /**
   * Enable filled tonal button style.
   */
  tonal?: boolean;

  /**
   * Render this button with rounded style.
   * @see [Bootstrap Buttons](https://getbootstrap.com/docs/5.3/components/buttons/)
   */
  rounded?: boolean;

  /**
   * Render button with rounded-pill style like Google Material
   * [Button](https://m3.material.io/components/buttons/specs).
   */
  pill?: boolean;

  /**
   * An alternative way to turn off the **rounded-pill** style.
   */
  pillOff?: boolean;

  /**
   * This button size.
   * @see [Bootstrap Button Size](https://getbootstrap.com/docs/5.3/components/buttons/#sizes)
   */
  size?: TButtonSize;
};

export declare type TCustomIconProps = {
  /**
   * Apply custom css class to the icon.
   */
  iconClass?: TClassList;

  /**
   * Place icon on the `left` side (before text) or on the `right` side (after text).
   */
  iconPosition?: TIconPosition;

  /**
   * Render the icon with equal height and width.
   */
  iconSize?: Numberish;
};

export declare type TButtonOptionProps = TAllowedIconProps &
  TCustomIconProps &
  TButtonBaseProps & {
    /**
     * Sets this button state: `active` or `normal`.
     */
    active?: boolean;

    /**
     * Sets this button state: `enabled` or `disabled`.
     */
    disabled?: boolean;

    /**
     * Sets this button state to `readonly`.
     */
    readonly?: boolean;

    /**
     * This button component mode, valid values are: `default, icon, fab, floating`.
     *
     * `floating` is deprecated, use `fab` instead.
     */
    mode?: TButtonMode;

    /**
     * Render this button component as dropdowns button.
     * @see [Bootstrap Dropdowns](https://getbootstrap.com/docs/5.3/components/dropdowns/)
     */
    dropdownToggle?: boolean;

    /**
     * Render component as `<a>` element and define its `href` property and
     * apply button styles to the element.
     */
    href?: string;

    /**
     * Disable the **ripple** effect.
     */
    rippleOff?: boolean;

    /**
     * The value to set to the button’s type attribute. Valid values are: `button`, `submit`, `reset`.
     */
    type?: TButtonType;
  };

export declare type TInputOptionItem = TAllowedIconProps & {
  /**
   * Html `<input>` element ID.
   */
  id?: string;

  /**
   * Html `<input>` element name. It is used when `multiple` is `true`.
   */
  name?: string;

  /**
   * Html `<input>` element state and input item state.
   */
  disabled?: boolean;

  /**
   * Html `<input>` element state and input item state.
   */
  readonly?: boolean;

  /**
   * Input item value.
   */
  value: string | number | boolean;

  /**
   * Input item label. If not sets then it will be assigned from `value` property.
   */
  label?: string;

  /**
   * Render the icon with equal height and width.
   */
  iconSize?: number;
};

declare type AllowedButtonProps = Omit<TButtonBaseProps, 'flat'>;

export declare type TToggleButtonOptionProps = TInputBaseProps &
  AllowedButtonProps & {
    /**
     * The number of items stored in the collection.
     */
    items: TInputOptionItem[];

    /**
     * Allow multiple choice or not.
     */
    multiple?: boolean;

    /**
     * The input value to be monitored by `v-model`.
     */
    modelValue?: MaybeNumberish | boolean | unknown[];

    /**
     * Color to apply when Button is active or selected.
     */
    toggleColor?: TButtonColor | string;

    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition?: TIconPosition;
  };

export declare type TToggleFieldOptionProps = TToggleButtonOptionProps & TValidationProps;

export declare type TBsButtonInner = ComponentObjectPropsOptions<TButtonInnerOptionProps>;

export declare type TBsButton = ComponentObjectPropsOptions<TButtonOptionProps>;

export declare type TBsToggleButton = ComponentObjectPropsOptions<TToggleButtonOptionProps>;

export declare type TBsToggleField = ComponentObjectPropsOptions<TToggleFieldOptionProps>;

export declare const BsButton: {
  new (): {
    $props: BaseComponentProps & TButtonOptionProps;
    $slots: {
      default?: () => VNode[];
      icon?: () => VNode;
    };
  };
};

declare type AllowedToggleButtonProps = BaseComponentProps &
  EventUpdateModelValueProps<MaybeNumberish | boolean | unknown[]>;

export declare const BsToggleButton: {
  new (): {
    $props: AllowedToggleButtonProps & TToggleButtonOptionProps;
    $slots: {
      label?: (item: TInputOptionItem) => VNode[];
      icon?: (item: TInputOptionItem) => VNode;
    };
    $emits: {
      (event: 'update:model-value', value: MaybeNumberish | boolean | unknown[]): void;
    };
  };
};

export declare const BsToggleField: {
  new (): {
    $props: AllowedToggleButtonProps & TToggleFieldOptionProps;
    $slots: {
      default?: () => VNode[];
      label?: (props: TInputOptionItem) => VNode;
      icon?: (props: TInputOptionItem) => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'update:model-value', value: Numberish | boolean): void;
    };
  };
};

export declare const BsButtonPlugin: ObjectPlugin;
