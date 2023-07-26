import type { Prop } from 'vue';
import {
    booleanProp,
    routerProps,
    stringOrArrayProp,
    stringOrNumberProp,
    stringProp
} from '../../../mixins/CommonProps';
import type { TAlignment, TPlacementPosition, TTabsVariant } from '../../../types';
import { iconProps } from '../../Avatar/mixins/avatarProps';
import { iconSizeProp } from '../../Icon/mixins/iconProps';

export const tabPanelProps = {
    ...routerProps,
    ...iconProps,
    id: stringProp,
    label: stringProp,
    ariaLabel: stringProp,
    disabled: booleanProp,
}

export const tabItemProps = {
    ...routerProps,
    ...iconProps,
    id: stringProp,
    label: stringProp,
    active: booleanProp,
    ariaLabel: stringProp,
    disabled: booleanProp,
}

export const tabsProps = {
    /**
     * Tabs style variant. Valid values: `tabs`, `pills`, `material`, `modern`.
     */
    variant: {
        type: String,
        default: 'tabs',
        validator: (value: string) => ['tabs', 'pills', 'modern', 'material'].includes(value)
    } as Prop<TTabsVariant>,
    /**
     * Tabs alignment. Valid values: `left`, `right`, `start`, `end`, `center`, `justified`.
     */
    alignment: {
        type: String,
        default: 'start',
        validator: (value: string) => ['left', 'start', 'right', 'end', 'center', 'justified'].includes(value)
    } as Prop<TAlignment>,
    /**
     * Tabs color style for tab variant: `modern` and `material`.
     */
    color: stringProp,
    /**
     * Create Tabs with flex styles. Only valid for `tabs` or `pills` variant.
     */
    flex: booleanProp,
    /**
     * TabItem icon size.
     */
    iconSize: iconSizeProp,
    /**
     * TabItem icon position. Valid values: `left`, `right`, `top`, `bottom`.
     */
    iconPosition: {
        type: String,
        default: 'left',
        validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value)
    } as Prop<TPlacementPosition>,
    /**
     * Tabs position. Valid values: `left`, `right`, `top`, `bottom`.
     */
    tabPosition: {
        type: String,
        default: 'top',
        validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value)
    } as Prop<TPlacementPosition>,
    /**
     * TabItem css class name.
     */
    tabClass: stringOrArrayProp,
    /**
     * CSS class name for active TabItem.
     */
    activeClass: {
        type: String,
        default: 'active'
    },
    /**
     * TabItem's container css class name.
     */
    innerClass: stringOrArrayProp,
    /**
     * Tab content css class name.
     */
    contentClass: stringOrArrayProp,
    /**
     * Tab content display animation transition.
     */
    contentTransition: {
        type: String,
        default: 'fade',
        // validator: (value: string) => ["fade", "slide-fade", "slide-fade-reverse", "popover"].includes(value)
    },
    /**
     * This component activeTab index or activeTab ID.
     */
    modelValue: stringOrNumberProp,
}
