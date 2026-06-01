import { useRenderProgressBar } from '@/components/Progress/mixins/progressControlApi.ts';
import { progressBarProps } from '@/components/Progress/mixins/progressProps.ts';
import type { TBsProgressBar, TProgressBarOptionProps } from '@/components/Progress/types';
import type { TRecord } from '@/types';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
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
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TProgressBarOptionProps>,
  ExtractDefaultPropTypes<TBsProgressBar>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
