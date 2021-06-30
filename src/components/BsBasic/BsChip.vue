<template>
  <transition name="fade">
    <div
      v-if="show"
      v-on="$listeners"
      :is="_cmpTag"
      :class="_classNames"
      :href="href && !disabled ? href : null"
      class="md-chip"
      @mousedown="_mouseDown">
      <bs-ripple
        :disabled="_rippleDisabled"
        class="md-chip-content">
        <transition name="scale">
          <span
            v-if="imgSrc"
            :class="{'md-chip-avatar-bounded': imgPadding === false}"
            class="md-chip-avatar mr-2">
            <img
              :class="_imageClass"
              :src="imgSrc"
              :style="_imageStyles"
              alt="Chip Avatar" />
          </span>
        </transition>
        <span v-if="icon" class="md-chip-icon mr-2">
          <slot name="chipIcon">
            <bs-icon v-if="isInternal" v-bind="_bsIconAttrs" />
            <span v-else class="md-chip-icon-fa">
              <font-awesome-icon v-bind="_faIconAttrs" />
            </span>
          </slot>
        </span>        
        <span class="md-chip-text">
          <slot></slot>
        </span>
        <bs-button
          v-if="dismissible"
          v-bind="_btnCloseAttrs"
          @click="_hide">
          <bs-icon v-bind="_iconCloseAttrs" icon="close" />
        </bs-button>
      </bs-ripple>
    </div>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import BsRipple from "../BsAnimation/BsRipple";
import IconMixin from "./mixins/IconMixin";
import ActiveMixin from "./mixins/ActiveMixin";
import DisabledMixin from "./mixins/DisabledMixin";

