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
import { TSideDrawer } from '../components/Drawer/types';
import { INotificationProvider } from '../components/Notification/types';
import { TouchEventListener } from '../directives/types';

export declare type TBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xs';

export declare type TContextColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default';

export declare type TExtendedContextColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'default';

export declare type HtmlTagName =
  | 'div'
  | 'nav'
  | 'main'
  | 'header'
  | 'aside'
  | 'article'
  | 'section'
  | 'span'
  | 'h5'
  | 'h4'
  | 'h3'
  | 'h2'
  | 'h1'
  | 'p'
  | 'a'
  | string;

export declare type Numberish = number | string;

export declare type MaybeNumberish = number | string | undefined | null;

export declare type TRecord = Record<string, unknown>;

export declare type TBooleanRecord = Record<string, boolean | undefined>;

export declare type TClassList = string | string[] | TRecord;

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

export declare interface TDirectiveBinding {
  handler: VoidFunction | EventListener | EventListenerTarget;
  debounce?: number;
  target?: string | Element | Document | Window;
}

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

export declare interface PromiseVoidFunction {
  (): Promise<void>;
}

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

export declare interface IEventListenerResult {
  remove(): void;
}

export declare interface EventListenerTarget {
  (target: Element | Window | undefined | null, event: Event | undefined | null): void;
}

export declare interface IMouseEvents {
  mouseEnter: IEventListenerResult;
  mouseLeave: IEventListenerResult;
  focus: IEventListenerResult;
  blur: IEventListenerResult;
}

export declare interface IBindingElement extends Element {
  __clickOutsideListener?: EventListenerBinding;
  __scrollListener?: EventListenerBinding;
  __resizeListener?: EventListenerOrEventListenerObject | CallableFunction;
  __resizeListeners?: Array<CallableFunction>;
  __mouseEvents?: IMouseEvents;
  __touchEvents?: TouchEventListener | TRecord;
  __observer?: ResizeObserver;
}

export declare interface IHTMLElement extends HTMLElement {
  attachEvent(type: string, callback: EventListenerOrEventListenerObject): void;

  detachEvent(type: string, callback: EventListenerOrEventListenerObject): void;
}

export declare interface EventClosableProps {
  /**
   * Fired when this component is closed or dismissed (hide).
   */
  onClose?: (msg: string) => void;

  /**
   * Fired when this component is closed or dismissed (hide).
   */
  '@close'?: (msg: string) => void;
}

export declare interface EventVoidClosableProps {
  /**
   * Fired when this component is closed or dismissed (hide).
   */
  onClose?: VoidFunction;

  /**
   * Fired when this component is closed or dismissed (hide).
   */
  '@close'?: VoidFunction;
}

export declare interface EventUpdateOpenProps {
  /**
   * Fired when the component's state is updated.
   */
  'onUpdate:open'?: (state: boolean) => void;

  /**
   * Fired when the component's state is updated.
   */
  '@update:open'?: (state: boolean) => void;
}

export declare interface EventUpdateModelValueProps<T> {
  /**
   * Fired when this component's `modelValue` is updated.
   */
  'onUpdate:model-value'?: (value: T) => void;

  /**
   * Fired when this component's `modelValue` is updated.
   */
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
export * from '../utils/types/AxiosPlugin';
export * from '../utils/types/CacheManager';
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
  useRenderTransition,
  useVueMdbNotification,
  useVueMdbService,
  useWrapSlot,
  useWrapSlotDefault,
  useWrapSlotWithCondition,
} from '../mixins/types/CommonApi';
