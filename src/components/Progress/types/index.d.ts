import {DefineComponent} from "vue";

export declare type TSpinnerRecord = {
    styleTag?: ISpinnerElement;
    diameters: Set<number>;
}

export declare type TMaskLoaderOptionProps = {
    fixedPosition: boolean;
    show: boolean;
    overlayOpacity?: number;
    overlayColor?: string;
    spinnerColor: string;
    spinnerDiameter: number;
    spinnerThickness: number;
    /**
     * @deprecated
     * Use `variant` instead.
     */
    spinnerType: string;
    variant: string;
    transition: string;
    zIndex: number;
}

export declare type TProgressOptionProps = {
    buffer: number;
    color: string;
    diameter: number;
    height: number;
    stroke: number;
    modelValue: number;
    mode: string;
    type: string;
}

export declare type TProgressBarOptionProps = {
    color?: string;
    height?: number;
    modelValue: number;
    flat: boolean;
    striped: boolean;
    stripedAnimation: boolean;
    showValue: boolean;
}

export declare interface ISpinnerElement extends Element {
    sheet?: CSSStyleSheet;
}

export declare const BsMaskLoader: DefineComponent<TMaskLoaderOptionProps>;

export declare const BsProgress: DefineComponent<TProgressOptionProps>;

export declare const BsProgressBar: DefineComponent<TProgressBarOptionProps>;
