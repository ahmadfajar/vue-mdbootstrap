import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import { BaseComponentProps, HtmlTagName } from '../../../types';

export declare type TAppbarOptionProps = {
  /**
   * Cut off the left side of the component.
   */
  clippedLeft?: boolean;

  /**
   * Cut off the right side of the component.
   */
  clippedRight?: boolean;

  /**
   * Placed `Appbar` fixed at the top of the page.
   * See [Bootstrap Position](https://getbootstrap.com/docs/5.3/helpers/position/) documentation.
   */
  fixedTop?: boolean;

  /**
   * Always stick `Appbar` at top of the page.
   * See [Bootstrap Position](https://getbootstrap.com/docs/5.3/helpers/position/) documentation.
   */
  stickyTop?: boolean;

  /**
   * Add shadow effect to this component.
   */
  shadow?: boolean;

  /**
   * Html tag used to render this component.
   */
  tag?: HtmlTagName;
};

export declare type TAppbarTitleOptionProps = {
  /**
   * The text to display.
   */
  title?: string;
};

export declare type TBsAppbar = ComponentObjectPropsOptions<TAppbarOptionProps>;

export declare type TBsAppbarTitle = ComponentObjectPropsOptions<TAppbarTitleOptionProps>;

declare interface AllowedAppbarProps extends BaseComponentProps {
  /**
   * Fired when this component size is changed.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when this component size is changed.
   */
  '@resize'?: (target: HTMLElement) => void;
}

export declare const BsAppbar: {
  new (): {
    $props: AllowedAppbarProps & TAppbarOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'resize', target: HTMLElement): void;
    };
  };
};

export declare const BsAppbarItems: {
  new (): {
    $props: BaseComponentProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

export declare const BsAppbarTitle: {
  new (): {
    $props: BaseComponentProps & TAppbarTitleOptionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

export declare const BsAppbarPlugin: ObjectPlugin;
