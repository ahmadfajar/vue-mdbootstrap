import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import { EventClosableProps, EventUpdateOpenProps, TPopoverPosition } from '../../../types';

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
     */
    color?: string;
    /**
     * Number of pixel to shift the Dropdown display position from the activator element.
     */
    space?: string | number;
    /**
     * This Dropdown menu display placement.
     */
    placement?: TPopoverPosition;
    /**
     * Transition animation when displaying this Dropdown menu. This animation is effected by `placement` property.
     */
    transition?: string;
}

export declare type TBsDropdownMenu = ComponentObjectPropsOptions<TDropdownMenuOptionProps>;

declare type AllowedDropdownMenuProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventClosableProps & EventUpdateOpenProps;

export declare const BsDropdownMenu: {
    new(): {
        $props: AllowedDropdownMenuProps & TDropdownMenuOptionProps;
        $slots: {
            content?: () => VNode[];
            default?: () => VNode[];
        };
        $emit: [
            /**
             * Fired when this Popover closed or hide.
             */
            'close',
            /**
             * Fired when this Popover state is updated.
             */
            'update:open',
        ];
    };
};

export declare const BsMenuPlugin: Plugin;
