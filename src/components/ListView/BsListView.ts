/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IListItem } from '@/components/ListView/mixins/ListItem.ts';
import { listViewProps } from '@/components/ListView/mixins/listViewProps.ts';
import {
  type IListViewProvider,
  ListViewProvider,
} from '@/components/ListView/mixins/ListViewProvider.ts';
import type { TBsListView, TListViewOptionProps } from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, h, provide } from 'vue';

export default defineComponent<TBsListView>({
  name: 'BsListView',
  props: listViewProps,
  emits: ['change', 'update:model-value'],
  setup(props, { slots, emit }) {
    const thisProps = props as Readonly<TListViewOptionProps>;
    const classNames = computed(() => ({
      [`${cssPrefix}list`]: true,
      [`${cssPrefix}list-space-${thisProps.spaceAround}`]:
        thisProps.spaceAround && ['both', 'left', 'right'].includes(thisProps.spaceAround),
      [`list-${thisProps.color}`]: thisProps.color,
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
}) as DefineComponent<
  TBsListView,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ListViewEventProps,
  string,
  PublicProps,
  Readonly<TListViewOptionProps> & Readonly<ListViewEventPublic>,
  ExtractDefaultPropTypes<TBsListView>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type ListViewEventProps = UpdateModelValueEventProps<IListItem> & {
  /**
   * Fired when the ListView is mutated its modelValue.
   */
  change?: (value: IListItem, oldValue: IListItem) => void;
};

declare interface ListViewEventPublic extends UpdateModelValueEventPublic<IListItem> {
  /**
   * Fired when the ListView is mutated its modelValue.
   */
  onChange?: (value: IListItem, oldValue: IListItem) => void;

  /**
   * Fired when the ListView is mutated its modelValue.
   */
  '@change'?: (value: IListItem, oldValue: IListItem) => void;
}
