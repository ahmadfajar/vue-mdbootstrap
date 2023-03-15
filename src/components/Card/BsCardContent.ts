import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent} from "vue";
import {useContentTag} from "./mixins/cardApi";
import {cardContentProps} from "./mixins/cardProps";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import type {TBsCardContent, TRecord} from "../../types";

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
