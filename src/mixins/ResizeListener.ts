import ResizeObserver from 'resize-observer-polyfill';
import {isServer} from "./CommonApi";
import type {IBindingElement} from "../types";

declare type TResizeTarget = {
    target: IBindingElement;
}

const resizeHandler = function (entries: Array<TResizeTarget>) {
    for (const entry of entries) {
        const listeners = entry.target.__resizeListeners || [];
        if (Array.isArray(listeners) && listeners.length) {
            listeners.forEach((fn: CallableFunction): void => {
                fn();
            });
        }
    }
};

export function useAddResizeListener(el: IBindingElement, fn: CallableFunction) {
    if (isServer) {
        return;
    }

    if (!el.__resizeListeners) {
        el.__resizeListeners = [];
        el.__observer = new ResizeObserver(resizeHandler);
        el.__observer.observe(el);
    }
    el.__resizeListeners.push(fn);
}

export function useRemoveResizeListener(el: IBindingElement, fn?: CallableFunction) {
    if (el && el.__resizeListeners) {
        if (fn) {
            el.__resizeListeners.splice(el.__resizeListeners.indexOf(fn), 1);
        }
        if (!el.__resizeListeners.length) {
            el.__observer?.disconnect();
        }
    }
}
