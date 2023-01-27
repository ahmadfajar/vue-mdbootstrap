import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {badgeProps} from "./mixins/badgeProps";
import type {TBadgeOptionProps, TBsBadge, TRecord} from "../../types";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";

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
