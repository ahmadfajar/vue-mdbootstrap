import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {baseTagProps} from "./mixins/cardProps";
import {TBsCardBody} from "./types";

export default defineComponent<TBsCardBody, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardBody",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag, slots, "card-body");
    }
});
