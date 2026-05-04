import BsDatePickerDays from '@/components/DatePicker/BsDatePickerDays.ts';
import BsDatePickerHeader from '@/components/DatePicker/BsDatePickerHeader.ts';
import BsDatePickerMonths from '@/components/DatePicker/BsDatePickerMonths.ts';
import BsDatePickerNav from '@/components/DatePicker/BsDatePickerNav.ts';
import BsDatePickerTimes from '@/components/DatePicker/BsDatePickerTimes.ts';
import BsDatePickerYears from '@/components/DatePicker/BsDatePickerYears.ts';
import type { TDatePickerOptionProps, TDateTimePickerMode } from '@/components/DatePicker/types';
import type { TTimePickerMode } from '@/components/DatePicker/types/internals.ts';
import { cssPrefix, useBreakpointMin, useRenderTransition } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper.ts';
import { DateTime } from 'luxon';
import {
  type ComputedRef,
  type EmitFn,
  h,
  normalizeClass,
  type Ref,
  type VNode,
  type VNodeArrayChildren,
  watch,
} from 'vue';

export const DatePickerConst = {
  viewModes: ['datetime', 'date', 'month', 'year', 'time'] as TDateTimePickerMode[],
  defaultLocale: 'en-US',
  shortDateISO: 'yyyy-MM-dd',
  shortDateTimeISO: 'yyyy-MM-dd HH:mm:ss',
  yearISO: 'yyyy',
  yearMonthISO: 'yyyy-MM',
  DAY: 'day',
  DATE: 'date',
  DATETIME: 'datetime',
  MONTH: 'month',
  YEAR: 'year',
  TIME: 'time' as TTimePickerMode,
  HOUR: 'hour' as TTimePickerMode,
  MINUTE: 'minute' as TTimePickerMode,
  SECOND: 'second' as TTimePickerMode,
  transition: 'tab-transition',
  transitionReverse: 'tab-transition-reverse',
};

export function useParseDate(value?: string | number | Date | null): DateTime {
  if (value) {
    if (Helper.isString(value)) {
      try {
        return DateTime.fromISO(value);
      } catch (_e) {
        try {
          return DateTime.fromSQL(value);
        } catch (_e) {
          return DateTime.now().set({ millisecond: 0 });
        }
      }
    } else if (Helper.isNumber(value)) {
      return DateTime.fromSeconds(value);
    } else {
      return DateTime.fromJSDate(value);
    }
  }

  return DateTime.now().set({ millisecond: 0 });
}

function selectedButtonColor(props: Readonly<TDatePickerOptionProps>) {
  if (props.selectedColor) {
    return props.selectedColor;
  }

  const color = props.headerColor?.split(' ')[0];
  if (color) {
    if (color.startsWith('text-bg-')) {
      return color.substring(8);
    } else if (color.startsWith('text-')) {
      return color.substring(5);
    } else if (color.startsWith('bg-')) {
      return color.substring(3);
    }

    return color;
  }

  return 'primary';
}

function createDatePickerContainer(
  props: Readonly<TDatePickerOptionProps>,
  isLandscapeMode: boolean,
  children: VNode[]
): VNode {
  return h(
    'div',
    {
      class: {
        [`${cssPrefix}datepicker`]: true,
        [`${cssPrefix}landscape`]: isLandscapeMode,
        'inline-flex': isLandscapeMode,
        flex: props.fullWidth === true,
        relative: true,
      },
      style: {
        width:
          (!props.landscape && !props.fullWidth) ||
          (props.landscape === true && !useBreakpointMin('md') && !props.fullWidth)
            ? Helper.cssUnit(props.width)
            : undefined,
      },
    },
    children
  );
}

function createDatePickerContainerInner(
  props: Readonly<TDatePickerOptionProps>,
  children: VNodeArrayChildren
): VNode {
  return h(
    'div',
    {
      class: {
        [`${cssPrefix}datepicker-inner`]: true,
        'w-full': true,
        flex: props.landscape === true && useBreakpointMin('md'),
      },
    },
    children
  );
}

function createDatePickerBody(
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  children: VNode[]
): VNode {
  return h(
    'div',
    {
      class: normalizeClass([
        {
          [`${cssPrefix}datepicker-body`]: true,
          [`bg-${props.surfaceColor}`]: props.surfaceColor && !props.surfaceClass,
          ['flex items-center']: pickerMode.value === DatePickerConst.TIME,
          relative: true,
        },
        props.surfaceClass,
      ]),
      style: {
        width:
          props.landscape && useBreakpointMin('md') && !props.fullWidth
            ? Helper.cssUnit(props.width)
            : undefined,
      },
    },
    children
  );
}

