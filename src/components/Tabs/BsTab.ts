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
import { useRenderTransition } from '../../mixins/CommonApi';
import Helper from '../../utils/Helper';
import { tabPanelProps } from './mixins/tabsProps';
import TabsProvider from './mixins/TabsProvider';
import type { TBsTabPanel, TTabItemOptionProps } from './types';

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
            // console.log(`computed-tab-${thisProps.id}:active`, isActive.value);
            return ['tab-pane', isActive.value === true ? 'active' : ''];
        });

        onBeforeMount(() => {
            const vm = getCurrentInstance();
            if (vm && tabProvider) {
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
