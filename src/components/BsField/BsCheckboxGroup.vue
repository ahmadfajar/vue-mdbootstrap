<template>
  <div :class="_classNames" class="md-field md-checkbox-group row">
    <slot></slot>
    <div class="col-md">
      <div class="md-field-inner">
        <div class="form-row">
          <template v-if="columns">
            <div
              v-for="(item, idx) in items"
              :key="'cbo-' + idx"
              :class="_itemClasses">
              <bs-checkbox
                v-bind="_checkboxAttributes(item, idx)"
                @change="setValue">
                {{ item.label }}
              </bs-checkbox>
            </div>
          </template>
          <template v-else>
            <div
              v-for="(item, idx) in items"
              :key="'cbo-' + idx"
              :class="{'col-12 col-md': items.length > 3, 'px-1': items.length < 4}">
              <bs-checkbox
                v-bind="_checkboxAttributes(item, idx)"
                @change="setValue">
                {{ item.label }}
              </bs-checkbox>
            </div>
          </template>
        </div>
      </div>
      <div v-if="helpText || showErrorValidation" class="md-help-text">
        <slot name="helpText">
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
        /**
         * The component color appearance.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'default'
        },
        /**
         * Sets the maximum number of columns to display the checkbox. When the number of items
         * exceed the number of columns, then the remaining items will be displayed on the
         * next row.
         * @type {number|*}
         */
        columns: {
            type: Number,
            default: undefined,
            validator: v => v > 0 && v < 5
        },
        /**
         * The value monitored by `v-model` to maintain checked state.
         * @type {Array|*}
         */
        value: {
            type: Array,
            default: undefined
        },
        /**
         * The collection of `<bs-checkbox>` property-value.
         * @type {Array|*}
         */
        items: {
            type: Array,
            default: undefined,
            required: true
        },
        /**
         * Sets the `<input>` element `name` attribute.
         * @type {string|number|*}
         */
        name: {
            type: String,
            default: undefined
        },
        /**
         * Show persistent help text or not.
         * @type {boolean|*}
         */
        persistentHelpText: {
            type: Boolean,
            default: true
        },
        /**
         * The checkbox-group `<input>` element `required` attribute.
         * @type {boolean|*}
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * Put the checkbox-group in readonly state and sets the each `<input>` element `readonly` attribute.
         * @type {boolean|*}
         */
        readonly: Boolean,
        /**
         * Disable the checkbox-group and the `<input>` element.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Sets an indeterminate state for the checkbox-group.
         * @type {boolean|*}
         */
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
                'has-success': this.hasValidated && !this.hasValidationError
            }
        },
        _itemClasses() {
            return {
                'col-md-6': this.columns > 1,
                'col-md-12': this.columns === 1,
                ['col-lg-' + Math.ceil(12 / this.columns)]: true
            }
        }
    },
    methods: {
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
                color: item.color || this.color,
                disabled: item.disabled || this.disabled,
                readonly: item.readonly || this.readonly,
                value: item.value,
                name: item.name ? item.name : (this.name ? (this.name + '[' + index + ']') : null),
                indeterminate: item.indeterminate || this.indeterminate,
                checked: this.value
            }
        },
        /**
         * Set CheckboxGroup value.
         *
         * @param {string|number|boolean|Array} value The value to set
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

.#{$prefix}-checkbox-group {
    .#{$prefix}-field-inner {
        border-bottom: 0 !important;
    }
}
</style>
