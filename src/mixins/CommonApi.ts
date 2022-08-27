import {Fragment, h, Slots, Transition, VNode, VNodeArrayChildren, TransitionProps} from "vue";
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
 * @param {VNode|VNodeArrayChildren} [children] The VNode children
 * @param {*} [slotArgs] The argument for the given slot
 * @returns {VNode} The Rendered node.
 */
export function useRenderSlot(
    slots: Slots,
    name: string,
    props: Readonly<Record<string, unknown>> = {},
    children?: VNode | VNodeArrayChildren,
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
    wrapProps: Readonly<Record<string, unknown>> = {},
    children?: VNode | VNodeArrayChildren,
    slotArgs?: unknown,
) {
    if (slots && slots[name]) {
        return h(wrapTag, wrapProps,
            // @ts-ignore
            name && slots[name] && (slotArgs ? slots[name](slotArgs) : slots[name]())
        );
    } else {
        return useRenderSlot(
            slots, name, {key: key},
            h(wrapTag, wrapProps, children || []),
            slotArgs,
        );
    }
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
