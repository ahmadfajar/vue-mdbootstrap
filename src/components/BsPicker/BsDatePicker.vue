<template>
  <bs-picker v-bind="pickerAttrs" class="md-datepicker">
    <template #header>
      <bs-date-picker-header
        v-if="headerPanel"
        v-bind="headerAttrs"
        @change-view="_changePickerView" />
    </template>
    <div class="md-picker-body-wrapper">
      <transition name="fade">
        <bs-date-picker-table-nav
          v-if="showPickerNav"
          v-bind="pickerNavAttrs"
          :value="tableDate.toDate()"
          @input="_updatePickerTable"
          @toggle="togglePicker" />
      </transition>
      <transition name="fade" mode="out-in">
        <bs-date-picker-days
          v-if="activePicker === 'DATE'"
          v-bind="pickerDayAttrs"
          @input="selectDate"
          @update-table="_updatePickerTable" />
        <bs-date-picker-months
          v-if="activePicker === 'MONTH'"
          v-bind="pickerMonthAttrs"
          @input="selectMonth"
          @update-table="_updatePickerTable" />
        <bs-date-picker-years
          v-if="activePicker === 'YEAR'"
          v-bind="pickerYearAttrs"
          @input="selectYear"
          @update-table="_updatePickerTable" />
        <bs-date-picker-times
          v-if="activePicker === 'TIME'"
          v-bind="pickerTimeAttrs"
          @input="selectTime"
          @toggle-view="togglePicker" />
      </transition>
    </div>
  </bs-picker>
</template>

<script>
import moment from "moment";
import BsPicker from "./BsPicker";
import BsDatePickerHeader from "./BsDatePickerHeader";
import BsDatePickerTableNav from "./BsDatePickerTableNav";
import BsDatePickerDays from "./BsDatePickerDays";
import BsDatePickerMonths from "./BsDatePickerMonths";
import BsDatePickerYears from "./BsDatePickerYears";
import BsDatePickerTimes from "./BsDatePickerTimes";
import PickerConst from "./utils/DatePickerConst";
import Helper from "../../utils/Helper";
import createNativeLocaleFormatter from "./utils/createNativeLocaleFormatter";
import "../../../scss/_transitions.scss";

