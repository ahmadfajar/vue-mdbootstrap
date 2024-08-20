import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import {
    computed,
    defineComponent,
    getCurrentInstance,
    inject,
    nextTick,
    onBeforeUpdate,
    onMounted,
    ref,
    shallowRef,
    watch,
} from 'vue';
import { useCurrentRoute, useHasLink, useHasRouter, useIsRouteMatch } from '../../mixins/CommonApi';
import type {
    IListItem,
    IListViewProvider,
    TBsListTile,
    TListTileOptionProps,
    TRecord,
} from '../../types';
import { useListTileClassNames, useRenderListTile } from './mixins/listTileApi';
import { listTileProps } from './mixins/listViewProps';

export default defineComponent<
    TBsListTile,
    TRecord,
    TRecord,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    EmitsOptions
>({
    name: 'BsListTile',
    props: listTileProps,
    emits: [
        'click',
        /**
         * Fired when this component's state is updated.
         */
        'update:active',
    ],
    setup(props, { emit, expose, slots }) {
        const thisProps = props as Readonly<TListTileOptionProps>;
        const instance = shallowRef(getCurrentInstance());
        const listItem = shallowRef<IListItem>();
        const isActive = ref<boolean | undefined>(thisProps.active);
        const hasRouter = ref<boolean>(useHasRouter(thisProps));
        const hasLink = ref<boolean>(useHasLink(thisProps));

        expose({ isActive });

        const provider = inject<IListViewProvider>('ListView');
        const tagName = computed<string>(() => (hasRouter.value || hasLink.value ? 'a' : 'div'));
        const tileClasses = computed<TRecord>(() =>
            useListTileClassNames(tagName.value, thisProps, isActive, hasLink, provider)
        );

        watch(
            () => thisProps.active,
            (value) => {
                if (provider && provider.config.individualState === true) {
                    isActive.value = value;
                }
            }
        );

        onBeforeUpdate(() => {
            if (hasRouter.value) {
                const route = useCurrentRoute();
                if (route && useIsRouteMatch(instance, route, thisProps)) {
                    isActive.value = true;
                    nextTick().then(() => {
                        emit('update:active', true);
                    });
                }
            }
        });
        
        onMounted(() => {
            instance.value = getCurrentInstance();
            hasRouter.value = useHasRouter(thisProps);
            hasLink.value = useHasLink(thisProps);
        });

        return () =>
            useRenderListTile(
                tagName.value,
                slots,
                emit,
                thisProps,
                tileClasses,
                listItem,
                provider
            );
    },
});
