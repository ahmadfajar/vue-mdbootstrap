import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TRecord} from "../../../types";

export declare type TPopoverPosition =
    "top" | "top-left" | "top-right" |
    "bottom" | "bottom-left" | "bottom-right" |
    "left" | "left-top" | "left-bottom" |
    "right" | "right-top" | "right-bottom";

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
    overlayOpacity?: string | number;
}

export declare type TPopoverOptionProps = TPopupOptions & {
    /**
     * Display Popover at a position that covers the activator element.
     */
    cover?: boolean;
    /**
     * This Popover background color.
     */
    color?: string;
    /**
     * Popover display placement.
     */
    placement?: TPopoverPosition | string;
    /**
     * Number of pixel to shift the Popover display position from the activator element.
     */
    space?: string | number;
    /**
     * Transition animation when displaying the Popover. This animation is effected by `placement` property.
     */
    transition?: string;
    /**
     * HTML element to calculate this Popover display position.
     */
    trigger?: Element | string;
}

export declare type TBsPopover = ComponentObjectPropsOptions<TPopoverOptionProps>;

export declare const BsPopover: DefineComponent<TBsPopover, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
