import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps,
} from 'vue';
import { EventClosableProps, EventUpdateOpenProps, TPopupOptions, TRecord } from '../../../types';

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
};

export declare type TImageDataset = {
    imageSrc: string;
    thumbnail: string;
    title: string;
};

export declare type TTransitionMode = 'in-out' | 'out-in';

export declare type TLightboxButtonType =
    | 'close'
    | 'delete'
    | 'download'
    | 'info'
    | 'menubar'
    | 'rotate'
    | 'zoom';

export declare type TLightboxToolbarItems = {
    [K in TLightboxButtonType]?: boolean;
};

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
};

export declare type TBsModal = ComponentObjectPropsOptions<TModalOptionProps>;

export declare type TBsLightbox = ComponentObjectPropsOptions<TLightboxOptionProps>;

declare type AllowedModalProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventClosableProps &
    EventUpdateOpenProps;

export declare const BsModal: {
    new (): {
        $props: AllowedModalProps & TModalOptionProps;
        $slots: {
            default?: () => VNode[];
            header?: () => VNode;
            footer?: () => VNode;
        };
        $emit: ['close', 'update:open'];
    };
};

declare type AllowedLightboxProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventClosableProps &
    EventUpdateOpenProps & {
        onChange?: (value: TImageDataset, index: number) => void;
        'onExec-delete'?: (target: TImageDataset) => void;
        'onExec-download'?: (target: TImageDataset) => void;
        'onExec-info'?: (target: TImageDataset) => void;
        'onExec-rotate-left'?: (target: TImageDataset, rotate: number) => void;
        'onExec-rotate-right'?: (target: TImageDataset, rotate: number) => void;
        'onExec-zoomin'?: (target: TImageDataset, zoom: number) => void;
        'onExec-zoomout'?: (target: TImageDataset, zoom: number) => void;
        '@change'?: (value: TImageDataset, index: number) => void;
        '@exec-delete'?: (target: TImageDataset) => void;
        '@exec-download'?: (target: TImageDataset) => void;
        '@exec-info'?: (target: TImageDataset) => void;
        '@exec-rotate-left'?: (target: TImageDataset, rotate: number) => void;
        '@exec-rotate-right'?: (target: TImageDataset, rotate: number) => void;
        '@exec-zoomin'?: (target: TImageDataset, zoom: number) => void;
        '@exec-zoomout'?: (target: TImageDataset, zoom: number) => void;
    };

export declare const BsLightbox: {
    new (): {
        $props: AllowedLightboxProps & TLightboxOptionProps;
        $slots: {
            menubar?: () => VNode[];
        };
        $emit: [
            'change',
            'close',
            'exec-delete',
            'exec-download',
            'exec-info',
            'exec-rotate-left',
            'exec-rotate-right',
            'exec-zoomin',
            'exec-zoomout',
            'update:open',
        ];
        $exposed: {
            setActive: (index: number) => void;
            openAt: (index: number) => void;
            nextSlide: () => void;
            prevSlide: () => void;
        };
        setActive: (index: number) => void;
        openAt: (index: number) => void;
        nextSlide: () => void;
        prevSlide: () => void;
    };
};

export declare const BsModalPlugin: Plugin;
