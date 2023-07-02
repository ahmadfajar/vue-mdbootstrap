import type { ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, mergeProps, vModelText, withDirectives } from 'vue';
import { cssPrefix } from '../../../mixins/CommonApi';
import type {
    TBsSearchField,
    TButtonMode,
    TButtonSize,
    TEmitFn,
    TRecord,
    TSearchFieldOptionProps
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsButton } from '../../Button';
import { BsPopover } from '../../Popover';
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldValueCleared,
    useOnFieldValueUpdated
} from './textFieldEventApi';

export function useSearchFieldClasses(
    props: Readonly<TSearchFieldOptionProps>,
    isFocused: Ref<boolean>,
): TRecord {
    return {
        [`${cssPrefix}searchbox-inner`]: true,
        [`${cssPrefix}searchbox-dark`]: props.darkMode === true,
        'disabled': props.disabled === true,
        'readonly': props.readonly === true,
        'focused': isFocused.value,
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

    return h('div', {
        class: [`${cssPrefix}field-searchbox`]
    }, [
        h('div', mergeProps({
            ref: activator,
            class: cssClasses.value,
        }, attrs), [
            h(BsButton, {
                color: (thisProps.darkMode ? 'grey' : 'secondary') as Prop<string>,
                icon: 'search' as Prop<string>,
                mode: 'icon' as Prop<TButtonMode>,
                size: 'sm' as Prop<TButtonSize>,
                // @ts-ignore
                flat: true as Prop<boolean>,
                onClick: () => {
                    !thisProps.readonly && !thisProps.disabled && dispatchSearch(localValue, emit);
                }
            }),
            h('label', withDirectives(
                h('input', {
                    'type': 'text',
                    'role': 'searchbox',
                    'spellcheck': 'false',
                    'autocomplete': 'false',
                    'id': thisProps.id,
                    'name': thisProps.name,
                    'value': localValue.value,
                    'disabled': thisProps.disabled,
                    'readonly': thisProps.readonly,
                    'autofocus': thisProps.autofocus,
                    'placeholder': thisProps.placeholder,
                    'minlength': thisProps.minlength,
                    'aria-disabled': thisProps.disabled,
                    'aria-readonly': thisProps.readonly,
                    'aria-placeholder': thisProps.placeholder,
                    'onUpdate:modelValue': (value: string) => {
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
                    ? h(BsButton, {
                        color: (thisProps.darkMode ? 'grey' : 'secondary') as Prop<string>,
                        icon: 'clear' as Prop<string>,
                        mode: 'icon' as Prop<TButtonMode>,
                        size: 'sm' as Prop<TButtonSize>,
                        // @ts-ignore
                        flat: true as Prop<boolean>,
                        onClick: () => {
                            !thisProps.readonly && !thisProps.disabled &&
                            useOnFieldValueCleared(emit, localValue);
                        }
                    })
                    : ''
            ),
            (
                thisProps.advanceSearch
                    ? h(BsButton, {
                        color: (thisProps.darkMode ? 'grey' : 'secondary') as Prop<string>,
                        icon: 'arrow_drop_down' as Prop<string>,
                        mode: 'icon' as Prop<TButtonMode>,
                        size: 'sm' as Prop<TButtonSize>,
                        // @ts-ignore
                        flat: true as Prop<boolean>,
                        onClick: () => {
                            if (!thisProps.readonly && !thisProps.disabled) {
                                const open = isPopoverOpen.value;
                                isPopoverOpen.value = !open;
                                emit(isPopoverOpen.value ? 'open' : 'close');
                            }
                        }
                    })
                    : ''
            ),
        ]),
        (
            (thisProps.advanceSearch === true && activator.value)
                ? h(BsPopover, {
                    space: 2 as Prop<number>,
                    color: null,
                    class: props.popoverCls,
                    placement: props.popoverPlacement,
                    transition: props.popoverTransition,
                    // @ts-ignore
                    open: isPopoverOpen.value as Prop<boolean>,
                    trigger: activator.value as Prop<HTMLElement>,
                    style: {
                        minWidth: Helper.cssUnit(popoverWidth(thisProps, activator))
                    },
                    'onUpdate:open': (value: boolean) => {
                        isPopoverOpen.value = value;
                        emit(value ? 'open' : 'close');
                    },
                }, {
                    default: () => slots.popover && slots.popover()
                })
                : createCommentVNode(' v-if-advanceSearch ')
        ),
    ])
}

function popoverWidth(
    props: Readonly<TSearchFieldOptionProps>,
    activator: Ref<HTMLElement | null>,
): number {
    const width = Helper.parseIntLoose(<string>props.popoverMinWidth) ?? 0;

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
        emit('search', localValue.value);
    }
}
