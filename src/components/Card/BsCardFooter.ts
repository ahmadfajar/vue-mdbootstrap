import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {baseTagProps} from "./mixins/cardProps";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import type {TBsCardFooter, TRecord} from "../../types";

export default defineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardFooter",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, "card-footer");
    }
});
