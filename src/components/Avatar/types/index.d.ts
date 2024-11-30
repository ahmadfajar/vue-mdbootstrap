import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';
import {
    TFlipMode,
    type TIconRotation,
    TIconVariant,
    TSizeOptionProps,
    TSizeProps,
} from '../../../types';

export declare type TImageProps = {
    /**
     * Create this component with circle shape.
     */
    circle?: boolean;
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
};

export declare type TIconProps = {
    /**
     * Android icon name, either with or without suffix. Valid suffixes are:
     * `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
     * `_rounded_filled`, or `_sharp_filled`. Suffix `_filled` and `_outlined_filled`
     * will result the same icon style. Suffix will take priority over
     * `iconVariant` property.
     *
     * This is a shortcut to insert component `BsIcon` inside this component.
     *
     * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    icon?: string;
    /**
     * Use predefined icon style, valid values are: `outlined`, `rounded`, `sharp`,
     * `filled`, `outlined_filled`, `rounded_filled`, and `sharp_filled`. Default
     * is `outlined`.
     *
     * Variant `filled` and `outlined_filled` will result the same icon style.
     *
     * @see [Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    iconVariant?: TIconVariant;
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
    iconRotation?: TIconRotation;
};

export declare type TAvatarImageOptionProps = TSizeOptionProps & {
    /**
     * Create this component with circle shape.
     */
    circle?: boolean;
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
};

export declare type TAvatarOptionProps = TAvatarImageOptionProps &
    TIconProps & {
        /**
         * Create avatar from a text. The text must be less than 4 characters.
         */
        text?: string;
    };

export declare type TBsAvatar = ComponentObjectPropsOptions<TAvatarOptionProps>;

export declare const BsAvatar: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TAvatarOptionProps;
        $slots: {
            default?: () => VNode[];
        };
    };
};

export declare const BsAvatarPlugin: ObjectPlugin;
