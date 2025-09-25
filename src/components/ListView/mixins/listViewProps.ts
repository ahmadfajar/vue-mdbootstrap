import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { iconSizeProp } from '@/components/Icon/mixins/iconProps.ts';
import type { TListItemBorder, TSpaceAround } from '@/components/ListView/types';
import { useGenerateId } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  booleanTrueProp,
  routerProps,
  stringMandatoryProp,
  stringOrNumberProp,
  stringProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import type { ComponentInternalInstance, Prop, PropType } from 'vue';

export const listViewProps = {
  color: stringProp,
  overflowHidden: booleanProp,
  itemRounded: booleanProp,
  itemRoundedPill: booleanProp,
  itemBorderVariant: {
    type: String,
    default: undefined,
    validator: (v: TListItemBorder) =>
      ['left', 'right', 'left-right', 'top', 'bottom', 'top-bottom'].includes(v),
  },
  modelValue: {
    type: Object as PropType<ComponentInternalInstance>,
    default: undefined,
  },
  singleExpand: booleanTrueProp,
  individualState: booleanProp,
  spaceAround: {
    type: String,
    default: undefined,
    validator: (v: TSpaceAround) => ['none', 'both', 'left', 'right'].includes(v),
  } as Prop<TSpaceAround>,
};

export const listNavItemProps = {
  ...iconBaseProps,
  ...routerProps,
  id: {
    type: String,
    default: () => useGenerateId(),
  },
  active: booleanProp,
  disabled: booleanProp,
  depth: validStringOrNumberProp,
  indent: stringOrNumberProp,
  iconSize: iconSizeProp,
  label: stringMandatoryProp,
  badge: stringProp,
  badgeColor: stringProp,
  badgeType: stringProp,
  badgeVariant: stringProp,
  borderOff: booleanProp,
  pillOff: booleanProp,
  rippleOff: booleanProp,
  roundedOff: booleanProp,
};

export const listTileProps = {
  ...routerProps,
  id: {
    type: String,
    default: () => useGenerateId(),
  },
  active: booleanProp,
  disabled: booleanProp,
  navigable: booleanProp,
  borderOff: booleanProp,
  pillOff: booleanProp,
  rippleOff: booleanProp,
  roundedOff: booleanProp,
};
