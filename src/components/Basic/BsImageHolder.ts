import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent, h, toDisplayString} from "vue";
import {useSizeHeight, useSizeWidth} from "../Icon/mixins/iconApi";
import {useCreateSvgNode} from "../Icon/mixins/svgApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {imageHolderProps} from "./mixins/imageHolderProps";
import {useShapeClasses} from "../Avatar/mixins/avatarApi";
import type {TBsImageHolder, TImageHolderOptionProps, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsImageHolder, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsImageHolder",
    props: imageHolderProps,
    setup(props) {
        const cmpProps = props as Readonly<TImageHolderOptionProps>;
        const showText = () => {
            return !Helper.isEmpty(props.placeholderText) || !Helper.isEmpty(props.placeHolder);
        };
        const szHeight = useSizeHeight(cmpProps);
        const szWidth = useSizeWidth(cmpProps);

        return () => {
            return useCreateSvgNode({
                [`${cssPrefix}img-holder`]: true,
                [`${cssPrefix}anchor-center`]: cmpProps.xPos === "50%",
                ...useShapeClasses(cmpProps.circle, cmpProps.rounded),
            }, [], false, "xMidYMid slice", null, {
                height: !szHeight || (<number>szHeight < 2) ? "100%" : Helper.cssUnit(szHeight),
                width: !szWidth || (<number>szWidth < 2) ? "100%" : Helper.cssUnit(szWidth),
                role: "img",
            }, [
                showText()
                    ? h("title", toDisplayString(cmpProps.placeholderText || cmpProps.placeHolder))
                    : undefined,
                h("rect", {width: "100%", height: "100%", fill: cmpProps.bgColor}),
                showText()
                    ? h("text", {
                            fill: cmpProps.textColor,
                            x: Helper.cssUnit(cmpProps.xPos),
                            y: Helper.cssUnit(cmpProps.yPos),
                        },
                        toDisplayString(cmpProps.placeholderText || cmpProps.placeHolder)
                    )
                    : undefined,
            ]);
        }
    }
});
