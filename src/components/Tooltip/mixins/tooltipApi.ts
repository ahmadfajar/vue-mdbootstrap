import type { ComponentInternalInstance, Ref, VNode, VNodeArrayChildren } from "vue";
import { cssPrefix } from "../../../mixins/CommonApi";
import { EventListener } from "../../../mixins/DomHelper";
import type { IBindingElement, IEventResult, IHTMLElement, TPlacementPosition } from "../../../types";
import Helper from "../../../utils/Helper";

const SPACE = 4;

/**
 * Calculate Tooltip left offset.
 *
 * @param activatorEl Activator Element
 * @param width       Element width
 * @param placement   Tooltip placement.
 * @returns Tooltip left offset
 */
function getTooltipLeftPosition(
    activatorEl: Element,
    width: number,
    placement?: TPlacementPosition
) {
    const offset = activatorEl.getBoundingClientRect();

    switch (placement) {
        case "left":
            return offset.left - width - SPACE;
        case "right":
            return offset.left + offset.width + SPACE;
        case "top":
        case "bottom":
        default:
            return offset.left + (offset.width / 2) - (width / 2);
    }
}

/**
 * Calculate Tooltip top offset.
 *
 * @param activatorEl  Activator Element
 * @param height       Element height
 * @param placement    Tooltip placement.
 * @returns Tooltip top offset
 */
function getTooltipTopPosition(
    activatorEl: Element,
    height: number,
    placement?: TPlacementPosition
) {
    const rect = activatorEl.getBoundingClientRect();

    switch (placement) {
        case "top":
            return rect.top - height - SPACE;
        case "bottom":
            return rect.top + rect.height + SPACE;
        case "left":
        case "right":
        default:
            return rect.top + (rect.height / 2) - (height / 2);
    }
}

/**
 * Find first `VNode` within the `BsTooltip` virtual-node subtree.
 *
 * @param instance Component instance search starting point.
 * @returns The DOM Element if found.
 */
function findActivatorElement(instance: ComponentInternalInstance): Element | null {
    const sibling = (<Element>instance.vnode.el).nextElementSibling
    if (sibling && !sibling.classList.contains(`${cssPrefix}tooltip`)) {
        // The child-element on "slot.default"
        return sibling;
    }

    let children = instance.subTree.children;

    if (children && Array.isArray(children) && children.length > 0) {
        children = (<VNode>(<VNodeArrayChildren>children)[1]).children;
        if (children && Array.isArray(children) && children.length > 0) {
            // The child-element on "slot.default"
            return <Element>(<VNode>(<VNodeArrayChildren>children)[0]).el;
        }
    }

    return null;
}

export function useSetTooltipPosition(
    tooltipRef: Ref<Element | null>,
    instance?: ComponentInternalInstance | null,
    placement?: TPlacementPosition,
    isActive?: boolean
) {
    if (!tooltipRef.value || !instance || !isActive) {
        return;
    }

    const tooltipEl = <HTMLElement>tooltipRef.value;

    if (tooltipEl && Helper.isFunction(tooltipEl.getBoundingClientRect)) {
        const elRect = tooltipEl.getBoundingClientRect();
        const activatorEl = findActivatorElement(instance);

        if (activatorEl) {
            tooltipEl.style.top = getTooltipTopPosition(activatorEl, elRect.height, placement) + "px";
            tooltipEl.style.left = getTooltipLeftPosition(activatorEl, elRect.width, placement) + "px";
        }
    }
}

export function useAddTooltipListener(instance: ComponentInternalInstance | null, active: Ref<boolean>) {
    if (!instance) {
        return;
    }

    let timer: number | undefined;
    const showTooltip = (e: Event) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = Helper.defer(() => {
            instance.emit("update:show", true);
            active.value = true;
        }, 200);
        // e.preventDefault();
        e.stopPropagation();
    };
    const hideTooltip = () => {
        if (timer) {
            clearTimeout(timer);
        }

        instance.emit("update:show", false);
        active.value = false;
    };

    const activatorEl = <IHTMLElement | null>findActivatorElement(instance);

    if (activatorEl) {
        (<IBindingElement>activatorEl).__mouseEvents = {
            "mouseEnter": EventListener.listen(
                activatorEl, "mouseenter",
                showTooltip, { passive: true }
            ),
            "mouseLeave": EventListener.listen(
                activatorEl, "mouseleave",
                hideTooltip, { passive: true }
            )
        }
    }
}

export function useRemoveTooltipListener(instance?: ComponentInternalInstance | null) {
    if (instance) {
        const activatorEl = <IBindingElement>findActivatorElement(instance);
        if (activatorEl) {
            // @ts-ignore
            const { mouseEnter, mouseLeave } = activatorEl.__mouseEvents;
            (<IEventResult>mouseEnter).remove();
            (<IEventResult>mouseLeave).remove();
            activatorEl.__mouseEvents = undefined;
        }
    }
}
