import { BsDatePicker } from '@/components/DatePicker';
import { useParseDate } from '@/components/DatePicker/mixins/datePickerApi.ts';
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
  useOnFieldValueCleared,
  useOnTextFieldNodeMounted,
} from '@/components/Field/mixins/textFieldEventApi.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import { BsPopover } from '@/components/Popover';
import { useTogglePopoverState } from '@/components/Popover/mixins/popoverApi.ts';
import type {
  Numberish,
  TBsDatePicker,
  TBsPopover,
  TDateTimeFieldOptionProps,
  TDateTimePickerMode,
  TEmitFn,
  TIconVariant,
  TPopoverPosition,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { DateTime } from 'luxon';
import type { ComputedRef, Prop, Ref, Slots, VNode } from 'vue';
import { Fragment, h } from 'vue';

export function useParseDateTimeFromFormat(
  value?: string | number | Date | null,
  format?: string,
  locale?: string
): DateTime | undefined {
  if (value) {
    if (Helper.isString(value)) {
      try {
        return !Helper.isEmpty(format)
          ? DateTime.fromFormat(value, format, { locale: locale })
          : DateTime.fromISO(value, { locale: locale });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        try {
          return DateTime.fromSQL(value, { locale: locale });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          return undefined;
        }
      }
    } else if (Helper.isNumber(value)) {
      return DateTime.fromSeconds(value, { locale: locale });
    } else if (value instanceof Date) {
      const result = DateTime.fromJSDate(value);
      if (!Helper.isEmpty(locale)) {
        return result.setLocale(locale);
      }

      return result;
    }
  }

  return undefined;
}

function createDateTimeInputField(
  emit: TEmitFn,
  props: Readonly<TDateTimeFieldOptionProps>,
  displayValue: Ref<string | undefined>,
  isFocused: Ref<boolean>,
  isPopoverOpen: Ref<boolean>
): VNode {
  return h('input', {
    ...useInputFieldBaseAttrs(props),
    ...useInputTextFieldAttrs(props, false),
    readonly: true,
    role: 'textbox',
    type: 'text',
    value: displayValue.value,
    style: {
      cursor: 'default',
    },
    onBlur: (e: Event) => useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
    onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
    onClick: () =>
      useTogglePopoverState(
        emit,
        isPopoverOpen,
        (props.disabled || props.readonly) as boolean,
        isPopoverOpen.value
      ),
  });
}

export function useRenderDateTimeField(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<TDateTimeFieldOptionProps>,
  wrapperCss: ComputedRef<TRecord>,
  controlCss: ComputedRef<TRecord>,
  activator: Ref<HTMLElement | null>,
  pickerMode: Ref<TDateTimePickerMode>,
  localFieldValue: Ref<DateTime | undefined>,
  displayValue: Ref<string | undefined>,
  locale: Ref<string>,
  calendarIcon: Ref<string>,
  isPopoverOpen: Ref<boolean>,
  isFocused: Ref<boolean>,
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
    wrapperCss,
    props,
    h(Fragment, [
      h(
        'div',
        {
          class: controlCss.value,
        },
        [
          useCreateFieldInnerWrapper(
            slots,
            props,
            createDateTimeInputField(emit, props, displayValue, isFocused, isPopoverOpen),
            iconSize,
            calendarIcon.value,
            props.prependIcon,
            useCreateValidationIcon(
              props.actionIconVariant as TIconVariant,
              hasValidated.value,
              hasError.value,
              props.validationIcon as boolean,
              iconSize
            ),
            useCreateFieldActionIcon(
              showClearButton.value,
              props.actionIconVariant as TIconVariant,
              iconSize,
              () => useOnFieldValueCleared(emit, localFieldValue)
            ),
            undefined,
            {
              ref: activator,
              onMouseenter: () => {
                if (props.openOnHover && !isPopoverOpen.value) {
                  useTogglePopoverState(
                    emit,
                    isPopoverOpen,
                    (props.disabled || props.readonly) as boolean,
                    false
                  );
                }
              },
            },
            undefined,
            () =>
              useTogglePopoverState(
                emit,
                isPopoverOpen,
                (props.disabled || props.readonly) as boolean,
                isPopoverOpen.value
              ),
            () =>
              useTogglePopoverState(
                emit,
                isPopoverOpen,
                (props.disabled || props.readonly) as boolean,
                isPopoverOpen.value
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
      h<TBsPopover>(
        BsPopover,
        {
          color: null,
          space: (props.outlined ? 2 : 1) as Prop<number>,
          class: props.pickerCls,
          placement: props.pickerPlacement as Prop<TPopoverPosition>,
          transition: props.pickerTransition as Prop<string>,
          open: isPopoverOpen.value as unknown as Prop<boolean>,
          trigger: activator.value as Prop<HTMLElement>,
          onClose: () => useTogglePopoverState(emit, isPopoverOpen, false, true),
        },
        {
          default: () =>
            h<TBsDatePicker>(BsDatePicker, {
              buttonColor: (props.pickerButton || 'dark') as Prop<string>,
              surfaceColor: props.pickerColor as Prop<string>,
              headerColor: props.headerColor as Prop<string>,
              headerPanel: props.headerPanel as unknown as Prop<boolean>,
              landscape: props.landscapeMode as unknown as Prop<boolean>,
              locale: locale.value as Prop<string>,
              readonly: (props.readonly || props.disabled) as unknown as Prop<boolean>,
              mode: pickerMode.value as Prop<TDateTimePickerMode>,
              modelValue: localFieldValue.value?.toJSDate() as Prop<Date | undefined>,
              width: props.pickerWidth as Prop<Numberish>,
              'onUpdate:model-value': (value: string) => {
                localFieldValue.value = useParseDate(value).setLocale(locale.value);
                emit(
                  'update:model-value',
                  localFieldValue.value?.toFormat(props.valueFormat as string)
                );
              },
            }),
        }
      ),
    ]),
    (node: VNode) => useOnTextFieldNodeMounted(props, node)
  );
}
