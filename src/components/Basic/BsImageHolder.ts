import {defineComponent, h} from "vue";
import {useCreateSvgNode} from "../Icon/mixins/SvgApi";
import {useShapeClasses, useSizeOrWh} from "./mixins/imageApi";
import {booleanProp, stringOrNumberProp, stringProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsImageHolder",
    props: {
        /**
         * This component's height.
         * @type {number}
         */
        height: stringOrNumberProp,
        /**
         * This component's width.
         * @type {number}
         */
        width: stringOrNumberProp,
        /**
         * Shortcut to create this component with equal height and width.
         * @type {number}
         */
        size: stringOrNumberProp,
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
         * This component's background color, must be in html hex coloring number.
         * @type {string}
         */
        bgColor: {
            type: String,
            default: "#868e96"
        },
        /**
         * This component's text color, must be in html hex coloring number.
         * @type {string}
         */
        textColor: {
            type: String,
            default: "#dee2e6"
        },
        /**
         * Short text as placeholder `[deprecated]`.
         * @type {string}
         */
        placeHolder: stringProp,
        /**
         * Short text as placeholder.
         * @type {string}
         */
        placeholderText: stringProp,
        /**
         * Text placeholder X position.
         * @type {string|number}
         */
        xPos: {
            type: [String, Number],
            default: "50%"
        },
        /**
         * Text placeholder Y position.
         * @type {string|number}
         */
        yPos: {
            type: [String, Number],
            default: "50%"
        },
    },
    setup(props) {
        const showText = () => {
            return !Helper.isEmpty(props.placeholderText) || !Helper.isEmpty(props.placeHolder);
        };

        return () => {
            return useCreateSvgNode({
                [`${cssPrefix}img-holder`]: true,
                [`${cssPrefix}anchor-center`]: props.xPos === "50%",
                ...useShapeClasses(props.circle, props.rounded),
            }, [], false, "xMidYMid slice", null, {
                height: useSizeOrWh(props.size, props.height),
                width: useSizeOrWh(props.size, props.width),
                role: "img",
            }, [
                showText() ? h("title", props.placeholderText || props.placeHolder) : null,
                h("rect", {width: "100%", height: "100%", fill: props.bgColor}),
                showText()
                    ? h("text", {
                        fill: props.textColor,
                        x: Helper.sizeUnit(props.xPos),
                        y: Helper.sizeUnit(props.yPos),
                    }, props.placeholderText || props.placeHolder)
                    : null,
            ]);
        }
    }
});
