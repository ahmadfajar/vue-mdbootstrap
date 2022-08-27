import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useCreateSvgNode} from "../Icon/mixins/svgApi";
import {useShapeClasses, useSizeOrWh} from "./mixins/imageApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {imageHolderProps} from "./mixins/imageHolderProps";
import {TBsImageHolder} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsImageHolder, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsImageHolder",
    props: imageHolderProps,
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
