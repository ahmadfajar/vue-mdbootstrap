import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin
} from 'vue';
import type { TRecord } from '../../../types';

export declare type TAppbarOptionProps = {
    /**
     * Clipped left side of this `Appbar` or not.
     */
    clippedLeft?: boolean;
    /**
     * Clipped right side of this `Appbar` or not.
     */
    clippedRight?: boolean;
    /**
     * Always stick `Appbar` at top of the page even though user already scrolled down.
     */
    fixedTop?: boolean;
    /**
     * Create shadow effect at the bottom of `Appbar`.
     */
    shadow?: boolean;
    /**
     * Html tag used to create this Appbar.
     */
    tag?: string;
}

export declare type TAppbarTitleOptionProps = {
    /**
     * The text to display.
     */
    title?: string;
}

export declare type TBsAppbar = ComponentObjectPropsOptions<TAppbarOptionProps>;

export declare type TBsAppbarTitle = ComponentObjectPropsOptions<TAppbarTitleOptionProps>;

export declare const BsAppbar: DefineComponent<TBsAppbar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsAppbarTitle: DefineComponent<TBsAppbarTitle, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsAppbarPlugin: Plugin;
