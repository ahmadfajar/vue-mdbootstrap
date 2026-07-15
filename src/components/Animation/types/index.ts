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

// export declare const BsExpandTransition: {
//   new (): {
//     $props: PublicComponentProps & TransitionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// declare interface AllowedOverlayProps extends PublicComponentProps {
//   onClick?: (e: Event) => void;
//   '@click'?: (e: Event) => void;
// }
//
// export declare const BsOverlay: {
//   new (): {
//     $props: AllowedOverlayProps & TOverlayOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'click', value: Event): void;
//     };
//   };
// };

// declare interface AllowedRippleProps extends PublicComponentProps {
//   'onUpdate:active'?: (value: boolean) => void;
//   '@update:active'?: (value: boolean) => void;
// }
//
// export declare const BsRipple: {
//   new (): {
//     $props: AllowedRippleProps & TRippleOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'update:active', value: boolean): void;
//     };
//   };
// };

export declare type BsExpandTransition = DefineComponent<
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

export declare type BsOverlay = DefineComponent<
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
  false,
  TRecord,
  never
>;

export declare type BsRipple = DefineComponent<
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
  false,
  TRecord,
  never
>;
