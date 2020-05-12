<template>
  <div class="md-field row" :class="_classNames">
    <slot v-if="floatingLabel === false" v-bind="{ id }" />
    <div class="flex-grow-1">
      <div class="md-field-inner align-items-center"
           :class="controlCls">
        <fieldset aria-hidden="true">
          <legend ref="legend">
            <span>​</span>
          </legend>
        </fieldset>
        <div v-if="floatingLabel"
             ref="floatlabel"
             class="md-floating-label"
             :class="floatingLabelClass">
          <slot v-bind="{ id }" />
        </div>
        <div v-if="prependIcon" class="md-prepend-icon">
          <slot name="prependSlot">
            <font-awesome-icon :icon="prependIcon" />
          </slot>
        </div>
        <input ref="input"
               role="textbox"
               v-bind="attributes"
               @input="_updateValue($event.target.value)"
               @focus="_onFocus"
               @blur="_onBlur"
               @keydown="_onKeyDown" />
        <transition name="fade">
          <div class="md-action-icon" v-if="hasPasswordToggle || hasClearButton">
            <bs-icon icon="clear" v-if="hasClearButton" @click="clearValue" />
            <bs-icon-eye-toggle v-if="hasPasswordToggle"
                                :toggle="isPasswordToggled"
                                @click="isPasswordToggled = !isPasswordToggled" />
          </div>
        </transition>
        <div class="md-append-icon" v-if="appendIcon">
          <slot name="appendSlot">
            <font-awesome-icon :icon="appendIcon" />
          </slot>
        </div>
      </div>
      <div class="md-help-text" v-if="helpText || showErrorValidation">
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
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsIcon from "../BsIcon/BsIcon";
import BsIconEyeToggle from "../BsIcon/BsIconEyeToggle";
import Input from "../../mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import "../../../scss/_field.scss"

export default {
    name: "BsTextField",
    components: {FontAwesomeIcon, BsIcon, BsIconEyeToggle},
    mixins: [Input, TextField, FieldValidation],
    props: {
        type: {
            type: String,
            default: 'text'
        },
        outlined: {
            type: Boolean,
            default: false
        },
        passwordToggle: {
            type: Boolean,
            default: true
        },
        maxlength: {
            type: [String, Number],
            default: undefined
        },
        minlength: {
            type: [String, Number],
            default: undefined
        }
    },
    data: () => ({
        isPasswordToggled: false
    }),
    computed: {
        /**
         * Get input field computed binding's attributes.
         *
         * @return {any} Attributes to bind
         */
        attributes() {
            return {
                ...this.cmpAttrs,
                ...this.fieldAttrs,
                'type': this.fieldType,
                'maxlength': this.maxlength,
                'minlength': this.minlength
            }
        },
        /**
         * Get computed component's class names.
         *
         * @return {any} Collection of css classes
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-field-flat': this.flat,
                'md-field-outlined': this.outlined,
                'md-focused': this.isFocused,
                'md-floating-active': this.floatingLabel,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
            }
        },
        /**
         * Get computed input field type.
         *
         * @return {string} The input field type
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
         * @return {boolean} TRUE if input field type is password and toggle feature is enabled
         */
        hasPasswordToggle() {
            return this.type === 'password' && this.passwordToggle;
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
    watch: {
        value(newVal) {
            this._updateLegend(newVal);
        }
    },
}
</script>

<style scoped>

</style>
