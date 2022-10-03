import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, Prop} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {toggleIconProps} from "./mixins/iconProps";
import {TBsIconSvg, TBsToggleIcon, TToggleIconOptionProps} from "./types";
import {TRecord} from "../../types";
import BsIconSvg from "./BsIconSvg";

export default defineComponent<TBsToggleIcon, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsToggleIcon",
    props: toggleIconProps,
    emits: [
        /**
         * Callback fired when this component is clicked.
         */
        "update:modelValue",
    ],
    setup(props, {emit}) {
        const cmpProps = props as Readonly<TToggleIconOptionProps>;
        return () => h(
            "span", {
                class: [`${cssPrefix}toggle-icon`],
                onClick: () => emit("update:modelValue", !cmpProps.modelValue),
            },
            h<TBsIconSvg>(BsIconSvg, {
                icon: (props.modelValue ? props.toggleIcon : props.icon),
                height: props.size,
                width: props.size,
            }),
        )
    }
});
