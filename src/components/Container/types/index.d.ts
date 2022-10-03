import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TRecord} from "../../../types";

export declare type TAppContainerOptionProps = {
    viewportHeight?: boolean;
    id?: string;
}

export declare type TContainerOptionProps = {
    app?: boolean;
    tag?: string;
}

export declare type TBsAppContainer = ComponentObjectPropsOptions<TAppContainerOptionProps>;

export declare type TBsContainer = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type TBsContent = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare const BsAppContainer: DefineComponent<TBsAppContainer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsContainer: DefineComponent<TBsContainer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsContent: DefineComponent<TBsContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
