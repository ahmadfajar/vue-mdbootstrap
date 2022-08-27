import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useContentTag, useSimpleRenderWithSlots} from "./mixins/cardApi";
import {cardContentProps} from "./mixins/cardProps";
import {TBsCardContent} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsCardContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCardContent",
    props: cardContentProps,
    setup(props, {slots}) {
        const tagName = computed((): string => useContentTag(props.type as string, props.tag as string));

        return () => useSimpleRenderWithSlots(
            tagName.value, slots,
            {[`card-${props.type}`]: tagName.value},
        );
    }
});
