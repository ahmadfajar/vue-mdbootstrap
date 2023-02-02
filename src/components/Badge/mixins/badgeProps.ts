import {defaultColorProp} from "../../../mixins/CommonProps";

export const badgeProps = {
    /**
     * The badge color appearance.
     * @type {string}
     */
    color: defaultColorProp,
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
}
