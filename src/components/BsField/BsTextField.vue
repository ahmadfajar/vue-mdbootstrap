<template>
  <div class="md-field row" :class="_classNames">
    <slot v-if="floatingLabel === false" v-bind="{ id }" />
    <div class="flex-grow-1">
      <div class="md-field-inner align-items-center"
           :class="controlCls">
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
                                :toggle="!isPasswordToggled"
                                @click="isPasswordToggled = !isPasswordToggled" />
          </div>
        </transition>
        <div class="md-append-icon" v-if="appendIcon">
          <slot name="appendSlot">
            <font-awesome-icon :icon="appendIcon" />
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
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsIcon from "../BsIcon/BsIcon";
import BsIconEyeToggle from "../BsIcon/BsIconEyeToggle";
import Input from "../../mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";

export default {
    name: "BsTextField",
    components: {FontAwesomeIcon, BsIcon, BsIconEyeToggle},
    mixins: [Input, TextField, FieldValidation],
    props: {
        type: {
            type: String,
            default: 'text'
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
         * @return {Object} Attributes to bind
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
        });
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-field {
  position: relative;

  &.#{$prefix}-required {
    .#{$prefix}-floating-label,
    .col-form-label {
      font-weight: bold;
    }
  }

  .#{$prefix}-help-text {
    display: block;
    min-height: 10px;
    margin: 4px 15px 0 15px;

    > * {
      font-size: 83% !important;
    }
  }

  .#{$prefix}-field-inner {
    @include display-flex();
    @include flex(1 1 auto);
    border-bottom: 1px solid $gray-500;
    outline: 0 none;
    min-height: 2rem;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 0;
    padding-right: 0;
    position: relative;
    width: auto;

    &:after {
      @include transition(all .3s ease-in-out);
      background-color: $primary-color;
      position: absolute;
      content: '';
      height: 2px;
      bottom: -1px;
      left: 50%;
      width: 0;
    }

    > .#{$prefix}-action-icon,
    > .#{$prefix}-prepend-icon,
    > .#{$prefix}-append-icon {
      color: $gray-700;
      display: inline;
      font-size: 1rem;

      > .#{$prefix}-icon-text {
        color: $gray-500;
        font-size: .88rem;
        white-space: nowrap;
      }
    }

    > .#{$prefix}-prepend-icon {
      margin-right: $padding-sm;
    }

    > .#{$prefix}-action-icon,
    > .#{$prefix}-append-icon {
      margin-left: .4rem;
      margin-right: .3rem;
    }

    > .#{$prefix}-action-icon {
      cursor: pointer;

      > .icon-clear {
        color: $gray-500;

        &:focus, &:active, &:hover, &:active:focus {
          color: $red-base;
        }
      }

      > *:first-child:not(:last-child) {
        padding-right: $padding-sm;
      }
    }

    > input {
      @include flex(1 1 auto);
      border-width: 0;
      outline: 0 none;
      min-height: 2rem;
      width: 100%;

      &::placeholder {
        color: $gray-500;
        font-size: .88rem;
        font-weight: $font-weight-light;
      }

      &::-moz-placeholder {
        color: $gray-500;
        font-size: .88rem;
        font-weight: $font-weight-light;
      }

      &::-webkit-input-placeholder {
        color: $gray-500;
        font-size: .88rem;
        font-weight: $font-weight-light;
      }

      &:-ms-input-placeholder {
        color: $gray-500;
        font-size: .88rem;
        font-weight: $font-weight-light;
      }
    }
  }

  &.#{$prefix}-field-flat {
    .#{$prefix}-field-inner {
      border-bottom-color: transparent;
    }
  }

  &.#{$prefix}-floating-active {
    margin-top: 1.2rem;

    .#{$prefix}-field-inner {
      > .#{$prefix}-floating-label {
        @include transition(0.3s cubic-bezier(0.25, 0.8, 0.5, 1));
        @include transform-origin(top left, false);
        display: inline-block;
        left: 0;
        right: auto;
        line-height: 1.2;
        max-width: 90%;
        min-height: .5rem;
        overflow: hidden;
        margin-left: .4rem;
        padding-top: .4rem;
        position: absolute;
        pointer-events: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 2;

        > .#{$prefix}-empty-class, label {
          margin-bottom: 0;
        }

        &.#{$prefix}-active {
          @include transform(translateY(-20px) scale(.9));
          color: $gray-600;
          margin-left: 0;
          padding-top: 0;
        }

        &.#{$prefix}-after-icon:not(.#{$prefix}-active) {
          margin-left: $padding-base + .5;
        }
      }
    }
  }

  &.#{$prefix}-focused {
    .#{$prefix}-field-inner {
      &:after {
        left: 0;
        width: 100%;
      }

      > .#{$prefix}-prepend-icon,
      > .#{$prefix}-append-icon,
      .#{$prefix}-toggle-icon {
        color: $primary-color;
      }
    }
  }

  &.has-error {
    .col-form-label {
      color: $danger-color-dark;
    }

    .#{$prefix}-field-inner {
      .#{$prefix}-floating-label {
        label {
          color: $danger-color-dark;
        }
      }

      > .#{$prefix}-prepend-icon,
      > .#{$prefix}-append-icon,
      .#{$prefix}-toggle-icon {
        color: $danger-color-dark;
      }

      &:after {
        background-color: $danger-color;
      }
    }
  }

  &.has-success {
    .col-form-label {
      color: $success-color-dark;
    }

    .#{$prefix}-field-inner {
      border-bottom-color: $success-color-dark !important;

      .#{$prefix}-floating-label {
        label {
          color: $success-color-dark;
        }
      }

      > .#{$prefix}-prepend-icon,
      > .#{$prefix}-append-icon,
      .#{$prefix}-toggle-icon {
        color: $success-color-dark;
      }
    }
  }

  &.#{$prefix}-disabled {
    .col-form-label {
      color: $gray-600;
    }

    .#{$prefix}-field-inner {
      > input {
        color: rgba($black, .4);

        &:disabled {
          background-color: transparent;
        }
      }
    }
  }
}
</style>
