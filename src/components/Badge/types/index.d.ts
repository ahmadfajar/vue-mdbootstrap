import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";

export declare type TBadgeOptionProps = {
    color?: string;
    tag?: string;
    type?: string;
    variant?: string;
}

export declare type TBsBadge = ComponentObjectPropsOptions<TBadgeOptionProps>;

export declare const BsBadge: DefineComponent<TBsBadge, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
