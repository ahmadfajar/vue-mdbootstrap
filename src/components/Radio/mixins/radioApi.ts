import {ComputedRef, h, Prop, Ref, Slots, VNode, VNodeArrayChildren} from "vue";
import {cssPrefix, useRenderSlot, useRenderSlotWithWrapper} from "../../../mixins/CommonApi";
import {BsRipple} from "../../Animation";
import {useRenderFieldFeedback} from "./validationApi";
import {
    TBsRadio,
    TBsRipple,
    TInputBaseProps,
    TInputGroupProps,
    TRadioGroupOptionProps,
    TRadioOptionProps,
    TRadioProps,
    TRecord
} from "../../../types";
import BsRadio from "../BsRadio";
import Helper from "../../../utils/Helper";

export function useRadioClasses(
    props: Readonly<TRadioOptionProps>,
): TRecord {
    return {
        [`${cssPrefix}radio`]: true,
        [`${cssPrefix}radio-${props.color}`]: props.color !== undefined,
        'checked': props.value === props.modelValue,
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

export function useCreateInputRadio(props: Readonly<TRadioOptionProps>): VNode {
    const thisValue = !Helper.isEmpty(props.value)
        ? (Helper.isObject(props.value) ? JSON.stringify(props.value) : String(props.value))
        : '';

    return h("input", {
        ...useMakeInputBaseAttrs(props),
        type: "radio",
        role: "radio",
        value: thisValue,
        'aria-disabled': props.disabled,
        'aria-checked': props.value === props.modelValue,
    })
}

export function useRenderRadioOrCheckbox(
    slots: Slots,
    props: Readonly<TRadioOptionProps>,
    classnames: ComputedRef<TRecord>,
    rippleActive: Ref<boolean>,
    inputType: string,
    inputElement: VNode,
    toggleCheckHandler: VoidFunction,
): VNode {
    return h("div", {
            class: classnames.value,
        }, [
            h("div", {
                class: `${cssPrefix}${inputType}-inner`,
                onClick: () => toggleCheckHandler(),
            }, [
                h("div", {class: `${cssPrefix}${inputType}-overlay`}),
                h<TBsRipple>(BsRipple, {
                    // @ts-ignore
                    centered: true as Prop<boolean>,
                    // @ts-ignore
                    active: <Prop<boolean>>rippleActive.value,
                    // @ts-ignore
                    disabled: <Prop<boolean>>props.disabled || <Prop<boolean>>props.readonly,
                    "onUpdate:active": (value: boolean): void => {
                        rippleActive.value = value
                    }
                }, {
                    default: () => inputElement
                }),
            ]),
            useRenderSlotWithWrapper(
                slots, "default",
                Helper.uuid(), "label",
                {
                    "for": props.id,
                    class: `${cssPrefix}${inputType}-label`,
                    onClickPrevent: () => toggleCheckHandler(),
                }
            ),
        ]
    );
}

export function useInputGroupClasses<D, M>(
    props: Readonly<TInputGroupProps<D, M>>,
    hasValidated: boolean,
    hasError: boolean,
): TRecord {
    return {
        [`${cssPrefix}field row`]: true,
        // [`${cssPrefix}radio-group`]: true,
        'required': props.required,
        'readonly': props.readonly,
        'disabled': props.disabled,
        'has-error': hasError,
        'has-success': hasValidated && !hasError
    }
}

export function useCreateRadioItems(
    props: Readonly<TRadioGroupOptionProps>,
    toggleCheckHandler: (item: TRadioProps) => void,
): VNodeArrayChildren {
    return props.items.map((it, idx) => {
        return h("div", {class: "col", key: `radio-${idx}`}, [
            h<TBsRadio>(BsRadio, {
                color: <Prop<string>>(it.color || props.color),
                // @ts-ignore
                disabled: <Prop<boolean>>(it.disabled || props.disabled),
                // @ts-ignore
                readonly: <Prop<boolean>>(it.readonly || props.readonly),
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
    });
}

export function useRenderRadioCheckboxGroup<D, M>(
    slots: Slots,
    props: Readonly<TInputGroupProps<D, M>>,
    classnames: ComputedRef<TRecord>,
    children: VNodeArrayChildren,
    showValidationError: boolean,
    showHelpText: boolean,
    hasError: boolean,
    errorItems: Array<string>,
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
                    "row g-2": true,
                    "row-cols-auto": !props.column && props.items.length < 4,
                    "row-cols-1 row-cols-md-2": props.column || props.items.length > 3,
                    [`row-cols-lg-4`]: (props.column && props.column > 4) || props.items.length > 3,
                    [`row-cols-lg-${props.column}`]: props.column && props.column < 5,
                    [`row-cols-xl-${props.column}`]: props.column !== undefined,
                }
            }, children),
            useRenderFieldFeedback(
                slots, props, showHelpText,
                showValidationError, hasError, errorItems,
            ),
        ]),
    ]);
}
