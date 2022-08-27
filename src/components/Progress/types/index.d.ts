import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";

export declare type TSpinnerRecord = {
    styleTag?: ISpinnerElement;
    diameters: Set<number>;
}

export declare type TMaskLoaderOptionProps = {
    fixedPosition?: boolean;
    show?: boolean;
    overlayOpacity?: string | number;
    overlayColor?: string;
    spinnerColor?: string;
    spinnerDiameter?: string | number;
    spinnerThickness?: string | number;
    /**
     * @deprecated
     * Use `variant` instead.
     */
    spinnerType?: string;
    variant?: string;
    transition?: string;
    zIndex?: string | number;
}

export declare type TProgressOptionProps = {
    buffer?: string | number;
    color?: string;
    diameter?: string | number;
    height?: string | number;
    stroke?: string | number;
    modelValue?: number;
    mode?: string;
    type?: string;
}

export declare type TProgressBarOptionProps = {
    color?: string;
    height?: string | number;
    modelValue?: number;
    rounded?: boolean;
    striped?: boolean;
    stripedAnimation?: boolean;
    showValue?: boolean;
}

export declare interface ISpinnerElement extends Element {
    sheet?: CSSStyleSheet;
}

export declare type TBsMaskLoader = ComponentObjectPropsOptions<TMaskLoaderOptionProps>;

export declare type TBsProgress = ComponentObjectPropsOptions<TProgressOptionProps>;

export declare type TBsProgressBar = ComponentObjectPropsOptions<TProgressBarOptionProps>;

export declare const BsMaskLoader: DefineComponent<TBsMaskLoader, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsProgress: DefineComponent<TBsProgress, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsProgressBar: DefineComponent<TBsProgressBar, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
