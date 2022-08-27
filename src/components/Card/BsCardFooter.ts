import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {TBsCardFooter} from "./types";
import {baseTagProps} from "./mixins/cardProps";

export default defineComponent<TBsCardFooter, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardFooter",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag, slots, "card-footer");
    }
});
