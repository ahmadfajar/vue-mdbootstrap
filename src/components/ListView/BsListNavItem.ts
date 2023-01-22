import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {
    computed,
    defineComponent,
    getCurrentInstance,
    inject,
    nextTick,
    onBeforeMount,
    onMounted,
    ref,
    shallowRef,
    watchEffect
} from "vue";
import {useGetCurrentRoute, useHasRouter} from "../../mixins/CommonApi";
import {
    useAddChild,
    useListNavItemClasses,
    useListNavItemInnerClasses,
    useNavItemContentStyles,
    useRenderListNavItem
} from "./mixins/listNavApi";
import {listNavItemProps} from "./mixins/listViewProps";
import type {IListItem, IListViewProvider, TBsListNavItem, TListNavItemOptionProps, TRecord} from "../../types";
import ListItem from "./mixins/ListItem";


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
            const route = useGetCurrentRoute();
            watchEffect(() => {
                if (provider && route?.value.path === cmpProps.path) {
                    provider.activeItem = refItem.value;
                }
            });
        }
        onBeforeMount(
            () => {
                const instance = getCurrentInstance();
                if (instance) {
                    refItem.value = new ListItem(<string>props.id, "BsListNavItem", instance, emit);

                    if (provider) {
                        nextTick().then(() => useAddChild(provider, instance?.parent, refItem.value));
                    }
                }
            }
        );
        onMounted(
            () => {
                if (useHasRouter(cmpProps)) {
                    const route = useGetCurrentRoute();
                    if (route && route.value.path === cmpProps.path) {
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
