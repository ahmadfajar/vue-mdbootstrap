import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {badgeProps} from "./mixins/badgeProps";
import {TBadgeOptionProps, TBsBadge} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsBadge, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsBadge",
    props: badgeProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TBadgeOptionProps>;

        return () => useSimpleRenderWithSlots(
            cmpProps.tag || "span", slots,
            [
                "badge",
                cmpProps.type ? `badge-${cmpProps.type}` : "",
                cmpProps.variant ? `text-bg-${cmpProps.variant}` : `bg-${cmpProps.color}`,
            ]
        )
    }
});
