import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {dividerProps} from "./mixins/dividerProps";
import {TBsDivider} from "./types";
import {TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsDivider, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDivider",
    props: dividerProps,
    setup(props) {
        return () => useSimpleRenderWithSlots(
            "hr", null,
            [
                `${cssPrefix}divider`,
                props.dark ? "divider--dark" : "divider--light"
            ], {
                marginLeft: props.leftIndent ? Helper.sizeUnit(props.leftIndent as string) : null,
                marginRight: props.rightIndent ? Helper.sizeUnit(props.rightIndent as string) : null,
                height: props.thickness ? Helper.sizeUnit(props.thickness as string) : null,
            })
    }
});
