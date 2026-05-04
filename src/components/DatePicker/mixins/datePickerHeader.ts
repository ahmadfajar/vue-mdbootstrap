import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import { useWatchOfDatePickerBaseProps } from '@/components/DatePicker/mixins/datePickerCalendar.ts';
import type { TDateTimePickerMode } from '@/components/DatePicker/types';
import type { TDatePickerHeaderProps } from '@/components/DatePicker/types/internals.ts';
import { cssPrefix, useBreakpointMin, useRenderTransition } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import { DateTime } from 'luxon';
import {
  type ComputedRef,
  createCommentVNode,
  type EmitFn,
  h,
  type Ref,
  type VNode,
  watch,
} from 'vue';

export function useDatePickerHeaderStyles(
  props: Readonly<TDatePickerHeaderProps>,
  isYearActive: ComputedRef<boolean>,
  isTimeActive: ComputedRef<boolean>,
  isTitleActive: ComputedRef<boolean>
): TRecord {
  const initial = {
    'pointer-events': props.readonly ? 'none' : undefined,
  };
  const yearStyle = {
    ...initial,
    cursor:
      [DatePickerConst.DATE, DatePickerConst.DATETIME, DatePickerConst.MONTH].includes(
        props.pickerMode as TDateTimePickerMode
      ) && !isYearActive.value
        ? 'pointer'
        : undefined,
  };
  const timeStyle = {
    ...initial,
    cursor:
      [DatePickerConst.DATE, DatePickerConst.DATETIME].includes(
        props.pickerMode as TDateTimePickerMode
      ) && !isTimeActive.value
        ? 'pointer'
        : undefined,
  };
  const titleStyle = {
    ...initial,
    cursor:
      [DatePickerConst.DATE, DatePickerConst.DATETIME, DatePickerConst.MONTH].includes(
        props.pickerMode as TDateTimePickerMode
      ) && !isTitleActive.value
        ? 'pointer'
        : undefined,
  };

  return { year: yearStyle, time: timeStyle, title: titleStyle };
}

export function useHeaderTitleFormatOpts(
  value?: TDateTimePickerMode | string
): Intl.DateTimeFormatOptions {
  if (value === DatePickerConst.YEAR) {
    return { year: 'numeric' };
  } else if (value === DatePickerConst.MONTH) {
    return { month: 'long', year: 'numeric' };
  } else if (value === DatePickerConst.TIME) {
    return DateTime.DATE_SHORT;
  } else {
    return {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };
  }
}

export function useWatchOfDatePickerHeaderProps(
  props: Readonly<TDatePickerHeaderProps>,
  formatOpts: Ref<Intl.DateTimeFormatOptions>,
  localValue: Ref<DateTime>,
  reverse: Ref<boolean>
): void {
  useWatchOfDatePickerBaseProps(props, localValue, reverse);

  watch(
    () => props.pickerMode,
    (value) => {
      formatOpts.value = useHeaderTitleFormatOpts(value);
    }
  );
}

export function useRenderDatePickerHeader(
  emit: EmitFn,
  props: Readonly<TDatePickerHeaderProps>,
  styles: ComputedRef<TRecord>,
  isYearActive: ComputedRef<boolean>,
  isTimeActive: ComputedRef<boolean>,
  isTitleActive: ComputedRef<boolean>,
  transitionName: ComputedRef<string>,
  formatOpts: Ref<Intl.DateTimeFormatOptions>,
  localValue: Ref<DateTime>
): VNode {
  return h(
    'div',
    {
      class: [
        `${cssPrefix}datepicker-header`,
        props.color?.startsWith('bg-') ? props.color : `bg-${props.color}`,
      ],
    },
    [
      h(
        'div',
        {
          class: [`${cssPrefix}datepicker-subtitle`, 'flex', 'justify-between'],
        },
        [
          h(
            'div',
            {
              class: [
                `${cssPrefix}datepicker-year`,
                'inline-block',
                'select-none',
                isYearActive.value ? 'active' : '',
              ],
              style: styles.value.year,
              onClick: () => {
                if (
                  !isYearActive.value &&
                  ['date', 'datetime', 'month'].includes(props.pickerMode as string)
                ) {
                  emit('change-view', DatePickerConst.YEAR);
                }
              },
            },
            [
              [DatePickerConst.MONTH, DatePickerConst.YEAR, DatePickerConst.TIME].includes(
                props.pickerMode as string
              )
                ? ''
                : localValue.value.toLocaleString({ year: 'numeric' }),
            ]
          ),
          props.enableTime
            ? h(
                'div',
                {
                  class: [
                    `${cssPrefix}datepicker-time`,
                    'inline-block',
                    'select-none',
                    isTimeActive.value ? 'active' : '',
                  ],
                  style: styles.value.time,
                  onClick: () => {
                    if (!isTimeActive.value) {
                      emit('change-view', DatePickerConst.TIME);
                    }
                  },
                },
                localValue.value.toLocaleString(DateTime.TIME_SIMPLE)
              )
            : createCommentVNode(' v-if-time '),
        ]
      ),
      h(
        'div',
        {
          class: [
            `${cssPrefix}datepicker-title`,
            'relative',
            'overflow-hidden',
            'select-none',
            isTitleActive.value ? 'active' : '',
          ],
          style: styles.value.title,
          onClick: () => {
            if (
              !isTitleActive.value &&
              ['date', 'datetime', 'month'].includes(props.pickerMode as string)
            ) {
              emit(
                'change-view',
                props.pickerMode === DatePickerConst.MONTH
                  ? DatePickerConst.MONTH
                  : DatePickerConst.DATE
              );
            }
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
                  key: localValue.value.toISODate() as string,
                },
                [
                  props.landscape === true && useBreakpointMin('lg')
                    ? h('span', {
                        innerHTML: localValue.value
                          .toLocaleString(formatOpts.value)
                          .replace(', ', ',<br/>'),
                      })
                    : localValue.value.toLocaleString(formatOpts.value),
                ]
              ),
            ]
          ),
        ]
      ),
    ]
  );
}
