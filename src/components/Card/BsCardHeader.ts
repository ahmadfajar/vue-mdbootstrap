import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {baseTagProps} from "./mixins/cardProps";
import {TBsCardHeader, TRecord} from "../../types";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";

export default defineComponent<TBsCardHeader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardHeader",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, "card-header");
    }
});
