import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import { BaseComponentProps, HtmlTagName } from '../../../types';

export declare type TAppContainerOptionProps = {
  /**
   * Sets the element `ID` attribute. This property value is auto generate.
   */
  id?: string;

  /**
   * Use document viewport height or not.
   */
  viewportHeight?: boolean;
};

export declare type TContainerOptionProps = {
  /**
   * Mount this component as part of application container or just ordinary container.
   * If mount as part of application container, then it will adapt to `SideDrawer` and `Appbar` size.
   */
  app?: boolean;

  /**
   * Html tag used to render this component.
   */
  tag?: HtmlTagName;
};

export declare type TBsAppContainer = ComponentObjectPropsOptions<TAppContainerOptionProps>;

export declare type TBsContainer = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type TBsContent = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare interface AllowedContainerProps extends BaseComponentProps {
  /**
   * Fired when this component size is changed.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when this component size is changed.
   */
  '@resize'?: (target: HTMLElement) => void;
}

export declare interface _BsApp {
  new (): {
    $props: BaseComponentProps & TAppContainerOptionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
}

export declare const BsApp: _BsApp;

/**
 * @deprecated use `<BsApp>` instead.
 */
export declare const BsAppContainer: _BsApp;

export declare const BsContainer: {
  new (): {
    $props: AllowedContainerProps & TContainerOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'resize', target: HTMLElement): void;
    };
  };
};

export declare const BsContent: {
  new (): {
    $props: BaseComponentProps & TContainerOptionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

export declare const BsContainerPlugin: ObjectPlugin;
