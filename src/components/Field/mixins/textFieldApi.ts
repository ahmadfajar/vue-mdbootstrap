import {
  useOnFieldBlurred,
  useOnFieldFocused,
  useOnFieldNodeMounted,
  useOnFieldValueCleared,
  useOnFieldValueUpdated,
  useOnTextFieldNodeMounted,
} from '@/components/Field/mixins/textFieldEventApi.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import { BsIcon, BsToggleIcon } from '@/components/Icon';
import {
  cssPrefix,
  useRenderTransition,
  useWrapSlot,
  useWrapSlotWithCondition,
} from '@/mixins/CommonApi.ts';
import type {
  MaybeNumberish,
  Numberish,
  PromiseVoidFunction,
  TBsIcon,
  TBsToggleIcon,
  TClassList,
  TFieldComponent,
  TFieldType,
  TIconVariant,
  TInputBaseProps,
  TInputFieldProps,
  TInputTextProps,
  TRecord,
  TTextAreaOptionProps,
  TTextFieldOptionProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, EmitFn, Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, h, toDisplayString, vModelText, withDirectives } from 'vue';

export function useFieldWrapperClasses(
  props: Readonly<TInputFieldProps>,
  hasValidated: boolean,
  hasError: boolean
): TRecord {
  return {
    [`${cssPrefix}field row`]: true,
    [`${cssPrefix}field-filled`]: props.filled,
    [`${cssPrefix}field-outlined`]: props.outlined && !props.filled,
    required: props.required && !props.disabled && !props.readonly,
    readonly: props.readonly && !props.disabled,
    disabled: props.disabled,
    'has-error': hasError,
    'has-success': hasValidated && !hasError,
  };
}

export function useFieldControlClasses<T>(
  slots: Slots,
  props: Readonly<TInputTextProps>,
  localValue: Ref<T>,
  isFocused: Ref<boolean>,
  showAppendIcon: boolean,
  showPrependIcon?: boolean
): TRecord {
  return {
    [`${cssPrefix}field-control`]: true,
    [`${cssPrefix}field-filled`]: props.filled,
    [`${cssPrefix}field-outlined`]: props.outlined && !props.filled,
    // [`${cssPrefix}field-flat`]: props.flat && !props.filled && !props.outlined,
    [`${cssPrefix}floating-label`]: props.floatingLabel,
    'append-icon': showAppendIcon,
    'prepend-icon': props.prependIcon || showPrependIcon || slots['prepend-inner'],
    active: !Helper.isEmpty(localValue.value) || !Helper.isEmpty(props.placeholder),
    focused: isFocused.value,
    disabled: props.disabled,
    readonly: props.readonly && !props.disabled,
  };
}

export function useShowClearButton(
  props: Readonly<TInputFieldProps>,
  localValue: Ref<string | number | (string | number)[] | undefined | null>
): boolean {
  return (
    props.clearButton === true &&
    !Helper.isEmpty(localValue.value) &&
    !props.readonly &&
    !props.disabled
  );
}

function createFieldIcon(
  slots: Slots,
  slotName: string,
  cssClass: TClassList,
  iconName?: string,
  iconSize?: number,
  onClickHandler?: EventListener
): VNode {
  return useWrapSlot(
    slots,
    slotName,
    iconName ? `${slotName}-${iconName}` : Helper.uuid(),
    {
      class: cssClass,
      onClick: onClickHandler,
    },
    iconName
      ? h<TBsIcon>(BsIcon, {
          icon: iconName as Prop<string>,
          size: iconSize as Prop<number | undefined>,
        })
      : undefined
  );
}

export function useCreateFieldWrapper(
  slots: Slots,
  iconSize: number,
  component: TFieldComponent,
  cssClass: ComputedRef<TRecord>,
  props: Readonly<TInputFieldProps>,
  fieldElement: VNode,
  nodeMountedHandler?: (node: VNode) => void,
  wrapperID?: string
): VNode {
  const fieldState = props.disabled ? 'disabled' : props.readonly ? 'readonly' : undefined;
  const fieldVariant =
    props.outlined && (props as TTextFieldOptionProps).rounded
      ? 'outlined-rounded'
      : props.outlined
        ? 'outlined'
        : props.filled && (props as TTextFieldOptionProps).rounded
          ? 'filled-rounded'
          : props.filled
            ? 'filled'
            : 'default';

  return h(
    'div',
    {
      id: wrapperID,
      class: cssClass.value,
      onVnodeMounted: nodeMountedHandler,
      onVnodeUpdated: (node: VNode) => useOnFieldNodeMounted(props, node),
      'data-component': component,
      'data-variant': fieldVariant,
      'data-floating-label': props.floatingLabel,
      'data-state': fieldState,
      'data-disabled': props.disabled,
      'aria-disabled': props.disabled,
    },
    [
      !props.floatingLabel && slots.default && slots.default({ id: props.id }),
      h(
        'div',
        {
          class: `${cssPrefix}field-wrapper col`,
        },
        [
          createFieldIcon(
            slots,
            'prepend-outer',
            `${cssPrefix}prepend-outer`,
            props.prependIconOuter,
            iconSize
          ),
          fieldElement,
          createFieldIcon(
            slots,
            'append-outer',
            `${cssPrefix}append-outer`,
            props.appendIconOuter,
            iconSize
          ),
        ]
      ),
    ]
  );
}

