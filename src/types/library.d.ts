import ResizeObserver from 'resize-observer-polyfill';
import {
    AllowedComponentProps,
    App,
    Component,
    ComponentInternalInstance,
    ComponentPublicInstance,
    VNode,
    VNodeProps,
} from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { INotificationProvider } from '../components/Notification/types';

export declare type TBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xs';

export declare type TLabelPosition = 'left' | 'right';

export declare type TEmitFn = (event: string, ...args: unknown[]) => void;

export declare type TRecord = Record<string, unknown>;

export declare type TValueText<T> = {
    value: T;
    text: string;
};

export declare type TDebounce = {
    timerId?: number;
    lastExec?: number;
};

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
    activeClass?: string;
    path?: string;
    url?: string;
};

export declare type TEventListenerBinding = {
    handler: EventListenerOrEventListenerObject;
    options?: AddEventListenerOptions;
    target?: Element | Window | null;
};

declare type TRect = {
    width: number;
    height?: number;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};

declare type TAppBar = {
    height: number;
    stickyTop: boolean;
    fixedTop: boolean;
};

declare type TSideDrawer = {
    [K in TLabelPosition]: TRect;
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

export declare interface EventListenerTarget {
    (target: Element | Window | undefined | null, event: Event | undefined | null): void;
}

export declare interface IBindingElement extends Element {
    __clickOutsideListener?: TEventListenerBinding;
    __scrollListener?: TEventListenerBinding;
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

export declare type EventClosableProps = {
    onClose?: VoidFunction;
};

export declare type EventUpdateOpenProps = {
    'onUpdate:open'?: (state: boolean) => void;
};

export declare type EventUpdateModelValueProps<T> = {
    'onUpdate:model-value'?: (value: T) => void;
};

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
export * as StringHelper from '../mixins/types/StringHelper';
export * as Color from '../mixins/types/colorUtils';
export * from '../model/types';
export { AxiosPlugin, IHttpService } from '../utils/types/AxiosPlugin';
export { default as Helper } from '../utils/types/Helper';

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
