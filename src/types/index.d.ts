import ResizeObserver from "resize-observer-polyfill";
import {App} from "vue";

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
    __scrollListener__?: TEventListenerBinding;
    __resizeListener__?: EventListenerOrEventListenerObject | CallableFunction;
    __resizeListeners__?: Array<CallableFunction>;
    __observer__?: ResizeObserver;
}

export interface IVueMdb extends App {
    $VueMdb: TVueMdb
}