export default {
    name: "BsDatePicker",
    components: {
        BsPicker, BsDatePickerHeader, BsDatePickerDays, BsDatePickerMonths,
        BsDatePickerYears, BsDatePickerTableNav, BsDatePickerTimes
    },
    props: {
        /**
         * Picker color.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'primary'
        },
        /**
         * Define custom date which will be marked as event.
         * (note: belum berfungsi dengan benar)
         * @type {Array|Object|Function}
         */
        events: {
            type: [Array, Object, Function],
            default: () => null
        },
        /**
         * DatePicker date events color.
         * (note: belum berfungsi dengan benar)
         * @type {string|Object|Function}
         */
        eventColor: {
            type: [String, Function, Object],
            default: 'warning'
        },
        /**
         * @type {String|Number|*}
         */
        firstDayOfWeek: {
            type: [String, Number],
            default: 0,
            validator: value => parseInt(value, 10) > -1
        },
        /**
         * The date format for output value, {@see moment} for valid format.
         * @type {string|*}
         */
        format: {
            type: String,
            default: PickerConst.shortLocale
        },
        /**
         * Whether to display DatePicker in 100% width or not.
         * @type {boolean|*}
         */
        fullWidth: {
            type: Boolean,
            default: false
        },
        /**
         * DatePicker header panel color, default is the same as color property.
         * @type {string|*}
         */
        headerColor: {
            type: String,
            default: undefined
        },
        /**
         * Show or hide header panel.
         * @type {boolean|*}
         */
        headerPanel: {
            type: Boolean,
            default: true
        },
        /**
         * Whether to display DatePicker in landscape or portrait orientation.
         * @type {boolean|*}
         */
        landscape: {
            type: Boolean,
            default: false
        },
        /**
         * Define default locale to be used, default "en-us".
         * @type {string|*}
         */
        locale: {
            type: String,
            default: PickerConst.defaultLocale
        },
        /**
         * Can select multiple date or not.
         * (note: belum berfungsi dengan benar)
         * @type {boolean|*}
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * Set minimum date limit in format: YYYY-MM-DD or YYYY-MM.
         * (note: belum berfungsi dengan benar)
         * @type {string|*}
         */
        minDate: {
            type: String,
            default: undefined
        },
        /**
         * Set maximum date limit in format: YYYY-MM-DD or YYYY-MM.
         * (note: belum berfungsi dengan benar)
         * @type {string|*}
         */
        maxDate: {
            type: String,
            default: undefined
        },
        /**
         * Is datepicker will be in readonly mode or not.
         * @type {boolean|*}
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * Mark today date or not.
         * (note: belum berfungsi dengan benar)
         * @type {boolean|*}
         */
        showToday: {
            type: Boolean,
            default: true
        },
        /**
         * The value monitored by `v-model` to maintain the field value.
         * The value must be convertible to datetime.
         * @type {string|number|Date|Array|*}
         */
        value: {
            type: [String, Number, Date, Array],
            default: undefined
        },
        /**
         * DatePicker view mode, valid values are: date, month, year or time
         * @type {string|*}
         */
        viewMode: {
            type: String,
            default: PickerConst.date,
            validator: value => PickerConst.viewModes.indexOf(value) > -1
        },
        /**
         * DatePicker's container width, default is 300px
         * @type {string|number|*}
         */
        width: {
            type: [Number, String],
            default: 300,
            validator: value => parseInt(value, 10) > 0
        }
    },
    data: (vm) => ({
        /**
         * @type {string}
         */
        activePicker: vm.viewMode.toUpperCase(),
        /**
         * @type {moment.Moment}
         */
        dateValue: (() => {
            moment.locale(vm.locale);
            if (vm.multiple && Helper.isArray(vm.value) && vm.value.length > 0) {
                return moment(vm.value[vm.value.length - 1], [vm.format, PickerConst.shortISO]);
            } else if (!Helper.isEmpty(vm.value) && Helper.isPrimitive(vm.value)) {
                return moment(vm.value, [vm.format, PickerConst.shortISO]);
            } else {
                return moment();
            }
        })(),
        /**
         * @type {moment.Moment}
         */
        tableDate: (() => {
            moment.locale(vm.locale);
            if (vm.multiple && Helper.isArray(vm.value) && vm.value.length > 0) {
                return moment(vm.value[vm.value.length - 1], [vm.format, PickerConst.shortISO]);
            } else if (!Helper.isEmpty(vm.value) && Helper.isPrimitive(vm.value)) {
                return moment(vm.value, [vm.format, PickerConst.shortISO]);
            } else {
                return moment();
            }
        })()
    }),
    computed: {
        /**
         * Get default picker computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        defaultAttrs() {
            return {
                color: this.color,
                disabled: this.readonly,
                locale: this.locale,
                minDate: this.minDate,
                maxDate: this.maxDate,
            }
        },
        /**
         * Get title header panel's format function if value is an array.
         *
         * @returns {Function} A function to format the selected date
         */
        defaultTitleMultipleDateFormatter() {
            if (this.value.length < 2) {
                return dates => dates.length ? this.defaultTitleDateFormatter(dates[0]) : '0 selected';
            }

            return dates => `${dates.length} selected`;
        },
        /**
         * Get title header panel's format function if value is string.
         *
         * @returns {Function} A function to format the selected date
         */
        defaultTitleDateFormatter() {
            const titleFormats = {
                year: {year: 'numeric', timeZone: 'UTC'},
                month: {month: 'long', timeZone: 'UTC'},
                date: {weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC'}
            };

            const titleDateFormatter = createNativeLocaleFormatter(this.locale, titleFormats[this.viewMode], {
                start: 0,
                length: {date: 10, month: 7, year: 4}[this.viewMode]
            });

            const landscapeFormatter = date => titleDateFormatter(date)
                .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
                .replace(', ', ',<br>');

            return this.landscape ? landscapeFormatter : titleDateFormatter;
        },
        /**
         * Get formatted value of Year and Days.
         *
         * @returns {Object} Header panel values
         */
        formatters() {
            return {
                year: createNativeLocaleFormatter(this.locale, {year: 'numeric', timeZone: 'UTC'}, {length: 4}),
                titleDate: (this.multiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
            }
        },
        /**
         * Get header panel computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        headerAttrs() {
            moment.locale(this.locale);
            const _date = !Helper.isEmpty(this.value) ? this.dateValue.format(PickerConst.shortISO) : null;
            const _now = moment();

            return {
                readonly: this.readonly,
                activePicker: this.activePicker,
                enableTime: this.isTimeEnabled,
                year: [PickerConst.date, PickerConst.month].indexOf(this.viewMode) > -1
                    ? _date ? this.dateValue.year() : _now.year() : '',
                date: _date ? _date : moment().format(PickerConst.shortISO),
                time: _date && this.isTimeEnabled ? this.dateValue.format('LT') : _now.format('LT'),
                value: _date
                    ? this.formatters.titleDate(_date)
                    : this.formatters.titleDate(_now.format(PickerConst.shortISO))
            }
        },
        /**
         * Check if TimePicker is enabled or disabled.
         *
         * @returns {boolean} TRUE if TimePicker is enabled otherwise FALSE
         */
        isTimeEnabled() {
            if (this.viewMode === PickerConst.date) {
                return this.format.search(/(lll|lt|h)/i) > -1;
            } else {
                return this.viewMode === PickerConst.time;
            }
        },
        /**
         * Get picker container binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        pickerAttrs() {
            return {
                headerColor: this.headerColor || this.color,
                fullWidth: this.fullWidth,
                landscape: this.landscape,
                width: this.width
            }
        },
        /**
         * Get DayPicker computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        pickerDayAttrs() {
            return {
                ...this.defaultAttrs,
                format: this.format,
                events: this.events,
                eventColor: this.eventColor,
                firstDayOfWeek: this.firstDayOfWeek,
                tableDate: this.tableDate.toDate(),
                value: !Helper.isEmpty(this.value) ? this.dateValue.toDate() : null
            }
        },
        /**
         * Get MonthPicker computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        pickerMonthAttrs() {
            return {
                ...this.defaultAttrs,
                tableDate: this.tableDate.toDate(),
                value: !Helper.isEmpty(this.value) ? this.dateValue.toDate() : null
            }
        },
        /**
         * Get YearPicker computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        pickerYearAttrs() {
            return {
                ...this.defaultAttrs,
                tableDate: this.tableDate.toDate(),
                value: !Helper.isEmpty(this.value) ? this.dateValue.toDate() : null
            }
        },
        /**
         * Get TimePicker computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        pickerTimeAttrs() {
            return {
                ...this.defaultAttrs,
                backButton: this.viewMode !== PickerConst.time,
                value: !Helper.isEmpty(this.value) ? this.dateValue.toDate() : new Date()
            }
        },
        /**
         * Get Picker navigation computed binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        pickerNavAttrs() {
            return {
                ...this.defaultAttrs,
                activePicker: this.activePicker
            }
        },
        /**
         * Memeriksa apakah Picker navigation akan ditampilkan atau tidak.
         *
         * @returns {boolean} TRUE to show navigation otherwise FALSE
         */
        showPickerNav() {
            return this.activePicker !== PickerConst.TIME;
        }
    },
    watch: {
        locale(newVal) {
            moment.locale(newVal);
            this.dateValue.locale(newVal);
            this.tableDate.locale(newVal);
        },
        value(newVal) {
            moment.locale(this.locale);

            if (this.multiple && Helper.isArray(newVal) && newVal.length > 0) {
                this.dateValue = moment(newVal[newVal.length - 1], [this.format, PickerConst.shortISO, PickerConst.yearMonthISO]);
                if (this.viewMode !== PickerConst.date) {
                    this.tableDate = this.dateValue.clone();
                }
            } else if (!Helper.isEmpty(newVal)) {
                this.dateValue = moment(newVal, [this.format, PickerConst.shortISO]);
                if (this.activePicker === PickerConst.DATE) {
                    if (!this.dateValue.isSame(this.tableDate, PickerConst.month) ||
                        !this.dateValue.isSame(this.tableDate, PickerConst.year)) {
                        this.tableDate = this.dateValue.clone();
                    }
                }
            } else {
                this.dateValue = moment();
                this.tableDate = this.dateValue.clone();
            }
        },
        viewMode(newVal) {
            this.activePicker = newVal.toUpperCase();
        }
    },
    beforeDestroy() {
        this.dateValue = null;
        this.tableDate = null;
    },
    methods: {
        /**
         * Select Date handler from the given date value.
         *
         * @event input Triggers input event
         * @param {Date} value The input date value
         * @returns {void}
         */
        selectDate(value) {
            if (!this.readonly) {
                this.dateValue.year(value.getFullYear()).month(value.getMonth()).date(value.getDate());
                this.$emit('input', this.dateValue.format(this.format));
            }
        },
        /**
         * Select Month handler from the given date value.
         *
         * @event input Triggers input event
         * @param {Date} value The input date value
         * @returns {void}
         */
        selectMonth(value) {
            if (!this.readonly) {
                this.dateValue.year(value.getFullYear()).month(value.getMonth());
                if (this.viewMode !== PickerConst.month) {
                    this.tableDate = this.dateValue.clone();
                }
                this.$emit('input', this.dateValue.format(this.format));

                if (this.viewMode === PickerConst.date) {
                    this.activePicker = PickerConst.DATE;
                }
            }
        },
        /**
         * Select Year handler from the given year value.
         *
         * @event input Triggers input event
         * @param {number} value The year value
         * @returns {void}
         */
        selectYear(value) {
            if (!this.readonly) {
                this.dateValue.year(value);
                if (this.viewMode !== PickerConst.year) {
                    this.tableDate = this.dateValue.clone();
                }
                this.$emit('input', this.dateValue.format(this.format));

                if (this.viewMode === PickerConst.date || this.viewMode === PickerConst.month) {
                    this.activePicker = PickerConst.MONTH;
                }
            }
        },
        /**
         * Select Time handler from the given date value.
         *
         * @event input Triggers input event
         * @param {moment.Moment} value The input date value
         * @returns {void}
         */
        selectTime(value) {
            if (!this.readonly) {
                this.$emit('input', value.format(this.format));
            }
        },
        /**
         * Toggle active Picker view.
         *
         * @returns {void}
         */
        togglePicker() {
            switch (this.viewMode) {
                case PickerConst.year:
                case PickerConst.time:
                    break;
                case PickerConst.month:
                    if (this.activePicker === PickerConst.MONTH) {
                        this.activePicker = PickerConst.YEAR;
                    } else {
                        this.activePicker = PickerConst.MONTH;
                    }
                    break;
                default:
                    if (this.activePicker === PickerConst.DATE) {
                        this.activePicker = PickerConst.MONTH;
                    } else if (this.activePicker === PickerConst.MONTH) {
                        this.activePicker = PickerConst.YEAR;
                    } else if (this.activePicker === PickerConst.YEAR && this.isTimeEnabled) {
                        this.activePicker = PickerConst.TIME;
                    } else {
                        this.activePicker = PickerConst.DATE;
                    }
                    break;
            }
        },
        /**
         * Change active Picker.
         *
         * @param {string} value Picker mode
         * @returns {void}
         * @private
         */
        _changePickerView(value) {
            switch (this.viewMode) {
                case PickerConst.year:
                    if (value === PickerConst.YEAR) {
                        this.activePicker = value;
                    }
                    break;
                case PickerConst.time:
                    if (value === PickerConst.TIME) {
                        this.activePicker = value;
                    }
                    break;
                case PickerConst.month:
                    if (['MONTH', 'YEAR'].indexOf(value) > -1) {
                        this.activePicker = value;
                    } else {
                        this.activePicker = PickerConst.MONTH;
                    }
                    break;
                default:
                    this.activePicker = value;
                    break;
            }
        },
        /**
         * Set Picker table value from the given date.
         *
         * @param {Date} value The date value
         * @returns {void}
         * @private
         */
        _updatePickerTable(value) {
            this.tableDate = moment(value);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-datepicker {
    .#{$prefix}-datepicker-title,
    .#{$prefix}-picker-year,
    .#{$prefix}-picker-time {
        @include transition($md-transition-stand);
    }

    .#{$prefix}-picker-body {
        min-height: 260px;
        padding-bottom: $padding-sm + .2;
    }

    .#{$prefix}-datepicker-nav {
        @include flexbox((display: flex, justify-content: space-between, align-items: center));
        padding: ($padding-base / 4) $padding-base;
        position: relative;
        width: 100%;

        > .#{$prefix}-datepicker-navtext {
            @include flex(1);
            cursor: pointer;
            overflow: hidden;
            position: relative;
            text-align: center;

            strong {
                @include transition($md-transition-stand);
                display: block;
                width: 100%;
            }
        }
    }

    .#{$prefix}-datepicker-body {
        padding: 0 12px;
        position: relative;

        table {
            @include transition($md-transition-stand);
            table-layout: fixed;
            width: 100%;
            top: 0;

            td, th {
                position: relative;
                text-align: center;
            }
        }

        &.picker-day {
            th {
                color: $gray-500;
                padding: $padding-sm 0;
                pointer-events: none;
            }

            td {
                height: 36px;
                vertical-align: middle;
            }

        }

        &.picker-month,
        &.picker-year,
        &.picker-times {
            td {
                padding: $padding-sm 0;
            }
        }

        &.picker-times {
            /*height: 288px;*/

            .picker-times-number {
                .btn-inner {
                    font-size: 1rem;
                    font-weight: $font-weight-bolder;
                }
            }

            .picker-hours {
                margin-top: $padding-base;

                td {
                    padding: 4px 0;
                }
            }

            .picker-minutes, .picker-seconds {
                margin-top: $padding-xl;
            }

        }
    }
}
</style>
