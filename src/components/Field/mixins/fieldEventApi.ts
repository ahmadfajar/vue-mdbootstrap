import type {Ref, VNode} from "vue";
import {cssPrefix} from "../../../mixins/CommonApi";
import type {TEmitFn, TInputFieldProps} from "../../../types";
import Helper from "../../../utils/Helper";

export function useOnFieldBlurred(
    emit: TEmitFn,
    event: unknown,
    isFocused: Ref<boolean>,
    isDisabled: boolean,
): void {
    if (!isDisabled) {
        isFocused.value = false;
        emit("blur", event);
    }
}

export function useOnFieldFocused(
    emit: TEmitFn,
    event: unknown,
    isFocused: Ref<boolean>,
    isDisabled: boolean,
): void {
    if (!isDisabled) {
        isFocused.value = true;
        emit("focus", event);
    }
}

export function useOnFieldValueCleared<T>(
    emit: TEmitFn,
    localValue: Ref<T | undefined | null>,
): void {
    localValue.value = null;
    emit("clear");
    emit("update:modelValue", null);
}

export function useOnFieldValueUpdated<T>(
    emit: TEmitFn,
    localValue: Ref<T | undefined | null>,
    value: T | undefined | null,
): void {
    localValue.value = value;
    emit("update:modelValue", localValue.value);
}

export function useOnFieldNodeMounted(
    props: Readonly<TInputFieldProps>,
    node: VNode,
): void {
    const element = <HTMLElement>node.el;
    const fieldLabel = element.querySelector("." + cssPrefix + "field-label")
    let label;

    if (props.floatingLabel) {
        const children = fieldLabel?.children;
        if (children && children.length > 0) {
            label = fieldLabel.children[0];
            if (!Helper.isEmpty(label.classList) && !Helper.isEmpty(label.className)) {
                label.className = `${cssPrefix}empty-class`;
            }
        }
    }

    if (props.outlined) {
        const outlineLabel = element.querySelector("." + cssPrefix + "field-outline-label");
        if (outlineLabel && fieldLabel) {
            outlineLabel.innerHTML = fieldLabel.innerHTML;
        }
    }

    label = element.querySelector("label");
    if (label && !label.hasAttribute("for")) {
        label.setAttribute("for", <string>props.id);
    }
}
