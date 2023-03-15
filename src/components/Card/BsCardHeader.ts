import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {baseTagProps} from "./mixins/cardProps";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import type {TBsCardHeader, TRecord} from "../../types";

export default defineComponent<TBsCardHeader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardHeader",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, "card-header");
    }
});
