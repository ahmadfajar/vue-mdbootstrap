<template>
  <div :class="_classNames" class="md-field md-button-toggle row">
    <slot></slot>
    <div class="d-flex flex-column flex-fill">
      <div class="md-field-inner">
        <bs-button-toggle v-bind="_btnToggleAttributes" @change="setValue" />
      </div>
      <div v-if="helpText || showErrorValidation" class="md-help-text">
        <slot name="helptext">
          <small v-if="showHelpText" class="text-muted d-block">
            {{ helpText }}
          </small>
        </slot>
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
import Input from "../../mixins/Input";

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
                font-size: .875rem;
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
    }
}
</style>
