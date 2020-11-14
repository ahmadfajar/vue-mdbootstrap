import moment from "moment/moment";
import PickerConst from "../utils/DatePickerConst";

export default {
    props: {
        /**
         * Default "primary"
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
        tableDate: {
            type: Date,
            // required: true
        },
        /**
         * @type {Date|*}
         */
        value: {
            type: Date,
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
    data: (vm) => ({
        /**
         * @type {moment.Moment}
         */
        currentDate: moment().locale(vm.locale),
        /**
         * @type {moment.Moment}
         */
        dateValue: vm.tableDate ? moment(vm.tableDate).locale(vm.locale) : moment().locale(vm.locale),
        /**
         * @type {boolean}
         */
        reverse: false,
    }),
    computed: {
        /**
         * Get active animation transition name.
         *
         * @returns {string} The transition name
         */
        transitionName() {
            return this.reverse === true ? PickerConst.transitionReverse : PickerConst.transition;
        }
    },
    watch: {
        /**
         * Locale setter.
         *
         * @param {string} newVal Locale
         * @returns {void}
         */
        locale(newVal) {
            moment.locale(newVal);
            this.currentDate.locale(newVal);
            this.dateValue.locale(newVal);
        },
        /**
         * TableDate setter.
         *
         * @param {Date} newVal New date value
         * @param {Date} oldVal Old date value
         * @returns {void}
         */
        tableDate(newVal, oldVal) {
            this.dateValue = moment(newVal);
            this.reverse   = newVal < oldVal;
        }
    },
    beforeDestroy() {
        this.currentDate = null;
        this.dateValue   = null;
    },
    methods: {
        /**
         * Mouse wheel event handler.
         *
         * @event update Triggers <code>update:table</code> event
         * @param {WheelEvent} e The event arguments
         * @returns {void}
         */
        onMouseWheel(e) {
            e.preventDefault();
            this.$emit('update-table', this.calculateTableDate(e.deltaY));
        },
        /**
         * Touch device event handler.
         *
         * @event update Triggers <code>update:table</code> event
         * @param {WheelEvent} e The event arguments
         * @returns {void}
         */
        onTouch(e) {
            if (e.offsetX < -15) {
                this.$emit('update-table', this.calculateTableDate(1));
            } else if (e.offsetX > 15) {
                this.$emit('update-table', this.calculateTableDate(-1));
            }
        }
    }
}
