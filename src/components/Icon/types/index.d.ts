import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";

export declare type TIconData = {
    id: number;
    name: string;
    icon?: string;
    category?: string;
    variant?: string;
    data?: string;
}

export declare type TSizeOptionProps = {
    height?: string | number;
    width?: string | number;
    size?: string | number;
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
    size?: number;
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

export declare const BsIcon: DefineComponent<TBsIcon, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconSvg: DefineComponent<TBsIconSvg, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsIconSpinner: DefineComponent<TBsIconSpinner, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsToggleIcon: DefineComponent<TBsToggleIcon, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
