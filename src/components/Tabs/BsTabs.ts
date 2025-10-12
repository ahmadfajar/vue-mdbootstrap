import { useRenderTabView, useTabViewClassNames } from '@/components/Tabs/mixins/tabsApi.ts';
import { tabsProps } from '@/components/Tabs/mixins/tabsProps.ts';
import TabsProvider from '@/components/Tabs/mixins/TabsProvider.ts';
import type { TBsTabs, TOrientation, TTabsOptionProps } from '@/components/Tabs/types';
import Helper from '@/utils/Helper.ts';
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
    const scrollOffset = ref<number>(0);

    provide<TabsProvider>('tabs', tabProvider);

    const orientation = computed<TOrientation>(() =>
      ['left', 'right'].includes(thisProps.tabPosition as string) ? 'vertical' : 'horizontal'
    );
    const tagName = computed<string>(() => (thisProps.variant === 'pills' ? 'ul' : 'div'));
    const tabViewClasses = computed(() => useTabViewClassNames(thisProps, orientation));

    watch(
      () => thisProps.modelValue,
      (value) => {
        (Helper.isNumber(value) || Helper.isString(value)) && tabProvider.setActiveTab(value);
      }
    );
    onMounted(async () => {
      await nextTick().then(() => {
        tabProvider.setActiveTab(thisProps.modelValue as string | number);
      });
    });

    return () =>
      useRenderTabView(
        slots,
        thisProps,
        orientation,
        tagName,
        tabViewClasses,
        tabSlidingRef,
        scrollOffset,
        tabProvider
      );
  },
});
