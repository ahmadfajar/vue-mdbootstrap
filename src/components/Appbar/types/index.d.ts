import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TRecord} from "../../../types";

export declare type TAppbarOptionProps = {
    clippedLeft?: boolean;
    clippedRight?: boolean;
    fixedTop?: boolean;
    shadow?: boolean;
    tag?: string;
}

export declare type TAppbarTitleOptionProps = {
    title?: string;
}

export declare type TBsAppbar = ComponentObjectPropsOptions<TAppbarOptionProps>;

export declare type TBsAppbarTitle = ComponentObjectPropsOptions<TAppbarTitleOptionProps>;

export declare const BsAppbar: DefineComponent<TBsAppbar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsAppbarTitle: DefineComponent<TBsAppbarTitle, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
