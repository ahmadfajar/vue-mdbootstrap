import {TAvatarIconProps} from "../../Avatar/types";
import {DefineComponent} from "vue";

export declare type TAlertOptionProps = TAvatarIconProps & {
    color?: string;
    dismissible: boolean;
    filled: boolean;
    iconType?: string;
    iconVariant: string;
    modelValue: boolean;
    outlined: boolean;
    solidFill: boolean;
    transition: string;
    variant?: string;
}

export declare const BsAlert: DefineComponent<TAlertOptionProps>;
