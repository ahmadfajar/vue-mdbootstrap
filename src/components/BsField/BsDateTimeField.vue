<template>
  <div class="md-field row" :class="_classNames">
    <div v-if="floatingLabel === false" ref="label">
      <slot v-bind="{ id }" />
    </div>
    <div class="flex-grow-1">
      <div class="md-field-inner align-items-center" ref="activator" :class="controlCls">
        <div v-if="floatingLabel"
             ref="floatlabel"
             class="md-floating-label"
             :class="floatingLabelClass"
             @click="activatorClick">
          <slot v-bind="{ id }" />
        </div>
        <div v-if="prependIcon" class="md-prepend-icon" @click="activatorClick">
          <slot name="prependSlot">
            <font-awesome-icon :icon="prependIcon" />
          </slot>
        </div>
        <input ref="input"
               style="cursor: default"
               v-bind="attributes"
               v-model="dateValue"
               @focus="_onFocus"
               @blur="_onBlur"
               @click="activatorClick" />
        <transition name="fade">
          <div class="md-action-icon" v-if="hasClearButton">
            <bs-icon v-if="hasClearButton" icon="clear" @click="clearValue" />
          </div>
        </transition>
        <div class="md-append-icon" @click="activatorClick">
          <slot name="appendSlot">
            <font-awesome-icon v-if="appendIcon" style="cursor: pointer" :icon="appendIcon" />
            <bs-icon v-else icon="calendar" style="cursor: pointer" />
          </slot>
        </div>
      </div>
      <div class="md-help-text" v-if="helpText || showErrorValidation || floatingLabel">
        <slot name="helptext">
          <small v-if="showHelpText" class="text-muted d-block">
            {{ helpText }}
          </small>
        </slot>
        <template v-if="hasValidationError">
          <small v-for="(fld) in errorItems"
                 :key="fld"
                 class="text-danger d-block">
            {{ _validationMessage(fld) }}
          </small>
        </template>
      </div>
    </div>
    <bs-popover class="md-shadow" v-bind="popoverAttributes" @close="hideMenu">
      <bs-date-picker v-bind="datePickerAttributes" @input="setValue" />
    </bs-popover>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsIcon from "../BsIcon/BsIcon";
import BsPopover from "../BsPopover/BsPopover";
import BsDatePicker from "../BsPicker/BsDatePicker";
import Input from "../../mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import MenuAble from "../../mixins/MenuAble";
import PickerConst from "../BsPicker/utils/DatePickerConst";
import moment from "moment";

