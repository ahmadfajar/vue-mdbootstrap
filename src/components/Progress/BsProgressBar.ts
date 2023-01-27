import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, h} from "vue";
import {progressBarProps} from "./mixins/progressBarProps";
import type {TBsProgressBar, TProgressBarOptionProps} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsProgressBar, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsProgressBar",
    props: progressBarProps,
    setup(props) {
        const cmpProps = props as Readonly<TProgressBarOptionProps>;
        const progressBarValueStyle = computed<string>(() => {
            return `width: ${props.modelValue}%`;
        });

        return () => {
            return h("div", {
                class: ["progress", cmpProps.rounded === false ? "rounded-0" : ""],
                style: {
                    height: Helper.sizeUnit(cmpProps.height)
                }
            }, [
                h("div", {
                    class: [
                        "progress-bar",
                        cmpProps.striped ? "progress-bar-striped" : "",
                        cmpProps.stripedAnimation ? "progress-bar-animated" : "",
                        cmpProps.color ? `bg-${cmpProps.color}` : "",
                    ],
                    style: progressBarValueStyle.value,
                    "role": "progressbar",
                    "aria-valuenow": cmpProps.modelValue,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                }, cmpProps.showValue ? `${cmpProps.modelValue}%` : "")
            ]);
        }
    }
});
