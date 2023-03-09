import type {IBindingElement, TDirectiveBinding} from "../../types";
import type {Directive, DirectiveBinding} from "vue";
import Helper from "../../utils/Helper";

function mounted(el: IBindingElement, binding: DirectiveBinding<VoidFunction | TDirectiveBinding>) {
    const callback = Helper.isFunction(binding.value)
        ? (<VoidFunction | EventListener>binding.value)
        : <EventListener>(<TDirectiveBinding>binding.value).handler;

    let target: Element | null = null;

    if (!Helper.isFunction(binding.value)) {
        const binder = <TDirectiveBinding>binding.value;
        target = Helper.isString(binder.target)
            ? document.querySelector(<string>binder.target)
            : <Element | null>binder.target;
    }
    const clickHandler = function (evt: Event) {
        if (el.contains(<Node>evt.target)) {
            return;
        }
        callback(evt);
    };

    el.__clickOutsideListener = {
        handler: clickHandler,
        target: target
    };
    if (target) {
        target.addEventListener('click', clickHandler);
    } else {
        document.addEventListener('click', clickHandler);
    }
}

function unmounted(el: IBindingElement): void {
    if (el.__clickOutsideListener) {
        const {handler, target} = el.__clickOutsideListener;
        if (target) {
            target.removeEventListener('click', handler);
        } else {
            document.removeEventListener('click', handler);
        }

        delete el.__clickOutsideListener;
    }
}

export const ClickOutside: Directive = {
    mounted,
    unmounted,
}

export default ClickOutside;
