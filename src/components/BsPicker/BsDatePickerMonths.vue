<template>
  <div
    v-touch="{left: onTouch, right: onTouch}"
    class="md-datepicker-body picker-month"
    @wheel="onMouseWheel">
    <transition :name="transitionName">
      <table :key="tableDate.toISOString()">
        <tbody>
          <tr
            v-for="(items, nr) in tableRows"
            :key="'tr-' + nr">
            <td
              v-for="(item, idx) in items"
              :key="'td-' + nr + '-' + idx">
              <bs-button
                v-bind="buttonAttrs(item.value)"
                :key="item.value"
                @click="onMonthClick(item.value)">
                {{ item.name }}
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
import DatePickerTable from "./mixins/DatePickerTable";
import createNativeLocaleFormatter from "./utils/createNativeLocaleFormatter";
import PickerConst from "./utils/DatePickerConst";
import BsButton from "../BsButton/BsButton";
import Helper from "../../utils/Helper";
import { padLeft } from "../../utils/StringHelper";

export default {
    name: "BsDatePickerMonths",
    components: {BsButton},
    directives: {touch},
    mixins: [DatePickerTable],
    computed: {
        /**
         * Create table rows of MONTH.
         *
         * @returns {Object[]} Array of Months
         */
        tableRows() {
            let rows     = [];
            let children = [];
            const nitems = 12;

            for (let i = 0; i < nitems; i++) {
                const _month = `${this.dateValue.year()}-${padLeft(i + 1)}-01`;
                children.push({value: _month, name: this.formatter(_month)});

                if (children.length % 3 === 0) {
                    rows.push(children);
                    children = [];
                }
            }

            return rows;
        },
        /**
         * Format month's name from the given month value.
         *
         * @returns {Function} <tt>Function(value)</tt> which is used to convert any valid <tt>YYYY-MM-DD</tt>
         * formatted date to the current locale date string
         */
        formatter() {
            return createNativeLocaleFormatter(
                this.locale,
                {month: 'short', timeZone: 'UTC'},
                {start: 5, length: 2}
            )
        }
    },
    methods: {
        /**
         * Get computed button binding's properties.
         *
         * @param {string} date The month's value in format `YYYY-MM-DD`
         * @returns {Object} The component's properties
         */
        buttonAttrs(date) {
            const _date    = (typeof this.value === 'string' || this.value instanceof Date) ? moment(this.value) : null;
            const selected = Helper.isArray(this.value)
                ? this.value.indexOf(date) !== -1
                : (_date ? _date.isSame(date, PickerConst.month) : false);

            return {
                // 'active': selected,
                'disabled': this.disabled && !selected,
                'outlined': this.currentDate.isSame(date, PickerConst.month) && !selected,
                'flat': this.currentDate.isSame(date, PickerConst.month) === false && !selected,
                'color': this.currentDate.isSame(date, PickerConst.month) === false && !selected ? 'dark' : this.color
            }
        },
        /**
         * Calculate next Picker table values.
         *
         * @param {number} delta Year delta
         * @returns {Date} Computed date value
         */
        calculateTableDate(delta) {
            return this.dateValue.year(this.tableDate.getFullYear() + Math.sign(delta || 1)).toDate();
        },
        /**
         * Event handler when Month button is clicked.
         *
         * @event input Triggers input event
         * @param {string} value The month value in `YYYY-MM-DD` format
         * @returns {void}
         */
        onMonthClick(value) {
            if (!this.disabled) {
                this.$emit('input', new Date(value));
            }
        }
    }
}
</script>

<style scoped>

</style>
