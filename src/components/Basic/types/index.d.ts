import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TSizeOptionProps} from "../../Icon/types";
import {TRecord} from "../../../types";

export declare type TDividerOptionProps = {
    dark?: boolean;
    leftIndent?: string | number;
    rightIndent?: string | number;
    thickness?: string | number;
}

export declare type TImageHolderOptionProps = TSizeOptionProps & {
    circle?: boolean;
    rounded?: boolean;
    bgColor?: string;
    textColor?: string;
    /**
     * @deprecated
     * Use `placeholderText` instead.
     */
    placeHolder?: string;
    placeholderText?: string;
    xPos?: string | number;
    yPos?: string | number;
}

export declare type TSpacerOptionProps = {
    fill?: boolean;
    width?: string | number;
}

export declare type TSubheaderOptionProps = {
    dark?: boolean;
}

export declare type TBsDivider = ComponentObjectPropsOptions<TDividerOptionProps>;

export declare type TBsImageHolder = ComponentObjectPropsOptions<TImageHolderOptionProps>;

export declare type TBsSpacer = ComponentObjectPropsOptions<TSpacerOptionProps>;

export declare type TBsSubheader = ComponentObjectPropsOptions<TSubheaderOptionProps>;

export declare const BsDivider: DefineComponent<TBsDivider, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsImageHolder: DefineComponent<TBsImageHolder, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsSpacer: DefineComponent<TBsSpacer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsSubheader: DefineComponent<TBsSubheader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
