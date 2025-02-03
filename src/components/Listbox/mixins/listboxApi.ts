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
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi';
import { AbstractStore, BsStore } from '@/model';
import type {
    IArrayStore,
    IBsModel,
    IBsStore,
    LoadedCallbackFn,
    TDataListSchemaProps,
    TEmitFn,
    TListboxOptionProps,
    TRecord,
} from '@/types';
import Helper from '@/utils/Helper';
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
    schema: TDataListSchemaProps,
    dataSource: IBsStore | IArrayStore | AbstractStore,
    cacheItems: ShallowRef<IBsModel[]>,
    selectedItems: ShallowRef<IBsModel[]>,
    searchRef: Ref<string | undefined>,
    search: string
) {
    if (dataSource instanceof AbstractStore) {
        searchRef.value = search;

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
                cacheItems.value = cloneDataItems(dataSource, selectedItems, schema.valueField);
                emit('data-filter', dataSource.dataItems);
                emit('update:search-text', search);
            }
        }
    } else {
        throw Error("Operation not supported. 'DataSource.proxy' is not instance of AbstractStore");
    }
}

function renderListboxSearchbox(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    cacheItems: ShallowRef<IBsModel[]>,
    selectedItems: ShallowRef<IBsModel[]>,
    showSearchbox: Ref<boolean>,
    searchboxRef: Ref<HTMLElement | null>,
    searchRef: Ref<string | undefined>
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
                                        cacheItems,
                                        selectedItems,
                                        searchRef,
                                        value
                                    );
                                }, 75);
                            }
                        },
                    }),
                    [[vModelText, searchRef.value]]
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
    schema: TDataListSchemaProps,
    dataItems: ShallowRef<IBsModel[]>,
    listviewStyles: TRecord,
    selectedItems: ShallowRef<IBsModel[]>,
    localValue: Ref<string | number | string[] | number[] | undefined | null>
): VNode {
    const dataSource = props.dataSource?.proxy;

    return h(
        BsListView,
        {
            color: props.color as Prop<string>,
            style: listviewStyles,
            // @ts-ignore
            individualState: true as Prop<boolean>,
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
                      : renderListboxItems(
                            slots,
                            emit,
                            props,
                            schema,
                            dataItems,
                            selectedItems,
                            localValue
                        ),
        }
    );
}

function renderListboxItems(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
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
                    // @ts-ignore
                    navigable: (!props.readonly && !props.disabled) as Prop<boolean>,
                    // @ts-ignore
                    disabled: (props.disabled === true ||
                        item.get(<string>schema.disableField) === true) as Prop<boolean>,
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
                            ? createListboxItemContentWithCheckbox(
                                  slots,
                                  props,
                                  schema,
                                  localValue,
                                  item,
                                  idx
                              )
                            : createListboxItemContent(slots, props, schema, item, idx),
                }
            ),
            props.itemSeparator && idx + 1 < dataItems.value.length
                ? h(BsDivider, { key: `divider-${idx}` })
                : undefined,
        ])
    );
}

function dispatchListboxEvent(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    dataItems: ShallowRef<IBsModel[]>,
    selectedItems: ShallowRef<IBsModel[]>,
    localValue: Ref<string | number | string[] | number[] | undefined | null>,
    item: IBsModel,
    valueField: string,
    isSelected: boolean
) {
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
            selectedItems.value.length > 0 ? selectedItems.value[0].get(valueField) : undefined
        ) as never;
    }

    dataItems.value = dataItems.value.map((it) => {
        it.set(
            '_selected',
            selectedItems.value.find((row) => row.get(valueField) === it.get(valueField)) != null
        );
        return it;
    });

    nextTick().then(() => {
        emit('update:model-value', localValue.value);
        emit('update:selected-value', selectedItems.value);
    });
}

function createListboxItemContentWithCheckbox(
    slots: Slots,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
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
    schema: TDataListSchemaProps,
    localValue: Ref<string | number | string[] | number[] | undefined | null>,
    item: IBsModel
): VNode {
    return h(
        BsListTileAction,
        {
            // @ts-ignore
            center: true as Prop<boolean>,
        },
        {
            // @ts-ignore
            default: () =>
                h(BsCheckbox, {
                    color: (props.checkboxColor || 'default-color') as Prop<string>,
                    value: item.get(schema.valueField) as Prop<string | number>,
                    modelValue: localValue.value as Prop<string | number>,
                }),
        }
    );
}

function createListboxItemContent(
    slots: Slots,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
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
    schema: TDataListSchemaProps,
    item: IBsModel
): VNode {
    return h(BsListTileLeading, {
        imgSrc: item.get(schema.imageField as string) as Prop<string>,
        // @ts-ignore
        circle: props.circleImage as Prop<boolean>,
        // @ts-ignore
        rounded: props.roundedImage as Prop<boolean>,
        size: props.imageSize as Prop<number>,
    });
}

function createListTileContent(
    slots: Slots,
    schema: TDataListSchemaProps,
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
        const tmpObj = dataSource.createModel(it.toObject()) as IBsModel;
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
    schema: TDataListSchemaProps,
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
            class: [
                `${cssPrefix}listbox`,
                props.color ? `bg-${props.color}` : '',
                !props.borderless ? 'border' : '',
            ],
        },
        [
            renderListboxSearchbox(
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
    schema: TDataListSchemaProps,
    cacheItems: ShallowRef<IBsModel[]>,
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
                cacheItems.value = [];
            } else {
                selectedItems.value = findSelectedItems(localValue, schema.valueField, dataSource);
                cacheItems.value = cloneDataItems(dataSource, selectedItems, schema.valueField);
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
                    cacheItems,
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

            cacheItems.value = cacheItems.value.map((it) => {
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

        queueMicrotask(async () => {
            try {
                if (dataSource.storeState.length === 0) {
                    await dataSource.load();
                } else {
                    selectedItems.value = findSelectedItems(
                        localValue,
                        schema.valueField,
                        dataSource
                    );
                    cacheItems.value = cloneDataItems(dataSource, selectedItems, schema.valueField);
                    emit('data-bind', dataSource.dataItems);
                }
            } catch (error) {
                emit('data-error', error);
            }
        });
    });
}
