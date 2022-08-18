import {ComponentPropsOptions, VNodeProps} from "vue";

export declare type TIconData = {
    id: number;
    name: string;
    icon?: string;
    category?: string;
    variant?: string;
    data?: string;
}

export declare type TSizeOptionProps = {
    size: number;
    height: number;
    width: number;
}

export declare type TBsIconOptionProps = TSizeOptionProps & {
    pulse: boolean;
    spin: boolean;
    icon?: string;
    flip?: string;
    rotate?: string | number;
}

export declare type TBsIconToggleOptionProps = {
    icon: string;
    toggleIcon: string;
    modelValue: boolean;
    size: number;
}

export declare type TBsIcon = {
    name?: string;
    props: ComponentPropsOptions<TBsIconOptionProps>;
}

export declare type TBsIconSvg = {
    name?: string;
    props: ComponentPropsOptions<TBsIconOptionProps>;
}

export declare type TBsIconToggle = {
    name?: string;
    props: ComponentPropsOptions<TBsIconToggleOptionProps>;
}

export declare const BsIcon: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsIcon>;
    };
};

export declare const BsIconSvg: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsIconSvg>;
    };
};

export declare const BsIconToggle: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsIconToggle>;
    };
};
