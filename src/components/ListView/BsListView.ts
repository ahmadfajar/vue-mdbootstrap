import { listViewProps } from '@/components/ListView/mixins/listViewProps.ts';
import ListViewProvider from '@/components/ListView/mixins/ListViewProvider.ts';
import type {
  IListViewProvider,
  TBsListView,
  TListViewOptionProps,
} from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { computed, defineComponent, h, provide } from 'vue';

export default defineComponent<TBsListView>({
  name: 'BsListView',
  props: listViewProps,
  emits: ['change', 'update:model-value'],
  setup(props, { slots, emit }) {
    const thisProps = props as Readonly<TListViewOptionProps>;
    const classNames = computed(() => ({
      [`${cssPrefix}list`]: true,
      [`${cssPrefix}list-${thisProps.color}`]: thisProps.color,
      [`${cssPrefix}list-space-${thisProps.spaceAround}`]:
        thisProps.spaceAround &&
        ['both', 'left', 'right'].includes(thisProps.spaceAround as string),
      'overflow-hidden': thisProps.overflowHidden,
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
