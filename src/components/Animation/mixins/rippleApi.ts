import {TBsRippleOptionProps, TRippleData, TRippleEvent} from "../types";
import Helper from "../../../utils/Helper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const raf = require("raf")

export function useApplyWaveStyles(position: object, size: string | number) {
    const unitSize = Helper.sizeUnit(size);

    return {
        ...position,
        width: unitSize,
        height: unitSize
    };
}

export function useGetCenteredPosition(size: number): Record<string, string> {
    const halfSize = -size / 2 + 'px';

    return {
        'margin-top': halfSize,
        'margin-left': halfSize
    }
}

export function useGetSize(el: HTMLElement | undefined): number {
    if (!el) {
        return 0;
    }

    const {offsetWidth, offsetHeight} = el;

    return Math.round(Math.max(offsetWidth, offsetHeight));
}

export function useGetHitPosition(event: TRippleEvent, el: HTMLElement | undefined, elSize: number) {
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

export function useTouchMoveCheck(data: TRippleData): void {
    window.clearTimeout(data.touchTimeout);
}

export function useTouchStartCheck(
    props: TBsRippleOptionProps,
    data: TRippleData,
    event: TRippleEvent,
    el: HTMLElement | undefined,
): void {
    data.touchTimeout = window.setTimeout(() => {
        useStartRipple(props, data, event, el);
    }, 100);
}

export function useStartRipple(
    props: TBsRippleOptionProps,
    data: TRippleData,
    event: TRippleEvent,
    el: HTMLElement | undefined,
): void {
    raf(() => {
        if (!props.disabled && (!data.eventType || data.eventType === event.type)) {
            let position;
            const size = useGetSize(el);

            if (props.centered) {
                position = useGetCenteredPosition(size);
            } else {
                position = useGetHitPosition(event, el, size);
            }

            data.eventType = event.type;
            data.ripples = [{
                waveStyles: useApplyWaveStyles(position, size),
                uuid: Helper.uuid()
            }];
        }
    });
}

export function useEndRipple(data: TRippleData): void {
    Helper.defer(() => {
        if (Helper.isArray(data.ripples) && data.ripples.length > 0) {
            data.ripples.shift();
        }
    }, 300);
}
