import {
  BaseComponentProps,
  EventUpdateOpenProps,
  EventVoidClosableProps,
  Numberish,
  TPopoverPosition,
} from '@/types';
import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';

export declare type TDropdownMenuOptionProps = {
  /**
   * Display this Dropdown menu at a position which can cover the activator element.
   */
  cover?: boolean;

  /**
   * Disable this Dropdown menu and prevents it from displaying.
   */
  disabled?: boolean;

  /**
   * This Popup menu state: show or hide.
   */
  open?: boolean;

  /**
   * Triggers this Dropdown menu to display when `mouseenter` and hide when `mouseleave`.
   */
  openOnHover?: boolean;

  /**
   * Close or hide this Dropdown menu when content is clicked.
   */
  contentClickClose?: boolean;

  /**
   * This Dropdown menu container background color.
   *
   * @deprecated
   * Use unified global css variable instead.
   */
  color?: string;

  /**
   * Number of pixel to shift the Dropdown display position from the activator element.
   */
  space?: Numberish;

  /**
   * This Dropdown menu display placement.
   */
  placement?: TPopoverPosition;

  /**
   * Transition animation when displaying this Dropdown menu. This animation is
   * effected by `placement` property.
   */
  transition?: string;
};

export declare type TBsDropdownMenu = ComponentObjectPropsOptions<TDropdownMenuOptionProps>;

declare interface AllowedDropdownMenuProps
  extends BaseComponentProps,
    EventVoidClosableProps,
    EventUpdateOpenProps {}

export declare const BsDropdownMenu: {
  new (): {
    $props: AllowedDropdownMenuProps & TDropdownMenuOptionProps;
    $slots: {
      content?: () => VNode[];
      default?: () => VNode[];
    };
    $emits: {
      (event: 'close'): void;
      (event: 'update:open', state: boolean): void;
    };
  };
};

export declare const BsMenuPlugin: ObjectPlugin;
