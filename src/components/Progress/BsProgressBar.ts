import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, h } from 'vue';
import type { TBsProgressBar, TProgressBarOptionProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { progressBarProps } from './mixins/progressBarProps';

export default defineComponent<TBsProgressBar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsProgressBar',
    props: progressBarProps,
    setup(props) {
        const cmpProps = props as Readonly<TProgressBarOptionProps>;
        const progressBarValueStyle = computed<string>(() => {
            return `width: ${props.modelValue}%`;
        });

        return () => {
            return h('div', {
                class: ['progress', cmpProps.rounded === false ? 'rounded-0' : ''],
                style: {
                    height: Helper.cssUnit(cmpProps.height)
                }
            }, [
                h('div', {
                    class: [
                        'progress-bar',
                        cmpProps.striped ? 'progress-bar-striped' : '',
                        cmpProps.stripedAnimation ? 'progress-bar-animated' : '',
                        cmpProps.color ? `bg-${cmpProps.color}` : '',
                    ],
                    style: progressBarValueStyle.value,
                    'role': 'progressbar',
                    'aria-valuenow': cmpProps.modelValue,
                    'aria-valuemin': 0,
                    'aria-valuemax': 100,
                }, cmpProps.showValue ? `${cmpProps.modelValue}%` : '')
            ]);
        }
    }
});
