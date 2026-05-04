/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderTabView, useTabViewClassNames } from '@/components/Tabs/mixins/tabsApi.ts';
import { tabsProps } from '@/components/Tabs/mixins/tabsProps.ts';
import { type ITabsProvider, TabsProvider } from '@/components/Tabs/mixins/TabsProvider.ts';
import type { TBsTabs, TOrientation, TTabsOptionProps } from '@/components/Tabs/types';
import type { TRecord } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentInternalInstance,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
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
  {},
  {},
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
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface TabSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place custom components or elements on the right side of the Tabs.
   */
  'append-header'?: () => VNode[] | VNode;
}

declare type TabEventProps = UpdateModelValueEventProps<number> & {
  /**
   * Fired when active tab is changed.
   */
  change?: (
    newTab: ComponentInternalInstance,
    newIndex: number,
    oldTab?: ComponentInternalInstance,
    oldIndex?: number
  ) => void;
};

declare interface TabEventPublic extends UpdateModelValueEventPublic<number> {
  /**
   * Fired when active tab is changed.
   */
  onChange?: (
    newTab: ComponentInternalInstance,
    newIndex: number,
    oldTab?: ComponentInternalInstance,
    oldIndex?: number
  ) => void;

  /**
   * Fired when active tab is changed.
   */
  '@change'?: (
    newTab: ComponentInternalInstance,
    newIndex: number,
    oldTab?: ComponentInternalInstance,
    oldIndex?: number
  ) => void;
}