function createOutlineIndicator(props: Readonly<TInputFieldProps>): VNode {
  return props.outlined && !props.filled
    ? h(
        'div',
        {
          class: `${cssPrefix}field-outline-indicator`,
          'aria-hidden': 'true',
        },
        [
          h('div', { class: `${cssPrefix}field-outline-start` }),
          h('div', { class: `${cssPrefix}field-outline-label` }),
          h('div', { class: `${cssPrefix}field-outline-end` }),
        ]
      )
    : createCommentVNode(' v-if-outline-indicator ');
}

function createLineIndicator(props: Readonly<TInputFieldProps>): VNode {
  return !props.outlined
    ? h('div', {
        class: `${cssPrefix}field-line-indicator`,
        'aria-hidden': 'true',
      })
    : createCommentVNode(' v-if-line-indicator ');
}

export function useCreateFieldInnerWrapper(
  slots: Slots,
  component: TFieldComponent,
  props: Readonly<TInputFieldProps>,
  inputFieldNodes: VNode[] | VNode,
  iconSize: number,
  appendIcon?: string,
  prependIcon?: string,
  validationIconNode?: VNode,
  appendActionNode?: VNode,
  prependActionNode?: VNode,
  innerProps?: TRecord,
  activatorProps?: TRecord,
  onAppendIconClick?: EventListener,
  onPrependIconClick?: EventListener
): VNode {
  const children = [
    useWrapSlotWithCondition(
      slots,
      'default',
      props.floatingLabel === true,
      {
        class: `${cssPrefix}field-label`,
      },
      'div',
      { id: props.id }
    ),
  ].concat(Array.isArray(inputFieldNodes) ? inputFieldNodes : [inputFieldNodes]);

  const createFieldElement = () => {
    return h(
      'div',
      {
        class: {
          [`${cssPrefix}field-activator`]: true,
          'has-append-icon': appendIcon,
          'has-prepend-icon': prependIcon,
          'has-prefix': (props as TTextFieldOptionProps).prefix,
          'has-suffix': (props as TTextFieldOptionProps).suffix,
        },
        ...activatorProps,
      },
      children
    );
  };

  return h(
    'div',
    {
      class: `${cssPrefix}field-inner`,
      ...innerProps,
    },
    [
      h('div', { class: `${cssPrefix}field-overlay` }),
      createFieldIcon(
        slots,
        'prepend-inner',
        {
          [`${cssPrefix}prepend-inner`]: true,
          'items-center':
            !props.floatingLabel &&
            ['text-field', 'numeric-field', 'datetime-field'].includes(component as string),
        },
        prependIcon,
        iconSize,
        onPrependIconClick
      ),
      prependActionNode,
      createFieldElement(),
      appendActionNode,
      createFieldIcon(
        slots,
        'append-inner',
        {
          [`${cssPrefix}append-inner`]: true,
          'items-center':
            !props.floatingLabel &&
            ['text-field', 'numeric-field', 'datetime-field'].includes(component as string),
        },
        appendIcon,
        iconSize,
        onAppendIconClick
      ),
      validationIconNode,
      createLineIndicator(props),
      createOutlineIndicator(props),
    ]
  );
}

export function useInputFieldBaseAttrs(props: Readonly<TInputBaseProps>): TRecord {
  return {
    id: props.id,
    name: props.name,
    disabled: props.disabled,
    required: props.required,
    readonly: props.readonly,
  };
}

export function useInputTextFieldAttrs(
  props: Readonly<TInputTextProps>,
  autocomplete: string | boolean | null
): TRecord {
  const showPlaceHolder = !Helper.isEmpty(props.placeholder); // && !props.readonly && !props.disabled;

  return {
    autocomplete: autocomplete,
    placeholder: showPlaceHolder ? props.placeholder : undefined,
    'aria-placeholder': showPlaceHolder ? props.placeholder : undefined,
    'aria-disabled': props.disabled,
    'aria-required': props.required && !props.disabled && !props.readonly,
    'aria-readonly': props.readonly && !props.disabled,
  };
}

