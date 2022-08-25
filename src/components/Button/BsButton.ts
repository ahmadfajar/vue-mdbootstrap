import {computed, defineComponent, h} from "vue";
import {booleanProp, booleanTrueProp, defaultColorProp, stringProp} from "../../mixins/CommonProps";
import {iconProps} from "../Avatar/mixins/avatarProps";
import {width as iconSize} from "../Icon/mixins/IconApi";
import {buttonMode, buttonSize, buttonType, iconPosition} from "./mixins/buttonProps";
import {useMakeButtonProps, useRenderButtonContent} from "./mixins/buttonApi";
import {TButtonOptionProps} from "./types";
import BsButtonInner from "./BsButtonInner";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsButton",
    props: {
        /**
         * Sets this button state: `active` or `normal`.
         * @type {boolean}
         */
        active: booleanProp,
        /**
         * Sets this button color.
         * @type {string}
         */
        color: defaultColorProp,
        /**
         * Sets this button state: `enabled` or `disabled`.
         * @type {boolean}
         */
        disabled: booleanProp,
        /**
         * This button component mode, valid values are: `default, icon, floating`.
         * @type {string}
         */
        mode: buttonMode,
        /**
         * Render this button component as dropdowns button or not, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/dropdowns/)}
         * for details.
         * @type {boolean}
         */
        dropdownToggle: booleanProp,
        /**
         * Render this button with flat style (Google Material Text Button) or not.
         * @type {boolean}
         */
        flat: booleanProp,
        /**
         * Render this button with outlined style (Google Material Outlined Button) or not, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#outline-buttons)}
         * for details.
         * @type {boolean}
         */
        outlined: booleanProp,
        /**
         * Render this button with raised style (Google Material Elevated Button) or not.
         * @type {boolean}
         */
        raised: booleanProp,
        /**
         * Render this button with rounded style or not, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/)}
         * for details.
         * @type {boolean}
         */
        rounded: booleanProp,
        /**
         * Render button with rounded-pill style (Google Material Button) or not.
         * @type {boolean}
         */
        pill: booleanTrueProp,
        /**
         * Render component as `<a>` element and define its `href` property and
         * apply button styles to the element.
         * @type {string}
         */
        href: stringProp,
        /**
         * This button size, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#sizes)}
         * for details.
         * @type {string}
         */
        size: buttonSize,
        /**
         * Place icon on the `left` side (before text) or on the `right` side (after text).
         * @type {string}
         */
        iconPosition,
        /**
         * Render the icon with predefined size.
         * @type {number}
         */
        iconSize,
        /**
         * Enabled or disabled **ripple** effect.
         * @type {boolean}
         */
        rippleOff: booleanProp,
        /**
         * Render button with transparent style or not.
         * @type {boolean}
         */
        transparent: booleanProp,
        /**
         * The value to set to the button’s type attribute. Valid values are: `button`, `submit`, `reset`.
         * @type {string}
         */
        type: buttonType,
        ...iconProps,
    },
    emits: ['click'],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TButtonOptionProps>;
        const buttonType = computed<string | null>(() => {
            if (Helper.isEmpty(props.href)) {
                return props.type;
            }
            return null;
        });
        const hasIcon = computed<boolean>((): boolean => {
            return (!Helper.isEmpty(props.icon) || (slots.icon !== undefined));
        });
        const isDisabled = computed<boolean>(() => props.disabled && Helper.isEmpty(props.href));
        const rippleOff = computed<boolean>(() => props.rippleOff && isDisabled.value);
        const tagName = computed<string>(() => !Helper.isEmpty(props.href) ? 'a' : 'button');

        return () => {
            return h(tagName.value, {
                ...useMakeButtonProps(
                    cmpProps, isDisabled.value, buttonType.value,
                ),
                onClick: (event: Event): void => emit('click', event),
            }, [
                h(BsButtonInner, {
                    dropdownToggle: props.dropdownToggle,
                    iconMode: props.mode === 'icon',
                    hasIcon: hasIcon.value,
                    rippleOff: rippleOff.value,
                }, {
                    default: () => useRenderButtonContent(slots, cmpProps)
                }),
            ]);
        }
    }
});
