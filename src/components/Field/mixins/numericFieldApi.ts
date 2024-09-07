import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, toDisplayString } from 'vue';
import { cssPrefix, useRenderTransition } from '../../../mixins/CommonApi';
import type {
    TBsIcon,
    TEmitFn,
    TIconVariant,
    TNumericFieldOptionProps,
    TNumericOpsOptions,
    TRecord,
    TSpaceAround,
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsRipple } from '../../Animation';
import { BsIcon } from '../../Icon';
import {
    useCreateFieldInnerWrapper,
    useCreateFieldWrapper,
    useCreateValidationIcon,
    useInputTextFieldAttrs,
    useMakeInputBaseAttrs,
} from './textFieldApi';
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldValueCleared,
    useOnFieldValueUpdated,
    useOnTextFieldNodeMounted,
} from './textFieldEventApi';
import { useRenderFieldFeedback } from './validationApi';

function createMinusButton(
    props: Readonly<TNumericFieldOptionProps>,
    clickHandler: () => void
): VNode {
    return h(
        'div',
        {
            class: [`${cssPrefix}btn-icon`, 'btn-sm'],
            onClick: clickHandler,
        },
        [
            h(
                BsRipple,
                {
                    // @ts-ignore
                    disabled: props.disabled as Prop<boolean>,
                    tag: 'span' as Prop<string>,
                },
                {
                    default: () =>
                        h(BsIcon, {
                            icon: (props.actionIconVariant === 'outlined'
                                ? `remove_circle_outline_${props.actionIconVariant}`
                                : `remove_circle_${props.actionIconVariant}`) as Prop<string>,
                            size: 24 as Prop<number>,
                        }),
                }
            ),
        ]
    );
}

function createPlusButton(
    props: Readonly<TNumericFieldOptionProps>,
    clickHandler: () => void
): VNode {
    return h(
        'div',
        {
            class: [`${cssPrefix}btn-icon`, 'btn-sm'],
            onClick: clickHandler,
        },
        [
            h(
                BsRipple,
                {
                    // @ts-ignore
                    disabled: props.disabled as Prop<boolean>,
                    tag: 'span' as Prop<string>,
                },
                {
                    default: () =>
                        h(BsIcon, {
                            icon: (props.actionIconVariant === 'outlined'
                                ? `add_circle_outline_${props.actionIconVariant}`
                                : `add_circle_${props.actionIconVariant}`) as Prop<string>,
                            size: 24 as Prop<number>,
                        }),
                }
            ),
        ]
    );
}

function createActionButtons(
    props: Readonly<TNumericFieldOptionProps>,
    position: TSpaceAround,
    incrementValueHandler: () => void,
    decrementValueHandler: () => void
): VNode {
    const children = [];

    if (position === 'left' && props.actionButtonPlacement === 'both') {
        children.push(createMinusButton(props, decrementValueHandler));
    } else if (position === 'right' && props.actionButtonPlacement === 'both') {
        children.push(createPlusButton(props, incrementValueHandler));
    } else {
        children.push(
            createMinusButton(props, decrementValueHandler),
            createPlusButton(props, incrementValueHandler)
        );
    }

    return h(
        'div',
        {
            class: [`${cssPrefix}action-button-${position}`],
        },
        children
    );
}

function createSpinnerButton(
    props: Readonly<TNumericFieldOptionProps>,
    incrementValueHandler: () => void,
    decrementValueHandler: () => void
): VNode {
    return h(
        'div',
        {
            class: [`${cssPrefix}spin-button-${props.spinButtonPlacement}`],
        },
        [
            h(
                'div',
                {
                    class: ['btn', `${cssPrefix}spin-up`],
                    onClick: incrementValueHandler,
                },
                [
                    h(
                        BsRipple,
                        {
                            // @ts-ignore
                            disabled: props.disabled as Prop<boolean>,
                            tag: 'span' as Prop<string>,
                        },
                        {
                            default: () =>
                                h('div', {
                                    class: 'triangle-up',
                                }),
                        }
                    ),
                ]
            ),
            h(
                'div',
                {
                    class: ['btn', `${cssPrefix}spin-down`],
                    onClick: decrementValueHandler,
                },
                [
                    h(
                        BsRipple,
                        {
                            // @ts-ignore
                            disabled: props.disabled as Prop<boolean>,
                            tag: 'span' as Prop<string>,
                        },
                        {
                            default: () =>
                                h('div', {
                                    class: 'triangle-down',
                                }),
                        }
                    ),
                ]
            ),
        ]
    );
}

