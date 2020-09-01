export const EventListener = {
    /**
     * Listen to DOM events during the bubble phase.
     *
     * @param {EventTarget} target DOM element to register listener on.
     * @param {string} eventType   Event type, e.g. 'click' or 'mouseover'.
     * @param {function} callback  Callback function.
     * @returns {object} Object with a `remove` method.
     */
    listen(target, eventType, callback) {
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
};

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

export function getScrollTop(element) {
    if (element === window) {
        return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    } else {
        return element.scrollTop;
    }
}

export function getOffset(el) {
    const box        = el.getBoundingClientRect();
    const body       = document.body;
    const clientTop  = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop  = window.pageYOffset || el.scrollTop;
    const scrollLeft = window.pageXOffset || el.scrollLeft;

    return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
    };
}
