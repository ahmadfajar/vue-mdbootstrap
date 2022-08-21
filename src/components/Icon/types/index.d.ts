import {DefineComponent} from "vue";

export declare type TIconData = {
    id: number;
    name: string;
    icon?: string;
    category?: string;
    variant?: string;
    data?: string;
}

export declare type TSizeOptionProps = {
    height: number;
    width: number;
    size?: number;
}

export declare type TIconOptionProps = TSizeOptionProps & {
    pulse: boolean;
    spin: boolean;
    icon?: string;
    flip?: string;
    rotate?: number;
}

export declare type TIconSpinnerOptionProps = {
    color?: string;
    size: number;
    pulse: boolean;
    spin: boolean;
}

export declare type TIconToggleOptionProps = {
    icon: string;
    toggleIcon: string;
    modelValue: boolean;
    size: number;
}

export declare const BsIcon: DefineComponent<TIconOptionProps>;

export declare const BsIconSvg: DefineComponent<TIconOptionProps>;

export declare const BsIconSpinner: DefineComponent<TIconSpinnerOptionProps>;

export declare const BsIconToggle: DefineComponent<TIconToggleOptionProps>;
