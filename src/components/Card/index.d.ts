import {ComponentPropsOptions, VNodeProps} from "vue";

export declare type TBsCardBodyOptionProps = {
    tag: string;
}

export declare type TBsCardContentOptionProps = {
    tag?: string;
    type: string;
}

export declare type TBsCardMediaOptionProps = {
    title: string;
    subtitle?: string;
    overlayTop?: boolean;
}

export declare type TBsCardOptionProps = {
    flat?: boolean;
    shadow?: boolean;
    imgTopSrc?: string;
    imgTopAlt?: string;
    imgBottomSrc?: string;
    imgBottomAlt?: string;
    tag: string;
}

export declare type TBsCard = {
    name?: string;
    props: ComponentPropsOptions<TBsCardOptionProps>;
}

export declare type TBsCardBody = {
    name?: string;
    props: ComponentPropsOptions<TBsCardBodyOptionProps>;
}

export declare type TBsCardContent = {
    name?: string;
    props: ComponentPropsOptions<TBsCardContentOptionProps>;
}

export declare type TBsCardMedia = {
    name?: string;
    props: ComponentPropsOptions<TBsCardMediaOptionProps>;
}

export declare const BsCard: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsCard>;
    };
};

export declare const BsCardBody: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsCardBody>;
    };
};

export declare const BsCardContent: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsCardContent>;
    };
};

export declare const BsCardFooter: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsCardBody>;
    };
};

export declare const BsCardHeader: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsCardBody>;
    };
};

export declare const BsCardMedia: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsCardMedia>;
    };
};
