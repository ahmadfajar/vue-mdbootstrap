<template>
  <div class="md-field md-checkbox-group row" :class="_classNames">
    <slot />
    <div class="d-flex flex-column flex-fill">
      <div class="md-field-inner">
        <div class="flex-fill form-row">
          <template v-if="columns">
            <div v-for="(item, idx) in items" :key="'cbo-' + idx" :class="itemClasses">
              <bs-checkbox v-bind="_checkboxAttributes(item, idx)" @change="setValue">
                {{ item.label }}
              </bs-checkbox>
            </div>
          </template>
          <template v-else>
            <div v-for="(item, idx) in items"
                 :key="'cbo-' + idx"
                 :class="{'col-12 col-md': items.length > 3, 'px-1': items.length < 4}">
              <bs-checkbox v-bind="_checkboxAttributes(item, idx)" @change="setValue">
                {{ item.label }}
              </bs-checkbox>
            </div>
          </template>
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
import BsCheckbox from "./BsCheckbox";
import FieldValidation from "./mixins/FieldValidation";

export default {
    name: "BsCheckboxGroup",
    components: {BsCheckbox},
    mixins: [FieldValidation],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'default'
        },
        columns: {
            type: Number,
            default: undefined,
            validator: v => v > 0 && v < 5
        },
        value: {
            type: Array,
            default: undefined
        },
        items: {
            type: Array,
            default: undefined
        },
        name: {
            type: String,
            default: undefined
        },
        persistentHelpText: {
            type: Boolean,
            default: true
        },
        required: {
            type: Boolean,
            default: false
        },
        // readonly: Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        /**
         * Get computed component's class names.
         *
         * @returns {Object|*} The collection of css classes
         */
        _classNames() {
            return {
                'md-disabled': this.disabled,
                'md-readonly': this.readonly,
                'md-required': this.required,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
            }
        },
        itemClasses() {
            return {
                'col-12': true,
                ['col-lg-' + Math.ceil(12 / this.columns)]: true
            }
        }
    },
    methods: {
        /**
         * Set CheckboxGroup value.
         *
         * @param {string|number|boolean} value The value to set
         * @returns {void}
         */
        setValue(value) {
            this.$emit('change', value);
        },
        /**
         * Set attributes for each checkbox item.
         *
         * @param {Object} item  Global attribute
         * @param {number} index Checkbox item index
         * @returns {Object|*} The attributes to bind
         * @private
         */
        _checkboxAttributes(item, index) {
            return {
                color: this.color,
                disabled: this.disabled || item.disabled,
                // readonly: this.readonly || item.readonly,
                value: item.value,
                name: this.name ? (this.name + '[' + index + ']') : item.name,
                indeterminate: this.indeterminate,
                checked: this.value
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-checkbox-group {
  .#{$prefix}-field-inner {
    border-bottom: 0 !important;
  }
}
</style>
