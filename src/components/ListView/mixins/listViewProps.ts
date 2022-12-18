import type {ComponentInternalInstance, PropType} from "vue";
import {
    booleanProp,
    booleanTrueProp,
    routerProps,
    stringOrNumberProp,
    stringProp,
    stringRequiredProp,
    validStringOrNumberProp
} from "../../../mixins/CommonProps";
import {useGenerateId} from "../../../mixins/CommonApi";
import {iconProps} from "../../Avatar/mixins/avatarProps";
import {width} from "../../Icon/mixins/iconProps";
import type {TSpaceAround} from "../types";


export const listViewProps = {
    color: {
        type: String,
        default: "white"
    },
    overflowHidden: booleanProp,
    itemRounded: booleanProp,
    itemRoundedPill: booleanProp,
    itemBorderVariant: {
        type: String,
        default: undefined,
        validator: (v: string) => ["left", "right", "left-right", "top", "bottom", "top-bottom"].includes(v)
    },
    modelValue: {
        type: Object as PropType<ComponentInternalInstance>,
        default: undefined
    },
    singleExpand: booleanTrueProp,
    individualState: booleanProp,
    spaceAround: {
        type: String as PropType<TSpaceAround>,
        default: undefined,
        validator: (v: string) => ["both", "left", "right"].includes(v)
    }
}

export const listNavItemProps = {
    ...iconProps,
    ...routerProps,
    id: {
        type: String,
        default: () => useGenerateId()
    },
    // active: booleanProp,
    disabled: booleanProp,
    depth: validStringOrNumberProp,
    indent: stringOrNumberProp,
    iconSize: width,
    label: stringRequiredProp,
    badge: stringProp,
    badgeColor: stringProp,
    badgeType: stringProp,
    badgeVariant: {
        type: String,
        default: 'success'
    },
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
