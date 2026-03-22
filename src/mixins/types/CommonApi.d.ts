import { AxiosInstance } from 'axios';
import { Ref, Slots, TransitionProps, VNode, VNodeArrayChildren } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import {
  INotificationProvider,
  TBreakpoint,
  TClassList,
  TRecord,
  TRouterLinkProps,
  TRouterOptionProps,
  TVueMdb,
} from '../../types';
import { IHttpService } from '../../utils/types/AxiosPlugin';

/**
 * Generate component's ID.
 *
 * @returns The generated ID
 */
export declare function useGenerateId(): string;

/**
 * Check whether it is using a mobile browser or not.
 *
 * @returns `true` if mobile browser is used otherwise `false`.
 */
export declare function useMobileDevice(): boolean;

/**
 * Simple function to render a VNode with custom slot.
 * If the custom slot doesn't exist or `undefined` 
 * then the default `children` will be rendered.
 *
 * @param slots    The slot instance
 * @param name     The slot name
 * @param props    VNode property, include slot identifier
 * @param children The default VNode children to replace the slot
 * @param slotArgs The argument for the given slot
 * @returns The rendered VNode.
 */
export declare function useRenderSlot(
  slots: Slots,
  name: string,
  props?: Readonly<TRecord>,
  children?: VNode | VNodeArrayChildren,
  slotArgs?: TRecord
): VNode;

/**
 * Simple function to render a VNode with custom slot and wrap it with the given 
 * `wrapperTag` and properties. If the custom slot doesn't exist or `undefined` then
 * the default `children` will be rendered inside the `wrapperTag`.
 *
 * @param slots        The slot instance
 * @param name         The slot name
 * @param key          Fragment key identifier
 * @param wrapperProps The VNode wrapper properties
 * @param children     The default VNode children to replace the slot
 * @param wrapperTag   Valid html tag name, default is `div`
 * @param slotArgs     The argument for the given slot
 * @returns The rendered VNode.
 */
export declare function useWrapSlot(
  slots: Slots,
  name: string,
  key: string,
  wrapperProps?: Readonly<TRecord>,
  children?: VNode | VNodeArrayChildren,
  wrapperTag?: string,
  slotArgs?: TRecord
): VNode;

/**
 * Simple function to render an HTML tag as VNode or render default slot and wrap 
 * an HTML tag around it.
 *
 * @param tag      Valid HTML tag name
 * @param slots    The slot instance
 * @param classes  Custom CSS classes to apply
 * @param styles   Custom inline stylesheet to apply
 * @returns The rendered VNode.
 */
export declare function useWrapSlotDefault(
  tag: string,
  slots?: Slots,
  classes?: TClassList,
  styles?: TRecord
): VNode;

/**
 * Simple function to render a VNode with custom slot and wrap it with the given
 * `wrapTag` and properties. The VNode will be rendered if the given `condition` is matched.
 *
 * @param slots      The slot instance
 * @param name       The slot name
 * @param condition  The given condition
 * @param wrapProps  The VNode wrapper properties
 * @param wrapTag    Valid html tag name, default is `div`
 * @param slotArgs   The argument for the given slot
 * @returns The rendered VNode.
 */
export declare function useWrapSlotWithCondition(
  slots: Slots,
  name: string,
  condition: boolean,
  wrapProps?: Readonly<TRecord>,
  wrapTag?: string,
  slotArgs?: TRecord
): VNode | undefined;

/**
 * Simple function to render a Transition VNode.
 *
 * @param props    The transition properties
 * @param children The child nodes
 * @param asBlock  Render the Transition as block VNode.
 * @returns The rendered VNode.
 */
export declare function useRenderTransition(
  props: Readonly<TransitionProps> | undefined,
  children: VNode | VNodeArrayChildren,
  asBlock?: boolean
): VNode;

/**
 * Simple function to render a RouterLink VNode.
 *
 * @param props    The RouterLink's component properties
 * @param children The child nodes
 * @returns The rendered VNode.
 */
export declare function useRenderRouter(
  props: Readonly<TRouterLinkProps>,
  children: VNode | VNodeArrayChildren | string
): VNode;

/**
 * Check if component instance has a `$router` and `path` property has been defined.
 *
 * @param props The component properties.
 * @returns TRUE when Router property
 */
export declare function useHasRouter(props: Readonly<TRouterOptionProps>): boolean;

/**
 * Check if component instance has `url` property been defined.
 *
 * @param props The component properties.
 * @returns TRUE when `url` property has been defined and doesn't have Router.
 */
export declare function useHasLink(props: Readonly<TRouterOptionProps>): boolean;

/**
 * Get current active route if exists.
 *
 * @returns The current route location.
 */
export declare function useCurrentRoute(): Ref<RouteLocationNormalizedLoaded> | undefined;

/**
 * Simple function to detect whether a device's screen is within allowable
 * maximum screen resolution. Returns `true` when the screen resolution is within 
 * allowable resolution otherwise `false`. Available breakpoints are: 
 * `xs`, `sm`, `md`, `lg`, and `xl`.
 *
 * @param breakpoint Allowable maximum screen resolution.
 * @returns TRUE when the screen resolution is within allowable resolution.
 */
export declare function useBreakpointMax(breakpoint: TBreakpoint | number): boolean;

/**
 * Simple function to detect whether a device's screen is within allowable
 * minimum screen resolution. Returns `true` when the screen resolution is within 
 * allowable resolution otherwise `false`. Available breakpoints are: 
 * `xs`, `sm`, `md`, `lg`, and `xl`. 
 *
 * @param breakpoint Allowable minimum screen resolution.
 * @returns TRUE when the screen resolution is within allowable resolution.
 */
export declare function useBreakpointMin(breakpoint: TBreakpoint | number): boolean;

/**
 * Merge one or more CSS classes.
 *
 * @param args The CSS classes to be merged.
 */
export declare function useMergeClass(...args: (string | string[])[]): string[];

/**
 * Retrieve axios plugin instance. Must be called within component and after
 * it instantiate. For example, called within `onMounted` event.
 *
 * @returns Axios instance when the component instance is resolved.
 */
export declare function useAxiosPlugin(): AxiosInstance | undefined;

/**
 * Retrieve HTTP service plugin instance. Must be called within component and after
 * it instantiate. For example, called within `onMounted` event.
 *
 * @returns Axios instance when the component instance is resolved.
 */
export declare function useHttpService(): IHttpService | undefined;

/**
 * Shortcut to retrieve the VueMdb plugin instance.
 *
 * @returns The VueMdb plugin instance.
 */
export declare function useVueMdbService(): TVueMdb | undefined;

/**
 * Shortcut to retrieve NotificationProvider instance.
 *
 * @returns The notification provider instance.
 */
export declare function useVueMdbNotification(): INotificationProvider | undefined;
