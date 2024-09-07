import { computed, defineComponent, inject, ref } from 'vue';
import type { TBsTabItem, TRecord, TTabItemOptionProps } from '../../types';
import { useItemLinkClassNames, useRenderTabItem, useTabItemClassNames } from './mixins/tabsApi';
import { tabItemProps } from './mixins/tabsProps';
import TabsProvider from './mixins/TabsProvider';

export default defineComponent<TBsTabItem>({
    name: 'BsTabItem',
    props: tabItemProps,
    setup(props) {
        const thisProps = props as Readonly<TTabItemOptionProps>;
        const tabProvider = inject<TabsProvider>('tabs');
        const tabIndex = ref<number | undefined>();

        const tagName = computed<string>(() => (tabProvider?.variant === 'pills' ? 'li' : 'a'));
        const itemClasses = computed<TRecord>(() =>
            useTabItemClassNames(thisProps, tagName, tabProvider)
        );
        const itemLinkClasses = computed<TRecord>(() =>
            useItemLinkClassNames(thisProps, tabProvider)
        );

        return () =>
            useRenderTabItem(
                thisProps,
                itemClasses,
                itemLinkClasses,
                tagName,
                tabIndex,
                tabProvider
            );
    },
});