function createDatePickerHeaderPanel(
  props: Readonly<TDatePickerOptionProps>,
  showTime: ComputedRef<boolean>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  locale: Ref<string>,
  value: Date
): VNode {
  return h(BsDatePickerHeader, {
    locale: locale.value,
    modelValue: value,
    displayMode: currentView.value,
    pickerMode: pickerMode.value,
    color: props.headerColor,
    enableTime: showTime.value,
    landscape: props.landscape,
    // readonly: props.readonly,
    onChangeView: (view: TDateTimePickerMode) => {
      currentView.value = view;
    },
  });
}

function nextDisplayMode(
  pickerMode: TDateTimePickerMode,
  currentMode: TDateTimePickerMode
): TDateTimePickerMode {
  if (pickerMode === 'time') {
    return 'time';
  }

  let modes: TDateTimePickerMode[] = DatePickerConst.viewModes.filter(
    (m) => m !== 'datetime' && m !== 'time'
  );

  if (pickerMode === 'month') {
    modes = modes.filter((m) => m !== 'date');
  } else if (pickerMode === 'year') {
    modes = modes.filter((m) => m !== 'date' && m !== 'month');
  } else if (pickerMode === 'datetime') {
    modes.push('time');
  }

  const idx = modes.indexOf(currentMode) + 1;

  if (idx >= modes.length) {
    return modes[0];
  } else {
    return modes[idx];
  }
}

function createDatePickerNav(
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  calendarValue: Ref<Date>,
  locale: Ref<string>
): VNode {
  return useRenderTransition(
    {
      name: 'fade',
    },
    [
      currentView.value !== DatePickerConst.TIME
        ? h(BsDatePickerNav, {
            buttonColor: props.buttonColor || 'secondary',
            displayMode: currentView.value,
            // disabled: props.readonly,
            locale: locale.value,
            modelValue: calendarValue.value,
            onToggle: (view: TDateTimePickerMode) => {
              currentView.value = nextDisplayMode(pickerMode.value, view);
            },
            'onUpdate:modelValue': (value: Date) => {
              calendarValue.value = value;
            },
          })
        : undefined,
    ]
  );
}

function dispatchDatePickerValue(emit: EmitFn, pickerMode: TDateTimePickerMode, value: Date): void {
  if (pickerMode === DatePickerConst.YEAR) {
    emit('update:model-value', value.getFullYear().toString(10));
  } else if (pickerMode === DatePickerConst.MONTH) {
    emit('update:model-value', DateTime.fromJSDate(value).toFormat('yyyy-MM'));
  } else if (pickerMode === DatePickerConst.DATE) {
    emit('update:model-value', DateTime.fromJSDate(value).toISODate());
  } else if (pickerMode === DatePickerConst.TIME) {
    emit(
      'update:model-value',
      DateTime.fromJSDate(value).toISOTime({ suppressMilliseconds: true })
    );
  } else {
    emit('update:model-value', DateTime.fromJSDate(value).toISO({ suppressMilliseconds: true }));
  }
}

function createDatePickerDays(
  emit: EmitFn,
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  calendarValue: Ref<Date>,
  locale: Ref<string>,
  value: Date
): VNode {
  return h(BsDatePickerDays, {
    locale: locale.value,
    modelValue: value,
    disabled: props.readonly,
    calendarDate: calendarValue.value,
    calendarButton: props.buttonColor || 'secondary',
    selectedColor: selectedButtonColor(props),
    'onUpdate:modelValue': (value: Date) => {
      // calendarValue.value = value;
      dispatchDatePickerValue(emit, pickerMode.value, value);
    },
    'onChange:calendar': (value: Date) => {
      calendarValue.value = value;
    },
  });
}

function createDatePickerMonth(
  emit: EmitFn,
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  calendarValue: Ref<Date>,
  locale: Ref<string>,
  value: Date
): VNode {
  return h(BsDatePickerMonths, {
    locale: locale.value,
    modelValue: value,
    disabled: props.readonly,
    calendarDate: calendarValue.value,
    calendarButton: props.buttonColor || 'secondary',
    selectedColor: selectedButtonColor(props),
    'onUpdate:modelValue': (value: Date) => {
      calendarValue.value = value;
      dispatchDatePickerValue(emit, pickerMode.value, value);

      if ([DatePickerConst.DATE, DatePickerConst.DATETIME].includes(pickerMode.value)) {
        currentView.value = DatePickerConst.DATE as TDateTimePickerMode;
      }
    },
    'onChange:calendar': (value: Date) => {
      calendarValue.value = value;
    },
  });
}