export default {
    name: "BsDateTimeField",
    components: {FontAwesomeIcon, BsIcon, BsDatePicker, BsPopover},
    mixins: [MenuAble, Input, TextField, FieldValidation],
    props: {
        /**
         * DatePicker color
         * @type {String|*}
         */
        color: {
            type: String,
            default: 'primary'
        },
        /**
         * Default first day of the week
         * @type {String|*}
         */
        firstDayOfWeek: {
            type: [String, Number],
            default: 0,
            validator: value => parseInt(value, 10) > -1
        },
        /**
         * The value date format, see momentjs for valid format
         * @type {String|*}
         */
        format: {
            type: String,
            default: PickerConst.shortLocale
        },
        /**
         * The display date format, see momentjs for valid format
         * @type {String|*}
         */
        displayFormat: {
            type: String,
            default: undefined
        },
        /**
         * DatePicker header panel color, default is the same as color property
         * @type {String|*}
         */
        headerColor: {
            type: String,
            default: undefined
        },
        /**
         * Display header panel or not
         * @type {Boolean|*}
         */
        headerPanel: {
            type: Boolean,
            default: true
        },
        /**
         * Whether to display DatePicker in landscape or portrait orientation
         * @type {Boolean|*}
         */
        landscapeMode: {
            type: Boolean,
            default: false
        },
        /**
         * Define locale date formating, default "en-us"
         * @type {String|*}
         */
        locale: {
            type: String,
            default: PickerConst.defaultLocale
        },
        /**
         * Input field maxLength validator
         * @type {String|*}
         */
        maxlength: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Input field minLength validator
         * @type {String|Number|*}
         */
        minlength: {
            type: [String, Number],
            default: undefined
        },
        /**
         * DatePicker placement
         * @type {String|*}
         */
        pickerPlacement: {
            type: String,
            default: 'bottom-left'
        },
        /**
         * Mark today date or not (note: belum berfungsi dengan benar)
         * @type {Boolean|*}
         */
        showToday: {
            type: Boolean,
            default: true
        },
        /**
         * Picker display transition
         * @type {String|*}
         */
        transition: {
            type: String,
            default: 'popover'
        },
        /**
         * Input field value yang dapat dikonversi menjadi Date
         * @type {String|*}
         */
        value: {
            type: [String, Number, Array],
            default: undefined
        },
        /**
         * DatePicker view mode, valid values are: date, month, year or time
         * @type {String|*}
         */
        viewMode: {
            type: String,
            default: PickerConst.date,
            validator: value => PickerConst.viewModes.indexOf(value) !== -1
        },
    },
    data: () => ({
        localValue: null,
        displayValue: null,
        popoverTrigger: null
    }),
    computed: {
        /**
         * Get computed component's class names.
         *
         * @return {Object} Collection of css classes
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-field-flat': this.flat,
                'md-focused': this.isFocused,
                'md-floating-active': this.floatingLabel,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
            }
        },
        /**
         * Get input field computed binding's attributes.
         *
         * @return {Object} Attributes to bind
         */
        attributes() {
            return {
                ...this.cmpAttrs,
                ...this.fieldAttrs,
                'value': this.displayValue,
                'type': 'text',
                'readonly': true,
                'aria-readonly': true
            }
        },
        /**
         * Get DatePicker computed binding attributes.
         *
         * @return {Object} DatePicker attributes
         */
        datePickerAttributes() {
            return {
                color: this.color,
                headerColor: this.headerColor,
                headerPanel: this.headerPanel && this.viewMode === PickerConst.date,
                firstDayOfWeek: this.firstDayOfWeek,
                format: this.format,
                landscape: this.landscapeMode,
                locale: this.locale,
                showToday: this.showToday,
                value: this.localValue === 'Invalid Date' ? null : this.localValue,
                viewMode: this.viewMode,
            }
        },
        /**
         * Get Popover computed binding attributes.
         *
         * @return {Object} Popover attributes
         */
        popoverAttributes() {
            return {
                open: this.active,
                placement: this.pickerPlacement,
                transition: this.transition,
                trigger: this.popoverTrigger
            }
        },
        /**
         * Create getter and setter for display value
         */
        dateValue: {
            get() {
                return this.displayValue;
            },
            set(value) {
                if (value.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
                    this.$nextTick(() => {
                        this.localValue = value;
                        this.displayValue = moment(value).format(this.displayFormat || this.format);
                        this.$emit('input', value);
                    })
                }
            }
        }
    },
    watch: {
        value(newValue) {
            if (newValue === '' || newValue === null) {
                this.localValue = null;
                this.displayValue = null;
            } else {
                this._updateValue(newValue);
            }
        }
    },
    created() {
        if (this.value !== null && this.value !== undefined && this.value !== '') {
            this._updateValue(this.value);
        }
    },
    mounted() {
        this.popoverTrigger = this.$refs.activator;

        if (!this.floatingLabel && this.$refs.label.children.length > 0) {
            const elm = this.$refs.label.children[0];

            this.$refs.label.className += ' ' + elm.className;
            elm.className = 'd-block mb-0';
        }
        this._updateLabel();
        this.$nextTick(() => {
            if (this.autofocus && this.$refs.input) {
                this.$refs.input.focus();
            }
        });
    },
    methods: {
        /**
         * Convert a value to datetime and update internal value.
         *
         * @param {string|number} value The value to convert
         * @return {void}
         * @private
         */
        _updateValue(value) {
            let date;

            try {
                date = moment(value, [
                    this.format, PickerConst.shortISO, PickerConst.dateTimeISO,
                    PickerConst.yearMonthISO, PickerConst.yearISO
                ]);
            } catch (e) {
                date = moment(value);
            }

            if (date.isValid()) {
                this.localValue = date.format(this.format);
                this.displayValue = date.format(this.displayFormat || this.format);
            } else {
                this.localValue = 'Invalid Date';
                this.displayValue = 'Invalid Date';
            }

        }
    }
}
</script>

<style scoped>

</style>
