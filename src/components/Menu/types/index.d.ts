import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TPopoverPosition, TRecord} from "../../../types";

export declare type TMenuOptionProps = {
    /**
     * Display this Popup menu at a position which can cover the activator.
     */
    cover?: boolean;
    /**
     * Disable this Popup menu and prevents it from displaying.
     */
    disabled?: boolean;
    /**
     * This Popup menu state: show or hide.
     */
    open?: boolean;
    /**
     * Triggers this popup menu to display when `mouseenter` and hide when `mouseleave`.
     */
    openOnHover?: boolean;
    /**
     * Close or hide this Popup menu when content is clicked.
     */
    contentClickClose?: boolean;
    /**
     * This Popup menu container background color.
     */
    color?: string;
    /**
     * This Popup menu display placement.
     */
    placement?: TPopoverPosition | string;
    /**
     * Transition animation when displaying this popup menu. This animation is effected by `placement` property.
     */
    transition?: string;
}

export declare type TBsMenu = ComponentObjectPropsOptions<TMenuOptionProps>;

export declare const BsMenu: DefineComponent<TBsMenu, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
