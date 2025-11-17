import { cssPrefix } from '@/mixins/CommonApi.ts';
import { EventListener } from '@/mixins/DomHelper.ts';
import { useFloatingElement } from '@/mixins/floatingElement.ts';
import type { IBindingElement, IHTMLElement, IMouseEvents, TPlacementPosition } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComponentInternalInstance, ComponentPublicInstance, Ref, VNode } from 'vue';
import { unref } from 'vue';

const SPACE = 4;

/**
 * Find first `VNode` within the `BsTooltip` virtual-node subtree.
 *
 * @param instance   The tooltip component instance.
 * @param triggerEl  An element ID or element instance that can trigger the appearance of the tooltip.
 * @returns The DOM Element if found.
 */
function findActivatorElement(
  instance: ComponentInternalInstance,
  triggerEl?: string | Element | ComponentPublicInstance
): Element | null {
  if (triggerEl) {
    if (triggerEl instanceof Element) {
      return triggerEl;
    } else if (Helper.isObject(triggerEl) && '$el' in triggerEl) {
      return triggerEl.$el as Element;
    } else if (Helper.isString(triggerEl)) {
      const element = document.getElementById(triggerEl);
      if (element) {
        return element;
      }
    }
  }

  // Fallback to component instance
  const sibling = (instance.vnode.el as Element).nextElementSibling;
  if (sibling && !sibling.classList.contains(`${cssPrefix}tooltip`)) {
    // The child-element on "slot.default"
    return sibling;
  }

  let children = instance.subTree.children;

  if (children && Array.isArray(children) && children.length > 0) {
    children = (children[1] as VNode).children;

    if (children && Array.isArray(children) && children.length > 0) {
      // The child-element on "slot.default"
      return (children[0] as VNode).el as Element | null;
    }
  }

  return null;
}

export function useSetTooltipPosition(
  activatorRef: Ref<Element | null>,
  tooltipRef: Ref<Element | null>,
  tooltipArrowRef: Ref<Element | null>,
  placementRef: Ref<TPlacementPosition>
): void {
  const activatorEl = unref(activatorRef) as HTMLElement | null;
  const tooltipEl = unref(tooltipRef) as HTMLElement | null;
  const arrowEl = unref(tooltipArrowRef) as HTMLElement | null;

  if (!activatorEl || !tooltipEl) {
    return;
  }

  if (Helper.isFunction(tooltipEl['getBoundingClientRect'])) {
    const computed = useFloatingElement(
      tooltipEl,
      activatorEl,
      placementRef.value,
      SPACE,
      false,
      true,
      arrowEl
    );

    placementRef.value = computed.placement as TPlacementPosition;

    if (arrowEl && computed.arrow) {
      arrowEl.style.top = computed.arrow.top;
      arrowEl.style.bottom = computed.arrow.bottom;
      arrowEl.style.left = computed.arrow.left;
    }

    tooltipEl.style.top = computed.top;
    tooltipEl.style.bottom = computed.bottom;
    tooltipEl.style.left = computed.left;
    tooltipEl.style.height = computed.height;
  }
}

export function useAddTooltipListener(
  tooltipID: string,
  tooltipRef: Ref<Element | null>,
  tooltipArrowRef: Ref<Element | null>,
  activatorRef: Ref<Element | null>,
  placementRef: Ref<TPlacementPosition>,
  active: Ref<boolean>,
  disabled: Ref<boolean>,
  instance: ComponentInternalInstance | null,
  trigger?: string | Element | ComponentPublicInstance
): void {
  if (!instance) {
    return;
  }

  const showTooltip = () => {
    if (unref(disabled)) {
      return;
    }

    active.value = true;
    instance.emit('update:show', true);
    window.requestAnimationFrame(() => {
      useSetTooltipPosition(activatorRef, tooltipRef, tooltipArrowRef, placementRef);
    });
  };

  const hideTooltip = () => {
    Helper.defer(() => {
      active.value = false;
    }, 60);
    instance.emit('update:show', false);
  };

  const activatorEl = findActivatorElement(instance, trigger) as IHTMLElement | null;
  activatorRef.value = activatorEl;

  if (activatorEl) {
    // @ts-expect-error: Sets Aria on activator element
    activatorEl['aria-describedby'] = tooltipID;
    (activatorEl as IBindingElement).__mouseEvents = {
      mouseEnter: EventListener.listen(activatorEl, 'mouseenter', showTooltip),
      mouseLeave: EventListener.listen(activatorEl, 'mouseleave', hideTooltip),
      focus: EventListener.listen(activatorEl, 'focus', showTooltip),
      blur: EventListener.listen(activatorEl, 'blur', hideTooltip),
    } as IMouseEvents;
  }
}

export function useRemoveTooltipListener(activatorRef: Ref<Element | null>) {
  const activatorEl = unref(activatorRef) as IBindingElement | null;

  if (activatorEl) {
    const { mouseEnter, mouseLeave, focus, blur } = activatorEl.__mouseEvents as IMouseEvents;
    mouseEnter.remove();
    mouseLeave.remove();
    focus.remove();
    blur.remove();
    activatorEl.__mouseEvents = undefined;
  }
}
