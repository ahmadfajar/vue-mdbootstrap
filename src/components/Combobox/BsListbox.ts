import {
  useRegisterListboxWatchers,
  useRenderListbox,
} from '@/components/Combobox/mixins/listboxApi.ts';
import { listboxProps } from '@/components/Combobox/mixins/listboxProps.ts';
import type {
  ListboxEventProps,
  ListboxEventPublic,
  ListboxSlots,
  TBsListbox,
  TDataListSchema,
  TListboxOptionProps,
} from '@/components/Combobox/types';
import type { TBsModel } from '@/model';
import type { TRecord } from '@/types';
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
