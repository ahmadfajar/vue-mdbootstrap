import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';

export declare type TCardContentVariant = 'title' | 'subtitle' | 'text';

export declare type TTagProps = {
    /**
     * Html tag used to render this component.
     */
    tag?: string;
}

export declare type TCardOptionProps = TTagProps & {
    /**
     * Set to `true` to remove the side border of the Card component.
     */
    borderOff?: boolean;
    /**
     * Set to `true` to remove the rounded border on the side of the Card component.
     */
    roundedOff?: boolean;
    /**
     * Apply shadow effect to the component.
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
    type?: TCardContentVariant;
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

export declare const BsCard: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TCardOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardBody: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTagProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardContent: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TCardContentOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardFooter: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTagProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardHeader: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTagProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardMedia: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TCardMediaOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardPlugin: Plugin;
