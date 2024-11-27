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
 * @param activatorEl  Activator Element
 * @param tooltipWidth Tooltip element width
 * @param placement    Tooltip placement.
 * @returns Tooltip left offset
 */
function getTooltipLeftPosition(
    activatorEl: Element,
    tooltipWidth: number,
    placement?: TPlacementPosition
) {
    const domRect = activatorEl.getBoundingClientRect();
    const parentRect = activatorEl.parentElement?.getBoundingClientRect();

    switch (placement) {
        case 'left':
            return domRect.left - tooltipWidth - SPACE;
        case 'right':
            return domRect.left + domRect.width + SPACE;
        case 'top':
        case 'bottom':
        default:
            return (
                domRect.left +
                Math.min(domRect.width / 2, (parentRect?.width ?? domRect.width) / 2) -
                tooltipWidth / 2
            );
    }
}

/**
 * Calculate Tooltip top offset.
 *
 * @param activatorEl   Activator Element
 * @param tooltipHeight Tooltip element height
 * @param placement     Tooltip placement.
 * @returns Tooltip top offset
 */
function getTooltipTopPosition(
    activatorEl: Element,
    tooltipHeight: number,
    placement?: TPlacementPosition
) {
    const rect = activatorEl.getBoundingClientRect();

    switch (placement) {
        case 'top':
            return rect.top - tooltipHeight - SPACE;
        case 'bottom':
            return rect.top + rect.height + SPACE;
        case 'left':
        case 'right':
        default:
            return rect.top + rect.height / 2 - tooltipHeight / 2;
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
    placement?: TPlacementPosition
): void {
    const activatorEl = unref(activatorRef) as Element | null;
    const tooltipEl = unref(tooltipRef) as HTMLElement | null;

    if (!activatorEl || !tooltipEl) {
        return;
    }

    if (tooltipEl && Helper.isFunction(tooltipEl.getBoundingClientRect)) {
        const tooltipRect = tooltipEl.getBoundingClientRect();

        tooltipEl.style.top =
            getTooltipTopPosition(activatorEl, tooltipRect.height, placement) + 'px';
        tooltipEl.style.left =
            getTooltipLeftPosition(activatorEl, tooltipRect.width, placement) + 'px';
    }
}

export function useAddTooltipListener(
    tooltipRef: Ref<Element | null>,
    activatorRef: Ref<Element | null>,
    active: Ref<boolean>,
    disabled: Ref<boolean>,
    instance: ComponentInternalInstance | null,
    trigger?: string | Element | ComponentPublicInstance,
    placement?: TPlacementPosition
) {
    if (!instance) {
        return;
    }

    const showTooltip = () => {
        if (unref(disabled)) {
            return;
        }

        window.requestAnimationFrame(() => {
            useSetTooltipPosition(activatorRef, tooltipRef, placement);
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
        const options = { capture: true, passive: false };

        (activatorEl as IBindingElement).__mouseEvents = {
            mouseEnter: EventListener.listen(activatorEl, 'mouseenter', showTooltip, options),
            mouseLeave: EventListener.listen(activatorEl, 'mouseleave', hideTooltip, options),
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
