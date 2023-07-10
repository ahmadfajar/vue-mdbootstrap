import type { ComponentInternalInstance, Prop, PropType } from 'vue';
import {
    booleanProp,
    booleanTrueProp,
    routerProps,
    stringOrNumberProp,
    stringProp,
    stringRequiredProp,
    validStringOrNumberProp,
    whiteColorProp
} from '../../../mixins/CommonProps';
import { useGenerateId } from '../../../mixins/CommonApi';
import { iconProps } from '../../Avatar/mixins/avatarProps';
import { width } from '../../Icon/mixins/iconProps';
import type { TSpaceAround } from '../types';


export const listViewProps = {
    color: whiteColorProp,
    overflowHidden: booleanProp,
    itemRounded: booleanProp,
    itemRoundedPill: booleanProp,
    itemBorderVariant: {
        type: String,
        default: undefined,
        validator: (v: string) => ['left', 'right', 'left-right', 'top', 'bottom', 'top-bottom'].includes(v)
    },
    modelValue: {
        type: Object as PropType<ComponentInternalInstance>,
        default: undefined
    },
    singleExpand: booleanTrueProp,
    individualState: booleanProp,
    spaceAround: {
        type: String,
        default: undefined,
        validator: (v: string) => ['none', 'both', 'left', 'right'].includes(v)
    } as Prop<TSpaceAround>
}

export const listNavItemProps = {
    ...iconProps,
    ...routerProps,
    id: {
        type: String,
        default: () => useGenerateId()
    },
    active: booleanProp,
    disabled: booleanProp,
    depth: validStringOrNumberProp,
    indent: stringOrNumberProp,
    iconSize: width,
    label: stringRequiredProp,
    badge: stringProp,
    badgeColor: stringProp,
    badgeType: stringProp,
    badgeVariant: stringProp,
    borderOff: booleanProp,
    pillOff: booleanProp,
    rippleOff: booleanProp,
    roundedOff: booleanProp,
}

export const listTileProps = {
    ...routerProps,
    id: {
        type: String,
        default: () => useGenerateId()
    },
    active: booleanProp,
    disabled: booleanProp,
    navigable: booleanProp,
    borderOff: booleanProp,
    pillOff: booleanProp,
    rippleOff: booleanProp,
    roundedOff: booleanProp,
}
