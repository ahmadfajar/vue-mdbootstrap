<template>
  <div
    :class="_classNames"
    class="md-field md-button-toggle row"
    @mouseenter="_onFocus"
    @mouseleave="_onBlur">
    <slot></slot>
    <div class="col-md">
      <div class="md-field-inner">
        <bs-button-toggle v-bind="_btnToggleAttributes" @change="setValue" />
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
  </div>
</template>

<script>
import BsButtonToggle from "./BsButtonToggle";
import ButtonToggle from "./mixins/ButtonToggle";
import FieldValidation from "../BsField/mixins/FieldValidation";
import Input from "../BsField/mixins/Input";

export default {
    name: "BsButtonToggleField",
    components: {BsButtonToggle},
    mixins: [Input, ButtonToggle, FieldValidation],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        /**
         * Show persistent help text or not.
         * @type {boolean|*}
         */
        persistentHelpText: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        isFocused: false
    }),
    computed: {
        /**
         * Get ButtonToggle's computed binding properties.
         *
         * @returns {Object|*} Component binding properties
         * @private
         */
        _btnToggleAttributes() {
            return {
                disabled: this.disabled,
                readonly: this.readonly,
                required: this.required,
                flat: this.flat,
                outlined: this.outlined,
                raised: this.raised,
                items: this.items,
                name: this.name,
                size: this.size,
                color: this.color,
                toggleColor: this.toggleColor,
                iconPosition: this.iconPosition,
                multiple: this.multiple,
                value: this.value,
            }
        },
        /**
         * Get computed component's class names.
         *
         * @returns {Object|*} Component css classes
         * @private
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
            }
        }
    },
    methods: {
        _onBlur() {
            this.isFocused = false;
        },
        _onFocus() {
            this.isFocused = true;
        },
        /**
         * Set Toggle field value.
         *
         * @param {string|number|boolean|Array} value The updated value
         * @returns {void}
         */
        setValue(value) {
            this.$emit('change', value);
        }
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-field {
    &.#{$prefix}-button-toggle {
        .#{$prefix}-field-inner {
            border-bottom: 0;

            .btn {
                //font-size: .875rem;
                margin-bottom: 0;

                &.btn-sm {
                    font-size: 90%;
                    margin-top: $btn-margin-basic;

                    .btn-inner {
                        padding: $btn-margin-lg 1rem;
                    }
                }
            }
        }

        .#{$prefix}-help-text {
            min-height: 20px;
            margin-top: 4px;
        }
    }
}
</style>
