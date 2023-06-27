import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin
} from 'vue';
import type { TRecord } from '../../../types';

export declare type TTagProps = {
    /**
     * Html tag used to render this component.
     */
    tag?: string;
}

export declare type TCardOptionProps = TTagProps & {
    /**
     * Set to `false` to remove the rounded border on the side of the Card component.
     */
    rounded?: boolean;
    /**
     * Create card with shadow on its sides.
     */
    shadow?: boolean;
    /**
     * The image URL for image placed at the top of the card.
     */
    imgTopSrc?: string;
    /**
     * Text for the image `alt` attribute.
     */
    imgTopAlt?: string;
    /**
     * The image URL for image placed at the bottom of the card.
     */
    imgBottomSrc?: string;
    /**
     * Text for the image `alt` attribute.
     */
    imgBottomAlt?: string;
}

export declare type TCardContentOptionProps = TTagProps & {
    /**
     * Card content variations, valid values are: `title`, `subtitle`, `text`.
     */
    type?: string;
}

export declare type TCardMediaOptionProps = {
    /**
     * Text for media title.
     */
    title?: string;
    /**
     * Text for media subtitle.
     */
    subtitle?: string;
    /**
     * Placed text overlay at the top side.
     */
    overlayTop?: boolean;
}

export declare type TBsCard = ComponentObjectPropsOptions<TCardOptionProps>;

export declare type TBsCardBody = ComponentObjectPropsOptions<TTagProps>;

export declare type TBsCardContent = ComponentObjectPropsOptions<TCardContentOptionProps>;

export declare type TBsCardFooter = ComponentObjectPropsOptions<TTagProps>;

export declare type TBsCardHeader = ComponentObjectPropsOptions<TTagProps>;

export declare type TBsCardMedia = ComponentObjectPropsOptions<TCardMediaOptionProps>;

export declare const BsCard: DefineComponent<TBsCard, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardBody: DefineComponent<TBsCardBody, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardContent: DefineComponent<TBsCardContent, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardFooter: DefineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardHeader: DefineComponent<TBsCardHeader, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardMedia: DefineComponent<TBsCardMedia, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCardPlugin: Plugin;
