import type {IEventResult, IHTMLElement} from "../types";

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
        options?: boolean | AddEventListenerOptions,
    ): IEventResult | undefined {
        if (context.addEventListener) {
            context.addEventListener(eventType, callback, options);

            return {
                remove() {
                    context.removeEventListener(eventType, callback, options)
                }
            }
        } else if (context.attachEvent) {
            context.attachEvent('on' + eventType, callback);

            return {
                remove() {
                    context.detachEvent('on' + eventType, callback);
                }
            }
        }
    }
}

export function componentFirstChild(children: HTMLElement[]): HTMLElement {
    return children && children.filter(c => c && (c as GetNotificationOptions).tag)[0];
}

export function preventEventTarget(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
}
