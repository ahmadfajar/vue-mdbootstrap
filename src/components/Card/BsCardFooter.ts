import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {TBsCardFooter} from "./types";
import {baseTagProps} from "./mixins/cardProps";
import {TRecord} from "../../types";

export default defineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardFooter",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag as string, slots, "card-footer");
    }
});
