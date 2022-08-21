import {DefineComponent} from "vue";
import {TSizeOptionProps} from "../../Icon/types";

export declare type TDividerOptionProps = {
    dark: boolean;
    leftIndent?: number;
    rightIndent?: number;
    thickness?: number;
}

export declare type TImageHolderOptionProps = TSizeOptionProps & {
    circle: boolean;
    rounded: boolean;
    bgColor: string;
    textColor: string;
    /**
     * @deprecated
     * Use `placeholderText` instead.
     */
    placeHolder?:string;
    placeholderText?:string;
    xPos:string|number;
    yPos:string|number;
}

export declare type TSpacerOptionProps = {
    fill: boolean;
    width?: number;
}

export declare type TSubheaderOptionProps = {
    dark: boolean;
}

export declare const BsDivider: DefineComponent<TDividerOptionProps>;

export declare const BsImageHolder: DefineComponent<TImageHolderOptionProps>;

export declare const BsSpacer: DefineComponent<TSpacerOptionProps>;

export declare const BsSubheader: DefineComponent<TSubheaderOptionProps>;
