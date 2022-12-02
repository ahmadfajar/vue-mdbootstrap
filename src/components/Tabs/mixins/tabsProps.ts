import type {PropType} from "vue";
import {booleanProp, routerProps, stringOrArrayProp, stringOrNumberProp, stringProp} from "../../../mixins/CommonProps";
import {iconProps} from "../../Avatar/mixins/avatarProps";
import {height as sizeProp} from "../../Icon/mixins/iconProps";
import type {TAlignment, TPositionType, TTabsVariant} from "../../../types";

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
     * @type {TTabsVariant}
     */
    variant: {
        type: String as PropType<TTabsVariant>,
        default: "tabs",
        validator: (value: string) => ["tabs", "pills", "modern", "material"].includes(value)
    },
    /**
     * Tabs alignment. Valid values: `left`, `right`, `center`, `justified`.
     * @type {TAlignment}
     */
    alignment: {
        type: String as PropType<TAlignment>,
        default: "left",
        validator: (value: string) => ["left", "right", "center", "justified"].includes(value)
    },
    /**
     * Tabs color style for tab variant: `modern` and `material`.
     * @type {string}
     */
    color: stringProp,
    /**
     * Create Tabs with flex styles. Only valid for `tabs` or `pills` variant.
     * @type {boolean}
     */
    flex: booleanProp,
    /**
     * TabItem icon size.
     * @type {string|number}
     */
    iconSize: sizeProp,
    /**
     * TabItem icon position. Valid values: `left`, `right`, `top`, `bottom`.
     * @type {TPositionType}
     */
    iconPosition: {
        type: String as PropType<TPositionType>,
        default: "left",
        validator: (value: string) => ["left", "right", "top", "bottom"].includes(value)
    },
    /**
     * Tabs position. Valid values: `left`, `right`, `top`, `bottom`.
     * @type {TPositionType}
     */
    tabPosition: {
        type: String as PropType<TPositionType>,
        default: "top",
        validator: (value: string) => ["left", "right", "top", "bottom"].includes(value)
    },
    /**
     * TabItem css class name.
     * @type {string|Array<string>}
     */
    tabClass: stringOrArrayProp,
    /**
     * CSS class name for active TabItem.
     * @type {String}
     */
    activeClass: {
        type: String,
        default: "active"
    },
    /**
     * TabItem's container css class name.
     * @type {string|Array<string>}
     */
    innerClass: stringOrArrayProp,
    /**
     * Tab content css class name.
     * @type {string|Array<string>}
     */
    contentClass: stringOrArrayProp,
    /**
     * Tab content display animation transition.
     * @type {string}
     */
    contentTransition: {
        type: String,
        default: "fade",
        // validator: (value: string) => ["fade", "slide-fade", "slide-fade-reverse", "popover"].includes(value)
    },
    /**
     * This component activeTab index or activeTab ID.
     * @type {string|number}
     */
    modelValue: stringOrNumberProp,
}