function createAppendFieldActionNode(
    props: Readonly<TNumericFieldOptionProps>,
    showClearButton: boolean,
    hasValidated: boolean,
    hasError: boolean,
    iconSize: number,
    clearHandler: () => void,
    incrementValueHandler: () => void,
    decrementValueHandler: () => void
): VNode {
    return useRenderTransition(
        { name: 'fade' },
        showClearButton ||
            hasValidated ||
            hasError ||
            (props.spinButton && props.spinButtonPlacement === 'right') ||
            (props.actionButton &&
                ['right', 'both'].includes(props.actionButtonPlacement as string))
            ? h(
                  'div',
                  {
                      class: `${cssPrefix}action-icon`,
                  },
                  [
                      showClearButton
                          ? h<TBsIcon>(BsIcon, {
                                class: 'icon-clear',
                                icon: `cancel_${props.actionIconVariant}` as Prop<string>,
                                size: iconSize as Prop<number | undefined>,
                                onClick: clearHandler,
                            })
                          : undefined,
                      !props.disabled &&
                      !props.readonly &&
                      props.spinButton &&
                      props.spinButtonPlacement === 'right'
                          ? createSpinnerButton(props, incrementValueHandler, decrementValueHandler)
                          : !props.disabled &&
                              !props.readonly &&
                              props.actionButton &&
                              ['right', 'both'].includes(props.actionButtonPlacement as string)
                            ? createActionButtons(
                                  props,
                                  'right',
                                  incrementValueHandler,
                                  decrementValueHandler
                              )
                            : '',
                  ]
              )
            : createCommentVNode(' v-if-action-icon ')
    );
}

function createPrependFieldActionNode(
    props: Readonly<TNumericFieldOptionProps>,
    incrementValueHandler: () => void,
    decrementValueHandler: () => void
): VNode {
    if (
        !props.disabled &&
        !props.readonly &&
        props.spinButton &&
        props.spinButtonPlacement === 'left'
    ) {
        return h(
            'div',
            {
                class: `${cssPrefix}action-icon`,
            },
            [createSpinnerButton(props, incrementValueHandler, decrementValueHandler)]
        );
    } else if (
        !props.disabled &&
        !props.readonly &&
        !props.spinButton &&
        props.actionButton &&
        ['left', 'both'].includes(props.actionButtonPlacement as string)
    ) {
        return h(
            'div',
            {
                class: [
                    `${cssPrefix}action-icon`,
                    `${cssPrefix}button-wrapper-${props.actionButtonPlacement}`,
                ],
            },
            [createActionButtons(props, 'left', incrementValueHandler, decrementValueHandler)]
        );
    }

    return createCommentVNode(' v-if-action-button ');
}

function createNumericInputField(
    props: Readonly<TNumericFieldOptionProps>,
    numericOptions: TNumericOpsOptions,
    formatOptions: Intl.NumberFormatOptions,
    inputRef: Ref<HTMLElement | null>,
    localValue: Ref<number | null | undefined>,
    hasFocus: Ref<boolean>,
    autocomplete: string | boolean,
    emit: TEmitFn
): VNode[] {
    let displayValue =
        hasFocus.value && !props.disabled && !props.readonly
            ? localValue.value?.toString(10)
            : localValue.value?.toLocaleString(numericOptions.locale, formatOptions);

    return [
        props.prefix && (hasFocus.value || localValue.value)
            ? h('div', { class: `${cssPrefix}field-prefix` }, toDisplayString(props.prefix))
            : createCommentVNode(' v-if-prefix '),
        h('input', {
            ...useMakeInputBaseAttrs(props),
            ...useInputTextFieldAttrs(props, autocomplete),
            ref: inputRef,
            role: 'textbox',
            type: 'text',
            value: displayValue,
            onBlur: (e: Event) => useOnFieldBlurred(emit, e, hasFocus, props.disabled as boolean),
            onChange: () => {
                const field = inputRef.value as HTMLInputElement;
                if (field.value == null || field.value === '') {
                    useOnFieldValueUpdated(emit, localValue, null);
                    displayValue = '';
                } else {
                    const result = parseFloat(field.value);
                    if (
                        isGreaterOrEqualMinValue(result, numericOptions) &&
                        isLessOrEqualMaxValue(result, numericOptions)
                    ) {
                        useOnFieldValueUpdated(emit, localValue, result);
                        displayValue = result.toLocaleString(numericOptions.locale, formatOptions);
                    }
                }
            },
            onFocus: (e: Event) => {
                if (!props.disabled && !props.readonly) {
                    displayValue = localValue.value?.toString();
                }
                useOnFieldFocused(emit, e, hasFocus, props.disabled as boolean);
            },
            onKeydown: (e: KeyboardEvent) => {
                const incrementKey = ['Up', 'ArrowUp'];
                const decrementKey = ['Down', 'ArrowDown'];
                const specialKey = [
                    'Left',
                    'ArrowLeft',
                    'Right',
                    'ArrowRight',
                    'Esc',
                    'Escape',
                    'End',
                    'Tab',
                    'Enter',
                    'Home',
                    'PageDown',
                    'PageUp',
                    'Backspace',
                    'Clear',
                    'Delete',
                    'Copy',
                    'Cut',
                    'EraseEof',
                ];

                if (specialKey.includes(e.key)) {
                    emit('keydown', e);
                } else if (/^-?\d*[.]?\d*$/.test(e.key)) {
                    emit('keydown', e);
                } else if (incrementKey.includes(e.key) && !props.disabled && !props.readonly) {
                    incrementValue(props, numericOptions, localValue, emit);
                } else if (decrementKey.includes(e.key) && !props.disabled && !props.readonly) {
                    decrementValue(props, numericOptions, localValue, emit);
                } else {
                    e.preventDefault();
                }
            },
        }),
        props.suffix && (hasFocus.value || localValue.value)
            ? h('div', { class: `${cssPrefix}field-suffix` }, toDisplayString(props.suffix))
            : createCommentVNode(' v-if-suffix '),
    ];
}

