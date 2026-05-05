import { BsButton } from '@/components/Button';
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import type { TDateTimePickerMode } from '@/components/DatePicker/types';
import type {
  TDatePickerBaseProps,
  TDatePickerCalendarProps,
} from '@/components/DatePicker/types/internals.ts';
import { Touch } from '@/directives';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
import type { TDebounce, TValueText } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import { DateTime, type DateTimeUnit } from 'luxon';
import {
  computed,
  h,
  ref,
  toDisplayString,
  watch,
  withDirectives,
  type ComputedRef,
  type EmitFn,
  type Ref,
  type VNode,
} from 'vue';

export function useWatchOfDatePickerBaseProps(
  props: Readonly<TDatePickerBaseProps>,
  localValue: Ref<DateTime>,
  reverse?: Ref<boolean>,
  dateRef?: Ref<DateTime>
): void {
  watch(
    () => props.modelValue,
    (value, oldValue) => {
      if (reverse) {
        reverse.value = (value && oldValue && value < oldValue) || false;
      }
      if (value) {
        localValue.value = DateTime.fromJSDate(value);
        props.locale && (localValue.value = localValue.value.setLocale(props.locale));
      }
    }
  );
  watch(
    () => props.locale,
    (value) => {
      value && (localValue.value = localValue.value.setLocale(value));
      value && dateRef && (dateRef.value = dateRef.value.setLocale(value));
    }
  );
}

export function useSetupDatePickerCalender(props: Readonly<TDatePickerCalendarProps>) {
  const reverse = ref(false);
  const localValue = ref<DateTime>(
    props.modelValue ? DateTime.fromJSDate(props.modelValue) : DateTime.now()
  );
  const calendarDate = ref<DateTime>(
    props.calendarDate ? DateTime.fromJSDate(props.calendarDate) : DateTime.now()
  );
  const transitionName = computed(() =>
    reverse.value === true ? DatePickerConst.transitionReverse : DatePickerConst.transition
  );

  props.locale && (localValue.value = localValue.value.setLocale(props.locale));
  props.locale && (calendarDate.value = calendarDate.value.setLocale(props.locale));
  useWatchOfDatePickerBaseProps(props, localValue, undefined, calendarDate);

  watch(
    () => props.calendarDate,
    (value, oldValue) => {
      reverse.value = (value && oldValue && value < oldValue) || false;
      if (value) {
        calendarDate.value = DateTime.fromJSDate(value);
        props.locale && (calendarDate.value = calendarDate.value.setLocale(props.locale));
      }
    }
  );

  return { reverse, localValue, calendarDate, transitionName };
}

function weekdayNames(locale?: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  // create weekday names. 2017-01-15 is Sunday
  return Helper.createRange(7).map((i) => formatter.format(new Date(2017, 0, i + 15)));
}

export function dispatchDateTimeValue(emit: EmitFn, value: DateTime, isDisabled?: boolean) {
  if (!isDisabled) {
    emit('update:model-value', value.toJSDate());
  }
}

export function shiftMonthTo(date: DateTime, length: number): DateTime {
  if (length !== 0) {
    return date.plus({ months: length });
  }

  return date;
}

export function shiftYearTo(date: DateTime, length: number): DateTime {
  if (length !== 0) {
    return date.plus({ years: length });
  }

  return date;
}

function shiftDatePickerCalendar(
  mode: TDateTimePickerMode,
  dateRef: DateTime,
  emit: EmitFn,
  delta: number
): void {
  let result: DateTime | undefined;
  const length = delta > 0 ? 1 : delta < 0 ? -1 : 0;

  if (mode === DatePickerConst.DATE && length !== 0) {
    result = shiftMonthTo(dateRef, length);
  } else if (mode === DatePickerConst.MONTH && length !== 0) {
    result = shiftYearTo(dateRef, length);
  } else if (mode === DatePickerConst.YEAR && length !== 0) {
    result = shiftYearTo(dateRef, length * 12);
  }

  result && emit('change:calendar', result.toJSDate());
}

