import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';

export declare type TAppContainerOptionProps = {
    /**
     * Sets the element `ID` attribute. This property value is auto generate.
     */
    id?: string;
    /**
     * Use document viewport height or not.
     */
    viewportHeight?: boolean;
};

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
};

export declare type TBsAppContainer = ComponentObjectPropsOptions<TAppContainerOptionProps>;

export declare type TBsContainer = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type TBsContent = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type AllowedContainerProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps & {
        onResize?: (target: HTMLElement) => void;
        '@resize'?: (target: HTMLElement) => void;
    };

export declare interface _BsApp {
    new (): {
        $props: AllowedComponentProps &
            ComponentCustomProps &
            VNodeProps &
            TAppContainerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
}

export declare const BsApp: _BsApp;

/**
 * @deprecated use `<BsApp>` instead.
 */
export declare const BsAppContainer: _BsApp;

export declare const BsContainer: {
    new (): {
        $props: AllowedContainerProps & TContainerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: ['resize'];
    };
};

export declare const BsContent: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TContainerOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsContainerPlugin: ObjectPlugin;
