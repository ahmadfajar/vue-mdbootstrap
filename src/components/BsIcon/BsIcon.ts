import {defineComponent, h} from "vue";
import {height, size, useSizeHeight, useSizeWidth, width} from "./mixins/SizeProps";
import {flip, iconName, rotate} from "./mixins/Svg";
import {booleanProp, cssPrefix} from "../../mixins/Commons";
import BsIconSvg from "./BsIconSvg";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsIcon",
    props: {
        /**
         * The icon’s name or alias.
         */
        icon: iconName,
        /**
         * Shortcut to create icon with equal height and width.
         */
        size,
        /**
         * The icon’s height in pixel.
         */
        height,
        /**
         * The icon’s width in pixel.
         */
        width,
        /**
         * Apply **pulse** animation to the icon.
         */
        pulse: booleanProp,
        /**
         * Apply **spin** animation to the icon.
         */
        spin: booleanProp,
        /**
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         */
        flip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         */
        rotate,
    },
    setup(props) {
        const szHeight = useSizeHeight(props);
        const szWidth = useSizeWidth(props);

        return () => h(
            "span", {
                class: [`${cssPrefix}-icon`],
                style: {
                    "height": Helper.sizeUnit(szHeight),
                    "width": Helper.sizeUnit(szWidth),
                },
            }, [
                h(BsIconSvg, {
                    icon: props.icon,
                    height: props.height,
                    width: props.width,
                    spin: props.spin,
                    pulse: props.pulse,
                    flip: props.flip,
                    rotate: props.rotate,
                }),
            ]
        );
    }
});
