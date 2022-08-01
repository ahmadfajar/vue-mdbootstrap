interface IEventTarget extends EventTarget {
    attachEvent(type: string, callback: EventListenerOrEventListenerObject);

    detachEvent(type: string, callback: EventListenerOrEventListenerObject);
}

export class EventListener {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {IEventTarget} target  DOM element to register listener on.
     * @param {string} eventType     Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback    Callback function.
     * @returns {object} Object with a `remove` method.
     */
    static listen(target: IEventTarget, eventType: string, callback: EventListenerOrEventListenerObject) {
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

export function firstComponentChild(children) {
    return children && children.filter(c => c && c.tag)[0];
}

export function getScrollEventTarget(element) {
    let currentNode = element;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
        const overflowY = window.getComputedStyle(currentNode).overflowY;
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode;
        }
        currentNode = currentNode.parentNode;
    }

    return window;
}

/**
 * Get scroll Top position.
 *
 * @param {Element|Window} element The source DOM element
 * @returns {number} Scroll top position
 */
export function getScrollTop(element): number {
    if (element === window) {
        return Math.max(window.scrollY || 0, document.documentElement.scrollTop);
    } else {
        return element.scrollTop;
    }
}

export function getOffset(el: Element) {
    const box = el.getBoundingClientRect();
    const body = document.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = window.scrollY || el.scrollTop;
    const scrollLeft = window.scrollX || el.scrollLeft;

    return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
    };
}
