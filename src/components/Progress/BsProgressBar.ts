import {computed, defineComponent, h} from "vue";
import {booleanProp, stringOrNumberProp, stringProp} from "../../mixins/CommonProps";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsProgressBar",
    props: {
        /**
         * The component color appearance.
         * @type {string}
         */
        color: stringProp,
        /**
         * The ProgressBar thickness.
         * @type {string|number}
         */
        height: stringOrNumberProp,
        /**
         * The value monitored by `v-model` to control the progress bar value.
         * @type {number}
         */
        modelValue: {
            type: Number,
            default: 0,
            validator: (value: number): boolean => value >= 0 && value <= 100
        },
        /**
         * Remove circle radius on progress bar's sides.
         * @type {boolean}
         */
        flat: booleanProp,
        /**
         * Create striped ProgressBar.
         * @type {boolean}
         */
        striped: booleanProp,
        /**
         * Create animated stripe ProgressBar.
         * @type {boolean}
         */
        stripedAnimation: booleanProp,
        /**
         * Display progress bar's value or not.
         * @type {boolean}
         */
        showValue: booleanProp,
    },
    setup(props) {
        const progressBarValueStyle = computed<string>(() => {
            return `width: ${props.modelValue}%`;
        });

        return () => {
            return h("div", {
                class: ["progress", props.flat ? "rounded-0" : ""],
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
