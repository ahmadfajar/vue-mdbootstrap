import {ComponentCustomProps, ComponentPropsOptions, VNodeProps} from "vue";

export declare interface IIconData {
    id: number;
    name: string;
    icon: string;
    category: string;
    variant: string;
    data?: string;
}

export declare interface ISizeOptionProps extends ComponentCustomProps {
    size: number;
    height: number;
    width: number;
}

export declare interface IBsIconOptionProps extends ISizeOptionProps {
    icon: string;
    pulse: boolean;
    spin: boolean;
    flip: string;
    rotate: string | number;
}

export declare interface IBsIcon {
    name?: string;
    props: ComponentPropsOptions<IBsIconOptionProps>;
}

export declare const BsIcon: {
    new (): {
        $props: VNodeProps & IBsIconOptionProps;
    };
};
