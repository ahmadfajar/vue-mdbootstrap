import { computed, defineComponent, h, provide } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { listViewProps } from './mixins/listViewProps';
import ListViewProvider from './mixins/ListViewProvider';
import type { IListViewProvider, TBsListView, TListViewOptionProps } from './types';

export default defineComponent<TBsListView>({
    name: 'BsListView',
    props: listViewProps,
    emits: [
        /**
         * Fired when this component's mutate its modelValue.
         */
        'change',
        /**
         * Fired when this component's modelValue is updated.
         */
        'update:modelValue',
    ],
    setup(props, { slots, emit }) {
        const thisProps = props as Readonly<TListViewOptionProps>;
        const classNames = computed(() => ({
            [`${cssPrefix}list`]: true,
            [`${cssPrefix}list-${props.color}`]: props.color,
            [`${cssPrefix}list-space-${props.spaceAround}`]: ['both', 'left', 'right'].includes(
                props.spaceAround as string
            ),
            'overflow-hidden': props.overflowHidden,
        }));

        const provider = new ListViewProvider(thisProps, emit);
        provide<IListViewProvider>('ListView', provider);

        return () =>
            h(
                'div',
                {
                    class: classNames.value,
                    onVnodeBeforeUnmount: () => provider.destroy(),
                },
                slots.default && slots.default()
            );
    },
});
