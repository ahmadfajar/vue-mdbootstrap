import type {ComputedRef, Ref, Slots, VNode} from "vue";
import {createCommentVNode, Fragment, h, nextTick, toDisplayString, vModelText, withDirectives} from "vue";
import {kebabCase} from "lodash";
import {cssPrefix, useRenderSlot} from "../../../mixins/CommonApi";
import {BsCheckbox} from "../../Checkbox";
import {
    BsListTile,
    BsListTileAction,
    BsListTileContent,
    BsListTileLeading,
    BsListTileTitle,
    BsListView
} from "../../ListView";
import type {
    IArrayStore,
    IBsModel,
    IBsStore,
    TDataListSchemaProps,
    TEmitFn,
    TListboxOptionProps,
    TRecord
} from "../../../types";
import AbstractStore from "../../../model/AbstractStore";
import BsStore from "../../../model/BsStore";
import Helper from "../../../utils/Helper";
import {BsDivider} from "../../Basic";

export function useFilterListboxItems(
    emit: TEmitFn,
    schema: TDataListSchemaProps,
    dataSource: IBsStore | IArrayStore | AbstractStore,
    searchRef: Ref<string | undefined>,
    search: string,
) {
    if (dataSource instanceof AbstractStore) {
        searchRef.value = search;

        if (Helper.isEmpty(search)) {
            dataSource.setFilters([], true);
            (<BsStore>dataSource).load().catch(error => emit("data-error", error));
        } else {
            const newFilters = dataSource.createFilters([
                {property: schema.displayField, value: search, operator: "contains"},
                {property: schema.valueField, value: search, operator: "contains"},
            ]);
            dataSource.setFilters(newFilters, true);
            (<BsStore>dataSource).load()
                .then(() => {
                    emit("data-filtered", newFilters);
                    emit("update:search-text", search);
                })
                .catch(error => {
                    emit("data-error", error);
                });
        }
    } else {
        throw Error("Operation not supported. DataSource.proxy is not instance of AbstractStore");
    }
}

function renderListboxSearchbox(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    showSearchbox: ComputedRef<boolean | undefined>,
    searchboxRef: Ref<HTMLElement | null>,
    searchRef: Ref<string | undefined>,
): VNode {
    const dataSource = props.dataSource?.proxy;

    if (dataSource && showSearchbox.value) {
        const minChars = parseInt(<string>props.minSearchChars);

        return h("label", {
            ref: searchboxRef,
            class: [`${cssPrefix}listbox-search`]
        }, [
            withDirectives(h("input", {
                type: "text",
                role: "textbox",
                tabindex: "-1",
                autocomplete: "off",
                placeholder: props.searchLabel,
                "onUpdate:modelValue": (value: string) => {
                    if (value.length >= minChars) {
                        useFilterListboxItems(emit, schema, dataSource, searchRef, value);
                    }
                },
            }), [
                [vModelText, searchRef.value]
            ]),
        ]);
    } else {
        return createCommentVNode(" v-if-searchbox ");
    }
}

export function useRenderListbox(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    dataItems: ComputedRef<IBsModel[] | undefined>,
    listviewStyles: ComputedRef<TRecord>,
    showSearchbox: ComputedRef<boolean | undefined>,
    searchboxRef: Ref<HTMLElement | null>,
    selectedItems: IBsModel[],
    localValue: Ref<string | number | string[] | number[] | undefined>,
    searchRef: Ref<string | undefined>,
): VNode {
    return h("div", {
        class: [
            `${cssPrefix}listbox`,
            props.color ? `bg-${props.color}` : '',
            !props.borderless ? 'border' : ''
        ]
    }, [
        renderListboxSearchbox(emit, props, schema, showSearchbox, searchboxRef, searchRef),
        renderListboxView(
            slots, emit, props, schema, dataItems,
            listviewStyles, selectedItems, localValue,
        ),
    ]);
}

function renderListboxView(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    dataItems: ComputedRef<IBsModel[] | undefined>,
    listviewStyles: ComputedRef<TRecord>,
    selectedItems: IBsModel[],
    localValue: Ref<string | number | string[] | number[] | undefined>,
): VNode {
    const dataSource = props.dataSource?.proxy;

    // @ts-ignore
    return h(BsListView, {
            color: props.color,
            style: listviewStyles.value,
            individualState: true,
        }, {
            default: () =>
                dataSource?.length === 0
                    ? h(BsListTile, null, {
                        default: () =>
                            useRenderSlot(
                                slots, "emptyDataMsg",
                                {key: "emptyDataMessage"},
                                h(BsListTileTitle, null, {
                                    default: () => toDisplayString(props.emptyDataMessage)
                                })
                            )
                    })
                    : (
                        (
                            dataSource?.filters.length &&
                            dataSource.filters.length > 0 &&
                            dataItems.value?.length === 0
                        ) ? h(BsListTile, null, {
                            default: () =>
                                useRenderSlot(
                                    slots, "notFoundMsg",
                                    {key: "notFoundMessage"},
                                    h(BsListTileTitle, null, {
                                        default: () => toDisplayString(props.notFoundMessage)
                                    })
                                )
                        }) : renderListboxItems(
                            slots, emit, props, schema, dataItems, selectedItems, localValue,
                        )
                    )
        }
    );
}

