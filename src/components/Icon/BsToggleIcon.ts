import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent, h} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {toggleIconProps} from "./mixins/iconProps";
import type {TBsIconSvg, TBsToggleIcon, TRecord, TToggleIconOptionProps} from "../../types";
import BsIconSvg from "./BsIconSvg";

export default defineComponent<TBsToggleIcon, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsToggleIcon",
    props: toggleIconProps,
    emits: [
        /**
         * Callback fired when this component is clicked.
         */
        "update:model-value",
    ],
    setup(props, {emit}) {
        const cmpProps = props as Readonly<TToggleIconOptionProps>;
        return () => h(
            "span", {
                class: [`${cssPrefix}toggle-icon`],
                onClick: () => emit("update:model-value", !cmpProps.modelValue),
            },
            h<TBsIconSvg>(BsIconSvg, {
                icon: (props.modelValue ? props.toggleIcon : props.icon),
                height: props.size,
                width: props.size,
            }),
        )
    }
});
