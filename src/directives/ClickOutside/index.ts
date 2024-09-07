import type { Directive, DirectiveBinding } from 'vue';
import { isChildOf, isSVGElement } from '../../mixins/DomHelper';
import type { IBindingElement, TDirectiveBinding } from '../../types';
import Helper from '../../utils/Helper';

function mounted(el: IBindingElement, binding: DirectiveBinding<VoidFunction | TDirectiveBinding>) {
    const callback = Helper.isFunction(binding.value)
        ? (binding.value as VoidFunction | EventListener)
        : ((binding.value as TDirectiveBinding).handler as EventListener);

    let target: Element | null = null;

    if (!Helper.isFunction(binding.value)) {
        const binder = binding.value as TDirectiveBinding;
        target = Helper.isString(binder.target)
            ? document.querySelector(binder.target)
            : (binder.target as Element | null);
    }

    const clickHandler = function (evt: Event) {
        if (el.contains(evt.target as Node)) {
            return;
        }

        let eventTarget = evt.target as HTMLElement | null | undefined;

        if (isSVGElement(eventTarget)) {
            eventTarget = eventTarget?.parentElement;

            while (isSVGElement(eventTarget)) {
                eventTarget = target?.parentElement;
            }
        }
        if (isChildOf(el, eventTarget)) {
            return;
        }
        // console.info("evtTarget-isSVGElement:", isSVGElement(<HTMLElement>evt.target))

        callback(evt);
    };

    el.__clickOutsideListener = {
        handler: clickHandler,
        target: target,
    };
    if (target) {
        target.addEventListener('click', clickHandler);
    } else {
        document.addEventListener('click', clickHandler);
    }
}

function unmounted(el: IBindingElement): void {
    if (el.__clickOutsideListener) {
        const { handler, target } = el.__clickOutsideListener;

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
};
