import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {dividerProps} from "./mixins/dividerProps";
import {TBsDivider} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsDivider, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDivider",
    props: dividerProps,
    setup(props) {
        return () => useSimpleRenderWithSlots(
            "hr", null,
            [
                `${cssPrefix}divider`,
                props.dark ? "divider--dark" : "divider--light"
            ], {
                marginLeft: props.leftIndent ? Helper.sizeUnit(props.leftIndent) : null,
                marginRight: props.rightIndent ? Helper.sizeUnit(props.rightIndent) : null,
                height: props.thickness ? Helper.sizeUnit(props.thickness) : null,
            })
    }
});
