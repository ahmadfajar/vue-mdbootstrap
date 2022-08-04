import {computed, defineComponent, h} from "vue";
import {height} from "./mixins/SizeProps";
import {iconName} from "./mixins/Svg";
import {booleanProp, cssPrefix} from "../../mixins/Commons";
import BsIconSvg from "./BsIconSvg";

export default defineComponent({
    name: "BsIconToggle",
    props: {
        icon: iconName,
        /**
         * The icon to display when `value` property is `true`.
         */
        toggleIcon: iconName,
        /**
         * Value monitored by `v-model` to maintain this component state.
         */
        modelValue: booleanProp,
        /**
         * The icon size.
         */
        size: height,
    },
    emits: [
        /**
         * Callback fired when this component is clicked.
         */
        "update:modelValue",
    ],
    setup(props, {emit}) {
        const toggleIcon = computed((): string => props.modelValue ? props.toggleIcon : props.icon);

        return () => h(
            "span", {
                class: [`${cssPrefix}-toggle-icon`],
                onClick: () => {
                    emit("update:modelValue", !props.modelValue);
                },
            }, [
                h(BsIconSvg, {
                    icon: toggleIcon.value,
                    height: props.size,
                    width: props.size,
                }),
            ],
        );
    }
});
