import type {ComputedRef, Prop, Ref, Slots, VNode} from "vue";
import {createCommentVNode, h, nextTick, vModelText, withDirectives} from "vue";
import {
    cssPrefix,
    useRenderSlotWithWrapper,
    useRenderSlotWrapperWithCondition,
    useRenderTransition
} from "../../../mixins/CommonApi";
import {BsIcon, BsToggleIcon} from "../../Icon";
import {useMakeInputBaseAttrs} from "../../Radio/mixins/radioApi";
import {useRenderFieldFeedback} from "../../Radio/mixins/validationApi";
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldNodeMounted,
    useOnFieldValueCleared,
    useOnFieldValueUpdated,
    useOnTextFieldNodeMounted
} from "./textFieldEventApi";
import type {
    TBsIcon,
    TBsToggleIcon,
    TEmitFn,
    TInputFieldProps,
    TInputTextProps,
    TRecord,
    TShapeStyle,
    TTextAreaOptionProps,
    TTextFieldOptionProps
} from "../../../types";
import Helper from "../../../utils/Helper";

export function useFieldWrapperClasses(
    props: Readonly<TInputFieldProps>,
    hasValidated: boolean,
    hasError: boolean,
    clazz?: string,
): TRecord {
    return {
        [`${cssPrefix}field row`]: true,
        [`${clazz}`]: clazz !== undefined,
        [`${cssPrefix}field-filled`]: props.filled,
        [`${cssPrefix}field-outlined`]: props.outlined && !props.filled,
        [`${cssPrefix}field-flat`]: props.flat && !props.filled && !props.outlined,
        "required": props.required,
        "readonly": props.readonly,
        "disabled": props.disabled,
        "has-error": hasError,
        "has-success": hasValidated && !hasError
    }
}

export function useInputTextFieldAttrs(
    props: Readonly<TInputTextProps>,
    autocomplete: string | boolean,
): TRecord {
    const showPlaceHolder = !Helper.isEmpty(props.placeholder) && !props.readonly && !props.disabled;

    return {
        "autocomplete": autocomplete,
        "placeholder": showPlaceHolder ? props.placeholder : undefined,
        "aria-disabled": props.disabled,
        "aria-required": props.required,
        "aria-readonly": props.readonly,
        "aria-placeholder": showPlaceHolder ? props.placeholder : undefined,
    }
}

export function useCreateFieldIcon(
    slots: Slots,
    slotName: string,
    cssClass: string,
    iconName?: string,
    iconSize?: number,
): VNode {
    return useRenderSlotWithWrapper(
        slots, slotName, Helper.uuid(), "div",
        {class: cssClass},
        (
            iconName
                ? h<TBsIcon>(BsIcon, {
                    icon: <Prop<string>>iconName,
                    size: <Prop<number | undefined>>iconSize,
                })
                : undefined
        ),
    );
}

export function useCreateFieldWrapper(
    slots: Slots,
    iconSize: number,
    cssClass: ComputedRef<TRecord>,
    props: Readonly<TInputFieldProps>,
    fieldElement: VNode,
    nodeMountedHandler?: (node: VNode) => void,
    wrapperID?: string,
): VNode {
    return h("div", {
        id: wrapperID,
        class: cssClass.value,
        onVnodeMounted: nodeMountedHandler,
    }, [
        !props.floatingLabel && slots.default && slots.default({id: props.id}),
        h("div", {
            class: `${cssPrefix}field-wrapper col`
        }, [
            useCreateFieldIcon(
                slots, "prependOuter",
                `${cssPrefix}prepend-outer`,
                props.prependIconOuter, iconSize,
            ),
            fieldElement,
            useCreateFieldIcon(
                slots, "appendOuter",
                `${cssPrefix}append-outer`,
                props.appendIconOuter, iconSize,
            ),
        ])
    ]);
}

function createOutlineWrapper(
    props: Readonly<TInputFieldProps>,
): VNode {
    return props.outlined
        ? h("div", {
            class: `${cssPrefix}field-outline-control`,
            "aria-hidden": "true",
        }, [
            h("div", {class: `${cssPrefix}field-outline-start`}),
            h("div", {class: `${cssPrefix}field-outline-label`}),
            h("div", {class: `${cssPrefix}field-outline-end`}),
        ])
        : createCommentVNode(" v-if-outlined ");
}

