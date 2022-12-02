import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, inject, ref} from "vue";
import {tabItemProps} from "./mixins/tabsProps";
import {useItemLinkClassNames, useRenderTabItem, useTabItemClassNames} from "./mixins/tabsApi";
import type {TBsTabItem, TRecord, TTabItemOptionProps} from "../../types";
import TabsProvider from "./mixins/TabsProvider";

export default defineComponent<TBsTabItem, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsTabItem",
    props: tabItemProps,
    setup(props) {
        const cmpProps = props as Readonly<TTabItemOptionProps>;
        const tabProvider = inject<TabsProvider>("tabs");
        const tabIndex = ref<number | undefined>();

        const tagName = computed<string>(
            () => tabProvider?.variant === "pills" ? "li" : "a"
        );
        const itemClasses = computed<TRecord>(
            () => useTabItemClassNames(cmpProps, tagName, tabProvider)
        );
        const itemLinkClasses = computed<TRecord>(
            () => useItemLinkClassNames(cmpProps, tabProvider)
        );

        return () => useRenderTabItem(cmpProps, itemClasses, itemLinkClasses, tagName, tabIndex, tabProvider);
    }
});
