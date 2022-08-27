import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TSizeOptionProps} from "../../Icon/types";
import {TRecord} from "../../../types";

export declare type TImageOptionProps = TSizeOptionProps & {
    circle?: boolean,
    rounded?: boolean;
    imgSrc?: string;
}

export declare type TAvatarIconProps = {
    icon?: string;
    iconSpin?: boolean;
    iconPulse?: boolean;
    iconFlip?: string;
    iconRotation?: string | number;
}

export declare type TAvatarOptionProps = TImageOptionProps & TAvatarIconProps & {
    text?: string;
}

export declare type TBsAvatar = ComponentObjectPropsOptions<TAvatarOptionProps>;

export declare const BsAvatar: DefineComponent<TBsAvatar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
