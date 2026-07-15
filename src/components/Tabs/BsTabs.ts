import { useRenderTabView, useTabViewClassNames } from '@/components/Tabs/mixins/tabsApi.ts';
import { tabsProps } from '@/components/Tabs/mixins/tabsProps.ts';
import { type ITabsProvider, TabsProvider } from '@/components/Tabs/mixins/TabsProvider.ts';
import type {
  TabEventProps,
  TabEventPublic,
  TabSlots,
  TBsTabs,
  TOrientation,
  TTabsOptionProps,
} from '@/components/Tabs/types';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, nextTick, onMounted, provide, ref, watch } from 'vue';

export default defineComponent<TBsTabs>({
  name: 'BsTabs',
  props: tabsProps,
  emits: ['change', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TTabsOptionProps>;
    const tabProvider = new TabsProvider(
      thisProps,
      emit,
      thisProps.modelValue as number | undefined
    );
    const tabSlidingRef = ref<HTMLElement>();
    const scrollOffset = ref(0);

    provide<ITabsProvider>('tabs', tabProvider);

    const orientation = computed<TOrientation>(() =>
      ['left', 'right'].includes(thisProps.tabPosition as string) ? 'vertical' : 'horizontal'
    );
    const tabViewClasses = computed(() => useTabViewClassNames(thisProps, orientation));

    watch(
      () => thisProps.modelValue,
      (value) => {
        (Helper.isNumber(value) || Helper.isString(value)) && tabProvider.setActiveTab(value);
      }
    );

    onMounted(async () => {
      await nextTick().then(() => {
        tabProvider.setActiveTab(thisProps.modelValue);
      });
    });

    return () =>
      useRenderTabView(
        slots,
        thisProps,
        orientation,
        tabViewClasses,
        tabSlidingRef,
        scrollOffset,
        tabProvider
      );
  },
}) as DefineComponent<
  TBsTabs,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TabEventProps,
  string,
  PublicProps,
  Readonly<TTabsOptionProps> & Readonly<TabEventPublic>,
  ExtractDefaultPropTypes<TBsTabs>,
  SlotsType<TabSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
