import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import { BaseComponentProps, EventUpdateOpenProps, HtmlTagName, Numberish } from '../../../types';

export declare type TSideDrawerPosition = 'left' | 'right';

declare type TSideDrawerProps = {
  miniWidth: number;
  width: number;
  mini: boolean;
  open: boolean;
};

declare type TSideDrawer = {
  [K in TSideDrawerPosition]: TSideDrawerProps;
};

export declare type TSideDrawerOptionProps = {
  /**
   * Sets the component color.
   *
   * @deprecated
   * Use global css variables instead.
   */
  color?: string;

  /**
   * Cut off the top edge of the component.
   */
  clipped?: boolean;

  /**
   * Sets the component position fixed on the left or right side even when scrolling the page.
   */
  fixedLayout?: boolean;

  /**
   * The component minimize state.
   */
  mini?: boolean;

  /**
   * The component width in pixel when on minimize state.
   */
  miniWidth?: Numberish;

  /**
   * The component width in pixel when display as modal on small screen.
   */
  modalWidth?: Numberish;

  /**
   * The component state, show or hide. Monitored by `v-model`.
   */
  open?: boolean;

  /**
   * The backdrop overlay color when the component is displayed as modal.
   * The value must be in hexadecimal color format.
   */
  overlayColor?: string;

  /**
   * The component position location. Valid values are: `left`, `right`.
   */
  position?: TSideDrawerPosition;

  /**
   * Add shadow effect to the component.
   */
  shadow?: boolean;

  /**
   * Html tag used to render the component.
   */
  tag?: HtmlTagName;

  /**
   * The component width in pixel.
   */
  width?: Numberish;
};

export declare type TBsSideDrawer = ComponentObjectPropsOptions<TSideDrawerOptionProps>;

declare interface AllowedSideDrawerProps extends BaseComponentProps, EventUpdateOpenProps {
  /**
   * Fired when this component size is changed.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when this component size is changed.
   */
  '@resize'?: (target: HTMLElement) => void;
}

export declare const BsSideDrawer: {
  new (): {
    $props: AllowedSideDrawerProps & TSideDrawerOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'resize', target: HTMLElement): void;
      (event: 'update:open', state: boolean): void;
    };
  };
};

export declare const BsDrawerPlugin: ObjectPlugin;
