import type {AllowedComponentProps, ComponentInternalInstance, ComponentPublicInstance, VNode, VNodeProps} from "vue";
import type {RouterLinkProps} from "vue-router";
import type ResizeObserver from "resize-observer-polyfill";

export * from "../components/Alert/types";
export * from "../components/Animation/types";
export * from "../components/Appbar/types";
export * from "../components/Avatar/types";
export * from "../components/Badge/types";
export * from "../components/Basic/types";
export * from "../components/Button/types";
export * from "../components/Card/types";
export * from "../components/Checkbox/types";
export * from "../components/Chip/types";
export * from "../components/ColorPicker/types";
export * from "../components/Combobox/types";
export * from "../components/Container/types";
export * from "../components/DatePicker/types";
export * from "../components/Drawer/types";
export * from "../components/Field/types";
export * from "../components/Icon/types";
export * from "../components/ListView/types";
export * from "../components/Menu/types";
export * from "../components/Popover/types";
export * from "../components/Progress/types";
export * from "../components/Radio/types";
export * from "../components/Switch/types";
export * from "../components/Tabs/types";
export * from "../components/Tooltip/types";
export * from "../model/types";

export declare type TBreakpoint = "sm" | "md" | "lg" | "xl";

export declare type TLabelPosition = "left" | "right";

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
    notification: TRecord;
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

export declare interface IVNode extends VNode {
    ctx: ComponentInternalInstance;
}

export declare interface IComponentInstance extends ComponentInternalInstance {
    ctx: ComponentPublicInstance;
}
