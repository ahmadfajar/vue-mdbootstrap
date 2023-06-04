import {ComputedRef, ExtractPropTypes, Fragment, h, Ref, ShallowRef, Slots, VNode} from "vue";
import {IBsModel, TBsCombobox, TComboboxOptionProps, TEmitFn, TRecord} from "../../../types";
import {useCreateFieldWrapper} from "../../Field/mixins/textFieldApi";
import {useOnTextFieldNodeMounted} from "../../Field/mixins/textFieldEventApi";
import {BsPopover} from "../../Popover";
import {cssPrefix} from "../../../mixins/CommonApi";
import {BsListbox} from "../../Listbox";

/**
 * Toggle Popover state: show or hide.
 *
 * @param {TEmitFn} emit                Emitter function
 * @param {Ref<boolean>} isPopoverOpen  The Popover state reference
 * @param {boolean} isDisabled          Is the component in disable state or not
 * @param {boolean} state               Current Popover state. Toggle will inverse this state.
 * @return {void}
 */
export function useTogglePopoverState(
    emit: TEmitFn,
    isPopoverOpen: Ref<boolean>,
    isDisabled: boolean,
    state: boolean,
) {
    if (!isDisabled) {
        isPopoverOpen.value = !state;
        emit(isPopoverOpen.value ? "open" : "close");
    }
}

export function useRenderCombobox(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsCombobox>>,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    popoverMinWidth: ComputedRef<number | undefined>,
    activator: Ref<HTMLElement | null>,
    fieldValue: Ref<string[] | number[]>,
    selectedItems: ShallowRef<IBsModel[]>,
    isPopoverOpen: Ref<boolean>,
    isFocused: Ref<boolean>,
    showClearButton: ComputedRef<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasValidated: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>,
): VNode {
    const thisProps = props as Readonly<TComboboxOptionProps>;
    const iconSize = 24;

    return useCreateFieldWrapper(
        slots, iconSize, wrapperCss, thisProps,
        h(Fragment, [
            h("div", {
                ref: activator,
                class: controlCss.value,
                onMouseenter: () => {
                    if (thisProps.openOnHover) {
                        useTogglePopoverState(emit, isPopoverOpen, <boolean>thisProps.disabled, false);
                    }
                },
            }, []),
            // @ts-ignore
            h(BsPopover, {
                color: null,
                space: (thisProps.outlined ? 2 : 1),
                class: [`${cssPrefix}shadow-1`],
                placement: "bottom",
                transition: props.transition,
                open: isPopoverOpen.value,
                trigger: activator.value,
                style: {
                    minWidth: popoverMinWidth.value,
                    maxHeight: (thisProps.popoverMaxHeight || thisProps.listboxMaxHeight),
                },
                onClose: () => useTogglePopoverState(emit, isPopoverOpen, false, true),
            }, {
                // @ts-ignore
                default: () => h(BsListbox, {
                    borderless: true,
                    useCheckbox: true,
                    color: props.listboxColor,
                    dataSource: props.dataSource,
                    readonly: props.readonly,
                    multiple: props.multiple,
                    emptyDataMessage: props.emptyDataMessage,
                    notFoundMessage: props.notFoundMessage,
                    searchLabel: props.listboxSearchLabel,
                    searchText: (isPopoverOpen.value ? "" : undefined),
                    itemSeparator: props.itemSeparator,
                    minSearchChars: props.minSearchChars,
                    minSearchLength: (props.minimumItemsForSearch || props.minSearchLength),
                    maxHeight: (props.popoverMaxHeight || props.listboxMaxHeight),
                    checkboxColor: (props.checkOptionColor || props.checkboxColor),
                    checkboxPosition: (props.checkOptionPosition || props.checkboxPosition),
                    showImage: props.showImage,
                    imageSize: props.imageSize,
                    circleImage: props.circleImage,
                    roundedImage: props.roundedImage,
                    modelValue: thisProps.multiple
                        ? fieldValue.value
                        : (fieldValue.value.length > 0 ? fieldValue.value[0] : undefined),
                    "onData-bind": (items: IBsModel[]) => emit("data-bind", items),
                    "onData-error": (error: unknown) => emit("data-error", error),
                    "onData-filter": (items: IBsModel[]) => emit("data-filter", items),
                    "onSelect": (item: IBsModel) => emit("select", item),
                    "onDeselect": (item: IBsModel) => emit("deselect", item),
                    "onUpdate:model-value": (values: string | number | string[] | number[] | undefined) => {
                        fieldValue.value = values === undefined ? [] : (Array.isArray(values) ? values : [<string>values]);
                        emit("update:model-value", values);
                    },
                    "onUpdate:selected-value": (values: IBsModel[]) => {
                        selectedItems.value = values;
                        emit("update:selected-value", values);
                    }
                }, {
                    optionItem: (args: unknown) => slots.optionItem && slots.optionItem(args),
                    emptyDataMsg: () => slots.emptyDataMsg && slots.emptyDataMsg(),
                    notFoundMsg: () => slots.notFoundMsg && slots.notFoundMsg(),
                })
            }),
        ]),
        (node: VNode) => useOnTextFieldNodeMounted(thisProps, node),
    );
}
