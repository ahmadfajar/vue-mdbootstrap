import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TAvatarIconProps, TPositionType, TRecord, TRouterOptionProps} from "../../../types";

export declare type TAlignment = "left" | "right" | "center" | "justified";

export declare type TOrientation = "horizontal" | "vertical";

export declare type TTabsVariant = "tabs" | "pills" | "modern" | "material";

export declare type TTabsBaseProps = {
    /**
     * Tabs style variant. Valid values: `tabs`, `pills`, `material`, `modern`.
     */
    variant?: TTabsVariant | string;
    /**
     * Tabs alignment. Valid values: `left`, `right`, `center`, `justified`.
     */
    alignment?: TAlignment | string;
    /**
     * Tab content display animation transition.
     */
    contentTransition?: string;
    /**
     * TabItem icon position. Valid values: `left`, `right`, `top`, `bottom`.
     */
    iconPosition?: TPositionType | string;
    /**
     * TabItem icon size.
     */
    iconSize?: string | number;
    /**
     * TabItem css class name.
     */
    tabClass?: string | Array<string>;
    /**
     * Tabs position. Valid values: `left`, `right`, `top`, `bottom`.
     */
    tabPosition?: TPositionType | string;
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

export declare type TTabPanelOptionProps = TRouterOptionProps & TAvatarIconProps & {
    id?: string;
    ariaLabel?: string;
    disabled?: boolean;
    label?: string;
}

export declare type TTabItemOptionProps = TTabPanelOptionProps & {
    active?: boolean;
}

export declare type TTabLabelOptionProps = TAvatarIconProps & {
    tabPosition?: TPositionType;
    iconPosition?: TPositionType;
    iconSize?: string | number;
    label?: string;
    rippleOff?: boolean;
}

export declare type TBsTabs = ComponentObjectPropsOptions<TTabsOptionProps>;

export declare type TBsTabItem = ComponentObjectPropsOptions<TTabItemOptionProps>;

export declare type TBsTabPanel = ComponentObjectPropsOptions<TTabPanelOptionProps>;

export declare type TBsTabLabel = ComponentObjectPropsOptions<TTabLabelOptionProps>;

export declare const BsTab: DefineComponent<TBsTabPanel, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsTabs: DefineComponent<TBsTabs, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsTabLabel: DefineComponent<TBsTabLabel, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
