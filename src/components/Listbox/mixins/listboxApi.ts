import type {ComputedRef, Ref, ShallowRef, Slots, VNode} from "vue";
import {createCommentVNode, Fragment, h, nextTick, toDisplayString, vModelText, withDirectives} from "vue";
import {kebabCase} from "lodash";
import {cssPrefix, useRenderSlot} from "../../../mixins/CommonApi";
import {BsDivider} from "../../Basic";
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
import Helper from "../../../utils/Helper";

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
            dataSource.load().catch(error => emit("data-error", error));
        } else {
            const newFilters = dataSource.createFilters([
                {property: schema.displayField, value: search, operator: "contains"},
                {property: schema.valueField, value: search, operator: "contains"},
            ]);
            dataSource.setFilters(newFilters, true);
            dataSource.load()
                .then(() => {
                    emit("data-filtered", newFilters);
                    emit("update:search-text", search);
                })
                .catch(error => emit("data-error", error));
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
    selectedItems: ShallowRef<IBsModel[]>,
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
    selectedItems: ShallowRef<IBsModel[]>,
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
    selectedItems: ShallowRef<IBsModel[]>,
    localValue: Ref<string | number | string[] | number[] | undefined>,
): VNode[] | undefined {
    return dataItems.value?.map((item, idx) =>
        h(Fragment, [
            // @ts-ignore
            h(BsListTile, {
                key: kebabCase(item.get(schema.displayField)) + "-" + idx,
                navigable: !props.readonly && !props.disabled,
                disabled: props.disabled === true || item.get(<string>schema.disableField) === true,
                active: item.get("active"),
                "onUpdate:active": (value: boolean) =>
                    dispatchListboxEvent(
                        emit, props, dataItems,
                        selectedItems, localValue,
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
    dataItems: ComputedRef<IBsModel[] | undefined>,
    selectedItems: ShallowRef<IBsModel[]>,
    localValue: Ref<string | number | string[] | number[] | undefined>,
    item: IBsModel,
    valueField: string,
    isSelected: boolean,
) {
    dataItems.value?.forEach(it => it.set("active", false));

    if (isSelected) {
        if (props.multiple === true) {
            const fdx = selectedItems.value.findIndex(it =>
                it.get(valueField) === item.get(valueField)
            );
            if (fdx === -1) {
                selectedItems.value = selectedItems.value.concat(item);
            }
        } else {
            selectedItems.value = [item];
        }
        emit("select", item);
    } else {
        selectedItems.value = selectedItems.value.filter(it =>
            it.get(valueField) !== item.get(valueField)
        );
        emit("deselect", item);
    }

    if (props.multiple === true) {
        selectedItems.value.forEach(it => it.set("active", true));
        localValue.value = selectedItems.value.map(it => it.get(valueField));
    } else {
        localValue.value = selectedItems.value.length > 0 ? selectedItems.value[0].get(valueField) : undefined;
    }

    item.set("active", isSelected);
    nextTick().then(() => emit("update:model-value", localValue.value));
}

function createListboxItemContentWithCheckbox(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    selectedItems: ShallowRef<IBsModel[]>,
    localValue: Ref<string | number | string[] | number[] | undefined>,
    item: IBsModel,
    index: number,
): VNode[] {
    const nodes: VNode[] = [];
    if (props.useCheckbox === true && props.checkboxPosition !== "right") {
        nodes.push(createListTileCheckbox(emit, props, schema, selectedItems, localValue, item));
    }
    nodes.push(...createListboxItemContent(slots, props, schema, item, index));
    if (props.useCheckbox === true && props.checkboxPosition === "right") {
        nodes.push(createListTileCheckbox(emit, props, schema, selectedItems, localValue, item));
    }

    return nodes;
}

function createListTileCheckbox(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    selectedItems: ShallowRef<IBsModel[]>,
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
                selectedItems.value = values;
                localValue.value = selectedItems.value.map(it => it.get(schema.valueField));
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
        (Object.hasOwn(item, <string>schema.imageField) || item.get(<string>schema.imageField) !== undefined)
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
        imgSrc: item.get(<string>schema.imageField),
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
