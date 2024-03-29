import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
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
} from 'vue';
import { useCurrentRoute, useHasRouter } from '../../mixins/CommonApi';
import type { IListItem, IListViewProvider, TBsListNavItem, TListNavItemOptionProps, TRecord } from '../../types';
import ListItem from './mixins/ListItem';
import {
    useAddChild,
    useListNavItemClasses,
    useListNavItemInnerClasses,
    useNavItemContentStyles,
    useRenderListNavItem
} from './mixins/listNavApi';
import { listNavItemProps } from './mixins/listViewProps';

export default defineComponent<TBsListNavItem, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsListNavItem',
    props: listNavItemProps,
    emits: [
        'click',
        /**
         * Fired when this component's state is updated.
         */
        'update:active'
    ],
    setup(props, {emit, expose, slots}) {
        const cmpProps = props as Readonly<TListNavItemOptionProps>;
        const refItem = shallowRef<IListItem>();
        const isActive = ref<boolean | undefined>(cmpProps.active);
        const expanded = ref<boolean>(false);
        const hasChild = ref<boolean>(false);
        const hasRouter = ref<boolean>(false);

        expose({isActive, expanded});

        const provider = inject<IListViewProvider>('ListView');
        const navItemClasses = computed<TRecord>(
            () => useListNavItemClasses(cmpProps, isActive, expanded, hasChild)
        );
        const navItemInnerClasses = computed<TRecord>(
            () => useListNavItemInnerClasses(cmpProps, isActive, hasRouter, provider)
        );
        const navItemInnerStyles = computed<string[]>(
            () => useNavItemContentStyles(cmpProps)
        );

        if (useHasRouter(cmpProps)) {
            const route = useCurrentRoute();
            watchEffect(() => {
                if (provider && (route?.value.path === cmpProps.path || route?.value.path.startsWith(cmpProps.path!))) {
                    provider.activeItem = refItem.value;
                    let parent = refItem.value?.parent;
                    while (parent) {
                        parent.setActive(true);
                        parent = parent.parent;
                    }
                }
            });
        }
        onBeforeMount(
            () => {
                const instance = getCurrentInstance();
                if (instance) {
                    refItem.value = new ListItem(<string>props.id, 'BsListNavItem', instance, emit);

                    if (provider) {
                        nextTick().then(() => useAddChild(provider, instance?.parent, refItem.value));
                    }
                }
            }
        );
        onMounted(
            () => {
                hasRouter.value = useHasRouter(cmpProps);
                if (hasRouter.value) {
                    const route = useCurrentRoute();
                    if (route && (route.value.path === cmpProps.path || route?.value.path.startsWith(cmpProps.path!))) {
                        refItem.value?.setActive(true);
                    }
                }
                nextTick().then(() => {
                    hasChild.value = refItem.value != undefined && refItem.value.hasChild();
                    if (hasRouter.value && !hasChild.value && isActive.value) {
                        let parent = refItem.value?.parent;
                        while (parent) {
                            parent.setActive(true);
                            provider?.expand(parent);
                            parent = parent.parent;
                        }
                    }
                })
            }
        )

        return () =>
            useRenderListNavItem(
                slots, props, navItemClasses, navItemInnerClasses, navItemInnerStyles,
                isActive, expanded, hasChild, refItem, provider,
            );
    }
});