export function useCreateFieldInnerWrapper(
    slots: Slots,
    props: Readonly<TInputFieldProps>,
    iconSize: number,
    fieldActionElement: VNode,
    fieldInputElements: VNode[] | VNode,
): VNode {
    let children = [useRenderSlotWrapperWithCondition(
        slots, "default",
        props.floatingLabel === true,
        {
            class: `${cssPrefix}field-label`
        },
        "div", {id: props.id}
    )];
    children = children.concat(
        Array.isArray(fieldInputElements) ? fieldInputElements : [fieldInputElements]
    );

    return h("div", {
        class: `${cssPrefix}field-inner`
    }, [
        h("div", {class: `${cssPrefix}field-overlay`}),
        useCreateFieldIcon(
            slots, "prependInner",
            `${cssPrefix}prepend-inner`,
            props.prependIcon, iconSize,
        ),
        h("div", {
            class: `${cssPrefix}field-activator`
        }, children),
        fieldActionElement,
        useCreateFieldIcon(
            slots, "appendInner",
            `${cssPrefix}append-inner`,
            props.appendIcon, iconSize,
        ),
        createOutlineWrapper(props),
    ]);
}

export function useCreateFieldActionIcon(
    showClearButton: boolean,
    hasValidated: boolean,
    hasError: boolean,
    iconVariant: TShapeStyle,
    iconSize?: number,
    clearHandler?: () => void,
    showPasswordToggle?: boolean,
    passwordToggle?: Ref<boolean>,
    passwordToggleHandler?: (value: boolean) => void,
): VNode {
    return useRenderTransition(
        {name: "fade"},
        (showPasswordToggle || showClearButton)
            ? h("div", {class: `${cssPrefix}action-icon`}, [
                showClearButton
                    ? h<TBsIcon>(BsIcon, {
                        class: "icon-clear",
                        icon: `cancel_${iconVariant}` as Prop<string>,
                        size: iconSize as Prop<number | undefined>,
                        onClick: clearHandler
                    })
                    : undefined,
                (hasValidated && hasError)
                    ? h<TBsIcon>(BsIcon, {
                        class: "icon-error text-danger",
                        icon: (iconVariant === "outlined" ? "error_outline" : "error") as Prop<string>,
                        size: iconSize as Prop<number | undefined>,
                    })
                    : ((hasValidated && !hasError)
                        ? h<TBsIcon>(BsIcon, {
                            class: "icon-success text-success",
                            icon: `check_${iconVariant}` as Prop<string>,
                            size: iconSize as Prop<number | undefined>,
                        })
                        : undefined),
                showPasswordToggle
                    ? h<TBsToggleIcon>(BsToggleIcon, {
                        icon: `visibility_${iconVariant}` as Prop<string>,
                        toggleIcon: `visibility_off_${iconVariant}` as Prop<string>,
                        size: iconSize as Prop<number | undefined>,
                        // @ts-ignore
                        modelValue: passwordToggle?.value as Prop<boolean | undefined>,
                        "onUpdate:model-value": passwordToggleHandler
                    })
                    : undefined,
            ])
            : createCommentVNode(" v-if-action-icon ")
    );
}

export function useShowClearButton(
    props: Readonly<TInputFieldProps>,
    localValue: Ref<string | number | string[] | undefined | null>,
): boolean {
    return props.clearButton === true
        && !Helper.isEmpty(localValue.value)
        && !props.readonly
        && !props.disabled;
}

export function useCreateTextFieldClasses(
    slots: Slots,
    props: Readonly<TInputTextProps>,
    localValue: Ref<string | string[] | number | undefined | null>,
    isFocused: Ref<boolean>,
    showAppendIcon: boolean,
): TRecord {
    return {
        [`${cssPrefix}field-control`]: true,
        [`${cssPrefix}field-filled`]: props.filled,
        [`${cssPrefix}field-outlined`]: props.outlined && !props.filled,
        [`${cssPrefix}field-flat`]: props.flat && !props.filled && !props.outlined,
        [`${cssPrefix}floating-label`]: props.floatingLabel,
        "append-icon": showAppendIcon,
        "prepend-icon": props.prependIcon || slots.prependInner,
        "active": !Helper.isEmpty(localValue.value) || !Helper.isEmpty(props.placeholder),
        "focused": isFocused.value,
        "readonly": props.readonly,
        "disabled": props.disabled,
    }
}

