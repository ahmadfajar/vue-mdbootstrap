import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin as Plugin_1,
    VNode,
    VNodeProps
} from 'vue';

export declare type TBadgeType = 'label' | 'pill';

export declare type TBadgeOptionProps = {
    /**
     * This badge color appearance.
     */
    color?: string;
    /**
     * Create outlined badge style.
     */
    outlined?: boolean;
    /**
     * Html tag used to render this badge.
     */
    tag?: string;
    /**
     * Create badge with `pill` or `label` style.
     */
    type?: TBadgeType;
    /**
     * Create contextual badge with
     * [Bootstrap badge color](https://getbootstrap.com/docs/5.2/components/badge/#background-colors).
     */
    variant?: string;
}

export declare type TBsBadge = ComponentObjectPropsOptions<TBadgeOptionProps>;

export declare const BsBadge: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TBadgeOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsBadgePlugin = Plugin_1;
