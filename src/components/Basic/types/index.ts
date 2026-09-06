import type { TSizeOptionProps } from '@/components/Icon/types';
import type { Numberish, TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals';
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
} from 'vue';

export declare type TDividerOptionProps = {
  /**
   * Set to `TRUE` when divider is placed inside element that has dark background color.
   */
  dark?: boolean;

  /**
   * Indentation from left side.
   */
  leftIndent?: Numberish;

  /**
   * Indentation from right side.
   */
  rightIndent?: Numberish;

  /**
   * Divider thickness.
   */
  thickness?: Numberish;
};

export declare type TImageHolderOptionProps = TSizeOptionProps & {
  /**
   * Create this component with circle shape.
   */
  circle?: boolean;

  /**
   * Create this component with rounded shape.
   */
  rounded?: boolean;

  /**
   * This component's background color, must be in hex color format.
   */
  bgColor?: string;

  /**
   * This component's text color, must be in hex color format.
   */
  textColor?: string;

  /**
   * Short text as placeholder.
   */
  placeholderText?: string;

  /**
   * Text placeholder X position.
   */
  xPos?: Numberish;

  /**
   * Text placeholder Y position.
   */
  yPos?: Numberish;
};

export declare type TSpacerOptionProps = {
  /**
   * Sets this component to fill the available space or not.
   */
  fill?: boolean;

  /**
   * Sets this component width.
   */
  width?: Numberish;
};

export declare type TSubheaderOptionProps = {
  /**
   * Define explicitly when placed inside element that has dark background color.
   */
  dark?: boolean;
};

export declare type TBsDivider = ComponentObjectPropsOptions<TDividerOptionProps>;

export declare type TBsImageHolder = ComponentObjectPropsOptions<TImageHolderOptionProps>;

export declare type TBsSpacer = ComponentObjectPropsOptions<TSpacerOptionProps>;

export declare type TBsSubheader = ComponentObjectPropsOptions<TSubheaderOptionProps>;

export declare type BsDividerConstructor = DefineComponent<
  TBsDivider,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TDividerOptionProps>,
  ExtractDefaultPropTypes<TBsDivider>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsDivider: {
  new (): {
    $props: TDividerOptionProps & PublicProps;
  };
};

export declare type BsImageHolderConstructor = DefineComponent<
  TBsImageHolder,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TImageHolderOptionProps>,
  ExtractDefaultPropTypes<TBsImageHolder>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsImageHolder: {
  new (): {
    $props: TImageHolderOptionProps & PublicProps;
  };
};

export declare type BsSpacerConstructor = DefineComponent<
  TBsSpacer,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TSpacerOptionProps>,
  ExtractDefaultPropTypes<TBsSpacer>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsSpacer: {
  new (): {
    $props: TSpacerOptionProps & PublicProps;
  };
};

export declare type BsSubheaderConstructor = DefineComponent<
  TBsSubheader,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TSubheaderOptionProps>,
  ExtractDefaultPropTypes<TBsSubheader>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsSubheader: {
  new (): {
    $props: TSubheaderOptionProps & PublicProps;
    $slots: VoidDefaultSlots;
  };
};
