import { BsButton, type TButtonColor } from '@/components/Button';
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import {
  dispatchDateTimeValue,
  shiftMonthTo,
  shiftYearTo,
  useWatchOfDatePickerBaseProps,
} from '@/components/DatePicker/mixins/datePickerCalendar.ts';
import type { TDatePickerNavProps } from '@/components/DatePicker/types/internals.ts';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
import type { DateTime } from 'luxon';
import { h, watch, type ComputedRef, type EmitFn, type Ref, type VNode } from 'vue';

export function useWatchOfDatePickerNavProps(
  props: Readonly<TDatePickerNavProps>,
  formatOpts: Ref<Intl.DateTimeFormatOptions>,
  localValue: Ref<DateTime>,
  reverse: Ref<boolean>
): void {
  useWatchOfDatePickerBaseProps(props, localValue, reverse);

  watch(
    () => props.displayMode,
    (value) => {
      if (value === DatePickerConst.YEAR || value === DatePickerConst.MONTH) {
        formatOpts.value = { year: 'numeric' };
      } else {
        formatOpts.value = { month: 'long', year: 'numeric' };
      }
    }
  );
}

function formatYearSpan(value: DateTime): string {
  const fmt = Intl.NumberFormat(value.locale ?? undefined, { useGrouping: false });
  const year = value.year;
  const y1 = fmt.format(year - 4);
  const y2 = fmt.format(year + 7);

  return `${y1} - ${y2}`;
}

function formatDatePickerNavTitle(
  props: Readonly<TDatePickerNavProps>,
  formatOpts: Ref<Intl.DateTimeFormatOptions>,
  localValue: Ref<DateTime>
): string {
  if (props.displayMode === DatePickerConst.DATE) {
    return localValue.value.toLocaleString(formatOpts.value);
  } else if (props.displayMode === DatePickerConst.MONTH) {
    return localValue.value.toLocaleString({ year: 'numeric' });
  } else {
    return formatYearSpan(localValue.value);
  }
}

export function createCalendarNavButton(
  color: TButtonColor | string,
  icon: string,
  iconSize: number,
  disabled?: boolean,
  clickHandler?: (evt: Event) => void
): VNode {
  return h(BsButton, {
    color: color,
    icon: icon,
    iconSize: iconSize,
    mode: 'icon',
    readonly: disabled,
    flat: true,
    onClick: (evt: Event) => {
      preventEventTarget(evt);
      clickHandler?.call(undefined, evt);
    },
  });
}

export function useRenderDatePickerNav(
  emit: EmitFn,
  props: Readonly<TDatePickerNavProps>,
  transitionName: ComputedRef<string>,
  formatOpts: Ref<Intl.DateTimeFormatOptions>,
  localValue: Ref<DateTime>
): VNode {
  const text = formatDatePickerNavTitle(props, formatOpts, localValue);

  return h(
    'div',
    {
      class: [`${cssPrefix}datepicker-nav`, 'flex', 'items-center', 'justify-between'],
    },
    [
      createCalendarNavButton(
        props.buttonColor || 'secondary',
        'chevron_left',
        30,
        props.disabled,
        () => datePickerNavButtonHandler(props, localValue, emit, -1)
      ),
      h(
        'div',
        {
          class: [
            `${cssPrefix}datepicker-nav-title`,
            'relative',
            'overflow-hidden',
            props.disabled ? 'disabled' : '',
          ],
          onClick: () => {
            !props.disabled && emit('toggle', props.displayMode);
          },
        },
        [
          useRenderTransition(
            {
              name: transitionName.value,
            },
            [
              h(
                'div',
                {
                  key: text,
                  class: ['font-weight-bold', 'block', 'w-full'],
                },
                text
              ),
            ]
          ),
        ]
      ),
      createCalendarNavButton(
        props.buttonColor || 'secondary',
        'chevron_right',
        30,
        props.disabled,
        () => datePickerNavButtonHandler(props, localValue, emit, 1)
      ),
    ]
  );
}

function datePickerNavButtonHandler(
  props: Readonly<TDatePickerNavProps>,
  localValue: Ref<DateTime>,
  emit: EmitFn,
  movement: number
): void {
  if (props.disabled) {
    return;
  }
  if (props.displayMode === DatePickerConst.YEAR) {
    localValue.value = shiftYearTo(localValue.value, movement > 0 ? 12 : movement < 0 ? -12 : 0);
  } else if (props.displayMode === DatePickerConst.MONTH) {
    localValue.value = shiftYearTo(localValue.value, movement);
  } else {
    localValue.value = shiftMonthTo(localValue.value, movement);
  }

  dispatchDateTimeValue(emit, localValue.value);
}
