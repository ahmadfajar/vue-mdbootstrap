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
    variant?: TTabsVariant | string;
    alignment?: TAlignment | string;
    contentTransition?: string;
    iconPosition?: TPositionType | string;
    iconSize?: string | number;
    tabClass?: string | Array<string>;
    tabPosition?: TPositionType | string;
}

export declare type TTabsOptionProps = TTabsBaseProps & {
    flex?: boolean;
    color?: string;
    activeClass?: string;
    contentClass?: string | Array<string>;
    innerClass?: string | Array<string>;
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
