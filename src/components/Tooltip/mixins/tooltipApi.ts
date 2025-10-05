import { cssPrefix } from '@/mixins/CommonApi.ts';
import { EventListener } from '@/mixins/DomHelper.ts';
import type { IBindingElement, IHTMLElement, IMouseEvents, TPlacementPosition } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComponentInternalInstance, ComponentPublicInstance, Ref, VNode } from 'vue';
import { unref } from 'vue';

const SPACE = 4;

/**
 * Calculate Tooltip left offset.
 *
 * @param placementRef Tooltip placement.
 * @param activatorEl  Activator Element
 * @param tooltipWidth Tooltip element width
 * @returns Tooltip left offset
 */
function tooltipLeftPosition(
  placementRef: Ref<TPlacementPosition>,
  activatorEl: Element,
  tooltipWidth: number
): number {
  const domRect = activatorEl.getBoundingClientRect();
  const parentRect = activatorEl.parentElement?.getBoundingClientRect();
  const maxLeft = window.innerWidth - tooltipWidth - SPACE;
  const plX = domRect.left - tooltipWidth - SPACE;
  const prX = domRect.left + domRect.width + SPACE;

  switch (placementRef.value) {
    case 'left':
      if (plX >= SPACE) {
        return plX;
      } else {
        placementRef.value = 'right';
        return prX;
      }
    case 'right':
      if (prX <= maxLeft) {
        return prX;
      } else {
        placementRef.value = 'left';
        return plX;
      }
    case 'top':
    case 'bottom':
    default:
      const tx =
        domRect.left +
        Math.min(domRect.width / 2, (parentRect?.width ?? domRect.width) / 2) -
        tooltipWidth / 2;
      return Math.min(maxLeft, tx);
  }
}

/**
 * Calculate Tooltip top offset.
 *
 * @param placementRef  Tooltip placement reference.
 * @param activatorEl   Activator Element
 * @param tooltipHeight Tooltip element height
 * @returns Tooltip top offset
 */
function tooltipTopPosition(
  placementRef: Ref<TPlacementPosition>,
  activatorEl: Element,
  tooltipHeight: number
): number {
  const domRect = activatorEl.getBoundingClientRect();
  const ptY = domRect.top - tooltipHeight - SPACE;
  const pbY = domRect.top + domRect.height + SPACE;

  switch (placementRef.value) {
    case 'top':
      if (ptY >= SPACE) {
        return ptY;
      } else {
        placementRef.value = 'bottom';
        return pbY;
      }
    case 'bottom':
      const maxY = domRect.bottom + tooltipHeight + SPACE;
      if (pbY + tooltipHeight <= maxY) {
        return pbY;
      } else {
        placementRef.value = 'top';
        return ptY;
      }
    case 'left':
    case 'right':
    default:
      return domRect.top + domRect.height / 2 - tooltipHeight / 2;
  }
}

function arrowLeftPosition(
  placement: TPlacementPosition,
  activatorEl: Element,
  arrowWidth: number
): number {
  const activatorRect = activatorEl.getBoundingClientRect();
  const parentRect = activatorEl.parentElement?.getBoundingClientRect();
  const maxWidth = window.innerWidth - activatorRect.left - SPACE;

  switch (placement) {
    case 'left':
      return activatorRect.left - SPACE;
    case 'right':
      return activatorRect.right + SPACE;
    case 'top':
    case 'bottom':
    default:
      const width = Math.min(maxWidth, activatorRect.width, parentRect?.width ?? maxWidth);
      return activatorRect.left + width / 2 - arrowWidth / 2;
  }
}

function arrowTopPosition(
  placement: TPlacementPosition,
  activatorEl: Element,
  arrowHeight: number
): number {
  const activatorRect = activatorEl.getBoundingClientRect();

  switch (placement) {
    case 'top':
      return activatorRect.top - arrowHeight - SPACE;
    case 'bottom':
      return activatorRect.bottom + SPACE;
    case 'left':
    case 'right':
    default:
      return activatorRect.top + (activatorRect.height / 2 - arrowHeight / 2);
  }
}

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
  const activatorEl = unref(activatorRef);
  const tooltipEl = unref(tooltipRef) as HTMLElement | null;
  const arrowEl = unref(tooltipArrowRef) as HTMLElement | null;

  if (!activatorEl || !tooltipEl) {
    return;
  }

  if (tooltipEl && Helper.isFunction(tooltipEl['getBoundingClientRect'])) {
    const tooltipRect = tooltipEl.getBoundingClientRect();

    tooltipEl.style.top = tooltipTopPosition(placementRef, activatorEl, tooltipRect.height) + 'px';
    tooltipEl.style.left = tooltipLeftPosition(placementRef, activatorEl, tooltipRect.width) + 'px';

    if (arrowEl) {
      const arrowRect = arrowEl.getBoundingClientRect();
      const px = arrowLeftPosition(unref(placementRef), activatorEl, arrowRect.width);
      const pY = arrowTopPosition(unref(placementRef), activatorEl, arrowRect.height);
      arrowEl.style.left = px > 0 ? `${px}px` : '';
      arrowEl.style.top = pY > 0 ? `${pY}px` : '';
    }
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
) {
  if (!instance) {
    return;
  }

  const showTooltip = () => {
    if (unref(disabled)) {
      return;
    }

    window.requestAnimationFrame(() => {
      useSetTooltipPosition(activatorRef, tooltipRef, tooltipArrowRef, placementRef);
      instance.emit('update:show', true);
      Helper.defer(() => {
        active.value = true;
      }, 60);
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
