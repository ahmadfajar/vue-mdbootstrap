import { BsRipple } from '@/components/Animation';
import {
  useCreateFieldInnerWrapper,
  useCreateFieldWrapper,
  useCreateValidationIcon,
  useInputFieldBaseAttrs,
  useInputTextFieldAttrs,
  type InputTextEventEmitter,
} from '@/components/Field/mixins/textFieldApi.ts';
import {
  useOnFieldBlurred,
  useOnFieldFocused,
  useOnFieldValueCleared,
  useOnFieldValueUpdated,
  useOnTextFieldNodeMounted,
} from '@/components/Field/mixins/textFieldEventApi.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import type {
  PromiseVoidFunction,
  TActionButtonPlacement,
  TBsIcon,
  TIconVariant,
  TNumericFieldOptionProps,
  TNumericOptions,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, EmitFn, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, toDisplayString } from 'vue';

function createMinusButton(
  props: Readonly<TNumericFieldOptionProps>,
  clickHandler: () => void
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}btn-icon`, `${cssPrefix}btn-sm`],
      onClick: clickHandler,
    },
    [
      h(
        BsRipple,
        {
          class: ['flex', 'items-center', 'justify-center'],
          disabled: props.disabled as unknown as Prop<boolean>,
          tag: 'span' as Prop<string>,
        },
        {
          default: () =>
            h(BsIcon, {
              icon: `do_not_disturb_on_${props.actionIconVariant}` as Prop<string>,
              size: 24 as Prop<number>,
            }),
        }
      ),
    ]
  );
}

function createPlusButton(
  props: Readonly<TNumericFieldOptionProps>,
  clickHandler: () => void
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}btn-icon`, `${cssPrefix}btn-sm`],
      onClick: clickHandler,
    },
    [
      h(
        BsRipple,
        {
          class: ['flex', 'items-center', 'justify-center'],
          disabled: props.disabled as unknown as Prop<boolean>,
          tag: 'span' as Prop<string>,
        },
        {
          default: () =>
            h(BsIcon, {
              icon: `add_circle_${props.actionIconVariant}` as Prop<string>,
              size: 24 as Prop<number>,
            }),
        }
      ),
    ]
  );
}

function createActionButtons(
  props: Readonly<TNumericFieldOptionProps>,
  position: TActionButtonPlacement,
  incrementValueHandler: VoidFunction,
  decrementValueHandler: VoidFunction
): VNode {
  const children = [];

  if (position === 'left' && props.actionButtonPlacement === 'both') {
    children.push(createMinusButton(props, decrementValueHandler));
  } else if (position === 'right' && props.actionButtonPlacement === 'both') {
    children.push(createPlusButton(props, incrementValueHandler));
  } else {
    children.push(
      createMinusButton(props, decrementValueHandler),
      createPlusButton(props, incrementValueHandler)
    );
  }

  return h(
    'div',
    {
      class: [`${cssPrefix}action-button-${position}`, 'flex', 'items-center'],
    },
    children
  );
}

function createSpinnerButton(
  props: Readonly<TNumericFieldOptionProps>,
  position: 'left' | 'right',
  incrementValueHandler: VoidFunction,
  decrementValueHandler: VoidFunction
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}spin-button-${position}`, 'flex', 'flex-col'],
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}btn`, `${cssPrefix}spin-up`],
          onClick: incrementValueHandler,
        },
        [
          h(
            BsRipple,
            {
              class: ['flex', 'justify-center'],
              disabled: props.disabled as unknown as Prop<boolean>,
              tag: 'span' as Prop<string>,
            },
            {
              default: () =>
                h('span', {
                  class: 'caret-up',
                }),
            }
          ),
        ]
      ),
      h(
        'div',
        {
          class: [`${cssPrefix}btn`, `${cssPrefix}spin-down`],
          onClick: decrementValueHandler,
        },
        [
          h(
            BsRipple,
            {
              class: ['flex', 'justify-center'],
              disabled: props.disabled as unknown as Prop<boolean>,
              tag: 'span' as Prop<string>,
            },
            {
              default: () =>
                h('span', {
                  class: 'caret-down',
                }),
            }
          ),
        ]
      ),
    ]
  );
}

