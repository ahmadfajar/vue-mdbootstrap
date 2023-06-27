import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, inject, nextTick, onBeforeUpdate, ref, shallowRef, watch } from 'vue';
import { useCurrentRoute, useHasLink, useHasRouter } from '../../mixins/CommonApi';
import type { IListItem, IListViewProvider, TBsListTile, TListTileOptionProps, TRecord } from '../../types';
import { useListTileClassNames, useRenderListTile } from './mixins/listTileApi';
import { listTileProps } from './mixins/listViewProps';

export default defineComponent<TBsListTile, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsListTile',
    props: listTileProps,
    emits: [
        'click',
        /**
         * Fired when this component's state is updated.
         */
        'update:active'
    ],
    setup(props, {emit, expose, slots}) {
        const cmpProps = props as Readonly<TListTileOptionProps>;
        const vm = shallowRef<IListItem>();
        const isActive = ref<boolean | undefined>(cmpProps.active);

        expose({isActive});

        const provider = inject<IListViewProvider>('ListView');
        const tagName = computed<string>(
            () => useHasRouter(cmpProps) || useHasLink(cmpProps) || cmpProps.navigable ? 'a' : 'div'
        );
        const tileClasses = computed<TRecord>(
            () => useListTileClassNames(tagName.value, cmpProps, isActive, provider)
        );

        watch(
            () => cmpProps.active,
            (value) => {
                if (provider && provider.config.individualState === true) {
                    isActive.value = value
                }
            }
        );
        onBeforeUpdate(
            () => {
                if (useHasRouter(cmpProps)) {
                    const route = useCurrentRoute();
                    if (route && route.value.path === cmpProps.path) {
                        isActive.value = true;
                        nextTick().then(() => {
                            emit('update:active', true);
                        });
                    }
                }
            }
        );

        return () =>
            useRenderListTile(tagName.value, slots, emit, cmpProps, tileClasses, vm, provider)
    }
});
