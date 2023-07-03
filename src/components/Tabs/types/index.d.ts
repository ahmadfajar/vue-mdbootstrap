import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentInternalInstance,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import type { EventUpdateModelValueProps, TIconProps, TPlacementPosition, TRouterOptionProps } from '../../../types';

export declare type TAlignment = 'left' | 'start' | 'right' | 'end' | 'center' | 'justified';

export declare type TOrientation = 'horizontal' | 'vertical';

export declare type TTabsVariant = 'tabs' | 'pills' | 'modern' | 'material';

export declare type TTabsBaseProps = {
    /**
     * Tabs style variant. Valid values: `tabs`, `pills`, `material`, `modern`.
     */
    variant?: TTabsVariant;
    /**
     * Tabs alignment. Valid values: `left`, `right`, `start`, `end`, `center`, `justified`.
     */
    alignment?: TAlignment;
    /**
     * Tab content display animation transition.
     */
    contentTransition?: string;
    /**
     * TabItem icon position. Valid values: `left`, `right`, `top`, `bottom`.
     */
    iconPosition?: TPlacementPosition;
    /**
     * TabItem icon size.
     */
    iconSize?: string | number;
    /**
     * Optional TabItem css classes.
     */
    tabClass?: string | Array<string>;
    /**
     * Tabs position. Valid values: `left`, `right`, `top`, `bottom`.
     */
    tabPosition?: TPlacementPosition;
}

export declare type TTabsOptionProps = TTabsBaseProps & {
    /**
     * Create Tabs with flex styles. Only valid for `tabs` or `pills` variant.
     */
    flex?: boolean;
    /**
     * Tabs color style for tab variant: `modern` and `material`.
     */
    color?: string;
    /**
     * CSS class name for active TabItem.
     */
    activeClass?: string;
    /**
     * Tab content css class name.
     */
    contentClass?: string | Array<string>;
    /**
     * TabItem's container css class name.
     */
    innerClass?: string | Array<string>;
    /**
     * This component activeTab index or activeTab ID.
     */
    modelValue?: string | number;
}

export declare type TTabPanelOptionProps = TRouterOptionProps & TIconProps & {
    id?: string;
    ariaLabel?: string;
    disabled?: boolean;
    label?: string;
}

export declare type TTabItemOptionProps = TTabPanelOptionProps & {
    active?: boolean;
}

export declare type TTabLabelOptionProps = TIconProps & {
    tabPosition?: TPlacementPosition;
    iconPosition?: TPlacementPosition;
    iconSize?: string | number;
    label?: string;
    rippleOff?: boolean;
}

export declare type TBsTabs = ComponentObjectPropsOptions<TTabsOptionProps>;

export declare type TBsTabItem = ComponentObjectPropsOptions<TTabItemOptionProps>;

export declare type TBsTabPanel = ComponentObjectPropsOptions<TTabPanelOptionProps>;

export declare type TBsTabLabel = ComponentObjectPropsOptions<TTabLabelOptionProps>;

declare type AllowedTabsProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<number> & {
    onChange?: (
        newTab: ComponentInternalInstance,
        oldTab: ComponentInternalInstance | undefined,
        newIndex: number,
        oldIndex?: number,
    ) => void;
};

export declare const BsTab: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTabPanelOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsTabs: {
    new(): {
        $props: AllowedTabsProps & TTabsOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: [
            /**
             * Fired when this component's mutate its modelValue.
             */
            'change',
            /**
             * Fired when this component's modelValue is updated.
             */
            'update:model-value',
        ];
    };
};

export declare const BsTabPlugin: {
    new(): Plugin;
};
