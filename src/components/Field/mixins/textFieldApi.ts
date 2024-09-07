import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, nextTick, toDisplayString, vModelText, withDirectives } from 'vue';
import {
    cssPrefix,
    useRenderSlotWithWrapper,
    useRenderSlotWrapperWithCondition,
    useRenderTransition,
} from '../../../mixins/CommonApi';
import type {
    TBsIcon,
    TBsToggleIcon,
    TEmitFn,
    TIconVariant,
    TInputBaseProps,
    TInputFieldProps,
    TInputTextProps,
    TRecord,
    TTextAreaOptionProps,
    TTextFieldOptionProps,
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsIcon, BsToggleIcon } from '../../Icon';
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldNodeMounted,
    useOnFieldValueCleared,
    useOnFieldValueUpdated,
    useOnTextFieldNodeMounted,
} from './textFieldEventApi';
import { useRenderFieldFeedback } from './validationApi';

export function useFieldWrapperClasses(
    props: Readonly<TInputFieldProps>,
    hasValidated: boolean,
    hasError: boolean
): TRecord {
    return {
        [`${cssPrefix}field row`]: true,
        [`${cssPrefix}field-filled`]: props.filled,
        [`${cssPrefix}field-outlined`]: props.outlined && !props.filled,
        [`${cssPrefix}field-flat`]: props.flat && !props.filled && !props.outlined,
        required: props.required,
        readonly: props.readonly,
        disabled: props.disabled,
        'has-error': hasError,
        'has-success': hasValidated && !hasError,
    };
}

export function useInputTextFieldAttrs(
    props: Readonly<TInputTextProps>,
    autocomplete: string | boolean
): TRecord {
    const showPlaceHolder = !Helper.isEmpty(props.placeholder); // && !props.readonly && !props.disabled;

    return {
        autocomplete: autocomplete,
        placeholder: showPlaceHolder ? props.placeholder : undefined,
        'aria-disabled': props.disabled,
        'aria-required': props.required,
        'aria-readonly': props.readonly,
        'aria-placeholder': showPlaceHolder ? props.placeholder : undefined,
    };
}

function createFieldIcon(
    slots: Slots,
    slotName: string,
    cssClass: string,
    iconName?: string,
    iconSize?: number,
    onClickHandler?: EventListener
): VNode {
    return useRenderSlotWithWrapper(
        slots,
        slotName,
        iconName ? `${slotName}-${iconName}` : Helper.uuid(),
        {
            class: cssClass,
            onClick: onClickHandler,
        },
        iconName
            ? h<TBsIcon>(BsIcon, {
                  icon: iconName as Prop<string>,
                  size: iconSize as Prop<number | undefined>,
              })
            : undefined
    );
}

export function useCreateFieldWrapper(
    slots: Slots,
    iconSize: number,
    cssClass: ComputedRef<TRecord>,
    props: Readonly<TInputFieldProps>,
    fieldElement: VNode,
    nodeMountedHandler?: (node: VNode) => void,
    wrapperID?: string
): VNode {
    return h(
        'div',
        {
            id: wrapperID,
            class: cssClass.value,
            onVnodeMounted: nodeMountedHandler,
            onVnodeUpdated: (node: VNode) => useOnFieldNodeMounted(props, node),
        },
        [
            !props.floatingLabel && slots.default && slots.default({ id: props.id }),
            h(
                'div',
                {
                    class: `${cssPrefix}field-wrapper col`,
                },
                [
                    createFieldIcon(
                        slots,
                        'prepend-outer',
                        `${cssPrefix}prepend-outer`,
                        props.prependIconOuter,
                        iconSize
                    ),
                    fieldElement,
                    createFieldIcon(
                        slots,
                        'append-outer',
                        `${cssPrefix}append-outer`,
                        props.appendIconOuter,
                        iconSize
                    ),
                ]
            ),
        ]
    );
}

function createOutlineWrapper(props: Readonly<TInputFieldProps>): VNode {
    return props.outlined && !props.filled
        ? h(
              'div',
              {
                  class: `${cssPrefix}field-outline-control`,
                  'aria-hidden': 'true',
              },
              [
                  h('div', { class: `${cssPrefix}field-outline-start` }),
                  h('div', { class: `${cssPrefix}field-outline-label` }),
                  h('div', { class: `${cssPrefix}field-outline-end` }),
              ]
          )
        : createCommentVNode(' v-if-outlined ');
}

