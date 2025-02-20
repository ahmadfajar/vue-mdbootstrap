import { cssPrefix } from '@/mixins/CommonApi';
import type { TEmitFn, TInputFieldProps, TInputTextProps } from '@/types';
import Helper from '@/utils/Helper';
import type { Ref, VNode } from 'vue';
import { nextTick } from 'vue';

export function useOnFieldBlurred(
    emit: TEmitFn,
    event: Event,
    isFocused: Ref<boolean>,
    isDisabled: boolean
): void {
    if (!isDisabled) {
        isFocused.value = false;
        emit('blur', event);
    } else {
        event.preventDefault();
    }
}

export function useOnFieldFocused(
    emit: TEmitFn,
    event: Event,
    isFocused: Ref<boolean>,
    isDisabled: boolean
): void {
    if (!isDisabled) {
        isFocused.value = true;
        emit('focus', event);
    } else {
        event.preventDefault();
    }
}

export function useOnFieldValueCleared<T>(
    emit: TEmitFn,
    localValue: Ref<T | undefined | null>
): void {
    localValue.value = null;
    emit('update:model-value', null);
    nextTick().then(() => emit('clear'));
}

export function useOnFieldValueUpdated<T>(
    emit: TEmitFn,
    localValue: Ref<T | undefined | null>,
    value: T | undefined | null
): void {
    localValue.value = value;
    emit('update:model-value', localValue.value);
}

export function useOnFieldNodeMounted(props: Readonly<TInputFieldProps>, node: VNode): void {
    const element = node.el as HTMLElement;
    const fieldLabel = element.querySelector('.' + cssPrefix + 'field-label');
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
        const outlineLabel = element.querySelector('.' + cssPrefix + 'field-outline-label');
        if (outlineLabel && fieldLabel) {
            outlineLabel.innerHTML = fieldLabel.innerHTML;
        }
    }

    label = element.querySelector('label');
    if (label && !label.hasAttribute('for')) {
        label.setAttribute('for', props.id as string);
    }
}

export function useOnTextFieldNodeMounted(props: Readonly<TInputTextProps>, node: VNode): void {
    useOnFieldNodeMounted(props, node);
    const element = node.el as HTMLElement;

    if (props.autofocus) {
        nextTick().then(() => {
            const input = element.querySelector('input');
            input?.focus();
        });
    }
}
