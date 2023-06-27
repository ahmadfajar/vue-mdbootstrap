import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, h, provide } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { IListViewProvider, TBsListView, TListViewOptionProps, TRecord } from '../../types';
import { listViewProps } from './mixins/listViewProps';
import ListViewProvider from './mixins/ListViewProvider';

export default defineComponent<TBsListView, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
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
    setup(props, {slots, emit}) {
        const cmpProps = props as Readonly<TListViewOptionProps>;
        const classNames = computed(
            () => ({
                [`${cssPrefix}list`]: true,
                [`${cssPrefix}list-${props.color}`]: props.color,
                'overflow-hidden': props.overflowHidden,
            })
        );

        const provider = new ListViewProvider(cmpProps, emit);
        provide<IListViewProvider>('ListView', provider);

        return () =>
            h('div', {
                class: classNames.value,
                onVnodeBeforeUnmount: () => provider.destroy()
            }, slots.default && slots.default())
    }
});
