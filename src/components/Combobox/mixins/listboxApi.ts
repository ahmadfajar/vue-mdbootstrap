import { BsDivider } from '@/components/Basic';
import { BsCheckbox } from '@/components/Checkbox';
import {
  BsListTile,
  BsListTileAction,
  BsListTileContent,
  BsListTileLeading,
  BsListTileTitle,
  BsListView,
} from '@/components/ListView';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import { AbstractStore, BsStore } from '@/model';
import type {
  IArrayStore,
  IBsModel,
  IBsStore,
  LoadedCallbackFn,
  Numberish,
  TBsCheckbox,
  TBsListTileAction,
  TBsListView,
  TDataListSchema,
  TEmitFn,
  TListboxOptionProps,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { Prop, Ref, ShallowRef, Slots, VNode } from 'vue';
import {
  createCommentVNode,
  Fragment,
  h,
  nextTick,
  onMounted,
  toDisplayString,
  vModelText,
  watch,
  watchEffect,
  withDirectives,
} from 'vue';

function filterListboxItems(
  emit: TEmitFn,
  schema: TDataListSchema,
  dataSource: IBsStore | IArrayStore | AbstractStore | undefined,
  cachedItems: ShallowRef<IBsModel[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  searchTextRef: Ref<string | undefined>,
  search: string
) {
  if (dataSource instanceof AbstractStore) {
    searchTextRef.value = search;

    if (Helper.isEmpty(search)) {
      dataSource.setFilters([], true);
      dataSource.load().catch((error) => {
        emit('data-error', error);
        console.warn(error);
      });
    } else {
      const newFilters = dataSource.createFilters([
        { property: schema.displayField, value: search, operator: 'contains' },
      ]);
      dataSource.setFilters(newFilters, true);

      if (dataSource instanceof BsStore && dataSource.remoteFilter) {
        dataSource
          .load()
          .then(() => {
            emit('data-filter', dataSource.dataItems);
            emit('update:search-text', search);
          })
          .catch((error) => {
            emit('data-error', error);
            console.warn(error);
          });
      } else {
        cachedItems.value = cloneDataItems(dataSource, selectedItems, schema.valueField);
        emit('data-filter', dataSource.dataItems);
        emit('update:search-text', search);
      }
    }
  } else {
    throw Error("Operation not supported. 'DataSource.proxy' is not instance of AbstractStore");
  }
}

function renderSearchbox(
  emit: TEmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  cachedItems: ShallowRef<IBsModel[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  showSearchbox: Ref<boolean>,
  searchboxRef: Ref<HTMLElement | null>,
  searchTextRef: Ref<string | undefined>
): VNode {
  const dataSource = props.dataSource?.proxy;

  if (dataSource && showSearchbox.value) {
    const minChars = parseInt(props.minSearchChars as string, 10);

    return h(
      'label',
      {
        ref: searchboxRef,
        class: [`${cssPrefix}listbox-search`],
      },
      [
        withDirectives(
          h('input', {
            type: 'text',
            role: 'textbox',
            tabindex: '-1',
            autocomplete: 'off',
            placeholder: props.searchLabel,
            'onUpdate:modelValue': (value: string) => {
              if (value.length >= minChars || Helper.isEmpty(value)) {
                Helper.defer(() => {
                  filterListboxItems(
                    emit,
                    schema,
                    dataSource,
                    cachedItems,
                    selectedItems,
                    searchTextRef,
                    value
                  );
                }, 75);
              }
            },
          }),
          [[vModelText, searchTextRef.value]]
        ),
      ]
    );
  } else {
    return createCommentVNode(' v-if-searchbox ');
  }
}

function renderListboxView(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  dataItems: ShallowRef<IBsModel[]>,
  listviewStyles: TRecord,
  selectedItems: ShallowRef<IBsModel[]>,
  localValue: Ref<string | number | string[] | number[] | undefined | null>
): VNode {
  const dataSource = props.dataSource?.proxy;

  return h<TBsListView>(
    BsListView,
    {
      color: props.color as Prop<string>,
      style: listviewStyles,
      individualState: true as unknown as Prop<boolean>,
    },
    {
      default: () =>
        dataSource?.length === 0
          ? h(BsListTile, null, {
              default: () =>
                useRenderSlot(slots, 'empty-data-msg', { key: 'emptyDataMessage' }, [
                  h(BsListTileTitle, null, {
                    default: () => toDisplayString(props.emptyDataMessage),
                  }),
                ]),
            })
          : dataSource?.filters.length &&
              dataSource.filters.length > 0 &&
              dataItems.value?.length === 0
            ? h(BsListTile, null, {
                default: () =>
                  useRenderSlot(slots, 'not-found-msg', { key: 'notFoundMessage' }, [
                    h(BsListTileTitle, null, {
                      default: () => toDisplayString(props.notFoundMessage),
                    }),
                  ]),
              })
            : renderListboxItems(slots, emit, props, schema, dataItems, selectedItems, localValue),
    }
  );
}

function renderListboxItems(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  dataItems: ShallowRef<IBsModel[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  localValue: Ref<string | number | string[] | number[] | undefined | null>
): VNode[] | undefined {
  return dataItems.value.map((item, idx) =>
    h(Fragment, [
      h(
        BsListTile,
        {
          // key: Helper.uuid(true),
          key: item.get('_oid') as never,
          navigable: (!props.readonly && !props.disabled) as unknown as Prop<boolean>,
          disabled: (props.disabled === true ||
            item.get(<string>schema.disableField) === true) as unknown as Prop<boolean>,
          active: item.get('_selected') as Prop<boolean>,
          'onUpdate:active': (value: boolean) =>
            dispatchListboxEvent(
              emit,
              props,
              dataItems,
              selectedItems,
              localValue,
              item,
              schema.valueField,
              value
            ),
        },
        {
          default: () =>
            props.multiple === true
              ? createListboxItemContentWithCheckbox(slots, props, schema, localValue, item, idx)
              : createListboxItemContent(slots, props, schema, item, idx),
        }
      ),
      props.itemSeparator && idx + 1 < dataItems.value.length
        ? h(BsDivider, { key: `divider-${idx}` })
        : undefined,
    ])
  );
}

async function dispatchListboxEvent(
  emit: TEmitFn,
  props: Readonly<TListboxOptionProps>,
  dataItems: ShallowRef<IBsModel[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  localValue: Ref<string | number | string[] | number[] | undefined | null>,
  item: IBsModel,
  valueField: string,
  isSelected: boolean
): Promise<void> {
  if (isSelected) {
    if (props.multiple === true) {
      selectedItems.value = selectedItems.value.concat(item);
    } else {
      selectedItems.value = [item];
    }
    emit('select', item);
  } else {
    selectedItems.value = selectedItems.value.filter(
      (it) => it.get(valueField) !== item.get(valueField)
    );
    emit('deselect', item);
  }

  if (props.multiple === true) {
    localValue.value = selectedItems.value.map((it) => it.get(valueField)) as never;
  } else {
    localValue.value = (
      selectedItems.value.length > 0 ? selectedItems.value[0]?.get(valueField) : undefined
    ) as never;
  }

  dataItems.value = dataItems.value.map((it) => {
    it.set(
      '_selected',
      selectedItems.value.find((row) => row.get(valueField) === it.get(valueField)) != null
    );
    return it;
  });

  await nextTick().then(() => {
    emit('update:model-value', localValue.value);
    emit('update:selected-value', selectedItems.value);
  });
}

function createListboxItemContentWithCheckbox(
  slots: Slots,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  localValue: Ref<string | number | string[] | number[] | undefined | null>,
  item: IBsModel,
  index: number
): VNode[] {
  const nodes: VNode[] = [];
  if (props.useCheckbox === true && props.checkboxPosition !== 'right') {
    nodes.push(createListTileCheckbox(props, schema, localValue, item));
  }
  nodes.push(...createListboxItemContent(slots, props, schema, item, index));
  if (props.useCheckbox === true && props.checkboxPosition === 'right') {
    nodes.push(createListTileCheckbox(props, schema, localValue, item));
  }

  return nodes;
}

function createListTileCheckbox(
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  localValue: Ref<string | number | string[] | number[] | undefined | null>,
  item: IBsModel
): VNode {
  return h<TBsListTileAction>(
    BsListTileAction,
    {
      center: true as unknown as Prop<boolean>,
    },
    {
      default: () =>
        h<TBsCheckbox>(BsCheckbox, {
          color: (props.checkboxColor || 'default') as Prop<string>,
          value: item.get(schema.valueField) as Prop<Numberish>,
          modelValue: localValue.value as Prop<Numberish>,
        }),
    }
  );
}

function createListboxItemContent(
  slots: Slots,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  item: IBsModel,
  index: number
): VNode[] {
  const nodes: VNode[] = [];
  if (
    props.showImage === true &&
    (Object.hasOwn(item, schema.imageField as string) ||
      item.get(schema.imageField as string) != null)
  ) {
    nodes.push(createListTileLeading(props, schema, item));
  }
  nodes.push(createListTileContent(slots, schema, item, index));

  return nodes;
}

function createListTileLeading(
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  item: IBsModel
): VNode {
  return h(BsListTileLeading, {
    imgSrc: item.get(schema.imageField as string) as Prop<string>,
    circle: props.circleImage as unknown as Prop<boolean>,
    rounded: props.roundedImage as unknown as Prop<boolean>,
    size: props.imageSize as Prop<number>,
  });
}

function createListTileContent(
  slots: Slots,
  schema: TDataListSchema,
  item: IBsModel,
  index: number
): VNode {
  return h(BsListTileContent, null, {
    default: () =>
      useRenderSlot(
        slots,
        'option-item',
        { key: 'list-tile-content' },
        h(BsListTileTitle, null, {
          default: () => toDisplayString(item.get(schema.displayField)),
        }),
        { item: item, index: index }
      ),
  });
}

function findSelectedItems(
  localValue: Ref<string | number | string[] | number[] | undefined | null>,
  fieldName: string,
  dataStore?: IBsStore | IArrayStore
): IBsModel[] {
  return (
    dataStore?.dataItems.filter((it) => {
      if (Array.isArray(localValue.value)) {
        return localValue.value.some((v) => v === it.get(fieldName));
      } else {
        return localValue.value === it.get(fieldName);
      }
    }) || []
  );
}

function cloneDataItems(
  dataSource: IBsStore | IArrayStore | AbstractStore,
  selectedItems: ShallowRef<IBsModel[]>,
  fieldName: string
): IBsModel[] {
  return dataSource.dataItems.map((it) => {
    const tmpObj = dataSource.createModel(it.toObject());
    if (!tmpObj.get('_oid')) {
      tmpObj.set('_oid', Helper.uuid(true));
    }
    tmpObj.set(
      '_selected',
      selectedItems.value.find((row) => row.get(fieldName) === it.get(fieldName)) != null
    );

    return tmpObj;
  });
}

export function useRenderListbox(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  cacheItems: ShallowRef<IBsModel[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  listviewStyles: TRecord,
  showSearchbox: Ref<boolean>,
  searchboxRef: Ref<HTMLElement | null>,
  localValue: Ref<string | number | string[] | number[] | undefined | null>,
  searchRef: Ref<string | undefined>
): VNode {
  return h(
    'div',
    {
      class: {
        [`${cssPrefix}listbox`]: true,
        [`bg-${props.color}`]: props.color,
        border: !props.borderless,
      },
    },
    [
      renderSearchbox(
        emit,
        props,
        schema,
        cacheItems,
        selectedItems,
        showSearchbox,
        searchboxRef,
        searchRef
      ),
      renderListboxView(
        slots,
        emit,
        props,
        schema,
        cacheItems,
        listviewStyles,
        selectedItems,
        localValue
      ),
    ]
  );
}

export function useRegisterListboxWatchers(
  emit: TEmitFn,
  props: Readonly<TListboxOptionProps>,
  dataSource: IBsStore | IArrayStore | undefined,
  schema: TDataListSchema,
  cachedItems: ShallowRef<IBsModel[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  localValue: Ref<string | number | string[] | number[] | undefined | null>,
  listviewStyles: TRecord,
  showSearchbox: Ref<boolean>,
  searchboxRef: Ref<HTMLElement | null>,
  searchText: Ref<string | undefined>
) {
  const maxHeight = parseInt(props.maxHeight as string, 10);
  const minItems = parseInt(props.minSearchLength as string, 10);

  if (dataSource) {
    const listener: LoadedCallbackFn = (data: IBsModel[]) => {
      if (data.length === 0) {
        cachedItems.value = [];
      } else {
        selectedItems.value = findSelectedItems(localValue, schema.valueField, dataSource);
        cachedItems.value = cloneDataItems(dataSource, selectedItems, schema.valueField);
      }
      emit('data-bind', data);
    };

    dataSource.onLoaded(listener);
  }

  watchEffect(() => {
    if (!showSearchbox.value) {
      showSearchbox.value =
        (dataSource && dataSource.storeState.length >= minItems) ||
        !Helper.isEmpty(searchText.value) ||
        false;
    }
    if (showSearchbox.value && searchboxRef.value) {
      listviewStyles.maxHeight = maxHeight - (searchboxRef.value.offsetHeight || 63) + 'px';
    }
  });

  watch(
    () => props.searchText,
    (value) => {
      if (
        dataSource &&
        ((value && value.length >= parseInt(props.minSearchChars as string, 10)) ||
          Helper.isEmpty(value))
      ) {
        filterListboxItems(
          emit,
          schema,
          dataSource,
          cachedItems,
          selectedItems,
          searchText,
          value || ''
        );
      }
    }
  );
  watch(
    () => props.modelValue,
    (value) => {
      localValue.value = value;
      if (Helper.isEmpty(value)) {
        selectedItems.value = [];
      } else if (
        !props.multiple &&
        (dataSource?.filters.length === 0 ||
          dataSource?.defaultFilters.length === dataSource?.filters.length)
      ) {
        selectedItems.value = findSelectedItems(localValue, schema.valueField, dataSource);
      }

      cachedItems.value = cachedItems.value.map((it) => {
        it.set(
          '_selected',
          selectedItems.value.find(
            (row) => row.get(schema.valueField) === it.get(schema.valueField)
          ) != null
        );
        return it;
      });
    }
  );

  onMounted(() => {
    if (!dataSource || !props.autoload) {
      return;
    }

    queueMicrotask(() => {
      if (dataSource.storeState.length === 0) {
        dataSource.load().catch((error) => {
          emit('data-error', error);
        });
      } else {
        selectedItems.value = findSelectedItems(localValue, schema.valueField, dataSource);
        cachedItems.value = cloneDataItems(dataSource, selectedItems, schema.valueField);
        emit('data-bind', dataSource.dataItems);
      }
    });
  });
}
