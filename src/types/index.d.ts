import ResizeObserver from "resize-observer-polyfill";
import {App, ComponentInternalInstance, ComponentPublicInstance} from "vue";

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
export * from "../components/Container/types";
export * from "../components/Field/types";
export * from "../components/Icon/types";
export * from "../components/Progress/types";
export * from "../components/Radio/types";
export * from "../components/SideDrawer/types";

export declare type TBreakpoint = "sm" | "md" | "lg" | "xl";

export declare type TEmitFn = (event: string, ...args: unknown[]) => void;

export declare type TRecord = Record<string, unknown>;

export declare type TDirectiveBinding = {
    handler: VoidFunction | EventListenerTarget;
    debounce?: number;
    target?: string;
};

export declare type TEventListenerBinding = {
    handler: EventListenerOrEventListenerObject;
    options: AddEventListenerOptions;
    target: Element | Window | undefined;
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

export interface EventListenerTarget {
    (target: Element | Window | undefined | null, event: Event | undefined | null): void;
}

export interface IBindingElement extends Element {
    __scrollListener?: TEventListenerBinding;
    __resizeListener?: EventListenerOrEventListenerObject | CallableFunction;
    __resizeListeners?: Array<CallableFunction>;
    __observer?: ResizeObserver;
}

export interface IComponentInstance extends ComponentInternalInstance {
    ctx: ComponentPublicInstance;
}

export interface IVMdbApp extends App {
    $VueMdb: TVueMdb
}
