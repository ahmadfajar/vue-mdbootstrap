import ResizeObserver from 'resize-observer-polyfill';
import {
    AllowedComponentProps,
    App,
    Component,
    ComponentInternalInstance,
    ComponentPublicInstance,
    VNode,
    VNodeProps
} from 'vue';
import { RouterLinkProps } from 'vue-router';
import { INotificationProvider } from '../components/Notification/types';

export declare type TBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

export declare type TLabelPosition = 'left' | 'right';

export declare type TEmitFn = (event: string, ...args: unknown[]) => void;

export declare type TRecord = Record<string, unknown>;

export declare type TValueText<T> = {
    value: T;
    text: string;
}

export declare type TDebounce = {
    timerId?: number;
    lastExec?: number;
}

export declare type TDirectiveBinding = {
    handler: VoidFunction | EventListener | EventListenerTarget;
    debounce?: number;
    target?: string | Element | Document | Window;
};

export declare type TRouterLinkProps = AllowedComponentProps & VNodeProps & typeof RouterLinkProps;

export declare type TRouterOptionProps = {
    activeClass?: string;
    path?: string;
    url?: string;
}

export declare type TEventListenerBinding = {
    handler: EventListenerOrEventListenerObject;
    options?: AddEventListenerOptions;
    target?: Element | Window | null;
};

export declare type TMdbAppObject = {
    left: number;
    right: number;
    top: number;
    bottom: number;
    height: number;
    width: number;
    appbarHeight: number;
    leftSideDrawerWidth: number;
    rightSideDrawerWidth: number;
}

export declare type TVueMdb = {
    app: Record<string, TMdbAppObject>;
    notification: INotificationProvider;
}

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
}

export declare type EventUpdateOpenProps = {
    'onUpdate:open'?: (state: boolean) => void;
}

export declare type EventUpdateModelValueProps<T> = {
    'onUpdate:model-value'?: (value: T) => void;
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

export { IHttpService, AxiosPlugin } from '../utils/types/AxiosPlugin';
export { default as Helper } from '../utils/types/Helper';
export * from '../model/types';
export * as Color from '../mixins/types/colorUtils';
export * as StringHelper from '../mixins/types/StringHelper';
export { EventListener } from '../mixins/types/DomHelper';

export {
    useMobileDevice, useBreakpointMax, useBreakpointMin, useAxiosPlugin,
    useHttpService, useVueMdbService, useVueMdbNotification, useCurrentRoute,
    useMergeClass, useRenderSlot, useRenderSlotDefault, useRenderSlotWithWrapper,
    useRenderSlotWrapperWithCondition, useRenderTransition, useGenerateId
} from '../mixins/types/CommonApi';
