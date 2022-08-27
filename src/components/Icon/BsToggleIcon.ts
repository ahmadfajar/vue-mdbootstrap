import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {toggleIconProps} from "./mixins/iconProps";
import {TBsToggleIcon} from "./types";
import BsIconSvg from "./BsIconSvg";

export default defineComponent<TBsToggleIcon, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsToggleIcon",
    props: toggleIconProps,
    emits: [
        /**
         * Callback fired when this component is clicked.
         */
        "update:modelValue",
    ],
    setup(props, {emit}) {
        return () => h(
            "span", {
                class: [`${cssPrefix}toggle-icon`],
                onClick: () => emit("update:modelValue", !props.modelValue),
            },
            h(BsIconSvg, {
                icon: props.modelValue ? props.toggleIcon : props.icon,
                height: props.size,
                width: props.size,
            }),
        )
    }
});
