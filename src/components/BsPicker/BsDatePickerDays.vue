<template>
  <div
    v-touch="{left: onTouch, right: onTouch}"
    class="md-datepicker-body picker-day"
    @wheel="onMouseWheel">
    <transition :name="transitionName">
      <table :key="tableDate.toISOString()">
        <thead>
          <tr>
            <th
              v-for="(day, idx) in dayNamesFmt"
              :key="'th-' + idx">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(items, nx) in tableRows"
            :key="'tr-' + nx">
            <td
              v-for="(item, idx) in items"
              :key="'td-' + nx + '-' + idx">
              <bs-button
                v-if="item.intValue !== 0"
                v-bind="buttonAttrs(item.value)"
                :key="item.value"
                @click="onDayClick(item.value)">
                {{ item.intValue }}
              </bs-button>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
import moment from "moment";
import touch from "../../directives/Touch";
import createNativeLocaleFormatter from "./utils/createNativeLocaleFormatter";
import DatePickerTable from "./mixins/DatePickerTable";
import PickerConst from "./utils/DatePickerConst";
import BsButton from "../BsButton/BsButton";
import Helper from "../../utils/Helper";
import { padLeft } from "../../utils/StringHelper";

export default {
    name: "BsDatePickerDays",
    components: {BsButton},
    directives: {touch},
    mixins: [DatePickerTable],
    props: {
        events: {
            type: [Array, Object, Function],
            default: () => null
        },
        eventColor: {
            type: [String, Function, Object],
            default: 'warning'
        },
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        /**
         * The date format, see moment::format().
         * Default "YYYY-MM-DD"
         *
         * @type {string|*}
         */
        format: {
            type: String,
            default: PickerConst.shortISO
        }
    },
    computed: {
        /**
         * Get table rows of DAYS.
         *
         * @returns {Object[]} Array of Days
         */
        tableRows() {
            let rows      = [];
            let children  = [];
            let days      = this.numDaysBefore();
            let mdate     = moment(this.tableDate);
            const totDays = mdate.daysInMonth();

            while (days--) {
                children.push({value: '0', intValue: 0});
            }

            for (days = 1; days <= totDays; days++) {
                const _date = mdate.date(days).format(PickerConst.shortISO);
                children.push({value: _date, intValue: days});

                if (children.length % 7 === 0) {
                    rows.push(children);
                    children = [];
                }
            }
            if (children.length > 0) {
                for (days = children.length; days < 7; days++) {
                    children.push({value: '0', intValue: 0});
                }
                rows.push(children);
            }

            return rows;
        },
        /**
         * Get table of Day names.
         *
         * @returns {string[]} Collection of day names
         */
        dayNamesFmt() {
            const first = parseInt(this.firstDayOfWeek, 10);

            return this.weekdayFormatter
                ? Helper.createRange(7).map(i => this.weekdayFormatter(`2017-01-${first + i + 15}`)) // 2017-01-15 is Sunday
                : Helper.createRange(7).map(i => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7])
        },
        /**
         * Get weekday name from the given date value.
         *
         * @param {string} [value] The date value in ISO 8601 format
         * @returns {Function|void} A function to format selected date
         */
        weekdayFormatter(value) {
            return createNativeLocaleFormatter(this.locale, {weekday: 'narrow', timeZone: 'UTC'});
        }
    },
    methods: {
        /**
         * Get computed button binding's properties.
         *
         * @param {string|[string]} date The date's value in format `YYYY-MM-DD`
         * @returns {Object} The component's properties
         */
        buttonAttrs(date) {
            const _mDate   = moment(date);
            const _date    = (typeof this.value === 'string' || this.value instanceof Date) ? moment(this.value) : null;
            const selected = Helper.isArray(this.value)
                ? this.value.indexOf(date) !== -1
                : (_date ? _date.isSame(date, PickerConst.day) : false);

            return {
                'size': 'sm',
                'mode': 'icon',
                // 'active': selected,
                'disabled': this.disabled && !selected,
                'outlined': this.currentDate.isSame(_mDate, PickerConst.day) && !selected,
                'flat': this.currentDate.isSame(_mDate, PickerConst.day) === false && !selected,
                'color': this.currentDate.isSame(_mDate, PickerConst.day) === false && !selected ? 'dark' : this.color
            }
        },
        /**
         * Calculate next Picker table values.
         *
         * @param {number} delta Month delta
         * @returns {Date} Computed date value
         */
        calculateTableDate(delta) {
            return this.dateValue.month(this.tableDate.getMonth() + Math.sign(delta || 1)).toDate();
        },
        /**
         * Check if the given date is within the event's date range or not.
         *
         * @param {Date} date The date to check
         * @returns {*} False if invalid
         */
        isEvent(date) {
            if (Helper.isArray(this.events)) {
                return this.events.indexOf(date) > -1;
            } else if (Helper.isFunction(this.events)) {
                return this.events(date);
            } else {
                return false;
            }
        },
        /**
         * Calculate number of days before the first day of the month.
         *
         * @returns {number} Number of days
         */
        numDaysBefore() {
            const firstDay = new Date(`${this.dateValue.year()}-${padLeft(this.dateValue.month() + 1)}-01T00:00:00+00:00`);
            const weekDay  = firstDay.getUTCDay();

            return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
        },
        /**
         * Event handler when Day button is clicked.
         *
         * @event input Triggers input event
         * @param {string} value The date value in `YYYY-MM-DD` format
         * @returns {void}
         */
        onDayClick(value) {
            if (!this.disabled) {
                this.$emit('input', new Date(value));
            }
        }
    }
}
</script>

<style scoped>

</style>
