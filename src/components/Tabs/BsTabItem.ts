import { useRenderTabItem, useTabItemClassNames } from '@/components/Tabs/mixins/tabsApi.ts';
import { tabItemProps } from '@/components/Tabs/mixins/tabsProps.ts';
import TabsProvider from '@/components/Tabs/mixins/TabsProvider.ts';
import type { TBsTabItem, TRecord, TTabItemOptionProps } from '@/types';
import { computed, defineComponent, inject, ref } from 'vue';

export default defineComponent<TBsTabItem>({
  name: 'BsTabItem',
  props: tabItemProps,
  setup(props) {
    const thisProps = props as Readonly<TTabItemOptionProps>;
    const tabProvider = inject<TabsProvider>('tabs');
    const tabIndex = ref<number | undefined>();
    const itemClasses = computed<TRecord>(() => useTabItemClassNames(thisProps, tabProvider));

    return () => useRenderTabItem(thisProps, itemClasses, tabIndex, tabProvider);
  },
});
