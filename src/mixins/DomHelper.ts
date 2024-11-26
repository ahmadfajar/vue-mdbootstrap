import type { IEventResult, IHTMLElement } from '@/types';

export class EventListener {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {IHTMLElement} context     DOM element to register listener on.
     * @param {string} eventType         Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback        Callback function.
     * @param {boolean|AddEventListenerOptions} options Listener options.
     * @returns {object} Object with a `remove` method.
     */
    static listen(
        context: IHTMLElement,
        eventType: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): IEventResult | undefined {
        if (context.addEventListener) {
            context.addEventListener(eventType, callback, options);

            return {
                remove() {
                    context.removeEventListener(eventType, callback, options);
                },
            };
        } else if (context.attachEvent) {
            context.attachEvent('on' + eventType, callback);

            return {
                remove() {
                    context.detachEvent('on' + eventType, callback);
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
 * @param {HTMLElement} parent The parent element.
 * @param {HTMLElement} target The child element to check.
 * @returns {boolean} TRUE if `target` is indirect child otherwise `false`.
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

        if (
            (el?.id && target.id && el?.id === target.id) ||
            el === target ||
            isChildOf(el, target)
        ) {
            result = true;
            return result;
        }
    }

    return result;
}
