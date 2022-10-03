import {ComponentPublicInstance, Fragment, h, Slots, Transition, TransitionProps, VNode, VNodeArrayChildren} from "vue";
import {TBreakpoint, TRecord} from "../types";
import Helper from "../utils/Helper";

export const cssPrefix = "md-";

export const isServer = typeof window === 'undefined';

/**
 * Generate component's ID.
 *
 * @returns {string} The generated ID
 */
export function useGenerateId(): string {
    return 'bs-' + Helper.uuid(true);
}

/**
 * Check whether IE browser is used or not.
 * @return {boolean} Returns `true` if IE browser is used otherwise `false`.
 */
export function useBrowserIE() {
    return !isServer && navigator.userAgent.toLowerCase().includes('trident');
}

/**
 * Simple function to render a slot with default VNode children.
 *
 * @param {Slots} slots                         The given slot
 * @param {string} name                         The slot name
 * @param {Object} props                        Fragment key identifier
 * @param {VNode|VNodeArrayChildren|string} [children] The VNode children
 * @param {*} [slotArgs] The argument for the given slot
 * @returns {VNode} The Rendered node.
 */
export function useRenderSlot(
    slots: Slots,
    name: string,
    props: Readonly<TRecord> = {},
    children?: VNode | VNodeArrayChildren | string,
    slotArgs?: unknown,
): VNode {
    // @ts-ignore
    const validSlot = slots && slots[name] && (slotArgs ? slots[name](slotArgs) : slots[name]());

    // @ts-ignore
    return h(Fragment,
        {key: props.key || `_${name}`},
        validSlot || children || [],
    );
}

/**
 * Simple function to render a slot with default VNode children inside a VNode wrapper.
 *
 * @param {Slots} slots                         The given slot
 * @param {string} name                         The slot name
 * @param {string} key                          Fragment key identifier
 * @param {string} wrapTag                      The VNode wrapper html Tag name
 * @param {Object} wrapProps                    The VNode wrapper properties
 * @param {VNode|VNodeArrayChildren} [children] The VNode children
 * @param {*} [slotArgs] The argument for the given slot
 * @returns {VNode} The Rendered node.
 */
export function useRenderSlotWithWrapper(
    slots: Slots,
    name: string,
    key: string,
    wrapTag = 'div',
    wrapProps: Readonly<TRecord> = {},
    children?: VNode | VNodeArrayChildren,
    slotArgs?: unknown,
): VNode {
    if (slots && slots[name]) {
        return h(wrapTag, wrapProps,
            // @ts-ignore
            slots[name] && (slotArgs ? slots[name](slotArgs) : slots[name]())
        );
    } else {
        return useRenderSlot(
            slots, name, {key: key},
            children ? h(wrapTag, wrapProps, children) : undefined,
            slotArgs,
        );
    }
}

/**
 * Simple function to render a slot with the given condition.
 *
 * @param {Slots} slots        The given slot
 * @param {string} name        The slot name
 * @param {boolean} condition  The given condition
 * @param {Object} wrapProps   The VNode wrapper properties
 * @param {string} [wrapTag]   The VNode wrapper html Tag name
 * @param {*} [slotArgs] The argument for the given slot
 * @returns {VNode} The Rendered node.
 */
export function useRenderSlotWrapperWithCondition(
    slots: Slots,
    name: string,
    condition: boolean,
    wrapProps: Readonly<TRecord> = {},
    wrapTag?: string,
    slotArgs?: unknown,
): VNode | undefined {
    return condition
        ? h(
            wrapTag || 'div', wrapProps,
            // @ts-ignore
            slots[name] && (slotArgs ? slots[name](slotArgs) : slots[name]())
        )
        : undefined;
}

/**
 * Simple function to render a Transition VNode.
 *
 * @param {TransitionProps} props               The transition properties
 * @param {VNode|VNodeArrayChildren} children   The child nodes
 * @returns {VNode} The Rendered node.
 */
export function useRenderTransition(
    props: Readonly<TransitionProps> = {},
    children: VNode | VNodeArrayChildren,
): VNode {
    return h(Transition, props, {
        default: () => children
    });
}

export function useMaxBreakpoint(breakpoint: TBreakpoint | number): boolean {
    switch (breakpoint) {
        case "sm":
            return window.matchMedia("(max-width: 767.98px)").matches;
        case "md":
            return window.matchMedia("(max-width: 991.98px)").matches;
        case "lg":
            return window.matchMedia("(max-width: 1199.98px)").matches;
        case "xl":
            return window.matchMedia("(max-width: 1399.98px)").matches;
        default:
            if (Helper.isNumber(breakpoint)) {
                return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
            }
            return true;
    }
}

export function useMinBreakpoint(breakpoint: TBreakpoint | number): boolean {
    switch (breakpoint) {
        case "sm":
            return window.matchMedia("(min-width: 576px)").matches;
        case "md":
            return window.matchMedia("(min-width: 768px)").matches;
        case "lg":
            return window.matchMedia("(min-width: 992px)").matches;
        case "xl":
        default:
            if (Helper.isNumber(breakpoint)) {
                return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
            }

            return window.matchMedia("(min-width: 1200px)").matches;
    }
}

export function useFindParentCmp(
    cmpNames: Array<string>,
    node: VNode, maxStep = 2
): ComponentPublicInstance | null | undefined {
    let step = 0;
    let iterator = node.component?.proxy?.$parent;

    while (iterator) {
        // if not found then stops.
        if (maxStep > 0 && step === (maxStep + 1)) {
            iterator = null;
            break;
        }
        // Found match $parent: stop iterate upward
        if (cmpNames.includes(iterator.$options._componentTag)) {
            break;
        }
        // Not found: iterate $parent and increase step counter
        ++step;
        iterator = iterator.$parent;
    }

    return iterator;
}
