import { BsButton } from '@/components/Button';
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import {
  createCalendarButton,
  dispatchDateTimeValue,
} from '@/components/DatePicker/mixins/datePickerCalendar.ts';
import { createCalendarNavButton } from '@/components/DatePicker/mixins/datePickerNav.ts';
import type { TTimePickerMode, TTimePickerProps } from '@/components/DatePicker/types/internals.ts';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
import type { TValueText } from '@/types/internals.ts';
import { DateTime, type DateTimeUnit, type DurationObjectUnits } from 'luxon';
import { h, toDisplayString, type ComputedRef, type EmitFn, type Ref, type VNode } from 'vue';

export function useCalendarTableHours(date: DateTime): TValueText<DateTime>[][] {
  const numHours = 24;
  const fmt = Intl.NumberFormat(date.locale ?? undefined, { minimumIntegerDigits: 2 });
  const rows: TValueText<DateTime>[][] = [];
  let items: TValueText<DateTime>[] = [];

  for (let num = 0; num < numHours; num++) {
    const dateTime = date.set({ hour: num });
    items.push({
      value: dateTime,
      text: fmt.format(num),
    });

    if (items.length % 4 === 0) {
      rows.push(items);
      items = [];
    }
  }
  if (items.length > 0) {
    rows.push(items);
  }

  return rows;
}

export function useCalendarTableMinutes(date: DateTime): TValueText<DateTime>[][] {
  const numMinutes = 60;
  const fmt = Intl.NumberFormat(date.locale ?? undefined, { minimumIntegerDigits: 2 });
  const rows: TValueText<DateTime>[][] = [];
  let items: TValueText<DateTime>[] = [];

  for (let num = 0; num < numMinutes; num++) {
    if (num === 0 || num % 5 === 0) {
      const dateTime = date.set({ minute: num });
      items.push({
        value: dateTime,
        text: fmt.format(num),
      });

      if (items.length % 3 === 0) {
        rows.push(items);
        items = [];
      }
    }
  }
  if (items.length > 0) {
    rows.push(items);
  }

  return rows;
}

export function useCalendarTableSeconds(date: DateTime): TValueText<DateTime>[][] {
  const numSeconds = 60;
  const fmt = Intl.NumberFormat(date.locale ?? undefined, { minimumIntegerDigits: 2 });
  const rows: TValueText<DateTime>[][] = [];
  let items: TValueText<DateTime>[] = [];

  for (let sec = 0; sec < numSeconds; sec++) {
    if (sec === 0 || sec % 5 === 0) {
      const dateTime = date.set({ second: sec });
      items.push({
        value: dateTime,
        text: fmt.format(sec),
      });

      if (items.length % 3 === 0) {
        rows.push(items);
        items = [];
      }
    }
  }
  if (items.length > 0) {
    rows.push(items);
  }

  return rows;
}

function shiftDateTimeTo(
  date: DateTime,
  unit: keyof DurationObjectUnits,
  length: number
): DateTime {
  if (length !== 0) {
    return date.plus({ [`${unit}`]: length });
  }

  return date;
}

function shiftDateTimeThenDispatch(
  emit: EmitFn,
  value: DateTime,
  unit: keyof DurationObjectUnits,
  length: number,
  isDisabled?: boolean
): void {
  if (!isDisabled) {
    const result = shiftDateTimeTo(value, unit, length);
    dispatchDateTimeValue(emit, result, isDisabled);
  }
}

function createPickerTimeButton(
  color: string,
  value: DateTime,
  formatOpts: string,
  isDisabled: boolean,
  clickHandler: VoidFunction
): VNode {
  return h(
    BsButton,
    {
      readonly: isDisabled,
      color: color,
      flat: true,
      pill: false,
      rounded: true,
      onClick: (evt: Event) => {
        preventEventTarget(evt);
        clickHandler();
      },
    },
    {
      default: () => toDisplayString(value.toFormat(formatOpts)),
    }
  );
}

