import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, onMounted, watch} from "vue";
import {TBsProgress, TProgressOptionProps} from "./types";
import {
    useAttachStyleTag,
    useBufferMode,
    useDeterminateMode,
    useIndeterminateMode,
    useRenderProgressBar,
    useRenderProgressSpinner
} from "./mixins/progressAnimationApi";
import {useBrowserIE} from "../../mixins/CommonApi";
import {progressProps} from "./mixins/progressProps";


export default defineComponent<TBsProgress, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsProgress",
    props: progressProps,
    setup(props) {
        const cmpProps = props as Readonly<TProgressOptionProps>;
        const hasAmountFill = computed<boolean>(() => {
            return useBufferMode(cmpProps) || useDeterminateMode(cmpProps);
        });
        const isProgressBar = computed<boolean>(() => (props.type as string).toLowerCase() === "bar");
        const circleRadius = computed<number>(() => {
            return ((props.diameter as number) - (props.stroke as number)) / 2;
        });
        const circleCircumference = computed<number>(() => 2 * Math.PI * circleRadius.value);
        const circleStrokeDashOffset = computed<string | undefined>(() => {
            if (useDeterminateMode(cmpProps)) {
                return (circleCircumference.value * (100 - (props.modelValue as number)) / 100) + "px";
            }

            if (useIndeterminateMode(cmpProps) && useBrowserIE()) {
                return (circleCircumference.value * 0.2) + "px";
            }

            return undefined
        });
        const progressBarTrackStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `width: ${props.buffer}%`;
            }
            return undefined;
        });
        const progressBarValueStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `width: ${props.modelValue}%`;
            }
            return undefined;
        });
        const progressBarBufferStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `left: calc(${props.buffer}% + 8px)`;
            }
            return undefined;
        });

        watch(
            () => props.diameter,
            (value) => {
                useAttachStyleTag(circleCircumference.value, value as number);
            }
        );
        onMounted(
            () => {
                useAttachStyleTag(circleCircumference.value, (props.diameter as number));
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
