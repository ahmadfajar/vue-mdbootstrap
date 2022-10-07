import {Directive, DirectiveBinding} from "vue";
import {EventListenerTarget, IBindingElement, TDirectiveBinding} from "../../types";
import Helper from "../../utils/Helper";

interface ScrollDirectiveBinding extends Omit<DirectiveBinding, "modifiers"> {
    value: VoidFunction | TDirectiveBinding;
    modifiers?: {
        passive?: boolean;
        self?: boolean;
    }
}

function mounted(el: IBindingElement, binding: ScrollDirectiveBinding): void {
    const callback = Helper.isFunction(binding.value)
        ? (<EventListenerTarget>binding.value)
        : (<TDirectiveBinding>binding.value).handler;
    const options: AddEventListenerOptions = {
        passive: binding.modifiers?.passive || true,
    }
    const self = binding.modifiers?.self || false;
    let target: IBindingElement | Window | null;

    if (self) {
        target = el;
    } else if (!Helper.isFunction(binding.value)) {
        const binder = binding.value as TDirectiveBinding;
        target = binder.target ? document.querySelector(binder.target) : window;
    } else {
        target = window;
    }

    if (target) {
        const scrollHandler = (e: Event) => {
            callback(target, e);
        };
        target.addEventListener("scroll", scrollHandler, options);
        el.__scrollListener = {
            handler: scrollHandler,
            target: self ? undefined : target,
            options,
        };
    }
}

function unmounted(el: IBindingElement): void {
    if (el.__scrollListener) {
        const {handler, options, target} = el.__scrollListener;

        if (target) {
            target.removeEventListener("scroll", handler, options);
        } else {
            el.removeEventListener("scroll", handler, options);
        }
    }
}

function updated(el: HTMLElement, binding: ScrollDirectiveBinding): void {
    if (binding.value === binding.oldValue) {
        return;
    }
    unmounted(el);
    mounted(el, binding);
}

export const Scroll: Directive = {
    mounted,
    unmounted,
    updated,
}

export default Scroll;