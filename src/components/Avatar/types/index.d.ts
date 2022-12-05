import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TRecord, TSizeOptionProps, TSizeProps} from "../../../types";

export declare type TImageOptionProps = {
    circle?: boolean,
    rounded?: boolean;
    imgSrc?: string;
    size?: string | number | TSizeProps;
}

export declare type TAvatarImageOptionProps = TSizeOptionProps & {
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

export declare type TAvatarOptionProps = TAvatarImageOptionProps & TAvatarIconProps & {
    text?: string;
}

export declare type TBsAvatar = ComponentObjectPropsOptions<TAvatarOptionProps>;

export declare const BsAvatar: DefineComponent<TBsAvatar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
