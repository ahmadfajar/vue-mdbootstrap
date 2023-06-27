import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin
} from 'vue';
import type { TPopupOptions, TRecord } from '../../../types';

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

export declare type TImageDataset = {
    imageSrc: string;
    thumbnail: string;
    title: string;
}

export declare type TTransitionMode = 'in-out' | 'out-in';

export declare type TLightboxButtonType = 'close' | 'delete' | 'download' | 'info' | 'menubar' | 'rotate' | 'zoom';

export declare type TLightboxToolbarItems = {
    [K in TLightboxButtonType]?: boolean;
}

export declare type TLightboxOptionProps = TPopupOptions & {
    /**
     * Additional css class name for active image.
     */
    imageClass?: string | string[];
    /**
     * Additional css styles for active image.
     */
    imageStyles?: TRecord;
    /**
     * This component's source dataset.
     */
    items?: TImageDataset[];
    /**
     * @deprecated
     * Use `overlayClickClose` property instead.
     */
    overlayClose?: boolean;
    /**
     * Show or hide indicator counter.
     */
    showCounter?: boolean;
    /**
     * Show or hide active item image title.
     */
    showItemTitle?: boolean;
    /**
     * Show or hide image thumbnails.
     */
    showThumbnail?: boolean;
    /**
     * Show or hide toolbar buttons.
     */
    showToolbar?: boolean;
    /**
     * Show or hide navigation controls.
     */
    showNavControl?: boolean;
    /**
     * Default image thumbnails height.
     */
    thumbnailHeight?: string | number;
    /**
     * Configure the toolbar buttons.
     */
    toolbar?: TLightboxToolbarItems;
    /**
     * Transition animation name when showing the active image.
     * Available transitions are: `fade`, `scale`, `slide-fade`, `slide-fade-reverse`,
     * `slide-bottom-top`, `slide-top-bottom`, `slide-left-right`, `slide-right-left`.
     */
    transition?: string;
    /**
     * Controls the timing sequence of leaving/entering transitions.
     * Available modes are: `out-in` and `in-out`.
     */
    transitionMode?: TTransitionMode;
}

export declare type TBsModal = ComponentObjectPropsOptions<TModalOptionProps>;

export declare type TBsLightbox = ComponentObjectPropsOptions<TLightboxOptionProps>;

export declare const BsModal: DefineComponent<TBsModal, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsLightbox: DefineComponent<TBsLightbox, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsModalPlugin: Plugin;