function renderPickerTimes(
  emit: EmitFn,
  props: Readonly<TTimePickerProps>,
  currentView: Ref<TTimePickerMode>,
  localValue: Ref<DateTime>
): VNode {
  return h('table', { class: [`${cssPrefix}picker-times`, !props.backButton ? 'mt-0' : ''] }, [
    h('colgroup', [
      h('col'),
      h('col', { class: [`${cssPrefix}picker-times-sep`, 'select-none'] }),
      h('col'),
      h('col', { class: [`${cssPrefix}picker-times-sep`, 'select-none'] }),
      h('col'),
    ]),
    h('tbody', [
      h('tr', [
        h('td', [
          createCalendarNavButton(props.calendarButton, 'arrow_drop_up', 32, props.disabled, () =>
            shiftDateTimeThenDispatch(emit, localValue.value, 'hours', 1, props.disabled)
          ),
        ]),
        h('td', ' '),
        h('td', [
          createCalendarNavButton(props.calendarButton, 'arrow_drop_up', 32, props.disabled, () =>
            shiftDateTimeThenDispatch(emit, localValue.value, 'minutes', 1, props.disabled)
          ),
        ]),
        h('td', ' '),
        h('td', [
          createCalendarNavButton(props.calendarButton, 'arrow_drop_up', 32, props.disabled, () =>
            shiftDateTimeThenDispatch(emit, localValue.value, 'seconds', 1, props.disabled)
          ),
        ]),
      ]),
      h('tr', [
        h('td', [
          createPickerTimeButton(
            props.calendarButton,
            localValue.value,
            'HH',
            <boolean>props.disabled,
            () => {
              if (!props.disabled) {
                currentView.value = DatePickerConst.HOUR;
              }
            }
          ),
        ]),
        h('td', { class: [`${cssPrefix}picker-times-sep`] }, ':'),
        h('td', [
          createPickerTimeButton(
            props.calendarButton,
            localValue.value,
            'mm',
            <boolean>props.disabled,
            () => {
              if (!props.disabled) {
                currentView.value = DatePickerConst.MINUTE;
              }
            }
          ),
        ]),
        h('td', { class: [`${cssPrefix}picker-times-sep`] }, ':'),
        h('td', [
          createPickerTimeButton(
            props.calendarButton,
            localValue.value,
            'ss',
            <boolean>props.disabled,
            () => {
              if (!props.disabled) {
                currentView.value = DatePickerConst.SECOND;
              }
            }
          ),
        ]),
      ]),
      h('tr', [
        h('td', [
          createCalendarNavButton(props.calendarButton, 'arrow_drop_down', 32, props.disabled, () =>
            shiftDateTimeThenDispatch(emit, localValue.value, 'hours', -1, props.disabled)
          ),
        ]),
        h('td', ' '),
        h('td', [
          createCalendarNavButton(props.calendarButton, 'arrow_drop_down', 32, props.disabled, () =>
            shiftDateTimeThenDispatch(emit, localValue.value, 'minutes', -1, props.disabled)
          ),
        ]),
        h('td', ' '),
        h('td', [
          createCalendarNavButton(props.calendarButton, 'arrow_drop_down', 32, props.disabled, () =>
            shiftDateTimeThenDispatch(emit, localValue.value, 'seconds', -1, props.disabled)
          ),
        ]),
      ]),
    ]),
  ]);
}

function renderPickerTimesUnit(
  emit: EmitFn,
  props: Readonly<TTimePickerProps>,
  classes: string[],
  tableData: ComputedRef<TValueText<DateTime>[][]>,
  currentView: Ref<TTimePickerMode>,
  localValue: Ref<DateTime>,
  timeUnit: DateTimeUnit
): VNode {
  return h('table', { class: classes }, [
    h(
      'tbody',
      tableData.value.map((row, idx) =>
        h(
          'tr',
          { key: `tr-${idx}` },
          row.map((it, k) =>
            h('td', { key: `td-${idx}-${k}` }, [
              createCalendarButton(props, localValue, it, localValue.value, timeUnit, () => {
                dispatchDateTimeValue(emit, it.value);
                currentView.value = DatePickerConst.TIME;
              }),
            ])
          )
        )
      )
    ),
  ]);
}

export function useRenderDatePickerTimes(
  emit: EmitFn,
  props: Readonly<TTimePickerProps>,
  tableHours: ComputedRef<TValueText<DateTime>[][]>,
  tableMinutes: ComputedRef<TValueText<DateTime>[][]>,
  tableSeconds: ComputedRef<TValueText<DateTime>[][]>,
  currentView: Ref<TTimePickerMode>,
  localValue: Ref<DateTime>
): VNode {
  return h('div', { class: [`${cssPrefix}datepicker-times`] }, [
    props.backButton
      ? h('div', { class: [`${cssPrefix}datepicker-toolbar`] }, [
          createCalendarNavButton(props.calendarButton, 'arrow_back', 24, false, () => {
            if (currentView.value === DatePickerConst.TIME) {
              emit('close');
            } else {
              currentView.value = DatePickerConst.TIME;
            }
          }),
        ])
      : undefined,
    useRenderTransition(
      {
        name: 'fade',
        mode: 'out-in',
      },
      [
        currentView.value === DatePickerConst.TIME
          ? renderPickerTimes(emit, props, currentView, localValue)
          : undefined,
        currentView.value === DatePickerConst.HOUR
          ? renderPickerTimesUnit(
              emit,
              props,
              [`${cssPrefix}picker-hours`],
              tableHours,
              currentView,
              localValue,
              'hour'
            )
          : undefined,
        currentView.value === DatePickerConst.MINUTE
          ? renderPickerTimesUnit(
              emit,
              props,
              [`${cssPrefix}picker-minutes`],
              tableMinutes,
              currentView,
              localValue,
              'minute'
            )
          : undefined,
        currentView.value === DatePickerConst.SECOND
          ? renderPickerTimesUnit(
              emit,
              props,
              [`${cssPrefix}picker-seconds`],
              tableSeconds,
              currentView,
              localValue,
              'second'
            )
          : undefined,
      ]
    ),
  ]);
}
