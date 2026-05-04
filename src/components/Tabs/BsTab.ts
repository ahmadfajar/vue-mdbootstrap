/* eslint-disable @typescript-eslint/no-empty-object-type */
import { tabPanelProps } from '@/components/Tabs/mixins/tabsProps.ts';
import type { ITabsProvider } from '@/components/Tabs/mixins/TabsProvider.ts';
import type { TBsTabPanel, TTabPanelOptionProps } from '@/components/Tabs/types';
import { useRenderTransition } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onBeforeMount,
  ref,
  vShow,
  withDirectives,
} from 'vue';

export default defineComponent<TBsTabPanel>({
  name: 'BsTab',
  props: {
    ...tabPanelProps,
    id: {
      type: String,
      default: () => Helper.uuid(true),
    },
  },
  setup(props, { slots, expose }) {
    const thisProps = props as Readonly<TTabPanelOptionProps>;
    const provider = inject<ITabsProvider>('tabs');
    const isActive = ref<boolean | undefined>(false);

    expose({ isActive });

    const classNames = computed(() => {
      return ['tab-pane', isActive.value === true ? 'active' : ''];
    });

    onBeforeMount(() => {
      const vm = getCurrentInstance();
      if (vm && provider) {
        // console.log('Registering tabPanel:', thisProps.id);
        provider.registerTabPanel(vm);
      }
    });

    return () =>
      useRenderTransition(
        { name: provider?.contentTransition },
        withDirectives(
          h(
            'div',
            {
              class: classNames.value,
              id: thisProps.id,
              role: 'tabpanel',
              'aria-labelledby': thisProps.ariaLabel,
              onVnodeUnmounted: () => {
                provider && thisProps.id && provider.unRegisterTab(thisProps.id);
              },
            },
            slots.default && slots.default()
          ),
          [[vShow, isActive.value]]
        )
      );
  },
}) as DefineComponent<
  TBsTabPanel,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TTabPanelOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsTabPanel>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
