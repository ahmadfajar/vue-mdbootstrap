import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import type { TBsProgressBar, TProgressBarOptionProps, TRecord } from '../../types';
import { progressBarProps } from './mixins/progressBarProps';
import { useRenderProgressBar } from './mixins/progressControlApi';

export default defineComponent<TBsProgressBar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsProgressBar',
    props: progressBarProps,
    setup(props) {
        const thisProps = props as Readonly<TProgressBarOptionProps>;

        return () => useRenderProgressBar(thisProps)
    }
});
