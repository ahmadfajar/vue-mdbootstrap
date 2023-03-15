import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TRecord} from "../../../types";

export declare type TBadgeOptionProps = {
    /**
     * This badge color appearance.
     */
    color?: string;
    /**
     * Html tag used to render this badge.
     */
    tag?: string;
    /**
     * Create badge with `pill` or `label` style.
     */
    type?: string;
    /**
     * Create contextual badge with
     * [Bootstrap theme color](https://getbootstrap.com/docs/5.2/components/badge/#background-colors).
     */
    variant?: string;
}

export declare type TBsBadge = ComponentObjectPropsOptions<TBadgeOptionProps>;

export declare const BsBadge: DefineComponent<TBsBadge, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
