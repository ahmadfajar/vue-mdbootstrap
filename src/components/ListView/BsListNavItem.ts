import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, inject, nextTick, onMounted, ref, shallowRef, watch} from "vue";
import {useRoute} from "vue-router";
import {useHasRouter} from "../../mixins/CommonApi";
import {
    useListNavItemClasses,
    useListNavItemInnerClasses,
    useNavItemContentStyles,
    useRenderListNavItem
} from "./mixins/listNavApi";
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
    setup(props, {emit, expose, slots}) {
        const cmpProps = props as Readonly<TListNavItemOptionProps>;
        const refItem = shallowRef<IListItem>();
        const isActive = ref<boolean>(false);
        const expanded = ref<boolean>(false);
        const hasChild = ref<boolean>(false);

        expose({isActive, expanded});

        const provider = inject<IListViewProvider>("ListView");
        const navItemClasses = computed<TRecord>(
            () => useListNavItemClasses(cmpProps, isActive, expanded, hasChild)
        );
        const navItemInnerClasses = computed<TRecord>(
            () => useListNavItemInnerClasses(cmpProps, isActive, provider)
        );
        const navItemInnerStyles = computed<string[]>(
            () => useNavItemContentStyles(cmpProps)
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
        }
        onMounted(
            () => {
                if (useHasRouter(cmpProps)) {
                    if (useRoute().path === cmpProps.path) {
                        refItem.value?.setActive(true);
                    }
                }
                nextTick().then(() => {
                    hasChild.value = refItem.value !== undefined && refItem.value.hasChild();
                })
            }
        )

        return () =>
            useRenderListNavItem(
                slots, props, navItemClasses, navItemInnerClasses, navItemInnerStyles,
                isActive, expanded, hasChild, refItem, emit, provider,
            );
    }
});
