import { BsCheckbox } from '@/components/Checkbox';
import { useCheckSelected } from '@/components/Radio/mixins/radioApi.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type {
    TBsCheckbox,
    TCheckboxGroupOptionProps,
    TCheckboxOptionProps,
    TRadioOptionProps,
    TRadioProps,
    TRecord,
} from '@/types';
import type { EmitFn, Prop, Ref, VNodeArrayChildren } from 'vue';
import { h, nextTick } from 'vue';

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

export function useToggleChecked(
    props: Readonly<TRadioOptionProps>,
    emit: EmitFn,
    rippleActive: Ref<boolean>
): void {
    if (!props.disabled && !props.readonly) {
        const checked = useCheckSelected(props);
        rippleActive.value = true;

        if (Array.isArray(props.modelValue)) {
            const idx = props.modelValue.indexOf(props.value);
            if (checked) {
                props.modelValue.splice(idx, 1);
            } else {
                props.modelValue.push(props.value);
            }
            emit('update:model-value', props.modelValue);
        } else {
            emit('update:model-value', checked ? null : props.value);
        }

        nextTick().then(() => {
            emit('checked', !checked);
        });
    }
}
