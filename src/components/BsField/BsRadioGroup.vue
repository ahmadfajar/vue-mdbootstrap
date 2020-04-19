<template>
  <div class="md-field md-radio-group row" :class="classNames">
    <slot />
    <div class="d-flex flex-column flex-fill">
      <div class="md-field-inner">
        <div class="form-row" v-if="columns">
          <div v-for="(item, idx) in items" :key="'rdo-' + idx" :class="itemClasses">
            <bs-radio v-bind="_radioAttributes(item)" @change="setValue">
              {{ item.label }}
            </bs-radio>
          </div>
        </div>
        <template v-else>
          <bs-radio v-for="(item, idx) in items"
                    :key="'rdo-' + idx"
                    v-bind="_radioAttributes(item)"
                    @change="setValue">
            {{ item.label }}
          </bs-radio>
        </template>
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
import FieldValidation from "./mixins/FieldValidation";

export default {
    name: "BsRadioGroup",
    mixins: [FieldValidation],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        columns: {
            type: Number,
            default: undefined,
            validator: v => v > 0 && v < 5
        },
        persistentHelpText: {
            type: Boolean,
            default: true
        },
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        name: {
            type: [String, Number],
            default: undefined
        },
        items: {
            type: Array,
            default: undefined
        },
        required: Boolean,
        readonly: Boolean,
        disabled: Boolean
    },
    computed: {
        /**
         * Get computed component's class names.
         *
         * @return {Object} The collection of css classes
         */
        classNames() {
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
         * Set radiogroup value.
         *
         * @param {string|number|boolean} value The value to set
         * @return {void}
         */
        setValue(value) {
            this.$emit('change', value);
        },
        /**
         * Set attributes for each radio item.
         *
         * @param {Object} item Global attribute
         * @return {Object} The attributes to bind
         * @private
         */
        _radioAttributes(item) {
            return {
                color: this.color,
                disabled: this.disabled || item.disabled,
                readonly: this.readonly || item.readonly,
                value: item.value,
                name: this.name,
                model: this.value
            }
        }
    }
}
</script>

<style lang="scss">
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .#{$prefix}-radio-group {
    .#{$prefix}-field-inner {
      border-bottom: 0 !important;
    }
  }
</style>
