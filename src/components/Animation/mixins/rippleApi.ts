import {IRippleEvent} from "../types";
import {cssPrefix} from "../../../mixins/CommonApi";

export function useCreateRipple(event: IRippleEvent, centered?: boolean) {
    const target = (event.currentTarget || event.target) as HTMLElement;
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
