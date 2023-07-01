import type { Prop, PropType } from 'vue';
import { booleanProp, booleanTrueProp, defaultColorProp, stringProp } from '../../../mixins/CommonProps';
import type { TButtonMode, TButtonSize, TButtonType, TLabelPosition } from '../../../types';
import { iconProps } from '../../Avatar/mixins/avatarProps';
import { inputProps } from '../../Field/mixins/fieldProps';
import { width as iconSize } from '../../Icon/mixins/iconProps';

export const buttonMode = {
    type: String,
    default: 'default',
    validator: (value: string): boolean => ['default', 'icon', 'floating'].includes(value)
} as Prop<TButtonMode>

export const buttonSize = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ['xs', 'sm', 'lg'].includes(value)
} as Prop<TButtonSize>

export const buttonType = {
    type: String,
    default: 'button',
    validator: (value: string): boolean => ['button', 'submit', 'reset', 'div'].includes(value)
} as Prop<TButtonType>

export const iconPosition = {
    type: String as PropType<TLabelPosition>,
    default: 'left',
    validator: (value: string): boolean => ['left', 'right'].includes(value)
} as Prop<TLabelPosition>

export const buttonInnerProps = {
    dropdownToggle: booleanProp,
    iconMode: booleanProp,
    hasIcon: booleanProp,
    rippleOff: booleanProp,
    tagName: {
        type: String,
        default: 'span',
    }
}

export const buttonProps = {
    /**
     * Sets this button state: `active` or `normal`.
     */
    active: booleanProp,
    /**
     * Sets this button color.
     */
    color: defaultColorProp,
    /**
     * Sets this button state: `enabled` or `disabled`.
     */
    disabled: booleanProp,
    readonly: booleanProp,
    /**
     * This button component mode, valid values are: `default, icon, floating`.
     */
    mode: buttonMode,
    /**
     * Render this button component as dropdowns button or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/dropdowns/)}
     * for details.
     */
    dropdownToggle: booleanProp,
    /**
     * Render this button with flat style (Google Material Text Button) or not.
     */
    flat: booleanProp,
    /**
     * Render this button with outlined style (Google Material Outlined Button) or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/#outline-buttons)}
     * for details.
     */
    outlined: booleanProp,
    /**
     * Render this button with raised style (Google Material Elevated Button) or not.
     */
    raised: booleanProp,
    /**
     * Render this button with rounded style or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/)}
     * for details.
     */
    rounded: booleanProp,
    /**
     * Render button with rounded-pill style (Google Material Button) or not.
     */
    pill: booleanTrueProp,
    /**
     * Render component as `<a>` element and define its `href` property and
     * apply button styles to the element.
     */
    href: stringProp,
    /**
     * This button size, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/#sizes)}
     * for details.
     */
    size: buttonSize,
    /**
     * Place icon on the `left` side (before text) or on the `right` side (after text).
     */
    iconPosition,
    /**
     * Render the icon with predefined size.
     */
    iconSize,
    /**
     * Enabled or disabled **ripple** effect.
     */
    rippleOff: booleanProp,
    /**
     * Render button with transparent style or not.
     */
    transparent: booleanProp,
    /**
     * The value to set to the button’s type attribute. Valid values are: `button`, `submit`, `reset`.
     */
    type: buttonType,
    ...iconProps,
}

export const toggleButtonProps = {
    ...inputProps,
    /**
     * The number of items stored in the collection.
     */
    items: {
        type: Array,
        default: undefined,
        required: true
    },
    /**
     * Allow multiple choice or not.
     */
    multiple: booleanProp,
    /**
     * The input value to be monitored by `v-model`.
     */
    modelValue: {
        type: [String, Number, Boolean, Array],
        default: undefined
    },
    /**
     * Render this button with flat style (Google Material Text Button) or not.
     */
    flat: booleanProp,
    /**
     * Render this button with outlined style (Google Material Outlined Button) or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/#outline-buttons)}
     * for details.
     */
    outlined: booleanProp,
    /**
     * Render this button with raised style (Google Material Elevated Button) or not.
     */
    raised: booleanProp,
    /**
     * Render this button with rounded style or not, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/)}
     * for details.
     */
    rounded: booleanProp,
    /**
     * Render button with rounded-pill style (Google Material Button) or not.
     */
    pill: booleanTrueProp,
    /**
     * This button size, see
     * {@link [Bootstrap](https://getbootstrap.com/docs/5.3/components/buttons/#sizes)}
     * for details.
     */
    size: buttonSize,
    /**
     * Sets this button color.
     */
    color: defaultColorProp,
    /**
     * Color to apply when Button is active or selected.
     */
    toggleColor: stringProp,
    /**
     * Place icon at `left` (before text) or at `right` (after text).
     */
    iconPosition,
}
