import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TFlipMode, TRecord, TSizeOptionProps, TSizeProps} from "../../../types";

export declare type TImageOptionProps = {
    /**
     * Create this component with circle shape.
     */
    circle?: boolean,
    /**
     * Create this component with rounded shape.
     */
    rounded?: boolean;
    /**
     * The image location to place inside this component.
     */
    imgSrc?: string;
    /**
     * Shortcut to create this component with equal height and width.
     */
    size?: string | number | TSizeProps;
}

export declare type TAvatarImageOptionProps = TSizeOptionProps & {
    /**
     * Create this component with circle shape.
     */
    circle?: boolean,
    /**
     * Create this component with rounded shape.
     */
    rounded?: boolean;
    /**
     * The image location to place inside this component.
     */
    imgSrc?: string;
}

export declare type TAvatarIconProps = {
    /**
     * Shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     */
    icon?: string;
    /**
     * Apply **spin** animation to the icon.
     */
    iconSpin?: boolean;
    /**
     * Apply **pulse** animation to the icon.
     */
    iconPulse?: boolean;
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     */
    iconFlip?: TFlipMode;
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     */
    iconRotation?: string | number;
}

export declare type TAvatarOptionProps = TAvatarImageOptionProps & TAvatarIconProps & {
    text?: string;
}

export declare type TBsAvatar = ComponentObjectPropsOptions<TAvatarOptionProps>;

export declare const BsAvatar: DefineComponent<TBsAvatar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
