import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {baseTagProps} from "./mixins/cardProps";
import {TBsCardFooter, TRecord} from "../../types";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";

export default defineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardFooter",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, "card-footer");
    }
});
