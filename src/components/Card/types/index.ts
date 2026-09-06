import type { HtmlTagName, TRecord } from '@/types';
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
  VNode,
} from 'vue';

export declare type TCardContentType = 'title' | 'subtitle' | 'text';

export declare type TTagProp = {
  /**
   * Html tag used to render this component.
   */
  tag?: HtmlTagName | string;
};

export declare type TCardOptionProps = TTagProp & {
  /**
   * Set to `true` to remove the side border of the Card component.
   */
  borderOff?: boolean;

  /**
   * Set to `true` to remove the rounded border on the side of the Card component.
   */
  roundedOff?: boolean;

  /**
   * Apply shadow effect to the component.
   */
  shadow?: boolean;

  /**
   * The image URL for image placed at the top of the card.
   */
  imgTopSrc?: string;

  /**
   * Text for the image `alt` attribute.
   */
  imgTopAlt?: string;

  /**
   * The image URL for image placed at the bottom of the card.
   */
  imgBottomSrc?: string;

  /**
   * Text for the image `alt` attribute.
   */
  imgBottomAlt?: string;
};

export declare type TCardContentOptionProps = TTagProp & {
  /**
   * Card content variations, valid values are: `title`, `subtitle`, `text`.
   */
  type?: TCardContentType;
};

export declare type TCardMediaOptionProps = {
  /**
   * Text for media title.
   */
  title: string;

  /**
   * Text for media subtitle.
   */
  subtitle?: string;

  /**
   * Placed text overlay at the top side.
   */
  overlayTop?: boolean;
};

export declare type TBsCard = ComponentObjectPropsOptions<TCardOptionProps>;

export declare type TBsCardBody = ComponentObjectPropsOptions<TTagProp>;

export declare type TBsCardContent = ComponentObjectPropsOptions<TCardContentOptionProps>;

export declare type TBsCardFooter = ComponentObjectPropsOptions<TTagProp>;

export declare type TBsCardHeader = ComponentObjectPropsOptions<TTagProp>;

export declare type TBsCardMedia = ComponentObjectPropsOptions<TCardMediaOptionProps>;

export declare type BsCardConstructor = DefineComponent<
  TBsCard,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TCardOptionProps>,
  ExtractDefaultPropTypes<TBsCard>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCard: {
  new (): {
    $props: TCardOptionProps & PublicProps;
    $slots: VoidDefaultSlots;
  };
};

export declare type BsCardBodyConstructor = DefineComponent<
  TBsCardBody,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TTagProp>,
  ExtractDefaultPropTypes<TBsCardBody>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCardBody: {
  new (): {
    $props: TTagProp & PublicProps;
    $slots: VoidDefaultSlots;
  };
};

export declare type BsCardContentConstructor = DefineComponent<
  TBsCardContent,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TCardContentOptionProps>,
  ExtractDefaultPropTypes<TBsCardContent>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCardContent: {
  new (): {
    $props: TCardContentOptionProps & PublicProps;
    $slots: VoidDefaultSlots;
  };
};

export declare type BsCardFooterConstructor = DefineComponent<
  TBsCardFooter,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TTagProp>,
  ExtractDefaultPropTypes<TBsCardFooter>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCardFooter: {
  new (): {
    $props: TTagProp & PublicProps;
    $slots: VoidDefaultSlots;
  };
};

export declare type BsCardHeaderConstructor = DefineComponent<
  TBsCardHeader,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TTagProp>,
  ExtractDefaultPropTypes<TBsCardHeader>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCardHeader: {
  new (): {
    $props: TTagProp & PublicProps;
    $slots: VoidDefaultSlots;
  };
};

export declare interface CardMediaSlots extends VoidDefaultSlots {
  /**
   * The default slot used to place the CardMedia's title.
   */
  title?: () => VNode[] | VNode;

  /**
   * Additional slot used to place the CardMedia's subtitle.
   */
  subtitle?: () => VNode[] | VNode;
}

export declare type BsCardMediaConstructor = DefineComponent<
  TBsCardMedia,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TCardMediaOptionProps>,
  ExtractDefaultPropTypes<TBsCardMedia>,
  SlotsType<CardMediaSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsCardMedia: {
  new (): {
    $props: TCardMediaOptionProps & PublicProps;
    $slots: CardMediaSlots;
  };
};
