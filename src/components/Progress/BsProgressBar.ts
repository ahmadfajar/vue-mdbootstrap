/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderProgressBar } from '@/components/Progress/mixins/progressControlApi.ts';
import { progressBarProps } from '@/components/Progress/mixins/progressProps.ts';
import type { TBsProgressBar, TProgressBarOptionProps } from '@/components/Progress/types';
import type { TRecord } from '@/types';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { defineComponent } from 'vue';

export default defineComponent<TBsProgressBar>({
  name: 'BsProgressBar',
  props: progressBarProps,
  setup(props) {
    const thisProps = props as Readonly<TProgressBarOptionProps>;

    return () => useRenderProgressBar(thisProps);
  },
}) as DefineComponent<
  TBsProgressBar,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TProgressBarOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsProgressBar>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
