import {IRippleEvent} from "../types";
import {cssPrefix} from "../../../mixins/CommonApi";

/*
import Helper from "../../../utils/Helper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const raf = require("raf")

function applyWaveStyles(position: object, size: string | number) {
    const unitSize = Helper.sizeUnit(size);

    return {
        ...position,
        width: unitSize,
        height: unitSize
    };
}

function getCenteredPosition(size: number): Record<string, string> {
    const halfSize = -size / 2 + 'px';

    return {
        'margin-top': halfSize,
        'margin-left': halfSize
    }
}

function getElementSize(el: HTMLElement | undefined): number {
    if (!el) {
        return 0;
    }

    const {offsetWidth, offsetHeight} = el;

    return Math.round(Math.max(offsetWidth, offsetHeight));
}

function getHitPosition(event: IRippleEvent, el: HTMLElement | undefined, elSize: number) {
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
    props: TRippleOptionProps,
    data: TRippleData,
    event: IRippleEvent,
    el: HTMLElement | undefined,
): void {
    data.touchTimeout = window.setTimeout(() => {
        useStartRipple(props, data, event, el);
    }, 100);
}

export function useStartRipple(
    props: TRippleOptionProps,
    data: TRippleData,
    event: IRippleEvent,
    el: HTMLElement | undefined,
): void {
    raf(() => {
        if (!props.disabled && (!data.eventType || data.eventType === event.type)) {
            let position;
            const size = getElementSize(el);

            if (props.centered) {
                position = getCenteredPosition(size);
            } else {
                position = getHitPosition(event, el, size);
            }

            data.eventType = event.type;
            data.ripples = [{
                waveStyles: applyWaveStyles(position, size),
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
*/

export function useCreateRipple(event: IRippleEvent, centered?: boolean) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = event.pageY;
    const left = event.pageX;
    const rippleEl = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    rippleEl.style.width = rippleEl.style.height = `${diameter}px`;
    rippleEl.style.top = (top - (rect?.top || 0) - radius - document.documentElement.scrollTop) + 'px';
    rippleEl.style.left = (left - (rect?.left || 0) - radius - document.documentElement.scrollLeft) + 'px';

    if (centered) {
        rippleEl.style.top = '0';
        rippleEl.style.left = '0';
    }

    rippleEl.classList.add(`${cssPrefix}ripple-animation`);

    const ripple = target.getElementsByClassName(`${cssPrefix}ripple-animation`)[0];

    if (ripple) {
        ripple.remove();
    }

    target.appendChild(rippleEl);
}
