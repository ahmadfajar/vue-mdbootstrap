import type { Numberish, TRecord } from '@/types';
import type {
  ClosableEventProps,
  ClosableEventPublic,
  UpdateOpenEventProps,
  UpdateOpenEventPublic,
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
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';

export declare type TPopoverPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom';

export declare type TPopupOptions = {
  /**
   * This Popover state: show or hide.
   */
  open?: boolean;

  /**
   * Close the Popover when ESC key is pressed.
   */
  escClose?: boolean;

  /**
   * Show backdrop overlay or not.
   */
  overlay?: boolean;

  /**
   * Close the Popover when the backdrop overlay is clicked.
   */
  overlayClickClose?: boolean;

  /**
   * The backdrop overlay color.
   * Must be a valid CSS color formatted string.
   */
  overlayColor?: string;

  /**
   * The backdrop overlay opacity.
   */
  overlayOpacity?: Numberish;
};

export declare type TPopoverOptionProps = TPopupOptions & {
  /**
   * Display Popover at a position that covers the activator element.
   */
  cover?: boolean;

  /**
   * This Popover background color.
   *
   * @deprecated
   * Use unified global CSS variable instead.
   */
  color?: string;

  /**
   * Popover display placement.
   */
  placement?: TPopoverPosition;

  /**
   * Number of pixel to shift the Popover display position from the activator element.
   */
  space?: Numberish;

  /**
   * Transition animation when displaying the Popover. This animation is effected by `placement` property.
   */
  transition?: string;

  /**
   * HTML element or element ID which is used to activate and calculate this Popover display position.
   */
  trigger?: Element | string | null;
};

export declare type TBsPopover = ComponentObjectPropsOptions<TPopoverOptionProps>;

export declare type PopoverEventProps = ClosableEventProps & UpdateOpenEventProps;

export declare interface PopoverEventPublic extends ClosableEventPublic, UpdateOpenEventPublic {}

export declare type BsPopoverConstructor = DefineComponent<
  TBsPopover,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  PopoverEventProps,
  string,
  PublicProps,
  Readonly<TPopoverOptionProps> & Readonly<PopoverEventPublic>,
  ExtractDefaultPropTypes<TBsPopover>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsPopover: {
  new (): {
    $props: TPopoverOptionProps & PopoverEventPublic & PublicProps;
    $slots: VoidDefaultSlots;
    $emit: PopoverEventProps;
  };
};
