import type { AxiosInstance } from 'axios';
import type {
    ComponentInternalInstance,
    Ref,
    ShallowRef,
    Slots,
    TransitionProps,
    VNode,
    VNodeArrayChildren,
} from 'vue';
import {
    createBlock,
    createCommentVNode,
    createVNode,
    getCurrentInstance,
    h,
    normalizeClass,
    openBlock,
    renderSlot,
    resolveComponent,
    Transition,
    unref,
    withCtx,
} from 'vue';
import type {
    RouteLocationAsRelativeGeneric,
    RouteLocationNormalizedLoaded,
    RouteRecordRaw,
} from 'vue-router';
import type {
    IHttpService,
    INotificationProvider,
    TBreakpoint,
    TRecord,
    TRouterLinkProps,
    TRouterOptionProps,
    TVueMdb,
} from '../types';
import Helper from '../utils/Helper';

export const cssPrefix = 'md-';

export const isServer = typeof window == 'undefined';

/**
 * Generate component's ID.
 *
 * @returns The generated ID
 */
export function useGenerateId(): string {
    return 'bs-' + Helper.uuid(true);
}

/**
 * Check whether IE browser is used or not.
 *
 * @returns `true` if IE browser is used otherwise `false`.
 */
export function useBrowserIE(): boolean {
    return !isServer && navigator.userAgent.toLowerCase().includes('trident');
}

/**
 * Check whether it is using a mobile browser or not.
 *
 * @returns `true` if mobile browser is used otherwise `false`.
 */
export function useMobileDevice(): boolean {
    return !isServer && navigator.userAgent.toLowerCase().match(/mobile/i) != null;
}

/**
 * Simple function to render a VNode with custom slot.
 * If the custom slot doesn't exist or `undefined` then
 * render default `children`.
 *
 * @param slots    The slot instance
 * @param name     The slot name
 * @param props    VNode property, include slot identifier
 * @param children The VNode children
 * @param slotArgs The argument for the given slot
 * @returns The Rendered node.
 */
export function useRenderSlot(
    slots: Slots,
    name: string,
    props: Readonly<TRecord> = {},
    children?: VNodeArrayChildren | VNode,
    slotArgs?: TRecord
): VNode {
    const slotProps = {
        ...slotArgs,
        ...props,
    } as TRecord;
    const fallback = children ? () => (Array.isArray(children) ? children : [children]) : undefined;

    return renderSlot(slots, name, slotProps, fallback);
}

/**
 * Simple function to render an HTML tag as VNode and apply default slot to its child.
 *
 * @param tag      Valid HTML tag name
 * @param slots    The slot instance
 * @param classes  Custom css classes to apply
 * @param styles   Custom inline stylesheet to apply
 */
export function useRenderSlotDefault(
    tag: string,
    slots?: Slots,
    classes?: string | string[] | TRecord,
    styles?: TRecord
): VNode {
    return slots
        ? h(tag, { class: classes, style: styles }, renderSlot(slots, 'default'))
        : h(tag, { class: classes, style: styles });
}

/**
 * Simple function to render a VNode with custom slot and wrap it
 * with the given `wrapperTag` and properties.
 * If the custom slot doesn't exist or `undefined` then
 * render default `children` inside the `wrapperTag`.
 *
 * @param slots        The slot instance
 * @param name         The slot name
 * @param key          Fragment key identifier
 * @param wrapperProps The VNode wrapper properties
 * @param children     The VNode children
 * @param wrapperTag   Valid html tag name
 * @param slotArgs     The argument for the given slot
 * @returns The Rendered node.
 */
export function useRenderSlotWithWrapper(
    slots: Slots,
    name: string,
    key: string,
    wrapperProps: Readonly<TRecord> = {},
    children?: VNodeArrayChildren | VNode,
    wrapperTag = 'div',
    slotArgs?: TRecord
): VNode {
    if (slots[name] != null || children) {
        return h(
            wrapperTag,
            wrapperProps,
            useRenderSlot(slots, name, { key: key }, children, slotArgs)
        );
    } else {
        return createCommentVNode(` v-if-${name} `);
    }
}

/**
 * Simple function to render a VNode with custom slot and wrap it
 * with the given `wrapTag` and properties only if the `condition` is match.
 *
 * @param slots      The slot instance
 * @param name       The slot name
 * @param condition  The given condition
 * @param wrapProps  The VNode wrapper properties
 * @param wrapTag    Valid html tag name
 * @param slotArgs   The argument for the given slot
 * @returns The Rendered node.
 */
export function useRenderSlotWrapperWithCondition(
    slots: Slots,
    name: string,
    condition: boolean,
    wrapProps: Readonly<TRecord> = {},
    wrapTag?: string,
    slotArgs?: TRecord
): VNode | undefined {
    return condition
        ? h(wrapTag || 'div', wrapProps, renderSlot(slots, name, slotArgs))
        : undefined;
}

