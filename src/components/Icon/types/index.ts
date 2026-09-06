import type { Numberish, TClassList, TContextColor, TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals';
import type {
  Component,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';

export declare type TFontAwesomeVariant = 'regular' | 'solid' | 'brands' | string;

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
     * Apply additional CSS class to the SVG.
     */
    svgClass?: TClassList;
  };

export declare type TSvgIconOptionProps = TSizeOptionProps & TIconBaseProps;

export declare type TFontawesomeIconOptionProps = TSizeOptionProps & {
  /**
   * Any valid font awesome icon name.
   *
   * @see [Font Awesome](https://fontawesome.com/search?ic=free-collection) for details.
   */
  icon: string;

  /**
   * Font Awesome style variant, valid values are: `regular`, `solid`, `brands`.
   * Default is `solid`.
   */
  variant?: TFontAwesomeVariant;

  /**
   * Font Awesome vendor version. Default is `7.2.0`.
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
   * Apply additional CSS class to the SVG.
   */
  svgClass?: TClassList;
};

export declare type TSpinnerIconOptionProps = {
  /**
   * Sets the Icon color.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `default`.
   */
  color?: TContextColor | string;

  /**
   * Sets the icon’s size in pixel.
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

export declare type BsFontawesomeIconConstructor = DefineComponent<
  TBsFontawesomeIcon,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TFontawesomeIconOptionProps>,
  ExtractDefaultPropTypes<TBsFontawesomeIcon>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsFontawesomeIcon: {
  new (): {
    $props: TFontawesomeIconOptionProps & PublicProps;
  };
};

export declare type BsIconConstructor = DefineComponent<
  TBsIcon,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TIconOptionProps>,
  ExtractDefaultPropTypes<TBsIcon>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsIcon: {
  new (): {
    $props: TIconOptionProps & PublicProps;
  };
};

export declare type BsSpinnerIconConstructor = DefineComponent<
  TBsSpinnerIcon,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TSpinnerIconOptionProps>,
  ExtractDefaultPropTypes<TBsSpinnerIcon>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  never
>;

export declare const BsSpinnerIcon: {
  new (): {
    $props: TSpinnerIconOptionProps & PublicProps;
  };
};

export declare type BsSvgIconConstructor = DefineComponent<
  TBsSvgIcon,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TSvgIconOptionProps>,
  ExtractDefaultPropTypes<TBsSvgIcon>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsSvgIcon: {
  new (): {
    $props: TSvgIconOptionProps & PublicProps;
  };
};

export declare type BsToggleIconConstructor = DefineComponent<
  TBsToggleIcon,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateModelValueEventProps<boolean>,
  string,
  PublicProps,
  Readonly<TToggleIconOptionProps> & Readonly<UpdateModelValueEventPublic<boolean>>,
  ExtractDefaultPropTypes<TBsToggleIcon>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsToggleIcon: {
  new (): {
    $props: TToggleIconOptionProps & UpdateModelValueEventPublic<boolean> & PublicProps;
    $emit: UpdateModelValueEventProps<boolean>;
  };
};
