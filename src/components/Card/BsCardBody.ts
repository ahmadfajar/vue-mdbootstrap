import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {baseTagProps} from "./mixins/cardProps";
import {TBsCardBody} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsCardBody, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardBody",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, "card-body");
    }
});
