import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, inject, onMounted, ref, shallowRef, watch} from "vue";
import {useRoute} from "vue-router";
import {useHasRouter} from "../../mixins/CommonApi";
import {useListNavItemClasses, useListNavItemInnerClasses, useRenderListNavItem} from "./mixins/listNavApi";
import {listNavItemProps} from "./mixins/listViewProps";
import type {IListItem, IListViewProvider, TBsListNavItem, TListNavItemOptionProps, TRecord} from "../../types";


export default defineComponent<TBsListNavItem, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListNavItem",
    props: listNavItemProps,
    emits: [
        "click",
        /**
         * Fired when this component's state is updated.
         */
        "update:active"
    ],
    setup(props, {emit, expose}) {
        const cmpProps = props as Readonly<TListNavItemOptionProps>;
        const refItem = shallowRef<IListItem>();
        const isActive = ref<boolean>(false);
        const expanded = ref<boolean>(false);

        expose({isActive, expanded});

        const provider = inject<IListViewProvider>("ListView");
        const navItemClasses = computed<TRecord>(
            () => useListNavItemClasses(cmpProps, isActive, expanded, refItem)
        );
        const navItemInnerClasses = computed<TRecord>(
            () => useListNavItemInnerClasses(cmpProps, isActive, provider)
        );

        if (useHasRouter(cmpProps)) {
            watch(
                () => useRoute().path,
                (value) => {
                    if (value === cmpProps.path && provider) {
                        provider.activeItem = refItem.value;
                    }
                }
            );
            onMounted(
                () => {
                    if (useRoute().path === cmpProps.path) {
                        refItem.value?.setActive(true);
                    }
                }
            )
        }

        return () =>
            useRenderListNavItem(props, navItemClasses, navItemInnerClasses, isActive, expanded, refItem, emit, provider);
    }
});
