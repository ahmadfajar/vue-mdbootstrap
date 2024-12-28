import { cssPrefix } from '@/mixins/CommonApi.ts';
import { EventListener } from '@/mixins/DomHelper.ts';
import type { IBindingElement, IEventResult, IHTMLElement, TPlacementPosition } from '@/types';
import Helper from '@/utils/Helper';
import type {
    ComponentInternalInstance,
    ComponentPublicInstance,
    Ref,
    VNode,
    VNodeArrayChildren,
} from 'vue';
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
function getTooltipLeftPosition(
    placementRef: Ref<TPlacementPosition>,
    activatorEl: Element,
    tooltipWidth: number
): number {
    const domRect = activatorEl.getBoundingClientRect();
    const parentRect = activatorEl.parentElement?.getBoundingClientRect();
    const maxLeft = window.innerWidth - SPACE - tooltipWidth;
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
function getTooltipTopPosition(
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

function getArrowLeftPosition(
    activatorEl: Element,
    tooltipEl: Element,
    placement?: TPlacementPosition
): number {
    const domRect = activatorEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const domWidth = domRect.width / 2;
    const arrow = 13 / 2;

    if (placement === 'top' || placement === 'bottom') {
        return domRect.left - tooltipRect.left + domWidth - arrow;
    }

    return 0;
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
            return triggerEl.$el;
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
        children = ((children as VNodeArrayChildren)[1] as VNode).children;

        if (children && Array.isArray(children) && children.length > 0) {
            // The child-element on "slot.default"
            return ((children as VNodeArrayChildren)[0] as VNode).el as Element | null;
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
    const activatorEl = unref(activatorRef) as Element | null;
    const tooltipEl = unref(tooltipRef) as HTMLElement | null;
    const arrowEl = unref(tooltipArrowRef) as HTMLElement | null;

    if (!activatorEl || !tooltipEl) {
        return;
    }

    if (tooltipEl && Helper.isFunction(tooltipEl.getBoundingClientRect)) {
        const tooltipRect = tooltipEl.getBoundingClientRect();

        tooltipEl.style.top =
            getTooltipTopPosition(placementRef, activatorEl, tooltipRect.height) + 'px';
        tooltipEl.style.left =
            getTooltipLeftPosition(placementRef, activatorEl, tooltipRect.width) + 'px';

        if (arrowEl) {
            const px = getArrowLeftPosition(activatorEl, tooltipEl, placementRef.value);
            arrowEl.style.left = px > 0 ? `${px}px` : '';
        }
    }
}

export function useAddTooltipListener(
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
            active.value = true;
        });
        // preventEventTarget(e);
    };
    const hideTooltip = () => {
        instance.emit('update:show', false);
        active.value = false;
    };

    const activatorEl = findActivatorElement(instance, trigger) as IHTMLElement | null;
    activatorRef.value = activatorEl;

    if (activatorEl) {
        // const options = { capture: true, passive: false };
        (activatorEl as IBindingElement).__mouseEvents = {
            mouseEnter: EventListener.listen(activatorEl, 'mouseenter', showTooltip),
            mouseLeave: EventListener.listen(activatorEl, 'mouseleave', hideTooltip),
            focus: EventListener.listen(activatorEl, 'focus', showTooltip),
            blur: EventListener.listen(activatorEl, 'blur', hideTooltip),
        };
    }
}

export function useRemoveTooltipListener(activatorRef: Ref<Element | null>) {
    const activatorEl = unref(activatorRef) as IBindingElement | null;

    if (activatorEl) {
        // @ts-ignore
        const { mouseEnter, mouseLeave, focus, blur } = activatorEl.__mouseEvents;
        (mouseEnter as IEventResult).remove();
        (mouseLeave as IEventResult).remove();
        (focus as IEventResult).remove();
        (blur as IEventResult).remove();
        activatorEl.__mouseEvents = undefined;
    }
}
