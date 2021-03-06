<template>
  <div :class="_classNames" class="md-textarea row align-items-start">
    <slot v-if="floatingLabel === false" v-bind="{ id }" />
    <div class="md-field-wrapper">
      <div
        v-if="prependIconOuter"
        class="md-prepend-icon">
        <slot name="prependIconOuter">
          <font-awesome-icon :icon="prependIconOuter" fixed-width />
        </slot>
      </div>
      <div class="md-field-ctrl">
        <div class="md-field-inner">
          <fieldset
            v-if="outlined"
            aria-hidden="true">
            <legend ref="legend">
              <span>​</span>
            </legend>
          </fieldset>
          <div
            v-if="prependIcon"
            class="md-prepend-icon">
            <slot name="prependIcon">
              <font-awesome-icon :icon="prependIcon" fixed-width />
            </slot>
          </div>
          <div class="md-field-input-wrapper">
            <div
              v-if="floatingLabel"
              ref="floatLabel"
              :class="floatingLabelClass"
              class="md-field-label">
              <slot v-bind="{ id }" />
            </div>
            <textarea
              ref="input"
              v-bind="attributes"
              role="textbox"
              @blur="_onBlur"
              @focus="_onFocus"
              @input="_updateHeight"
              @keydown="_onKeyDown"></textarea>
          </div>
          <transition name="fade">
            <div
              v-if="hasClearButton"
              class="md-action-icon">
              <bs-icon
                v-if="hasClearButton"
                icon="clear"
                height="24"
                @click="clearValue" />
            </div>
          </transition>
          <div
            v-if="appendIcon"
            class="md-append-icon">
            <slot name="appendIcon">
              <font-awesome-icon :icon="appendIcon" fixed-width />
            </slot>
          </div>
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
      <div
        v-if="appendIconOuter"
        class="md-append-icon">
        <slot name="appendIconOuter">
          <font-awesome-icon :icon="appendIconOuter" fixed-width />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsIcon from "../BsIcon/BsIcon";
import Input from "./mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import Helper from "../../utils/Helper";
import "../../../scss/_field.scss"

export default {
    name: "BsTextArea",
    components: {FontAwesomeIcon, BsIcon},
    mixins: [Input, TextField, FieldValidation],
    props: {
        /**
         * Enable/disable `<textarea>` element to auto grow.
         * @type {boolean|*}
         */
        autoGrow: {
            type: Boolean,
            default: false
        },
        /**
         * Disable resizing the `<textarea>` element.
         * @type {boolean|*}
         */
        noResize: {
            type: Boolean,
            default: false
        },
        /**
         * Sets `<textarea>` height in rows.
         * @type {string|number|*}
         */
        rows: {
            type: [String, Number],
            default: 2,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Sets `<textarea>` height in pixel.
         * @type {string|number|*}
         */
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
                'md-field-filled': this.filled,
                'md-field-outlined': this.outlined,
                'md-field-autogrow': this.canGrow,
                'md-field-noresize': this.noResize || this.canGrow,
                'md-floating-label': this.floatingLabel,
                'has-error': this.hasValidationError,
                'has-success': this.hasValidated && !this.hasValidationError
            }
        },
        /**
         * Get input field computed binding's attributes.
         *
         * @returns {Object|*} Attributes to bind
         */
        attributes() {
            let attr = {
                ...this.cmpAttrs,
                ...this.fieldAttrs,
                'rows': this.canGrow ? 2 : this.rows,
            }
            if (this.fieldHeight) {
                attr['style'] = {
                    'height': this.fieldHeight
                }
            }

            return attr;
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
                return Helper.sizeUnit(this.rowHeight);
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
            this.localValue = newVal;
            this._updateLegend(newVal);
        }
    },
    methods: {
        /**
         * Clear the input value.
         *
         * @returns {void}
         */
        clearValue() {
            this.localValue = null;
            this.$emit('input', '');
            this.$nextTick(() => {
                this.$emit('clear');
                this._updateLegend();
            });
            if (this.canGrow) {
                this.$refs.input.style.height = 'auto';
            }
        },
        /**
         * Update textarea height on input events.
         *
         * @param {Event} e The input event
         * @returns {void}
         * @private
         */
        _updateHeight(e) {
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
