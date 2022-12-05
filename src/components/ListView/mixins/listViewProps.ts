import type {ComponentInternalInstance, PropType} from "vue";
import {booleanProp, booleanTrueProp, routerProps} from "../../../mixins/CommonProps";
import {useGenerateId} from "../../../mixins/CommonApi";
import type {TSpaceAround} from "../types";


export const listViewProps = {
    /**
     * This ListView's background color appearance.
     * @type {string}
     */
    color: {
        type: String,
        default: "white"
    },
    /**
     * Apply css `overflow-hidden` or not.
     * @type {boolean}
     */
    overflowHidden: booleanProp,
    /**
     * Highlight this ListView active item with rounded style on its edge corners.
     * @type {boolean}
     */
    itemRounded: booleanProp,
    /**
     * Highlight this ListView active item with rounded-pill style on its edge corners.
     * @type {boolean}
     */
    itemRoundedPill: booleanProp,
    /**
     * Give border around the ListView's active item.
     * Valid values are: `left`, `right`, `left-right`, `top`, `bottom`, `top-bottom`.
     * @type {string}
     */
    itemBorderVariant: {
        type: String,
        default: undefined,
        validator: (v: string) => ["left", "right", "left-right", "top", "bottom", "top-bottom"].includes(v)
    },
    /**
     * ReadOnly storage which hold this ListView's active item object instance.
     */
    modelValue: {
        type: Object as PropType<ComponentInternalInstance>,
        default: undefined
    },
    /**
     * If `false` then more than one item can be expanded.
     * @type {boolean}
     */
    singleExpand: booleanTrueProp,
    /**
     * Give some space around each item. Valid values are: `both`, `left`, `right`.
     * @type {TSpaceAround}
     */
    spaceAround: {
        type: String as PropType<TSpaceAround>,
        default: undefined,
        validator: (v: string) => ["both", "left", "right"].includes(v)
    }
}

export const listTileProps = {
    ...routerProps,
    /**
     * Sets this component `ID` attribute. This property value is auto generates.
     * @type {string}
     */
    id: {
        type: String,
        default: () => useGenerateId()
    },
    /**
     * Disable this component.
     * @type {boolean}
     */
    disabled: booleanProp,
    /**
     * Render ListTile as menu item.
     * @type {boolean}
     */
    navigable: booleanProp,
    /**
     * Disable ListView `itemBorderVariant` feature on this component.
     * @type {boolean}
     */
    borderOff: booleanProp,
    /**
     * Disable ListView `itemRoundedPill` feature on this component.
     * @type {boolean}
     */
    pillOff: booleanProp,
    /**
     * Enabled or disabled ripple effect.
     * @type {boolean}
     */
    rippleOff: booleanProp,
    /**
     * Disable ListView `itemRounded` feature on this component.
     * @type {boolean}
     */
    roundedOff: booleanProp,
}
