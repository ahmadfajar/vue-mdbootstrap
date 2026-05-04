import { BsCheckbox } from '@/components/Checkbox';
import type { TCheckboxGroupOptionProps, TCheckboxOptionProps } from '@/components/Checkbox/types';
import { useCheckSelected } from '@/components/Radio/mixins/radioApi.ts';
import type { TRadioInputProps, TRadioOptionProps } from '@/components/Radio/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { Numberish, TRecord } from '@/types';
import type { EmitFn, Prop, Ref, VNodeArrayChildren } from 'vue';
import { h, nextTick } from 'vue';

export function useCheckboxClasses(props: Readonly<TCheckboxOptionProps>): TRecord {
  const checked = useCheckSelected(props);

  return {
    [`${cssPrefix}checkbox`]: true,
    [`${cssPrefix}indeterminate`]: props.indeterminate && !checked,
    [`checkbox-${props.color}`]: props.color != null,
    'inline-flex': true,
    relative: true,
    checked: checked,
    required: props.required,
    readonly: props.readonly,
    disabled: props.disabled,
  };
}

export function useCreateCheckboxItems(
  props: Readonly<TCheckboxGroupOptionProps>,
  toggleCheckHandler: (
    values: Numberish | unknown | Numberish[] | unknown[],
    item: TRadioInputProps
  ) => void
): VNodeArrayChildren {
  return props.items.map((it, idx) => {
    return h('div', { class: 'col', key: `checkbox-${idx}` }, [
      h(
        BsCheckbox,
        {
          color: it.color || props.color,
          disabled: it.disabled || props.disabled,
          readonly: it.readonly || props.readonly,
          indeterminate: it.indeterminate || props.indeterminate,
          value: it.value as Prop<string | number | TRecord>,
          name: it.name ? it.name : props.name ? `${props.name}[${idx}]` : undefined,
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value: Numberish | unknown | Numberish[] | unknown[]): void =>
            toggleCheckHandler(value, it),
        },
        {
          default: () => it.label,
        }
      ),
    ]);
  });
}

export async function useToggleChecked(
  emit: EmitFn,
  props: Readonly<TRadioOptionProps>,
  rippleActive: Ref<boolean>
): Promise<void> {
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

    await nextTick().then(() => {
      emit('checked', !checked);
    });
  }
}
