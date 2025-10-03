import { useRenderProgressBar } from '@/components/Progress/mixins/progressControlApi.ts';
import { progressBarProps } from '@/components/Progress/mixins/progressProps.ts';
import type { TBsProgressBar, TProgressBarOptionProps } from '@/components/Progress/types';
import { defineComponent } from 'vue';

export default defineComponent<TBsProgressBar>({
  name: 'BsProgressBar',
  props: progressBarProps,
  setup(props) {
    const thisProps = props as Readonly<TProgressBarOptionProps>;

    return () => useRenderProgressBar(thisProps);
  },
});
