<template>
  <div :class="_classNames" class="md-field row">
    <slot v-if="floatingLabel === false" v-bind="{ id }" />
    <div class="md-field-wrapper">
      <div
        v-if="prependIconOuter"
        class="md-prepend-icon">
        <slot name="prependIconOuter">
          <font-awesome-icon :icon="prependIconOuter" fixed-width />
        </slot>
      </div>
      <div class="md-field-ctrl">
        <div
          ref="activator"
          class="md-field-inner"
          @mouseenter="onMouseEnter">
          <fieldset
            v-if="outlined"
            aria-hidden="true">
            <legend ref="legend">
              <span>​</span>
            </legend>
          </fieldset>
          <div
            v-if="prependIcon"
            @click="_activatorClick"
            class="md-prepend-icon">
            <slot name="prependIcon">
              <font-awesome-icon :icon="prependIcon" fixed-width />
            </slot>
          </div>
          <div class="md-field-input-wrapper">
            <div
              v-if="floatingLabel"
              ref="floatLabel"
              :class="floatingLabelClass"
              class="md-field-label">
              <slot v-bind="{ id }" />
            </div>
            <input
              ref="input"
              v-model="dateValue"
              v-bind="attributes"
              style="cursor: default"
              @blur="_onBlur"
              @click="activatorClick"
              @focus="_onFocus" />
          </div>
          <transition name="fade">
            <div
              v-if="hasClearButton"
              class="md-action-icon">
              <bs-icon
                v-if="hasClearButton"
                height="24"
                icon="clear"
                @click="clearValue" />
            </div>
          </transition>
          <div
            class="md-append-icon"
            @click="_activatorClick">
            <slot name="appendIcon">
              <font-awesome-icon
                v-if="appendIcon"
                :icon="appendIcon"
                fixed-width
                style="cursor: pointer" />
              <bs-icon
                v-else
                height="24"
                icon="calendar"
                style="cursor: pointer" />
            </slot>
          </div>
        </div>
        <div
          v-if="helpText || showErrorValidation"
          class="md-help-text">
          <transition name="fade">
            <slot name="helpText">
              <small
                v-if="showHelpText"
                class="text-muted d-block">
                {{ helpText }}
              </small>
            </slot>
          </transition>
          <template v-if="hasValidationError">
            <small
              v-for="(fld) in errorItems"
              :key="fld"
              class="text-danger d-block">
              {{ _validationMessage(fld) }}
            </small>
          </template>
        </div>
      </div>
      <div
        v-if="appendIconOuter"
        class="md-append-icon">
        <slot name="appendIconOuter">
          <font-awesome-icon :icon="appendIconOuter" fixed-width />
        </slot>
      </div>
    </div>
    <bs-popover
      v-bind="_popoverAttributes"
      class="md-shadow"
      @close="hideMenu">
      <bs-date-picker v-bind="_datePickerAttributes" @input="setValue" />
    </bs-popover>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";
import BsIcon from "../BsIcon/BsIcon";
import BsPopover from "../BsPopover/BsPopover";
import BsDatePicker from "../BsPicker/BsDatePicker";
import Input from "./mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import MenuAble from "../../mixins/MenuAble";
import PickerConst from "../BsPicker/utils/DatePickerConst";
import "../../../scss/_field.scss"
import '../../../scss/utilities/_shadows.scss';