export function useRenderNumericField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TNumericFieldOptionProps>,
    operationOptions: TNumericOpsOptions,
    formatOptions: Intl.NumberFormatOptions,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    localValue: Ref<number | null | undefined>,
    inputRef: Ref<HTMLElement | null>,
    hasFocus: Ref<boolean>,
    autocomplete: string | boolean,
    showClearButton: ComputedRef<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasValidated: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>
): VNode {
    const iconSize = 24;

    return useCreateFieldWrapper(
        slots,
        iconSize,
        wrapperCss,
        props,
        h(
            'div',
            {
                class: controlCss.value,
            },
            [
                useCreateFieldInnerWrapper(
                    slots,
                    props,
                    createNumericInputField(
                        props,
                        operationOptions,
                        formatOptions,
                        inputRef,
                        localValue,
                        hasFocus,
                        autocomplete,
                        emit
                    ),
                    iconSize,
                    props.appendIcon,
                    props.prependIcon,
                    useCreateValidationIcon(
                        props.actionIconVariant as TIconVariant,
                        hasValidated.value,
                        hasError.value,
                        props.validationIcon as boolean,
                        iconSize
                    ),
                    createAppendFieldActionNode(
                        props,
                        showClearButton.value,
                        hasValidated.value,
                        hasError.value,
                        iconSize,
                        () => useOnFieldValueCleared(emit, localValue),
                        () => incrementValue(props, operationOptions, localValue, emit),
                        () => decrementValue(props, operationOptions, localValue, emit)
                    ),
                    createPrependFieldActionNode(
                        props,
                        () => incrementValue(props, operationOptions, localValue, emit),
                        () => decrementValue(props, operationOptions, localValue, emit)
                    )
                ),
                useRenderFieldFeedback(
                    slots,
                    props,
                    showHelpText.value,
                    showValidationError.value,
                    hasError.value,
                    errorItems.value
                ),
            ]
        ),
        (node: VNode) => useOnTextFieldNodeMounted(props, node)
    );
}

function decrementValue(
    props: Readonly<TNumericFieldOptionProps>,
    options: TNumericOpsOptions,
    localValue: Ref<number | null | undefined>,
    emit: TEmitFn
): void {
    if (!props.disabled && !props.readonly) {
        let result = (localValue.value || 0.0) - options.step;
        if (parseInt(props.maxFraction as string) === 0) {
            result = Math.round(result);
        }

        if (isGreaterOrEqualMinValue(result, options) && isLessOrEqualMaxValue(result, options)) {
            useOnFieldValueUpdated(emit, localValue, result);
        }
    }
}

function incrementValue(
    props: Readonly<TNumericFieldOptionProps>,
    options: TNumericOpsOptions,
    localValue: Ref<number | null | undefined>,
    emit: TEmitFn
): void {
    if (!props.disabled && !props.readonly) {
        let result = (localValue.value ?? 0.0) + options.step;
        if (parseInt(props.maxFraction as string) === 0) {
            result = Math.round(result);
        }

        if (isGreaterOrEqualMinValue(result, options) && isLessOrEqualMaxValue(result, options)) {
            useOnFieldValueUpdated(emit, localValue, result);
        }
    }
}

function isLessOrEqualMaxValue(value: number, options: TNumericOpsOptions): boolean {
    return !Helper.isNumber(options.maxValue) ? true : value <= options.maxValue;
}

function isGreaterOrEqualMinValue(value: number, options: TNumericOpsOptions): boolean {
    return !Helper.isNumber(options.minValue) ? true : value >= options.minValue;
}