export function useRenderTextField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TTextFieldOptionProps>,
    wrapperCss: ComputedRef<TRecord>,
    fieldType: string | undefined,
    localValue: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>,
    isPasswordToggled: Ref<boolean>,
    autocomplete: string | boolean,
    showClearButton: boolean,
    showPasswordToggle: boolean,
    showHelpText: boolean,
    showValidationError: boolean,
    hasValidated: boolean,
    hasError: boolean,
    errorItems: Array<string>,
    iconSize: number,
    passwordToggleHandler: (value: boolean) => void,
): VNode {
    const showAppendIcon = (slots.appendInner !== undefined)
        || !Helper.isEmpty(props.appendIcon)
        || showClearButton || showPasswordToggle;

    return useCreateFieldWrapper(
        slots, iconSize, wrapperCss, props,
        h("div", {
            class: useCreateTextFieldClasses(
                slots, props, localValue, isFocused, showAppendIcon,
            ),
        }, [
            useCreateFieldInnerWrapper(
                slots, props, iconSize,
                useCreateFieldActionIcon(
                    showClearButton,
                    hasValidated,
                    hasError,
                    (<TShapeStyle>props.actionIconVariant),
                    iconSize,
                    () => useOnFieldValueCleared(emit, localValue),
                    showPasswordToggle,
                    isPasswordToggled,
                    passwordToggleHandler
                ),
                withDirectives(h("input", {
                    ...useMakeInputBaseAttrs(props),
                    ...useInputTextFieldAttrs(props, autocomplete),
                    "role": "textbox",
                    "type": fieldType,
                    "list": props.datalist,
                    "maxlength": props.maxlength,
                    "minlength": props.minlength,
                    "onUpdate:modelValue": (value: string | number | undefined | null) =>
                        useOnFieldValueUpdated(emit, localValue, value),
                    onBlur: (e: Event) =>
                        useOnFieldBlurred(emit, e, isFocused, (<boolean>props.disabled)),
                    onFocus: (e: Event) =>
                        useOnFieldFocused(emit, e, isFocused, (<boolean>props.disabled)),
                    onKeydown: (e: KeyboardEvent) => emit("keydown", e),
                }), [
                    [vModelText, localValue.value, "", {lazy: true}]
                ]),
            ),
            useRenderFieldFeedback(
                slots, props,
                showHelpText,
                showValidationError,
                hasError, errorItems,
            ),
        ]),
        (node: VNode) => useOnTextFieldNodeMounted(props, node),
    );
}

function onTextAreaNodeMounted(
    props: Readonly<TTextFieldOptionProps>,
    node: VNode,
): void {
    useOnFieldNodeMounted(props, node);
    const element = <HTMLElement>node.el;

    if (props.autofocus) {
        nextTick().then(() => {
            const input = element.querySelector('textarea');
            input?.focus();
        });
    }
}

export function useRenderTextArea(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TTextAreaOptionProps>,
    wrapperCss: ComputedRef<TRecord>,
    localValue: Ref<string | number | undefined | null>,
    rowHeight: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>,
    autocomplete: string | boolean,
    showClearButton: boolean,
    showHelpText: boolean,
    showValidationError: boolean,
    hasValidated: boolean,
    hasError: boolean,
    errorItems: Array<string>,
    iconSize: number,
): VNode {
    const canGrow = props.autoGrow && !props.noResize;
    const showAppendIcon = (slots.appendInner !== undefined)
        || !Helper.isEmpty(props.appendIcon) || showClearButton;

    return useCreateFieldWrapper(
        slots, iconSize, wrapperCss, props,
        h("div", {
            class: {
                ...useCreateTextFieldClasses(
                    slots, props, localValue,
                    isFocused, showAppendIcon,
                ),
                [`${cssPrefix}textarea`]: true,
                [`${cssPrefix}textarea-autogrow`]: canGrow,
                [`${cssPrefix}textarea-noresize`]: props.noResize || canGrow,
            },
        }, [
            useCreateFieldInnerWrapper(
                slots, props, iconSize,
                useCreateFieldActionIcon(
                    showClearButton,
                    hasValidated,
                    hasError,
                    (<TShapeStyle>props.actionIconVariant),
                    iconSize,
                    () => useOnFieldValueCleared(emit, localValue),
                ),
                withDirectives(h("textarea", {
                    ...useMakeInputBaseAttrs(props),
                    ...useInputTextFieldAttrs(props, autocomplete),
                    "role": "textbox",
                    "rows": canGrow ? 2 : (props.rows && !props.rowHeight ? props.rows : undefined),
                    "style": rowHeight.value && {
                        height: Helper.cssUnit(rowHeight.value)
                    },
                    "onUpdate:modelValue": (value: string | number | undefined | null) =>
                        useOnFieldValueUpdated(emit, localValue, value),
                    onBlur: (e: Event) =>
                        useOnFieldBlurred(emit, e, isFocused, (<boolean>props.disabled)),
                    onFocus: (e: Event) =>
                        useOnFieldFocused(emit, e, isFocused, (<boolean>props.disabled)),
                    onKeydown: (e: KeyboardEvent) => emit("keydown", e),
                    onInput: (e: InputEvent): void => {
                        if (canGrow) {
                            const target = (<HTMLElement>e.target);
                            target.style.height = "auto";
                            nextTick().then(() => {
                                rowHeight.value = Helper.cssUnit(target.scrollHeight);
                                target.style.height = Helper.cssUnit(target.scrollHeight) || "auto";
                            });
                        }
                    }
                }), [
                    [vModelText, localValue.value, "", {lazy: true}]
                ]),
            ),
            useRenderFieldFeedback(
                slots, props,
                showHelpText,
                showValidationError,
                hasError, errorItems,
            ),
        ]),
        (node: VNode) => onTextAreaNodeMounted(props, node),
    );
}