export default {
    name: "BsChip",
    components: {BsButton, BsIcon, BsRipple, FontAwesomeIcon},
    mixins: [ActiveMixin, DisabledMixin, IconMixin],
    props: {
        /**
         * Custom CSS class to apply when the chip is in active state.
         * @type {string|*}
         */
        activeClass: {
            type: String,
            default: undefined
        },
        /**
         * Predefine color when Chip is in active state.
         * @type {string|*}
         */
        activeColor: {
            type: String,
            default: undefined
        },
        /**
         * The default chip color to apply.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'light-grey'
        },
        /**
         * Render as `<a>` element and define its `href` property and apply chip styles to the element.
         * @type {string|*}
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * Enable avatar and set the image location url.
         * @type {string|*}
         */
        imgSrc: {
            type: String,
            default: undefined
        },
        /**
         * Create avatar with circle shape.
         * @type {boolean|*}
         */
        imgCircle: {
            type: Boolean,
            default: true
        },
        /**
         * Adjust avatar size to match the Chip height by eliminating the margin around the avatar.
         * @type {boolean|*}
         */
        imgPadding: {
            type: Boolean,
            default: true
        },
        /**
         * When set, display the close button to dismiss/hide the component.
         * @type {boolean|*}
         */
        dismissible: {
            type: Boolean,
            default: false
        },
        /**
         * Remove circle edges.
         * @type {boolean|*}
         */
        label: {
            type: Boolean,
            default: false
        },
        /**
         * Render Chip with outlined style or not.
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Enabled or disabled ripple effect.
         * Ripple effect is automatically disabled when `click` event or `href` property is not defined.
         * @type {boolean|*}
         */
        rippleOff: {
            type: Boolean,
            default: false
        },
        /**
         * Adjust FontAwesome Icon size with css rules like `font-size` or `height` and `width`.
         * @type {Object}
         */
        faStyles: {
            type: Object,
            default: undefined
        },
        /**
         * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
         * @type {string|*}
         */
        size: {
            type: String,
            default: undefined,
            validator: (value) => ['sm', 'lg'].includes(value)
        },
        /**
         * The value monitored by `v-model` to show or hide the Chip component.
         * @type {boolean|*}
         */
        value: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        dismiss: false,
        notCtxColors: ['warning', 'light', 'light-grey'],
        lightColors: ['light', 'light-grey'],
    }),
    computed: {
        /**
         * Get Icon `Close` binding attributes.
         *
         * @returns {Object} The icon attributes
         * @private
         */
        _iconCloseAttrs() {
            return {
                'class': {
                    'text-white': this.lightColors.includes(this.color) || this.outlined,
                    ['text-' + this.color]: this.color && !this.lightColors.includes(this.color) && !this.outlined
                },
                'size': this.size === 'lg' ? 20 : (this.size === 'sm' ? 12 : 16)
            }
        },
        /**
         * Get Button `Close` binding attributes.
         *
         * @returns {Object} The button attributes
         * @private
         */
        _btnCloseAttrs() {
            return {
                'rippleOff': true,
                'class': this.size === 'sm' ? 'ml-2 mr-n2' : 'ml-2 mr-n1',
                'mode': 'icon',
                'size': 'xs',
                'disabled': this.disabled,
                'color': this.outlined && !this.lightColors.includes(this.color)
                    ? this.color : (this.lightColors.includes(this.color) ? 'grey' : 'light'),
            }
        },
        /**
         * Get BsIcon binding attributes.
         *
         * @returns {Object} The icon attributes
         * @private
         */
        _bsIconAttrs() {
            return {
                ...this.iconAttributes,
                size: this.size === 'sm' ? 18 : (this.size === 'lg' ? 40 : 24)
            }
        },
        /**
         * Get FontAwesomeIcon binding attributes.
         *
         * @returns {Object} The icon attributes
         * @private
         */
        _faIconAttrs() {
            let styles = {};

            if (this.size === 'sm') {
                styles = {
                    'font-size': '16px',
                    'max-height': '16px',
                    'max-width': '16px',
                };
            } else if (this.size === 'lg') {
                styles = {
                    'font-size': '36px',
                    'max-height': '36px',
                    'max-width': '36px',
                };
            } else {
                styles = {
                    'font-size': '22px',
                    'max-height': '22px',
                    'max-width': '22px',
                };
            }

            return {
                ...this.iconAttributes,
                style: {
                    ...styles,
                    ...this.faStyles
                }
            }
        },
        /**
         * Get component class names.
         *
         * @returns {Object|*} The collection of css classes
         * @private
         */
        _classNames() {
            return {
                ...this._activeClasses,
                ...this._disableClasses,
                'md-chip-sm': this.size === 'sm',
                'md-chip-lg': this.size === 'lg',
                'md-chip-label': this.label,
                'md-chip-outlined': this.outlined,
                'md-chip-clickable': (this.href || this.$listeners.click) && !this.disabled,
                ['md-chip-' + this.color]: this.color && !this.outlined && !this.disabled && (!this.activeColor || !this.active),
                ['md-chip-outline-' + this.color]: this.color && this.outlined && !this.disabled && (!this.activeColor || !this.active),
                ['md-chip-' + this.activeColor]: this.activeColor && this.active && !this.outlined && !this.disabled,
                ['md-chip-outline-' + this.activeColor]: this.activeColor && this.active && this.outlined && !this.disabled,
                [this.activeClass]: this.activeClass && this.active && !this.disabled,
            }
        },
        /**
         * Get avatar class names.
         *
         * @returns {Object|*} The collection of css classes
         * @private
         */
        _imageClass() {
            return {
                'rounded-circle': this.imgCircle,
                'rounded': !this.imgCircle,
            }
        },
        /**
         * Get avatar size.
         *
         * @returns {Object|*} The collection of css rules
         * @private
         */
        _imageStyles() {
            let imgSize = '1.5rem';

            if (this.size === 'sm') {
                imgSize = this.imgPadding ? '1.125rem' : '1.56rem';
            } else if (this.size === 'lg') {
                imgSize = this.imgPadding ? '2.375rem' : '3rem';
            } else {
                imgSize = this.imgPadding ? '1.5rem' : '2rem';
            }

            return {
                height: imgSize,
                width: imgSize
            }
        },
        /**
         * Check whether ripple animation effect enabled or disabled.
         *
         * @returns {boolean} Ripple state: enabled or disabled
         * @private
         */
        _rippleDisabled() {
            return this.rippleOff || this.disabled || (!this.$listeners.click && !this.href);
        },
        _cmpTag() {
            return this.href && !this.disabled ? 'a' : 'div';
        },
        /**
         * Check if this component is visible or not.
         *
         * @returns {boolean} True if component is visible otherwise False
         */
        show() {
            return !this.dismiss && this.value;
        }
    },
    watch: {
        value(newValue) {
            if (this.dismissible && newValue === true) {
                this.dismiss = false;
            }
        }
    },
    methods: {
        _hide() {
            this.dismiss = true;
            this.$emit('update:active', false);
            this.$emit('input', false);
            this.$nextTick(() => {
                this.$emit('close');
            });
        },
        _mouseDown(event) {
            if (!this.disabled) {
                this.$emit('update:active', !this.active);
            }

            this.$listeners.mousedown && this.$listeners.mousedown(event);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/functions";
@import "../../../scss/mixins";
@import "../../../scss/shared";

.#{$prefix}-chip {
    @include flexbox((display: inline-flex, align-items: center));
    @include border-radius($border-radius-pill);
    cursor: default;
    height: 2rem;
    max-width: 100%;
    line-height: 1;
    outline: none;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    text-decoration: none !important;
    transition-duration: .4s;
    transition-property: box-shadow, opacity, width;
    transition-timing-function: $md-transition-stand-timing;

    &:before {
        @extend %full-rect-absolute;
        @extend %opacity-0;
        background-color: currentColor;
        border-radius: inherit;
        content: " ";
        pointer-events: none;
    }

    &.#{$prefix}-disabled {
        background-color: lighten($gray-500, 25%);
        color: $gray-700;
    }

    &.#{$prefix}-chip-outlined {
        border: thin solid $gray-500;
        background-color: transparent;

        &.#{$prefix}-disabled {
            border-color: lighten($gray-500, 8%);
            color: lighten($gray-500, 8%) !important;
        }
    }

    &.#{$prefix}-chip-clickable:not(.#{$prefix}-disabled) {
        @include user-select(none);
        cursor: pointer;
    }

    > .#{$prefix}-chip-content {
        @include flexbox((display: inline-flex, align-items: center));
        @include border-radius($border-radius-pill);
        padding: 0 ($padding-base - .25);
        max-width: 100%;

        > .#{$prefix}-chip-avatar,
        > .#{$prefix}-chip-icon {
            @include flexbox((display: flex, align-self: center, align-items: center));
            @include transition(.3s $md-transition-stand-timing, visibility);
            margin-left: -.5rem; // -6px

            > .#{$prefix}-chip-icon-fa {
                @include flexbox((display: flex, justify-content: center, align-items: center));
                height: 22px;
                width: 22px;
            }
        }

        > .#{$prefix}-chip-avatar {
            &.#{$prefix}-chip-avatar-bounded {
                margin-left: -.75rem;
            }
        }
    }

    &.#{$prefix}-chip-label {
        @include border-radius($border-radius-sm);

        > .#{$prefix}-chip-content {
            @include border-radius($border-radius-sm);
        }
    }

    &.#{$prefix}-chip-sm {
        font-size: 80%;
        height: 1.56rem;

        > .#{$prefix}-chip-content {
            > .#{$prefix}-chip-avatar,
            > .#{$prefix}-chip-icon {
                margin-left: -.5rem; // -8px

                > .#{$prefix}-chip-icon-fa {
                    height: 18px;
                    width: 18px;
                }
            }

            > .#{$prefix}-chip-avatar {
                &.#{$prefix}-chip-avatar-bounded {
                    margin-left: -.75rem;
                }
            }
        }
    }

    &.#{$prefix}-chip-lg {
        font-size: 120%;
        height: 3rem;

        > .#{$prefix}-chip-content {
            padding: 0 $padding-base;

            > .#{$prefix}-chip-avatar,
            > .#{$prefix}-chip-icon {
                margin-left: -.625rem; // -10px

                > .#{$prefix}-chip-icon-fa {
                    height: 38px;
                    width: 38px;
                }
            }

            > .#{$prefix}-chip-avatar {
                &.#{$prefix}-chip-avatar-bounded {
                    margin-left: -$padding-base;
                }
            }
        }
    }

    + .#{$prefix}-chip {
        margin-left: $padding-sm;
    }
}

@each $color_name, $color in $merge-theme-colors {
    @include make-chip($color_name, $color);
    @include make-outline-chip($color_name, $color);
}
</style>
