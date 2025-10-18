import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  Numberish,
  TContextColor,
  TIconFlip,
  TIconRotation,
  TSizeOptionProps,
  TSizeProps,
} from '../../../types';

export declare type TIconVariant =
  | 'outlined'
  | 'rounded'
  | 'sharp'
  | 'filled'
  | 'outlined_filled'
  | 'rounded_filled'
  | 'sharp_filled';

export declare type TAllowedImageProps = {
  /**
   * Create this component with circle shape.
   */
  circle?: boolean;

  /**
   * Create this component with rounded shape.
   */
  rounded?: boolean;

  /**
   * The image location to place inside this component.
   */
  imgSrc?: string;

  /**
   * Shortcut to create this component with equal height and width.
   */
  size?: Numberish | TSizeProps;
};

export declare type TAllowedIconProps = {
  /**
   * A shortcut to insert component `BsIcon` inside this component.
   *
   * Use android icon name with or without suffix. Valid suffixes are:
   * `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
   * `_rounded_filled`, or `_sharp_filled`. Suffix `_filled` and `_outlined_filled`
   * will result the same icon style variant. Suffix will take priority over
   * `icon-variant` property.
   *
   * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
   */
  icon?: string;

  /**
   * Use predefined icon style variant, valid values are: `outlined`, `rounded`,
   * `sharp`, `filled`, `outlined_filled`, `rounded_filled`, and `sharp_filled`.
   * Default is `outlined`.
   *
   * Variant `filled` and `outlined_filled` will result the same icon style variant.
   *
   * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
   */
  iconVariant?: TIconVariant;

  /**
   * Apply **spin** animation to the icon.
   */
  iconSpin?: boolean;

  /**
   * Apply **pulse** animation to the icon.
   */
  iconPulse?: boolean;

  /**
   * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
   */
  iconFlip?: TIconFlip;

  /**
   * Rotate the icon, valid values are: `90`, `180`, `270`.
   */
  iconRotation?: TIconRotation;
};

export declare type TAvatarImageOptionProps = TSizeOptionProps & {
  /**
   * Create this component with circle shape.
   */
  circle?: boolean;

  /**
   * Create this component with rounded shape.
   */
  rounded?: boolean;

  /**
   * The image location to place inside this component.
   */
  imgSrc?: string;

  /**
   * Apply border width to this component.
   */
  border?: Numberish;

  /**
   * Apply border color to this component.
   */
  borderColor?: TContextColor | string;
};

export declare type TAvatarOptionProps = TAvatarImageOptionProps &
  TAllowedIconProps & {
    /**
     * Create avatar from a text. The text must be less than 4 characters.
     */
    text?: string;
  };

export declare type TBsAvatar = ComponentObjectPropsOptions<TAvatarOptionProps>;

export declare const BsAvatar: {
  new (): {
    $props: BaseComponentProps & TAvatarOptionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

export declare const BsAvatarPlugin: ObjectPlugin;
