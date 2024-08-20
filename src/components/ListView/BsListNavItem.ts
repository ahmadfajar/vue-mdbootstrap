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
    watchEffect,
} from 'vue';
import { useCurrentRoute, useHasRouter, useIsRouteMatch } from '../../mixins/CommonApi';
import type {
    IListItem,
    IListViewProvider,
    TBsListNavItem,
    TListNavItemOptionProps,
    TRecord,
} from '../../types';
import ListItem from './mixins/ListItem';
import {
    useAddChild,
    useListNavItemClasses,
    useListNavItemInnerClasses,
    useNavItemContentStyles,
    useRenderListNavItem,
} from './mixins/listNavApi';
import { listNavItemProps } from './mixins/listViewProps';

export default defineComponent<
    TBsListNavItem,
    TRecord,
    TRecord,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    EmitsOptions
>({
    name: 'BsListNavItem',
    props: listNavItemProps,
    emits: [
        'click',
        /**
         * Fired when this component's state is updated.
         */
        'update:active',
    ],
    setup(props, { emit, expose, slots }) {
        const cmpProps = props as Readonly<TListNavItemOptionProps>;
        const instance = shallowRef(getCurrentInstance());
        const refItem = shallowRef<IListItem>();
        const isActive = ref<boolean | undefined>(cmpProps.active);
        const expanded = ref<boolean>(false);
        const hasChild = ref<boolean>(false);
        const hasRouter = ref<boolean>(false);

        expose({ isActive, expanded });

        const provider = inject<IListViewProvider>('ListView');
        const navItemClasses = computed<TRecord>(() =>
            useListNavItemClasses(cmpProps, isActive, expanded, hasChild)
        );
        const navItemInnerClasses = computed<TRecord>(() =>
            useListNavItemInnerClasses(cmpProps, isActive, hasRouter, provider)
        );
        const navItemInnerStyles = computed<string[]>(() => useNavItemContentStyles(cmpProps));

        if (useHasRouter(cmpProps)) {
            const route = useCurrentRoute();
            watchEffect(() => {
                if (provider && route && useIsRouteMatch(instance, route, cmpProps)) {
                    provider.activeItem = refItem.value;
                    let parent = refItem.value?.parent;
                    while (parent) {
                        parent.setActive(true);
                        parent = parent.parent;
                    }
                }
            });
        }

        onBeforeMount(() => {
            instance.value = getCurrentInstance();
            if (instance) {
                refItem.value = new ListItem(
                    props.id as string,
                    'BsListNavItem',
                    instance.value!,
                    emit
                );

                if (provider) {
                    nextTick().then(() =>
                        useAddChild(provider, instance.value?.parent, refItem.value)
                    );
                }
            }
        });
        onMounted(() => {
            hasRouter.value = useHasRouter(cmpProps);
            if (hasRouter.value) {
                const route = useCurrentRoute();
                if (route && useIsRouteMatch(instance, route, cmpProps)) {
                    refItem.value?.setActive(true);
                }
            }
            nextTick().then(() => {
                hasChild.value = refItem.value?.hasChild() ?? false;
                if (hasRouter.value && !hasChild.value && isActive.value) {
                    let parent = refItem.value?.parent;
                    while (parent) {
                        parent.setActive(true);
                        provider?.expand(parent);
                        parent = parent.parent;
                    }
                }
            });
        });

        return () =>
            useRenderListNavItem(
                slots,
                props,
                navItemClasses,
                navItemInnerClasses,
                navItemInnerStyles,
                isActive,
                expanded,
                hasChild,
                refItem,
                provider
            );
    },
});
