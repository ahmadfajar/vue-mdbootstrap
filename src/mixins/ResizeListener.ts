import { isServer } from '@/mixins/CommonApi.ts';
import type { IBindingElement } from '@/types';

declare type TResizeTarget = {
  target: IBindingElement;
};

const resizeHandler = function (entries: TResizeTarget[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners || [];

    if (Array.isArray(listeners) && listeners.length) {
      listeners.forEach((fn: CallableFunction): void => {
        fn.bind(entry);
      });
    }
  }
};

/**
 * Register event 'resizeListener' and utilize the ResizeObserver to monitor the event.
 *
 * @param target The target element.
 * @param fn     The callback function.
 */
export function useAddResizeListener(target: IBindingElement, fn: CallableFunction) {
  if (isServer) {
    return;
  }

  if (!target.__resizeListeners) {
    target.__resizeListeners = [];
    target.__observer = new ResizeObserver(resizeHandler);
    target.__observer.observe(target);
  }
  target.__resizeListeners.push(fn);
}

/**
 * Un-register event 'resizeListener' and disconnect it from ResizeObserver.
 *
 * @param target The target element.
 * @param fn     The callback function.
 */
export function useRemoveResizeListener(target: IBindingElement, fn?: CallableFunction) {
  if (target && target.__resizeListeners) {
    if (fn) {
      target.__resizeListeners.splice(target.__resizeListeners.indexOf(fn), 1);
    }
    if (!target.__resizeListeners.length) {
      target.__observer?.disconnect();
    }
  }
}
