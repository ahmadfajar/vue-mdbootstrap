import {DateTime, DateTimeUnit, DurationObjectUnits} from "luxon";
import type {ComputedRef, ExtractPropTypes, Ref, VNode} from "vue";
import {computed, createCommentVNode, h, ref, toDisplayString, watch} from "vue";
import {cssPrefix, useRenderTransition} from "../../../mixins/CommonApi";
import type {
    TBsDatePicker,
    TDatePickerBaseProps,
    TDatePickerCalendarProps,
    TDatePickerHeaderProps,
    TDatePickerNavProps,
    TDatePickerOptionProps,
    TDateTimePickerMode,
    TEmitFn,
    TRecord,
    TTimePickerMode,
    TTimePickerProps,
    TValueText
} from "../../../types";
import {BsButton} from "../../Button";
import Helper from "../../../utils/Helper";
import BsDatePickerHeader from "../BsDatePickerHeader";
import BsDatePickerNav from "../BsDatePickerNav";
import BsDatePickerDays from "../BsDatePickerDays";
import BsDatePickerMonths from "../BsDatePickerMonths";
import BsDatePickerYears from "../BsDatePickerYears";
import BsDatePickerTimes from "../BsDatePickerTimes";


export const DatePickerConst = {
    viewModes: ["datetime", "date", "month", "year", "time"] as TDateTimePickerMode[],
    defaultLocale: "en-US",
    shortDateISO: "yyyy-MM-DD",
    shortDateTimeISO: "yyyy-MM-DD HH:mm:ss",
    yearISO: "yyyy",
    yearMonthISO: "yyyy-MM",
    DAY: "day",
    DATE: "date",
    DATETIME: "datetime",
    MONTH: "month",
    YEAR: "year",
    TIME: "time" as TTimePickerMode,
    HOUR: "hour" as TTimePickerMode,
    MINUTE: "minute" as TTimePickerMode,
    SECOND: "second" as TTimePickerMode,
    transition: "tab-transition",
    transitionReverse: "tab-transition-reverse",
};

export function useDatePickerHeaderStyles(
    props: Readonly<TDatePickerHeaderProps>,
    isYearActive: ComputedRef<boolean>,
    isTimeActive: ComputedRef<boolean>,
    isTitleActive: ComputedRef<boolean>,
): TRecord {
    const initial = {
        "pointer-events": props.readonly ? "none" : undefined,
    };
    const yearStyle = {
        ...initial,
        "cursor": [DatePickerConst.DATE, DatePickerConst.DATETIME, DatePickerConst.MONTH].includes(<TDateTimePickerMode>props.pickerMode)
        && !isYearActive.value ? "pointer" : undefined,
    };
    const timeStyle = {
        ...initial,
        "cursor": [DatePickerConst.DATE, DatePickerConst.DATETIME].includes(<TDateTimePickerMode>props.pickerMode)
        && !isTimeActive.value ? "pointer" : undefined,
    };
    const titleStyle = {
        ...initial,
        "cursor": [DatePickerConst.DATE, DatePickerConst.DATETIME, DatePickerConst.MONTH].includes(<TDateTimePickerMode>props.pickerMode)
        && !isTitleActive.value ? "pointer" : undefined,
    };

    return {year: yearStyle, time: timeStyle, title: titleStyle}
}

