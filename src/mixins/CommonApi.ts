import {Fragment, h, Slots, VNode, VNodeArrayChildren} from "vue";
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
 * Simple function to render a slot with default value.
 *
 * @param {Slots} slots The given slot
 * @param {string} name The slot name
 * @param {Object} props Fragment key identifier
 * @param {VNode|VNodeArrayChildren} [fallback] The default value as fallback
 * @param {*} [slotArgs] The argument for the given slot
 * @returns {VNode} The Rendered node.
 */
export function useRenderSlot(
    slots: Slots,
    name: string,
    props: Readonly<Record<string, unknown>> = {},
    fallback?: VNode | VNodeArrayChildren,
    slotArgs?: unknown,
): VNode {
    // @ts-ignore
    const validSlot = slots && slots[name] && (slotArgs ? slots[name](slotArgs) : slots[name]());

    // @ts-ignore
    return h(Fragment,
        {key: props.key || `_${name}`},
        validSlot || fallback || [],
    );
}
