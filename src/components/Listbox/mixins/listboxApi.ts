import {ComputedRef, createCommentVNode, h, Ref, Slots, toDisplayString, vModelText, VNode, withDirectives} from "vue";
import {kebabCase} from "lodash";
import {
    IArrayStore,
    IBsModel,
    IBsStore,
    TDataListSchemaProps,
    TEmitFn,
    TListboxOptionProps,
    TRecord
} from "../../../types";
import {cssPrefix, useRenderSlot} from "../../../mixins/CommonApi";
import {
    BsListTile,
    BsListTileAction,
    BsListTileContent,
    BsListTileLeading,
    BsListTileTitle,
    BsListView
} from "../../ListView";
import AbstractStore from "../../../model/AbstractStore";
import BsStore from "../../../model/BsStore";
import Helper from "../../../utils/Helper";
import {BsCheckbox} from "../../Checkbox";

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
    selectedValues: Ref<string | number | string[] | number[] | undefined>,
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
        renderListboxView(slots, emit, props, schema, dataItems, listviewStyles, selectedItems),
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
): VNode {
    const dataSource = props.dataSource?.proxy;

    // @ts-ignore
    return h(BsListView, {
            color: props.color,
            style: listviewStyles.value,
            individualState: true,
        }, {
            default: () => dataSource?.length === 0
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
                    dataSource?.filters.length && dataSource.filters.length > 0 && dataItems.value?.length === 0
                        ? h(BsListTile, null, {
                            default: () =>
                                useRenderSlot(
                                    slots, "notFoundMsg",
                                    {key: "notFoundMessage"},
                                    h(BsListTileTitle, null, {
                                        default: () => toDisplayString(props.notFoundMessage)
                                    })
                                )
                        })
                        : renderListboxItems(
                            slots, emit, props, schema, dataItems, selectedItems,
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
): VNode[] | undefined {
    return dataItems.value?.map((item, idx) =>
        // @ts-ignore
        h(BsListTile, {
            key: kebabCase(item.get(schema.displayField)) + "-" + idx.toString(),
            navigable: !props.readonly && !props.disabled,
            disabled: props.disabled === true || item.get(schema.disableField) === true,
            active: selectedItems.findIndex(it => it.get(schema.valueField) === item.get(schema.valueField)) !== -1,
            "onUpdate:active": (value: boolean) => {
                if (value) {
                    selectedItems.push(item);
                } else {
                    selectedItems = selectedItems.filter(it => it.get(schema.valueField) !== item.get(schema.valueField));
                    emit("update:model-value", selectedItems);
                }
            },
        }, {
            default: () =>
                props.multiple === true
                    ? renderListboxCheckableItem(slots, emit, props, schema, selectedItems, item, idx)
                    : renderListboxItem(slots, props, schema, item, idx)
        })
    )
}

function renderListboxCheckableItem(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    selectedItems: IBsModel[],
    item: IBsModel,
    index: number,
): VNode[] {
    const nodes: VNode[] = [];
    if (props.useCheckbox === true && props.checkboxPosition !== "right") {
        nodes.push(createListTileCheckbox(emit, props, selectedItems, item));
    }
    if (props.showImage === true && Object.hasOwn(item, schema.imageField)) {
        nodes.push(createListTileLeading(props, schema, item));
    }
    nodes.push(createListTileContent(slots, schema, item, index));
    if (props.useCheckbox === true && props.checkboxPosition === "right") {
        nodes.push(createListTileCheckbox(emit, props, selectedItems, item));
    }

    return nodes;
}

function createListTileCheckbox(
    emit: TEmitFn,
    props: Readonly<TListboxOptionProps>,
    selectedItems: IBsModel[],
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
                emit("update:model-value", values);
            }
        })
    });
}

function renderListboxItem(
    slots: Slots,
    props: Readonly<TListboxOptionProps>,
    schema: TDataListSchemaProps,
    item: IBsModel,
    index: number,
): VNode[] {
    const nodes: VNode[] = [];
    if (props.showImage === true && Object.hasOwn(item, schema.imageField)) {
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
