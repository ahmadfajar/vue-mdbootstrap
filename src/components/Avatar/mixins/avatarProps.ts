import type { Prop } from 'vue';
import {
    booleanProp,
    stringOrNumberProp,
    stringProp,
    validStringOrNumberProp,
} from '../../../mixins/CommonProps';
import { flip, rotate } from '../../Icon/mixins/iconProps';
import type { TSizeProps } from '../../Icon/types';

export const iconProps = {
    /**
     * Shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     */
    icon: stringProp,
    /**
     * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
     */
    iconFlip: flip,
    /**
     * Rotate the icon, valid values are: `90`, `180`, `270`.
     */
    iconRotation: rotate,
    /**
     * Apply **spin** animation to the icon.
     */
    iconSpin: booleanProp,
    /**
     * Apply **pulse** animation to the icon.
     */
    iconPulse: booleanProp,
};

export const imageProps = {
    /**
     * Create this component with circle shape.
     */
    circle: booleanProp,
    /**
     * Create this component with rounded shape.
     */
    rounded: booleanProp,
    /**
     * The image location to place inside this component.
     */
    imgSrc: stringProp,
    /**
     * Shortcut to create this component with equal height and width.
     */
    size: {
        type: [Number, String, Object],
        default: 48,
    } as Prop<string | number | TSizeProps>,
};

export const avatarProps = {
    border: stringOrNumberProp,
    borderColor: stringProp,
    /**
     * This component's height.
     */
    height: validStringOrNumberProp,
    /**
     * This component's width.
     */
    width: validStringOrNumberProp,
    /**
     * The text to display inside the component.
     * Use short text (1 to 3 characters) to properly display it.
     * The text will be transformed to uppercase.
     */
    text: stringProp,
    ...iconProps,
    ...imageProps,
};
