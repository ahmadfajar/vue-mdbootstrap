import type {Prop, VNodeArrayChildren} from "vue";
import {h} from "vue";
import {useCheckSelected} from "../../Radio/mixins/radioApi";
import {cssPrefix} from "../../../mixins/CommonApi";
import type {TBsCheckbox, TCheckboxGroupOptionProps, TCheckboxOptionProps, TRadioProps, TRecord} from "../../../types";
import BsCheckbox from "../BsCheckbox";

export function useCheckboxClasses(
    props: Readonly<TCheckboxOptionProps>,
): TRecord {
    const checked = useCheckSelected(props);

    return {
        [`${cssPrefix}checkbox`]: true,
        [`${cssPrefix}checkbox-${props.color}`]: props.color !== undefined,
        [`${cssPrefix}indeterminate`]: props.indeterminate && !checked,
        "checked": checked,
        "required": props.required,
        "readonly": props.readonly,
        "disabled": props.disabled,
    }
}

export function useCreateCheckboxItems(
    props: Readonly<TCheckboxGroupOptionProps>,
    toggleCheckHandler: (values: string | number | unknown | Array<string | number | unknown>, item: TRadioProps) => void,
): VNodeArrayChildren {
    return props.items.map((it, idx) => {
        return h("div", {class: "col", key: `checkbox-${idx}`}, [
            h<TBsCheckbox>(BsCheckbox, {
                color: <Prop<string>>(it.color || props.color),
                // @ts-ignore
                disabled: <Prop<boolean>>(it.disabled || props.disabled),
                // @ts-ignore
                readonly: <Prop<boolean>>(it.readonly || props.readonly),
                // @ts-ignore
                indeterminate: <Prop<boolean>>(it.indeterminate || props.indeterminate),
                value: <Prop<string | number | unknown>>it.value,
                name: <Prop<string | undefined>>(
                    it.name
                        ? it.name
                        : (props.name ? (props.name + "[" + idx + "]") : undefined)
                ),
                modelValue: props.modelValue as Prop<string | number | unknown | Array<string | number | unknown>>,
                "onUpdate:model-value": (value: string | number | unknown | Array<string | number | unknown>): void => toggleCheckHandler(value, it)
            }, {
                default: () => it.label
            }),
        ]);
    });
}
