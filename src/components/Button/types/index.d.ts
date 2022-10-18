import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TAvatarIconProps, TInputBaseProps, TRecord} from "../../../types";

export declare type TButtonInnerOptionProps = {
    dropdownToggle?: boolean;
    hasIcon?: boolean;
    iconMode?: boolean;
    rippleOff?: boolean;
    tagName?: string;
}

export declare type TBaseButtonProps = {
    color?: string;
    flat?: boolean;
    outlined?: boolean;
    raised?: boolean;
    rounded?: boolean;
    pill?: boolean;
    size?: string;
}

export declare type TButtonOptionProps = TAvatarIconProps & TBaseButtonProps & {
    active?: boolean;
    disabled?: boolean;
    mode?: string;
    dropdownToggle?: boolean;
    href?: string;
    iconPosition?: string;
    iconSize?: string | number;
    rippleOff?: boolean;
    transparent?: boolean;
    type?: string;
}

export declare type TInputOptionItem = TAvatarIconProps & {
    id?: string;
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    value: string | number | boolean;
    label: string;
    iconSize?: number;
}

export declare type TToggleButtonOptionProps = TInputBaseProps & TBaseButtonProps & {
    items: Array<TInputOptionItem>;
    multiple?: boolean;
    modelValue?: string | number | boolean | Array<unknown>;
    toggleColor?: string;
    iconPosition?: string;
}

export declare type TBsButtonInner = ComponentObjectPropsOptions<TButtonInnerOptionProps>;

export declare type TBsButton = ComponentObjectPropsOptions<TButtonOptionProps>;

export declare type TBsToggleButton = ComponentObjectPropsOptions<TToggleButtonOptionProps>;

export declare const BsButtonInner: DefineComponent<TBsButtonInner, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsButton: DefineComponent<TBsButton, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleButton: DefineComponent<TBsToggleButton, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
