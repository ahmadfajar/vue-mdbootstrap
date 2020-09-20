<template>
  <div :class="_classNames" class="md-textarea row align-items-start">
    <slot v-if="floatingLabel === false" v-bind="{ id }" />
    <div class="flex-grow-1">
      <div :class="controlCls" class="md-field-inner align-items-start">
        <fieldset aria-hidden="true">
          <legend ref="legend">
            <span>​</span>
          </legend>
        </fieldset>
        <div v-if="floatingLabel"
             ref="floatLabel"
             :class="floatingLabelClass"
             class="md-floating-label">
          <slot v-bind="{ id }" />
        </div>
        <div v-if="prependIcon" class="md-prepend-icon d-flex">
          <slot name="prependSlot">
            <font-awesome-icon :icon="prependIcon" />
          </slot>
        </div>
        <textarea ref="input"
                  v-bind="attributes"
                  role="textbox"
                  @blur="_onBlur"
                  @focus="_onFocus"
                  @input="_updateHeight"
                  @keydown="_onKeyDown"></textarea>
        <div v-if="hasClearButton || appendIcon" class="md-action-icon d-flex">
          <transition name="fade">
            <bs-icon v-if="hasClearButton"
                     icon="clear"
                     @click="clearValue" />
          </transition>
          <span v-if="appendIcon" class="md-append-icon">
            <slot name="appendSlot">
              <font-awesome-icon :icon="appendIcon" />
            </slot>
          </span>
        </div>
      </div>
      <div v-if="helpText || showErrorValidation" class="md-help-text">
        <slot name="helpText">
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
import Input from "../../mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import Util from "../../utils/Helper";
import "../../../scss/_field.scss"

export default {
    name: "BsTextArea",
    components: {FontAwesomeIcon, BsIcon},
    mixins: [Input, TextField, FieldValidation],
    props: {
        autoGrow: {
            type: Boolean,
            default: false
        },
        noResize: {
            type: Boolean,
            default: false
        },
        rows: {
            type: [String, Number],
            default: 2,
            validator: v => !isNaN(parseInt(v, 10))
        },
        rowHeight: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
    },
    computed: {
        /**
         * Get computed component's class names.
         *
         * @returns {Object|*} Collection of css classes
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-focused': this.isFocused,
                'md-field-flat': this.flat,
                'md-field-autogrow': this.canGrow,
                'md-field-outlined': this.outlined,
                'md-field-noresize': this.noResize,
                'md-floating-active': this.floatingLabel,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
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
                'rows': this.canGrow ? 2 : this.rows,
                'height': this.fieldHeight
            }
        },
        /**
         * Check if TextArea field can auto grow or not.
         *
         * @returns {boolean} TRUE if textarea field can grow
         */
        canGrow() {
            return this.autoGrow && !this.noResize;
        },
        /**
         * Calculate textarea field's height.
         *
         * @returns {string|null} The textarea field's height
         */
        fieldHeight() {
            if (this.rowHeight && !this.canGrow) {
                return Util.sizeUnit(this.rowHeight);
            }

            return null;
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
    methods: {
        /**
         * Update textarea height on input events.
         *
         * @param {Event} e The input event
         * @returns {void}
         * @private
         */
        _updateHeight: function (e) {
            if (this.canGrow) {
                this.$refs.input.style.height = 'auto';
                this.$refs.input.style.height = e.target.scrollHeight + "px";
            }
            this._updateValue(e.target.value);
        }
    }
}
</script>

<style scoped>

</style>
