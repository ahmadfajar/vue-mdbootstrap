import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import {
    computed,
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    onBeforeMount,
    ref,
    vShow,
    withDirectives
} from 'vue';
import { useRenderTransition } from '../../mixins/CommonApi';
import type { TBsTabPanel, TRecord, TTabItemOptionProps } from '../../types';
import Helper from '../../utils/Helper';
import { tabPanelProps } from './mixins/tabsProps';
import TabsProvider from './mixins/TabsProvider';

export default defineComponent<TBsTabPanel, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsTab',
    props: {
        ...tabPanelProps,
        id: {
            type: String,
            default: () => Helper.uuid(true),
        },
    },
    setup(props, {slots, expose}) {
        const cmpProps = props as Readonly<TTabItemOptionProps>;
        const tabProvider = inject<TabsProvider>('tabs');
        const isActive = ref<boolean | undefined>(false);

        expose({isActive});

        const classNames = computed(
            () => {
                // console.log(`computed-tab-${cmpProps.id}:active`, isActive.value);
                return ['tab-pane', isActive.value === true ? 'active' : ''];
            }
        )

        onBeforeMount(
            () => {
                const vm = getCurrentInstance();
                if (vm && tabProvider) {
                    tabProvider.registerTabPanel(vm);
                }
            }
        );

        return () =>
            useRenderTransition(
                {name: tabProvider?.contentTransition},
                withDirectives(
                    h('div', {
                        class: classNames.value,
                        id: props.id,
                        role: 'tabpanel',
                        'aria-labelledby': props.ariaLabel,
                        onVnodeUnmounted: () => tabProvider && cmpProps.id && tabProvider.unRegisterTab(cmpProps.id),
                    }, slots.default && slots.default()),
                    [[vShow, isActive.value]],
                ),
            );
    }
});
