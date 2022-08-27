import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TRecord} from "../../../types";

export declare type TTagProps = {
    tag?: string;
}

export declare type TCardOptionProps = TTagProps & {
    rounded?: boolean;
    shadow?: boolean;
    imgTopSrc?: string;
    imgTopAlt?: string;
    imgBottomSrc?: string;
    imgBottomAlt?: string;
}

export declare type TCardContentOptionProps = TTagProps & {
    type?: string;
}

export declare type TCardMediaOptionProps = {
    title?: string;
    subtitle?: string;
    overlayTop?: boolean;
}

export declare type TBsCard = ComponentObjectPropsOptions<TCardOptionProps>;

export declare type TBsCardBody = ComponentObjectPropsOptions<TTagProps>;

export declare type TBsCardContent = ComponentObjectPropsOptions<TCardContentOptionProps>;

export declare type TBsCardFooter = ComponentObjectPropsOptions<TTagProps>;

export declare type TBsCardHeader = ComponentObjectPropsOptions<TTagProps>;

export declare type TBsCardMedia = ComponentObjectPropsOptions<TCardMediaOptionProps>;

export declare const BsCard: DefineComponent<TBsCard, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardBody: DefineComponent<TBsCardBody, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardContent: DefineComponent<TBsCardContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardFooter: DefineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardHeader: DefineComponent<TBsCardHeader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardMedia: DefineComponent<TBsCardMedia, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
