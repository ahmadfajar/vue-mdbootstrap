import { ComponentObjectPropsOptions, ComponentPublicInstance, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventClosableProps,
  EventUpdateOpenProps,
  Numberish,
  TPopupOptions,
  TRecord,
} from '../../../types';

export declare type TModalOptionProps = TPopupOptions & {
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
  width?: Numberish;

  /**
   * Modal dialog maximum width.
   */
  maxWidth?: Numberish;

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

export declare type TLightboxOptionProps = {
  /**
   * This Lightbox state: show or hide.
   */
  open?: boolean;

  /**
   * Close the Lightbox when ESC key is pressed.
   */
  escClose?: boolean;

  /**
   * Show backdrop overlay or not.
   */
  overlay?: boolean;

  /**
   * Close the Lightbox when the backdrop overlay is clicked.
   */
  overlayClickClose?: boolean;

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
  thumbnailHeight?: Numberish;

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

  /**
   * Insert inline css style `z-index` to control the component positioning on the html layers.
   */
  zIndex?: Numberish;
};

export declare type TBsModal = ComponentObjectPropsOptions<TModalOptionProps>;

export declare type TBsLightbox = ComponentObjectPropsOptions<TLightboxOptionProps>;

declare interface ModalEvents extends EventClosableProps, EventUpdateOpenProps {}

export declare const BsModal: {
  new (): {
    $props: BaseComponentProps & ModalEvents & TModalOptionProps;
    $slots: {
      default?: () => VNode[];
      header?: () => VNode;
      footer?: () => VNode;
    };
    $emits: {
      (event: 'close', message: string): void;
      (event: 'update:open', state: boolean): void;
    };
  };
};

declare interface LightboxEvents extends EventClosableProps, EventUpdateOpenProps {
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
}

export declare const BsLightbox: {
  new (): {
    $props: BaseComponentProps & LightboxEvents & TLightboxOptionProps;
    $slots: {
      menubar?: () => VNode[];
    };
    $emits: {
      (event: 'update:open', state: boolean): void;
      (event: 'close', message: string): void;
      (event: 'change', value: TImageDataset, index: number): void;
      (event: 'exec-delete', target: TImageDataset): void;
      (event: 'exec-download', target: TImageDataset): void;
      (event: 'exec-info', target: TImageDataset): void;
      (event: 'exec-rotate-left', target: TImageDataset, rotate: number): void;
      (event: 'exec-rotate-right', target: TImageDataset, rotate: number): void;
      (event: 'exec-zoomin', target: TImageDataset, zoom: number): void;
      (event: 'exec-zoomout', target: TImageDataset, zoom: number): void;
    };
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

export declare interface BsLightboxInstance extends ComponentPublicInstance {
  openAt(index: number): void;
  setActive(index: number): void;
  nextSlide(): void;
  prevSlide(): void;
}

export declare const BsModalPlugin: ObjectPlugin;
