import { IBindingElement, IEventResult, IHTMLElement } from '@/types';

export declare class EventListener {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param context   DOM element to register listener on.
   * @param eventName Event type, e.g. 'click' or 'mouseover'.
   * @param callback  Callback function.
   * @param options   Listener options.
   * @returns Object with a `remove` method.
   */
  static listen(
    context: IHTMLElement,
    eventName: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): IEventResult | undefined;
}

export declare function useAddResizeListener(el: IBindingElement, fn: CallableFunction): void;

export declare function useRemoveResizeListener(el: IBindingElement, fn?: CallableFunction): void;

export declare function preventEventTarget(event: Event): void;

export declare function isSVGElement(source?: HTMLElement | null): boolean;

/**
 * Check if `target` is indirect child of `parent`.
 *
 * @param parent The parent element.
 * @param target The child element to check.
 * @returns TRUE if `target` is indirect child otherwise `false`.
 */
export declare function isChildOf(
  parent: HTMLElement | Node | null,
  target?: HTMLElement | null
): boolean;
