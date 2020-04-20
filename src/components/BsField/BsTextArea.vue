<template>
  <div class="md-field-textarea row align-items-start" :class="_classNames">
    <slot v-if="floatingLabel === false" v-bind="{ id }" />
    <div class="flex-grow-1">
      <div class="md-field-inner align-items-start" :class="controlCls">
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
        <textarea ref="input"
                  role="textbox"
                  v-bind="attributes"
                  @input="_updateHeight"
                  @focus="_onFocus"
                  @blur="_onBlur"
                  @keydown="_onKeyDown"></textarea>
        <div class="md-action-icon d-flex">
          <transition name="fade">
            <bs-icon v-if="hasClearButton"
                     icon="clear"
                     @click="clearValue" />
          </transition>
          <span class="md-append-icon" v-if="appendIcon">
            <slot name="appendSlot">
              <font-awesome-icon :icon="appendIcon" />
            </slot>
          </span>
        </div>
      </div>
      <div v-if="helpText || showErrorValidation || floatingLabel" class="md-help-text">
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
import Input from "../../mixins/Input";
import TextField from "./mixins/TextField";
import FieldValidation from "./mixins/FieldValidation";
import Util from "../../utils/Helper";

export default {
    name: "BsTextArea",
    components: {FontAwesomeIcon, BsIcon},
    mixins: [Input, TextField, FieldValidation],
    props: {
        autoGrow: Boolean,
        noResize: Boolean,
        outlined: Boolean,
        rowHeight: {
            type: [String, Number],
            default: undefined
        },
        rows: {
            type: [String, Number],
            default: 4,
            validator: v => !isNaN(parseInt(v, 10))
        },
    },
    computed: {
        /**
         * Get computed component's class names.
         *
         * @return {Object} Collection of css classes
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
         * @return {Object} Attributes to bind
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
         * @return {boolean} TRUE if textarea field can grow
         */
        canGrow() {
            return this.autoGrow && !this.noResize;
        },
        /**
         * Calculate textarea field's height.
         *
         * @return {string|null} The textarea field's height
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
        });
    },
    methods: {
        /**
         * Update textarea height on input events.
         *
         * @param {Event} e The input event
         * @return {void}
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

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-field-textarea {
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
        margin: 4px 15px 8px 15px;

        > * {
            font-size: 83% !important;
        }
    }

    .#{$prefix}-field-inner {
        @include transition(background 0s ease-out);
        @include display-flex();
        @include flex(1 1 auto);
        outline: 0 none;
        min-height: 2rem;
        border-bottom: 1px solid $gray-500;
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
        .#{$prefix}-append-icon {
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
            margin-top: $padding-sm - .1;
        }

        > .#{$prefix}-action-icon {
            margin-left: .4rem;
            margin-right: .3rem;
        }

        > .#{$prefix}-action-icon {
            background-color: $white;
            position: absolute;
            right: 6px;
            top: 6px;

            > .icon-clear {
                cursor: pointer;
                color: $gray-500;

                &:focus, &:active, &:hover, &:active:focus {
                    color: $red-base;
                }
            }

            > .#{$prefix}-append-icon {
                padding-left: .3rem;
            }
        }

        > textarea {
            @include flex(1 1 auto);
            border-width: 0;
            outline: 0 none;
            margin-top: 8px;
            overflow-x: hidden;
            overflow-y: auto;

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
                position: absolute;
                pointer-events: none;
                text-overflow: ellipsis;
                white-space: nowrap;
                z-index: 2;

                &:not(.#{$prefix}-active) {
                    margin-top: $padding-sm;
                }

                &.#{$prefix}-active {
                    @include transform(translateY(-12px) scale(.9));
                    color: $gray-600;
                    margin-left: 0;
                }

                &.#{$prefix}-after-icon:not(.#{$prefix}-active) {
                    margin-left: $padding-base + .5;
                }
            }
        }
    }

    &.#{$prefix}-focused {
        .#{$prefix}-field-inner {
            > .#{$prefix}-prepend-icon,
            .#{$prefix}-append-icon,
            .#{$prefix}-toggle-icon {
                color: $primary-color;
            }
        }

        &:not(.#{$prefix}-field-outlined) {
            .#{$prefix}-field-inner {
                &:after {
                    left: 0;
                    width: 100%;
                }
            }
        }
    }

    &.#{$prefix}-field-noresize {
        .#{$prefix}-field-inner {
            > textarea {
                resize: none;
            }
        }
    }

    &.has-error {
        .col-form-label,
        .#{$prefix}-floating-label {
            color: $danger-color-dark;
        }

        &:not(.#{$prefix}-field-outlined) {
            .#{$prefix}-field-inner {
                > .#{$prefix}-prepend-icon,
                .#{$prefix}-append-icon,
                .#{$prefix}-toggle-icon {
                    color: $danger-color-dark;
                }

                &:after {
                    background-color: $danger-color;
                }
            }
        }
    }

    &.has-success {
        .col-form-label,
        .#{$prefix}-floating-label {
            color: $success-color-dark;
        }

        &:not(.#{$prefix}-field-outlined) {
            .#{$prefix}-field-inner {
                border-bottom-color: $success-color-dark !important;

                > .#{$prefix}-prepend-icon,
                .#{$prefix}-append-icon,
                .#{$prefix}-toggle-icon {
                    color: $success-color-dark;
                }
            }
        }
    }

    &.#{$prefix}-field-outlined {
        .#{$prefix}-field-inner {
            border-bottom-width: 0;

            > .#{$prefix}-prepend-icon {
                margin-left: $padding-sm;
                margin-right: 0;
            }

            > textarea {
                @include border-radius(.25rem);
                padding: 2px 16px 4px 10px;
            }

            &:before {
                @include border-radius(.25rem);
                @include transition(border .4s);
                border: 1px solid $gray-500;
                content: "";
                height: auto;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                pointer-events: none;
                position: absolute;
            }
        }

        &.#{$prefix}-focused {
            .#{$prefix}-field-inner {
                &:before {
                    border: 2px solid $primary-color;
                }
            }
        }

        &.#{$prefix}-floating-active {
            margin-top: 0;

            .#{$prefix}-field-inner {
                padding-top: 1.7rem;

                > .#{$prefix}-floating-label {
                    left: .6rem;
                    margin-left: 0;
                    padding-top: 0;

                    &.#{$prefix}-active {
                        @include transform(translateY(-18px) scale(.9));
                    }
                }

                > textarea {
                    padding-top: 0;
                }
            }
        }

        &.has-error {
            .#{$prefix}-field-inner {
                &:before {
                    border-color: $danger-color-dark !important;
                }
            }
        }

        &.has-success {
            .#{$prefix}-field-inner {
                &:before {
                    border-color: $success-color-dark !important;
                }
            }
        }
    }

    &.#{$prefix}-disabled {
        .#{$prefix}-field-inner {
            > textarea {
                color: rgba($black, .4);
            }
        }
    }
}
</style>
