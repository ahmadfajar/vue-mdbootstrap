import {DefineComponent} from "vue";
import {TAvatarIconProps} from "../../Avatar/types";

export declare type TButtonInnerOptionProps = {
    dropdownToggle: boolean;
    iconMode: boolean;
    rippleOff: boolean;
}

export declare type TButtonOptionProps = TAvatarIconProps & {
    active: boolean;
    color: string;
    disabled: boolean;
    mode: string;
    dropdownToggle: boolean;
    flat: boolean;
    outlined: boolean;
    raised: boolean;
    rounded: boolean;
    pill: boolean;
    href?: string;
    size?: string;
    iconPosition: string;
    iconSize: number;
    rippleOff: boolean;
    transparent: boolean;
    type: string;
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

export declare type TToggleButtonOptionProps = {
    id: string;
    name?: string;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    items: Array<TInputOptionItem>;
    multiple: boolean;
    modelValue: string | number | boolean | Array<unknown>;
    flat: boolean;
    outlined: boolean;
    raised: boolean;
    rounded: boolean;
    pill: boolean;
    size?: string;
    color: string;
    toggleColor?: string;
    iconPosition?: string;
}

export declare const BsButtonInner: DefineComponent<TButtonInnerOptionProps>;

export declare const BsButton: DefineComponent<TButtonOptionProps>;

export declare const BsToggleButton: DefineComponent<TToggleButtonOptionProps>;
