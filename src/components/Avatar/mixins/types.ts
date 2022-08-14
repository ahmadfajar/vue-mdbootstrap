import {TSizeOptionProps} from "../../Icon/mixins/types";

export type TImageOptionProps = TSizeOptionProps & {
    circle: boolean,
    rounded: boolean;
    imgSrc?: string;
}

export type TBsAvatarOptionProps = TImageOptionProps & {
    iconSpin: boolean;
    iconPulse: boolean;
    iconFlip?: string;
    iconRotation?: string | number;
    icon?: string;
    text?: string;
}