export default {
    name: "BsDateTimeField",
    components: {FontAwesomeIcon, BsIcon, BsDatePicker, BsPopover},
    mixins: [MenuAble, Input, TextField, FieldValidation],
    props: {
        /**
         * DateTimePicker color.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'primary'
        },
        /**
         * Default first day of the week.
         * @type {string|number|*}
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
        valueFormat: {
            type: String,
            default: PickerConst.shortLocale
        },
        /**
         * The display date format, {@see moment} for valid format.
         * If `undefined` then it will takes from `value-format` property.
         * @type {string|*}
         */
        displayFormat: {
            type: String,
            default: undefined
        },
        /**
         * DateTime picker header panel color, default is the same as `color` property.
         * @type {string|*}
         */
        headerColor: {
            type: String,
            default: undefined
        },
        /**
         * Display header panel or not.
         * @type {boolean|*}
         */
        headerPanel: {
            type: Boolean,
            default: true
        },
        /**
         * Whether to display DateTime picker in landscape or portrait orientation.
         * @type {boolean|*}
         */
        landscapeMode: {
            type: Boolean,
            default: false
        },
        /**
         * Default locale to be used, default "en-us".
         * @type {string|*}
         */
        locale: {
            type: String,
            default: PickerConst.defaultLocale
        },
        /**
         * Popover dropdown placement.
         * @type {string|*}
         */
        pickerPlacement: {
            type: String,
            default: 'bottom-left'
        },
        /**
         * Mark today date or not (note: belum berfungsi dengan benar).
         * @type {boolean|*}
         */
        showToday: {
            type: Boolean,
            default: true
        },
        /**
         * Picker popover display transition.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: BsPopover.props.transition.default
        },
        /**
         * Input field value that can be convertible to date or datetime.
         * @type {string|number|Date|*}
         */
        value: {
            type: [String, Number, Date],
            default: undefined
        },
        /**
         * DateTime picker view mode, valid values are: date, month, year or time.
         * @type {string|*}
         */
        viewMode: {
            type: String,
            default: PickerConst.date,
            validator: value => PickerConst.viewModes.indexOf(value) !== -1
        },
    },
    data: () => ({
        displayValue: null,
        popoverTrigger: null
    }),
    computed: {
        /**
         * Get input field computed binding's attributes.
         *
         * @returns {Object|*} Attributes to bind
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
         * Get computed component's class names.
         *
         * @returns {Object|*} Collection of css classes
         * @private
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-field-flat': this.flat,
                'md-field-filled': this.filled,
                'md-field-outlined': this.outlined,
                'md-floating-label': this.floatingLabel,
                'md-focused': this.isFocused,
                'has-error': this.hasValidationError,
                'has-success': this.hasValidated && !this.hasValidationError
            }
        },
        /**
         * Get DatePicker computed binding attributes.
         *
         * @returns {Object|*} DatePicker attributes
         * @private
         */
        _datePickerAttributes() {
            return {
                color: this.color,
                headerColor: this.headerColor,
                headerPanel: this.headerPanel && this.viewMode === PickerConst.date,
                firstDayOfWeek: this.firstDayOfWeek,
                format: this.valueFormat,
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
         * @returns {Object|*} Popover attributes
         * @private
         */
        _popoverAttributes() {
            return {
                open: this.active,
                placement: this.pickerPlacement,
                transition: this.transition,
                trigger: this.popoverTrigger,
                space: this.outlined ? 3 : 1
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
                        this.displayValue = moment(value).format(this.displayFormat || this.valueFormat);
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
            this._updateLegend(newValue);
        }
    },
    created() {
        if (this.value !== null && this.value !== undefined && this.value !== '') {
            this._updateValue(this.value);
        }
    },
    mounted() {
        this.popoverTrigger = this.$refs.activator;
        this._updateLabel();
        this.$nextTick(() => {
            if (this.autofocus && this.$refs.input) {
                this.$refs.input.focus();
            }
            this._updateLegend();
        });
    },
    methods: {
        _activatorClick() {
            if (!this.disabled) {
                if (this.active) {
                    this.isFocused = false;
                    this._updateLegend();
                    this.$emit('blur', new FocusEvent('blur'));
                } else {
                    this._onFocus(new FocusEvent('focus'));
                }

                this.activatorClick();
            }
        },
        /**
         * Convert a value to datetime and update internal value.
         *
         * @param {string|number} value The value to convert
         * @returns {void}
         * @private
         */
        _updateValue(value) {
            let date;

            try {
                date = moment(value, [
                    this.valueFormat, PickerConst.shortISO, PickerConst.dateTimeISO,
                    PickerConst.yearMonthISO, PickerConst.yearISO
                ]);
            } catch (e) {
                date = moment(value);
            }

            if (date.isValid()) {
                this.localValue = date.format(this.valueFormat);
                this.displayValue = date.format(this.displayFormat || this.valueFormat);
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