/**
 * Simple function to render a Transition VNode.
 *
 * @param props    The transition properties
 * @param children The child nodes
 * @param asBlock  Render the Transition as block VNode.
 * @returns The Rendered node.
 */
export function useRenderTransition(
    props: Readonly<TransitionProps> = {},
    children: VNodeArrayChildren | VNode,
    asBlock?: boolean
): VNode {
    if (asBlock) {
        return (
            openBlock(),
            createBlock(Transition, props, {
                default: withCtx(() => (Array.isArray(children) ? children : [children])),
            })
        );
    } else {
        return h(Transition, props, {
            default: () => children,
        });
    }
}

/**
 * Simple function to render a RouterLink VNode.
 *
 * @param props    The RouterLink's component properties
 * @param children The child nodes
 * @returns The Rendered node.
 */
export function useRenderRouter(
    props: Readonly<TRouterLinkProps>,
    children: VNodeArrayChildren | VNode
): VNode {
    const routerLinkCmp = resolveComponent('RouterLink');
    return createVNode(routerLinkCmp, props, {
        default: () => children,
    });
}

/**
 * Check if `$router` exists within the application context and one of component
 * property that related to `<RouterLink>` has been defined.
 *
 * @param props The component properties.
 * @returns TRUE when Router property
 */
export function useHasRouter(props: Readonly<TRouterOptionProps>): boolean {
    const vm = getCurrentInstance();
    return (
        vm != null &&
        (!Helper.isEmpty(props.path) ||
            !Helper.isEmpty(props.pathName) ||
            Helper.isObject(props.location)) &&
        (vm.appContext.config.globalProperties.$router != null ||
            vm.appContext.config.globalProperties.$route != null)
    );
}

/**
 * Check if component instance has `url` property been defined.
 *
 * @param props The component properties.
 * @returns TRUE when `url` property has been defined and doesn't have Router.
 */
export function useHasLink(props: Readonly<TRouterOptionProps>): boolean {
    return !useHasRouter(props) && !Helper.isEmpty(props.url);
}

/**
 * Get current active route if exists.
 *
 * @returns The current route location.
 */
export function useCurrentRoute(): Ref<RouteLocationNormalizedLoaded> | undefined {
    const vm = getCurrentInstance();
    return vm?.appContext.config.globalProperties.$router?.currentRoute;
}

/**
 * Find a route from the existing loaded routes.
 *
 * @param vm     Component internal instance
 * @param search The route name to search
 */
function findRouteByName(vm: ShallowRef<ComponentInternalInstance | null>, search: string) {
    const router = vm.value?.appContext.config.globalProperties.$router;
    const routes = router?.getRoutes();
    // console.log('routes:', routes);

    const findMatches = (children: RouteRecordRaw[]) =>
        children.find((it): boolean => {
            if (it.name === search) {
                return true;
            } else if (it.children && it.children.length > 0) {
                return !!findMatches(it.children);
            }

            return false;
        });

    return routes?.find((it): boolean => {
        if (it.name === search) {
            return true;
        } else if (it.children.length > 0) {
            return !!findMatches(it.children);
        }
        return false;
    });
}

/**
 * Check if a location match the current route.
 *
 * @param vm        Component internal instance
 * @param route     Current route to check
 * @param location  The location to check
 * @returns TRUE if all property of `location` match with the given `route`.
 */
function isRouteMatchByLocation(
    vm: ShallowRef<ComponentInternalInstance | null>,
    route: RouteLocationNormalizedLoaded,
    location?: RouteLocationAsRelativeGeneric
): boolean {
    if (!location) {
        return false;
    }

    if (
        location.path === route.path ||
        (location.path &&
            (route.path.startsWith(`${location.path}/`) ||
                route.path.startsWith(`${location.path}?`)))
    ) {
        return true;
    }

    if (location.name) {
        if (location.params) {
            const entries1 = Object.entries(route.params);
            const entries2 = Object.entries(location.params as object);

            const found = entries1.every((el1): boolean => {
                return entries2.some((el2): boolean => {
                    return el1[0] == el2[0] && el1[1] == el2[1];
                });
            });

            if (found && route.name === location.name) {
                return true;
            }
        }

        if (route.name === location.name) {
            return true;
        }

        // fallback using partial match
        const result = findRouteByName(vm, location.name.toString());
        // console.log('found-route:', result);
        if (result) {
            return (
                result.path === route.path ||
                route.path.startsWith(`${result.path}/`) ||
                route.path.startsWith(`${result.path}?`)
            );
        }
    }

    return false;
}

/**
 * Check if the given route match the navigation component.
 *
 * @param vm        Component internal instance
 * @param route     Current route to check
 * @param navTarget The navigation properties
 */
