import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useBrowserIE } from '../../mixins/CommonApi';
import type { TBsProgress, TProgressOptionProps, TRecord } from '../../types';
import {
    useAttachStyleTag,
    useBufferMode,
    useDeterminateMode,
    useIndeterminateMode,
    useRenderProgressBar,
    useRenderProgressSpinner
} from './mixins/progressAnimationApi';
import { progressProps } from './mixins/progressProps';

export default defineComponent<TBsProgress, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsProgress',
    props: progressProps,
    setup(props) {
        const cmpProps = props as Readonly<TProgressOptionProps>;
        const hasAmountFill = computed<boolean>(() => {
            return useBufferMode(cmpProps) || useDeterminateMode(cmpProps);
        });
        const isProgressBar = computed<boolean>(
            () => cmpProps.type?.toLowerCase() === 'bar'
        );
        const circleRadius = computed<number>(() => {
            return ((<number>cmpProps.diameter) - (<number>cmpProps.stroke)) / 2;
        });
        const circleCircumference = computed<number>(
            () => 2 * Math.PI * circleRadius.value
        );
        const circleStrokeDashOffset = computed<string | undefined>(() => {
            if (useIndeterminateMode(cmpProps) && useBrowserIE()) {
                return (circleCircumference.value * 0.2) + 'px';
            }

            if (useDeterminateMode(cmpProps)) {
                return (circleCircumference.value * (100 - (<number>cmpProps.modelValue)) / 100) + 'px';
            }

            return undefined
        });
        const progressBarTrackStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `width: ${cmpProps.buffer}%`;
            }
            return undefined;
        });
        const progressBarValueStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `width: ${cmpProps.modelValue}%`;
            }
            return undefined;
        });
        const progressBarBufferStyle = computed<string | undefined>(() => {
            if (hasAmountFill.value) {
                return `left: calc(${cmpProps.buffer}% + 8px)`;
            }
            return undefined;
        });

        watch(
            () => props.diameter,
            (value) => {
                useAttachStyleTag(circleCircumference.value, (<number>value));
            }
        );
        onMounted(
            () => {
                useAttachStyleTag(circleCircumference.value, (<number>props.diameter));
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
