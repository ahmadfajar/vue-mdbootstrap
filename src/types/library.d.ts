import { TSideDrawer } from '@/components/Drawer/types';
import { INotificationProvider } from '@/components/Notification/types';
import {
  AllowedComponentProps,
  App,
  Component,
  ComponentCustomProps,
  ComponentInternalInstance,
  ComponentPublicInstance,
  VNode,
  VNodeProps,
} from 'vue';
import { RouteLocationAsRelativeGeneric, RouteLocationRaw } from 'vue-router';

export declare type TBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xs';

export declare type TLabelPosition = 'left' | 'right';

export declare type Numberish = number | string;

export declare type MaybeNumberish = number | string | undefined | null;

export declare type TRecord = Record<string, unknown>;

export declare type TClassName = string | string[] | Record<string, any>;

export declare type RawProps = VNodeProps & TRecord;

export declare type BaseComponentProps = AllowedComponentProps & ComponentCustomProps & VNodeProps;

export declare type TValueText<T> = {
  value: T;
  text: string;
};

export declare type TDebounce = {
  timerId?: number;
  lastExec?: number;
};

export declare type TEmitFn = (event: string, ...args: unknown[]) => void;

export declare type TDirectiveBinding = {
  handler: VoidFunction | EventListener | EventListenerTarget;
  debounce?: number;
  target?: string | Element | Document | Window;
};

export declare type TRouterLinkProps = AllowedComponentProps &
  VNodeProps & {
    id?: string;

    href?: string;

    /**
     * Route Location the link should navigate to when clicked on.
     */
    to?: RouteLocationRaw;

    /**
     * Calls `router.replace` instead of `router.push`.
     */
    replace?: boolean;

    /**
     * Class to apply when the link is active
     */
    activeClass?: string;

    /**
     * Class to apply when the link is exact active
     */
    exactActiveClass?: string;

    onClick?: (evt: Event) => void;
  };

export declare type TRouterOptionProps = {
  /**
   * Css class when element is active.
   */
  activeClass?: string;

  /**
   * Create `to` property for the `<RouterLink>` component,
   * if [vue-router](https://router.vuejs.org/) exist.
   */
  location?: RouteLocationAsRelativeGeneric;

  /**
   * Shortcut to create `to` property for the `<RouterLink>` component with only the given **path**,
   * if [vue-router](https://router.vuejs.org/) exist.
   */
  path?: string;

  /**
   * Shortcut to create `to` property for the `<RouterLink>` component with only the given
   * **path-name**, if [vue-router](https://router.vuejs.org/) exist.
   */
  pathName?: string;

  /**
   * Absolute or relative url when [vue-router](https://router.vuejs.org/) doesn't exist.
   */
  url?: string;
};

declare type TAppBar = {
  height: number;
  stickyTop: boolean;
  fixedTop: boolean;
};

export declare type TMdbAppObject = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  height: number;
  width: number;
  appbar: TAppBar;
  sideDrawer: TSideDrawer;
};

export declare type TVueMdb = {
  app: Record<string, TMdbAppObject>;
  notification: INotificationProvider;
};

export declare interface ObjectBase {
  /**
   * Cleaning up resources and dispose each property before destroying this object.
   */
  destroy(): void;
}

export declare interface EventListenerBinding {
  handler: EventListenerOrEventListenerObject;
  options?: AddEventListenerOptions;
  target?: Element | Window | null;
}

export declare interface EventListenerTarget {
  (target: Element | Window | undefined | null, event: Event | undefined | null): void;
}

export declare interface IBindingElement extends Element {
  __clickOutsideListener?: EventListenerBinding;
  __scrollListener?: EventListenerBinding;
  __resizeListener?: EventListenerOrEventListenerObject | CallableFunction;
  __resizeListeners?: Array<CallableFunction>;
  __mouseEvents?: TRecord;
  __touchEvents?: TRecord;
  __observer?: ResizeObserver;
}

export declare interface IHTMLElement extends HTMLElement {
  attachEvent(type: string, callback: EventListenerOrEventListenerObject): void;

  detachEvent(type: string, callback: EventListenerOrEventListenerObject): void;
}

export declare interface IEventResult {
  remove(): void;
}

export declare interface EventClosableProps {
  onClose?: (msg: string) => void;
  '@close'?: (msg: string) => void;
}

export declare interface EventVoidClosableProps {
  onClose?: VoidFunction;
  '@close'?: VoidFunction;
}

export declare interface EventUpdateOpenProps {
  'onUpdate:open'?: (state: boolean) => void;
  '@update:open'?: (state: boolean) => void;
}

export declare interface EventUpdateModelValueProps<T> {
  'onUpdate:model-value'?: (value: T) => void;
  '@update:model-value'?: (value: T) => void;
}

export declare interface IVNode extends VNode {
  ctx: ComponentInternalInstance;
}

export declare interface IComponentInstance extends ComponentInternalInstance {
  ctx: ComponentPublicInstance;
}

/**
 * Create Vue application then registers all VueMDB components and directives.
 *
 * @param rootComponent Root of component instance
 */
export declare function createVueMdb(rootComponent: Component): App;

export {
  EventListener,
  useAddResizeListener,
  useRemoveResizeListener,
} from '../mixins/types/DomHelper';
export * from '../model/types';
export { AxiosPlugin, IHttpService } from '../utils/types/AxiosPlugin';
export * as Color from '../utils/types/colorUtils';
export { default as Helper } from '../utils/types/Helper';
export * as StringHelper from '../utils/types/StringHelper';

export {
  useAxiosPlugin,
  useBreakpointMax,
  useBreakpointMin,
  useCurrentRoute,
  useGenerateId,
  useHttpService,
  useMergeClass,
  useMobileDevice,
  useRenderSlot,
  useRenderSlotDefault,
  useRenderSlotWithWrapper,
  useRenderSlotWrapperWithCondition,
  useRenderTransition,
  useVueMdbNotification,
  useVueMdbService,
} from '../mixins/types/CommonApi';
