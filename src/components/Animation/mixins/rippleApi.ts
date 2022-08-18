import {Ref} from "vue";
import {TBsRippleOptionProps, TRipple, TRippleEvent} from "../types";
import * as raf from "raf";
import Helper from "../../../utils/Helper";

export function useApplyWaveStyles(position: object, size: string | number) {
    const unitSize = Helper.sizeUnit(size);

    return {
        ...position,
        width: unitSize,
        height: unitSize
    };
}

export function useGetCenteredPosition(size: number): Record<string, unknown> {
    const halfSize = -size / 2 + 'px';

    return {
        'margin-top': halfSize,
        'margin-left': halfSize
    }
}

export function useGetSize(el: HTMLElement | null): number {
    if (el === null) {
        return 0;
    }

    const {offsetWidth, offsetHeight} = el;

    return Math.round(Math.max(offsetWidth, offsetHeight));
}

export function useGetHitPosition(event: TRippleEvent, el: HTMLElement | null, elSize: number) {
    const rect = el?.getBoundingClientRect();
    let top = event.pageY;
    let left = event.pageX;

    if (event.type === 'touchstart') {
        top = event.changedTouches[0].pageY;
        left = event.changedTouches[0].pageX;
    }

    return {
        top: (top - (rect?.top || 0) - elSize / 2 - document.documentElement.scrollTop) + 'px',
        left: (left - (rect?.left || 0) - elSize / 2 - document.documentElement.scrollLeft) + 'px'
    }
}

export function useTouchMoveCheck(touchTimeout: Ref) {
    window.clearTimeout(touchTimeout.value);
}

export function useTouchStartCheck(
    props: TBsRippleOptionProps,
    touchTimeout: Ref<number | null>,
    ripples: Ref<Array<TRipple>>,
    eventType: Ref<string | null>,
    event: TRippleEvent,
    el: HTMLElement | null,
) {
    touchTimeout.value = window.setTimeout(() => {
        useStartRipple(props, ripples, eventType, event, el);
    }, 100);
}

export function useStartRipple(
    props: TBsRippleOptionProps,
    ripples: Ref<Array<TRipple>>,
    eventType: Ref<string | null>,
    event: TRippleEvent,
    el: HTMLElement | null,
) {
    raf(() => {
        if (!props.disabled && (!eventType.value || eventType.value === event.type)) {
            let position;
            const size = useGetSize(el);

            if (props.centered) {
                position = useGetCenteredPosition(size);
            } else {
                position = useGetHitPosition(event, el, size);
            }

            eventType.value = event.type;
            ripples.value = [{
                waveStyles: useApplyWaveStyles(position, size),
                uuid: Helper.uuid()
            }];
        }
    });
}

export function useEndRipple(ripples: Ref<Array<TRipple>>) {
    Helper.defer(() => {
        if (Helper.isArray(ripples.value) && ripples.value.length > 0) {
            ripples.value.shift();
        }
    }, 500);
}
