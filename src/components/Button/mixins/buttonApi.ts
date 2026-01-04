import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { BsToggleButton } from '@/components/Button';
import BsButtonInner from '@/components/Button/BsButtonInner.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useGenerateId, useRenderSlot, useWrapSlot } from '@/mixins/CommonApi.ts';
import type {
  MaybeNumberish,
  Numberish,
  TAllowedIconProps,
  TBsButtonInner,
  TBsIcon,
  TBsToggleButton,
  TBsToggleField,
  TButtonMode,
  TButtonOptionProps,
  TCustomIconProps,
  TEmitFn,
  TInputOptionItem,
  TRecord,
  TToggleButtonOptionProps,
  TToggleFieldOptionProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { kebabCase } from '@/utils/StringHelper.ts';
import type {
  ComputedRef,
  EmitFn,
  ExtractPropTypes,
  Prop,
  Ref,
  Slots,
  VNode,
  VNodeArrayChildren,
} from 'vue';
import { h, toDisplayString, vModelCheckbox, vModelRadio, withDirectives } from 'vue';

export function useMakeButtonProps(
  props: Readonly<TButtonOptionProps>,
  disabled: boolean
): TRecord {
  const isPillOff = props.pillOff || props.pill === false;
  const defaultMode = !['icon', 'fab', 'floating'].includes(props.mode!);
  const buttonVariant = props.tonal
    ? 'tonal'
    : props.outlined
      ? 'outlined'
      : props.flat
        ? 'flat'
        : 'default';
  const btnState = disabled
    ? 'disabled'
    : props.readonly
      ? 'readonly'
      : props.active
        ? 'active'
        : undefined;
  const btnType = props.type as string;

  return {
    class: {
      [`${cssPrefix}btn`]: defaultMode,
      [`${cssPrefix}btn-icon`]: props.mode === 'icon',
      [`${cssPrefix}btn-fab`]: ['fab', 'floating'].includes(props.mode as string),
      [`${cssPrefix}btn-${props.size}`]: ['xs', 'sm', 'lg'].includes(props.size!),
      'btn-tonal': props.tonal,
      'btn-raised': props.raised && !['fab', 'floating'].includes(props.mode as string),
      'btn-rounded-sm': defaultMode && isPillOff && !props.rounded,
      'btn-rounded-pill': defaultMode && !isPillOff && !props.rounded,
      [`btn-${props.color}`]: props.color && !props.outlined && !props.flat,
      [`btn-outline-${props.color}`]: props.color && props.outlined && !props.tonal,
      [`btn-flat-${props.color}`]: props.color && props.flat && !props.outlined && !props.tonal,
      disabled: disabled,
      readonly: props.readonly && !disabled,
      active: props.active && !props.readonly && !disabled,
    },
    role: btnType !== 'div' ? 'button' : undefined,
    href:
      !Helper.isEmpty(props.href) && !props.disabled && !props.readonly ? props.href : undefined,
    type: Helper.isEmpty(props.href) && btnType !== 'div' ? props.type : undefined,
    disabled: btnType === 'div' ? undefined : disabled,
    'data-variant': buttonVariant,
    'data-state': btnState,
    'data-disabled': btnType === 'div' ? undefined : disabled,
    'aria-disabled': btnType === 'div' ? undefined : disabled,
  };
}

function renderSlotIcon(
  slots: Slots,
  name: string,
  btnMode: TButtonMode | undefined,
  props: Readonly<TAllowedIconProps & TCustomIconProps>,
  iconId: string,
  slotArgs?: TRecord
): VNode {
  if (slots && slots[name]) {
    return useWrapSlot(
      slots,
      name,
      iconId,
      {
        class: {
          'inline-flex': true,
          [`${cssPrefix}icon-${props.iconPosition}`]:
            btnMode === 'default' ||
            (['fab', 'floating'].includes(btnMode as string) && slots.default),
          [`${cssPrefix}empty-icon`]:
            !Helper.isFunction(slots[name]) || Helper.isEmpty(slots[name]?.call(undefined)),
        },
        style:
          props.iconSize && slots[name]?.call(undefined) != null
            ? {
                height: Helper.cssUnit(props.iconSize),
                width: Helper.cssUnit(props.iconSize),
              }
            : undefined,
      },
      undefined,
      'span',
      slotArgs
    );
  } else {
    return useRenderSlot(
      slots,
      name,
      { key: iconId },
      !Helper.isEmpty(props.icon)
        ? h<TBsIcon>(BsIcon, {
            // id: iconId,
            class: {
              [`${cssPrefix}icon-${props.iconPosition}`]:
                btnMode === 'default' ||
                (['fab', 'floating'].includes(btnMode as string) && slots.default),
            },
            size: props.iconSize as Prop<Numberish | undefined>,
            ...useCreateIconProps(props),
          })
        : [],
      slotArgs
    );
  }
}

export function useRenderButtonContent(
  slots: Slots,
  props: Readonly<TButtonOptionProps>,
  iconId: string
): VNodeArrayChildren {
  return [
    props.iconPosition === 'left' ? renderSlotIcon(slots, 'icon', props.mode, props, iconId) : '',
    slots.default && slots.default(),
    props.iconPosition === 'right' ? renderSlotIcon(slots, 'icon', props.mode, props, iconId) : '',
  ];
}

function isInputItemSelected(
  props: Readonly<TToggleButtonOptionProps>,
  item: TInputOptionItem
): boolean {
  if (props.multiple && Array.isArray(props.modelValue) && !Array.isArray(item.value)) {
    const sources = props.modelValue as Array<string | number | boolean>;
    return sources.find((it: string | number | boolean) => it === item.value) != null;
  } else {
    return props.modelValue === item.value;
  }
}

function makeToggleItemInputAttrs(
  item: TInputOptionItem,
  props: Readonly<TToggleButtonOptionProps>
): TRecord {
  const attr = {
    id: item.id || useGenerateId(),
    role: props.multiple ? 'checkbox' : 'radio',
    type: props.multiple ? 'checkbox' : 'radio',
    name: props.multiple ? item.name : props.name,
    required: props.required,
    disabled: props.disabled || item.disabled,
    readonly: props.readonly || item.readonly,
    'aria-disabled': props.disabled || item.disabled,
    'aria-checked': isInputItemSelected(props, item),
  };

  if (props.multiple) {
    return {
      ...attr,
      'true-value': true,
      'false-value': false,
    };
  }

  return attr;
}

function makeToggleItemInputElement(
  props: Readonly<TToggleButtonOptionProps>,
  localValue: Ref<MaybeNumberish | boolean | unknown[]>,
  item: TInputOptionItem,
  emit: EmitFn
): VNode {
  return withDirectives(
    h('input', {
      class: 'hidden',
      value: item.value,
      ...makeToggleItemInputAttrs(item, props),
      'onUpdate:modelValue': (value: string | number | boolean) => {
        if (!props.disabled && !props.readonly && !item.disabled && !item.readonly) {
          localValue.value = value;
          emit('update:model-value', localValue.value);
        }
      },
    }),
    [props.multiple ? [vModelCheckbox, localValue.value] : [vModelRadio, localValue.value]]
  );
}

function makeToggleButtonItemClasses(
  props: Readonly<TToggleButtonOptionProps>,
  item: TInputOptionItem
): TRecord {
  const isSelected = isInputItemSelected(props, item);
  const isPillOff = props.pillOff || props.pill === false;
  const enableColor = !!props.color && (!isSelected || !props.toggleColor);
  const enableToggleColor = isSelected && !!props.toggleColor && !props.disabled && !item.disabled;

  return {
    [`${cssPrefix}btn`]: true,
    [`${cssPrefix}btn-${props.size}`]:
      !Helper.isEmpty(props.size) && ['xs', 'sm', 'lg'].includes(props.size),
    'btn-tonal': props.tonal,
    'btn-raised': props.raised,
    'btn-rounded-sm': isPillOff && !props.rounded,
    'btn-rounded-pill': !isPillOff && !props.rounded,
    [`btn-${props.color}`]: enableColor && !props.outlined,
    [`btn-${props.toggleColor}`]: enableToggleColor,
    [`btn-outline-${props.color}`]: enableColor && props.outlined && !props.tonal,
    [`btn-outline-${props.toggleColor}`]: enableToggleColor && props.outlined && !props.tonal,
    // [`btn-flat-${props.color}`]: props.flat && !props.outlined && !props.tonal && (!isSelected || !props.toggleColor),
    active: isSelected && !props.toggleColor && !props.disabled && !item.disabled,
    selected: isSelected && !props.disabled && !item.disabled,
    disabled: props.disabled || item.disabled,
    readonly: props.readonly || item.readonly,
  };
}

function renderToggleItemContent(
  slots: Slots,
  props: Readonly<TToggleButtonOptionProps>,
  item: TInputOptionItem
): VNodeArrayChildren {
  const cloneProps = { iconSize: props.iconSize, iconPosition: props.iconPosition, ...item };

  return [
    props.iconPosition === 'left'
      ? renderSlotIcon(
          slots,
          'icon',
          'default',
          cloneProps,
          `icon-${item.id || kebabCase(item.label || String(item.value)) || useGenerateId()}`,
          item
        )
      : '',
    useRenderSlot(
      slots,
      'label',
      { key: kebabCase(item.label || String(item.value)) },
      [
        h(
          'span',
          {
            class: `${cssPrefix}btn-text`,
          },
          toDisplayString(item.label || item.value)
        ),
      ],
      item
    ),
    props.iconPosition === 'right'
      ? renderSlotIcon(
          slots,
          'icon',
          'default',
          cloneProps,
          `icon-${item.id || kebabCase(item.label || String(item.value)) || useGenerateId()}`,
          item
        )
      : '',
  ];
}

function rippleOff(props: Readonly<TToggleButtonOptionProps>, item: TInputOptionItem) {
  return props.disabled || props.readonly || item.disabled || item.readonly;
}

export function useRenderToggleButtonItem(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<TToggleButtonOptionProps>,
  localValue: Ref<MaybeNumberish | boolean | unknown[]>,
  item: TInputOptionItem,
  itemIndex: number
): VNode {
  const nLength = props.items?.length - 1;
  const buttonVariant = props.tonal ? 'tonal' : props.outlined ? 'outlined' : 'default';
  const btnState =
    props.disabled || item.disabled
      ? 'disabled'
      : props.readonly || item.readonly
        ? 'readonly'
        : isInputItemSelected(props, item)
          ? 'active'
          : undefined;

  return h(
    'label',
    {
      key: `btn-item-${itemIndex + 1}`,
      tabIndex: 0,
      class: {
        ...makeToggleButtonItemClasses(props, item),
        'rounded-e-0': itemIndex < nLength,
        'rounded-s-0': itemIndex > 0,
      },
      'data-variant': buttonVariant,
      'data-state': btnState,
      'data-selected': isInputItemSelected(props, item) ? 'true' : undefined,
      'data-disabled': props.disabled || item.disabled,
      'aria-disabled': props.disabled || item.disabled,
      onKeydown: (e: KeyboardEvent) => {
        if (['Space', 'Enter'].includes(e.code)) {
          (e.target as HTMLElement).focus();

          if (!props.disabled && !props.readonly && !item.disabled && !item.readonly) {
            if (props.multiple) {
              if ((localValue.value as unknown[]).includes(item.value)) {
                localValue.value = (localValue.value as unknown[]).filter(
                  (it) => it !== item.value
                );
              } else {
                (localValue.value as unknown[]).push(item.value);
              }
            } else {
              localValue.value = item.value;
            }

            emit('update:model-value', localValue.value);
          }

          e.preventDefault();
        } else if (e.code === 'ArrowRight') {
          ((e.target as HTMLLabelElement).nextElementSibling as HTMLLabelElement)?.focus();
        } else if (e.code === 'ArrowLeft') {
          ((e.target as HTMLLabelElement).previousElementSibling as HTMLLabelElement)?.focus();
        }
      },
    },
    [
      makeToggleItemInputElement(props, localValue, item, emit),
      h<TBsButtonInner>(
        BsButtonInner,
        {
          class: {
            'rounded-e-0': itemIndex < nLength,
            'rounded-s-0': itemIndex > 0,
          },
          rippleOff: rippleOff(props, item) as unknown as Prop<boolean>,
        },
        {
          default: () => renderToggleItemContent(slots, props, item),
        }
      ),
    ]
  );
}

export function useRenderToggleFieldButton(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<ExtractPropTypes<TBsToggleField>>,
  wrapperCss: ComputedRef<TRecord>,
  hasFocused: Ref<boolean>,
  showHelpText: ComputedRef<boolean>,
  showValidationError: ComputedRef<boolean>,
  hasError: ComputedRef<boolean>,
  errorItems: ComputedRef<string[]>
): VNode {
  const thisProps = props as Readonly<TToggleFieldOptionProps>;
  const fieldState = thisProps.disabled ? 'disabled' : thisProps.readonly ? 'readonly' : undefined;
  const canShowHelpText =
    !Helper.isEmpty(thisProps.helpText) &&
    (thisProps.persistentHelpOff || thisProps.persistentHelpText === false);

  return h(
    'div',
    {
      class: wrapperCss.value,
      'data-component': 'toggle-field',
      'data-state': fieldState,
      'data-disabled': thisProps.disabled,
      'aria-disabled': thisProps.disabled,
    },
    [
      slots.default && slots.default(),
      h('div', { class: 'col' }, [
        h(
          'div',
          {
            class: [`${cssPrefix}field-inner`],
          },
          [
            h<TBsToggleButton>(
              BsToggleButton,
              {
                id: props.id,
                name: props.name,
                disabled: props.disabled,
                readonly: props.readonly,
                required: props.required,
                items: thisProps.items as Prop<TInputOptionItem[]>,
                multiple: props.multiple,
                modelValue: props.modelValue,
                // flat: props.flat,
                outlined: props.outlined,
                tonal: props.tonal,
                raised: props.raised,
                rounded: props.rounded,
                pill: props.pill,
                size: props.size,
                color: props.color,
                toggleColor: props.toggleColor,
                iconPosition: props.iconPosition,
                iconSize: props.iconSize,
                onMouseenter: () => canShowHelpText && (hasFocused.value = true),
                onMouseleave: () => canShowHelpText && (hasFocused.value = false),
                'onUpdate:model-value': (value: string | number | boolean) => {
                  emit('update:model-value', value);
                },
              },
              {
                label: slots.label
                  ? (item: TInputOptionItem) => useRenderSlot(slots, 'label', item)
                  : undefined,
                icon: slots.icon
                  ? (item: TInputOptionItem) => useRenderSlot(slots, 'icon', item)
                  : undefined,
              }
            ),
          ]
        ),
        useRenderFieldFeedback(
          slots,
          thisProps,
          showHelpText.value,
          showValidationError.value,
          hasError.value,
          errorItems.value
        ),
      ]),
    ]
  );
}
