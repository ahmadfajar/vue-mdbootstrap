import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TAvatarIconProps, TIconVariant, TRecord} from "../../../types";

export declare type TAlertOptionProps = TAvatarIconProps & {
    color?: string;
    dismissible?: boolean;
    filled?: boolean;
    iconType?: string;
    iconVariant?: TIconVariant;
    modelValue?: boolean;
    outlined?: boolean;
    solidFill?: boolean;
    transition?: string;
    variant?: string;
}

export declare type TBsAlert = ComponentObjectPropsOptions<TAlertOptionProps>;

export declare const BsAlert: DefineComponent<TBsAlert, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
