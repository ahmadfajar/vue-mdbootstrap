import { BsButton } from '@/components/Button';
import {
  useOnFieldBlurred,
  useOnFieldFocused,
  useOnFieldValueCleared,
  useOnFieldValueUpdated,
} from '@/components/Field/mixins/textFieldEventApi.ts';
import { BsPopover } from '@/components/Popover';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type {
  TBsButton,
  TButtonMode,
  TButtonSize,
  TContextColor,
  TPopoverPosition,
  TRecord,
  TSearchFieldOptionProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, EmitFn, Prop, Ref, Slots, VNode } from 'vue';
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
  search: (value: string | null | undefined) => void;
  'update:model-value': (value: string | null | undefined) => void;
}

function dispatchSearch(
  emit: EmitFn<SearchEventEmitter>,
  localValue: Ref<string | undefined | null>
) {
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
  localValue: Ref<string | undefined | null>,
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
            color: (props.darkMode ? 'light' : 'secondary') as Prop<TContextColor>,
            icon: 'search' as Prop<string>,
            mode: 'icon' as Prop<TButtonMode>,
            size: 'sm' as Prop<TButtonSize>,
            flat: true as unknown as Prop<boolean>,
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
            ? h<TBsButton>(BsButton, {
                color: (props.darkMode ? 'light' : 'secondary') as Prop<TContextColor>,
                icon: 'clear' as Prop<string>,
                mode: 'icon' as Prop<TButtonMode>,
                size: 'sm' as Prop<TButtonSize>,
                flat: true as unknown as Prop<boolean>,
                onClick: async () => {
                  if (!props.disabled && !props.readonly) {
                    await useOnFieldValueCleared(emit, localValue);
                  }
                },
              })
            : '',
          props.advanceSearch
            ? h<TBsButton>(BsButton, {
                color: (props.darkMode ? 'light' : 'secondary') as Prop<TContextColor>,
                icon: 'arrow_drop_down' as Prop<string>,
                mode: 'icon' as Prop<TButtonMode>,
                size: 'sm' as Prop<TButtonSize>,
                flat: true as unknown as Prop<boolean>,
                onClick: () => {
                  if (!props.readonly && !props.disabled) {
                    const open = isPopoverOpen.value;
                    isPopoverOpen.value = !open;
                    // @ts-expect-error: Dispatch emit with arg expression
                    emit(isPopoverOpen.value ? 'open' : 'close');
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
              space: 2 as Prop<number>,
              color: null,
              class: props.popoverCls,
              placement: props.popoverPlacement as Prop<TPopoverPosition>,
              transition: props.popoverTransition as Prop<string>,
              open: isPopoverOpen.value as unknown as Prop<boolean>,
              trigger: activator.value as Prop<HTMLElement>,
              style: {
                minWidth: Helper.cssUnit(popoverWidth(props, activator)),
              },
              'onUpdate:open': (value: boolean) => {
                isPopoverOpen.value = value;
                // @ts-expect-error: Dispatch emit with arg expression
                emit(value ? 'open' : 'close');
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
