import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TPopupOptions, TRecord} from "../../../types";

export declare type TModalOptionProps = TPopupOptions & {
    /**
     * @deprecated
     * Use `overlayClickClose` property instead.
     */
    overlayClose?: boolean;
    /**
     * Show modal dialog in full page mode.
     */
    fullPage?: boolean;
    /**
     * Enable scrollable body.
     */
    scrollable?: boolean;
    /**
     * Modal dialog title.
     */
    title?: string;
    /**
     * Modal dialog width.
     */
    width?: string | number;
    /**
     * Modal dialog maximum width.
     */
    maxWidth?: string | number;
    /**
     * Additional css class name for dialog body container.
     */
    bodyClass?: string | string[];
    /**
     * Additional css class name for dialog footer container.
     */
    footerClass?: string | string[];
    /**
     * Additional css class name for dialog header container.
     */
    headerClass?: string | string[];
    /**
     * Transition animation when showing the dialog.
     * Valid values are: 'slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'fade', 'scale'.
     */
    transition?: string;
}

export declare type TBsModal = ComponentObjectPropsOptions<TModalOptionProps>;

export declare const BsModal: DefineComponent<TBsModal, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