function debounceShiftDatePickerCalendar(
  debounceRef: TDebounce,
  mode: TDateTimePickerMode,
  dateRef: Ref<DateTime>,
  emit: EmitFn,
  delay: number,
  delta: number
): void {
  if (!debounceRef.lastExec || Date.now() - debounceRef.lastExec > delay) {
    clearTimeout(debounceRef.timerId);
    debounceRef.lastExec = Date.now();
    debounceRef.timerId = Helper.defer(
      shiftDatePickerCalendar,
      delay,
      mode,
      dateRef.value,
      emit,
      delta
    );
  }
}

export function createCalendarButton(
  props: Readonly<TDatePickerCalendarProps>,
  dateRef: Ref<DateTime>,
  data: TValueText<DateTime>,
  today: DateTime,
  unit: DateTimeUnit,
  clickHandler: VoidFunction
): VNode {
  const selected = dateRef.value.hasSame(data.value, unit);
  const isOutlined = today.hasSame(data.value, unit) && !selected;

  return h(
    BsButton,
    {
      readonly: props.disabled,
      class: isOutlined ? `${cssPrefix}btn-today` : undefined,
      color:
        !today.hasSame(data.value, unit) && !selected
          ? props.calendarButton || 'secondary'
          : props.selectedColor,
      flat: !today.hasSame(data.value, unit) && !selected,
      outlined: isOutlined,
      pill: false,
      rounded: true,
      onClick: (evt: Event) => {
        preventEventTarget(evt);
        clickHandler();
      },
    },
    {
      default: () => toDisplayString(data.text),
    }
  );
}

function createCalendarDayButton(
  props: Readonly<TDatePickerCalendarProps>,
  dateRef: Ref<DateTime>,
  data: TValueText<DateTime>,
  today: DateTime,
  clickHandler: VoidFunction
): VNode {
  const selected = dateRef.value.hasSame(data.value, 'day');
  const isOutlined = today.hasSame(data.value, 'day') && !selected;

  return h(
    BsButton,
    {
      size: 'sm',
      mode: 'icon',
      readonly: props.disabled,
      color:
        !today.hasSame(data.value, 'day') && !selected
          ? props.calendarButton || 'secondary'
          : props.selectedColor,
      class: isOutlined ? `${cssPrefix}btn-today` : undefined,
      flat: !today.hasSame(data.value, 'day') && !selected,
      outlined: isOutlined,
      onClick: clickHandler,
    },
    {
      default: () => toDisplayString(data.text),
    }
  );
}

export function useCalendarTableDays(date: DateTime): TValueText<DateTime | undefined>[][] {
  const fmt = Intl.NumberFormat(date.locale ?? undefined);
  const rows: TValueText<DateTime | undefined>[][] = [];
  const numDays = (date.daysInMonth ?? 30) + 1;
  const daysBefore: number = DateTime.local(date.year, date.month, 1).weekday % 7;
  let items: TValueText<DateTime | undefined>[] = [];

  for (let i = 0; i < daysBefore; i++) {
    items.push({ text: '0', value: undefined });
  }

  for (let day = 1; day < numDays; day++) {
    items.push({
      text: fmt.format(day),
      value: date.set({ day: day }),
    });

    if (items.length % 7 === 0) {
      rows.push(items);
      items = [];
    }
  }
  if (items.length > 0) {
    for (let d = items.length; d < 7; d++) {
      items.push({ text: '0', value: undefined });
    }
    rows.push(items);
  }

  return rows;
}

