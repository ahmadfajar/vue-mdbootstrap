import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {badgeProps} from "./mixins/badgeProps";
import {TBsBadge} from "./types";

export default defineComponent<TBsBadge, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsBadge",
    props: badgeProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(
            props.tag, slots,
            [
                "badge",
                props.type ? `badge-${props.type}` : "",
                props.variant ? `text-bg-${props.variant}` : `bg-${props.color}`,
            ]
        )
    }
});
