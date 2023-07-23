import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';

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
     * Placed `Appbar` fixed at the top of the page.
     * See {@link [Bootstrap](https://getbootstrap.com/docs/5.3/helpers/position/)}
     */
    fixedTop?: boolean;
    /**
     * Always stick `Appbar` at top of the page.
     * See {@link [Bootstrap](https://getbootstrap.com/docs/5.3/helpers/position/)}
     */
    stickyTop?: boolean;
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

declare type AllowedAppbarProps = AllowedComponentProps & ComponentCustomProps & VNodeProps & {
    onResize?: (target: HTMLElement) => void;
}

export declare const BsAppbar: {
    new(): {
        $props: AllowedAppbarProps & TAppbarOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['resize'];
    };
};

export declare const BsAppbarTitle: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TAppbarTitleOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsAppbarItems: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsAppbarPlugin: {
    new(): Plugin;
};
