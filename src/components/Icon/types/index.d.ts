import { BaseComponentProps, EventUpdateModelValueProps, Numberish, TRecord } from '@/types';
import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';

export declare type TFontAwesomeVariant =
  | 'regular'
  | 'solid'
  | 'light'
  | 'duotone'
  | 'brands'
  | string;

export declare type TIconFlip = 'horizontal' | 'vertical' | 'both';

export declare type TIconRotation = '90' | '180' | '270';

export declare type TIconData = {
  name: string;
  icon: string;
  theme: string;
  variant?: string;
  data?: string;
};

export declare type TSizeProps = {
  /**
   * This component's height.
   */
  height?: Numberish;

  /**
   * This component's width.
   */
  width?: Numberish;
};

export declare type TSizeOptionProps = TSizeProps & {
  /**
   * Shortcut to create this component with equal height and width.
   */
  size?: Numberish | TSizeProps;
};

export declare type TIconBaseProps = {
  /**
   * Android icon name with or without suffix. Valid suffixes are: `_outlined` ,
   * `_rounded`, `_sharp`, `_filled`, `_outlined_filled`, `_rounded_filled`,
   * or `_sharp_filled`. If no suffix is given, then default (`outlined`) icon
   * variant will be used.
   *
   * Suffix `_filled` and `_outlined_filled` will result the same icon style variant.
   * And you can either use `*_filled` or sets property `filled` to `true` to
   * create an icon with fill style.
   *
   * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
   */
  icon: string;

  /**
   * Use [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) with fill style.
   */
  filled?: boolean;

  /**
   * Apply **pulse** animation to the icon.
   */
  pulse?: boolean;

  /**
   * Apply **spin** animation to the icon.
   */
  spin?: boolean;

  /**
   * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
   */
  flip?: TIconFlip;

  /**
   * Rotate the icon, valid values are: `90`, `180`, `270`.
   */
  rotate?: TIconRotation;
};

export declare type TIconOptionProps = TSizeOptionProps &
  TIconBaseProps & {
    /**
     * Apply additional css class to the SVG.
     */
    svgClass?: string | string[] | TRecord;
  };

export declare type TSvgIconOptionProps = TSizeOptionProps & TIconBaseProps;

export declare type TFontawesomeIconOptionProps = TSizeOptionProps & {
  /**
   * Any valid font awesome icon name.
   *
   * @see [Font Awesome](https://fontawesome.com/v6/search?o=r&m=free) for details.
   */
  icon: string;

  /**
   * Font Awesome style variant, valid values are: `regular`, `solid`, `light`, `duotone`, `brands`.
   * Default is `solid`.
   */
  variant?: TFontAwesomeVariant;

  /**
   * Font Awesome vendor version. Default is `7.0.1`.
   */
  version?: string;

  /**
   * Apply **pulse** animation to the icon.
   */
  pulse?: boolean;

  /**
   * Apply **spin** animation to the icon.
   */
  spin?: boolean;

  /**
   * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
   */
  flip?: TIconFlip;

  /**
   * Rotate the icon, valid values are: `90`, `180`, `270`.
   */
  rotate?: TIconRotation;

  /**
   * Apply additional css class to the SVG.
   */
  svgClass?: string | string[] | TRecord;
};

export declare type TSpinnerIconOptionProps = {
  /**
   * The Icon color.
   */
  color?: string;

  /**
   * The icon’s size in pixel.
   */
  size?: Numberish;

  /**
   * Apply **pulse** animation to the icon.
   */
  pulse?: boolean;

  /**
   * Apply **spin** animation to the icon.
   */
  spin?: boolean;
};

export declare type TToggleIconOptionProps = {
  /**
   * The icon to display when `modelValue` property is `false` or `undefined`.
   *
   * Use android icon name with or without suffix. Valid suffixes are: `_outlined`,
   * `_rounded`, `_sharp`, `_filled`, `_outlined_filled`, `_rounded_filled`, or
   * `_sharp_filled`. If no suffix is given, then default (`outlined`) icon
   * variant will be used.
   *
   * Suffix `_filled` or `_outlined_filled` will result the same icon style variant.
   * And you can either use `*_filled` or sets the `filled` property to `true` to
   * create an icon with fill style.
   *
   * @see  [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
   */
  icon: string;

  /**
   * The icon to display when `modelValue` property is `true`.
   *
   * Use android icon name with or without suffix. Valid suffixes are: `_outlined`,
   * `_rounded`, `_sharp`, `_filled`, `_outlined_filled`, `_rounded_filled`, or
   * `_sharp_filled`. If no suffix is given, then default (`outlined`) icon
   * variant will be used.
   *
   * Suffix `_filled` or `_outlined_filled` will result the same icon style variant.
   * And you can either use `*_filled` or sets the `filled` property to `true` to
   * create an icon with fill style.
   *
   * @see  [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
   */
  toggleIcon: string;

  /**
   * Use [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) with fill style.
   */
  filled?: boolean;

  /**
   * Value monitored by `v-model` to maintain this component state.
   */
  modelValue?: boolean;

  /**
   * The icon size in pixels.
   */
  size?: Numberish;
};

export declare type TBsIcon = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsSvgIcon = ComponentObjectPropsOptions<TSvgIconOptionProps>;

export declare type TBsSpinnerIcon = ComponentObjectPropsOptions<TSpinnerIconOptionProps>;

export declare type TBsFontawesomeIcon = ComponentObjectPropsOptions<TFontawesomeIconOptionProps>;

export declare type TBsToggleIcon = ComponentObjectPropsOptions<TToggleIconOptionProps>;

export declare const BsIcon: {
  new (): {
    $props: BaseComponentProps & TIconOptionProps;
  };
};

export declare const BsFontawesomeIcon: {
  new (): {
    $props: BaseComponentProps & TFontawesomeIconOptionProps;
  };
};

export declare const BsSvgIcon: {
  new (): {
    $props: BaseComponentProps & TSvgIconOptionProps;
  };
};

export declare const BsSpinnerIcon: {
  new (): {
    $props: BaseComponentProps & TSpinnerIconOptionProps;
  };
};

export declare const BsToggleIcon: {
  new (): {
    $props: BaseComponentProps & EventUpdateModelValueProps<boolean> & TToggleIconOptionProps;
    $emits: {
      /**
       * Fired when this component's toggle state is updated.
       */
      (event: 'update:model-value', value: boolean): void;
    };
  };
};

/**
 * Function to draw inline SVG xml directly.
 *
 * @param data   The SVG xml string
 * @param width  The desired {@link Element} width
 * @param height The desired {@link Element} height
 * @param clazz  Optional css class name
 */
export declare function useRenderSVG(
  data: string,
  width: Numberish,
  height: Numberish,
  clazz: unknown
): VNode;

export declare const BsIconPlugin: ObjectPlugin;