export function useCreateFieldInnerWrapper(
    slots: Slots,
    props: Readonly<TInputFieldProps>,
    inputFieldNodes: VNode[] | VNode,
    iconSize: number,
    appendIcon?: string,
    prependIcon?: string,
    validationIconNode?: VNode,
    appendActionNode?: VNode,
    prependActionNode?: VNode,
    innerProps?: TRecord,
    activatorProps?: TRecord,
    onAppendIconClick?: EventListener,
    onPrependIconClick?: EventListener
): VNode {
    const children = [
        useRenderSlotWrapperWithCondition(
            slots,
            'default',
            props.floatingLabel === true,
            {
                class: `${cssPrefix}field-label`,
            },
            'div',
            { id: props.id }
        ),
    ].concat(Array.isArray(inputFieldNodes) ? inputFieldNodes : [inputFieldNodes]);

    return h(
        'div',
        {
            class: `${cssPrefix}field-inner`,
            ...innerProps,
        },
        [
            h('div', { class: `${cssPrefix}field-overlay` }),
            createFieldIcon(
                slots,
                'prepend-inner',
                `${cssPrefix}prepend-inner`,
                prependIcon,
                iconSize,
                onPrependIconClick
            ),
            prependActionNode,
            h(
                'div',
                {
                    class: `${cssPrefix}field-activator`,
                    ...activatorProps,
                },
                children
            ),
            appendActionNode,
            createFieldIcon(
                slots,
                'append-inner',
                `${cssPrefix}append-inner`,
                appendIcon,
                iconSize,
                onAppendIconClick
            ),
            validationIconNode,
            createOutlineWrapper(props),
        ]
    );
}

export function useCreateFieldActionIcon(
    showClearButton: boolean,
    iconVariant: TIconVariant,
    iconSize?: number,
    clearHandler?: EventListener,
    showPasswordToggle?: boolean,
    passwordToggled?: Ref<boolean>,
    passwordToggleHandler?: (value: boolean) => void
): VNode {
    return useRenderTransition(
        { name: 'fade' },
        showClearButton || showPasswordToggle
            ? h('div', { class: `${cssPrefix}action-icon` }, [
                  showClearButton
                      ? h<TBsIcon>(BsIcon, {
                            class: 'icon-clear',
                            icon: `cancel_${iconVariant}` as Prop<string>,
                            size: iconSize as Prop<number | undefined>,
                            onClick: clearHandler,
                        })
                      : undefined,
                  showPasswordToggle
                      ? h<TBsToggleIcon>(BsToggleIcon, {
                            icon: `visibility_${iconVariant}` as Prop<string>,
                            toggleIcon: `visibility_off_${iconVariant}` as Prop<string>,
                            size: iconSize as Prop<number | undefined>,
                            // @ts-ignore
                            modelValue: passwordToggled?.value as Prop<boolean | undefined>,
                            'onUpdate:model-value': passwordToggleHandler,
                        })
                      : undefined,
              ])
            : createCommentVNode(' v-if-action-icon ')
    );
}

export function useCreateValidationIcon(
    iconVariant: TIconVariant,
    hasValidated: boolean,
    hasError: boolean,
    showIcon: boolean,
    iconSize?: number
): VNode | undefined {
    if (showIcon) {
        return useRenderTransition(
            { name: 'fade' },
            hasValidated || hasError
                ? h('div', { class: `${cssPrefix}validation-icon` }, [
                      hasValidated && hasError
                          ? h<TBsIcon>(BsIcon, {
                                class: 'icon-error text-danger',
                                icon: (iconVariant === 'outlined'
                                    ? `error_outline_${iconVariant}`
                                    : `error_${iconVariant}`) as Prop<string>,
                                size: iconSize as Prop<number | undefined>,
                            })
                          : hasValidated && !hasError
                            ? h<TBsIcon>(BsIcon, {
                                  class: 'icon-success text-success',
                                  icon: `check_${iconVariant}` as Prop<string>,
                                  size: iconSize as Prop<number | undefined>,
                              })
                            : undefined,
                  ])
                : createCommentVNode(' v-if-validation-icon ')
        );
    }

    return createCommentVNode(' v-if-validation-icon ');
}

export function useShowClearButton(
    props: Readonly<TInputFieldProps>,
    localValue: Ref<string | number | (string | number)[] | undefined | null>
): boolean {
    return (
        props.clearButton === true &&
        !Helper.isEmpty(localValue.value) &&
        !props.readonly &&
        !props.disabled
    );
}

export function useFieldControlClasses(
    slots: Slots,
    props: Readonly<TInputTextProps>,
    localValue: Ref<string | number | (string | number)[] | undefined | null>,
    isFocused: Ref<boolean>,
    showAppendIcon: boolean,
    showPrependIcon?: boolean
): TRecord {
    return {
        [`${cssPrefix}field-control`]: true,
        [`${cssPrefix}field-filled`]: props.filled,
        [`${cssPrefix}field-outlined`]: props.outlined && !props.filled,
        [`${cssPrefix}field-flat`]: props.flat && !props.filled && !props.outlined,
        [`${cssPrefix}floating-label`]: props.floatingLabel,
        'append-icon': showAppendIcon,
        'prepend-icon': props.prependIcon || showPrependIcon || slots['prepend-inner'],
        active: !Helper.isEmpty(localValue.value) || !Helper.isEmpty(props.placeholder),
        focused: isFocused.value,
        readonly: props.readonly,
        disabled: props.disabled,
    };
}

