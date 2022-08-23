import {defineComponent, h} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, stringProp} from "../../mixins/CommonProps";
import {width as defaultSize} from "./mixins/IconApi";
import {spinnerSvgData, useCircleSizeStyles, useCreateSvgNode} from "./mixins/SvgApi";

export default defineComponent({
    name: "BsIconSpinner",
    props: {
        /**
         * The Icon color.
         * @type {string}
         */
        color: stringProp,
        /**
         * The icon’s size in pixel.
         * @type {number}
         */
        size: defaultSize,
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
    },
    setup(props) {
        return () => {
            return useCreateSvgNode(
                [
                    `${cssPrefix}svg-inline`,
                    "align-self-center",
                    props.spin ? `${cssPrefix}spin` : (props.pulse ? `${cssPrefix}pulse` : ""),
                    props.color ? `text-${props.color}` : "",
                ],
                useCircleSizeStyles(props.size as number),
                false, null,
                "0 0 512 512", {
                    role: "img"
                }, [
                    h("path", {
                        d: spinnerSvgData,
                        fill: "currentColor"
                    }),
                ]
            )
        }
    }
});