export function useCalendarTableMonths(date: DateTime): TValueText<DateTime>[][] {
  const formatOpts: Intl.DateTimeFormatOptions = { month: 'short' };
  const numMonths = 12;
  const rows: TValueText<DateTime>[][] = [];
  let items: TValueText<DateTime>[] = [];

  for (let month = 0; month < numMonths; month++) {
    const dateMonth = date.set({ month: month + 1 });
    items.push({
      value: dateMonth,
      text: dateMonth.toLocaleString(formatOpts),
    });

    if (items.length % 3 === 0) {
      rows.push(items);
      items = [];
    }
  }
  if (items.length > 0) {
    rows.push(items);
  }

  return rows;
}

export function useCalendarTableYears(date: DateTime): TValueText<DateTime>[][] {
  const startYear = date.year - 4;
  const endYear = date.year + 7;
  const rows: TValueText<DateTime>[][] = [];
  let items: TValueText<DateTime>[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const dateYear = date.set({ year: year });
    items.push({
      value: dateYear,
      text: dateYear.toLocaleString({ year: 'numeric' }),
    });

    if (items.length % 3 === 0) {
      rows.push(items);
      items = [];
    }
  }
  if (items.length > 0) {
    rows.push(items);
  }

  return rows;
}

export function useRenderDatePickerDays(
  emit: EmitFn,
  props: Readonly<TDatePickerCalendarProps>,
  transitionName: ComputedRef<string>,
  tableDays: ComputedRef<TValueText<DateTime | undefined>[][]>,
  localValue: Ref<DateTime>,
  calendarValue: Ref<DateTime>,
  debounceRef: TDebounce
): VNode {
  const dayNames = weekdayNames(props.locale);
  const today = DateTime.now();

  return withDirectives(
    h(
      'div',
      {
        class: [`${cssPrefix}datepicker-days`, 'relative', 'overflow-hidden'],
        onWheel: (e: WheelEvent) => {
          e.preventDefault();
          debounceShiftDatePickerCalendar(
            debounceRef,
            DatePickerConst.DATE as TDateTimePickerMode,
            calendarValue,
            emit,
            300,
            e.deltaY || e.deltaX
          );
        },
      },
      [
        useRenderTransition({ name: transitionName.value }, [
          h('table', { key: calendarValue.value.toFormat(DatePickerConst.yearMonthISO) }, [
            h('thead', [
              h(
                'tr',
                dayNames.map((el) => h('th', { key: `th-${el}` }, toDisplayString(el)))
              ),
            ]),
            h(
              'tbody',
              tableDays.value.map((row, idx) =>
                h(
                  'tr',
                  { key: `tr-${idx}` },
                  row.map((it, k) =>
                    h('td', { key: `td-${idx}-${k}` }, [
                      it.value
                        ? createCalendarDayButton(
                            props,
                            localValue,
                            it as TValueText<DateTime>,
                            today,
                            () => dispatchDateTimeValue(emit, it.value as DateTime, props.disabled)
                          )
                        : '',
                    ])
                  )
                )
              )
            ),
          ]),
        ]),
      ]
    ),
    [
      [
        Touch,
        {
          left: (e: WheelEvent) => {
            (e.deltaX < -10 || e.deltaX > 10) &&
              shiftDatePickerCalendar(
                DatePickerConst.DATE as TDateTimePickerMode,
                calendarValue.value,
                emit,
                e.deltaX * -1
              );
          },
          right: (e: WheelEvent) => {
            (e.deltaX < -10 || e.deltaX > 10) &&
              shiftDatePickerCalendar(
                DatePickerConst.DATE as TDateTimePickerMode,
                calendarValue.value,
                emit,
                e.deltaX * -1
              );
          },
        },
      ],
    ]
  );
}

