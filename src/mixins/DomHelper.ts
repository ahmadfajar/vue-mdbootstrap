import type {IEventResult, IHTMLEventTarget} from "../types";

export class EventListener {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {IHTMLEventTarget} target  DOM element to register listener on.
     * @param {string} eventType         Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback        Callback function.
     * @returns {object} Object with a `remove` method.
     */
    static listen(
        target: IHTMLEventTarget,
        eventType: string,
        callback: EventListenerOrEventListenerObject,
    ): IEventResult | undefined {
        if (target.addEventListener) {
            target.addEventListener(eventType, callback, false);

            return {
                remove() {
                    target.removeEventListener(eventType, callback, false)
                }
            }
        } else if (target.attachEvent) {
            target.attachEvent('on' + eventType, callback);
            return {
                remove() {
                    target.detachEvent('on' + eventType, callback);
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
