import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import type { TFlipMode, TSizeOptionProps, TSizeProps } from '../../../types';

export declare type TImageProps = {
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

export declare type TIconProps = {
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
    /**
     * Apply border width to this component.
     */
    border?: string | number;
    /**
     * Apply border color to this component.
     */
    borderColor?: string;
}

export declare type TAvatarOptionProps = TAvatarImageOptionProps & TIconProps & {
    /**
     * Create avatar from a text. The text must be less than 4 characters.
     */
    text?: string;
}

export declare type TBsAvatar = ComponentObjectPropsOptions<TAvatarOptionProps>;

export declare const BsAvatar: {
    new(): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TAvatarOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsAvatarPlugin: {
    new(): Plugin;
};
