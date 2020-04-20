<template>
  <button :is="tagName"
          v-bind="attributes"
          v-on="$listeners"
          @touchstart="_touchStart"
          @touchmove="_touchMove"
          @mousedown="_mouseDown">
    <bs-button-content :ripple="ripple"
                       :disabled="disabled"
                       :ripple-active="rippleActive"
                       :dropdown-toggle="dropdownToggle"
                       :icon-mode="mode === 'icon'"
                       @update:rippleActive="_toggleRipple">
      <template v-if="(mode === 'icon' || mode === 'floating') && icon">
        <font-awesome-icon v-bind="iconAttributes" />
      </template>
      <template v-else>
        <font-awesome-icon v-if="iconLeft && icon" v-bind="iconAttributes" />
        <slot></slot>
        <font-awesome-icon v-if="iconRight && icon" v-bind="iconAttributes" />
      </template>
    </bs-button-content>
  </button>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsButtonContent from './BsButtonContent';
import Util from '../../utils/Helper';

export default {
    name: 'BsButton',
    components: {FontAwesomeIcon, BsButtonContent},
    props: {
        /**
         * @property String Any valid HTML button type
         */
        button: {
            type: String,
            default: 'button',
            validator: (value) => ['button', 'submit', 'reset'].indexOf(value) !== -1
        },
        /**
         * @property String The button color to apply
         */
        color: {
            type: String,
            default: 'default'
        },
        /**
         * @property String Button mode, valid values: `default, icon, floating`
         */
        mode: {
            type: String,
            default: 'default',
            validator: (value) => ['default', 'icon', 'floating'].indexOf(value) !== -1
        },
        /**
         * @property Boolean Button state, active or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.2/components/buttons/#active-state)} for details
         */
        active: {
            type: Boolean,
            default: false
        },
        /**
         * @property Boolean Act as block button or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.2/components/buttons/#sizes)} for details
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * @property Boolean Button state, enabled or disabled
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * @property Boolean Render as dropdowns button or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.2/components/dropdowns/)} for details
         */
        dropdownToggle: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        /**
         * @property Boolean Render button with outlined style or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.2/components/buttons/#outline-buttons)} for details
         */
        outlined: {
            type: Boolean,
            default: false
        },
        raised: {
            type: Boolean,
            default: false
        },
        ripple: {
            type: Boolean,
            default: true
        },
        transparent: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            default: undefined
        },
        /**
         * @property String The button size
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.2/components/buttons/#sizes)} for details
         */
        size: {
            type: String,
            default: undefined,
            validator: (value) => ['xs', 'sm', 'lg'].indexOf(value) !== -1
        },
        /**
         * @property String Any valid FontAwesome icon name,
         * see {@link [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free)} for details
         */
        icon: {
            type: [String, Array],
            default: undefined
        },
        iconFlip: {
            type: String,
            default: undefined,
            validator: (value) => ['horizontal', 'vertical', 'both'].indexOf(value) !== -1
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator: (value) => ['left', 'right'].indexOf(value) !== -1
        },
        iconRotation: {
            type: [Number, String],
            default: undefined
        },
        iconSize: {
            type: String,
            default: undefined
        },
        iconFixed: {
            type: Boolean,
            default: false
        },
        iconSpin: {
            type: Boolean,
            default: false
        },
        iconPulse: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        rippleActive: false
    }),
    computed: {
        /**
         * Get computed component's styles.
         *
         * @return {Object} The collection of css classes
         */
        _classNames() {
            return [
                this.mode === 'icon' ? 'btn-icon' : this.mode === 'floating' ? 'btn-floating' : 'btn',
                this.outlined ? 'btn-outline-' + this.color : this.flat ? 'btn-flat-' + this.color :
                    this.transparent ? 'btn-transparent' : 'btn-' + this.color,
                this.raised ? 'btn-raised' : '',
                this.size ? 'btn-' + this.size : '',
                this.block ? 'btn-block' : '',
                this.disabled ? 'disabled' : '',
                this.active ? 'active' : '',
                !this.ripple ? 'md-ripple-off' : ''
            ]
        },
        /**
         * Get computed binding's properties.
         *
         * @return {Object} The attributes to bind
         */
        attributes() {
            return {
                'role': 'button',
                'href': this.href,
                'class': this._classNames,
                'type': this.buttonType,
                'disabled': this.tagName !== 'a' && this.disabled,
                'aria-disabled': this.disabled
            };
        },
        /**
         * Get icon binding's properties.
         *
         * @return {Object} The attributes to bind
         */
        iconAttributes() {
            return {
                icon: this.icon,
                size: this.iconSize,
                fixedWidth: this.iconFixed,
                flip: this.iconFlip,
                rotation: this.iconRotation,
                spin: this.iconSpin,
                pulse: this.iconPulse
            }
        },
        /**
         * Check if icon position is in the left side of text or not.
         *
         * @return {boolean} TRUE if icon placement is on the left side otherwise FALSE
         */
        iconLeft() {
            return this.iconPosition === 'left';
        },
        /**
         * Check if icon position is in the right side of text or not.
         *
         * @return {boolean} TRUE if icon placement is on the right side otherwise FALSE
         */
        iconRight() {
            return this.iconPosition === 'right';
        },
        /**
         * Get html Button type.
         *
         * @return {string|null} The html button type
         */
        buttonType() {
            if (Util.isEmpty(this.href)) {
                return this.button;
            }

            return null;
        },
        /**
         * Get Button html tag name.
         *
         * @return {string} HTML tag
         */
        tagName() {
            if (!Util.isEmpty(this.href)) {
                return 'a';
            }

            return 'button';
        },
        /**
         * Check if ripple animation active or not.
         *
         * @return {boolean} TRUE if ripple animation is active otherwise FALSE
         */
        rippleWorks() {
            return this.ripple && !this.disabled
        }
    },
    methods: {
        /**
         * MouseEvent handler.
         *
         * @param {MouseEvent} event The received mouse event
         * @return {void}
         * @private
         */
        _mouseDown(event) {
            if (this.rippleWorks) {
                this.rippleActive = event;
            }

            this.$listeners.mousedown && this.$listeners.mousedown(event);
        },
        /**
         * Toggle Ripple animation state.
         *
         * @param {boolean} active Ripple state to apply
         * @return {void}
         * @private
         */
        _toggleRipple(active) {
            this.rippleActive = active;
        },
        /**
         * TouchEvent handler.
         *
         * @param {TouchEvent} event The received touch event
         * @return {void}
         * @private
         */
        _touchMove(event) {
            if (this.rippleWorks) {
                this.rippleActive = event;
            }

            this.$listeners.touchmove && this.$listeners.touchmove(event);
        },
        /**
         * TouchEvent handler.
         *
         * @param {TouchEvent} event The received touch event
         * @return {void}
         * @private
         */
        _touchStart(event) {
            if (this.rippleWorks) {
                this.rippleActive = event;
            }

            this.$listeners.touchstart && this.$listeners.touchstart(event);
        }
    }
};
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/shared";
@import "../../../scss/functions";
@import "../../../scss/buttons";

