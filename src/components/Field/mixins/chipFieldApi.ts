import type {ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode} from "vue";
import {createCommentVNode, createTextVNode, h, nextTick} from "vue";
import type {TBsChipField, TChipFieldOptionProps, TEmitFn, TRecord, TShapeStyle} from "../../../types";
import {useMakeInputBaseAttrs} from "../../Radio/mixins/radioApi";
import {useRenderFieldFeedback} from "../../Radio/mixins/validationApi";
import {
    useCreateFieldActionIcon,
    useCreateFieldInnerWrapper,
    useCreateFieldWrapper,
    useCreateTextFieldClasses,
    useInputTextFieldAttrs
} from "./textFieldApi";
import {useOnFieldBlurred, useOnFieldFocused, useOnTextFieldNodeMounted} from "./textFieldEventApi";
import {BsChip} from "../../Chip";
import Helper from "../../../utils/Helper";


function dispatchModelValue(
    props: Readonly<TChipFieldOptionProps>,
    emit: TEmitFn,
    inputValue: Ref<string>,
    localValue: Ref<string[]>,
) {
    if (!props.disabled && !props.readonly) {
        inputValue.value !== "" && localValue.value.push(inputValue.value);

        if (Array.isArray(props.modelValue)) {
            emit("update:model-value", localValue.value);
        } else {
            emit("update:model-value", localValue.value.join(", "));
        }

        inputValue.value = "";
    }
}

function createFieldInput(
    props: Readonly<TChipFieldOptionProps>,
    emit: TEmitFn,
    inputValue: Ref<string>,
    localValue: Ref<string[]>,
    isFocused: Ref<boolean>,
    autocomplete: string | boolean,
): VNode {
    return h("input", {
        ...useMakeInputBaseAttrs(props),
        ...useInputTextFieldAttrs(props, autocomplete),
        role: "textbox",
        type: "text",
        value: inputValue.value,
        onChange: (e: Event) => {
            inputValue.value = (<HTMLInputElement>e.target).value;
            dispatchModelValue(props, emit, inputValue, localValue);
        },
        onBlur: (e: Event) => {
            dispatchModelValue(props, emit, inputValue, localValue);
            nextTick().then(() =>
                useOnFieldBlurred(emit, e, isFocused, (<boolean>props.disabled))
            );
        },
        onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, (<boolean>props.disabled)),
        onKeydown: (e: KeyboardEvent) => {
            if (e.key === "Backspace" && (<HTMLInputElement>e.target).value === "") {
                localValue.value.length > 0 && localValue.value.pop();
                emit("keydown", e);
                nextTick().then(() => dispatchModelValue(props, emit, inputValue, localValue));
            } else if (e.key === "Enter") {
                emit("keydown", e);
                nextTick().then(() => dispatchModelValue(props, emit, inputValue, localValue));
            } else {
                emit("keydown", e);
            }
        },
    });
}

function createFieldChips(
    props: Readonly<ExtractPropTypes<TBsChipField>>,
    emit: TEmitFn,
    inputValue: Ref<string>,
    localValue: Ref<string[]>,
): VNode[] {
    const thisProps = props as Readonly<TChipFieldOptionProps>;

    if (localValue.value.length === 0) {
        return [createCommentVNode(" v-if-chips ")];
    }
    const arrayCopy = Array.from(localValue.value);
    // console.info("arrayCopy:", arrayCopy);

    return arrayCopy.map(
        label => h(BsChip, {
            color: props.chipColor,
            disabled: props.disabled,
            pill: props.chipPill,
            outlined: props.chipOutlined,
            // @ts-ignore
            dismissible: <Prop<boolean>>(thisProps.chipDeletable && !thisProps.readonly && !thisProps.disabled),
            onClose: () => {
                // const tempVal = inputValue.value;
                // inputValue.value = "";
                emit("delete-item", label);

                nextTick().then(() => {
                    const result = localValue.value.filter(v => v !== label);
                    if (Array.isArray(props.modelValue)) {
                        emit("update:model-value", result);
                    } else {
                        emit("update:model-value", result.join(", "));
                    }
                    // dispatchModelValue(thisProps, emit, inputValue, localValue);
                    // inputValue.value = tempVal;
                    // Helper.defer(() => {
                    //     localValue.value = localValue.value.filter(v => v !== label);
                    //     dispatchModelValue(thisProps, emit, inputValue, localValue);
                    //     inputValue.value = tempVal;
                    // }, 300);
                });
            },
        }, {
            default: () => createTextVNode(label)
        })
    );
}

export function useRenderChipField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsChipField>>,
    wrapperCss: ComputedRef<TRecord>,
    inputValue: Ref<string>,
    localValue: Ref<string[]>,
    isFocused: Ref<boolean>,
    autocomplete: string | boolean,
    iconSize: number,
    showClearButton: Ref<boolean>,
    showHelpText: Ref<boolean>,
    showValidationError: Ref<boolean>,
    hasValidated: Ref<boolean>,
    hasError: Ref<boolean>,
    errorItems: ComputedRef<string[]>,
): VNode {
    const thisProps = props as Readonly<TChipFieldOptionProps>;
    const showAppendIcon = (slots.appendInner !== undefined)
        || !Helper.isEmpty(props.appendIcon) || showClearButton.value;
    const valueAsArray = Array.isArray(props.modelValue);

    return useCreateFieldWrapper(
        slots, iconSize, wrapperCss, thisProps,
        h("div", {
            class: useCreateTextFieldClasses(
                slots, thisProps, localValue, isFocused, showAppendIcon,
            ),
        }, [
            useCreateFieldInnerWrapper(
                slots, thisProps, iconSize,
                useCreateFieldActionIcon(
                    showClearButton.value,
                    hasValidated.value,
                    hasError.value,
                    (<TShapeStyle>thisProps.actionIconVariant),
                    iconSize,
                    () => {
                        inputValue.value = "";
                        localValue.value = [];
                        emit("update:model-value", valueAsArray ? [] : "");
                        nextTick().then(() => emit("clear"));
                    },
                ), createFieldChips(props, emit, inputValue, localValue).concat([
                    createFieldInput(thisProps, emit, inputValue, localValue, isFocused, autocomplete)
                ]),
            ),
            useRenderFieldFeedback(
                slots, thisProps,
                showHelpText.value,
                showValidationError.value,
                hasError.value,
                errorItems.value,
            ),
        ]),
        (node: VNode) => useOnTextFieldNodeMounted(thisProps, node)
    );
}
