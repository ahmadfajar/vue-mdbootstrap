import type { IBindingElement, TouchDirectiveEvent, TRecord } from '@/types';
import type { Directive, DirectiveBinding } from 'vue';

function handleGesture(binding: TouchDirectiveEvent) {
    const { touchstartX, touchendX, touchstartY, touchendY } = binding;
    const dirRatio = 0.5;
    const minDistance = 16;
    binding.deltaX = touchendX - touchstartX;
    binding.deltaY = touchendY - touchstartY;

    if (Math.abs(binding.deltaY) < dirRatio * Math.abs(binding.deltaX)) {
        binding.left && touchendX < touchstartX - minDistance && binding.left(binding);
        binding.right && touchendX > touchstartX + minDistance && binding.right(binding);
    }

    if (Math.abs(binding.deltaX) < dirRatio * Math.abs(binding.deltaY)) {
        binding.up && touchendY < touchstartY - minDistance && binding.up(binding);
        binding.down && touchendY > touchstartY + minDistance && binding.down(binding);
    }
}

function touchStart(event: TouchEvent, binding: TouchDirectiveEvent) {
    // event.preventDefault();
    const touch = event.changedTouches[0];
    binding.touchstartX = touch.clientX;
    binding.touchstartY = touch.clientY;

    binding.start && binding.start(Object.assign(event, binding));
}

function touchEnd(event: TouchEvent, binding: TouchDirectiveEvent) {
    const touch = event.changedTouches[0];
    binding.touchendX = touch.clientX;
    binding.touchendY = touch.clientY;

    binding.end && binding.end(Object.assign(event, binding));
    handleGesture(binding);
}

function touchMove(event: TouchEvent, binding: TouchDirectiveEvent) {
    // event.preventDefault();
    const touch = event.changedTouches[0];
    binding.touchmoveX = touch.clientX;
    binding.touchmoveY = touch.clientY;

    binding.move && binding.move(Object.assign(event, binding));
}

declare interface TouchValueBinding {
    left?: (evt: TouchDirectiveEvent) => void;
    right?: (evt: TouchDirectiveEvent) => void;
    up?: (evt: TouchDirectiveEvent) => void;
    down?: (evt: TouchDirectiveEvent) => void;
    start?: (evt: TouchDirectiveEvent) => void;
    move?: (evt: TouchDirectiveEvent) => void;
    end?: (evt: TouchDirectiveEvent) => void;
}

declare interface TouchDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
    value: TouchValueBinding;
    modifiers?: {
        parent?: boolean;
        passive?: boolean;
    };
}

function createHandlers(value: TouchValueBinding) {
    const wrapper: TouchDirectiveEvent = {
        touchstartX: 0,
        touchstartY: 0,
        touchendX: 0,
        touchendY: 0,
        touchmoveX: 0,
        touchmoveY: 0,
        deltaX: 0,
        deltaY: 0,
        left: value.left,
        right: value.right,
        up: value.up,
        down: value.down,
        start: value.start,
        move: value.move,
        end: value.end,
    };

    return {
        touchstart: (e: TouchEvent) => touchStart(e, wrapper),
        touchend: (e: TouchEvent) => touchEnd(e, wrapper),
        touchmove: (e: TouchEvent) => touchMove(e, wrapper),
    };
}

function mounted(el: IBindingElement, binding: TouchDirectiveBinding) {
    const target = binding.modifiers?.parent ? el.parentElement : el;
    const options: AddEventListenerOptions = {
        passive: binding.modifiers?.passive || true,
    };

    if (!target) {
        return;
    }

    const handlers = createHandlers(binding.value);
    (target as IBindingElement).__touchEvents = handlers;

    Object.keys(handlers).forEach((name) => {
        // @ts-ignore
        target.addEventListener(name, handlers[name], options);
    });
}

function unmounted(el: IBindingElement, binding: TouchDirectiveBinding) {
    const target = binding.modifiers?.parent ? el.parentElement : el;
    const options: AddEventListenerOptions = {
        passive: binding.modifiers?.passive || true,
    };

    if (!target || !(target as IBindingElement).__touchEvents) {
        return;
    }

    const handlers = (target as IBindingElement).__touchEvents as TRecord;
    Object.keys(handlers).forEach((name) => {
        target.removeEventListener(name, handlers[name] as EventListenerObject, options);
    });

    (target as IBindingElement).__touchEvents = undefined;
}

export const Touch: Directive = {
    mounted,
    unmounted,
};
