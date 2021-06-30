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
        <div class="md-field-inner">
          <fieldset
            v-if="outlined"
            aria-hidden="true">
            <legend ref="legend">
              <span>​</span>
            </legend>
          </fieldset>
          <div
            v-if="prependIcon"
            class="md-prepend-icon">
            <slot name="prependIcon">
              <font-awesome-icon :icon="prependIcon" fixed-width />
            </slot>
          </div>
          <div
            v-if="hasSpinButton && _leftSpinButton"
            class="md-spin-button-left">
            <bs-button
              color="dark"
              size="xs"
              flat
              @click="_incrementValue">
              <bs-icon icon="ArrowDropUp" size="24" />
            </bs-button>
            <bs-button
              color="dark"
              size="xs"
              flat
              @click="_decrementValue">
              <bs-icon icon="ArrowDropDown" size="24" />
            </bs-button>
          </div>
          <div
            v-if="hasActionButton && (_leftActionButton || _splitActionButton)"
            :class="{ 'md-button-split' : _splitActionButton }"
            class="md-action-button-left">
            <bs-button
              v-if="_splitActionButton === false"
              v-bind="_actionButtonAttrs"
              @click="_incrementValue">
              <bs-icon icon="Add" size="24" />
            </bs-button>
            <bs-button v-bind="_actionButtonAttrs" @click="_decrementValue">
              <bs-icon icon="Remove" size="24" />
            </bs-button>
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
              v-bind="attributes"
              role="textbox"
              @blur="_onBlur"
              @focus="_onFocus"
              @input="_updateValue($event.target.value)"
              @keydown="_onKeyDown" />
          </div>
          <transition name="fade">
            <div
              v-if="hasClearButton"
              class="md-action-icon">
              <bs-icon
                v-if="hasClearButton"
                icon="clear"
                height="24"
                @click="clearValue" />
            </div>
          </transition>
          <div
            v-if="hasActionButton && (_rightActionButton || _splitActionButton)"
            class="md-action-button-right">
            <bs-button
              v-if="_splitActionButton === false"
              v-bind="_actionButtonAttrs"
              @click="_decrementValue">
              <bs-icon icon="Remove" size="24" />
            </bs-button>
            <bs-button v-bind="_actionButtonAttrs" @click="_incrementValue">
              <bs-icon icon="Add" size="24" />
            </bs-button>
          </div>
          <div
            v-if="hasSpinButton && _rightSpinButton"
            class="md-spin-button-right">
            <bs-button
              color="dark"
              size="xs"
              flat
              @click="_incrementValue">
              <bs-icon icon="ArrowDropUp" size="24" />
            </bs-button>
            <bs-button
              color="dark"
              size="xs"
              flat
              @click="_decrementValue">
              <bs-icon icon="ArrowDropDown" size="24" />
            </bs-button>
          </div>
          <div
            v-if="appendIcon"
            class="md-append-icon">
            <slot name="appendIcon">
              <font-awesome-icon :icon="appendIcon" fixed-width />
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
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import Input from "./mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import Helper from "../../utils/Helper";
import "../../../scss/_field.scss"

