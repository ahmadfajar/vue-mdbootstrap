import { IBindingElement, IEventListenerResult, IHTMLElement } from '../../types/library';

export class EventListener {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param target    DOM element to register listener on.
   * @param eventName Event type, e.g. 'click' or 'mouseover'.
   * @param callback  Callback function.
   * @param options   Listener options.
   * @returns Object with a `remove` method.
   */
  static listen(
    target: IHTMLElement,
    eventName: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): IEventListenerResult | undefined;
}

export function useAddResizeListener(el: IBindingElement, fn: CallableFunction): void;

export function useRemoveResizeListener(el: IBindingElement, fn?: CallableFunction): void;

export function preventEventTarget(event: Event): void;

export function isSVGElement(source?: HTMLElement | null): boolean;

/**
 * Check if `target` is indirect child of `parent`.
 *
 * @param parent The parent element.
 * @param target The child element to check.
 * @returns TRUE if `target` is indirect child otherwise `false`.
 */
export function isChildOf(parent: HTMLElement | Node | null, target?: HTMLElement | null): boolean;
