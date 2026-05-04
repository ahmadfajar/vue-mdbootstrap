import type { TSideDrawer } from '@/components/Drawer/types';
import type { INotificationProvider } from '@/components/Notification/mixins/NotificationProvider.ts';
import type { TouchEventListener } from '@/directives';
import type { AllowedComponentProps, VNodeProps } from 'vue';
import type { RouteLocationAsRelativeGeneric, RouteLocationRaw } from 'vue-router';

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
  | 'a';

export declare type Numberish = number | string;

export declare type MaybeNumberish = number | string | null | undefined;

export declare type MaybeNumber = number | null | undefined;

export declare type MaybeString = string | null | undefined;

export declare type TRecord = Record<string, unknown>;

export declare type TBooleanRecord = Record<string, boolean | undefined>;

export declare type TClassList = string | string[] | TRecord;

export declare interface TDirectiveBinding {
  handler: VoidFunction | EventListener | EventListenerTarget;
  debounce?: number;
  target?: string | Element | Document | Window;
}

export declare type TRouterLinkProps = AllowedComponentProps &
  VNodeProps & {
    /**
     * Element ID
     */
    id?: string;

    /**
     * Absolute or relative URL.
     */
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
   * CSS class when element is active.
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

export declare type TVueMdbProps = {
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
  app: Record<string, TVueMdbProps>;
  notification: INotificationProvider;
};

export declare interface PromiseVoidFunction {
  (): Promise<void>;
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
