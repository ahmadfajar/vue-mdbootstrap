import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  EventVoidClosableProps,
  Numberish,
  TAllowedIconProps,
  TButtonColor,
  TContextColorSecondary,
  TIconPosition,
} from '../../../types';

export declare type TChipSize = 'sm' | 'lg';

export declare type TChipValue = {
  id: string;
  text: string;
  value?: Numberish | boolean;
};

export declare type TChipContainer = {
  contentId: string;
  contentWidth: number;
  wrapperId: string;
  wrapperWidth: number;
};

export declare type TChipOptionItem = TAllowedIconProps & {
  id?: string;
  disabled?: boolean;
  dismissible?: boolean;
  imgSrc?: string;
  href?: string;
  text: string;
  value?: Numberish | boolean;
};

declare type TChipBaseProps = {
  /**
   * Custom CSS class to apply when this Chip is in active state.
   */
  activeClass?: string;

  /**
   * The default color to apply to this Chip.
   */
  color?: TContextColorSecondary | string;

  /**
   * Apply custom color to the **close button**.
   */
  closeButtonColor?: TButtonColor | string;

  /**
   * Create chip's avatar with **circle shape** style.
   */
  imgCircle?: boolean;

  /**
   * Adjust avatar size to match the Chip's height by eliminating the margin around the avatar.
   */
  imgPaddingOff?: boolean;

  /**
   * Render this Chip with **outlined** style or not.
   */
  outlined?: boolean;

  /**
   * Render this Chip with **rounded-pill** style.
   */
  pill?: boolean;

  /**
   * Create this component with predefined size, valid values are: `sm` (small), `lg` (large).
   */
  size?: TChipSize;
};

export declare type TChipOptionProps = TAllowedIconProps &
  TChipBaseProps & {
    /**
     * Sets this component state: `active` or `normal`.
     */
    active?: boolean;

    /**
     * Sets this component state to `disabled`.
     */
    disabled?: boolean;

    /**
     * Sets this component state to `readonly`.
     */
    readonly?: boolean;

    /**
     * When sets, display the **close button** to dismiss/hide this component.
     */
    dismissible?: boolean;

    /**
     * Render as `<a>` element and define its `href` property and apply chip styles to the element.
     */
    href?: string;

    /**
     * Enable avatar and set the image location url.
     */
    imgSrc?: string;

    /**
     * The value monitored by `v-model` to show or hide this component.
     */
    modelValue?: boolean;

    /**
     * Enabled or disabled ripple effect.
     * Ripple effect is automatically disabled when `click` event or `href` property is not defined.
     */
    rippleOff?: boolean;

    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition?: TIconPosition;
  };

export declare type TChipGroupOptionProps = TChipBaseProps & {
  /**
   * Show checked icon when the Chip is selected.
   */
  checkedIcon?: boolean;

  /**
   * Enable multi rows if total width of items beyond the container width.
   */
  column?: boolean;

  /**
   * The collection of `<BsChip>` property-value.
   */
  items: TChipOptionItem[];

  /**
   * The value monitored by `v-model` for the selected items.
   */
  modelValue?: TChipValue | TChipValue[];

  /**
   * Allow multiple selection or not.
   */
  multiple?: boolean;

  /**
   * Show slider's button or not.
   */
  sliderButton?: boolean;

  /**
   * Slider button color appearance.
   */
  sliderButtonColor?: string;
};

export declare type TBsChip = ComponentObjectPropsOptions<TChipOptionProps>;

export declare type TBsChipGroup = ComponentObjectPropsOptions<TChipGroupOptionProps>;

declare interface AllowedChipProps
  extends BaseComponentProps,
    EventVoidClosableProps,
    EventUpdateModelValueProps<boolean> {
  /**
   * Fired when this component state is updated.
   */
  'onUpdate:active'?: (active: boolean) => void;

  /**
   * Fired when this component state is updated.
   */
  '@update:active'?: (active: boolean) => void;
}

export declare const BsChip: {
  new (): {
    $props: AllowedChipProps & TChipOptionProps;
    $slots: {
      default?: () => VNode[];
      icon?: () => VNode;
    };
    $emits: {
      (event: 'close'): void;
      (event: 'update:model-value', value: boolean): void;
      (event: 'update:active', active: boolean): void;
    };
  };
};

declare interface AllowedChipGroupProps
  extends BaseComponentProps,
    EventUpdateModelValueProps<TChipValue | TChipValue[] | null> {
  /**
   * Fired immediately when this component's value is changed.
   */
  onChange?: (newValue: TChipValue | TChipValue[] | null) => void;

  /**
   * Fired when this component's item is dismissed (hide).
   */
  'onItem:close'?: (dismissedItem: TChipValue) => void;

  /**
   * Fired immediately when this component's value is changed.
   */
  '@change'?: (newValue: TChipValue | TChipValue[] | null) => void;

  /**
   * Fired when this component's item is dismissed (hide).
   */
  '@item:close'?: (dismissedItem: TChipValue) => void;
}

export declare const BsChipGroup: {
  new (): {
    $props: AllowedChipGroupProps & TChipGroupOptionProps;
    $slots: {
      text?: (props: TChipOptionItem) => VNode;
      icon?: (props: TChipOptionItem) => VNode;
    };
    $emits: {
      (event: 'change', newValue: TChipValue | TChipValue[] | null): void;
      (event: 'item:close', dismissedItem: TChipValue): void;
      (event: 'update:model-value', value: TChipValue | TChipValue[] | null): void;
    };
  };
};

export declare const BsChipPlugin: ObjectPlugin;
