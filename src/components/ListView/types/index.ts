import type { TAllowedIconProps, TAllowedImageProps } from '@/components/Avatar/types';
import type { TBadgeType, TBadgeVariant } from '@/components/Badge/types';
import type { TTagProp } from '@/components/Card/types';
import type { Numberish, TRouterOptionProps } from '@/types';
import type {
  ComponentInternalInstance,
  ComponentObjectPropsOptions,
  ComponentPublicInstance,
  Ref,
} from 'vue';

export declare type TSpaceAround = 'left' | 'right' | 'both' | 'none';

export declare type TListItemBorder =
  | 'left'
  | 'right'
  | 'left-right'
  | 'top'
  | 'bottom'
  | 'top-bottom';

export declare type TListViewOptionProps = {
  /**
   * Apply custom color scheme to this ListView component.
   *
   * @deprecated
   * Use unified global CSS variable instead.
   */
  color?: string;

  /**
   * Apply css `overflow-hidden` or not.
   */
  overflowHidden?: boolean;

  /**
   * Highlight this ListView active item with **rounded** style on its edge corners.
   */
  itemRounded?: boolean;

  /**
   * Highlight this ListView active item with **rounded-pill** style on its edge corners.
   */
  itemRoundedPill?: boolean;

  /**
   * Give border around the ListView's active item.
   * Valid values are: `left`, `right`, `left-right`, `top`, `bottom`, `top-bottom`.
   */
  itemBorderVariant?: TListItemBorder;

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
};

export declare type TListNavOptionProps = {
  /**
   * Sets this component `ID` attribute. This property value is auto generates.
   */
  id?: string;

  /**
   * Treat this component as child navigation container.
   */
  child?: boolean;
};

export declare type TListNavItemOptionProps = TAllowedIconProps &
  TRouterOptionProps & {
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
    depth?: Numberish;

    /**
     * Text indentation from left side.
     */
    indent?: Numberish;

    /**
     * Render the icon with fixed size.
     */
    iconSize?: Numberish;

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
    badgeType?: TBadgeType;

    /**
     * The Badge variant, valid values: `primary`, `secondary`, `success`, `danger`, `warning`,
     * `info`, `light`.
     */
    badgeVariant?: TBadgeVariant;

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
  };

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
};

export declare type TListTileActionOptionProps = TTagProp & {
  /**
   * Center item inside it vertically.
   */
  center?: boolean;

  /**
   * Arrange item inside it vertically.
   */
  stack?: boolean;
};

export declare type TListTileContentOptionProps = TTagProp & {
  /**
   * Useful when you want to display multiline text. The subtitle default will be display
   * in a single line, if the text length is beyond the container's width then the text will be
   * truncate with an ellipses at the end.
   */
  multiLine?: boolean;
};

export declare type TListTileLeadingOptionProps = TAllowedIconProps &
  TAllowedImageProps & {
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
};

export declare type TBsListView = ComponentObjectPropsOptions<TListViewOptionProps>;

export declare type TBsListNav = ComponentObjectPropsOptions<TListNavOptionProps>;

export declare type TBsListNavItem = ComponentObjectPropsOptions<TListNavItemOptionProps>;

export declare type TBsListTile = ComponentObjectPropsOptions<TListTileOptionProps>;

export declare type TBsListTileAction = ComponentObjectPropsOptions<TListTileActionOptionProps>;

export declare type TBsListTileContent = ComponentObjectPropsOptions<TListTileContentOptionProps>;

export declare type TBsListTileLeading = ComponentObjectPropsOptions<TListTileLeadingOptionProps>;

export declare type TBsListTileTitle = ComponentObjectPropsOptions<TListTileTextOptionProps>;

export declare type TBsListTileSubtitle = ComponentObjectPropsOptions<TListTileTextOptionProps>;

// declare interface AllowedListViewProps
//   extends PublicComponentProps, UpdateModelValueEventPublic<IListItem> {
//   /**
//    * Fired when this component's mutate its modelValue.
//    */
//   onChange?: (value: IListItem, oldValue: IListItem) => void;
//
//   /**
//    * Fired when this component's mutate its modelValue.
//    */
//   '@change'?: (value: IListItem, oldValue: IListItem) => void;
// }
//
// export declare const BsListView: {
//   new (): {
//     $props: AllowedListViewProps & TListViewOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'change', value: IListItem, oldValue: IListItem): void;
//       (event: 'update:model-value', value: IListItem): void;
//     };
//   };
// };
//
// export declare const BsListNav: {
//   new (): {
//     $props: PublicComponentProps & TListNavOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $exposed: {
//       collapsing: Ref<boolean>;
//       expanded: Ref<boolean>;
//       isActive: Ref<boolean>;
//     };
//     collapsing: Ref<boolean>;
//     expanded: Ref<boolean>;
//     isActive: Ref<boolean>;
//   };
// };

/**
 * `<BsListNav>` component instance when exposed by `ref` attribute.
 */
export declare interface BsListNavInstance extends ComponentPublicInstance {
  collapsing: Ref<boolean>;
  expanded: Ref<boolean>;
  isActive: Ref<boolean>;
}

// declare interface AllowedListItemProps extends PublicComponentProps {
//   /**
//    * Fired when this component's is clicked.
//    */
//   onClick?: (target: Event, node?: RendererNode | null) => void;
//
//   /**
//    * Fired when this component's state is updated.
//    */
//   'onUpdate:active'?: (active: boolean) => void;
//
//   /**
//    * Fired when this component's is clicked.
//    */
//   '@click'?: (target: Event, node?: RendererNode | null) => void;
//
//   /**
//    * Fired when this component's state is updated.
//    */
//   '@update:active'?: (active: boolean) => void;
// }
//
// export declare const BsListNavItem: {
//   new (): {
//     $props: AllowedListItemProps & TListNavItemOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'click', target: Event, node: RendererNode | null): void;
//       (event: 'update:active', active: boolean): void;
//     };
//     $exposed: {
//       expanded: Ref<boolean>;
//       isActive: Ref<boolean>;
//     };
//     expanded: Ref<boolean>;
//     isActive: Ref<boolean>;
//   };
// };

/**
 * `<BsListNavItem>` component instance when exposed by `ref` attribute.
 */
export declare interface BsListNavItemInstance extends ComponentPublicInstance {
  expanded: Ref<boolean>;
  isActive: Ref<boolean>;
}

// export declare const BsListTile: {
//   new (): {
//     $props: AllowedListItemProps & TListTileOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'click', target: Event, node: RendererNode | null): void;
//       (event: 'update:active', active: boolean): void;
//     };
//     $exposed: {
//       isActive: Ref<boolean>;
//     };
//     isActive: Ref<boolean>;
//   };
// };

/**
 * `<BsListTile>` component instance when exposed by `ref` attribute.
 */
export declare interface BsListTileInstance extends ComponentPublicInstance {
  isActive: Ref<boolean>;
}

// export declare const BsListTileAction: {
//   new (): {
//     $props: PublicComponentProps & TListTileActionOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// export declare const BsListTileContent: {
//   new (): {
//     $props: PublicComponentProps & TListTileContentOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// export declare const BsListTileLeading: {
//   new (): {
//     $props: PublicComponentProps & TListTileLeadingOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// export declare const BsListTileTitle: {
//   new (): {
//     $props: PublicComponentProps & TListTileTextOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// export declare const BsListTileSubtitle: {
//   new (): {
//     $props: PublicComponentProps & TListTileTextOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// export declare const BsListViewPlugin: ObjectPlugin;
