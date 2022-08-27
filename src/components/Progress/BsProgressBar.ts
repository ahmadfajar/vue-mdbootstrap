import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {progressBarProps} from "./mixins/progressBarProps";
import {TBsProgressBar} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsProgressBar, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsProgressBar",
    props: progressBarProps,
    setup(props) {
        const progressBarValueStyle = computed<string>(() => {
            return `width: ${props.modelValue}%`;
        });

        return () => {
            return h("div", {
                class: ["progress", props.rounded === false ? "rounded-0" : ""],
                style: {
                    height: Helper.sizeUnit(props.height)
                }
            }, [
                h("div", {
                    class: [
                        "progress-bar",
                        props.striped ? "progress-bar-striped" : "",
                        props.stripedAnimation ? "progress-bar-animated" : "",
                        props.color ? `bg-${props.color}` : "",
                    ],
                    style: progressBarValueStyle.value,
                    "role": "progressbar",
                    "aria-valuenow": props.modelValue,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                }, props.showValue ? `${props.modelValue}%` : "")
            ]);
        }
    }
});
