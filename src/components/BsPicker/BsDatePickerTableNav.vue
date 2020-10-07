<template>
  <div class="md-datepicker-nav">
    <bs-button v-bind="_btnPrevAttrs" @click="btnPreviousClick">
      <bs-icon icon="chevron_left" size="32" />
    </bs-button>
    <div :class="_headerClasses" class="md-datepicker-navtext">
      <transition :name="transitionName">
        <strong :key="value.toISOString()" @click="toggleClick">{{ formatter(value) }}</strong>
      </transition>
    </div>
    <bs-button v-bind="_btnNextAttrs" @click="btnNextClick">
      <bs-icon icon="chevron_right" size="32" />
    </bs-button>
  </div>
</template>

<script>
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import createNativeLocaleFormatter from "./utils/createNativeLocaleFormatter";
import PickerConst from "./utils/DatePickerConst";

export default {
    name: "BsDatePickerTableNav",
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
            required: true
        },
        /**
         * @type {string|*}
         */
        activePicker: {
            type: String,
            default: undefined
        },
        /**
         * @type {string|*}
         */
        minDate: {
            type: String,
            default: undefined
        },
        /**
         * @type {string|*}
         */
        maxDate: {
            type: String,
            default: undefined
        }
    },
    data: () => ({
        reverse: false,
        btnAttrs: {
            color: 'dark',
            mode: 'icon',
            flat: true
        }
    }),
    computed: {
        /**
         * Get Next button binding's properties.
         *
         * @returns {Object} The component's properties
         */
        _btnNextAttrs() {
            return {
                ...this.btnAttrs,
                'disabled': this.checkDisabled(1)
            }
        },
        /**
         * Get Previous button binding's properties.
         *
         * @returns {Object} The component's properties
         */
        _btnPrevAttrs() {
            return {
                ...this.btnAttrs,
                'disabled': this.checkDisabled(-1)
            }
        },
        /**
         * Get computed navigation text class names.
         *
         * @returns {string[]} Css classes
         */
        _headerClasses() {
            return [
                this.disabled ? 'md-disabled' : `text-hover-${this.color}`
            ];
        },
        /**
         * Format the given date value based on locale formatter and returns date string.
         *
         * @returns {Function} <tt>Function(value)</tt> which is used to convert any valid Date
         * to the current locale date string
         */
        formatter() {
            if (this.activePicker === PickerConst.YEAR) {
                return value => {
                    const start = value.getFullYear() - 4;
                    const end = value.getFullYear() + 7;
                    return `${start} - ${end}`;
                }
            } else if (this.activePicker === PickerConst.MONTH) {
                return createNativeLocaleFormatter(this.locale, {year: 'numeric', timeZone: 'UTC'}, {length: 4});
            } else {
                return createNativeLocaleFormatter(this.locale, {
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC'
                }, {length: 7});
            }
        },
        /**
         * Get computed animation transition name.
         *
         * @returns {string} Transition name
         */
        transitionName() {
            return this.reverse === true ? PickerConst.transitionReverse : PickerConst.transition;
        }
    },
    watch: {
        value(newVal, oldVal) {
            this.reverse = newVal < oldVal;
        }
    },
    beforeDestroy() {
        this.btnAttrs = null;
    },
    methods: {
        /**
         * Event handler when button Next is clicked.
         *
         * @event input Triggers input event
         * @returns {void}
         */
        btnNextClick() {
            if (this.disabled) {
                return;
            }
            let _date = new Date(this.value.toISOString());

            if (this.activePicker === PickerConst.YEAR) {
                _date.setFullYear(this.value.getFullYear() + 12);
                this.$emit('input', _date);
            } else if (this.activePicker === PickerConst.MONTH) {
                _date.setFullYear(this.value.getFullYear() + 1);
                this.$emit('input', _date);
            } else {
                this.$emit('input', this.calculateChange(1));
            }
        },
        /**
         * Event handler when button Previous is clicked.
         *
         * @event input Triggers input event
         * @returns {void}
         */
        btnPreviousClick() {
            if (this.disabled) {
                return;
            }

            let _date = new Date(this.value.toISOString());
            if (this.activePicker === PickerConst.YEAR) {
                _date.setFullYear(this.value.getFullYear() - 12);
                this.$emit('input', _date);
            } else if (this.activePicker === PickerConst.MONTH) {
                _date.setFullYear(this.value.getFullYear() - 1);
                this.$emit('input', _date);
            } else {
                this.$emit('input', this.calculateChange(-1));
            }
        },
        /**
         * Calculate the month.
         *
         * @param {number} value The number between -1 and +1
         * @returns {Date} Computed date value
         */
        calculateChange(value) {
            const _month = this.value.getMonth() + value;
            let _date = new Date(this.value.toISOString());

            if (_month < 0) {
                _date.setFullYear(this.value.getFullYear() - 1);
                _date.setMonth(11);
            } else if (_month === 12) {
                _date.setFullYear(this.value.getFullYear() + 1);
                _date.setMonth(0);
            } else {
                _date.setMonth(_month);
            }

            return _date;
        },
        /**
         * Check if the navigation is enabled or disabled.
         *
         * @param {number} value The number between -1 and +1
         * @returns {boolean} TRUE if navigation is disabled otherwise FALSE
         */
        checkDisabled(value) {
            return this.disabled ||
                (value < 0 && this.minDate && this.calculateChange(value) < new Date(this.minDate)) ||
                (value > 0 && this.maxDate && this.calculateChange(value) > new Date(this.maxDate));
        },
        /**
         * Event handler when navigation text is clicked.
         *
         * @event toggle Triggers toggle event
         * @returns {void}
         */
        toggleClick() {
            if (!this.disabled) {
                this.$emit('toggle');
            }
        }
    }
}
</script>

<style scoped>

</style>
