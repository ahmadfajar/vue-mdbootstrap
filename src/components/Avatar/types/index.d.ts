import {DefineComponent} from "vue";
import {TSizeOptionProps} from "../../Icon/types";

export declare type TImageOptionProps = TSizeOptionProps & {
    circle: boolean,
    rounded: boolean;
    imgSrc?: string;
}

export declare type TAvatarOptionProps = TImageOptionProps & {
    iconSpin: boolean;
    iconPulse: boolean;
    iconFlip?: string;
    iconRotation?: string | number;
    icon?: string;
    text?: string;
}

export declare const BsAvatar: DefineComponent<TAvatarOptionProps>;
