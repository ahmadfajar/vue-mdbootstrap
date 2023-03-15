import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {baseTagProps} from "./mixins/cardProps";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import type {TBsCardBody, TRecord} from "../../types";

export default defineComponent<TBsCardBody, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardBody",
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, "card-body");
    }
});
