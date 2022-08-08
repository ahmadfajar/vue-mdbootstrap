import {defineComponent, h} from "vue";
import {BsIcon} from "../Icon";
import {useGetCalcSize, useSizeStyles} from "../Icon/mixins/SizeProps";
import {flip, rotate} from "../Icon/mixins/SvgProps";
import {useShapeClasses} from "../Basic/mixins/imageFunc";
import {useAvatarIconSize, useRenderAvatarImage} from "./mixins/avatarFunc";
import {TBsAvatarOptionProps} from "./mixins/types";
import {booleanProp, booleanTrueProp, cssPrefix, stringProp, validStringOrNumberProp} from "../../mixins/Commons";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: 'BsAvatar',
    props: {
        /**
         * This component's height.
         * @type {string|number|*}
         */
        height: validStringOrNumberProp,
        /**
         * This component's width.
         * @type {string|number|*}
         */
        width: validStringOrNumberProp,
        /**
         * Shortcut to create this component with equal height and width.
         * @type {string|number|*}
         */
        size: {
            type: [Number, String],
            default: 48,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * Align item inside, at the middle of this component. [`deprecated`]
         * @type {boolean}
         */
        center: booleanTrueProp,
        /**
         * Create this component with circle shape.
         * @type {boolean}
         */
        circle: booleanProp,
        /**
         * Create this component with rounded shape.
         * @type {boolean}
         */
        rounded: booleanProp,
        /**
         * Display an icon as avatar. Use valid
         * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) icon name.
         * @type {string|*}
         */
        icon: stringProp,
        /**
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         * @type {string|*}
         */
        iconFlip: flip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * @type {string|number|*}
         */
        iconRotation: rotate,
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
         * The image location to place inside this component.
         * @type {string|*}
         */
        imgSrc: stringProp,
        /**
         * The text to display inside the component.
         * Use short text (1 to 3 characters) to properly display it.
         * The text will be transformed to uppercase.
         * @type {string|*}
         */
        text: stringProp,
    },
    setup(props) {
        return () => h('div', {
            class: {
                [`${cssPrefix}-avatar`]: true,
                'p-2': useGetCalcSize(props as Readonly<TBsAvatarOptionProps>) > 72,
                ...useShapeClasses(props.circle, props.rounded),
            },
            style: useSizeStyles(props as Readonly<TBsAvatarOptionProps>),
        }, {
            default() {
                if (!Helper.isEmpty(props.imgSrc)) {
                    return useRenderAvatarImage(props as Readonly<TBsAvatarOptionProps>);
                } else if (!Helper.isEmpty(props.icon)) {
                    return h(BsIcon, {
                        size: useAvatarIconSize(props as Readonly<TBsAvatarOptionProps>),
                        icon: props.icon,
                        spin: props.iconSpin,
                        pulse: props.iconPulse,
                        flip: props.iconFlip,
                        rotate: props.iconRotation,
                    });
                } else {
                    return h('span',
                        {class: [`${cssPrefix}-avatar-text`]},
                        props.text || '??',
                    );
                }
            }
        })
    }
});
