import { computed, defineComponent, onMounted, watch } from 'vue';
import { useBrowserIE } from '../../mixins/CommonApi';
import {
    useAttachStyleTag,
    useBufferMode,
    useDeterminateMode,
    useIndeterminateMode,
    useRenderAnimatedProgressBar,
    useRenderAnimatedProgressSpinner,
} from './mixins/progressControlApi';
import { progressProps } from './mixins/progressProps';
import type { TBsProgress, TProgressOptionProps } from './types';

export default defineComponent<TBsProgress>({
    name: 'BsProgress',
    props: progressProps,
    setup(props) {
        const thisProps = props as Readonly<TProgressOptionProps>;
        const hasAmountFill = computed<boolean>(() => {
            return useBufferMode(thisProps) || useDeterminateMode(thisProps);
        });
        const isProgressBar = computed<boolean>(() => thisProps.type?.toLowerCase() === 'bar');
        const circleRadius = computed<number>(() => {
            return ((thisProps.diameter as number) - (thisProps.stroke as number)) / 2;
        });
        const circleCircumference = computed<number>(() => 2 * Math.PI * circleRadius.value);
        const circleStrokeDashOffset = computed<string | undefined>(() => {
            if (useIndeterminateMode(thisProps) && useBrowserIE()) {
                return circleCircumference.value * 0.2 + 'px';
            }

            if (useDeterminateMode(thisProps)) {
                return (
                    (circleCircumference.value * (100 - (thisProps.modelValue as number))) / 100 +
                    'px'
                );
            }

            return undefined;
        });
        const progressBarTrackStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `width: ${thisProps.buffer}%`;
            }
            return undefined;
        });
        const progressBarValueStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `width: ${thisProps.modelValue}%`;
            }
            return undefined;
        });
        const progressBarBufferStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `left: calc(${thisProps.buffer}% + 8px)`;
            }
            return undefined;
        });

        watch(
            () => props.diameter,
            (value) => {
                useAttachStyleTag(circleCircumference.value, value as number);
            }
        );
        onMounted(() => {
            useAttachStyleTag(circleCircumference.value, props.diameter as number);
        });

        return () => {
            return isProgressBar.value
                ? useRenderAnimatedProgressBar(
                      thisProps,
                      progressBarTrackStyle,
                      progressBarValueStyle,
                      progressBarBufferStyle
                  )
                : useRenderAnimatedProgressSpinner(
                      thisProps,
                      circleStrokeDashOffset,
                      circleCircumference,
                      circleRadius
                  );
        };
    },
});
