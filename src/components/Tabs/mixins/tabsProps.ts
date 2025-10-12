import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { iconSizeProp } from '@/components/Icon/mixins/iconProps.ts';
import {
  booleanProp,
  routerProps,
  stringOrArrayProp,
  stringOrNumberProp,
  stringProp,
} from '@/mixins/CommonProps';
import type { TAlignment, TPlacementPosition, TTabsVariant } from '@/types';
import type { Prop } from 'vue';

export const tabItemProps = {
  ...routerProps,
  ...iconBaseProps,
  id: stringProp,
  label: stringProp,
  active: booleanProp,
  ariaLabel: stringProp,
  disabled: booleanProp,
};

export const tabPanelProps = {
  ...routerProps,
  ...iconBaseProps,
  id: stringProp,
  label: stringProp,
  ariaLabel: stringProp,
  disabled: booleanProp,
};

export const tabsProps = {
  variant: {
    type: String,
    default: 'tabs',
    // validator: (value: string) => ['tabs', 'pills', 'modern', 'material'].includes(value)
  } as Prop<TTabsVariant>,
  alignment: {
    type: String,
    default: 'start',
    validator: (value: string) =>
      ['left', 'start', 'right', 'end', 'center', 'justified'].includes(value),
  } as Prop<TAlignment>,
  color: stringProp,
  flex: booleanProp,
  iconSize: iconSizeProp,
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value),
  } as Prop<TPlacementPosition>,
  tabPosition: {
    type: String,
    default: 'top',
    validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value),
  } as Prop<TPlacementPosition>,
  tabClass: stringOrArrayProp,
  activeClass: {
    type: String,
    default: 'active',
  },
  innerClass: stringOrArrayProp,
  contentClass: stringOrArrayProp,
  contentTransition: {
    type: String,
    default: 'fade',
    // validator: (value: string) => ["fade", "slide-fade", "slide-fade-reverse", "popover"].includes(value)
  },
  modelValue: stringOrNumberProp,
};
