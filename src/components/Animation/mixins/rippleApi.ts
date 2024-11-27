import BsWave from '@/components/Animation/BsWave';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper';
import type { Ref, Slots } from 'vue';
import {
    createCommentVNode,
    createVNode,
    Fragment,
    h,
    normalizeClass,
    normalizeStyle,
    renderList,
    renderSlot,
    unref,
} from 'vue';

function applyRippleStyles(position: object, size: number) {
    const unitSize = Helper.cssUnit(size);

    return {
        ...position,
        width: unitSize,
        height: unitSize,
    };
}

function getRippleCenteredPosition(size: number) {
    const halfSize = -size / 2 + 'px';

    return {
        marginTop: halfSize,
        marginLeft: halfSize,
    };
}

function getSize(element: Ref<HTMLElement | null>) {
    if (element.value) {
        const { offsetWidth, offsetHeight } = element.value;
        return Math.round(Math.max(offsetWidth, offsetHeight));
    }

    return 0;
}

function getHitPosition(
    element: Ref<HTMLElement | null>,
    event: MouseEvent & TouchEvent,
    elementSize: number
) {
    const rect = element.value?.getBoundingClientRect();
    let top = event.pageY;
    let left = event.pageX;

    if (event.type === 'touchstart') {
        top = event.changedTouches[0].pageY;
        left = event.changedTouches[0].pageX;
    }

    return {
        top: top - (rect?.top ?? 0) - elementSize / 2 - document.documentElement.scrollTop + 'px',
        left:
            left - (rect?.left ?? 0) - elementSize / 2 - document.documentElement.scrollLeft + 'px',
    };
}

export declare type TRippleData = {
    uuid: string;
    waveStyles: unknown;
};

export function startRipple(
    element: Ref<HTMLElement | null>,
    ripples: Ref<TRippleData[]>,
    eventType: Ref<string>,
    disabled: Ref<boolean>,
    centered: Ref<boolean>,
    event: MouseEvent & TouchEvent
) {
    window.requestAnimationFrame(() => {
        if (!disabled.value && (!eventType.value || eventType.value === event.type)) {
            let position;
            const size = getSize(element);

            if (centered.value) {
                position = getRippleCenteredPosition(size);
            } else {
                position = getHitPosition(element, event, size);
            }

            eventType.value = event.type;
            ripples.value = [
                {
                    waveStyles: applyRippleStyles(position, size),
                    uuid: Helper.uuid(true),
                },
            ];
        }
    });
}

function endRipple(ripples: Ref<TRippleData[]>) {
    Helper.defer(() => {
        if (Helper.isArray(ripples.value) && ripples.value.length > 0) {
            ripples.value.shift();
        }
    }, 500);
}

function touchMoveCheck(touchTimeout: Ref<number>) {
    window.clearTimeout(touchTimeout.value);
}

function touchStartCheck(
    element: Ref<HTMLElement | null>,
    ripples: Ref<TRippleData[]>,
    eventType: Ref<string>,
    disabled: Ref<boolean>,
    centered: Ref<boolean>,
    touchTimeout: Ref<number>,
    event: MouseEvent & TouchEvent
) {
    touchTimeout.value = Helper.defer(() => {
        startRipple(element, ripples, eventType, disabled, centered, event);
    }, 100);
}

export function useRenderRipples(
    slots: Slots,
    element: Ref<HTMLElement | null>,
    ripples: Ref<TRippleData[]>,
    classNames: Ref<TRecord>,
    rippleClassNames: Ref<TRecord>,
    eventType: Ref<string>,
    disabled: Ref<boolean>,
    centered: Ref<boolean>,
    touchTimeout: Ref<number>,
    tagType?: string
) {
    return h(
        tagType || 'div',
        {
            ref: element,
            class: normalizeClass(classNames.value),
            onMousedownPassive: (event: MouseEvent & TouchEvent) =>
                startRipple(element, ripples, eventType, disabled, centered, event),
            onMouseleavePassive: () => endRipple(ripples),
            onMouseupPassive: () => endRipple(ripples),
            onTouchcancelPassive: () => endRipple(ripples),
            onTouchendPassive: () => endRipple(ripples),
            onTouchmovePassive: () => touchMoveCheck(touchTimeout),
            onTouchstartPassive: (event: MouseEvent & TouchEvent) =>
                touchStartCheck(
                    element,
                    ripples,
                    eventType,
                    disabled,
                    centered,
                    touchTimeout,
                    event
                ),
        },
        [
            renderSlot(slots, 'default'),
            !unref(disabled)
                ? h(
                      Fragment,
                      { key: 0 },
                      renderList(ripples.value, (ripple) => {
                          return createVNode(
                              BsWave,
                              {
                                  key: ripple.uuid,
                                  class: normalizeClass(rippleClassNames.value),
                                  style: normalizeStyle(ripple.waveStyles),
                              },
                              null,
                              8 /* PROPS */,
                              ['class', 'style']
                          );
                      })
                  )
                : createCommentVNode(' v-if '),
        ]
    );
}
