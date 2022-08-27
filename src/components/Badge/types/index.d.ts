import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TRecord} from "../../../types";

export declare type TBadgeOptionProps = {
    color?: string;
    tag?: string;
    type?: string;
    variant?: string;
}

export declare type TBsBadge = ComponentObjectPropsOptions<TBadgeOptionProps>;

export declare const BsBadge: DefineComponent<TBsBadge, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
