import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useContentTag} from "./mixins/cardApi";
import {cardContentProps} from "./mixins/cardProps";
import {TBsCardContent, TRecord} from "../../types";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";

export default defineComponent<TBsCardContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardContent",
    props: cardContentProps,
    setup(props, {slots}) {
        const tagName = computed((): string => useContentTag(<string>props.type, <string>props.tag));

        return () => useSimpleRenderWithSlots(
            tagName.value, slots,
            {[`card-${props.type}`]: tagName.value},
        );
    }
});
