import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps
} from 'vue';

export declare type TCardContentType = 'title' | 'subtitle' | 'text';

export declare type TTagProp = {
    /**
     * Html tag used to render this component.
     */
    tag?: string;
}

export declare type TCardOptionProps = TTagProp & {
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

export declare type TCardContentOptionProps = TTagProp & {
    /**
     * Card content variations, valid values are: `title`, `subtitle`, `text`.
     */
    type?: TCardContentType;
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

export declare type TBsCardBody = ComponentObjectPropsOptions<TTagProp>;

export declare type TBsCardContent = ComponentObjectPropsOptions<TCardContentOptionProps>;

export declare type TBsCardFooter = ComponentObjectPropsOptions<TTagProp>;

export declare type TBsCardHeader = ComponentObjectPropsOptions<TTagProp>;

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
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTagProp;
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
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTagProp;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsCardHeader: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TTagProp;
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

export declare const BsCardPlugin: ObjectPlugin;
