import {defineComponent, h} from "vue";
import {height, useSizeHeight, useSizeWidth, width} from "./mixins/SizeProps";
import {flip, iconName, rotate, useSvgClasses} from "./mixins/Svg";
import {booleanProp} from "../../mixins/Commons";

export default defineComponent({
    name: "BsIconSvg",
    props: {
        /**
         * The SVG icon’s name.
         */
        icon: iconName,
        /**
         * The SVG icon’s height in pixel.
         */
        height,
        /**
         * The SVG icon’s width in pixel.
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
         * Flip the SVG icon, valid values are: `horizontal`, `vertical`, `both`.
         */
        flip,
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         */
        rotate,
    },
    setup(props) {
        return () => h(
            "svg",
            {
                "xmlns": "http://www.w3.org/2000/svg",
                "viewBox": "0 0 24 24",
                height: useSizeHeight(props),
                width: useSizeWidth(props),
                class: useSvgClasses(props),
            },
        )
    },
});
