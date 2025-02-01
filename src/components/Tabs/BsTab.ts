import { tabPanelProps } from '@/components/Tabs/mixins/tabsProps';
import TabsProvider from '@/components/Tabs/mixins/TabsProvider';
import type { TBsTabPanel, TTabItemOptionProps } from '@/components/Tabs/types';
import { useRenderTransition } from '@/mixins/CommonApi';
import Helper from '@/utils/Helper';
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
        const thisProps = props as Readonly<TTabItemOptionProps>;
        const tabProvider = inject<TabsProvider>('tabs');
        const isActive = ref<boolean | undefined>(false);

        expose({ isActive });

        const classNames = computed(() => {
            return ['tab-pane', isActive.value === true ? 'active' : ''];
        });

        onBeforeMount(() => {
            const vm = getCurrentInstance();
            if (vm && tabProvider) {
                // console.log('Registering tabPanel:', thisProps.id);
                tabProvider.registerTabPanel(vm);
            }
        });

        return () =>
            useRenderTransition(
                { name: tabProvider?.contentTransition },
                withDirectives(
                    h(
                        'div',
                        {
                            class: classNames.value,
                            id: props.id,
                            role: 'tabpanel',
                            'aria-labelledby': props.ariaLabel,
                            onVnodeUnmounted: () => {
                                tabProvider &&
                                    thisProps.id &&
                                    tabProvider.unRegisterTab(thisProps.id);
                            },
                        },
                        slots.default && slots.default()
                    ),
                    [[vShow, isActive.value]]
                )
            );
    },
});
