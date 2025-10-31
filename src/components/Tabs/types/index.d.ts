import {
  ComponentInternalInstance,
  ComponentObjectPropsOptions,
  ObjectPlugin,
  Ref,
  VNode,
} from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  Numberish,
  TAllowedIconProps,
  TRouterOptionProps,
} from '../../../types';

export declare type TAlignment = 'left' | 'start' | 'right' | 'end' | 'center' | 'justified';

export declare type TOrientation = 'horizontal' | 'vertical';

export declare type TPlacementPosition = 'left' | 'right' | 'top' | 'bottom';

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
  iconSize?: Numberish;

  /**
   * Optional TabItem css classes when TabItem isn't in active state.
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
   */
  color?: string;

  /**
   * CSS class name for active TabItem.
   */
  activeClass?: string;

  /**
   * Optional, Tab content container css classes.
   */
  contentClass?: string | string[];

  /**
   * Optional, TabItem's container css classes.
   */
  innerClass?: string | string[];

  /**
   * The activeTab index or activeTab ID that monitored by `v-model`.
   */
  modelValue?: Numberish;
};

export declare type TTabPanelOptionProps = TRouterOptionProps &
  TAllowedIconProps & {
    id?: string;
    ariaLabel?: string;
    disabled?: boolean;
    label?: string;
  };

export declare type TTabItemOptionProps = TTabPanelOptionProps & {
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

export declare const BsTab: {
  new (): {
    $props: BaseComponentProps & TTabPanelOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $exposed: {
      isActive: Ref<boolean>;
    };
    isActive: Ref<boolean>;
  };
};

declare interface AllowedTabsProps extends BaseComponentProps, EventUpdateModelValueProps<number> {
  /**
   * Fired when active tab is changed.
   */
  onChange?: (
    newTab: ComponentInternalInstance,
    oldTab: ComponentInternalInstance | undefined,
    newIndex: number,
    oldIndex?: number
  ) => void;

  /**
   * Fired when active tab is changed.
   */
  '@change'?: (
    newTab: ComponentInternalInstance,
    oldTab: ComponentInternalInstance | undefined,
    newIndex: number,
    oldIndex?: number
  ) => void;
}

export declare const BsTabs: {
  new (): {
    $props: AllowedTabsProps & TTabsOptionProps;
    $slots: {
      default?: () => VNode[];
      'append-header'?: () => VNode;
    };
    $emits: {
      (
        event: 'change',
        newTab: ComponentInternalInstance,
        oldTab: ComponentInternalInstance | undefined,
        newIndex: number,
        oldIndex?: number
      ): void;
      (event: 'update:model-value', value: number): void;
    };
  };
};

export declare const BsTabPlugin: ObjectPlugin;
