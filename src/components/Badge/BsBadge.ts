import {defineComponent} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";

export default defineComponent({
    name: "BsBadge",
    props: {
        /**
         * The badge color appearance.
         * @type {string}
         */
        color: {
            type: String,
            default: "default text-white",
        },
        /**
         * Html tag used to render the badge.
         * @type {string}
         */
        tag: {
            type: String,
            default: "span",
        },
        /**
         * Create badge with `pill` or `label` style.
         * @type {string}
         */
        type: {
            type: String,
            default: undefined,
            validator: (value: string): boolean => ["label", "pill"].includes(value),
        },
        /**
         * Create contextual badge with
         * [Bootstrap theme color](https://getbootstrap.com/docs/5.2/components/badge/#background-colors).
         * @type {string}
         */
        variant: {
            type: String,
            default: undefined,
            validator: (value: string): boolean => [
                "primary", "secondary", "success", "warning",
                "danger", "info", "light", "dark"
            ].includes(value),
        },
    },
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
