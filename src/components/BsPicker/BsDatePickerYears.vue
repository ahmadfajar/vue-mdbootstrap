<template>
  <div
    v-touch="{left: onTouch, right: onTouch}"
    class="md-datepicker-body picker-year"
    @wheel="onMouseWheel">
    <transition :name="transitionName">
      <table :key="tableDate.toISOString()">
        <tbody>
          <tr
            v-for="(years, nr) in tableRows"
            :key="'tr-' + nr">
            <td
              v-for="(year, idx) in years"
              :key="'td-' + nr + '-' + idx">
              <bs-button
                v-bind="buttonAttrs(year)"
                :key="year"
                @click="onYearClick(year)">
                {{ year }}
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
import Helper from "../../utils/Helper";
import DatePickerTable from "./mixins/DatePickerTable";
import PickerConst from "./utils/DatePickerConst";
import BsButton from "../BsButton/BsButton";

export default {
    name: "BsDatePickerYears",
    directives: {touch},
    components: {BsButton},
    mixins: [DatePickerTable],
    computed: {
        /**
         * Create table rows of YEAR.
         *
         * @returns {number[]} Array of Years
         */
        tableRows() {
            let rows = [];
            let children = [];
            const startYear = this.dateValue.year() - 4;
            const endYear = this.dateValue.year() + 7;

            for (let year = startYear; year <= endYear; year++) {
                children.push(year);

                if (children.length % 3 === 0) {
                    rows.push(children);
                    children = [];
                }
            }
            if (children.length > 0) {
                rows.push(children);
            }

            return rows;
        }
    },
    methods: {
        /**
         * Get computed button binding's properties.
         *
         * @param {number} year The year value
         * @returns {Object} The component's properties
         */
        buttonAttrs(year) {
            const _date = moment().year(year);
            const selected = Helper.isArray(this.value)
                ? this.value.indexOf(String(year)) !== -1
                : this.value ? this.value.getFullYear() === year : false;

            return {
                // 'active': selected,
                'disabled': this.disabled && !selected,
                'outlined': this.currentDate.isSame(_date, PickerConst.year) && !selected,
                'flat': this.currentDate.isSame(_date, PickerConst.year) === false && !selected,
                'color': this.currentDate.isSame(_date, PickerConst.year) === false && !selected ? 'dark' : this.color
            }
        },
        /**
         * Calculate next Picker table values.
         *
         * @param {number} delta Year delta
         * @returns {Date} Computed date value
         */
        calculateTableDate(delta) {
            return this.dateValue.year(this.tableDate.getFullYear() + (Math.sign(delta || 1) * 12)).toDate();
        },
        /**
         * Event handler when Year button is clicked.
         *
         * @event input Triggers input event
         * @param {number} year The Year value
         * @returns {void}
         */
        onYearClick(year) {
            if (!this.disabled) {
                this.$emit('input', year);
            }
        }
    }
}
</script>

<style scoped>

</style>