export function useWatchOfDatePickerBaseProps(
    props: Readonly<TDatePickerBaseProps>,
    localValue: Ref<DateTime>,
    reverse?: Ref<boolean>,
    dateRef?: Ref<DateTime>,
) {
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

export function useHeaderTitleFormatOpts(value?: TDateTimePickerMode | string): Intl.DateTimeFormatOptions {
    if (value === DatePickerConst.YEAR) {
        return {year: "numeric"};
    } else if (value === DatePickerConst.MONTH) {
        return {month: "long", year: "numeric"}
    } else if (value === DatePickerConst.TIME) {
        return DateTime.DATE_SHORT;
    } else {
        return {
            weekday: "long",
            month: "short",
            day: "numeric"
        }
    }
}

export function useWatchOfDatePickerHeaderProps(
    props: Readonly<TDatePickerHeaderProps>,
    formatOpts: Ref<Intl.DateTimeFormatOptions>,
    localValue: Ref<DateTime>,
    reverse: Ref<boolean>,
) {
    useWatchOfDatePickerBaseProps(props, localValue, reverse);

    watch(
        () => props.pickerMode,
        (value) => {
            formatOpts.value = useHeaderTitleFormatOpts(value);
        }
    );
}

export function useWatchOfDatePickerNavProps(
    props: Readonly<TDatePickerNavProps>,
    formatOpts: Ref<Intl.DateTimeFormatOptions>,
    localValue: Ref<DateTime>,
    reverse: Ref<boolean>,
) {
    useWatchOfDatePickerBaseProps(props, localValue, reverse);

    watch(
        () => props.displayMode,
        (value) => {
            if (value === DatePickerConst.YEAR || value === DatePickerConst.MONTH) {
                formatOpts.value = {year: "numeric"};
            } else {
                formatOpts.value = {
                    month: "long",
                    year: "numeric"
                }
            }
        }
    );
}

export function useRenderDatePickerHeader(
    props: Readonly<TDatePickerHeaderProps>,
    emit: TEmitFn,
    styles: ComputedRef<TRecord>,
    isYearActive: ComputedRef<boolean>,
    isTimeActive: ComputedRef<boolean>,
    isTitleActive: ComputedRef<boolean>,
    transitionName: ComputedRef<string>,
    formatOpts: Ref<Intl.DateTimeFormatOptions>,
    localValue: Ref<DateTime>,
): VNode {
    return h("div", {
        class: {
            [`${cssPrefix}datepicker-header`]: true,
            [`bg-${props.color}`]: props.color,
        }
    }, [
        h("div", {
            class: [
                `${cssPrefix}datepicker-subtitle`,
                "d-flex justify-content-between",
            ]
        }, [
            h(
                "div",
                {
                    class: [
                        `${cssPrefix}datepicker-year`,
                        "d-inline-block",
                        isYearActive.value ? "active" : ""
                    ],
                    style: styles.value.year,
                    onClick: () => {
                        if (!isYearActive.value && ["date", "datetime", "month"].includes(<string>props.pickerMode)) {
                            emit("change-view", DatePickerConst.YEAR);
                        }
                    }
                }, [
                    [DatePickerConst.MONTH, DatePickerConst.YEAR, DatePickerConst.TIME].includes(<string>props.pickerMode)
                        ? ""
                        : localValue.value.toLocaleString({year: "numeric"})
                ]
            ),
            (
                props.enableTime
                    ? h(
                        "div",
                        {
                            class: [
                                `${cssPrefix}datepicker-time`,
                                "d-inline-block",
                                isTimeActive.value ? "active" : ""
                            ],
                            style: styles.value.time,
                            onClick: () => {
                                if (!isTimeActive.value) {
                                    emit("change-view", DatePickerConst.TIME);
                                }
                            }
                        },
                        localValue.value.toLocaleString(DateTime.TIME_SIMPLE)
                    )
                    : createCommentVNode(" v-if-time ")
            ),
        ]),
        h("div", {
            class: [
                `${cssPrefix}datepicker-title`,
                isTitleActive.value ? "active" : ""
            ],
            style: styles.value.title,
            onClick: () => {
                if (!isTitleActive.value && ["date", "datetime", "month"].includes(<string>props.pickerMode)) {
                    emit(
                        "change-view",
                        props.pickerMode === DatePickerConst.MONTH
                            ? DatePickerConst.MONTH
                            : DatePickerConst.DATE
                    );
                }
            }
        }, [
            useRenderTransition({
                name: transitionName.value,
            }, [
                h("div", {
                    key: localValue.value.toISODate()
                }, [
                    props.landscape === true
                        ? h("span", {
                            innerHTML: localValue.value.toLocaleString(formatOpts.value).replace(", ", ",<br/>")
                        })
                        : localValue.value.toLocaleString(formatOpts.value)
                ])
            ]),
        ])
    ])
}

function createCalendarNavButton(
    color: string,
    icon: string,
    iconSize: number,
    disabled: boolean | undefined,
    clickHandler: VoidFunction,
): VNode {
    // @ts-ignore
    return h(BsButton, {
        color: color,
        icon: icon,
        iconSize: iconSize,
        mode: "icon",
        disabled: disabled,
        flat: true,
        onClick: clickHandler
    })
}

export function useRenderDatePickerNav(
    props: Readonly<TDatePickerNavProps>,
    emit: TEmitFn,
    transitionName: ComputedRef<string>,
    formatOpts: Ref<Intl.DateTimeFormatOptions>,
    localValue: Ref<DateTime>,
): VNode {
    const text = formatDatePickerNavTitle(props, formatOpts, localValue);

    return h("div", {
        class: [`${cssPrefix}datepicker-nav`]
    }, [
        createCalendarNavButton(
            (props.buttonColor || "dark"),
            "chevron_left", 30,
            props.disabled,
            () => datePickerNavButtonHandler(props, localValue, emit, -1),
        ),
        h("div", {
            class: [`${cssPrefix}datepicker-nav-title`, props.disabled ? "disabled" : ""],
            onClick: () => {
                !props.disabled && emit("toggle", props.displayMode);
            },
        }, [
            useRenderTransition({
                name: transitionName.value
            }, [
                h("div", {
                    key: text,
                    class: [`${cssPrefix}fw-bold`]
                }, text)
            ])
        ]),
        createCalendarNavButton(
            (props.buttonColor || "dark"),
            "chevron_right", 30,
            props.disabled,
            () => datePickerNavButtonHandler(props, localValue, emit, 1),
        ),
    ])
}

function formatYearSpan(value: DateTime): string {
    const fmt = Intl.NumberFormat(value.locale, {useGrouping: false});
    const year = value.year;
    const y1 = fmt.format(year - 4);
    const y2 = fmt.format(year + 7);

    return `${y1} - ${y2}`;
}

function formatDatePickerNavTitle(
    props: Readonly<TDatePickerNavProps>,
    formatOpts: Ref<Intl.DateTimeFormatOptions>,
    localValue: Ref<DateTime>,
): string {
    if (props.displayMode === DatePickerConst.DATE) {
        return localValue.value.toLocaleString(formatOpts.value);
    } else if (props.displayMode === DatePickerConst.MONTH) {
        return localValue.value.toLocaleString({year: "numeric"});
    } else {
        return formatYearSpan(localValue.value);
    }
}

function dispatchDateTimeValue(
    emit: TEmitFn,
    value: DateTime,
    isDisabled?: boolean,
) {
    if (!isDisabled) {
        emit("update:model-value", value.toJSDate());
    }
}

function datePickerNavButtonHandler(
    props: Readonly<TDatePickerNavProps>,
    localValue: Ref<DateTime>,
    emit: TEmitFn,
    movement: number,
) {
    if (props.disabled) {
        return;
    }
    if (props.displayMode === DatePickerConst.YEAR) {
        localValue.value = shiftYearTo(localValue.value, (movement > 0 ? 12 : (movement < 0 ? -12 : 0)));
    } else if (props.displayMode === DatePickerConst.MONTH) {
        localValue.value = shiftYearTo(localValue.value, movement);
    } else {
        localValue.value = shiftMonthTo(localValue.value, movement);
    }

    dispatchDateTimeValue(emit, localValue.value);
}

function shiftMonthTo(date: DateTime, length: number): DateTime {
    if (length !== 0) {
        return date.plus({months: length})
    }

    return date;
}

function shiftYearTo(date: DateTime, length: number): DateTime {
    if (length !== 0) {
        return date.plus({years: length})
    }

    return date;
}

function shiftDateTimeTo(date: DateTime, unit: keyof DurationObjectUnits, length: number): DateTime {
    if (length !== 0) {
        return date.plus({[`${unit}`]: length})
    }

    return date;
}

function shiftDateTimeThenDispatch(
    emit: TEmitFn,
    value: DateTime,
    unit: keyof DurationObjectUnits,
    length: number,
    isDisabled?: boolean,
) {
    if (!isDisabled) {
        const result = shiftDateTimeTo(value, unit, length);
        dispatchDateTimeValue(emit, result, isDisabled);
    }
}

function weekdayNames(locale?: string): string[] {
    const formatter = new Intl.DateTimeFormat(locale, {weekday: "narrow"});
    // create weekday names. 2017-01-15 is Sunday
    return Helper.createRange(7).map(i => formatter.format(new Date(2017, 0, i + 15)));
}

export function useDatePickerCalenderSetup(
    props: Readonly<TDatePickerCalendarProps>,
) {
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

    return {reverse, localValue, calendarDate, transitionName}
}

export function useRenderDatePickerDays(
    props: Readonly<TDatePickerCalendarProps>,
    emit: TEmitFn,
    transitionName: ComputedRef<string>,
    tableDays: ComputedRef<TValueText<DateTime | undefined>[][]>,
    localValue: Ref<DateTime>,
    calendarValue: Ref<DateTime>,
): VNode {
    const dayNames = weekdayNames(props.locale);
    const today = DateTime.now();

    return h("div", {
        class: [`${cssPrefix}datepicker-days`]
    }, [
        useRenderTransition({
            name: transitionName.value
        }, [
            h("table", {
                key: calendarValue.value.toFormat(DatePickerConst.yearMonthISO)
            }, [
                h("thead", [
                    h(
                        "tr",
                        dayNames.map(el =>
                            h("th", {
                                key: `th-${el}`
                            }, toDisplayString(el))
                        ),
                    ),
                ]),
                h(
                    "tbody",
                    tableDays.value.map((row, idx) =>
                        h("tr", {
                                key: `tr-${idx}`
                            },
                            row.map((it, k) =>
                                h("td", {
                                    key: `td-${idx}-${k}`
                                }, [
                                    it.value
                                        ? createCalendarDayButton(
                                            props, localValue, <TValueText<DateTime>>it, today,
                                            () => dispatchDateTimeValue(emit, <DateTime>it.value, props.disabled),
                                        ) : "",
                                ])
                            )
                        )
                    ),
                ),
            ]),
        ]),
    ]);
}

function createCalendarDayButton(
    props: Readonly<TDatePickerCalendarProps>,
    dateRef: Ref<DateTime>,
    data: TValueText<DateTime>,
    today: DateTime,
    clickHandler: VoidFunction,
): VNode {
    const selected = dateRef.value.hasSame(<DateTime>data.value, "day");
    const isOutlined = today.hasSame(<DateTime>data.value, "day") && !selected;

    // @ts-ignore
    return h(BsButton, {
        size: "sm",
        mode: "icon",
        disabled: props.disabled,
        color: !today.hasSame(data.value, "day") && !selected ? "dark" : props.selectedColor,
        class: isOutlined ? `${cssPrefix}btn-today` : undefined,
        flat: !today.hasSame(data.value, "day") && !selected,
        outlined: isOutlined,
        onClick: clickHandler,
    }, {
        default: () => toDisplayString(data.text)
    });
}

export function useCalendarTableDays(date: DateTime): TValueText<DateTime | undefined>[][] {
    const fmt = Intl.NumberFormat(date.locale);
    const rows: TValueText<DateTime | undefined>[][] = [];
    const numDays = date.daysInMonth + 1;
    const daysBefore: number = (DateTime.local(date.year, date.month, 1).weekday % 7);
    let items: TValueText<DateTime | undefined>[] = [];

    for (let i = 0; i < daysBefore; i++) {
        items.push({text: "0", value: undefined});
    }

    for (let day = 1; day < numDays; day++) {
        items.push({
            text: fmt.format(day),
            value: date.set({day: day})
        });

        if (items.length % 7 === 0) {
            rows.push(items);
            items = [];
        }
    }
    if (items.length > 0) {
        for (let d = items.length; d < 7; d++) {
            items.push({text: "0", value: undefined});
        }
        rows.push(items);
    }

    return rows;
}

export function useCalendarTableMonths(date: DateTime): TValueText<DateTime>[][] {
    const formatOpts: Intl.DateTimeFormatOptions = {month: "short"};
    const numMonths = 12;
    const rows: TValueText<DateTime>[][] = [];
    let items: TValueText<DateTime>[] = [];

    for (let month = 0; month < numMonths; month++) {
        const dateMonth = date.set({month: month + 1});
        items.push({
            value: dateMonth,
            text: dateMonth.toLocaleString(formatOpts)
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
        const dateYear = date.set({year: year});
        items.push({
            value: dateYear,
            text: dateYear.toLocaleString({year: "numeric"})
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

export function useCalendarTableHours(date: DateTime): TValueText<DateTime>[][] {
    const numHours = 24;
    const fmt = Intl.NumberFormat(date.locale, {minimumIntegerDigits: 2});
    const rows: TValueText<DateTime>[][] = [];
    let items: TValueText<DateTime>[] = [];

    for (let num = 0; num < numHours; num++) {
        const dateTime = date.set({hour: num});
        items.push({
            value: dateTime,
            text: fmt.format(num)
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
    const fmt = Intl.NumberFormat(date.locale, {minimumIntegerDigits: 2});
    const rows: TValueText<DateTime>[][] = [];
    let items: TValueText<DateTime>[] = [];

    for (let num = 0; num < numMinutes; num++) {
        if (num === 0 || num % 5 === 0) {
            const dateTime = date.set({minute: num});
            items.push({
                value: dateTime,
                text: fmt.format(num)
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
    const fmt = Intl.NumberFormat(date.locale, {minimumIntegerDigits: 2});
    const rows: TValueText<DateTime>[][] = [];
    let items: TValueText<DateTime>[] = [];

    for (let sec = 0; sec < numSeconds; sec++) {
        if (sec === 0 || sec % 5 === 0) {
            const dateTime = date.set({second: sec});
            items.push({
                value: dateTime,
                text: fmt.format(sec)
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

export function useRenderDatePickerMonths(
    props: Readonly<TDatePickerCalendarProps>,
    emit: TEmitFn,
    transitionName: ComputedRef<string>,
    tableMonths: ComputedRef<TValueText<DateTime>[][]>,
    localValue: Ref<DateTime>,
    calendarValue: Ref<DateTime>,
): VNode {
    const today = DateTime.now();

    return h("div", {
        class: [`${cssPrefix}datepicker-months`]
    }, [
        useRenderTransition({
            name: transitionName.value
        }, [
            h("table", {
                key: calendarValue.value.toFormat(DatePickerConst.yearISO)
            }, [
                h(
                    "tbody",
                    tableMonths.value.map((row, idx) =>
                        h("tr", {
                                key: `tr-${idx}`
                            },
                            row.map((it, k) =>
                                h("td", {
                                    key: `td-${idx}-${k}`
                                }, [
                                    createCalendarButton(
                                        props, localValue, it, today, "month",
                                        () => dispatchDateTimeValue(emit, it.value, props.disabled),
                                    ),
                                ])
                            )
                        )
                    ),
                ),
            ]),
        ]),
    ])
}

function createCalendarButton(
    props: Readonly<TDatePickerCalendarProps>,
    dateRef: Ref<DateTime>,
    data: TValueText<DateTime>,
    today: DateTime,
    unit: DateTimeUnit,
    clickHandler: VoidFunction,
): VNode {
    const selected = dateRef.value.hasSame(data.value, unit);
    const isOutlined = today.hasSame(data.value, unit) && !selected;

    // @ts-ignore
    return h(BsButton, {
        disabled: props.disabled,
        class: isOutlined ? `${cssPrefix}btn-today` : undefined,
        color: !today.hasSame(data.value, unit) && !selected ? "dark" : props.selectedColor,
        flat: !today.hasSame(data.value, unit) && !selected,
        outlined: isOutlined,
        pill: false,
        rounded: true,
        onClick: clickHandler,
    }, {
        default: () => toDisplayString(data.text)
    });
}

export function useRenderDatePickerYears(
    props: Readonly<TDatePickerCalendarProps>,
    emit: TEmitFn,
    transitionName: ComputedRef<string>,
    tableYears: ComputedRef<TValueText<DateTime>[][]>,
    localValue: Ref<DateTime>,
    calendarValue: Ref<DateTime>,
): VNode {
    const today = DateTime.now();

    return h("div", {
        class: [`${cssPrefix}datepicker-years`]
    }, [
        useRenderTransition({
            name: transitionName.value
        }, [
            h("table", {
                key: calendarValue.value.toISODate()
            }, [
                h(
                    "tbody",
                    tableYears.value.map((row, idx) =>
                        h("tr", {
                                key: `tr-${idx}`
                            },
                            row.map((it, k) =>
                                h("td", {
                                    key: `td-${idx}-${k}`
                                }, [
                                    createCalendarButton(
                                        props, localValue, it, today, "year",
                                        () => dispatchDateTimeValue(emit, it.value, props.disabled),
                                    ),
                                ])
                            )
                        )
                    ),
                ),
            ]),
        ]),
    ])
}

export function useRenderDatePickerTimes(
    props: Readonly<TTimePickerProps>,
    emit: TEmitFn,
    tableHours: ComputedRef<TValueText<DateTime>[][]>,
    tableMinutes: ComputedRef<TValueText<DateTime>[][]>,
    tableSeconds: ComputedRef<TValueText<DateTime>[][]>,
    currentView: Ref<TTimePickerMode>,
    localValue: Ref<DateTime>,
): VNode {
    return h("div", {
        class: [`${cssPrefix}datepicker-times`]
    }, [
        (
            props.backButton
                ? h("div", {
                    class: [`${cssPrefix}datepicker-toolbar`]
                }, [
                    createCalendarNavButton(
                        "dark",
                        "arrow_back", 24,
                        false,
                        () => {
                            if (currentView.value === DatePickerConst.TIME) {
                                emit("close");
                            } else {
                                currentView.value = DatePickerConst.TIME;
                            }
                        },
                    ),
                ]) : undefined
        ),
        useRenderTransition({
            name: "fade", mode: "out-in"
        }, [(
            currentView.value === DatePickerConst.TIME
                ? renderPickerTimes(props, emit, currentView, localValue)
                : undefined
        ), (
            currentView.value === DatePickerConst.HOUR
                ? renderPickerTimesUnit(
                    props, emit, [`${cssPrefix}picker-hours`],
                    tableHours, currentView, localValue, "hour",
                )
                : undefined
        ), (
            currentView.value === DatePickerConst.MINUTE
                ? renderPickerTimesUnit(
                    props, emit, [`${cssPrefix}picker-minutes`],
                    tableMinutes, currentView, localValue, "minute",
                )
                : undefined
        ), (
            currentView.value === DatePickerConst.SECOND
                ? renderPickerTimesUnit(
                    props, emit, [`${cssPrefix}picker-seconds`],
                    tableSeconds, currentView, localValue, "second",
                )
                : undefined
        )])
    ])
}

function renderPickerTimes(
    props: Readonly<TTimePickerProps>,
    emit: TEmitFn,
    currentView: Ref<TTimePickerMode>,
    localValue: Ref<DateTime>,
): VNode {
    return h("table", {
        class: [`${cssPrefix}picker-times`, !props.backButton ? "mt-0" : ""]
    }, [
        h("colgroup", [
            h("col"),
            h("col", {
                class: [`${cssPrefix}picker-times-sep`]
            }),
            h("col"),
            h("col", {
                class: [`${cssPrefix}picker-times-sep`]
            }),
            h("col"),
        ]),
        h("tbody", [
            h("tr", [
                h("td", [
                    createCalendarNavButton(
                        "dark",
                        "arrow_drop_up", 32,
                        props.disabled,
                        () => shiftDateTimeThenDispatch(
                            emit, localValue.value,
                            "hours", 1, props.disabled
                        ),
                    )
                ]),
                h("td", " "),
                h("td", [
                    createCalendarNavButton(
                        "dark",
                        "arrow_drop_up", 32,
                        props.disabled,
                        () => shiftDateTimeThenDispatch(
                            emit, localValue.value,
                            "minutes", 1, props.disabled
                        ),
                    )
                ]),
                h("td", " "),
                h("td", [
                    createCalendarNavButton(
                        "dark",
                        "arrow_drop_up", 32,
                        props.disabled,
                        () => shiftDateTimeThenDispatch(
                            emit, localValue.value,
                            "seconds", 1, props.disabled
                        ),
                    )
                ]),
            ]),
            h("tr", [
                h("td", [
                    createPickerTimeButton(
                        localValue.value,
                        "HH",
                        <boolean>props.disabled,
                        () => {
                            if (!props.disabled) {
                                currentView.value = DatePickerConst.HOUR;
                            }
                        }
                    )
                ]),
                h("td", {
                    class: [`${cssPrefix}picker-times-sep`]
                }, ":"),
                h("td", [
                    createPickerTimeButton(
                        localValue.value,
                        "mm",
                        <boolean>props.disabled,
                        () => {
                            if (!props.disabled) {
                                currentView.value = DatePickerConst.MINUTE;
                            }
                        }
                    )
                ]),
                h("td", {
                    class: [`${cssPrefix}picker-times-sep`]
                }, ":"),
                h("td", [
                    createPickerTimeButton(
                        localValue.value,
                        "ss",
                        <boolean>props.disabled,
                        () => {
                            if (!props.disabled) {
                                currentView.value = DatePickerConst.SECOND;
                            }
                        }
                    )
                ]),
            ]),
            h("tr", [
                h("td", [
                    createCalendarNavButton(
                        "dark",
                        "arrow_drop_down", 32,
                        props.disabled,
                        () => shiftDateTimeThenDispatch(
                            emit, localValue.value,
                            "hours", -1, props.disabled
                        ),
                    )
                ]),
                h("td", " "),
                h("td", [
                    createCalendarNavButton(
                        "dark",
                        "arrow_drop_down", 32,
                        props.disabled,
                        () => shiftDateTimeThenDispatch(
                            emit, localValue.value,
                            "minutes", -1, props.disabled
                        ),
                    )
                ]),
                h("td", " "),
                h("td", [
                    createCalendarNavButton(
                        "dark",
                        "arrow_drop_down", 32,
                        props.disabled,
                        () => shiftDateTimeThenDispatch(
                            emit, localValue.value,
                            "seconds", -1, props.disabled
                        ),
                    )
                ]),
            ]),
        ]),
    ])
}

function renderPickerTimesUnit(
    props: Readonly<TTimePickerProps>,
    emit: TEmitFn,
    classes: string[],
    tableData: ComputedRef<TValueText<DateTime>[][]>,
    currentView: Ref<TTimePickerMode>,
    localValue: Ref<DateTime>,
    timeUnit: DateTimeUnit,
): VNode {
    return h("table", {
        class: classes
    }, [
        h("tbody",
            tableData.value.map((row, idx) =>
                h("tr", {
                        key: `tr-${idx}`
                    },
                    row.map((it, k) =>
                        h("td", {
                            key: `td-${idx}-${k}`
                        }, [
                            createCalendarButton(
                                props, localValue, it, localValue.value, timeUnit,
                                () => {
                                    dispatchDateTimeValue(emit, it.value);
                                    currentView.value = DatePickerConst.TIME;
                                },
                            ),
                        ])
                    )
                )
            )
        )
    ])
}

function createPickerTimeButton(
    value: DateTime,
    formatOpts: string,
    isDisabled: boolean,
    clickHandler: VoidFunction,
): VNode {
    // @ts-ignore
    return h(BsButton, {
        disabled: isDisabled,
        color: "dark",
        flat: true,
        pill: false,
        rounded: true,
        onClick: clickHandler,
    }, {
        default: () => toDisplayString(value.toFormat(formatOpts))
    });
}

export function useParseDate(value?: string | number | Date): DateTime {
    if (value) {
        if (Helper.isString(value)) {
            try {
                return DateTime.fromISO(<string>value)
            } catch (e) {
                try {
                    return DateTime.fromSQL(<string>value);
                } catch (e) {
                    return DateTime.now().set({millisecond: 0});
                }
            }
        } else if (Helper.isNumber(value)) {
            return DateTime.fromSeconds(<number>value);
        } else if (value instanceof Date) {
            return DateTime.fromJSDate(value);
        }
    }

    return DateTime.now().set({millisecond: 0});
}

export function useRenderDatePicker(
    props: Readonly<ExtractPropTypes<TBsDatePicker>>,
    emit: TEmitFn,
    showTime: ComputedRef<boolean>,
    pickerMode: Ref<TDateTimePickerMode>,
    currentView: Ref<TDateTimePickerMode>,
    locale: Ref<string>,
    localValue: Ref<DateTime>,
    calendarValue: Ref<Date>,
): VNode {
    const thisProps = props as Readonly<TDatePickerOptionProps>;
    const thisValue = localValue.value.toJSDate();

    return h("div", {
        class: {
            [`${cssPrefix}datepicker`]: true,
            [`${cssPrefix}landscape`]: thisProps.landscape === true,
            "d-inline-flex": thisProps.landscape === true && !thisProps.fullWidth,
            "d-flex": thisProps.fullWidth === true,
        },
        style: {
            width: !thisProps.landscape && !thisProps.fullWidth ? Helper.cssUnit(thisProps.width) : undefined
        }
    }, [
        h("div", {
            class: {
                [`${cssPrefix}datepicker-inner`]: true,
                "d-flex": thisProps.landscape === true,
            }
        }, [
            (
                thisProps.headerPanel === true
                    // @ts-ignore
                    ? h(BsDatePickerHeader, {
                        color: props.headerColor,
                        enableTime: showTime.value,
                        displayMode: currentView.value,
                        pickerMode: pickerMode.value,
                        landscape: props.landscape,
                        locale: locale.value,
                        modelValue: thisValue,
                        readonly: props.readonly,
                        "onChange-view": (mode: TDateTimePickerMode) => {
                            currentView.value = mode;
                        }
                    })
                    : undefined
            ),
            h("div", {
                class: {
                    [`${cssPrefix}datepicker-body`]: true,
                    [`bg-${thisProps.surfaceColor}`]: thisProps.surfaceColor,
                    ["d-flex align-items-center"]: pickerMode.value === DatePickerConst.TIME,
                },
                style: {
                    width: thisProps.landscape && !thisProps.fullWidth ? Helper.cssUnit(thisProps.width) : undefined
                }
            }, [
                useRenderTransition({
                        name: "fade"
                    }, [(
                        currentView.value !== DatePickerConst.TIME
                            // @ts-ignore
                            ? h(BsDatePickerNav, {
                                displayMode: currentView.value,
                                disabled: props.readonly,
                                locale: locale.value,
                                modelValue: calendarValue.value,
                                onToggle: (oldMode: TDateTimePickerMode) => {
                                    currentView.value = nextDisplayMode(pickerMode.value, oldMode);
                                },
                                "onUpdate:model-value": (value: Date) => {
                                    calendarValue.value = value;
                                },
                            })
                            : undefined
                    )]
                ),
                useRenderTransition({
                        name: "fade", mode: "out-in"
                    }, [(
                        currentView.value === DatePickerConst.DATE
                            // @ts-ignore
                            ? h(BsDatePickerDays, {
                                locale: locale.value,
                                modelValue: thisValue,
                                disabled: props.readonly,
                                calendarDate: calendarValue.value,
                                selectedColor: props.headerColor,
                                "onUpdate:model-value": (value: Date) => {
                                    calendarValue.value = value;
                                    dispatchDatePickerValue(emit, pickerMode.value, value);
                                },
                            })
                            : undefined
                    ), (
                        currentView.value === DatePickerConst.MONTH
                            // @ts-ignore
                            ? h(BsDatePickerMonths, {
                                locale: locale.value,
                                modelValue: thisValue,
                                disabled: props.readonly,
                                calendarDate: calendarValue.value,
                                selectedColor: props.headerColor,
                                "onUpdate:model-value": (value: Date) => {
                                    calendarValue.value = value;
                                    dispatchDatePickerValue(emit, pickerMode.value, value);
                                    if ([DatePickerConst.DATE, DatePickerConst.DATETIME].includes(pickerMode.value)) {
                                        currentView.value = <TDateTimePickerMode>DatePickerConst.DATE;
                                    }
                                },
                            })
                            : undefined
                    ), (
                        currentView.value === DatePickerConst.YEAR
                            // @ts-ignore
                            ? h(BsDatePickerYears, {
                                locale: locale.value,
                                modelValue: thisValue,
                                disabled: props.readonly,
                                calendarDate: calendarValue.value,
                                selectedColor: props.headerColor,
                                "onUpdate:model-value": (value: Date) => {
                                    dispatchDatePickerValue(emit, pickerMode.value, value);
                                    if ([DatePickerConst.DATE, DatePickerConst.DATETIME, DatePickerConst.MONTH].includes(pickerMode.value)) {
                                        currentView.value = <TDateTimePickerMode>DatePickerConst.MONTH;
                                    }
                                },
                            })
                            : undefined
                    ), (
                        currentView.value === DatePickerConst.TIME
                            // @ts-ignore
                            ? h(BsDatePickerTimes, {
                                locale: locale.value,
                                modelValue: thisValue,
                                disabled: props.readonly,
                                selectedColor: props.headerColor,
                                backButton: pickerMode.value !== DatePickerConst.TIME,
                                onClose: () => {
                                    currentView.value = <TDateTimePickerMode>DatePickerConst.DATE;
                                },
                                "onUpdate:model-value": (value: Date) => {
                                    calendarValue.value = value;
                                    dispatchDatePickerValue(emit, pickerMode.value, value);
                                },
                            })
                            : undefined
                    )]
                ),
            ]),
        ])
    ]);
}

function dispatchDatePickerValue(
    emit: TEmitFn,
    pickerMode: TDateTimePickerMode,
    value: Date,
) {
    if (pickerMode === DatePickerConst.YEAR) {
        emit("update:model-value", value.getFullYear().toString(10));
    } else if (pickerMode === DatePickerConst.MONTH) {
        emit("update:model-value", DateTime.fromJSDate(value).toFormat("yyyy-MM"));
    } else if (pickerMode === DatePickerConst.DATE) {
        emit("update:model-value", DateTime.fromJSDate(value).toISODate());
    } else if (pickerMode === DatePickerConst.TIME) {
        emit("update:model-value", DateTime.fromJSDate(value).toISOTime({suppressMilliseconds: true}));
    } else {
        emit("update:model-value", DateTime.fromJSDate(value).toISO({suppressMilliseconds: true}));
    }
}

function nextDisplayMode(
    pickerMode: TDateTimePickerMode,
    currentMode: TDateTimePickerMode,
): TDateTimePickerMode {
    if (pickerMode === "time") {
        return "time";
    }

    let modes = DatePickerConst.viewModes.filter(m => m !== "datetime" && m !== "time");

    if (pickerMode === "month") {
        modes = modes.filter(m => m !== "date");
    } else if (pickerMode === "year") {
        modes = modes.filter(m => m !== "date" && m !== "month");
    } else if (pickerMode === "datetime") {
        modes.push("time");
    }

    const idx = modes.indexOf(currentMode) + 1;

    if (idx >= modes.length) {
        return modes[0];
    } else {
        return modes[idx];
    }
}