export declare interface InputTextEventEmitter<T> {
  clear: () => void;
  blur: (evt: Event) => void;
  focus: (evt: Event) => void;
  keydown: (evt: Event) => void;
  'update:model-value': (value: T) => void;
}

function createTextInputField(
  emit: EmitFn<InputTextEventEmitter<MaybeNumberish>>,
  props: Readonly<TTextFieldOptionProps>,
  type: TFieldType | undefined,
  autocomplete: string | boolean | null,
  localValue: Ref<MaybeNumberish>,
  isFocused: Ref<boolean>
): VNode[] {
  return [
    props.prefix && (isFocused.value || localValue.value)
      ? h('div', { class: `${cssPrefix}field-prefix` }, toDisplayString(props.prefix))
      : createCommentVNode(' v-if-prefix '),
    withDirectives(
      h('input', {
        ...useInputFieldBaseAttrs(props),
        ...useInputTextFieldAttrs(props, autocomplete),
        role: 'textbox',
        type: type,
        list: props.datalist,
        maxlength: props.maxlength,
        minlength: props.minlength,
        'onUpdate:modelValue': (value: MaybeNumberish) =>
          useOnFieldValueUpdated<MaybeNumberish>(emit, localValue, value),
        onBlur: (e: Event) => useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
        onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
        onKeydown: (e: KeyboardEvent) => emit('keydown', e),
      }),
      [[vModelText, localValue.value]]
    ),
    props.suffix && (isFocused.value || localValue.value)
      ? h('div', { class: `${cssPrefix}field-suffix` }, toDisplayString(props.suffix))
      : createCommentVNode(' v-if-suffix '),
  ];
}

export function useCreateFieldActionIcon(
  component: TFieldComponent,
  props: Readonly<TInputFieldProps>,
  showClearButton: boolean,
  iconVariant: TIconVariant,
  iconSize?: number,
  clearHandler?: PromiseVoidFunction,
  showPasswordToggle?: boolean,
  passwordToggled?: Ref<boolean>,
  passwordToggleHandler?: (value: boolean) => void
): VNode {
  return useRenderTransition(
    { name: 'fade' },
    showClearButton || showPasswordToggle
      ? h(
          'div',
          {
            class: {
              [`${cssPrefix}action-icon`]: true,
              'items-center':
                !props.floatingLabel &&
                ['text-field', 'numeric-field', 'datetime-field'].includes(component as string),
            },
          },
          [
            showClearButton
              ? h<TBsIcon>(BsIcon, {
                  class: 'icon-clear',
                  icon: `cancel_${iconVariant}` as Prop<string>,
                  size: iconSize as Prop<Numberish>,
                  onClick: clearHandler,
                })
              : undefined,
            showPasswordToggle
              ? h<TBsToggleIcon>(BsToggleIcon, {
                  icon: `visibility_${iconVariant}` as Prop<string>,
                  toggleIcon: `visibility_off_${iconVariant}` as Prop<string>,
                  size: iconSize as Prop<Numberish>,
                  modelValue: passwordToggled?.value as unknown as Prop<boolean | undefined>,
                  'onUpdate:model-value': passwordToggleHandler,
                })
              : undefined,
          ]
        )
      : createCommentVNode(' v-if-action-icon ')
  );
}

export function useCreateValidationIcon(
  iconVariant: TIconVariant,
  hasValidated: boolean,
  hasError: boolean,
  showIcon: boolean,
  iconSize?: number
): VNode {
  if (showIcon) {
    return useRenderTransition(
      { name: 'fade' },
      hasValidated || hasError
        ? h('div', { class: `${cssPrefix}validation-icon` }, [
            hasValidated && hasError
              ? h<TBsIcon>(BsIcon, {
                  class: 'icon-error text-danger',
                  icon: `error_${iconVariant}` as Prop<string>,
                  size: iconSize as Prop<Numberish>,
                })
              : hasValidated && !hasError
                ? h<TBsIcon>(BsIcon, {
                    class: 'icon-success text-success',
                    icon: `check_${iconVariant}` as Prop<string>,
                    size: iconSize as Prop<Numberish>,
                  })
                : undefined,
          ])
        : createCommentVNode(' v-if-validation-icon ')
    );
  }

  return createCommentVNode(' v-if-validation-icon ');
}

