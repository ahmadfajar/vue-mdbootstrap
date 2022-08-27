import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {TBsCardHeader} from "./types";
import {baseTagProps} from "./mixins/cardProps";

export default defineComponent<TBsCardHeader, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardHeader",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag, slots, "card-header");
    }
});
