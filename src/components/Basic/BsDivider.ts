import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {dividerProps} from "./mixins/dividerProps";
import {TBsDivider, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsDivider, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDivider",
    props: dividerProps,
    setup(props) {
        return () => useSimpleRenderWithSlots(
            "hr", undefined,
            [
                `${cssPrefix}divider`,
                props.dark ? "divider--dark" : "divider--light"
            ], {
                marginLeft: props.leftIndent ? Helper.sizeUnit(<string>props.leftIndent) : null,
                marginRight: props.rightIndent ? Helper.sizeUnit(<string>props.rightIndent) : null,
                height: props.thickness ? Helper.sizeUnit(<string>props.thickness) : null,
            })
    }
});
