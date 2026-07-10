import { useRenderTabItem, useTabItemClassNames } from '@/components/Tabs/mixins/tabsApi.ts';
import { tabItemProps } from '@/components/Tabs/mixins/tabsProps.ts';
import { type ITabsProvider } from '@/components/Tabs/mixins/TabsProvider.ts';
import type { TBsTabItem, TTabItemOptionProps } from '@/components/Tabs/types';
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
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TTabItemOptionProps>,
  ExtractDefaultPropTypes<TBsTabItem>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
