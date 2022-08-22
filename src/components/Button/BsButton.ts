import {computed, defineComponent, h} from "vue";
import {booleanProp, booleanTrueProp, defaultColorProp, stringProp} from "../../mixins/CommonProps";
import {width as iconSize} from "../Icon/mixins/IconApi";
import {flip as iconFlip, rotate as iconRotation} from "../Icon/mixins/SvgProps";
import {buttonMode, buttonSize, buttonType, iconPosition} from "./mixins/buttonProps";
import {useButtonProps, useRenderButtonContent} from "./mixins/buttonApi";
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
         * Shortcut to insert component `BsIcon` inside this button component.
         * Use any valid Google Material icon name, see
         * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
         * for details.
         * @type {string}
         */
        icon: stringProp,
        /**
         * Place icon at `left` (before text) or at `right` (after text).
         * @type {string}
         */
        iconPosition,
        /**
         * Render the icon with predefined size.
         * @type {number}
         */
        iconSize,
        /**
         * Apply **spin** animation to the icon.
         * @type {boolean}
         */
        iconSpin: booleanProp,
        /**
         * Apply **pulse** animation to the icon.
         * @type {boolean}
         */
        iconPulse: booleanProp,
        /**
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         * @type {string}
         */
        iconFlip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * @type {string|number}
         */
        iconRotation,
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
        const hasIcon = computed<boolean>(() => {
            return props.icon && !Helper.isEmpty(props.icon) &&
                (props.mode === 'icon' || props.mode === 'floating');
        });
        const isDisabled = computed<boolean>(() => props.disabled && Helper.isEmpty(props.href));
        const rippleWorks = computed<boolean>(() => !props.rippleOff && !isDisabled.value);
        const tagName = computed<string>(() => !Helper.isEmpty(props.href) ? 'a' : 'button');

        return () => {
            return h(tagName.value, {
                ...useButtonProps(
                    cmpProps,
                    isDisabled.value, buttonType.value,
                ),
                onClick: (event: Event): void => emit('click', event),
            }, [
                h(BsButtonInner, {
                    dropdownToggle: props.dropdownToggle,
                    iconMode: props.mode === 'icon',
                    rippleOff: !rippleWorks.value,
                }, {
                    default: () => useRenderButtonContent(slots, hasIcon.value, cmpProps)
                }),
            ]);
        }
    }
});
