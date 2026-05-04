/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderTabItem, useTabItemClassNames } from '@/components/Tabs/mixins/tabsApi.ts';
import { tabItemProps } from '@/components/Tabs/mixins/tabsProps.ts';
import { type ITabsProvider } from '@/components/Tabs/mixins/TabsProvider.ts';
import type { TBsTabItem, TTabItemOptionProps } from '@/components/Tabs/types';
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
import { computed, defineComponent, inject, ref } from 'vue';

export default defineComponent<TBsTabItem>({
  name: 'BsTabItem',
  props: tabItemProps,
  setup(props) {
    const thisProps = props as Readonly<TTabItemOptionProps>;
    const tabProvider = inject<ITabsProvider>('tabs');
    const tabIndex = ref<number | undefined>();
    const itemClasses = computed<TRecord>(() => useTabItemClassNames(thisProps, tabProvider));

    return () => useRenderTabItem(thisProps, itemClasses, tabIndex, tabProvider);
  },
}) as DefineComponent<
  TBsTabItem,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TTabItemOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsTabItem>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
