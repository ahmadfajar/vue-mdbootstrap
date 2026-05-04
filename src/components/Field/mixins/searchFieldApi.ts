import { BsButton } from '@/components/Button';
import {
  useOnFieldBlurred,
  useOnFieldFocused,
  useOnFieldValueCleared,
  useOnFieldValueUpdated,
} from '@/components/Field/mixins/textFieldEventApi.ts';
import type { TSearchFieldOptionProps } from '@/components/Field/types';
import { BsPopover } from '@/components/Popover';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { MaybeString, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, EmitFn, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, mergeProps, vModelText, withDirectives } from 'vue';

export function useSearchFieldClasses(
  props: Readonly<TSearchFieldOptionProps>,
  isFocused: Ref<boolean>
): TRecord {
  return {
    [`${cssPrefix}searchbox-inner`]: true,
    readonly: props.readonly && !props.disabled,
    disabled: props.disabled,
    focused: isFocused.value,
  };
}

function popoverWidth(
  props: Readonly<TSearchFieldOptionProps>,
  activator: Ref<HTMLElement | null>
): number {
  const width = Helper.parseIntLoose(props.popoverMinWidth as string) ?? 0;

  if (activator.value && width < activator.value?.offsetWidth) {
    return activator.value?.offsetWidth;
  }

  return width;
}

declare interface SearchEventEmitter {
  clear: () => void;
  close: () => void;
  open: () => void;
  blur: (target: Event) => void;
  focus: (target: Event) => void;
  search: (value: MaybeString) => void;
  'update:model-value': (value: MaybeString) => void;
}

function dispatchSearch(emit: EmitFn<SearchEventEmitter>, localValue: Ref<MaybeString>) {
  if (!Helper.isEmpty(localValue.value)) {
    emit('search', localValue.value);
  } else {
    emit('clear');
  }
}

export function useRenderSearchField(
  slots: Slots,
  emit: EmitFn<SearchEventEmitter>,
  props: Readonly<TSearchFieldOptionProps>,
  attrs: TRecord,
  cssClasses: ComputedRef<TRecord>,
  activator: Ref<HTMLElement | null>,
  localValue: Ref<MaybeString>,
  isFocused: Ref<boolean>,
  isPopoverOpen: Ref<boolean>
): VNode {
  return h(
    'div',
    {
      class: {
        [`${cssPrefix}field-searchbox`]: true,
        [`${cssPrefix}searchbox-dark`]: props.darkMode === true,
      },
    },
    [
      h(
        'div',
        mergeProps(
          {
            ref: activator,
            class: cssClasses.value,
          },
          attrs
        ),
        [
          h(BsButton, {
            color: props.darkMode ? 'light' : 'secondary',
            icon: 'search',
            mode: 'icon',
            size: 'sm',
            flat: true,
            onClick: () => {
              !props.readonly && !props.disabled && dispatchSearch(emit, localValue);
            },
          }),
          h(
            'label',
            withDirectives(
              h('input', {
                type: 'text',
                role: 'searchbox',
                spellcheck: 'false',
                autocomplete: 'false',
                id: props.id,
                name: props.name,
                value: localValue.value,
                disabled: props.disabled,
                readonly: props.readonly && !props.disabled,
                autofocus: props.autofocus,
                placeholder: props.placeholder,
                minlength: props.minlength,
                'aria-disabled': props.disabled,
                'aria-readonly': props.readonly,
                'aria-placeholder': props.placeholder,
                'onUpdate:modelValue': (value: string) => {
                  useOnFieldValueUpdated(emit, localValue, value);
                  if (value.length >= (props.minlength as number)) {
                    dispatchSearch(emit, localValue);
                  } else if (value.length === 0) {
                    emit('clear');
                  }
                },
                onBlur: (e: Event) =>
                  useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
                onFocus: (e: Event) =>
                  useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
              }),
              [[vModelText, localValue.value]]
            )
          ),
          !Helper.isEmpty(localValue.value)
            ? h(BsButton, {
                color: props.darkMode ? 'light' : 'secondary',
                icon: 'clear',
                mode: 'icon',
                size: 'sm',
                flat: true,
                onClick: async () => {
                  if (!props.disabled && !props.readonly) {
                    await useOnFieldValueCleared(emit, localValue);
                  }
                },
              })
            : '',
          props.advanceSearch
            ? h(BsButton, {
                color: props.darkMode ? 'light' : 'secondary',
                icon: 'arrow_drop_down',
                mode: 'icon',
                size: 'sm',
                flat: true,
                onClick: () => {
                  if (!props.readonly && !props.disabled) {
                    const open = isPopoverOpen.value;
                    isPopoverOpen.value = !open;
                    isPopoverOpen.value ? emit('open') : emit('close');
                  }
                },
              })
            : '',
        ]
      ),
      props.advanceSearch === true && activator.value
        ? h(
            BsPopover,
            {
              space: 2,
              color: undefined,
              class: props.popoverCls,
              placement: props.popoverPlacement,
              transition: props.popoverTransition,
              open: isPopoverOpen.value,
              trigger: activator.value,
              style: {
                minWidth: Helper.cssUnit(popoverWidth(props, activator)),
              },
              'onUpdate:open': (value: boolean) => {
                isPopoverOpen.value = value;
                value ? emit('open') : emit('close');
              },
            },
            {
              default: () => slots.popover && slots.popover(),
            }
          )
        : createCommentVNode(' v-if-advanceSearch '),
    ]
  );
}
