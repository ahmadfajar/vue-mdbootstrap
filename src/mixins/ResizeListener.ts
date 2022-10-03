import ResizeObserver from 'resize-observer-polyfill';
import {isServer} from "./CommonApi";
import {IBindingElement} from "../types";

declare type TResizeTarget = {
    target: IBindingElement;
}

const resizeHandler = function (entries: Array<TResizeTarget>) {
    for (const entry of entries) {
        const listeners = entry.target.__resizeListeners__ || [];
        if (Array.isArray(listeners) && listeners.length) {
            listeners.forEach((fn: CallableFunction): void => {
                fn();
            });
        }
    }
};

export function addResizeListener(el: IBindingElement, fn: CallableFunction) {
    if (isServer) {
        return;
    }

    if (!el.__resizeListeners__) {
        el.__resizeListeners__ = [];
        el.__observer__ = new ResizeObserver(resizeHandler);
        el.__observer__.observe(el);
    }
    el.__resizeListeners__.push(fn);
}

export function removeResizeListener(el: IBindingElement, fn?: CallableFunction) {
    if (el && el.__resizeListeners__) {
        if (fn) {
            el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(fn), 1);
        }
        if (!el.__resizeListeners__.length) {
            el.__observer__?.disconnect();
        }
    }
}
