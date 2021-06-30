<template>
  <div
    :class="['md-radio-' + color, _radioClassname]"
    class="md-radio">
    <div
      class="md-radio-inner"
      @click.stop="toggleCheck">
      <bs-ripple
        :active.sync="rippleActive"
        :disabled="disabled"
        centered>
        <input
          v-model="localValue"
          v-bind="_attributes"
          role="radio"
          type="radio" />
      </bs-ripple>
    </div>
    <label
      v-if="$slots.default"
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
        /**
         * The field component color appearance.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'default'
        },
        /**
         * The `<input>` element `value` attribute.
         * @type {string|boolean|number|*}
         */
        value: {
            type: [String, Number, Boolean],
            default: 'on'
        },
        /**
         * The field component value monitored by `v-model` to maintain its state.
         * @type {string|boolean|number|*}
         */
        checked: {
            type: [String, Number, Boolean],
            default: undefined
        },
        /**
         * Sets the `<input>` element `name` attribute.
         * @type {string|number|*}
         */
        name: {
            type: [String, Number],
            default: undefined
        },
        /**
         * Sets the `<input>` element `required` attribute.
         * @type {boolean|*}
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * Put the field component in readonly state and sets the `<input>` element `readonly` attribute.
         * @type {boolean|*}
         */
        readonly: Boolean,
        /**
         * Enable/disable the component and the `<input>` element.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        rippleActive: false,
    }),
    computed: {
        /**
         * Get computed binding's properties.
         *
         * @returns {Object|*} Attributes to bind
         */
        _attributes() {
            return {
                'id': this.id,
                'name': this.name,
                'value': this.value,
                'required': this.required,
                'disabled': this.disabled,
                'readonly': this.readonly,
                'aria-disabled': this.disabled,
                'aria-checked': this.isSelected,
            };
        },
        /**
         * Get computed component classes.
         *
         * @returns {Object|*} Collection of css classes
         */
        _radioClassname() {
            return {
                'md-checked': this.isSelected,
                'md-disabled': this.disabled || this.readonly,
                'md-required': this.required
            }
        },
        /**
         * Check if radio is active/selected or not.
         *
         * @returns {boolean} TRUE if radio is active/selected otherwise FALSE
         */
        isSelected() {
            return this.checked === this.value;
        },
        /**
         * Computed getter and setter.
         */
        localValue: {
            get() {
                return this.checked;
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
         * @returns {void}
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
@import "../../../scss/mixins";

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
        @include border-radius($border-radius-circle);
        @include transition($md-transition-stand);
        border: 2px solid rgba(#000, .54);
        height: $md-radio-size;
        min-width: $md-radio-size;
        width: $md-radio-size;
        position: relative;

        &:focus {
            outline: none;
        }

        &:before,
        &:after {
            @include transition($md-transition-drop);
            content: " ";
            position: absolute;
        }

        &:before {
            @include border-radius($border-radius-circle);
            @include transform(translate(-50%, -50%));
            height: $md-radio-touch-size;
            width: $md-radio-touch-size;
            left: 50%;
            top: 50%;
            z-index: 11;
        }

        &:after {
            @include border-radius($border-radius-circle);
            @include transform(scale3D(.38, .38, 1));
            content: " ";
            bottom: 3px;
            left: 3px;
            right: 3px;
            top: 3px;
            opacity: 0;
            position: absolute;
        }

        .#{$prefix}-ripple {
            @include border-radius($border-radius-circle);
            @include transform(translate(-50%, -50%));
            height: $md-radio-touch-size !important;
            width: $md-radio-touch-size !important;
            left: 50% !important;
            top: 50% !important;
        }

        input {
            left: -999em;
            position: absolute;
        }
    }

    > .#{$prefix}-radio-label {
        @include user-select(none);
        height: $md-radio-size;
        line-height: $md-radio-size;
        margin-bottom: 0;
        padding-left: $padding-base;
        position: relative;
    }

    &.#{$prefix}-checked {
        .#{$prefix}-radio-inner {
            &:after {
                @include transform(scale3D(1, 1, 1));
                @include transition($md-transition-stand);
                opacity: 1;
            }
        }
    }

    &.#{$prefix}-required {
        label:after {
            @include transform(translateX(calc(100% + 2px)));
            content: "*";
            line-height: 1em;
            position: absolute;
            right: 0;
            top: 2px;
            vertical-align: top;
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
