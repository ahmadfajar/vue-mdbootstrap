import {TSizeOptionProps} from "../../Icon/types";
import {ComponentPropsOptions, VNodeProps} from "vue";

export declare type TImageOptionProps = TSizeOptionProps & {
    circle: boolean,
    rounded: boolean;
    imgSrc?: string;
}

export declare type TBsAvatarOptionProps = TImageOptionProps & {
    iconSpin: boolean;
    iconPulse: boolean;
    iconFlip?: string;
    iconRotation?: string | number;
    icon?: string;
    text?: string;
}

export declare type TBsAvatar = {
    name?: string;
    props: ComponentPropsOptions<TBsAvatarOptionProps>;
}

export declare const BsAvatar: {
    new (): {
        $props: VNodeProps & ComponentPropsOptions<TBsAvatar>;
    };
};
