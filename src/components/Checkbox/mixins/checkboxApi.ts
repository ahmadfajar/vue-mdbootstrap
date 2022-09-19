import {h, Prop, VNode, VNodeArrayChildren} from "vue";
import {TBsCheckbox, TCheckboxGroupOptionProps, TCheckboxOptionProps} from "../types";
import {useMakeInputBaseAttrs} from "../../Radio/mixins/radioApi";
import {cssPrefix} from "../../../mixins/CommonApi";
import {TRadioProps} from "../../Radio/types";
import {TRecord} from "../../../types";
import BsCheckbox from "../BsCheckbox";
import Helper from "../../../utils/Helper";

export function useCheckSelected(props: Readonly<TCheckboxOptionProps>): boolean {
    if (props.modelValue && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
    }

    return props.value === props.modelValue;
}

export function useCheckboxClasses(
    props: Readonly<TCheckboxOptionProps>,
): TRecord {
    const checked = useCheckSelected(props);

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

export function useCreateInputCheckbox(props: Readonly<TCheckboxOptionProps>): VNode {
    const thisValue = !Helper.isEmpty(props.value)
        ? (Helper.isObject(props.value) ? JSON.stringify(props.value) : String(props.value))
        : '';

    return h("input", {
        ...useMakeInputBaseAttrs(props),
        type: "checkbox",
        role: "checkbox",
        value: thisValue,
        indeterminate: props.indeterminate,
        "true-value": true,
        "false-value": false,
    });
}

export function useCreateCheckboxItems(
    props: Readonly<TCheckboxGroupOptionProps>,
    toggleCheckHandler: (item: TRadioProps) => void,
): VNodeArrayChildren {
    return props.items.map((it, idx) => {
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
    });
}
