import type { EventListenerTarget, IBindingElement, TDirectiveBinding } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { Directive, DirectiveBinding } from 'vue';

interface ScrollDirectiveBinding extends Omit<DirectiveBinding, 'modifiers'> {
  value: EventListenerTarget | TDirectiveBinding;
  modifiers?: {
    passive?: boolean;
    self?: boolean;
  };
}

function mounted(el: IBindingElement, binding: ScrollDirectiveBinding): void {
  const callback = Helper.isFunction(binding.value) ? binding.value : binding.value.handler;
  const options: AddEventListenerOptions = {
    passive: binding.modifiers?.passive ?? true,
  };
  const self = binding.modifiers?.self ?? false;
  let target: Element | Window | null;

  if (self) {
    target = el;
  } else if (!Helper.isFunction(binding.value)) {
    const binder = binding.value;
    target = Helper.isString(binder.target)
      ? document.querySelector(binder.target)
      : binder.target instanceof Element
        ? binder.target
        : window;
  } else {
    target = window;
  }

  // console.log('target:', target);
  // console.log('element:', el);
  // console.log('value:', binding.value);
  // console.log('options:', options);

  if (target) {
    const scrollHandler = (evt: Event) => {
      callback(target as Element & Event, evt);
    };
    target.addEventListener('scroll', scrollHandler, options);
    el.__scrollListener = {
      handler: scrollHandler,
      target: self ? undefined : target,
      options,
    };
  }
}

function unmounted(el: IBindingElement): void {
  if (el.__scrollListener) {
    const { handler, options, target } = el.__scrollListener;

    if (target) {
      target.removeEventListener('scroll', handler, options);
    } else {
      el.removeEventListener('scroll', handler, options);
    }

    delete el.__scrollListener;
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
};
