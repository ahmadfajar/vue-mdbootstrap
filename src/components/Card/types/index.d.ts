import {DefineComponent} from "vue";

export declare type TCardOptionProps = {
    flat?: boolean;
    shadow?: boolean;
    imgTopSrc?: string;
    imgTopAlt?: string;
    imgBottomSrc?: string;
    imgBottomAlt?: string;
    tag: string;
}

export declare type TCardBodyOptionProps = {
    tag: string;
}

export declare type TCardContentOptionProps = {
    tag?: string;
    type: string;
}

export declare type TCardMediaOptionProps = {
    title: string;
    subtitle?: string;
    overlayTop?: boolean;
}

export declare const BsCard: DefineComponent<TCardOptionProps>;

export declare const BsCardBody: DefineComponent<TCardBodyOptionProps>;

export declare const BsCardContent: DefineComponent<TCardContentOptionProps>;

export declare const BsCardFooter: DefineComponent<TCardBodyOptionProps>;

export declare const BsCardHeader: DefineComponent<TCardBodyOptionProps>;

export declare const BsCardMedia: DefineComponent<TCardMediaOptionProps>;
