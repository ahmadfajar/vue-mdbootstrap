import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import type {
    EventUpdateModelValueProps,
    TIconProps,
    TInputBaseProps,
    TLabelPosition,
    TValidationProps
} from '../../../types';

export declare type TButtonInnerOptionProps = {
    dropdownToggle?: boolean;
    hasIcon?: boolean;
    iconMode?: boolean;
    rippleOff?: boolean;
    tagName?: string;
}

export declare type TButtonMode = 'default' | 'icon' | 'floating';
export declare type TButtonType = 'button' | 'submit' | 'reset';
export declare type TButtonSize = 'xs' | 'sm' | 'lg';

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
    size?: TButtonSize;
}

export declare type TButtonOptionProps = TIconProps & TBaseButtonProps & {
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
    mode?: TButtonMode;
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
    type?: TButtonType;
}

export declare type TInputOptionItem = TIconProps & {
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

export declare const BsButton: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TButtonOptionProps;
        $slots: {
            default?: () => VNode[];
            icon?: () => VNode;
        };
    };
};

declare type AllowedToggleButtonProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string | number | boolean>;

export declare const BsToggleButton: {
    new(): {
        $props: AllowedToggleButtonProps & TToggleButtonOptionProps;
        $slots: {
            label?: (props: TInputOptionItem) => VNode[];
            icon?: (props: TInputOptionItem) => VNode;
        };
        $emit: ['update:model-value'];
    };
};

export declare const BsToggleField: {
    new(): {
        $props: AllowedToggleButtonProps & TToggleFieldOptionProps;
        $slots: {
            default?: () => VNode[];
            label?: (props: TInputOptionItem) => VNode;
            icon?: (props: TInputOptionItem) => VNode;
            'help-text'?: () => VNode;
        };
        $emit: ['update:model-value'];
    };
};

export declare const BsButtonPlugin: {
    new(): Plugin;
};