.btn {
    @include border-radius($btn-border-radius);
    @include transition($btn-transition);
    border: 1px solid;
    color: $btn-color-basic;
    cursor: pointer;
    padding: 0;
    position: relative;
    text-transform: uppercase;
    white-space: normal;
    word-wrap: break-word;

    &:hover,
    &:active,
    &:focus {
        @include box-shadow($z-depth-1);
        outline: 0;
    }

    &:disabled, &.disabled {
        @include box-shadow(none);
        background-color: lighten($gray-500, 8%) !important;
        border-color: lighten($gray-500, 8%) !important;
        color: $gray-700 !important;
        cursor: default;
    }

    &:not([disabled]):not(.disabled):active,
    &:not([disabled]):not(.disabled).active {
        @include box-shadow($z-depth-1-half);
    }

    &.btn-xs {
        font-size: .875rem;
        @include border-radius($btn-border-radius-sm);
    }

    &.btn-sm {
        @include border-radius($btn-border-radius-sm);
    }

    &.btn-lg {
        @include border-radius($btn-border-radius-lg);
    }

    &.btn-raised {
        @include box-shadow($z-depth-1);

        &:hover,
        &:active,
        &:focus {
            @include box-shadow($z-depth-1-half);
        }

        &.disabled,
        &:disabled {
            &:active,
            &:focus,
            &:hover {
                @include box-shadow($z-depth-1);
            }
        }
    }
}

.btn-floating, .btn-icon {
    @include border-radius($border-radius-circle);
    @include transition($btn-transition);
    @include flexbox((display: inline-flex, flex: 0 0 auto));
    border: 1px solid;
    cursor: pointer;
    position: relative;
    line-height: 36px;
    padding: 0;
    vertical-align: middle;

    &:active,
    &:focus {
        outline: 0;
    }

    &:disabled, &.disabled {
        @include box-shadow(none);
        background-color: transparent;
        border-color: transparent;
        color: $gray-400 !important;
        pointer-events: none;
    }

    .#{$prefix}-ripple {
        @include border-radius($border-radius-circle);
        width: 38px;
        height: 38px;
    }

    &.btn-sm {
        line-height: 32px;

        .#{$prefix}-ripple {
            width: 32px;
            height: 32px;
        }
    }

    &.btn-lg {
        line-height: 56px;

        .#{$prefix}-ripple {
            width: 56px;
            height: 56px;
        }
    }

    .#{$prefix}-ripple-enter-active {
        @include transition-duration(1.2s);
    }
}

@each $btn_name, $color_value in $mdb-colors {
    @include make-button($btn_name, $color_value);
    @include make-outline-button($btn_name, $color_value);
    @include make-flat-button($btn_name, $color_value);
}

.btn, .btn-floating, .btn-icon {
    .#{$prefix}-ripple {
        @include flexbox((display: flex, justify-content: center, align-items: center));
        padding: 0;
    }

    &:before {
        @include transition($md-transition-default);
        @extend %full-rect-absolute;
        @extend %opacity-0;
        content: " ";
        will-change: background-color, opacity;
    }

    &.btn-transparent {
        background-color: transparent;
        border-width: 0 !important;
        color: rgba(255, 255, 255, .5) !important;

        &:hover,
        &:active,
        &:focus {
            outline: 0;
            background-color: rgba(25, 25, 25, .15);
        }

        &:not([disabled]):not(.disabled):active,
        &:not([disabled]):not(.disabled):focus,
        &:not([disabled]):not(.disabled).active {
            color: rgba(255, 255, 255, .8) !important;
        }
    }
}

.btn-floating {
    position: absolute;

    &.btn-raised {
        @include box-shadow($z-depth-1);
    }
}

</style>

