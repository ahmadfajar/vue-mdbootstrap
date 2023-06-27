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

export declare type TAppContainerOptionProps = {
    /**
     * Use document viewport height or not.
     */
    viewportHeight?: boolean;
    /**
     * Sets the element `ID` attribute. This property value is auto generates.
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

export declare const BsAppContainer: DefineComponent<TBsAppContainer, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsContainer: DefineComponent<TBsContainer, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsContent: DefineComponent<TBsContent, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsContainerPlugin: Plugin;
