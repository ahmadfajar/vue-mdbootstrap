<template>
  <div :class="_classNames" class="md-field md-chips-field row">
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
          <div class="md-field-input-wrapper">
            <div
              v-if="floatingLabel"
              ref="floatLabel"
              :class="floatingLabelClass"
              class="md-field-label">
              <slot v-bind="{ id }" />
            </div>
            <bs-chip
              v-for="label in localValue"
              :key="label"
              :color="chipColor"
              :disabled="disabled"
              :dismissible="chipDeletable && !readonly && !disabled"
              :label="chipLabeled"
              :outlined="chipOutlined"
              @close="_onDeleteChip(label)">
              {{ label }}
            </bs-chip>
            <input
              v-if="!(readonly || disabled)"
              ref="input"
              v-bind="_inputAttrs"
              class="md-field-input"
              role="textbox"
              @blur="_onBlur"
              @focus="_onFocus"
              @input="inputValue = $event.target.value"
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
import BsIcon from "../BsIcon/BsIcon";
import BsChip from "../BsBasic/BsChip";
import Input from "./mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import "../../../scss/_field.scss"

export default {
    name: "BsChipField",
    components: {FontAwesomeIcon, BsIcon, BsChip},
    mixins: [Input, TextField, FieldValidation],
    props: {
        /**
         * The default Chips color to apply.
         * @type {string|*}
         */
        chipColor: {
            type: String,
            default: 'light-grey'
        },
        /**
         * When set, display the close button on every Chip to delete a Chip.
         * @type {boolean|*}
         */
        chipDeletable: {
            type: Boolean,
            default: false
        },
        /**
         * Remove Chip's circle edges.
         * @type {boolean|*}
         */
        chipLabeled: {
            type: Boolean,
            default: false
        },
        /**
         * Render Chips with outlined style or not.
         * @type {boolean|*}
         */
        chipOutlined: {
            type: Boolean,
            default: false
        },
        /**
         * The value monitored by `v-model` to maintain field value.
         * @type {string|number|*}
         */
        value: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets the returns value from `v-model` as Array.
         * @type {boolean|*}
         */
        valueAsArray: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        inputValue: '',
    }),
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
        /**
         * Get input field computed binding's attributes.
         *
         * @returns {Object|*} Attributes to bind
         */
        _inputAttrs() {
            return {
                ...this.cmpAttrs,
                ...this.fieldAttrs,
                'value': this.inputValue,
                'type': 'text'
            }
        },
    },
    watch: {
        value(newVal) {
            this._computeInternalValues(newVal);
            this._updateLegend(newVal);
        }
    },
    created() {
        this._computeInternalValues(this.value);
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
            this.inputValue = '';
            this.localValue = [];
            this.$emit('input', null);
            this.$nextTick(() => {
                this.$emit('clear');
                this._updateLegend();
            });
        },
        /**
         * Set field value.
         *
         * @param {string} value The value to be set
         * @returns {void}
         */
        setValue(value) {
            this._computeInternalValues(value);
            this._emitInput();
        },
        /**
         * Compute local value from the given `value`.
         *
         * @param {string|Array} value The given value
         * @returns {void}
         * @private
         */
        _computeInternalValues(value) {
            if (Array.isArray(value)) {
                this.localValue = value;
            } else if (typeof value !== 'undefined' && value !== null && value !== '') {
                this.localValue = value.split(',').map(v => v.trim());
            } else {
                this.localValue = [];
            }
        },
        /**
         * Fires input event.
         *
         * @returns {void}
         * @private
         */
        _emitInput() {
            this.$emit('input', this.valueAsArray ? this.localValue : this.localValue.join(', '));
        },
        /**
         * Handler when the input field lost focus.
         *
         * @param {FocusEvent} e The received event
         * @returns {void}
         * @private
         */
        _onBlur(e) {
            this.isFocused = false;

            if (this.inputValue !== '') {
                this.localValue.push(this.inputValue);
                this._emitInput();
            }

            this.inputValue = '';
            this.$emit('blur', e);
            this._nextTickChange(this.localValue);
            this._updateLegend();
        },
        /**
         * Handler when the Chip is dismissed.
         *
         * @param {string} value The Chip text
         * @returns {void}
         * @private
         */
        _onDeleteChip(value) {
            this.localValue = this.localValue.filter(v => v !== value);
            this._emitInput();
            this.$emit('delete-item', value);
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

            if (e.key && e.key === 'Backspace' && this.$refs.input.value === '') {
                this.localValue.pop();
                this.inputValue = '';
                this.$emit('keydown', e);
                this.$nextTick(() => {
                    this._emitInput();
                });
            } else if (e.key && e.key === 'Enter') {
                if (this.$refs.input.value !== '') {
                    this.localValue.push(this.$refs.input.value);
                }

                this.inputValue = '';
                this.$emit('keydown', e);
                this.$nextTick(() => {
                    this._emitInput();
                });
            } else {
                this.$emit('keydown', e);
            }
        },
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-chips-field {
    .#{$prefix}-field-input-wrapper {
        @include flex-wrap(wrap);

        .#{$prefix}-chip {
            margin: .25rem $padding-sm .25rem 0;
        }

        > .#{$prefix}-field-input {
            @include flexbox((display: inline-flex, flex: 1 1 0));
            min-width: 125px;
            max-width: 100%;
            width: auto !important;
        }
    }

    &.#{$prefix}-floating-label:not(.#{$prefix}-field-outlined) {
        .#{$prefix}-field-inner {
            .#{$prefix}-field-label {
                top: 4px;

                &.#{$prefix}-active {
                    @include transform(translateY(-22px) scale(.8));
                }
            }
        }

        &.#{$prefix}-field-filled {
            .#{$prefix}-field-inner {
                padding-bottom: 0;

                > .#{$prefix}-field-input-wrapper {
                    margin-top: 1.15rem;

                    > input {
                        padding-top: $padding-sm;
                    }

                    > .#{$prefix}-field-label {
                        top: 0;

                        &.#{$prefix}-active {
                            @include transform(translateY(-16px) scale(.8));
                        }
                    }
                }
            }
        }
    }
}
</style>
