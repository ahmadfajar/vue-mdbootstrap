import {ComputedRef, h, Prop, Ref, Slots, VNode} from "vue";
import {BsRipple} from "../../Animation";
import {TBsRipple} from "../../Animation/types";
import {useRenderFieldFeedback} from "./validationApi";
import {cssPrefix, useRenderSlot, useRenderSlotWithWrapper} from "../../../mixins/CommonApi";
import {TBsCheckbox, TCheckboxGroupOptionProps, TCheckboxOptionProps, TCheckboxProps, TInputBaseProps} from "../types";
import {TRecord} from "../../../types";
import BsCheckbox from "../BsCheckbox";
import Helper from "../../../utils/Helper";

function checkSelected(props: Readonly<TCheckboxOptionProps>): boolean {
    if (props.modelValue && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
    }

    return props.value === props.modelValue;
}

export function useCheckboxClasses(
    props: Readonly<TCheckboxOptionProps>,
): TRecord {
    const checked = checkSelected(props);

    return {
        [`${cssPrefix}checkbox`]: true,
        [`${cssPrefix}checkbox-${props.color}`]: props.color !== undefined,
        [`${cssPrefix}indeterminate`]: props.indeterminate && !checked,
        'checked': checked,
        'required': props.required,
        'readonly': props.readonly,
        'disabled': props.disabled,
    }
}

export function useMakeInputBaseAttrs(props: Readonly<TInputBaseProps>): TRecord {
    return {
        id: props.id,
        name: props.name,
        disabled: props.disabled,
        required: props.required,
        readonly: props.readonly,
    }
}

export function useRenderCheckbox(
    slots: Slots,
    props: Readonly<TCheckboxOptionProps>,
    classnames: ComputedRef<TRecord>,
    rippleActive: Ref<boolean>,
    toggleCheckHandler: VoidFunction,
): VNode {
    const thisValue = !Helper.isEmpty(props.value)
        ? (Helper.isObject(props.value) ? JSON.stringify(props.value) : String(props.value))
        : '';

    return h("div", {
            class: classnames.value,
        }, [
            h("div", {
                class: `${cssPrefix}checkbox-inner`,
                onClick: () => toggleCheckHandler(),
            }, [
                h<TBsRipple>(BsRipple, {
                    centered: true as Prop<boolean>,
                    disabled: <Prop<boolean>>props.disabled || <Prop<boolean>>props.readonly,
                    active: <Prop<boolean>>rippleActive.value,
                    "onUpdate:active": (value: boolean): void => {
                        rippleActive.value = value
                    }
                }, {
                    default: () => h("input", {
                        ...useMakeInputBaseAttrs(props),
                        type: "checkbox",
                        value: thisValue,
                        indeterminate: props.indeterminate,
                        "true-value": true,
                        "false-value": false,
                    })
                }),
            ]),
            useRenderSlotWithWrapper(
                slots, "default",
                Helper.uuid(), "label",
                {
                    "for": props.id,
                    class: `${cssPrefix}checkbox-label`,
                    onClickPrevent: () => toggleCheckHandler(),
                }
            ),
        ]
    );
}

export function useCheckboxGroupClasses(
    props: Readonly<TCheckboxGroupOptionProps>,
    hasValidated: boolean,
    hasError: boolean,
): TRecord {
    return {
        [`${cssPrefix}field row`]: true,
        // [`${cssPrefix}checkbox-group`]: true,
        'required': props.required,
        'readonly': props.readonly,
        'disabled': props.disabled,
        'has-error': hasError,
        'has-success': hasValidated && !hasError
    }
}

export function useRenderCheckboxGroup(
    slots: Slots,
    props: Readonly<TCheckboxGroupOptionProps>,
    classnames: ComputedRef<TRecord>,
    showValidationError: boolean,
    showHelpText: boolean,
    hasError: boolean,
    errorItems: Array<string>,
    toggleCheckHandler: (item: TCheckboxProps) => void,
): VNode {
    return h("div", {
        class: classnames.value,
    }, [
        useRenderSlot(slots, "default", {key: Helper.uuid()}),
        h("div", {
            class: "col"
        }, [
            h("div", {
                class: {
                    "row g-3": true,
                    "row-cols-auto": !props.column && props.items.length < 4,
                    "row-cols-1 row-cols-md-2": props.column || props.items.length > 3,
                    [`row-cols-lg-4`]: (props.column && props.column > 4) || props.items.length > 3,
                    [`row-cols-lg-${props.column}`]: props.column && props.column < 5,
                    [`row-cols-xl-${props.column}`]: props.column !== undefined,
                }
            }, props.items.map((it, idx) => {
                return h("div", {class: "col", key: `checkbox-${idx}`}, [
                    h<TBsCheckbox>(BsCheckbox, {
                        color: <Prop<string>>(it.color || props.color),
                        disabled: <Prop<boolean>>(it.disabled || props.disabled),
                        readonly: <Prop<boolean>>(it.readonly || props.readonly),
                        indeterminate: <Prop<boolean>>(it.indeterminate || props.indeterminate),
                        value: <Prop<string | number | unknown>>it.value,
                        name: <Prop<string | undefined>>(
                            it.name
                                ? it.name
                                : (props.name ? (props.name + '[' + idx + ']') : undefined)
                        ),
                        modelValue: props.modelValue as Prop<string | number | unknown>,
                        "onUpdate:modelValue": (): void => toggleCheckHandler(it)
                    }, {
                        default: () => it.label
                    }),
                ]);
            })),
            useRenderFieldFeedback(
                slots, props, showHelpText,
                showValidationError, hasError, errorItems,
            ),
        ]),
    ]);
}
