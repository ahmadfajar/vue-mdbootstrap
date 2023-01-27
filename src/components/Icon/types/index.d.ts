import type {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import type {TRecord} from "../../../types";

export declare type TFlipMode = "horizontal" | "vertical" | "both";

export declare type TShapeStyle = "outlined" | "filled" | "round" | "sharp";

export declare type TPositionType = "left" | "right" | "top" | "bottom";

export declare type TIconData = {
    id: number;
    name: string;
    icon?: string;
    category?: string;
    variant?: string;
    data?: string;
}

export declare type TSizeProps = {
    /**
     * This component's height.
     */
    height?: string | number;
    /**
     * This component's width.
     */
    width?: string | number;
}

export declare type TSizeOptionProps = {
    /**
     * This component's height.
     */
    height?: string | number;
    /**
     * This component's width.
     */
    width?: string | number;
    /**
     * Shortcut to create this component with equal height and width.
     */
    size?: string | number | TSizeProps;
}

export declare type TIconOptionProps = TSizeOptionProps & {
    /**
     * The icon’s name or alias.
     */
    icon?: string;
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse?: boolean;
    /**
     * Apply **spin** animation to the icon.
     */
    spin?: boolean;
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     */
    flip?: string;
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     */
    rotate?: string | number;
}

export declare type TIconSpinnerOptionProps = {
    /**
     * The Icon color.
     */
    color?: string;
    /**
     * The icon’s size in pixel.
     */
    size?: string | number;
    /**
     * Apply **pulse** animation to the icon.
     */
    pulse?: boolean;
    /**
     * Apply **spin** animation to the icon.
     */
    spin?: boolean;
}

export declare type TToggleIconOptionProps = {
    /**
     * The icon’s name or alias.
     */
    icon?: string;
    /**
     * The icon to display when `value` property is `true`.
     */
    toggleIcon?: string;
    /**
     * Value monitored by `v-model` to maintain this component state.
     */
    modelValue?: boolean;
    /**
     * The icon size in pixels.
     */
    size?: string | number;
}

export declare type TBsIcon = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSvg = ComponentObjectPropsOptions<TIconOptionProps>;

export declare type TBsIconSpinner = ComponentObjectPropsOptions<TIconSpinnerOptionProps>;

export declare type TBsToggleIcon = ComponentObjectPropsOptions<TToggleIconOptionProps>;

export declare const BsIcon: DefineComponent<TBsIcon, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconSvg: DefineComponent<TBsIconSvg, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconSpinner: DefineComponent<TBsIconSpinner, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleIcon: DefineComponent<TBsToggleIcon, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
