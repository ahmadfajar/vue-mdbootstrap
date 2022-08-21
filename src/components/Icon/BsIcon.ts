import {defineComponent, h} from "vue";
import {height, size, useSizeHeight, useSizeStyles, useSizeWidth, width} from "./mixins/IconApi";
import {flip, iconName, rotate} from "./mixins/SvgProps";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {TIconOptionProps} from "./types";
import BsIconSvg from "./BsIconSvg";

export default defineComponent({
    name: "BsIcon",
    props: {
        /**
         * The icon’s name or alias.
         * @type {string}
         */
        icon: iconName,
        /**
         * Shortcut to create icon with equal height and width.
         * @type {number}
         */
        size,
        /**
         * The icon’s height in pixel.
         * @type {number}
         */
        height,
        /**
         * The icon’s width in pixel.
         * @type {number}
         */
        width,
        /**
         * Apply **pulse** animation to the icon.
         * @type {boolean}
         */
        pulse: booleanProp,
        /**
         * Apply **spin** animation to the icon.
         * @type {boolean}
         */
        spin: booleanProp,
        /**
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         * @type {string}
         */
        flip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * @type {number}
         */
        rotate,
    },
    setup(props) {
        const szHeight = useSizeHeight(props as Readonly<TIconOptionProps>);
        const szWidth = useSizeWidth(props as Readonly<TIconOptionProps>);

        return () => h(
            "span", {
                class: [`${cssPrefix}-icon`],
                style: useSizeStyles(props as Readonly<TIconOptionProps>),
            }, h(BsIconSvg, {
                icon: props.icon,
                height: szHeight,
                width: szWidth,
                spin: props.spin,
                pulse: props.pulse,
                flip: props.flip,
                rotate: props.rotate,
            }),
        );
        // return () => h(
        //     Suspense, {}, {
        //         default: () => h(
        //             "span", {
        //                 class: [`${cssPrefix}-icon`],
        //                 style: {
        //                     "height": Helper.sizeUnit(szHeight),
        //                     "width": Helper.sizeUnit(szWidth),
        //                 },
        //             }, h(BsIconSvg, {
        //                 icon: props.icon,
        //                 height: szHeight,
        //                 width: szWidth,
        //                 spin: props.spin,
        //                 pulse: props.pulse,
        //                 flip: props.flip,
        //                 rotate: props.rotate,
        //             }),
        //         ),
        //         fallback: () => h("span"),
        //     }
        // )
    }
});