export default {
    name: "BsNumericField",
    components: {FontAwesomeIcon, BsButton, BsIcon},
    mixins: [Input, TextField, FieldValidation],
    props: {
        locale: {
            type: String,
            default: 'en-US'
        },
        useGrouping: {
            type: Boolean,
            default: true
        },
        spinButton: {
            type: Boolean,
            default: true
        },
        spinButtonPlacement: {
            type: String,
            default: 'right',
            validator: v => ['left', 'right'].includes(v)
        },
        actionButton: {
            type: Boolean,
            default: false
        },
        actionButtonColor: {
            type: String,
            default: 'secondary'
        },
        actionButtonPlacement: {
            type: String,
            default: 'right',
            validator: v => ['left', 'right', 'both'].includes(v)
        },
        /**
         * Sets the maximum allowed fraction or decimal digits for the displayed value.
         * @type {number|*}
         */
        maxFraction: {
            type: [Number, String],
            default: 3,
            validator: v => !isNaN(parseInt(v))
        },
        /**
         * Sets the maximum allowed value.
         * @type {number|*}
         */
        maxValue: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseFloat(v))
        },
        /**
         * Sets the minimum allowed value
         * @type {number|*}
         */
        minValue: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseFloat(v))
        },
        step: {
            type: [Number, String],
            default: 1.0,
            validator: v => !isNaN(parseFloat(v))
        },
        /**
         * The value monitored by `v-model` to maintain field value.
         * @type {string|number|*}
         */
        value: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseFloat(v))
        },
    },
    data() {
        const value = this._parseValue(this.value);
        const formatter = new Intl.NumberFormat(this.locale, {
            maximumFractionDigits: parseInt(this.maxFraction),
            useGrouping: this.useGrouping
        });

        return {
            invalidNumber: false,
            numberValue: value,
            formatter: formatter,
            localValue: !Helper.isEmpty(value) ? formatter.format(value) : null
        }
    },
    computed: {
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
        _actionButtonAttrs() {
            return {
                'color': this.actionButtonColor,
                'mode': 'icon',
                'size': 'xs'
            }
        },
        _leftActionButton() {
            return !this.spinButton && this.actionButton && this.actionButtonPlacement === 'left';
        },
        _rightActionButton() {
            return !this.spinButton && this.actionButton && this.actionButtonPlacement === 'right';
        },
        _splitActionButton() {
            return !this.spinButton && this.actionButton && this.actionButtonPlacement === 'both';
        },
        _leftSpinButton() {
            return this.spinButton && this.spinButtonPlacement === 'left';
        },
        _rightSpinButton() {
            return this.spinButton && this.spinButtonPlacement === 'right';
        },
        hasActionButton() {
            return this.actionButton && !this.spinButton && !this.readonly && !this.disabled;
        },
        hasSpinButton() {
            return this.spinButton && !this.readonly && !this.disabled;
        },
        /**
         * @returns {number|null} The maximum allowed value
         * @private
         */
        _maxValue() {
            const _value = parseFloat(this.maxValue);

            if (!isNaN(_value)) {
                return _value;
            }

            return null;
        },
        /**
         * @returns {number|null} The minimum allowed value
         * @private
         */
        _minValue() {
            const _value = parseFloat(this.minValue);

            if (!isNaN(_value)) {
                return _value;
            }

            return null;
        },
        /**
         * @returns {number} The increment/decrement step value.
         * @private
         */
        _stepValue() {
            const _step = parseFloat(this.step);

            if (!isNaN(_step)) {
                return _step;
            }

            return 1.0;
        },
        /**
         * Get input field computed binding's attributes.
         *
         * @returns {Object|*} Attributes to bind
         */
        attributes() {
            return {
                ...this.cmpAttrs,
                ...this.fieldAttrs,
                'type': 'text',
            }
        },
    },
    watch: {
        value(newValue) {
            if (newValue && this.isFocused) {
                this.numberValue = newValue;
                this.localValue = Helper.roundNumber(newValue, this.maxFraction);
            } else if (newValue) {
                this.numberValue = this._parseValue(newValue);
                this.localValue = this.formatValue(this.numberValue);
            } else {
                this.localValue = null;
            }
            this._updateLegend(newValue);
        }
    },
    mounted() {
        this._updateLabel();
        this.$nextTick(() => {
            if (this.autofocus && this.$refs.input) {
                this.$refs.input.focus();
            }
            this._updateLegend();
        });
    },
    methods: {
        /**
         * Clear the input value.
         *
         * @returns {void}
         */
        clearValue() {
            this.numberValue = null;
            this.localValue = null;
            this.$emit('input', '');
            this.$nextTick(() => {
                this.$emit('clear');
                this._updateLegend();
            });
        },
        /**
         * Format the input value as number formatted value.
         *
         * @param {number} value The value to format
         * @returns {string} The formatted value
         */
        formatValue(value) {
            return !Helper.isEmpty(value) ? this.formatter.format(value) : null;
        },
        isBelowOrEqualMaxValue(value) {
            return Helper.isEmpty(this._maxValue) ? true : (!Helper.isEmpty(this._maxValue) && value <= this._maxValue);
        },
        isAboveOrEqualMinValue(value) {
            return Helper.isEmpty(this._minValue) ? true : (!Helper.isEmpty(this._minValue) && value >= this._minValue);
        },
        _decrementValue() {
            const _value = this.numberValue - this._stepValue;
            this._updateValue(_value);
        },
        _incrementValue() {
            const _value = this.numberValue + this._stepValue;
            this._updateValue(_value);
        },
        /**
         * Handler when input field lost focus.
         *
         * @param {FocusEvent} e The received event
         * @returns {void}
         * @private
         */
        _onBlur(e) {
            this.isFocused = false;
            this.localValue = this.formatValue(this.numberValue);
            this.$emit('blur', e);
            this._updateLegend();
            this._nextTickChange(this.numberValue);
        },
        /**
         * Handler when input field get focus.
         *
         * @param {FocusEvent} e The received event
         * @returns {void}
         * @private
         */
        _onFocus(e) {
            if (!this.$refs.input) {
                return;
            }
            if (document.activeElement !== this.$refs.input) {
                this.$refs.input.focus();
            }
            if (this.localValue && this.numberValue === undefined) {
                this.numberValue = this._parseValue(this.localValue);
            }

            this.isFocused = true;
            this.localValue = this.numberValue && !isNaN(this.numberValue) ? Helper.roundNumber(this.numberValue, this.maxFraction) : null;
            this.$emit('focus', e);
            this._updateLegend();
        },
        /**
         * Handler when input field receive keypress.
         *
         * @param {KeyboardEvent} e The received event
         * @returns {void}
         * @private
         */
        _onKeyDown(e) {
            if (!this.$refs.input) {
                return;
            }
            const _incrementKey = ['Up', 'ArrowUp'];
            const _decrementKey = ['Down', 'ArrowDown'];
            const _specialKey = ['Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Esc', 'Escape', 'End', 'Tab',
                'Home', 'PageDown', 'PageUp', 'Backspace', 'Clear', 'Delete', 'Copy', 'Cut', 'EraseEof'];

            if (e.key && e.key === 'Enter') {
                this.numberValue = this._parseValue(this.localValue);
                this.localValue = this.formatValue(this.numberValue);
                this.$emit('keydown', e);
                this._nextTickChange(this.numberValue);
            } else if (/^-?\d*[.,]?\d*$/.test(e.key)) {
                this.$emit('keydown', e);
            } else if (_incrementKey.includes(e.key) && !this.disabled && !this.readonly) {
                this._incrementValue();
            } else if (_decrementKey.includes(e.key) && !this.disabled && !this.readonly) {
                this._decrementValue();
            } else if (_specialKey.includes(e.key)) {
                this.$emit('keydown', e);
            } else {
                e.returnValue = false;
            }
        },
        /**
         * Convert an input string as floating-point number.
         *
         * @param {string|number} value The value to convert
         * @returns {number|null} The converted value
         * @private
         */
        _parseValue(value) {
            if (Helper.isEmpty(value)) {
                this.localValue = null;
                return null;
            }
            if (Helper.isNumber(value)) {
                return value;
            }

            let strValue = value.toString();
            const posComma = strValue.indexOf(',');
            const posDot = strValue.indexOf('.');

            if (posComma > -1 && posDot > -1) {
                if (posComma > posDot) {
                    strValue = strValue.replace(/\./g, '').replace(/,/g, '.');
                } else {
                    strValue = strValue.replace(/,/g, '');
                }
            } else if (posComma > -1) {
                const values = strValue.split(',');

                if (values.length > 2) {
                    strValue = values.join('');
                } else {
                    strValue = values.join('.');
                }
            } else if (posDot > -1) {
                const values = strValue.split('.');
                if (values.length > 2) {
                    strValue = values.join('');
                }
            }

            const floatValue = parseFloat(strValue);
            this.invalidNumber = isNaN(floatValue);

            return floatValue;
        },
        /**
         * Update input field value and fire input events.
         *
         * @param {string|number} value the input value
         * @returns {void}
         * @private
         */
        _updateValue(value) {
            const _value = this._parseValue(value);

            if (this.isAboveOrEqualMinValue(_value) && this.isBelowOrEqualMaxValue(_value)) {
                this.numberValue = _value;
                this.localValue = Helper.roundNumber(_value, this.maxFraction);
                this.$emit('input', this.numberValue);
                this._nextTickChange(this.numberValue);
            }
        }
    }
}
</script>

<style scoped>

</style>
