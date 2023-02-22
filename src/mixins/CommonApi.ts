import type {ComponentInternalInstance, Ref, Slots, TransitionProps, VNode, VNodeArrayChildren} from "vue";
import {createVNode, Fragment, getCurrentInstance, h, normalizeClass, resolveComponent, Transition} from "vue";
import type {RouteLocationNormalizedLoaded} from "vue-router";
import type {TBreakpoint, TRecord, TRouterLinkProps, TRouterOptionProps} from "../types";
import Helper from "../utils/Helper";

export const cssPrefix = "md-";

export const isServer = typeof window === "undefined";

/**
 * Generate component's ID.
 *
 * @returns {string} The generated ID
 */
export function useGenerateId(): string {
    return "bs-" + Helper.uuid(true);
}

/**
 * Check whether IE browser is used or not.
 *
 * @return {boolean} Returns `true` if IE browser is used otherwise `false`.
 */
export function useBrowserIE(): boolean {
    return !isServer && navigator.userAgent.toLowerCase().includes("trident");
}

/**
 * Simple function to render a VNode children within a given slot name
 * if the given slot doesn't contain any VNode child.
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
    props: Readonly<TRecord> = {},
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

export function useSimpleRenderWithSlots(
    tag: string,
    slots?: Slots,
    classes?: string | Array<string> | TRecord,
    styles?: string | Array<string> | TRecord,
): VNode {
    return h(
        tag, {class: classes, style: styles},
        slots ? slots.default && slots.default() : undefined,
    )
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

/**
 * Simple function to render a RouterLink VNode.
 *
 * @param {TRouterLinkProps} props            The RouterLink's component properties
 * @param {VNode|VNodeArrayChildren} children The child nodes
 * @returns {VNode} The Rendered node.
 */
export function useRenderRouter(
    props: Readonly<TRouterLinkProps>,
    children: VNode | VNodeArrayChildren,
): VNode {
    const routerLinkCmp = resolveComponent("RouterLink");
    return createVNode(routerLinkCmp, props, {
        default: () => children
    });
}

/**
 * Check if component instance has a `$router` and `path` property has been defined.
 *
 * @param {TRouterOptionProps} props The component properties.
 * @returns {boolean} TRUE when Router property
 */
export function useHasRouter(props: Readonly<TRouterOptionProps>): boolean {
    const vm = getCurrentInstance();
    return vm !== null && !Helper.isEmpty(props.path) &&
        ((vm.appContext.config.globalProperties.$router !== null) ||
            (vm.appContext.config.globalProperties.$route !== null));
}

/**
 * Check if component instance has `url` property been defined.
 *
 * @param {TRouterOptionProps} props The component properties.
 * @returns {boolean} TRUE when `url` property has been defined and doesn't have Router.
 */
export function useHasLink(props: Readonly<TRouterOptionProps>): boolean {
    return !useHasRouter(props) && !Helper.isEmpty(props.url);
}

/**
 * Get current active route if exists.
 *
 * @returns {Ref} Current route location.
 */
export function useGetCurrentRoute(): Ref<RouteLocationNormalizedLoaded> | undefined {
    const vm = getCurrentInstance();
    if (vm !== null) {
        return vm.appContext.config.globalProperties.$router?.currentRoute;
    }

    return undefined;
}

/**
 * Simple function to detect whether a device's screen is within allowable
 * maximum screen resolution.
 *
 * @param {TBreakpoint|number} breakpoint Allowable maximum screen resolution.
 * @returns {boolean} TRUE when the screen resolution is within allowable resolution.
 */
export function useBreakpointMax(breakpoint: TBreakpoint | number): boolean {
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

/**
 * Simple function to detect whether a device's screen is within allowable
 * minimum screen resolution.
 *
 * @param {TBreakpoint|number} breakpoint Allowable minimum screen resolution.
 * @returns {boolean} TRUE when the screen resolution is within allowable resolution.
 */
export function useBreakpointMin(breakpoint: TBreakpoint | number): boolean {
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
                return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
            }

            return window.matchMedia("(min-width: 1200px)").matches;
    }
}

export function useFindParentCmp(
    cmpNames: Array<string>,
    instance: ComponentInternalInstance | null,
    maxStep = 2
): ComponentInternalInstance | undefined | null {
    if (instance) {
        let step = 0;
        let iterator = instance.parent;

        while (iterator) {
            // if not found then stops.
            if (maxStep > 0 && step === (maxStep + 1)) {
                iterator = null;
                break;
            }
            // Found match parent: stop iterate upward
            if (cmpNames.includes((<string>iterator.type.name))) {
                break;
            }
            // Not found: iterate $parent and increase step counter
            ++step;
            iterator = iterator.parent;
        }

        return iterator;
    }

    return null;
}

export function useMergeClass(...args: (string | string[])[]): string[] {
    let result: string[] = [];

    for (let i = 0; i < args.length; i++) {
        const src = args[i];
        if (!Helper.isEmpty(src) && Array.isArray(src)) {
            result = result.concat(src);
        } else if (!Helper.isEmpty(src) && Helper.isString(src)) {
            result.push(<string>src);
        } else {
            const normalized = normalizeClass(src);
            result.push(normalized);
        }
    }

    return result;
}