function createAppendFieldActionNode(
  props: Readonly<TNumericFieldOptionProps>,
  showClearButton: boolean,
  hasValidated: boolean,
  hasError: boolean,
  iconSize: number,
  clearHandler: PromiseVoidFunction,
  incrementValueHandler: () => void,
  decrementValueHandler: () => void
): VNode {
  return useRenderTransition(
    { name: 'fade' },
    showClearButton ||
      hasValidated ||
      hasError ||
      (props.actionButton && ['right', 'both'].includes(props.actionButtonPlacement as string))
      ? h(
          'div',
          {
            class: { [`${cssPrefix}action-icon`]: true, 'items-center': !props.floatingLabel },
          },
          [
            showClearButton
              ? h<TBsIcon>(BsIcon, {
                  class: 'icon-clear',
                  icon: `cancel_${props.actionIconVariant}` as Prop<string>,
                  size: iconSize as Prop<number | undefined>,
                  onClick: clearHandler,
                })
              : undefined,
            !props.disabled &&
            !props.readonly &&
            props.actionButton === 'up-down' &&
            ['right', 'both'].includes(props.actionButtonPlacement as string)
              ? createSpinnerButton(props, 'right', incrementValueHandler, decrementValueHandler)
              : !props.disabled &&
                  !props.readonly &&
                  props.actionButton === 'plus-minus' &&
                  ['right', 'both'].includes(props.actionButtonPlacement as string)
                ? createActionButtons(props, 'right', incrementValueHandler, decrementValueHandler)
                : '',
          ]
        )
      : createCommentVNode(' v-if-action-icon ')
  );
}

function createPrependFieldActionNode(
  props: Readonly<TNumericFieldOptionProps>,
  incrementValueHandler: () => void,
  decrementValueHandler: () => void
): VNode {
  if (
    !props.disabled &&
    !props.readonly &&
    props.actionButton === 'up-down' &&
    props.actionButtonPlacement === 'left'
  ) {
    return h(
      'div',
      {
        class: `${cssPrefix}action-icon`,
      },
      [createSpinnerButton(props, 'left', incrementValueHandler, decrementValueHandler)]
    );
  } else if (
    !props.disabled &&
    !props.readonly &&
    props.actionButton === 'plus-minus' &&
    ['left', 'both'].includes(props.actionButtonPlacement as string)
  ) {
    return h(
      'div',
      {
        class: [
          `${cssPrefix}action-icon`,
          `${cssPrefix}button-wrapper-${props.actionButtonPlacement}`,
        ],
      },
      [createActionButtons(props, 'left', incrementValueHandler, decrementValueHandler)]
    );
  }

  return createCommentVNode(' v-if-action-button ');
}

function isLessOrEqualMaxValue(value: number, options: TNumericOptions): boolean {
  return !Helper.isNumber(options.maxValue) ? true : value <= options.maxValue;
}

function isGreaterOrEqualMinValue(value: number, options: TNumericOptions): boolean {
  return !Helper.isNumber(options.minValue) ? true : value >= options.minValue;
}

function decrementValue(
  emit: EmitFn<InputTextEventEmitter<number | null | undefined>>,
  props: Readonly<TNumericFieldOptionProps>,
  options: TNumericOptions,
  localValue: Ref<number | null | undefined>
): void {
  if (!props.disabled && !props.readonly) {
    let result = (localValue.value || 0.0) - options.step;
    if (parseInt(props.maxFraction as string) === 0) {
      result = Math.round(result);
    }

    if (isGreaterOrEqualMinValue(result, options) && isLessOrEqualMaxValue(result, options)) {
      useOnFieldValueUpdated(emit, localValue, result);
    }
  }
}

function incrementValue(
  emit: EmitFn<InputTextEventEmitter<number | null | undefined>>,
  props: Readonly<TNumericFieldOptionProps>,
  options: TNumericOptions,
  localValue: Ref<number | null | undefined>
): void {
  if (!props.disabled && !props.readonly) {
    let result = (localValue.value ?? 0.0) + options.step;
    if (parseInt(props.maxFraction as string) === 0) {
      result = Math.round(result);
    }

    if (isGreaterOrEqualMinValue(result, options) && isLessOrEqualMaxValue(result, options)) {
      useOnFieldValueUpdated(emit, localValue, result);
    }
  }
}

