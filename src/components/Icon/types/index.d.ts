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
    height?: string | number;
    width?: string | number;
}

export declare type TSizeOptionProps = {
    height?: string | number;
    width?: string | number;
    size?: string | number | TSizeProps;
}

export declare type TIconOptionProps = TSizeOptionProps & {
    icon?: string;
    pulse?: boolean;
    spin?: boolean;
    flip?: string;
    rotate?: string | number;
}

export declare type TIconSpinnerOptionProps = {
    color?: string;
    size?: string | number;
    pulse?: boolean;
    spin?: boolean;
}

export declare type TToggleIconOptionProps = {
    icon?: string;
    toggleIcon?: string;
    modelValue?: boolean;
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