function renderListboxItems(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    dataItems: ComputedRef<IBsModel[] | undefined>,
    selectedItems: IBsModel[],
    localValue: Ref<string | number | string[] | number[] | undefined>,
): VNode[] | undefined {
    const findIndex = (item: IBsModel) => {
        return selectedItems.findIndex(it =>
            it.get(schema.valueField) === item.get(schema.valueField)
        )
    }

    return dataItems.value?.map((item, idx) =>
        h(Fragment, [
            // @ts-ignore
            h(BsListTile, {
                key: kebabCase(item.get(schema.displayField)) + "-" + idx,
                navigable: !props.readonly && !props.disabled,
                disabled: props.disabled === true || item.get(schema.disableField) === true,
                active: findIndex(item) !== -1,
                "onUpdate:active": (value: boolean) =>
                    dispatchListboxEvent(
                        emit, props, selectedItems, localValue,
                        item, schema.valueField, value
                    ),
            }, {
                default: () =>
                    props.multiple === true
                        ? createListboxItemContentWithCheckbox(
                            slots, emit, props, schema, selectedItems,
                            localValue, item, idx
                        )
                        : createListboxItemContent(slots, props, schema, item, idx)
            }),
            (
                props.itemSeparator && (idx + 1 < <number>dataItems.value?.length)
                    ? h(BsDivider, {key: "divider-" + idx})
                    : undefined
            ),
        ])
    )
}

function dispatchListboxEvent(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    selectedItems: IBsModel[],
    localValue: Ref<string | number | string[] | number[] | undefined>,
    item: IBsModel,
    valueField: string,
    isSelected: boolean,
) {
    if (isSelected) {
        if (props.multiple === true) {
            const fdx = selectedItems.findIndex(it =>
                it.get(valueField) === item.get(valueField)
            );
            if (fdx === -1) {
                selectedItems.push(item);
            }
        } else {
            selectedItems = [item];
        }
        emit("select", item);
    } else {
        selectedItems = selectedItems.filter(it =>
            it.get(valueField) !== item.get(valueField)
        );
        emit("deselect", item);
    }
    if (props.multiple === true) {
        localValue.value = selectedItems.map(it => it.get(valueField));
    } else {
        localValue.value = selectedItems[0].get(valueField);
    }

    nextTick().then(() => emit("update:model-value", localValue.value));
}

function createListboxItemContentWithCheckbox(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    selectedItems: IBsModel[],
    localValue: Ref<string | number | string[] | number[] | undefined>,
    item: IBsModel,
    index: number,
): VNode[] {
    const nodes: VNode[] = [];
    if (props.useCheckbox === true && props.checkboxPosition !== "right") {
        nodes.push(createListTileCheckbox(emit, props, schema, selectedItems, localValue, item));
    }
    if (
        props.showImage === true &&
        (Object.hasOwn(item, schema.imageField) || item.get(schema.imageField) !== undefined)
    ) {
        nodes.push(createListTileLeading(props, schema, item));
    }
    nodes.push(createListTileContent(slots, schema, item, index));
    if (props.useCheckbox === true && props.checkboxPosition === "right") {
        nodes.push(createListTileCheckbox(emit, props, schema, selectedItems, localValue, item));
    }

    return nodes;
}

function createListTileCheckbox(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    selectedItems: IBsModel[],
    localValue: Ref<string | number | string[] | number[] | undefined>,
    item: IBsModel,
): VNode {
    // @ts-ignore
    return h(BsListTileAction, {
        center: true
    }, {
        // @ts-ignore
        default: () => h(BsCheckbox, {
            color: props.checkboxColor,
            value: item,
            modelValue: selectedItems,
            "onUpdate:model-value": (values: IBsModel[]) => {
                selectedItems = values;
                localValue.value = selectedItems.map(it => it.get(schema.valueField));
                emit("update:model-value", localValue.value);
            }
        })
    });
}

function createListboxItemContent(
    slots: Slots,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    item: IBsModel,
    index: number,
): VNode[] {
    const nodes: VNode[] = [];
    if (
        props.showImage === true &&
        (Object.hasOwn(item, schema.imageField) || item.get(schema.imageField) !== undefined)
    ) {
        nodes.push(createListTileLeading(props, schema, item));
    }

    nodes.push(createListTileContent(slots, schema, item, index));

    return nodes;
}

function createListTileLeading(
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    item: IBsModel,
): VNode {
    // @ts-ignore
    return h(BsListTileLeading, {
        imgSrc: item.get(schema.imageField),
        circle: props.circleImage,
        rounded: props.roundedImage,
        size: props.imageSize,
    });
}

function createListTileContent(
    slots: Slots,
    schema: TDataListSchemaProps,
    item: IBsModel,
    index: number,
): VNode {
    return h(BsListTileContent, null, {
        default: () => useRenderSlot(
            slots, "optionItem", {key: "list-tile-content"},
            h(BsListTileTitle, null, {
                default: () => toDisplayString(item.get(schema.displayField))
            }),
            {item: item, index: index},
        )
    });
}
