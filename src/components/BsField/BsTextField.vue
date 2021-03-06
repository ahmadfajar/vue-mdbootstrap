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
              v-if="hasPasswordToggle || hasClearButton"
              class="md-action-icon">
              <bs-icon
                v-if="hasClearButton"
                icon="clear"
                height="24"
                @click="clearValue" />
              <bs-icon-toggle
                v-if="hasPasswordToggle"
                v-model="isPasswordToggled"
                icon="eye"
                toggle-icon="eye-slash" />
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
import BsIconToggle from "../BsIcon/BsIconToggle";
import Input from "./mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import "../../../scss/_field.scss"

export default {
    name: "BsTextField",
    components: {FontAwesomeIcon, BsIcon, BsIconToggle},
    mixins: [Input, TextField, FieldValidation],
    props: {
        /**
         * Sets <input> element type attribute. Valid values are: `text`, `password`, `email`, `url`, `tel`.
         * @type {string|*}
         */
        type: {
            type: String,
            default: 'text',
            validator: v => ['text', 'email', 'password', 'tel', 'url', 'range'].indexOf(v) > -1
        },
        /**
         * Enable toggle password field.
         * @type {boolean|*}
         */
        passwordToggle: {
            type: Boolean,
            default: true
        },
        /**
         * Sets `<input>` element maximum characters allowed.
         * @type {string|number|*}
         */
        maxlength: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Sets `<input>` element minimum characters allowed.
         * @type {string|number|*}
         */
        minlength: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Sets target `<datalist>` element ID.
         * @type {string|*}
         */
        datalist: {
            type: String,
            default: undefined
        },
    },
    data: () => ({
        isPasswordToggled: false,
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
        attributes() {
            return {
                ...this.cmpAttrs,
                ...this.fieldAttrs,
                'type': this.fieldType,
                'list': this.datalist,
                'maxlength': this.maxlength,
                'minlength': this.minlength
            }
        },
        /**
         * Get computed input field type.
         *
         * @returns {string} The input field type
         */
        fieldType() {
            if (this.hasPasswordToggle) {
                return this.isPasswordToggled ? 'text' : 'password';
            }

            return this.type;
        },
        /**
         * Check if feature password toggle is enabled or not.
         *
         * @returns {boolean} TRUE if input field type is password and toggle feature is enabled
         */
        hasPasswordToggle() {
            return this.type === 'password' && this.passwordToggle;
        }
    },
    watch: {
        value(newVal) {
            this.localValue = newVal;
            this._updateLegend(newVal);
            // this._setFloatingLabelPosition();
        }
    },
    mounted() {
        this._updateLabel();
        this.$nextTick(() => {
            if (this.autofocus && this.$refs.input) {
                this.$refs.input.focus();
            }
            this._updateLegend();
            // this._setFloatingLabelPosition();
        });
    },
}
</script>

<style scoped>

</style>
