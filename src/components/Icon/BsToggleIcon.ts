import {defineComponent, h} from "vue";
import {height as defaultSize} from "./mixins/IconApi";
import {iconName} from "./mixins/SvgProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp} from "../../mixins/CommonProps";
import BsIconSvg from "./BsIconSvg";

export default defineComponent({
    name: "BsToggleIcon",
    props: {
        /**
         * The icon’s name or alias.
         * @type {string}
         */
        icon: iconName,
        /**
         * The icon to display when `value` property is `true`.
         * @type {string}
         */
        toggleIcon: iconName,
        /**
         * Value monitored by `v-model` to maintain this component state.
         * @type {boolean}
         */
        modelValue: booleanProp,
        /**
         * The icon size in pixels.
         * @type {number}
         */
        size: defaultSize,
    },
    emits: [
        /**
         * Callback fired when this component is clicked.
         */
        "update:modelValue",
    ],
    setup(props, {emit}) {
        return () => h(
            "span", {
                class: [`${cssPrefix}-toggle-icon`],
                onClick: () => emit("update:modelValue", !props.modelValue),
            },
            h(BsIconSvg, {
                icon: props.modelValue ? props.toggleIcon : props.icon,
                height: props.size,
                width: props.size,
            }),
        )

        // return () => h(
        //     Suspense, {}, {
        //         default: () => h(
        //             "span", {
        //                 class: [`${cssPrefix}-toggle-icon`],
        //                 onClick: () => {
        //                     emit("update:modelValue", !props.modelValue);
        //                 },
        //             },
        //             h(BsIconSvg, {
        //                 // id: generateId(),
        //                 icon: props.modelValue ? props.toggleIcon : props.icon,
        //                 height: props.size,
        //                 width: props.size,
        //             }),
        //         ),
        //         fallback: () => h("span"),
        //     }
        // )
    }
});