export function useRenderDatePickerMonths(
  emit: EmitFn,
  props: Readonly<TDatePickerCalendarProps>,
  transitionName: ComputedRef<string>,
  tableMonths: ComputedRef<TValueText<DateTime>[][]>,
  localValue: Ref<DateTime>,
  calendarValue: Ref<DateTime>,
  debounceRef: TDebounce
): VNode {
  const today = DateTime.now();

  return withDirectives(
    h(
      'div',
      {
        class: [`${cssPrefix}datepicker-months`, 'relative', 'overflow-hidden'],
        onWheel: (e: WheelEvent) => {
          e.preventDefault();
          debounceShiftDatePickerCalendar(
            debounceRef,
            DatePickerConst.MONTH as TDateTimePickerMode,
            calendarValue,
            emit,
            300,
            e.deltaY || e.deltaX
          );
        },
      },
      [
        useRenderTransition({ name: transitionName.value }, [
          h('table', { key: calendarValue.value.toFormat(DatePickerConst.yearISO) }, [
            h(
              'tbody',
              tableMonths.value.map((row, idx) =>
                h(
                  'tr',
                  { key: `tr-${idx}` },
                  row.map((it, k) =>
                    h('td', { key: `td-${idx}-${k}` }, [
                      createCalendarButton(props, localValue, it, today, 'month', () =>
                        dispatchDateTimeValue(emit, it.value, props.disabled)
                      ),
                    ])
                  )
                )
              )
            ),
          ]),
        ]),
      ]
    ),
    [
      [
        Touch,
        {
          left: (e: WheelEvent) => {
            (e.deltaX < -10 || e.deltaX > 10) &&
              shiftDatePickerCalendar(
                DatePickerConst.MONTH as TDateTimePickerMode,
                calendarValue.value,
                emit,
                e.deltaX * -1
              );
          },
          right: (e: WheelEvent) => {
            (e.deltaX < -10 || e.deltaX > 10) &&
              shiftDatePickerCalendar(
                DatePickerConst.MONTH as TDateTimePickerMode,
                calendarValue.value,
                emit,
                e.deltaX * -1
              );
          },
        },
      ],
    ]
  );
}

export function useRenderDatePickerYears(
  emit: EmitFn,
  props: Readonly<TDatePickerCalendarProps>,
  transitionName: ComputedRef<string>,
  tableYears: ComputedRef<TValueText<DateTime>[][]>,
  localValue: Ref<DateTime>,
  calendarValue: Ref<DateTime>,
  debounceRef: TDebounce
): VNode {
  const today = DateTime.now();

  return withDirectives(
    h(
      'div',
      {
        class: [`${cssPrefix}datepicker-years`, 'relative', 'overflow-hidden'],
        onWheel: (e: WheelEvent) => {
          e.preventDefault();
          debounceShiftDatePickerCalendar(
            debounceRef,
            DatePickerConst.YEAR as TDateTimePickerMode,
            calendarValue,
            emit,
            300,
            e.deltaY || e.deltaX
          );
        },
      },
      [
        useRenderTransition({ name: transitionName.value }, [
          h('table', { key: calendarValue.value.toISODate() as string }, [
            h(
              'tbody',
              tableYears.value.map((row, idx) =>
                h(
                  'tr',
                  { key: `tr-${idx}` },
                  row.map((it, k) =>
                    h('td', { key: `td-${idx}-${k}` }, [
                      createCalendarButton(props, localValue, it, today, 'year', () =>
                        dispatchDateTimeValue(emit, it.value, props.disabled)
                      ),
                    ])
                  )
                )
              )
            ),
          ]),
        ]),
      ]
    ),
    [
      [
        Touch,
        {
          left: (e: WheelEvent) => {
            (e.deltaX < -10 || e.deltaX > 10) &&
              shiftDatePickerCalendar(
                DatePickerConst.YEAR as TDateTimePickerMode,
                calendarValue.value,
                emit,
                e.deltaX * -1
              );
          },
          right: (e: WheelEvent) => {
            (e.deltaX < -10 || e.deltaX > 10) &&
              shiftDatePickerCalendar(
                DatePickerConst.YEAR as TDateTimePickerMode,
                calendarValue.value,
                emit,
                e.deltaX * -1
              );
          },
        },
      ],
    ]
  );
}