function createNumericInputField(
  emit: EmitFn<InputTextEventEmitter<number | null | undefined>>,
  props: Readonly<TNumericFieldOptionProps>,
  numericOptions: TNumericOptions,
  formatOptions: Intl.NumberFormatOptions,
  inputRef: Ref<HTMLElement | null>,
  localValue: Ref<number | null | undefined>,
  hasFocus: Ref<boolean>,
  autocomplete: string | boolean | null
): VNode[] {
  let displayValue =
    hasFocus.value && !props.disabled && !props.readonly
      ? localValue.value?.toString(10)
      : localValue.value?.toLocaleString(numericOptions.locale, formatOptions);

  return [
    props.prefix && (hasFocus.value || localValue.value)
      ? h('div', { class: `${cssPrefix}field-prefix` }, toDisplayString(props.prefix))
      : createCommentVNode(' v-if-prefix '),
    h('input', {
      ...useInputFieldBaseAttrs(props),
      ...useInputTextFieldAttrs(props, autocomplete),
      ref: inputRef,
      role: 'textbox',
      type: 'text',
      value: displayValue,
      onBlur: (e: Event) => useOnFieldBlurred(emit, e, hasFocus, props.disabled as boolean),
      onChange: () => {
        const field = inputRef.value as HTMLInputElement;
        if (field.value == null || field.value === '') {
          useOnFieldValueUpdated(emit, localValue, null);
          displayValue = '';
        } else {
          const result = parseFloat(field.value);
          if (
            isGreaterOrEqualMinValue(result, numericOptions) &&
            isLessOrEqualMaxValue(result, numericOptions)
          ) {
            useOnFieldValueUpdated(emit, localValue, result);
            displayValue = result.toLocaleString(numericOptions.locale, formatOptions);
          }
        }
      },
      onFocus: (e: Event) => {
        if (!props.disabled && !props.readonly) {
          displayValue = localValue.value?.toString();
        }
        useOnFieldFocused(emit, e, hasFocus, props.disabled as boolean);
      },
      onKeydown: (e: KeyboardEvent) => {
        const incrementKey = ['Up', 'ArrowUp'];
        const decrementKey = ['Down', 'ArrowDown'];
        const specialKey = [
          'Left',
          'ArrowLeft',
          'Right',
          'ArrowRight',
          'Esc',
          'Escape',
          'End',
          'Tab',
          'Enter',
          'Home',
          'PageDown',
          'PageUp',
          'Backspace',
          'Clear',
          'Delete',
          'Copy',
          'Cut',
          'EraseEof',
        ];

        if (specialKey.includes(e.key)) {
          emit('keydown', e);
        } else if (/^-?\d*[.]?\d*$/.test(e.key)) {
          emit('keydown', e);
        } else if (incrementKey.includes(e.key) && !props.disabled && !props.readonly) {
          incrementValue(emit, props, numericOptions, localValue);
        } else if (decrementKey.includes(e.key) && !props.disabled && !props.readonly) {
          decrementValue(emit, props, numericOptions, localValue);
        } else {
          e.preventDefault();
        }
      },
    }),
    props.suffix && (hasFocus.value || localValue.value)
      ? h('div', { class: `${cssPrefix}field-suffix` }, toDisplayString(props.suffix))
      : createCommentVNode(' v-if-suffix '),
  ];
}

export function useRenderNumericField(
  slots: Slots,
  emit: EmitFn<InputTextEventEmitter<number | null | undefined>>,
  props: Readonly<TNumericFieldOptionProps>,
  operationOptions: TNumericOptions,
  formatOptions: Intl.NumberFormatOptions,
  wrapperCss: ComputedRef<TRecord>,
  controlCss: ComputedRef<TRecord>,
  localValue: Ref<number | null | undefined>,
  inputRef: Ref<HTMLElement | null>,
  hasFocus: Ref<boolean>,
  autocomplete: string | boolean | null,
  showClearButton: ComputedRef<boolean>,
  showHelpText: ComputedRef<boolean>,
  showValidationError: ComputedRef<boolean>,
  hasValidated: ComputedRef<boolean>,
  hasError: ComputedRef<boolean>,
  errorItems: ComputedRef<string[]>
): VNode {
  const iconSize = 24;

  return useCreateFieldWrapper(
    slots,
    iconSize,
    'numeric-field',
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
          'numeric-field',
          props,
          createNumericInputField(
            emit,
            props,
            operationOptions,
            formatOptions,
            inputRef,
            localValue,
            hasFocus,
            autocomplete
          ),
          iconSize,
          props.appendIcon,
          props.prependIcon,
          useCreateValidationIcon(
            props.actionIconVariant as TIconVariant,
            hasValidated.value,
            hasError.value,
            props.validationIcon as boolean,
            iconSize
          ),
          createAppendFieldActionNode(
            props,
            showClearButton.value,
            hasValidated.value,
            hasError.value,
            iconSize,
            async () => await useOnFieldValueCleared(emit, localValue),
            () => incrementValue(emit, props, operationOptions, localValue),
            () => decrementValue(emit, props, operationOptions, localValue)
          ),
          createPrependFieldActionNode(
            props,
            () => incrementValue(emit, props, operationOptions, localValue),
            () => decrementValue(emit, props, operationOptions, localValue)
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