function createDatePickerYears(
  emit: EmitFn,
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  calendarValue: Ref<Date>,
  locale: Ref<string>,
  value: Date
): VNode {
  return h(BsDatePickerYears, {
    locale: locale.value,
    modelValue: value,
    disabled: props.readonly,
    calendarDate: calendarValue.value,
    calendarButton: props.buttonColor || 'secondary',
    selectedColor: selectedButtonColor(props),
    'onUpdate:modelValue': (value: Date) => {
      dispatchDatePickerValue(emit, pickerMode.value, value);

      if (
        [DatePickerConst.DATE, DatePickerConst.DATETIME, DatePickerConst.MONTH].includes(
          pickerMode.value
        )
      ) {
        currentView.value = DatePickerConst.MONTH as TDateTimePickerMode;
      }
    },
    'onChange:calendar': (value: Date) => {
      calendarValue.value = value;
    },
  });
}

function createDatePickerTimes(
  emit: EmitFn,
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  calendarValue: Ref<Date>,
  locale: Ref<string>,
  value: Date
): VNode {
  return h(BsDatePickerTimes, {
    locale: locale.value,
    modelValue: value,
    disabled: props.readonly,
    calendarButton: props.buttonColor || 'secondary',
    selectedColor: selectedButtonColor(props),
    backButton: pickerMode.value !== DatePickerConst.TIME,
    onClose: () => {
      currentView.value = DatePickerConst.DATE as TDateTimePickerMode;
    },
    'onUpdate:modelValue': (value: Date) => {
      calendarValue.value = value;
      dispatchDatePickerValue(emit, pickerMode.value, value);

      if (pickerMode.value === DatePickerConst.DATETIME) {
        currentView.value = DatePickerConst.TIME as TDateTimePickerMode;
      }
    },
  });
}

export function useRenderDatePicker(
  emit: EmitFn,
  props: Readonly<TDatePickerOptionProps>,
  showTime: ComputedRef<boolean>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  locale: Ref<string>,
  localValue: Ref<DateTime>,
  calendarValue: Ref<Date>
): VNode {
  const thisValue = localValue.value.toJSDate();
  const isLandscapeMode = props.landscape === true && useBreakpointMin('md') && !props.fullWidth;

  return createDatePickerContainer(props, isLandscapeMode, [
    createDatePickerContainerInner(props, [
      props.headerPanel === true
        ? createDatePickerHeaderPanel(props, showTime, pickerMode, currentView, locale, thisValue)
        : undefined,
      createDatePickerBody(props, pickerMode, [
        createDatePickerNav(props, pickerMode, currentView, calendarValue, locale),
        useRenderTransition(
          {
            name: 'fade',
            mode: 'out-in',
          },
          [
            currentView.value === DatePickerConst.DATE
              ? createDatePickerDays(emit, props, pickerMode, calendarValue, locale, thisValue)
              : undefined,
            currentView.value === DatePickerConst.MONTH
              ? createDatePickerMonth(
                  emit,
                  props,
                  pickerMode,
                  currentView,
                  calendarValue,
                  locale,
                  thisValue
                )
              : undefined,
            currentView.value === DatePickerConst.YEAR
              ? createDatePickerYears(
                  emit,
                  props,
                  pickerMode,
                  currentView,
                  calendarValue,
                  locale,
                  thisValue
                )
              : undefined,
            currentView.value === DatePickerConst.TIME
              ? createDatePickerTimes(
                  emit,
                  props,
                  pickerMode,
                  currentView,
                  calendarValue,
                  locale,
                  thisValue
                )
              : undefined,
          ]
        ),
      ]),
    ]),
  ]);
}

export function useSetupDatePickerWatchers(
  props: Readonly<TDatePickerOptionProps>,
  pickerMode: ComputedRef<TDateTimePickerMode>,
  currentView: Ref<TDateTimePickerMode>,
  locale: Ref<string>,
  localValue: Ref<DateTime>,
  calendarValue: Ref<Date>
): void {
  const ensureViewMode = () => {
    if (currentView.value === DatePickerConst.DATETIME) {
      currentView.value = DatePickerConst.DATE as TDateTimePickerMode;
    }
  };

  ensureViewMode();
  watch(
    () => props.viewMode || props.mode,
    (value) => {
      value && (currentView.value = value);
      ensureViewMode();
    }
  );

  watch(
    () => props.modelValue,
    (value) => {
      localValue.value = useParseDate(value).setLocale(locale.value);
      if (pickerMode.value !== DatePickerConst.YEAR) {
        calendarValue.value = localValue.value.toJSDate();
      }
    }
  );

  watch(
    () => props.locale,
    (value) => {
      if (value) {
        locale.value = value;
        localValue.value = localValue.value.setLocale(value);
      }
    }
  );
}
