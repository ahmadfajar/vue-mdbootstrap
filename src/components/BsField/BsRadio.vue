<template>
  <div class="md-radio" :class="['md-radio-' + color, radioClassname]">
    <div class="md-radio-inner" @click.stop="toggleCheck">
      <bs-ripple :active.sync="rippleActive" :disabled="disabled" centered>
        <input type="radio"
               role="radio"
               v-model="checked"
               v-bind="attributes"
               :value="value" />
      </bs-ripple>
    </div>
    <label v-if="$slots.default"
           :for="id"
           class="md-radio-label"
           @click.prevent="toggleCheck">
      <slot></slot>
    </label>
  </div>
</template>

<script>
import BsRipple from '../BsAnimation/BsRipple';
import Helper from "../../utils/Helper";

export default {
    name: "BsRadio",
    components: {BsRipple},
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        color: {
            type: String,
            default: 'default'
        },
        value: {
            type: [String, Number, Boolean],
            default: 'on'
        },
        checked: {
            type: [String, Number, Boolean],
            default: undefined
        },
        name: {
            type: [String, Number],
            default: undefined
        },
        required: Boolean,
        readonly: Boolean,
        disabled: Boolean
    },
    data: () => ({
        rippleActive: false
    }),
    computed: {
        /**
         * Get computed binding's properties.
         *
         * @return {*} Attributes to bind
         */
        attributes() {
            return {
                'id': this.id,
                'name': this.name,
                'required': this.required,
                'disabled': this.disabled,
                'readonly': this.readonly,
                'aria-disabled': this.disabled,
                'aria-checked': this.isSelected
            };
        },
        /**
         * Check if radio is active/selected or not.
         *
         * @return {boolean} TRUE if radio is active/selected otherwise FALSE
         */
        isSelected() {
            return this.checked === this.value;
        },
        /**
         * Get computed component classes.
         *
         * @return {*} Collection of css classes
         */
        radioClassname() {
            return {
                'md-checked': this.isSelected,
                'md-disabled': this.disabled || this.readonly,
                'md-required': this.required
            }
        },
        /**
         * Computed getter and setter.
         */
        localValue: {
            get() {
                return this.value;
            },
            set(value) {
                if (!this.disabled && !this.readonly) {
                    this.$emit('change', value);
                }
            }
        }
    },
    methods: {
        /**
         * Handle radio toggle status, checked or unchecked.
         *
         * @return {void}
         */
        toggleCheck() {
            if (!this.disabled && !this.readonly) {
                this.rippleActive = true;
                this.$emit('change', this.value);
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/controls";

.#{$prefix}-radio {
  display: inline-flex;
  margin: $md-radio-margin;
  position: relative;
  width: auto;

  &:not(.#{$prefix}-disabled) {
    cursor: pointer;

    .#{$prefix}-radio-label {
      cursor: pointer;
    }
  }

  > .#{$prefix}-radio-inner {
    border: 2px solid rgba(#000, .54);
    height: $md-radio-size;
    min-width: $md-radio-size;
    width: $md-radio-size;
    position: relative;
    @include border-radius($border-radius-circle);
    @include transition($md-transition-stand);

    &:focus {
      outline: none;
    }

    &:before,
    &:after {
      content: " ";
      position: absolute;
      @include transition($md-transition-drop);
    }

    &:before {
      height: $md-radio-touch-size;
      width: $md-radio-touch-size;
      left: 50%;
      top: 50%;
      z-index: 11;
      @include border-radius($border-radius-circle);
      @include transform(translate(-50%, -50%));
    }

    &:after {
      content: " ";
      bottom: 3px;
      left: 3px;
      right: 3px;
      top: 3px;
      opacity: 0;
      position: absolute;
      @include border-radius($border-radius-circle);
      @include transform(scale3D(.38, .38, 1));
    }

    .#{$prefix}-ripple {
      height: $md-radio-touch-size !important;
      width: $md-radio-touch-size !important;
      left: 50% !important;
      top: 50% !important;
      @include border-radius($border-radius-circle);
      @include transform(translate(-50%, -50%));
    }

    input {
      left: -999em;
      position: absolute;
    }
  }

  > .#{$prefix}-radio-label {
    height: $md-radio-size;
    line-height: $md-radio-size;
    padding-left: 16px;
    position: relative;
    @include user-select(none);
  }

  &.#{$prefix}-checked {
    .#{$prefix}-radio-inner {
      &:after {
        opacity: 1;
        @include transform(scale3D(1, 1, 1));
        @include transition($md-transition-stand);
      }
    }
  }

  &.#{$prefix}-required {
    label:after {
      content: "*";
      line-height: 1em;
      position: absolute;
      right: 0;
      top: 2px;
      vertical-align: top;
      @include transform(translateX(calc(100% + 2px)));
    }
  }

  &.#{$prefix}-disabled {
    > .#{$prefix}-radio-inner {
      border-color: rgba(#000, .26);

      &:after {
        background-color: rgba(#000, .26);
      }
    }
  }
}

@each $name, $color in $theme-colors {
  @include make-radio($name, $color);
}
</style>
