import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';

export declare type TAppbarOptionProps = {
    /**
     * Cut off the left side of the component.
     */
    clippedLeft?: boolean;
    /**
     * Cut off the right side of the component.
     */
    clippedRight?: boolean;
    /**
     * Placed `Appbar` fixed at the top of the page.
     * See [Bootstrap Position](https://getbootstrap.com/docs/5.3/helpers/position/) documentation.
     */
    fixedTop?: boolean;
    /**
     * Always stick `Appbar` at top of the page.
     * See [Bootstrap Position](https://getbootstrap.com/docs/5.3/helpers/position/) documentation.
     */
    stickyTop?: boolean;
    /**
     * Add shadow effect to this component.
     */
    shadow?: boolean;
    /**
     * Html tag used to render this component.
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

export declare const BsAppbarPlugin: Plugin;
