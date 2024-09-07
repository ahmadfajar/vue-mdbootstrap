import { defineComponent } from 'vue';
import { progressBarProps } from './mixins/progressBarProps';
import { useRenderProgressBar } from './mixins/progressControlApi';
import type { TBsProgressBar, TProgressBarOptionProps } from './types';

export default defineComponent<TBsProgressBar>({
    name: 'BsProgressBar',
    props: progressBarProps,
    setup(props) {
        const thisProps = props as Readonly<TProgressBarOptionProps>;

        return () => useRenderProgressBar(thisProps);
    },
});
