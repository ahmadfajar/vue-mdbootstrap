import type {
    ComponentInternalInstance,
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TAvatarIconProps, TImageOptionProps, TRecord, TRouterOptionProps, TTagProps} from "../../../types";

export declare type TSpaceAround = "left" | "right" | "both";

export declare type TListViewOptionProps = {
    color?: string;
    /**
     * Apply css `overflow-hidden` or not.
     */
    overflowHidden?: boolean;
    /**
     * Highlight this ListView active item with rounded style on its edge corners.
     */
    itemRounded?: boolean;
    /**
     * Highlight this ListView active item with rounded-pill style on its edge corners.
     */
    itemRoundedPill?: boolean;
    /**
     * Give border around the ListView's active item.
     * Valid values are: `left`, `right`, `left-right`, `top`, `bottom`, `top-bottom`.
     */
    itemBorderVariant?: string;
    /**
     * If `false` then more than one item can be expanded.
     */
    singleExpand?: boolean;
    /**
     * The ListView doesn't manage each ListTile item's state.
     */
    individualState?: boolean;
    /**
     * Give some space around each item. Valid values are: `both`, `left`, `right`.
     */
    spaceAround?: TSpaceAround;
    /**
     * ReadOnly storage which hold this ListView's active item object instance.
     */
    modelValue?: ComponentInternalInstance;
}

export declare type TListTileOptionProps = TRouterOptionProps & {
    id?: string;
    /**
     * This component state.
     */
    active?: boolean;
    /**
     * Disable this component.
     */
    disabled?: boolean;
    /**
     * Render ListTile as menu item.
     */
    navigable?: boolean;
    /**
     * Disable ListView `itemBorderVariant` feature on this component.
     */
    borderOff?: boolean;
    /**
     * Disable ListView `itemRoundedPill` feature on this component.
     */
    pillOff?: boolean;
    /**
     * Disable ListView `itemRounded` feature on this component.
     */
    roundedOff?: boolean;
    /**
     * Enabled or disabled ripple effect.s
     */
    rippleOff?: boolean;
}

export declare type TListTileActionOptionProps = TTagProps & {
    /**
     * Center item inside it vertically.
     */
    center?: boolean;
    /**
     * Arrange item inside it vertically.
     */
    stack?: boolean;
}

export declare type TListTileContentOptionProps = TTagProps & {
    /**
     * Useful when you want to display multiline text. The subtitle default will be display
     * in a single line, if the text length is beyond the container's width then the text will be
     * truncate with an ellipses at the end.
     */
    multiLine?: boolean;
}

export declare type TListTileLeadingOptionProps = TAvatarIconProps & TImageOptionProps & {
    /**
     * Center item inside it vertically.
     */
    center?: boolean;
};

export declare type TListTileTextOptionProps = {
    /**
     * Useful when you want to display raw HTML content inside `ListTileTitle` or `ListTileSubtitle`.
     *
     * Dynamically rendering arbitrary HTML on your website can be very dangerous because it can
     * easily lead to XSS attacks. Only use this property on trusted content and never on
     * user-provided content.
     */
    rawHtml?: string;
}

export declare type TBsListView = ComponentObjectPropsOptions<TListViewOptionProps>;

export declare type TBsListTile = ComponentObjectPropsOptions<TListTileOptionProps>;

export declare type TBsListTileAction = ComponentObjectPropsOptions<TListTileActionOptionProps>;

export declare type TBsListTileContent = ComponentObjectPropsOptions<TListTileContentOptionProps>;

export declare type TBsListTileLeading = ComponentObjectPropsOptions<TListTileLeadingOptionProps>;

export declare type TBsListTileTitle = ComponentObjectPropsOptions<TListTileTextOptionProps>;

export declare type TBsListTileSubtitle = ComponentObjectPropsOptions<TListTileTextOptionProps>;

export declare const BsListView: DefineComponent<TBsListView, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTile: DefineComponent<TBsListTile, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileAction: DefineComponent<TBsListTileAction, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileContent: DefineComponent<TBsListTileContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileLeading: DefineComponent<TBsListTileLeading, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileTitle: DefineComponent<TBsListTileTitle, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileSubtitle: DefineComponent<TBsListTileSubtitle, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
