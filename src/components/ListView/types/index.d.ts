import type {
    ComponentInternalInstance,
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {
    ObjectBase,
    TAvatarIconProps,
    TImageOptionProps,
    TRecord,
    TRouterOptionProps,
    TTagProps
} from "../../../types";

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

export declare type TListNavOptionProps = {
    /**
     * Sets this component `ID` attribute. This property value is auto generates.
     */
    id?: string;
    /**
     * Treat this component as child navigation container.
     */
    child?: boolean;
}

export declare type TListNavItemOptionProps = TAvatarIconProps & TRouterOptionProps & {
    /**
     * Sets this component `ID` attribute. This property value is auto generates.
     */
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
     * Item depth level in tree hierarchy.
     */
    depth?: string | number;
    /**
     * Text indentation from left side.
     */
    indent?: string | number;
    /**
     * Render the icon with fixed size.
     */
    iconSize?: string | number;
    /**
     * The text to render as component label.
     */
    label: string;
    /**
     * The text to render as Badge label.
     */
    badge?: string;
    /**
     * The Badge color appearance.
     */
    badgeColor?: string;
    /**
     * The Badge with `pill` or `label` style.
     */
    badgeType?: string;
    /**
     * The Badge variant, valid values: `primary`, `secondary`, `success`, `danger`, `warning`,
     * `info`, `light`, `dark`.
     */
    badgeVariant?: string;
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
     * Enabled or disabled ripple effect.
     */
    rippleOff?: boolean;

}

export declare type TListTileOptionProps = TRouterOptionProps & {
    /**
     * Sets this component `ID` attribute. This property value is auto generates.
     */
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
     * Enabled or disabled ripple effect.
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

export declare type TBsListNav = ComponentObjectPropsOptions<TListNavOptionProps>;

export declare type TBsListNavItem = ComponentObjectPropsOptions<TListNavItemOptionProps>;

export declare type TBsListTile = ComponentObjectPropsOptions<TListTileOptionProps>;

export declare type TBsListTileAction = ComponentObjectPropsOptions<TListTileActionOptionProps>;

export declare type TBsListTileContent = ComponentObjectPropsOptions<TListTileContentOptionProps>;

export declare type TBsListTileLeading = ComponentObjectPropsOptions<TListTileLeadingOptionProps>;

export declare type TBsListTileTitle = ComponentObjectPropsOptions<TListTileTextOptionProps>;

export declare type TBsListTileSubtitle = ComponentObjectPropsOptions<TListTileTextOptionProps>;

export declare const BsListView: DefineComponent<TBsListView, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListNav: DefineComponent<TBsListNav, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListNavItem: DefineComponent<TBsListNavItem, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTile: DefineComponent<TBsListTile, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileAction: DefineComponent<TBsListTileAction, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileContent: DefineComponent<TBsListTileContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileLeading: DefineComponent<TBsListTileLeading, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileTitle: DefineComponent<TBsListTileTitle, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsListTileSubtitle: DefineComponent<TBsListTileSubtitle, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare interface IListItem extends ObjectBase {
    readonly uid: string;
    readonly tag: string;
    readonly component: ComponentInternalInstance;
    readonly parent?: ComponentInternalInstance | null;
    readonly children: Array<IListItem>;

    /**
     * Add or register an item to this ListItem registry.
     *
     * @param {ListItem} child The item to register.
     * @returns {number} The registry new size or `-1` if the item already exists.
     */
    addChild(child: IListItem): number;

    /**
     * Remove an item from this ListItem registry.
     *
     * @param {string} id The item identifier.
     */
    removeChild(id: string): void;

    /**
     * Check if this ListItem registry size is greater than zero.
     */
    hasChild(): boolean;

    fireEvent(name: string, ...args: unknown[]): void;

    setActive(value: boolean): void;
}

export declare interface IListViewProvider extends ObjectBase {
    readonly config: Readonly<TListViewOptionProps>;
    readonly itemBorderVariant?: string;
    readonly itemRounded: boolean;
    readonly itemRoundedPill: boolean;
    readonly spaceAround?: TSpaceAround;
    readonly singleExpand: boolean;
    readonly items: IListItem[];

    get activeItem(): IListItem | undefined;

    set activeItem(value: IListItem | undefined): void;

    /**
     * Add an item to the collection.
     *
     * @param {ListItem} item The item to add.
     * @returns {number} The collection new length or `-1` if the item already exists.
     */
    addItem(item: IListItem): number;

    /**
     * The findItem() method returns the value of the first element in the provided array
     * that satisfies the provided testing function. If no values satisfy the testing function,
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined undefined} is returned.
     */
    findItem(predicate: (value: IListItem, sources: IListItem[]) => boolean, recursive: boolean = false): IListItem | undefined;

    /**
     * Execute an action for each item with the provided callback.
     *
     * @param actionFn         The callback which will be executed.
     * @param recursive        When `TRUE` the callback will be executed for every child.
     * @param stopImmediately  When `TRUE` if the callback returns a result, function will be stopped immediately.
     */
    execAction(actionFn: (value: IListItem, sources: IListItem[]) => unknown, recursive: boolean = false, stopImmediately: boolean = false): void;

    /**
     * Remove an item from the collection.
     *
     * @param item The item to remove.
     */
    removeItem(item: IListItem): void;

    setActiveItem(value?: IListItem): void;

    /**
     * Collapse current item and hide its child-items.
     */
    collapse(item: IListItem): void;

    /**
     * Expand current item and show its child-items.
     */
    expand(item: IListItem): void;
}