<template>
  <div class="md-datepicker-body picker-times">
    <transition name="fade" mode="out-in">
      <div
        v-if="activeView === 'TIME'"
        :class="{ 'pt-5': backButton === false }">
        <div
          v-if="backButton === true"
          class="my-2">
          <bs-button
            v-bind="_buttonNavAttrs"
            @click="!disabled && $emit('toggle-view')">
            <bs-icon icon="arrow_back" size="24" />
          </bs-button>
        </div>
        <table>
          <colgroup>
            <col />
            <col style="width: 15px" />
            <col />
            <col style="width: 15px" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <bs-button
                  v-bind="_buttonNavAttrs"
                  @click="increase('h')">
                  <bs-icon icon="expand_less" size="24" />
                </bs-button>
              </td>
              <td>&nbsp;</td>
              <td>
                <bs-button
                  v-bind="_buttonNavAttrs"
                  @click="increase('m')">
                  <bs-icon icon="expand_less" size="24" />
                </bs-button>
              </td>
              <td>&nbsp;</td>
              <td>
                <bs-button
                  v-bind="_buttonNavAttrs"
                  @click="increase('s')">
                  <bs-icon icon="expand_less" size="24" />
                </bs-button>
              </td>
            </tr>
            <tr>
              <td class="picker-times-number">
                <bs-button
                  v-bind="_defaultBtnAttrs"
                  @click="changeView('HOUR')">
                  {{ dateValue.format('HH') }}
                </bs-button>
              </td>
              <td>:</td>
              <td class="picker-times-number">
                <bs-button
                  v-bind="_defaultBtnAttrs"
                  @click="changeView('MINUTE')">
                  {{ dateValue.format('mm') }}
                </bs-button>
              </td>
              <td>:</td>
              <td class="picker-times-number">
                <bs-button
                  v-bind="_defaultBtnAttrs"
                  @click="changeView('SECOND')">
                  {{ dateValue.format('ss') }}
                </bs-button>
              </td>
            </tr>
            <tr>
              <td>
                <bs-button
                  v-bind="_buttonNavAttrs"
                  @click="decrease('h')">
                  <bs-icon icon="expand_more" size="24" />
                </bs-button>
              </td>
              <td>&nbsp;</td>
              <td>
                <bs-button
                  v-bind="_buttonNavAttrs"
                  @click="decrease('m')">
                  <bs-icon icon="expand_more" size="24" />
                </bs-button>
              </td>
              <td>&nbsp;</td>
              <td>
                <bs-button
                  v-bind="_buttonNavAttrs"
                  @click="decrease('s')">
                  <bs-icon icon="expand_more" size="24" />
                </bs-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table
        v-if="activeView === 'HOUR'"
        class="picker-hours">
        <tbody>
          <tr
            v-for="(items, nr) in tableHours"
            :key="'tr-' + nr">
            <td
              v-for="(item, idx) in items"
              :key="'td-' + nr + '-' + idx">
              <bs-button
                v-bind="buttonHourAttrs(item.intValue)"
                :key="item.name"
                @click="setHours(item.intValue)">
                {{ item.name }}
              </bs-button>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        v-if="activeView === 'MINUTE'"
        class="picker-minutes">
        <tbody>
          <tr
            v-for="(items, nr) in tableMinutes"
            :key="'tr-' + nr">
            <td
              v-for="(item, idx) in items"
              :key="'td-' + nr + '-' + idx">
              <bs-button
                v-bind="buttonMinuteAttrs(item.intValue)"
                :key="item.name"
                @click="setMinutes(item.intValue)">
                {{ item.name }}
              </bs-button>
            </td>
          </tr>
        </tbody>
      </table>
      <table v-if="activeView === 'SECOND'" class="picker-seconds">
        <tbody>
          <tr
            v-for="(items, nr) in tableMinutes"
            :key="'tr-' + nr">
            <td
              v-for="(item, idx) in items"
              :key="'td-' + nr + '-' + idx">
              <bs-button
                v-bind="buttonSecondAttrs(item.intValue)"
                :key="item.name"
                @click="setSeconds(item.intValue)">
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
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import PickerConst from "./utils/DatePickerConst";
import { padLeft } from "../../utils/StringHelper";

