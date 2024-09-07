import type { ComponentInternalInstance } from 'vue';
import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    provide,
    ref,
    shallowRef,
    watch,
} from 'vue';
import Helper from '../../utils/Helper';
import { useRenderTabView, useTabViewClassNames } from './mixins/tabsApi';
import { tabsProps } from './mixins/tabsProps';
import TabsProvider from './mixins/TabsProvider';
import type { TBsTabs, TOrientation, TTabsOptionProps } from './types';

export default defineComponent<TBsTabs>({
    name: 'BsTabs',
    props: tabsProps,
    emits: [
        /**
         * Fired when this component's mutate its modelValue.
         */
        'change',
        /**
         * Fired when this component's modelValue is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TTabsOptionProps>;
        const tabPanels = shallowRef<ComponentInternalInstance[]>([]);
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
            () => [tabProvider.tabPanels, thisProps.variant, thisProps.tabPosition],
            ([panels]) => {
                if (Array.isArray(panels)) {
                    // console.log(`${uid}-panel-length:`, panels.length);
                    nextTick().then(() => (tabPanels.value = Array.from(panels)));
                }
            }
        );
        watch(
            () => thisProps.modelValue,
            (value) => {
                (Helper.isNumber(value) || Helper.isString(value)) &&
                    tabProvider.setActiveTab(value as string | number);
            }
        );
        onMounted(() => {
            nextTick().then(() => {
                tabPanels.value = tabProvider.tabPanels;
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
                tabPanels,
                tabSlidingRef,
                scrollOffset,
                tabProvider
            );
    },
});
