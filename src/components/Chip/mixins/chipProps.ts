import type { Prop, PropType } from 'vue';
import { booleanProp, booleanTrueProp, stringProp } from '../../../mixins/CommonProps';
import { iconProps } from '../../Avatar/mixins/avatarProps';
import { iconPosition } from '../../Button/mixins/buttonProps';
import type { TIconVariant } from '../../Icon/types';

export const chipDefaultColor = {
    type: String,
    default: 'grey',
};

export const chipProps = {
    /**
     * Sets this component state: `active` or `normal`.
     */
    active: booleanProp,
    /**
     * Custom CSS class to apply when the chip is in active state.
     */
    activeClass: stringProp,
    /**
     * The default chip color to apply.
     */
    color: chipDefaultColor,
    /**
     * Sets this component state to `disabled`.
     */
    disabled: booleanProp,
    /**
     * Sets this component state to `readonly`.
     */
    readonly: booleanProp,
    /**
     * When sets, display the close button to dismiss/hide this component.
     */
    dismissible: booleanProp,
    /**
     * Render as `<a>` element and define its `href` property and apply chip styles to the element.
     */
    href: stringProp,
    /**
     * Enable avatar and set the image location url.
     */
    imgSrc: stringProp,
    /**
     * Create avatar with circle shape style.
     */
    imgCircle: booleanProp,
    /**
     * Adjust avatar size to match the Chip height by eliminating the margin around the avatar.
     */
    imgPadding: booleanTrueProp,
    imgPaddingOff: booleanProp,
    /**
     * The value monitored by `v-model` to show or hide the Chip component.
     */
    modelValue: booleanTrueProp,
    /**
     * Render this component with outlined style or not.
     */
    outlined: booleanProp,
    /**
     * Render this component with rounded-pill style.
     */
    pill: booleanProp,
    /**
     * Enabled or disabled ripple effect.
     * Ripple effect is automatically disabled when `click` event or `href` property is not defined.
     */
    rippleOff: booleanProp,
    /**
     * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
     */
    size: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ['sm', 'lg'].includes(value),
    },
    /**
     * Use predefined icon style to be used inside this component.
     */
    iconVariant: {
        type: String as PropType<TIconVariant>,
        default: undefined,
        validator: (value: string): boolean =>
            ['outlined', 'filled', 'round', 'sharp'].includes(value),
    } as Prop<TIconVariant>,
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition,
    ...iconProps,
};
