import {computed, defineComponent, onMounted, watch} from "vue";
import {TBsProgressOptionProps} from "./types";
import {
    useAttachStyleTag,
    useBufferMode,
    useDeterminateMode,
    useIndeterminateMode,
    useRenderProgressBar,
    useRenderProgressSpinner
} from "./mixins/progressAnimationApi";
import {useBrowserIE} from "../../mixins/CommonApi";
import {primaryColorProp} from "../../mixins/CommonProps";


export default defineComponent({
    name: "BsProgress",
    props: {
        /**
         * ProgressBar buffer length.
         * @type {number}
         */
        buffer: {
            type: [String, Number],
            default: 0,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * The component color appearance.
         * @type {string}
         */
        color: primaryColorProp,
        /**
         * Spinner diameter value.
         * @type {number}
         */
        diameter: {
            type: [String, Number],
            default: 60,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * ProgressBar thickness.
         * @type {number}
         */
        height: {
            type: [String, Number],
            default: 5,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * Spinner thickness.
         * @type {number}
         */
        stroke: {
            type: [String, Number],
            default: 6,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * The value monitored by `v-model` to control the progress value.
         * @type {number}
         */
        modelValue: {
            type: Number,
            default: 0
        },
        /**
         * ProgressControl mode, valid values are: `determinate`, `indeterminate`, `buffer`.
         * @type {string}
         */
        mode: {
            type: String,
            default: 'indeterminate',
            validator: (value: string): boolean => ['determinate', 'indeterminate', 'buffer'].includes(value)
        },
        /**
         * ProgressControl type, valid values are: `spinner`, `bar`.
         * @type {string}
         */
        type: {
            type: String,
            default: 'bar',
            validator: (value: string): boolean => ['spinner', 'bar'].includes(value)
        },
    },
    setup(props) {
        const cmpProps = props as Readonly<TBsProgressOptionProps>;
        const hasAmountFill = computed<boolean>(() => {
            return useBufferMode(cmpProps) && useDeterminateMode(cmpProps);
        });
        const isProgressBar = computed<boolean>(() => cmpProps.type.toLowerCase() === "bar");
        const circleRadius = computed<number>(() => {
            return (cmpProps.diameter - cmpProps.stroke) / 2;
        });
        const circleCircumference = computed<number>(() => 2 * Math.PI * circleRadius.value);
        const circleStrokeDashOffset = computed<string | null>(() => {
            if (useDeterminateMode(cmpProps)) {
                return (circleCircumference.value * (100 - props.modelValue) / 100) + "px";
            }

            if (useIndeterminateMode(cmpProps) && useBrowserIE()) {
                return (circleCircumference.value * 0.2) + "px";
            }

            return null
        });
        const progressBarTrackStyle = computed<string | null>(() => {
            if (hasAmountFill.value) {
                return `width: ${cmpProps.buffer}%`;
            }
            return null;
        });
        const progressBarValueStyle = computed<string | null>(() => {
            if (hasAmountFill.value) {
                return `width: ${props.modelValue}%`;
            }
            return null;
        });
        const progressBarBufferStyle = computed<string | null>(() => {
            if (hasAmountFill.value) {
                return `left: calc(${cmpProps.buffer}% + 8px)`;
            }
            return null;
        });

        watch(
            () => props.diameter,
            (diameter: number) => {
                console.log("watch-event: attaching StyleTag...");
                useAttachStyleTag(circleCircumference.value, diameter);
            }
        );
        onMounted(
            () => {
                console.log("onMounted-event: attaching StyleTag...");
                useAttachStyleTag(circleCircumference.value, cmpProps.diameter);
            }
        );

        return () => {
            return isProgressBar.value ? useRenderProgressBar(
                cmpProps, progressBarTrackStyle,
                progressBarValueStyle,
                progressBarBufferStyle,
            ) : useRenderProgressSpinner(
                cmpProps, circleStrokeDashOffset,
                circleCircumference, circleRadius,
            );
        }
    }
});
