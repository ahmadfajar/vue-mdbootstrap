import type {ComputedRef, ExtractPropTypes, Ref, Slots, VNode} from "vue";
import {createCommentVNode, h, mergeProps, vModelText, withDirectives} from "vue";
import type {TBsSearchField, TEmitFn, TRecord, TSearchFieldOptionProps} from "../../../types";
import {cssPrefix} from "../../../mixins/CommonApi";
import {BsButton} from "../../Button";
import {BsPopover} from "../../Popover";
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldValueCleared,
    useOnFieldValueUpdated
} from "./textFieldEventApi";
import Helper from "../../../utils/Helper";

export function useSearchFieldClasses(
    props: Readonly<TSearchFieldOptionProps>,
    isFocused: Ref<boolean>,
): TRecord {
    return {
        [`${cssPrefix}searchbox-inner`]: true,
        [`${cssPrefix}searchbox-dark`]: props.darkMode === true,
        "disabled": props.disabled === true,
        "readonly": props.readonly === true,
        "focused": isFocused.value,
    }
}

export function useRenderSearchField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsSearchField>>,
    attrs: TRecord,
    cssClasses: ComputedRef<TRecord>,
    activator: Ref<HTMLElement | null>,
    localValue: Ref<string | undefined>,
    isFocused: Ref<boolean>,
    isPopoverOpen: Ref<boolean>,
): VNode {
    const thisProps = props as Readonly<TSearchFieldOptionProps>;

    return h("div", {
        class: [`${cssPrefix}field-searchbox`]
    }, [
        h("div", mergeProps({
            ref: activator,
            class: cssClasses.value,
        }, attrs), [
            // @ts-ignore
            h(BsButton, {
                color: thisProps.darkMode ? "grey" : "secondary",
                icon: "search",
                mode: "icon",
                size: "sm",
                flat: true,
                onClick: () => {
                    !thisProps.readonly && !thisProps.disabled && dispatchSearch(localValue, emit);
                }
            }),
            h("label", withDirectives(
                h("input", {
                    "type": "text",
                    "role": "searchbox",
                    "spellcheck": "false",
                    "autocomplete": "false",
                    "id": thisProps.id,
                    "name": thisProps.name,
                    "value": localValue.value,
                    "disabled": thisProps.disabled,
                    "readonly": thisProps.readonly,
                    "autofocus": thisProps.autofocus,
                    "placeholder": thisProps.placeholder,
                    "minlength": thisProps.minlength,
                    "aria-disabled": thisProps.disabled,
                    "aria-readonly": thisProps.readonly,
                    "aria-placeholder": thisProps.placeholder,
                    "onUpdate:modelValue": (value: string) => {
                        useOnFieldValueUpdated(emit, localValue, value);
                        if (value.length >= <number>thisProps.minlength) {
                            dispatchSearch(localValue, emit);
                        }
                    },
                    onBlur: (e: Event) =>
                        useOnFieldBlurred(emit, e, isFocused, (<boolean>thisProps.disabled)),
                    onFocus: (e: Event) =>
                        useOnFieldFocused(emit, e, isFocused, (<boolean>thisProps.disabled)),
                }), [
                    [vModelText, localValue.value]
                ])
            ),
            (
                !Helper.isEmpty(localValue.value)
                    // @ts-ignore
                    ? h(BsButton, {
                        color: thisProps.darkMode ? "grey" : "secondary",
                        icon: "clear",
                        mode: "icon",
                        size: "sm",
                        flat: true,
                        onClick: () => {
                            !thisProps.readonly && !thisProps.disabled &&
                            useOnFieldValueCleared(emit, localValue);
                        }
                    })
                    : ""
            ),
            (
                thisProps.advanceSearch
                    // @ts-ignore
                    ? h(BsButton, {
                        color: thisProps.darkMode ? "grey" : "secondary",
                        icon: "arrow_drop_down",
                        mode: "icon",
                        size: "sm",
                        flat: true,
                        onClick: () => {
                            if (!thisProps.readonly && !thisProps.disabled) {
                                const open = isPopoverOpen.value;
                                isPopoverOpen.value = !open;
                                emit(isPopoverOpen.value ? "open" : "close");
                            }
                        }
                    })
                    : ""
            ),
        ]),
        (
            (thisProps.advanceSearch === true && activator.value)
                // @ts-ignore
                ? h(BsPopover, {
                    space: 2,
                    color: null,
                    class: props.popoverCls,
                    placement: props.popoverPlacement,
                    transition: props.popoverTransition,
                    open: isPopoverOpen.value,
                    trigger: activator.value,
                    style: {
                        minWidth: Helper.cssUnit(popoverWidth(thisProps, activator))
                    },
                    "onUpdate:open": (value: boolean) => {
                        isPopoverOpen.value = value;
                        emit(value ? "open" : "close");
                    },
                }, {
                    default: () => slots.popover && slots.popover()
                })
                : createCommentVNode(" v-if-advanceSearch ")
        ),
    ])
}

function popoverWidth(
    props: Readonly<TSearchFieldOptionProps>,
    activator: Ref<HTMLElement | null>,
): number {
    const width = Helper.parseIntLoose(<string>props.popoverMinWidth) || 0;

    if (activator.value && (width < activator.value?.offsetWidth)) {
        return activator.value?.offsetWidth;
    }

    return width;
}

function dispatchSearch(
    localValue: Ref<string | undefined>,
    emit: TEmitFn,
) {
    if (!Helper.isEmpty(localValue.value)) {
        emit("search", localValue.value);
    }
}
