import { BsChip } from '@/components/Chip';
import {
    useCreateFieldActionIcon,
    useCreateFieldInnerWrapper,
    useCreateFieldWrapper,
    useCreateValidationIcon,
    useInputTextFieldAttrs,
    useMakeInputBaseAttrs,
} from '@/components/Field/mixins/textFieldApi';
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnTextFieldNodeMounted,
} from '@/components/Field/mixins/textFieldEventApi';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi';
import type { TBsChipField, TChipFieldOptionProps, TEmitFn, TIconVariant, TRecord } from '@/types';
import type { ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, Fragment, h, nextTick, toDisplayString } from 'vue';

function dispatchModelValue(
    props: Readonly<TChipFieldOptionProps>,
    emit: TEmitFn,
    inputValue: Ref<string>,
    localValue: Ref<string[]>
) {
    if (!props.disabled && !props.readonly) {
        inputValue.value !== '' && localValue.value.push(inputValue.value);

        if (Array.isArray(props.modelValue)) {
            emit('update:model-value', localValue.value);
        } else {
            emit('update:model-value', localValue.value.join(', '));
        }

        inputValue.value = '';
    }
}

function createFieldInput(
    props: Readonly<TChipFieldOptionProps>,
    emit: TEmitFn,
    inputValue: Ref<string>,
    localValue: Ref<string[]>,
    isFocused: Ref<boolean>,
    autocomplete: string | boolean
): VNode {
    return h('input', {
        ...useMakeInputBaseAttrs(props),
        ...useInputTextFieldAttrs(props, autocomplete),
        role: 'textbox',
        type: 'text',
        value: inputValue.value,
        onChange: (e: Event) => {
            inputValue.value = (<HTMLInputElement>e.target).value;
            dispatchModelValue(props, emit, inputValue, localValue);
        },
        onBlur: (e: Event) => {
            dispatchModelValue(props, emit, inputValue, localValue);
            nextTick().then(() => useOnFieldBlurred(emit, e, isFocused, <boolean>props.disabled));
        },
        onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, <boolean>props.disabled),
        onKeydown: (e: KeyboardEvent) => {
            if (e.key === 'Backspace' && (<HTMLInputElement>e.target).value === '') {
                localValue.value.length > 0 && localValue.value.pop();
                emit('keydown', e);
                nextTick().then(() => dispatchModelValue(props, emit, inputValue, localValue));
            } else if (e.key === 'Enter') {
                emit('keydown', e);
                nextTick().then(() => dispatchModelValue(props, emit, inputValue, localValue));
            } else {
                emit('keydown', e);
            }
        },
    });
}

function createFieldChips(
    props: Readonly<ExtractPropTypes<TBsChipField>>,
    emit: TEmitFn,
    localValue: Ref<string[]>
): VNode {
    if (localValue.value.length === 0) {
        return createCommentVNode(' v-if-chips ');
    }

    const thisProps = props as Readonly<TChipFieldOptionProps>;

    return h(
        Fragment,
        null,
        localValue.value.map((label) =>
            h(
                BsChip,
                {
                    key: label,
                    color: props.chipColor,
                    disabled: props.disabled,
                    pill: props.chipPill,
                    outlined: props.chipOutlined,
                    // @ts-ignore
                    dismissible: (thisProps.chipDeletable &&
                        !thisProps.readonly &&
                        !thisProps.disabled) as Prop<boolean>,
                    onClose: () => {
                        emit('delete-item', label);
                        nextTick().then(() => {
                            const result = localValue.value.filter((v) => v !== label);
                            if (Array.isArray(props.modelValue)) {
                                emit('update:model-value', result);
                            } else {
                                emit('update:model-value', result.join(', '));
                            }
                        });
                    },
                },
                {
                    default: () => toDisplayString(label),
                }
            )
        )
    );
}

export function useRenderChipField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsChipField>>,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    inputValue: Ref<string>,
    localValue: Ref<string[]>,
    isFocused: Ref<boolean>,
    autocomplete: string | boolean,
    showClearButton: ComputedRef<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasValidated: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>
): VNode {
    const thisProps = props as Readonly<TChipFieldOptionProps>;
    const valueAsArray = Array.isArray(props.modelValue);
    const iconSize = 24;

    return useCreateFieldWrapper(
        slots,
        iconSize,
        wrapperCss,
        thisProps,
        h(
            'div',
            {
                class: controlCss.value,
            },
            [
                useCreateFieldInnerWrapper(
                    slots,
                    thisProps,
                    [
                        createFieldChips(props, emit, localValue),
                        createFieldInput(
                            thisProps,
                            emit,
                            inputValue,
                            localValue,
                            isFocused,
                            autocomplete
                        ),
                    ],
                    iconSize,
                    thisProps.appendIcon,
                    thisProps.prependIcon,
                    useCreateValidationIcon(
                        thisProps.actionIconVariant as TIconVariant,
                        hasValidated.value,
                        hasError.value,
                        thisProps.validationIcon as boolean,
                        iconSize
                    ),
                    useCreateFieldActionIcon(
                        showClearButton.value,
                        thisProps.actionIconVariant as TIconVariant,
                        iconSize,
                        () => {
                            inputValue.value = '';
                            localValue.value = [];
                            emit('update:model-value', valueAsArray ? [] : '');
                            nextTick().then(() => emit('clear'));
                        }
                    )
                ),
                useRenderFieldFeedback(
                    slots,
                    thisProps,
                    showHelpText.value,
                    showValidationError.value,
                    hasError.value,
                    errorItems.value
                ),
            ]
        ),
        (node: VNode) => useOnTextFieldNodeMounted(thisProps, node)
    );
}
