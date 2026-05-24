import { BsChip } from '@/components/Chip';
import {
  useCreateFieldActionIcon,
  useCreateFieldInnerWrapper,
  useCreateFieldWrapper,
  useCreateValidationIcon,
  useInputFieldBaseAttrs,
  useInputTextFieldAttrs,
} from '@/components/Field/mixins/textFieldApi.ts';
import {
  useOnFieldBlurred,
  useOnFieldFocused,
  useOnTextFieldNodeMounted,
} from '@/components/Field/mixins/textFieldEventApi.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import type { TChipFieldOptionProps } from '@/components/Field/types';
import type { TRecord } from '@/types';
import type { ComputedRef, EmitFn, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, Fragment, h, nextTick, toDisplayString } from 'vue';

declare interface ChipEventEmitter {
  clear: VoidFunction;
  blur: EventListener;
  focus: EventListener;
  keydown: EventListener;
  'delete-item': (deletedItem: string) => void;
  'update:model-value': (value: string | string[]) => void;
}

function dispatchModelValue(
  props: Readonly<TChipFieldOptionProps>,
  emit: EmitFn<ChipEventEmitter>,
  inputValue: Ref<string>,
  localValue: Ref<string[]>
) {
  if (!props.disabled && !props.readonly) {
    inputValue.value !== '' && localValue.value.push(inputValue.value);

    if (Array.isArray(props.modelValue)) {
      emit('update:model-value', localValue.value);
    } else {
      emit('update:model-value', localValue.value.join(', '));
    }

    inputValue.value = '';
  }
}

function createFieldInput(
  props: Readonly<TChipFieldOptionProps>,
  emit: EmitFn<ChipEventEmitter>,
  inputValue: Ref<string>,
  localValue: Ref<string[]>,
  isFocused: Ref<boolean>,
  autocomplete: string | boolean | null
): VNode {
  return h('input', {
    ...useInputFieldBaseAttrs(props),
    ...useInputTextFieldAttrs(props, autocomplete),
    role: 'textbox',
    type: 'text',
    value: inputValue.value,
    onChange: (e: Event) => {
      inputValue.value = (e.target as HTMLInputElement).value;
      dispatchModelValue(props, emit, inputValue, localValue);
    },
    onBlur: async (e: Event) => {
      dispatchModelValue(props, emit, inputValue, localValue);
      await nextTick().then(() => useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean));
    },
    onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, <boolean>props.disabled),
    onKeydown: async (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && (e.target as HTMLInputElement).value === '') {
        localValue.value.length > 0 && localValue.value.pop();
        emit('keydown', e);
        await nextTick().then(() => dispatchModelValue(props, emit, inputValue, localValue));
      } else if (e.key === 'Enter') {
        emit('keydown', e);
        await nextTick().then(() => dispatchModelValue(props, emit, inputValue, localValue));
      } else {
        emit('keydown', e);
      }
    },
  });
}

function createFieldChips(
  props: Readonly<TChipFieldOptionProps>,
  emit: EmitFn<ChipEventEmitter>,
  localValue: Ref<string[]>
): VNode {
  if (localValue.value.length === 0) {
    return createCommentVNode(' v-if-chips ');
  }

  return h(
    Fragment,
    null,
    localValue.value.map((label) =>
      h(
        BsChip,
        {
          key: label,
          color: props.chipColor,
          disabled: props.disabled,
          readonly: props.readonly,
          pill: props.chipPill,
          outlined: props.chipOutlined,
          dismissible: props.chipDeletable && !props.readonly && !props.disabled,
          onClose: async () => {
            emit('delete-item', label);
            await nextTick().then(() => {
              const result = localValue.value.filter((v) => v !== label);

              if (Array.isArray(props.modelValue)) {
                emit('update:model-value', result);
              } else {
                emit('update:model-value', result.join(', '));
              }
            });
          },
        },
        {
          default: () => toDisplayString(label),
        }
      )
    )
  );
}

export function useRenderChipField(
  slots: Slots,
  emit: EmitFn<ChipEventEmitter>,
  props: Readonly<TChipFieldOptionProps>,
  wrapperCss: ComputedRef<TRecord>,
  controlCss: ComputedRef<TRecord>,
  inputValue: Ref<string>,
  localValue: Ref<string[]>,
  isFocused: Ref<boolean>,
  autocomplete: string | boolean | null,
  showClearButton: ComputedRef<boolean>,
  showHelpText: ComputedRef<boolean>,
  showValidationError: ComputedRef<boolean>,
  hasValidated: ComputedRef<boolean>,
  hasError: ComputedRef<boolean>,
  errorItems: ComputedRef<string[]>
): VNode {
  const valueAsArray = Array.isArray(props.modelValue);
  const iconSize = 24;

  return useCreateFieldWrapper(
    slots,
    iconSize,
    'chip-field',
    wrapperCss,
    props,
    h(
      'div',
      {
        class: controlCss.value,
      },
      [
        useCreateFieldInnerWrapper(
          slots,
          'chip-field',
          props,
          [
            createFieldChips(props, emit, localValue),
            createFieldInput(props, emit, inputValue, localValue, isFocused, autocomplete),
          ],
          iconSize,
          props.appendIcon,
          props.prependIcon,
          useCreateValidationIcon(
            props.actionIconVariant!,
            hasValidated.value,
            hasError.value,
            props.validationIcon as boolean,
            iconSize
          ),
          useCreateFieldActionIcon(
            'chip-field',
            props,
            showClearButton.value,
            props.actionIconVariant!,
            iconSize,
            async () => {
              inputValue.value = '';
              localValue.value = [];
              emit('update:model-value', valueAsArray ? [] : '');
              await nextTick().then(() => emit('clear'));
            }
          )
        ),
        useRenderFieldFeedback(
          slots,
          props,
          showHelpText.value,
          showValidationError.value,
          hasError.value,
          errorItems.value
        ),
      ]
    ),
    (node: VNode) => useOnTextFieldNodeMounted(props, node)
  );
}
