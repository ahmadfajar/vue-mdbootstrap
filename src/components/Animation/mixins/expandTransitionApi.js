export function getElSize(size) {
    if (!size) {
        return 0;
    }
    const index = size.indexOf('px');
    if (index === -1) {
        return 0;
    }

    return Number(size.substring(0, index));
}

export function beforeEnter(el) {
    el.dataset.oldPaddingTop    = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow      = el.style.overflow;
    el.style.paddingTop         = '0';
    el.style.paddingBottom      = '0';
    el.style.height             = '0';
}

export function onEnter(el) {
    el.style.display       = 'block';
    el.style.overflow      = 'hidden';
    el.style.height        = el.scrollHeight +
        getElSize(el.dataset.oldPaddingTop) +
        getElSize(el.dataset.oldPaddingBottom) + 'px';
    el.style.paddingTop    = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
}

export function afterEnter(el) {
    el.style.display       = '';
    el.style.height        = '';
    el.style.overflow      = el.dataset.oldOverflow;
    el.style.paddingTop    = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
}

export function beforeLeave(el) {
    el.dataset.oldPaddingTop    = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow      = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
}

export function onLeave(el) {
    if (el.scrollHeight !== 0) {
        setTimeout(() => {
            el.style.height        = 0;
            el.style.paddingTop    = 0;
            el.style.paddingBottom = 0;
        });
    }
}

export function afterLeave(el) {
    el.style.display       = 'none';
    el.style.height        = '';
    el.style.overflow      = el.dataset.oldOverflow;
    el.style.paddingTop    = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
}
