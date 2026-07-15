import type { TAllowedIconProps } from '@/components/Avatar/types';
import type { Numberish, TRecord, TRouterOptionProps } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals';
import type {
  Component,
  ComponentInternalInstance,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';

export declare type TAlignment = 'left' | 'start' | 'right' | 'end' | 'center' | 'justified';

export declare type TOrientation = 'horizontal' | 'vertical';

export declare type TPlacementPosition = 'left' | 'right' | 'top' | 'bottom';

export declare type TTabsVariant = 'tabs' | 'pills' | 'modern' | 'material';

export declare type TTabsBaseProps = {
  /**
   * Tabs style variant. Built in variants are: `tabs`, `pills`, `material`, `modern`.
   */
  variant?: TTabsVariant | string;

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
  iconSize?: Numberish;

  /**
   * Optional TabItem CSS classes when TabItem isn't in active state.
   */
  tabClass?: string | string[];

  /**
   * Tabs position. Valid values: `left`, `right`, `top`, `bottom`.
   */
  tabPosition?: TPlacementPosition;
};

export declare type TTabsOptionProps = TTabsBaseProps & {
  /**
   * Create Tabs with flex styles. Only valid for `tabs` or `pills` variant.
   */
  flex?: boolean;

  /**
   * Tabs color style for tab variant: `modern` and `material`.
   *
   * Must use valid CSS name for this to work properly, example: bg-primary, bg-indigo-600.
   */
  color?: string;

  /**
   * CSS class name for active TabItem.
   */
  activeClass?: string;

  /**
   * Optional, Tab content container CSS classes.
   */
  contentClass?: string | string[];

  /**
   * Optional, TabItem's container CSS classes.
   */
  innerClass?: string | string[];

  /**
   * The activeTab index or activeTab ID that monitored by `v-model`.
   */
  modelValue?: Numberish;
};

export declare type TTabPanelOptionProps = TRouterOptionProps &
  TAllowedIconProps & {
    /**
     * TabItem ID, default is autogenerate.
     */
    id?: string;
    ariaLabel?: string;

    /**
     * Sets initial state for this TabItem as disabled.
     */
    disabled?: boolean;

    /**
     * Sets this TabItem's label.
     */
    label?: string;
  };

export declare type TTabItemOptionProps = TTabPanelOptionProps & {
  /**
   * Sets this TabItem as active or in-active.
   */
  active?: boolean;
};

export declare type TTabLabelOptionProps = TAllowedIconProps & {
  tabPosition?: TPlacementPosition;
  iconPosition?: TPlacementPosition;
  iconSize?: Numberish;
  label?: string;
  rippleOff?: boolean;
};

export declare type TBsTabs = ComponentObjectPropsOptions<TTabsOptionProps>;

export declare type TBsTabItem = ComponentObjectPropsOptions<TTabItemOptionProps>;

export declare type TBsTabPanel = ComponentObjectPropsOptions<TTabPanelOptionProps>;

export declare type TBsTabLabel = ComponentObjectPropsOptions<TTabLabelOptionProps>;

// export declare const BsTab: {
//   new (): {
//     $props: PublicComponentProps & TTabPanelOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $exposed: {
//       isActive: Ref<boolean>;
//     };
//     isActive: Ref<boolean>;
//   };
// };

// declare interface AllowedTabsProps
//   extends PublicComponentProps, UpdateModelValueEventPublic<number> {
//   /**
//    * Fired when active tab is changed.
//    */
//   onChange?: (
//     newTab: ComponentInternalInstance,
//     newIndex: number,
//     oldTab: ComponentInternalInstance | undefined,
//     oldIndex?: number
//   ) => void;
//
//   /**
//    * Fired when active tab is changed.
//    */
//   '@change'?: (
//     newTab: ComponentInternalInstance,
//     newIndex: number,
//     oldTab: ComponentInternalInstance | undefined,
//     oldIndex?: number
//   ) => void;
// }

// export declare const BsTabs: {
//   new (): {
//     $props: AllowedTabsProps & TTabsOptionProps;
//     $slots: {
//       default?: () => VNode[];
//       'append-header'?: () => VNode;
//     };
//     $emits: {
//       (
//         event: 'change',
//         newTab: ComponentInternalInstance,
//         newIndex: number,
//         oldTab: ComponentInternalInstance | undefined,
//         oldIndex?: number
//       ): void;
//       (event: 'update:model-value', value: number): void;
//     };
//   };
// };

export declare type TabEventProps = UpdateModelValueEventProps<number> & {
  /**
   * Fired when active tab is changed.
   */
  change?: (
    newTab: ComponentInternalInstance,
    newIndex: number,
    oldTab?: ComponentInternalInstance,
    oldIndex?: number
  ) => void;
};

export declare interface TabEventPublic extends UpdateModelValueEventPublic<number> {
  /**
   * Fired when active tab is changed.
   */
  onChange?: (
    newTab: ComponentInternalInstance,
    newIndex: number,
    oldTab?: ComponentInternalInstance,
    oldIndex?: number
  ) => void;

  /**
   * Fired when active tab is changed.
   */
  '@change'?: (
    newTab: ComponentInternalInstance,
    newIndex: number,
    oldTab?: ComponentInternalInstance,
    oldIndex?: number
  ) => void;
}

export declare interface TabSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place custom components or elements on the right side of the Tabs.
   */
  'append-header'?: () => VNode[] | VNode;
}

export declare type BsTabs = DefineComponent<
  TBsTabs,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TabEventProps,
  string,
  PublicProps,
  Readonly<TTabsOptionProps> & Readonly<TabEventPublic>,
  ExtractDefaultPropTypes<TBsTabs>,
  SlotsType<TabSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

export declare type BsTab = DefineComponent<
  TBsTabPanel,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TTabPanelOptionProps>,
  ExtractDefaultPropTypes<TBsTabPanel>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
