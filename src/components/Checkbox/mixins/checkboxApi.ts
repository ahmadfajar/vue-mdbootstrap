import type { Prop, VNodeArrayChildren } from 'vue';
import { h } from 'vue';
import { cssPrefix } from '../../../mixins/CommonApi';
import type {
    TBsCheckbox,
    TCheckboxGroupOptionProps,
    TCheckboxOptionProps,
    TRadioProps,
    TRecord,
} from '../../../types';
import { useCheckSelected } from '../../Radio/mixins/radioApi';
import BsCheckbox from '../BsCheckbox';

export function useCheckboxClasses(props: Readonly<TCheckboxOptionProps>): TRecord {
    const checked = useCheckSelected(props);

    return {
        [`${cssPrefix}checkbox`]: true,
        [`${cssPrefix}checkbox-${props.color}`]: props.color != null,
        [`${cssPrefix}indeterminate`]: props.indeterminate && !checked,
        checked: checked,
        required: props.required,
        readonly: props.readonly,
        disabled: props.disabled,
    };
}

export function useCreateCheckboxItems(
    props: Readonly<TCheckboxGroupOptionProps>,
    toggleCheckHandler: (
        values: string | number | TRecord | Array<string | number | TRecord>,
        item: TRadioProps
    ) => void
): VNodeArrayChildren {
    return props.items.map((it, idx) => {
        return h('div', { class: 'col', key: `checkbox-${idx}` }, [
            h<TBsCheckbox>(
                BsCheckbox,
                {
                    color: (it.color || props.color) as Prop<string>,
                    // @ts-ignore
                    disabled: (it.disabled || props.disabled) as Prop<boolean>,
                    // @ts-ignore
                    readonly: (it.readonly || props.readonly) as Prop<boolean>,
                    // @ts-ignore
                    indeterminate: (it.indeterminate || props.indeterminate) as Prop<boolean>,
                    value: it.value as Prop<string | number | TRecord>,
                    name: (it.name
                        ? it.name
                        : props.name
                          ? `${props.name}[${idx}]`
                          : undefined) as Prop<string | undefined>,
                    modelValue: props.modelValue as Prop<
                        string | number | TRecord | Array<string | number | TRecord>
                    >,
                    'onUpdate:model-value': (
                        value: string | number | TRecord | Array<string | number | TRecord>
                    ): void => toggleCheckHandler(value, it),
                },
                {
                    default: () => it.label,
                }
            ),
        ]);
    });
}
