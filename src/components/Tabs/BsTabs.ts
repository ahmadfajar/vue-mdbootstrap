import type {
    ComponentInternalInstance,
    ComponentOptionsMixin,
    ComputedOptions,
    EmitsOptions,
    MethodOptions,
} from 'vue';
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
import type { TBsTabs, TOrientation, TRecord, TTabsOptionProps } from '../../types';
import Helper from '../../utils/Helper';
import TabsProvider from './mixins/TabsProvider';
import { useRenderTabView, useTabViewClassNames } from './mixins/tabsApi';
import { tabsProps } from './mixins/tabsProps';

export default defineComponent<
    TBsTabs,
    TRecord,
    TRecord,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    EmitsOptions
>({
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
        const cmpProps = props as Readonly<TTabsOptionProps>;
        const tabPanels = shallowRef<ComponentInternalInstance[]>([]);
        const tabProvider = new TabsProvider(
            cmpProps,
            emit,
            <number | undefined>cmpProps.modelValue
        );
        const tabSlidingRef = ref<HTMLElement>();
        const scrollOffset = ref<number>(0);

        provide<TabsProvider>('tabs', tabProvider);

        const orientation = computed<TOrientation>(() =>
            ['left', 'right'].includes(<string>cmpProps.tabPosition) ? 'vertical' : 'horizontal'
        );
        const tagName = computed<string>(() => (cmpProps.variant === 'pills' ? 'ul' : 'div'));
        const tabViewClasses = computed(() => useTabViewClassNames(cmpProps, orientation));

        watch(
            () => [tabProvider.tabPanels, cmpProps.variant, cmpProps.tabPosition],
            ([panels]) => {
                if (Array.isArray(panels)) {
                    // console.log(`${uid}-panel-length:`, panels.length);
                    nextTick().then(() => (tabPanels.value = Array.from(panels)));
                }
            }
        );
        watch(
            () => cmpProps.modelValue,
            (value) => {
                (Helper.isNumber(value) || Helper.isString(value)) &&
                    tabProvider.setActiveTab(<string | number>value);
            }
        );
        onMounted(() => {
            nextTick().then(() => {
                tabPanels.value = tabProvider.tabPanels;
                tabProvider.setActiveTab(<string | number>cmpProps.modelValue);
            });
        });

        return () =>
            useRenderTabView(
                slots,
                cmpProps,
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