export function useIsRouteMatch(
    vm: ShallowRef<ComponentInternalInstance | null>,
    route: Ref<RouteLocationNormalizedLoaded>,
    navTarget: TRouterOptionProps
): boolean {
    const _route = unref(route);

    if (
        navTarget.path === _route.path ||
        (navTarget.path &&
            (_route.path.startsWith(`${navTarget.path}/`) ||
                _route.path.startsWith(`${navTarget.path}?`)))
    ) {
        return true;
    }
    if (navTarget.pathName) {
        if (_route.name === navTarget.pathName) {
            return true;
        }

        // fallback using partial match
        const result = findRouteByName(vm, navTarget.pathName);
        // console.log('found-route:', result);
        if (result) {
            return (
                result.path === _route.path ||
                _route.path.startsWith(`${result.path}/`) ||
                _route.path.startsWith(`${result.path}?`)
            );
        }
    }

    return isRouteMatchByLocation(vm, _route, navTarget.location);
}

/**
 * Simple function to detect whether a device's screen is within allowable
 * maximum screen resolution.
 *
 * @param breakpoint Allowable maximum screen resolution.
 * @returns TRUE when the screen resolution is within allowable resolution.
 */
export function useBreakpointMax(breakpoint: TBreakpoint | number): boolean {
    switch (breakpoint) {
        case 'xs':
            return window.matchMedia('(max-width: 575.98px)').matches;
        case 'sm':
            return window.matchMedia('(max-width: 767.98px)').matches;
        case 'md':
            return window.matchMedia('(max-width: 991.98px)').matches;
        case 'lg':
            return window.matchMedia('(max-width: 1199.98px)').matches;
        case 'xl':
            return window.matchMedia('(max-width: 1399.98px)').matches;
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
 * @param breakpoint Allowable minimum screen resolution.
 * @returns TRUE when the screen resolution is within allowable resolution.
 */
export function useBreakpointMin(breakpoint: TBreakpoint | number): boolean {
    switch (breakpoint) {
        case 'sm':
            return window.matchMedia('(min-width: 576px)').matches;
        case 'md':
            return window.matchMedia('(min-width: 768px)').matches;
        case 'lg':
            return window.matchMedia('(min-width: 992px)').matches;
        case 'xl':
        default:
            if (Helper.isNumber(breakpoint)) {
                return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
            }

            return window.matchMedia('(min-width: 1200px)').matches;
    }
}

export function useFindParentCmp(
    cmpNames: Array<string>,
    maxStep = 2,
    instance?: ComponentInternalInstance | null
): ComponentInternalInstance | undefined | null {
    const vm = instance ?? getCurrentInstance();

    if (vm) {
        let step = 0;
        let iterator = vm.parent;

        while (iterator) {
            // if not found then stops.
            if (maxStep > 0 && step === maxStep + 1) {
                iterator = null;
                break;
            }
            // Found match parent: stop iterate upward
            if (cmpNames.includes(iterator.type.name as string)) {
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

/**
 * Merge one or more css classes.
 *
 * @param args The css classes to be merged.
 */
export function useMergeClass(...args: (string | string[])[]): string[] {
    let result: string[] = [];

    for (let i = 0; i < args.length; i++) {
        const src = args[i];
        if (!Helper.isEmpty(src) && Array.isArray(src)) {
            result = result.concat(src);
        } else if (Helper.isString(src) && !Helper.isEmpty(src)) {
            result.push(src);
        } else {
            result.push(normalizeClass(src));
        }
    }

    return result;
}

/**
 * Retrieve axios plugin instance. Must be called within component and after
 * it instantiate. For example, called within `onMounted` event.
 *
 * @returns Axios instance when the component instance is resolved.
 */
export function useAxiosPlugin(): AxiosInstance | undefined {
    const vm = getCurrentInstance();
    return vm?.appContext.config.globalProperties.$axios;
}

/**
 * Retrieve HTTP service plugin instance. Must be called within component and after
 * it instantiate. For example, called within `onMounted` event.
 *
 * @returns Axios instance when the component instance is resolved.
 */
export function useHttpService(): IHttpService | undefined {
    const vm = getCurrentInstance();
    return vm?.appContext.config.globalProperties.$http;
}

/**
 * Shortcut to retrieve the VueMdb plugin instance.
 *
 * @returns The VueMdb plugin instance.
 */
export function useVueMdbService(): TVueMdb | undefined {
    const vm = getCurrentInstance();
    return vm?.appContext.config.globalProperties.$VueMdb;
}

/**
 * Shortcut to retrieve NotificationProvider instance.
 *
 * @returns The notification provider instance.
 */
export function useVueMdbNotification(): INotificationProvider | undefined {
    const vm = getCurrentInstance();
    return vm?.appContext.config.globalProperties.$VueMdb.notification;
}
