import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';

export declare type TAppContainerOptionProps = {
    /**
     * Use document viewport height or not.
     */
    viewportHeight?: boolean;
    /**
     * Sets the element `ID` attribute. This property value is auto generate.
     */
    id?: string;
}

export declare type TContainerOptionProps = {
    /**
     * Mount this component as part of application container or just ordinary container.
     * If mount as part of application container, then it will adapt to `SideDrawer` and `Appbar` size.
     */
    app?: boolean;
    /**
     * Html tag used to render this component.
     */
    tag?: string;
}

export declare type TBsAppContainer = ComponentObjectPropsOptions<TAppContainerOptionProps>;

export declare type TBsContainer = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type TBsContent = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type AllowedContainerProps = AllowedComponentProps & ComponentCustomProps & VNodeProps & {
    onResize?: (target: HTMLElement) => void;
    '@resize'?: (target: HTMLElement) => void;
}

export declare const BsAppContainer: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TAppContainerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsContainer: {
    new(): {
        $props: AllowedContainerProps & TContainerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['resize'];
    };
};

export declare const BsContent: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TContainerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsContainerPlugin: Plugin;