export function useMakeInputBaseAttrs(props: Readonly<TInputBaseProps>): TRecord {
    return {
        id: props.id,
        name: props.name,
        disabled: props.disabled,
        required: props.required,
        readonly: props.readonly,
    };
}

function createTextInputField(
    props: Readonly<TTextFieldOptionProps>,
    type: string | undefined,
    autocomplete: string | boolean,
    emit: TEmitFn,
    localValue: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>
): VNode[] {
    return [
        props.prefix && (isFocused.value || localValue.value)
            ? h('div', { class: `${cssPrefix}field-prefix` }, toDisplayString(props.prefix))
            : createCommentVNode(' v-if-prefix '),
        withDirectives(
            h('input', {
                ...useMakeInputBaseAttrs(props),
                ...useInputTextFieldAttrs(props, autocomplete),
                role: 'textbox',
                type: type,
                list: props.datalist,
                maxlength: props.maxlength,
                minlength: props.minlength,
                'onUpdate:modelValue': (value: string | number | undefined | null) =>
                    useOnFieldValueUpdated(emit, localValue, value),
                onBlur: (e: Event) =>
                    useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
                onFocus: (e: Event) =>
                    useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
                onKeydown: (e: KeyboardEvent) => emit('keydown', e),
            }),
            [[vModelText, localValue.value]]
        ),
        props.suffix && (isFocused.value || localValue.value)
            ? h('div', { class: `${cssPrefix}field-suffix` }, toDisplayString(props.suffix))
            : createCommentVNode(' v-if-suffix '),
    ];
}

export function useRenderTextField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TTextFieldOptionProps>,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    fieldType: string | undefined,
    localValue: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>,
    passwordToggled: Ref<boolean>,
    autocomplete: string | boolean,
    showClearButton: ComputedRef<boolean>,
    showPasswordToggle: ComputedRef<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasValidated: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>,
    passwordToggleHandler: (value: boolean) => void
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
                    createTextInputField(
                        props,
                        fieldType,
                        autocomplete,
                        emit,
                        localValue,
                        isFocused
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
                    useCreateFieldActionIcon(
                        showClearButton.value,
                        props.actionIconVariant as TIconVariant,
                        iconSize,
                        () => useOnFieldValueCleared(emit, localValue),
                        showPasswordToggle.value,
                        passwordToggled,
                        passwordToggleHandler
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

function createTextAreaInputField(
    props: Readonly<TTextAreaOptionProps>,
    emit: TEmitFn,
    localValue: Ref<string | number | undefined | null>,
    rowHeight: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>,
    autocomplete: string | boolean
): VNode {
    const canGrow = props.autoGrow && !props.noResize;

    return withDirectives(
        h('textarea', {
            ...useMakeInputBaseAttrs(props),
            ...useInputTextFieldAttrs(props, autocomplete),
            role: 'textbox',
            rows: canGrow ? 2 : props.rows && !props.rowHeight ? props.rows : undefined,
            style: rowHeight.value && {
                height: Helper.cssUnit(rowHeight.value),
            },
            'onUpdate:modelValue': (value: string | number | undefined | null) =>
                useOnFieldValueUpdated(emit, localValue, value),
            onBlur: (e: Event) => useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
            onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
            onKeydown: (e: KeyboardEvent) => emit('keydown', e),
            onInput: (e: InputEvent): void => {
                if (canGrow) {
                    const target = e.target as HTMLElement;
                    target.style.height = 'auto';
                    nextTick().then(() => {
                        rowHeight.value = Helper.cssUnit(target.scrollHeight);
                        target.style.height = Helper.cssUnit(target.scrollHeight) || 'auto';
                    });
                }
            },
        }),
        [[vModelText, localValue.value, '', { lazy: true }]]
    );
}

export function useRenderTextArea(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TTextAreaOptionProps>,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    localValue: Ref<string | number | undefined | null>,
    rowHeight: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>,
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
                    createTextAreaInputField(
                        props,
                        emit,
                        localValue,
                        rowHeight,
                        isFocused,
                        autocomplete
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
                    useCreateFieldActionIcon(
                        showClearButton.value,
                        props.actionIconVariant as TIconVariant,
                        iconSize,
                        () => useOnFieldValueCleared(emit, localValue)
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
        (node: VNode) => onTextAreaNodeMounted(props, node)
    );
}

function onTextAreaNodeMounted(props: Readonly<TInputTextProps>, node: VNode): void {
    useOnFieldNodeMounted(props, node);
    const element = node.el as HTMLElement;

    if (props.autofocus) {
        nextTick().then(() => {
            const input = element.querySelector('textarea');
            input?.focus();
        });
    }
}
