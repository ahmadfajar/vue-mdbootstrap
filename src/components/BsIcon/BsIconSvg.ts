import {defineComponent, h} from "vue";
import {booleanProp} from "../../mixins/Commons";
import {flip, iconName, rotate} from "./mixins/SvgProps";
import {height, useSizeHeight, useSizeWidth, width} from "./mixins/SizeProps";
import {useGoogleIcon, useRenderSvgIcon, useSvgClasses} from "./mixins/SvgFunc";

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
    async setup(props) {
        const iconObj = await useGoogleIcon(props.icon);

        if (iconObj) {
            return useRenderSvgIcon(iconObj, useSizeHeight(props), useSizeWidth(props), useSvgClasses(props));
        } else {
            return () => h("span")
        }
    },
});
