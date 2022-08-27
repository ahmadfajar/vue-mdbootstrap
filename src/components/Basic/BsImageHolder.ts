import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useCreateSvgNode} from "../Icon/mixins/svgApi";
import {useShapeClasses, useSizeOrWh} from "./mixins/imageApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {imageHolderProps} from "./mixins/imageHolderProps";
import {TBsImageHolder, TImageHolderOptionProps} from "./types";
import {TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsImageHolder, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsImageHolder",
    props: imageHolderProps,
    setup(props) {
        const cmpProps = props as Readonly<TImageHolderOptionProps>;
        const showText = () => {
            return !Helper.isEmpty(props.placeholderText) || !Helper.isEmpty(props.placeHolder);
        };

        return () => {
            return useCreateSvgNode({
                [`${cssPrefix}img-holder`]: true,
                [`${cssPrefix}anchor-center`]: cmpProps.xPos === "50%",
                ...useShapeClasses(cmpProps.circle, cmpProps.rounded),
            }, [], false, "xMidYMid slice", null, {
                height: useSizeOrWh(cmpProps.size, cmpProps.height),
                width: useSizeOrWh(cmpProps.size, cmpProps.width),
                role: "img",
            }, [
                showText() ? h("title", cmpProps.placeholderText || cmpProps.placeHolder) : null,
                h("rect", {width: "100%", height: "100%", fill: cmpProps.bgColor}),
                showText()
                    ? h("text", {
                        fill: cmpProps.textColor,
                        x: Helper.sizeUnit(cmpProps.xPos),
                        y: Helper.sizeUnit(cmpProps.yPos),
                    }, cmpProps.placeholderText || cmpProps.placeHolder || [])
                    : null,
            ]);
        }
    }
});
