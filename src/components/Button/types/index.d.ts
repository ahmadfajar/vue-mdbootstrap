import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TAvatarIconProps} from "../../Avatar/types";

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

export declare type TToggleButtonOptionProps = TBaseButtonProps & {
    id?: string;
    name?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    items: Array<TInputOptionItem>;
    multiple?: boolean;
    modelValue?: string | number | boolean | Array<unknown>;
    toggleColor?: string;
    iconPosition?: string;
}

export declare type TBsButtonInner = ComponentObjectPropsOptions<TButtonInnerOptionProps>;

export declare type TBsButton = ComponentObjectPropsOptions<TButtonOptionProps>;

export declare type TBsToggleButton = ComponentObjectPropsOptions<TToggleButtonOptionProps>;

export declare const BsButtonInner: DefineComponent<TBsButtonInner, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsButton: DefineComponent<TBsButton, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleButton: DefineComponent<TBsToggleButton, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
