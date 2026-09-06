import type { HtmlTagName, Numberish, TRecord } from '@/types';
import type {
  UpdateActiveEventProps,
  UpdateActiveEventPublic,
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
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';

export declare type TRippleOptionProps = {
  /**
   * Ripple animation state.
   */
  active?: boolean | Event;

  /**
   * Start animation from center or from mouse click position.
   * If true then animation always start from center, otherwise animation
   * will start from mouse click position.
   */
  centered?: boolean;

  /**
   * Enable or disable ripple animation.
   */
  disabled?: boolean;

  /**
   * HTML tag used to render this component, default is `div`.
   */
  tag?: HtmlTagName | string;
};

export declare type TOverlayOptionProps = {
  /**
   * Overlay base color. Must be a valid CSS color formatted string.
   */
  color?: string;

  /**
   * Sets the inline CSS `position` rule. If `true` then inline CSS `position`
   * rule is set to `fixed`.
   */
  fixed?: boolean;

  /**
   * Overlay state, show or hide.
   */
  show?: boolean;

  /**
   * Overlay opacity.
   */
  opacity?: Numberish;

  /**
   * Sets the inline CSS `z-index` rule.
   */
  zIndex?: Numberish;
};

export declare type TBsOverlay = ComponentObjectPropsOptions<TOverlayOptionProps>;

export declare type TBsRipple = ComponentObjectPropsOptions<TRippleOptionProps>;

export declare type BsExpandTransitionConstructor = DefineComponent<
  TRecord,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TRecord>,
  ExtractDefaultPropTypes<TRecord>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsExpandTransition: {
  new (): {
    $props: PublicProps;
    $slots: VoidDefaultSlots;
  };
};

export declare type OverlayEventProps = {
  /**
   * Fired when the Overlay component is clicked.
   */
  click?: (event: Event) => void;
};

export declare interface OverlayEventPublic {
  /**
   * Fired when the Overlay component is clicked.
   */
  onClick?: (event: Event) => void;

  /**
   * Fired when the Overlay component is clicked.
   */
  '@click'?: (event: Event) => void;
}

export declare type BsOverlayConstructor = DefineComponent<
  TBsOverlay,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  OverlayEventProps,
  string,
  PublicProps,
  Readonly<TOverlayOptionProps> & Readonly<OverlayEventPublic>,
  ExtractDefaultPropTypes<TBsOverlay>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsOverlay: {
  new (): {
    $props: TOverlayOptionProps & OverlayEventPublic & PublicProps;
    $slots: VoidDefaultSlots;
    $emit: OverlayEventProps;
  };
};

export declare type BsRippleConstructor = DefineComponent<
  TBsRipple,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateActiveEventProps,
  string,
  PublicProps,
  Readonly<TRippleOptionProps> & Readonly<UpdateActiveEventPublic>,
  ExtractDefaultPropTypes<TBsRipple>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsRipple: {
  new (): {
    $props: TRippleOptionProps & UpdateActiveEventPublic & PublicProps;
    $slots: VoidDefaultSlots;
    $emit: UpdateActiveEventProps;
  };
};
