import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {TBsCardHeader} from "./types";
import {baseTagProps} from "./mixins/cardProps";
import {TRecord} from "../../types";

export default defineComponent<TBsCardHeader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardHeader",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag as string, slots, "card-header");
    }
});
