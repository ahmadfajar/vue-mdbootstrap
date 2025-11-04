import { BsRipple } from '@/components/Animation';
import { useInputFieldBaseAttrs } from '@/components/Field/mixins/textFieldApi.ts';
import {
  useGetErrorItems,
  useHasValidated,
  useHasValidationError,
  useRenderFieldFeedback,
  useShowValidationError,
} from '@/components/Field/mixins/validationApi.ts';
import { BsRadio } from '@/components/Radio';
import { cssPrefix, useWrapSlot } from '@/mixins/CommonApi.ts';
import type {
  Numberish,
  PromiseVoidFunction,
  TBsRadio,
  TBsRipple,
  TInputBaseProps,
  TInputGroupProps,
  TRadioGroupOptionProps,
  TRadioInputProps,
  TRadioOptionProps,
  TRecord,
  TValidationProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import {
  computed,
  h,
  renderSlot,
  type ComputedRef,
  type Prop,
  type Ref,
  type Slots,
  type VNode,
  type VNodeArrayChildren,
} from 'vue';

export function useRadioClasses(props: Readonly<TRadioOptionProps>): TRecord {
  return {
    [`${cssPrefix}radio`]: true,
    [`radio-${props.color}`]: props.color != null,
    'inline-flex': true,
    relative: true,
    checked: props.value === props.modelValue,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly && !props.disabled,
  };
}

export function useCheckSelected(props: Readonly<TRadioOptionProps>): boolean {
  if (props.modelValue && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }

  return props.value === props.modelValue;
}

export function useCreateInputRadioOrCheckbox(
  props: Readonly<TRadioOptionProps>,
  inputType: 'checkbox' | 'radio',
  otherProps?: TRecord
): VNode {
  const thisValue = !Helper.isEmpty(props.value)
    ? Helper.isObject(props.value)
      ? JSON.stringify(props.value)
      : String(props.value)
    : '';

  let inputProps = {
    ...useInputFieldBaseAttrs(props),
    type: inputType,
    role: inputType,
    value: thisValue,
    'aria-disabled': props.disabled,
    'aria-checked': useCheckSelected(props),
  };

  if (!Helper.isEmptyObject(otherProps)) {
    inputProps = {
      ...inputProps,
      ...otherProps,
    };
  }

  return h('input', inputProps);
}

export function useRenderRadioOrCheckbox(
  slots: Slots,
  props: Readonly<TRadioOptionProps>,
  classnames: ComputedRef<TRecord>,
  rippleActive: Ref<boolean>,
  inputType: 'checkbox' | 'radio',
  inputElement: VNode,
  toggleCheckHandler: PromiseVoidFunction
): VNode {
  return h(
    'div',
    {
      class: classnames.value,
      'data-checked': useCheckSelected(props),
      'data-required': props.required ? 'true' : undefined,
      'data-disabled': props.disabled ? 'true' : undefined,
      'data-readonly': props.readonly && !props.disabled ? 'true' : undefined,
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}${inputType}-inner`, 'relative'],
          onClick: toggleCheckHandler,
        },
        [
          h('div', { class: [`${cssPrefix}${inputType}-overlay`, 'absolute'] }),
          h<TBsRipple>(
            BsRipple,
            {
              centered: true as unknown as Prop<boolean>,
              active: rippleActive.value as unknown as Prop<boolean>,
              disabled: (props.disabled || props.readonly) as unknown as Prop<boolean>,
              'onUpdate:active': (value: boolean): void => {
                rippleActive.value = value;
              },
            },
            {
              default: () => inputElement,
            }
          ),
        ]
      ),
      useWrapSlot(
        slots,
        'default',
        Helper.uuid(),
        {
          for: props.id,
          tabIndex: 0,
          class: [`${cssPrefix}${inputType}-label`, 'relative', 'select-none'],
          onClickPrevent: toggleCheckHandler,
          onKeydown: async (e: KeyboardEvent) => {
            if (['Space', 'Enter'].includes(e.code)) {
              await toggleCheckHandler();
              e.preventDefault();
            }
          },
        },
        undefined,
        'label'
      ),
    ]
  );
}

export function useInputGroupClasses<D, M>(
  props: Readonly<TInputGroupProps<D, M>>,
  hasValidated: boolean,
  hasError: boolean
): TRecord {
  return {
    [`${cssPrefix}field row`]: true,
    required: props.required,
    readonly: props.readonly,
    disabled: props.disabled,
    'has-error': hasError,
    'has-success': hasValidated && !hasError,
  };
}

export function useCreateRadioItems(
  props: Readonly<TRadioGroupOptionProps>,
  toggleCheckHandler: (item: TRadioInputProps) => void
): VNodeArrayChildren {
  return props.items.map((it, idx) => {
    return h('div', { class: 'col', key: `radio-${idx}` }, [
      h<TBsRadio>(
        BsRadio,
        {
          color: (it.color || props.color) as Prop<string>,
          disabled: (it.disabled || props.disabled) as unknown as Prop<boolean>,
          readonly: (it.readonly || props.readonly) as unknown as Prop<boolean>,
          value: it.value as Prop<Numberish | boolean | unknown>,
          // prettier-ignore
          name: (it.name ? it.name : props.name ? props.name : undefined) as Prop<Numberish | undefined>,
          modelValue: props.modelValue as Prop<Numberish | boolean | unknown>,
          'onUpdate:model-value': (): void => toggleCheckHandler(it),
        },
        {
          default: () => it.label,
        }
      ),
    ]);
  });
}

export function useRenderRadioOrCheckboxGroup<D, M>(
  slots: Slots,
  props: Readonly<TInputGroupProps<D, M>>,
  classnames: ComputedRef<TRecord>,
  children: VNodeArrayChildren,
  showValidationError: boolean,
  showHelpText: boolean,
  hasError: boolean,
  errorItems: string[]
): VNode {
  const numCols = props.column ? parseInt(props.column as string, 10) : undefined;

  return h('div', { class: classnames.value }, [
    renderSlot(slots, 'default'),
    h('div', { class: 'col' }, [
      h(
        'div',
        {
          class: {
            'row gy-0 gx-2': true,
            'row-cols-1': !props.column || (props.column && props.items.length > 0),
            'row-cols-sm-auto': !props.column && props.items.length < 4,
            'row-cols-sm-2': !props.column && props.items.length > 3,
            'row-cols-lg-3 row-cols-xl-4': !props.column,
            'row-cols-md-2': numCols && numCols > 1 && props.items.length > 3,
            [`row-cols-lg-4`]: numCols && numCols > 4 && props.items.length > 3,
            [`row-cols-lg-${props.column}`]: numCols && numCols > 1 && numCols < 5,
            [`row-cols-xl-${props.column}`]: numCols && numCols > 1,
          },
        },
        children
      ),
      useRenderFieldFeedback(slots, props, showHelpText, showValidationError, hasError, errorItems),
    ]),
  ]);
}

export function useInputGroupValidation(props: TInputBaseProps & TValidationProps) {
  const hasError = computed<boolean>(() => useHasValidationError(props));
  const hasValidated = computed<boolean>(() => useHasValidated(props));
  const showValidationError = computed<boolean>(() => useShowValidationError(props));
  const errorItems = computed(() => useGetErrorItems(props));
  const showHelpText = computed(
    () =>
      !Helper.isEmpty(props.helpText) &&
      props.persistentHelpText === true &&
      !props.persistentHelpOff
  );

  return { showHelpText, hasValidated, hasError, showValidationError, errorItems };
}