export function useRenderTextField(
  slots: Slots,
  emit: EmitFn<InputTextEventEmitter<MaybeNumberish>>,
  props: Readonly<TTextFieldOptionProps>,
  wrapperCss: ComputedRef<TRecord>,
  controlCss: ComputedRef<TRecord>,
  fieldType: TFieldType | undefined,
  localValue: Ref<MaybeNumberish>,
  isFocused: Ref<boolean>,
  passwordToggled: Ref<boolean>,
  autocomplete: string | boolean | null,
  showClearButton: ComputedRef<boolean>,
  showPasswordToggle: ComputedRef<boolean>,
  showHelpText: ComputedRef<boolean>,
  showValidationError: ComputedRef<boolean>,
  hasValidated: ComputedRef<boolean>,
  hasError: ComputedRef<boolean>,
  errorItems: ComputedRef<string[]>,
  passwordToggleHandler: (value: boolean) => void
): VNode {
  const iconSize = 24;

  return useCreateFieldWrapper(
    slots,
    iconSize,
    'text-field',
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
          'text-field',
          props,
          createTextInputField(emit, props, fieldType, autocomplete, localValue, isFocused),
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
          useCreateFieldActionIcon(
            'text-field',
            props,
            showClearButton.value,
            props.actionIconVariant as TIconVariant,
            iconSize,
            async () => await useOnFieldValueCleared(emit, localValue),
            showPasswordToggle.value,
            passwordToggled,
            passwordToggleHandler
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

function createTextAreaInputField(
  emit: EmitFn<InputTextEventEmitter<string | null | undefined>>,
  props: Readonly<TTextAreaOptionProps>,
  inputRef: Ref<HTMLTextAreaElement | undefined>,
  localValue: Ref<string | undefined | null>,
  rowHeight: Ref<MaybeNumberish>,
  isFocused: Ref<boolean>,
  autocomplete: string | boolean | null
): VNode {
  const canGrow = props.autoGrow && !props.noResize;

  return withDirectives(
    h('textarea', {
      ...useInputFieldBaseAttrs(props),
      ...useInputTextFieldAttrs(props, autocomplete),
      ref: inputRef,
      role: 'textbox',
      rows: canGrow ? 2 : props.rows && !props.rowHeight ? props.rows : undefined,
      style: rowHeight.value && {
        height: Helper.cssUnit(rowHeight.value),
      },
      'onUpdate:modelValue': (value: string | undefined | null) =>
        useOnFieldValueUpdated(emit, localValue, value),
      onBlur: (e: Event) => useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
      onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
      onKeydown: (e: KeyboardEvent) => emit('keydown', e),
      onInput: (e: InputEvent): void => {
        if (canGrow) {
          const target = e.target as HTMLTextAreaElement;
          target.parentElement && (target.parentElement.dataset.clone = target.value);
          // target.style.height = 'auto';
          // nextTick().then(() => {
          //     rowHeight.value = Helper.cssUnit(target.scrollHeight);
          //     target.style.height = Helper.cssUnit(target.scrollHeight) || 'auto';
          // });
        }
      },
    }),
    [[vModelText, localValue.value, undefined, { lazy: true }]]
  );
}

export function useRenderTextArea(
  slots: Slots,
  emit: EmitFn<InputTextEventEmitter<string | null | undefined>>,
  props: Readonly<TTextAreaOptionProps>,
  wrapperCss: ComputedRef<TRecord>,
  controlCss: ComputedRef<TRecord>,
  inputRef: Ref<HTMLTextAreaElement | undefined>,
  localValue: Ref<string | undefined | null>,
  rowHeight: Ref<MaybeNumberish>,
  isFocused: Ref<boolean>,
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
    'textarea-field',
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
          'textarea-field',
          props,
          createTextAreaInputField(
            emit,
            props,
            inputRef,
            localValue,
            rowHeight,
            isFocused,
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
          useCreateFieldActionIcon(
            'textarea-field',
            props,
            showClearButton.value,
            props.actionIconVariant as TIconVariant,
            iconSize,
            async () => await useOnFieldValueCleared(emit, localValue)
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
    (node: VNode) => onTextAreaNodeMounted(props, node)
  );
}

function onTextAreaNodeMounted(props: Readonly<TInputTextProps>, node: VNode): void {
  useOnFieldNodeMounted(props, node);
  const element = node.el as HTMLElement;

  if (props.autofocus) {
    Helper.defer(() => {
      const input = element.querySelector('textarea');
      input?.focus();
    }, 250);
  }
}
