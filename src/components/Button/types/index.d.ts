import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TAvatarIconProps, TInputBaseProps, TLabelPosition, TRecord, TValidationProps} from "../../../types";

export declare type TButtonInnerOptionProps = {
    dropdownToggle?: boolean;
    hasIcon?: boolean;
    iconMode?: boolean;
    rippleOff?: boolean;
    tagName?: string;
}

export declare type TBaseButtonProps = {
    /**
     * Sets this button color.
     */
    color?: string;
    /**
     * Render this button with flat style (Google Material Text Button) or not.
     */
    flat?: boolean;
    /**
     * Render this button with outlined style (Google Material Outlined Button) or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/#outline-buttons)}
     * for details.
     */
    outlined?: boolean;
    /**
     * Render this button with raised style (Google Material Elevated Button) or not.
     */
    raised?: boolean;
    /**
     * Render this button with rounded style or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/)}
     * for details.
     */
    rounded?: boolean;
    /**
     * Render button with rounded-pill style (Google Material Button) or not.
     */
    pill?: boolean;
    /**
     * This button size, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/#sizes)}
     * for details.
     */
    size?: string;
}

export declare type TButtonOptionProps = TAvatarIconProps & TBaseButtonProps & {
    /**
     * Sets this button state: `active` or `normal`.
     */
    active?: boolean;
    /**
     * Sets this button state: `enabled` or `disabled`.
     */
    disabled?: boolean;
    readonly?: boolean;
    /**
     * This button component mode, valid values are: `default, icon, floating`.
     */
    mode?: string;
    /**
     * Render this button component as dropdowns button or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/dropdowns/)}
     * for details.
     */
    dropdownToggle?: boolean;
    /**
     * Render component as `<a>` element and define its `href` property and
     * apply button styles to the element.
     */
    href?: string;
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition?: TLabelPosition;
    /**
     * Render the icon with predefined size.
     */
    iconSize?: string | number;
    /**
     * Enabled or disabled **ripple** effect.
     */
    rippleOff?: boolean;
    /**
     * Render button with transparent style or not.
     */
    transparent?: boolean;
    /**
     * The value to set to the button’s type attribute. Valid values are: `button`, `submit`, `reset`.
     */
    type?: string;
}

export declare type TInputOptionItem = TAvatarIconProps & {
    id?: string;
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    value: string | number | boolean;
    label: string;
    iconSize?: number;
}

export declare type TToggleButtonOptionProps = TInputBaseProps & TBaseButtonProps & {
    /**
     * The number of items stored in the collection.
     */
    items: Array<TInputOptionItem>;
    /**
     * Allow multiple choice or not.
     */
    multiple?: boolean;
    /**
     * The input value to be monitored by `v-model`.
     */
    modelValue?: string | number | boolean | Array<unknown>;
    /**
     * Color to apply when Button is active or selected.
     */
    toggleColor?: string;
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition?: TLabelPosition;
}

export declare type TToggleFieldOptionProps = TToggleButtonOptionProps & TValidationProps;

export declare type TBsButtonInner = ComponentObjectPropsOptions<TButtonInnerOptionProps>;

export declare type TBsButton = ComponentObjectPropsOptions<TButtonOptionProps>;

export declare type TBsToggleButton = ComponentObjectPropsOptions<TToggleButtonOptionProps>;

export declare type TBsToggleField = ComponentObjectPropsOptions<TToggleFieldOptionProps>;

export declare const BsButton: DefineComponent<TBsButton, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleButton: DefineComponent<TBsToggleButton, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleField: DefineComponent<TBsToggleField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
