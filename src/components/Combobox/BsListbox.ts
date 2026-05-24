import {
  useRegisterListboxWatchers,
  useRenderListbox,
} from '@/components/Combobox/mixins/listboxApi.ts';
import { listboxProps } from '@/components/Combobox/mixins/listboxProps.ts';
import type { TBsListbox, TDataListSchema, TListboxOptionProps } from '@/components/Combobox/types';
import type { TBsModel } from '@/model';
import type { Numberish, TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { defineComponent, reactive, ref, shallowRef } from 'vue';

export default defineComponent<TBsListbox>({
  name: 'BsListbox',
  props: listboxProps,
  emits: [
    'select',
    'deselect',
    'data-bind',
    'data-error',
    'data-filter',
    'update:model-value',
    'update:search-text',
    'update:selected-value',
  ],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TListboxOptionProps>;
    const dataSchema: TDataListSchema = {
      displayField: 'text',
      valueField: 'value',
      imageField: 'image',
      cascadeField: 'parent',
      disableField: 'disabled',
      ...thisProps.dataSource?.schema,
    };
    const maxHeight = parseInt(thisProps.maxHeight as string, 10);
    const dataSource = thisProps.dataSource?.proxy;
    const cachedItems = shallowRef<TBsModel[]>([]);
    const showSearchbox = ref<boolean>(false);
    const searchboxRef = ref<HTMLElement | null>(null);
    const searchText = ref(thisProps.searchText);
    const fieldValues = ref(thisProps.modelValue);
    const selectedItems = shallowRef<TBsModel[]>([]);
    const listviewStyles = reactive<TRecord>({ maxHeight: maxHeight + 'px' });

    useRegisterListboxWatchers(
      emit,
      thisProps,
      dataSource,
      dataSchema,
      cachedItems,
      selectedItems,
      fieldValues,
      listviewStyles,
      showSearchbox,
      searchboxRef,
      searchText
    );

    return () =>
      useRenderListbox(
        slots,
        emit,
        thisProps,
        dataSchema,
        cachedItems,
        selectedItems,
        listviewStyles,
        showSearchbox,
        searchboxRef,
        fieldValues,
        searchText
      );
  },
}) as DefineComponent<
  TBsListbox,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ListboxEventProps,
  string,
  PublicProps,
  Readonly<TListboxOptionProps> & Readonly<ListboxEventPublic>,
  ExtractDefaultPropTypes<TBsListbox>,
  SlotsType<ListboxSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface ListboxSlots {
  /**
   * Additional slot used to customize the listbox items appearance.
   */
  'option-item'?: (arg: { item: TBsModel; index: number }) => VNode[] | VNode;

  /**
   * Additional slot used to place custom message when listbox is empty.
   */
  'empty-data-msg'?: () => VNode[] | VNode;

  /**
   * Additional slot used to place custom message when filtering listbox items returns no result.
   */
  'not-found-msg'?: () => VNode[] | VNode;
}

declare type ListboxEventProps = UpdateModelValueEventProps<Numberish | Numberish[] | undefined> & {
  /**
   * Fired when an item is selected.
   */
  select?: (item: TBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  deselect?: (item: TBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  'data-bind'?: (data: TBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  'data-error'?: (error: unknown) => void;

  /**
   * Fired when the Listbox data items is filtered.
   */
  'data-filter'?: (data: TBsModel[]) => void;

  /**
   * Fired when the Listbox search value is updated.
   */
  'update:search-text'?: (search?: string) => void;

  /**
   * Fired when the Listbox selected value is updated.
   */
  'update:selected-value'?: (selected: TBsModel[]) => void;
};

declare interface ListboxEventPublic extends UpdateModelValueEventPublic<
  Numberish | Numberish[] | undefined
> {
  /**
   * Fired when an item is selected.
   */
  onSelect?: (item: TBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  onDeselect?: (item: TBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  onDataBind?: (data: TBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  onDataError?: (error: unknown) => void;

  /**
   * Fired when the Listbox data items is filtered.
   */
  onDataFilter?: (data: TBsModel[]) => void;

  /**
   * Fired when the Listbox search value is updated.
   */
  'onUpdate:search-text'?: (search?: string) => void;

  /**
   * Fired when the Listbox selected value is updated.
   */
  'onUpdate:selectedValue'?: (selected: TBsModel[]) => void;

  /**
   * Fired when an item is selected.
   */
  '@select'?: (item: TBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  '@deselect'?: (item: TBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  '@data-bind'?: (data: TBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  '@data-error'?: (error: unknown) => void;

  /**
   * Fired when the Listbox data items is filtered.
   */
  '@data-filter'?: (data: TBsModel[]) => void;

  /**
   * Fired when the Listbox search value is updated.
   */
  '@update:search-text'?: (search?: string) => void;

  /**
   * Fired when the Listbox selected value is updated.
   */
  '@update:selected-value'?: (selected: TBsModel[]) => void;
}
