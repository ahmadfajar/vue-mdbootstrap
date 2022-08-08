import {TSizeOptionProps} from "../../Icon/mixins/types";

export type TBsAvatarOptionProps = TSizeOptionProps & {
    circle: boolean,
    rounded: boolean;
    iconSpin: boolean;
    iconPulse: boolean;
    iconFlip?: string;
    iconRotation?: string | number;
    icon?: string;
    imgSrc?: string;
    text?: string;
}
