import {Directive, DirectiveBinding} from "vue";
import {IBindingElement, TDirectiveBinding} from "../../types";
import Helper from "../../utils/Helper";

interface ResizeDirectiveBinding extends Omit<DirectiveBinding, "modifiers"> {
    value: VoidFunction | TDirectiveBinding;
    modifiers?: {
        active?: boolean;
        quiet?: boolean;
    }
}

function mounted(el: IBindingElement, binding: ResizeDirectiveBinding): void {
    const callback = Helper.isFunction(binding.value)
        ? (<VoidFunction>binding.value)
        : (<TDirectiveBinding>binding.value).handler;
    const debounce = !Helper.isFunction(binding.value)
        ? (<TDirectiveBinding>binding.value)?.debounce || 50
        : 50;
    const options: AddEventListenerOptions = {
        passive: !binding.modifiers?.active,
    }

    let debounceTimeout: number;
    const onResizeHandler = () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        debounceTimeout = setTimeout(callback, debounce);
    };

    window.addEventListener("resize", onResizeHandler, options);
    el.__resizeListener = onResizeHandler;

    if (!binding.modifiers?.quiet) {
        onResizeHandler();
    }
}

function unmounted(el: IBindingElement): void {
    if (el.__resizeListener) {
        const handler = el.__resizeListener as EventListenerObject;

        window.removeEventListener("resize", handler);
        delete el.__resizeListener;
    }
}

export const Resize: Directive = {
    mounted,
    unmounted,
}

export default Resize;
