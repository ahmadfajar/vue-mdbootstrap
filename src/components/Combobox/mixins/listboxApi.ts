import { BsDivider } from '@/components/Basic';
import { BsCheckbox } from '@/components/Checkbox';
import type { TDataListSchema, TListboxOptionProps } from '@/components/Combobox/types';
import {
  BsListTile,
  BsListTileAction,
  BsListTileContent,
  BsListTileLeading,
  BsListTileTitle,
  BsListView,
} from '@/components/ListView';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import {
  AbstractStore,
  BsStore,
  type IArrayStore,
  type IBsStore,
  type LoadedCallbackFn,
  type TBsModel,
} from '@/model';
import type { Numberish, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { EmitFn, Ref, ShallowRef, Slots, VNode } from 'vue';
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
  emit: EmitFn,
  schema: TDataListSchema,
  dataSource: IBsStore | IArrayStore | undefined,
  cachedItems: ShallowRef<TBsModel[]>,
  selectedItems: ShallowRef<TBsModel[]>,
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
  emit: EmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  cachedItems: ShallowRef<TBsModel[]>,
  selectedItems: ShallowRef<TBsModel[]>,
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
        class: [`${cssPrefix}listbox-search`, 'block'],
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
  emit: EmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  dataItems: ShallowRef<TBsModel[]>,
  listviewStyles: TRecord,
  selectedItems: ShallowRef<TBsModel[]>,
  localValue: Ref<Numberish | Numberish[] | undefined | null>
): VNode {
  const dataSource = props.dataSource?.proxy;

  return h(
    BsListView,
    {
      color: props.color,
      style: listviewStyles,
      individualState: true,
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
  emit: EmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  dataItems: ShallowRef<TBsModel[]>,
  selectedItems: ShallowRef<TBsModel[]>,
  localValue: Ref<Numberish | Numberish[] | undefined | null>
): VNode[] | undefined {
  return dataItems.value.map((item, idx) =>
    h(Fragment, [
      h(
        BsListTile,
        {
          // key: Helper.uuid(true),
          key: item.get('_oid') as never,
          navigable: !props.readonly && !props.disabled,
          disabled: props.disabled === true || item.get(schema.disableField!) === true,
          active: item.get('_selected') as boolean,
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          'onUpdate:active': async (value: boolean) => {
            await dispatchListboxEvent(
              emit,
              props,
              dataItems,
              selectedItems,
              localValue,
              item,
              schema.valueField,
              value
            );
          },
        },
        {
          default: () =>
            props.multiple === true
              ? createListboxItemContentWithCheckbox(slots, props, schema, localValue, item, idx)
              : createListboxItemContent(slots, props, schema, item, idx),
        }
      ),
      props.itemSeparator && idx + 1 < dataItems.value.length
        ? h(BsDivider, {
            key: `divider-${idx}`,
            dark: props.itemSeparatorDark,
          })
        : undefined,
    ])
  );
}

async function dispatchListboxEvent(
  emit: EmitFn,
  props: Readonly<TListboxOptionProps>,
  dataItems: ShallowRef<TBsModel[]>,
  selectedItems: ShallowRef<TBsModel[]>,
  localValue: Ref<Numberish | Numberish[] | undefined | null>,
  item: TBsModel,
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
    selectedItems.value = selectedItems.value.filter((it) => it[valueField] !== item[valueField]);
    emit('deselect', item);
  }

  if (props.multiple === true) {
    localValue.value = selectedItems.value.map((it) => it[valueField]) as never;
  } else {
    localValue.value = (
      selectedItems.value.length > 0 ? selectedItems.value[0][valueField] : undefined
    ) as never;
  }

  dataItems.value = dataItems.value.map((it) => {
    it.set(
      '_selected',
      selectedItems.value.find((row) => row[valueField] === it[valueField]) != null
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
  localValue: Ref<Numberish | Numberish[] | undefined | null>,
  item: TBsModel,
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
  localValue: Ref<Numberish | Numberish[] | undefined | null>,
  item: TBsModel
): VNode {
  return h(
    BsListTileAction,
    {
      center: true,
    },
    {
      default: () =>
        h(BsCheckbox, {
          color: props.checkboxColor || 'default',
          value: item.get(schema.valueField),
          modelValue: localValue.value,
          readonly: props.readonly,
          disabled: props.disabled,
        }),
    }
  );
}

function createListboxItemContent(
  slots: Slots,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  item: TBsModel,
  index: number
): VNode[] {
  const nodes: VNode[] = [];
  if (
    props.showImage === true &&
    (Object.hasOwn(item, schema.imageField!) || item.get(schema.imageField!) != null)
  ) {
    nodes.push(createListTileLeading(props, schema, item));
  }
  nodes.push(createListTileContent(slots, schema, item, index));

  return nodes;
}

function createListTileLeading(
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  item: TBsModel
): VNode {
  return h(BsListTileLeading, {
    imgSrc: item.get(schema.imageField!) as string,
    circle: props.circleImage,
    rounded: props.roundedImage,
    size: props.imageSize,
  });
}

function createListTileContent(
  slots: Slots,
  schema: TDataListSchema,
  item: TBsModel,
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
  localValue: Ref<Numberish | Numberish[] | undefined | null>,
  fieldName: string,
  dataStore?: IBsStore | IArrayStore
): TBsModel[] {
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
  dataSource: IBsStore | IArrayStore,
  selectedItems: ShallowRef<TBsModel[]>,
  fieldName: string
): TBsModel[] {
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
  emit: EmitFn,
  props: Readonly<TListboxOptionProps>,
  schema: TDataListSchema,
  cacheItems: ShallowRef<TBsModel[]>,
  selectedItems: ShallowRef<TBsModel[]>,
  listviewStyles: TRecord,
  showSearchbox: Ref<boolean>,
  searchboxRef: Ref<HTMLElement | null>,
  localValue: Ref<Numberish | Numberish[] | undefined | null>,
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
  emit: EmitFn,
  props: Readonly<TListboxOptionProps>,
  dataSource: IBsStore | IArrayStore | undefined,
  schema: TDataListSchema,
  cachedItems: ShallowRef<TBsModel[]>,
  selectedItems: ShallowRef<TBsModel[]>,
  localValue: Ref<Numberish | Numberish[] | undefined | null>,
  listviewStyles: TRecord,
  showSearchbox: Ref<boolean>,
  searchboxRef: Ref<HTMLElement | null>,
  searchText: Ref<string | undefined>
) {
  const maxHeight = parseInt(props.maxHeight as string, 10);
  const minItems = parseInt(props.minSearchLength as string, 10);

  if (dataSource) {
    const listener: LoadedCallbackFn<TRecord> = (data: TBsModel[]) => {
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