export default {
    name: "BsDatePickerTimes",
    components: {BsButton, BsIcon},
    props: {
        /**
         * Default "<code>primary</code>"
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'primary'
        },
        /**
         * Default TRUE
         * @type {boolean|*}
         */
        backButton: {
            type: Boolean,
            default: true
        },
        /**
         * Default FALSE
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Default "en-us"
         * @type {string|*}
         */
        locale: {
            type: String,
            default: PickerConst.defaultLocale
        },
        /**
         * @type {Date|*}
         */
        value: {
            type: Date,
            default: undefined
        }
    },
    data: (vm) => ({
        /**
         * @type moment.Moment
         */
        dateValue: vm.value
            ? (typeof vm.value === 'string' || vm.value instanceof Date)
                ? moment(vm.value, [PickerConst.dateTimeISO, PickerConst.shortISO]).locale(vm.locale)
                : moment().locale(vm.locale)
            : moment().locale(vm.locale),
        /**
         * @type string
         */
        activeView: PickerConst.TIME
    }),
    computed: {
        /**
         * Get default button binding's properties.
         *
         * @returns {Object|*} The component's properties
         */
        _defaultBtnAttrs() {
            return {
                color: 'dark',
                flat: true,
                disabled: this.disabled
            }
        },
        /**
         * Get button Increment/Decrement binding's properties.
         *
         * @returns {Object} The component's properties
         */
        _buttonNavAttrs() {
            return {
                ...this._defaultBtnAttrs,
                mode: 'icon'
            }
        },
        /**
         * Create table rows of HOUR.
         *
         * @returns {Object[]} Collection of Object to create table rows
         */
        tableHours() {
            let rows     = [];
            let children = [];
            const hours  = 24;

            for (let i = 0; i < hours; i++) {
                children.push({intValue: i, name: padLeft(i)});

                if (children.length % 4 === 0) {
                    rows.push(children);
                    children = [];
                }
            }
            if (children.length > 0) {
                rows.push(children);
            }

            return rows;
        },
        /**
         * Create table rows of MINUTES.
         *
         * @returns {Object[]} Collection of Object to create table rows
         */
        tableMinutes() {
            let rows      = [];
            let children  = [];
            const minutes = 60;

            for (let i = 0; i < minutes; i++) {
                if (i === 0 || i % 5 === 0) {
                    children.push({intValue: i, name: padLeft(i)});
                    if (children.length % 3 === 0) {
                        rows.push(children);
                        children = [];
                    }
                }
            }
            if (children.length > 0) {
                rows.push(children);
            }

            return rows;
        }
    },
    watch: {
        locale(newVal) {
            this.dateValue.locale(newVal);
        },
        value(newVal) {
            moment.locale(this.locale);
            if (newVal && typeof newVal === 'string') {
                this.dateValue = moment(newVal, [PickerConst.dateTimeISO, PickerConst.shortISO]);
            } else if (newVal instanceof Date) {
                this.dateValue = moment(newVal);
            }
        }
    },
    beforeDestroy() {
        this.dateValue = null;
    },
    methods: {
        /**
         * Get Hour button binding's properties.
         *
         * @param {number} hour The hour value
         * @returns {Object} The component's properties
         */
        buttonHourAttrs(hour) {
            const selected = this.dateValue.hour() === hour;
            return this.createButtonAttrs(selected);
        },
        /**
         * Get Minute button binding's properties.
         *
         * @param {number} minute The minute value
         * @returns {Object} The component's properties
         */
        buttonMinuteAttrs(minute) {
            const selected = this.dateValue.minute() === minute;
            return this.createButtonAttrs(selected);
        },
        /**
         * Get Seconds button binding's properties.
         *
         * @param {number} second The second value
         * @returns {Object} The component's properties
         */
        buttonSecondAttrs(second) {
            const selected = this.dateValue.second() === second;
            return this.createButtonAttrs(selected);
        },
        /**
         * Change active view.
         *
         * @param {string} view The view mode
         * @returns {void}
         */
        changeView(view) {
            if (!this.disabled) {
                this.activeView = view;
            }
        },
        /**
         * Create button component binding's properties.
         *
         * @param {boolean} selected Whether the button is selected or not
         * @returns {Object} The component's properties
         */
        createButtonAttrs(selected) {
            return {
                ...this._defaultBtnAttrs,
                color: selected ? this.color : 'dark',
                flat: selected === false
            }
        },
        /**
         * Decrease time value.
         *
         * @event input Triggers input event
         * @param {string} mode The symbol of time, `h` for Hours, `m` for Minutes, and `s` for Seconds
         * @returns {void}
         */
        decrease(mode) {
            if (!this.disabled && ['h', 'm', 's'].indexOf(mode) > -1) {
                this.$emit('input', this.dateValue.subtract(1, mode));
            }
        },
        /**
         * Increase time value.
         *
         * @event input Triggers input event
         * @param {string} mode The symbol of time, `h` for Hours, `m` for Minutes, and `s` for Seconds
         * @returns {void}
         */
        increase(mode) {
            if (!this.disabled && ['h', 'm', 's'].indexOf(mode) > -1) {
                this.$emit('input', this.dateValue.add(1, mode));
            }
        },
        /**
         * Set or change current Hour's value.
         *
         * @event input Triggers input event
         * @param {number} value The hour
         * @returns {void}
         */
        setHours(value) {
            this.$emit('input', this.dateValue.hour(value));
            this.activeView = PickerConst.TIME;
        },
        /**
         * Set or change current Minute's value.
         *
         * @event input Triggers input event
         * @param {number} value The minute
         * @returns {void}
         */
        setMinutes(value) {
            this.$emit('input', this.dateValue.minute(value));
            this.activeView = PickerConst.TIME;
        },
        /**
         * Set or change current Second's value.
         *
         * @event input Triggers input event
         * @param {number} value The seconds
         * @returns {void}
         */
        setSeconds(value) {
            this.$emit('input', this.dateValue.second(value));
            this.activeView = PickerConst.TIME;
        }
    }
}
</script>

<style scoped>

</style>
