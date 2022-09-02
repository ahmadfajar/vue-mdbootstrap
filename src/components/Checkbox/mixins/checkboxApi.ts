import {ComputedRef, h, Prop, Ref, Slots, VNode} from "vue";
import {BsRipple} from "../../Animation";
import {cssPrefix, useRenderSlotWithWrapper} from "../../../mixins/CommonApi";
import {TCheckboxOptionProps, TInputBaseProps} from "../types";
import {TBsRipple} from "../../Animation/types";
import {TRecord} from "../../../types";
import Helper from "../../../utils/Helper";

export function useCheckboxClasses(
    props: Readonly<TCheckboxOptionProps>,
): TRecord {
    return {
        [`${cssPrefix}checkbox`]: true,
        [`${cssPrefix}checkbox-${props.color}`]: props.color !== undefined,
        [`${cssPrefix}indeterminate`]: props.indeterminate && props.value !== props.modelValue,
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
