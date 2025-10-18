import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventClosableProps,
  EventUpdateOpenProps,
  Numberish,
} from '../../../types';

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
   * Use unified global css variable instead.
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
  trigger?: Element | string;
};

export declare type TBsPopover = ComponentObjectPropsOptions<TPopoverOptionProps>;

declare interface AllowedPopoverProps
  extends BaseComponentProps,
    EventClosableProps,
    EventUpdateOpenProps {}

export declare const BsPopover: {
  new (): {
    $props: AllowedPopoverProps & TPopoverOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'close', message: string): void;
      (event: 'update:open', state: boolean): void;
    };
  };
};

export declare const BsPopoverPlugin: ObjectPlugin;

export { PopupManager } from './PopupManager';
