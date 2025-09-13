import type { IEventResult, IHTMLElement } from '@/types';

export class EventListener {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param target      DOM element to register listener on.
   * @param eventName   Event name, e.g. 'click' or 'mouseover'.
   * @param callback    Callback function.
   * @param options     Listener options.
   * @returns Object with a `remove` method.
   */
  static listen(
    target: IHTMLElement,
    eventName: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): IEventResult | undefined {
    if (target.addEventListener) {
      target.addEventListener(eventName, callback, options);

      return {
        remove() {
          target.removeEventListener(eventName, callback, options);
        },
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventName, callback);

      return {
        remove() {
          target.detachEvent('on' + eventName, callback);
        },
      };
    }
  }
}

export function preventEventTarget(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}

export function isSVGElement(source?: HTMLElement | null): boolean {
  if (!source) {
    return false;
  }

  const idx = source.constructor.toString().search(/SVG.+Element/);
  return idx > -1;
}

/**
 * Check if `target` is indirect child of `parent`.
 *
 * @param parent The parent element.
 * @param target The child element to check.
 * @returns TRUE if `target` is indirect child otherwise `false`.
 */
export function isChildOf(parent: HTMLElement | Node | null, target?: HTMLElement | null): boolean {
  if (!target || !parent) {
    return false;
  }
  if (parent.contains(target)) {
    return true;
  }

  let result = false;
  const children = (<HTMLElement>parent).children;

  for (let i = 0; i < children.length; i++) {
    const el = children.item(i);

    if ((el?.id && target.id && el?.id === target.id) || el === target || isChildOf(el, target)) {
      result = true;
      return result;
    }
  }

  return result;
}
