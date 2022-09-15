import {
    ComputedRef,
    createCommentVNode,
    h,
    nextTick,
    Prop,
    Ref,
    Slots,
    vModelText,
    VNode,
    VNodeArrayChildren,
    withDirectives
} from "vue";
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
    useOnFieldValueUpdated
} from "./fieldEventApi";
import {TInputFieldProps, TInputTextProps, TTextFieldOptionProps} from "../types";
import {TBsIcon, TBsToggleIcon} from "../../Icon/types";
import {TEmitFn, TRecord} from "../../../types";
import Helper from "../../../utils/Helper";

export function useInputWrapperClasses(
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
): TRecord {
    const showPlaceHolder = !Helper.isEmpty(props.placeholder) && !props.readonly && !props.disabled;

    return {
        "autocomplete": props.autocomplete && Helper.isString(props.autocomplete)
            ? props.autocomplete
            : (props.autocomplete ? "on" : Helper.uuid()),
        "placeholder": showPlaceHolder ? props.placeholder : undefined,
        "disabled": props.disabled,
        "readonly": props.readonly,
        "aria-disabled": props.disabled,
        "aria-required": props.required,
        "aria-readonly": props.readonly,
        "aria-placeholder": showPlaceHolder ? props.placeholder : undefined,
    }
}

export function useCreateFieldIcon(
    slots: Slots,
    slotName: string,
    wrapClasses: string,
    iconName?: string,
    iconSize?: number,
): VNode {
    return useRenderSlotWithWrapper(
        slots, slotName, Helper.uuid(), "div",
        {class: wrapClasses},
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

export function useCreateInputWrapper(
    slots: Slots,
    props: Readonly<TInputFieldProps>,
    classnames: ComputedRef<TRecord>,
    children: VNodeArrayChildren,
    nodeMountedHandler?: (node: VNode) => void,
    wrapperID?: string,
): VNode {
    return h("div", {
        id: wrapperID,
        class: classnames.value,
        onVnodeMounted: nodeMountedHandler,
    }, [
        !props.floatingLabel && slots.default && slots.default({id: props.id}),
        h("div", {
            class: `${cssPrefix}field-wrapper col`
        }, children)
    ]);
}

function createActionIcon(
    passwordToggle: Ref<boolean>,
    showClearButton: boolean,
    showPasswordToggle: boolean,
    hasValidated: boolean,
    hasError: boolean,
    iconVariant: string,
    iconSize?: number,
    clearHandler?: () => void,
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
                        modelValue: passwordToggle.value as Prop<boolean>,
                        "onUpdate:modelValue": passwordToggleHandler
                    })
                    : undefined,
            ])
            : createCommentVNode(" v-if-action-icon ")
    );
}

function onTextFieldNodeMounted(
    props: Readonly<TTextFieldOptionProps>,
    node: VNode,
): void {
    useOnFieldNodeMounted(props, node);
    const element = <HTMLElement>node.el;

    if (props.outlined) {
        const outlineLabel = element.querySelector('.' + cssPrefix + 'field-outline-label');
        const fieldLabel = element.querySelector('.' + cssPrefix + 'field-label')

        if (outlineLabel && fieldLabel) {
            outlineLabel.innerHTML = fieldLabel.innerHTML;
        }
    }
    if (props.autofocus) {
        nextTick().then(() => {
            const input = element.querySelector('input');
            input?.focus();
        });
    }
}

export function useRenderTextField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<TTextFieldOptionProps>,
    fieldClasses: ComputedRef<TRecord>,
    fieldType: string | undefined,
    localValue: Ref<string | number | undefined | null>,
    isFocused: Ref<boolean>,
    isPasswordToggled: Ref<boolean>,
    showClearButton: boolean,
    showPasswordToggle: boolean,
    showHelpText: boolean,
    showValidationError: boolean,
    hasValidated: boolean,
    hasError: boolean,
    errorItems: Array<string>,
    iconSize: number | undefined,
    passwordToggleHandler: (value: boolean) => void,
): VNode {
    const showAppendIcon = slots.appendInner || props.appendIcon
        || showClearButton || showPasswordToggle;

    return useCreateInputWrapper(
        slots, props, fieldClasses,
        [
            useCreateFieldIcon(
                slots, "prependOuter", `${cssPrefix}prepend-outer`,
                props.prependIconOuter, iconSize,
            ),
            h("div", {
                class: {
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
            }, [
                h("div", {class: `${cssPrefix}field-inner`}, [
                    h("div", {class: `${cssPrefix}field-overlay`}),
                    useCreateFieldIcon(
                        slots, "prependInner", `${cssPrefix}prepend-inner`,
                        props.prependIcon, iconSize,
                    ),
                    h("div", {
                        class: `${cssPrefix}field-activator`
                    }, [
                        useRenderSlotWrapperWithCondition(
                            slots, "default",
                            props.floatingLabel === true,
                            {
                                class: `${cssPrefix}field-label`
                            },
                            "div", {id: props.id}
                        ),
                        withDirectives(h("input", {
                            ...useMakeInputBaseAttrs(props),
                            ...useInputTextFieldAttrs(props),
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
                            [vModelText, localValue.value]
                        ]),
                    ]),
                    createActionIcon(
                        isPasswordToggled,
                        showClearButton,
                        showPasswordToggle,
                        hasValidated,
                        hasError,
                        (<string>props.actionIconVariant),
                        iconSize,
                        () => useOnFieldValueCleared(emit, localValue),
                        passwordToggleHandler,
                    ),
                    useCreateFieldIcon(
                        slots, "appendInner", `${cssPrefix}append-inner`,
                        props.appendIcon, iconSize,
                    ),
                    props.outlined
                        ? h("div", {
                            class: `${cssPrefix}field-outline-control`,
                            "aria-hidden": "true",
                        }, [
                            h("div", {class: `${cssPrefix}field-outline-start`}),
                            h("div", {class: `${cssPrefix}field-outline-label`}),
                            h("div", {class: `${cssPrefix}field-outline-end`}),
                        ])
                        : createCommentVNode(" v-if-outlined "),
                ]),
                useRenderFieldFeedback(
                    slots, props,
                    showHelpText,
                    showValidationError,
                    hasError, errorItems,
                ),
            ]),
            useCreateFieldIcon(
                slots, "appendOuter", `${cssPrefix}append-outer`,
                props.appendIconOuter, iconSize,
            ),
        ],
        (node: VNode) => onTextFieldNodeMounted(props, node),
    );
}
