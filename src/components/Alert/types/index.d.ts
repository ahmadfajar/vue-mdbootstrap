import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TAvatarIconProps} from "../../Avatar/types";
import {TRecord} from "../../../types";

export declare type TAlertOptionProps = TAvatarIconProps & {
    color?: string;
    dismissible?: boolean;
    filled?: boolean;
    iconType?: string;
    iconVariant?: string;
    modelValue?: boolean;
    outlined?: boolean;
    solidFill?: boolean;
    transition?: string;
    variant?: string;
}

export declare type TBsAlert = ComponentObjectPropsOptions<TAlertOptionProps>;

export declare const BsAlert: DefineComponent<TBsAlert, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;