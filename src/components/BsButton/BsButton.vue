<template>
  <button
    :is="_tag"
    v-bind="attributes"
    v-on="$listeners"
    @touchstart="_touchStart"
    @touchmove="_touchMove"
    @mousedown="_mouseDown">
    <bs-button-content
      :dropdown-toggle="dropdownToggle"
      :icon-mode="mode === 'icon'"
      :ripple-active="rippleActive"
      :ripple-off="rippleOff"
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
import Helper from '../../utils/Helper';
import ActiveMixin from "../BsBasic/mixins/ActiveMixin";
import DisabledMixin from "../BsBasic/mixins/DisabledMixin";

export default {
    name: 'BsButton',
    components: {FontAwesomeIcon, BsButtonContent},
    mixins: [ActiveMixin, DisabledMixin],
    model: {
        prop: 'active',
        event: 'input'
    },
    props: {
        /**
         * The value to set to the button’s type attribute. Valid values are: `button`, `submit`, `reset`.
         * @type {string|*}
         */
        type: {
            type: String,
            default: 'button',
            validator: (value) => ['button', 'submit', 'reset'].indexOf(value) !== -1
        },
        /**
         * The button color to apply.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'default'
        },
        /**
         * Button mode, valid values are: `default, icon, floating`.
         * @type {string|*}
         */
        mode: {
            type: String,
            default: 'default',
            validator: (value) => ['default', 'icon', 'floating'].indexOf(value) !== -1
        },
        /**
         * Act as block button or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.5/components/buttons/#sizes)} for details
         * @type {boolean|*}
         */
        block: {
            type: Boolean,
            default: false
        },
        /**
         * Render as dropdowns button or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.5/components/dropdowns/)} for details
         * @type {boolean|*}
         */
        dropdownToggle: {
            type: Boolean,
            default: false
        },
        /**
         * Render button with flat style or not.
         * @type {boolean|*}
         */
        flat: {
            type: Boolean,
            default: false
        },
        /**
         * Render button with outlined style or not,
         * see {@link [Bootstrap](https://getbootstrap.com/docs/4.5/components/buttons/#outline-buttons)} for details
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Render button with raised style or not.
         * @type {boolean|*}
         */
        raised: {
            type: Boolean,
            default: false
        },
        /**
         * Render button with rounded style or not.
         * @type {boolean|*}
         */
        rounded: {
            type: Boolean,
            default: false
        },
        /**
         * Render button with rounded-pill style or not.
         * @type {boolean|*}
         */
        pill: {
            type: Boolean,
            default: false
        },
        /**
         * Enabled or disabled ripple effect.
         * @type {boolean|*}
         */
        rippleOff: {
            type: Boolean,
            default: false
        },
        /**
         * Render button with transparent style or not.
         * @type {boolean|*}
         */
        transparent: {
            type: Boolean,
            default: false
        },
        /**
         * Render as `<a>` element and define its `href` property and apply button styles to the element.
         * @type {string|*}
         */
        href: {
            type: String,
            default: undefined
        },
        /**
         * The button size, see {@link [Bootstrap](https://getbootstrap.com/docs/4.5/components/buttons/#sizes)} for details
         * @type {string|*}
         */
        size: {
            type: String,
            default: undefined,
            validator: (value) => ['xs', 'sm', 'lg'].indexOf(value) !== -1
        },
        /**
         * Any valid FontAwesome icon name,
         * see {@link [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free)} for details
         * @type {string|Array|*}
         */
        icon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         * @type {string|*}
         */
        iconFlip: {
            type: String,
            default: undefined,
            validator: (value) => ['horizontal', 'vertical', 'both'].indexOf(value) !== -1
        },
        /**
         * Place icon at `left` (before text) or at `right` (after text).
         * @type {string|*}
         */
        iconPosition: {
            type: String,
            default: 'left',
            validator: (value) => ['left', 'right'].indexOf(value) !== -1
        },
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * @type {Number|string|*}
         */
        iconRotation: {
            type: [Number, String],
            default: undefined,
            validator: (value) => [90, 180, 270].indexOf(parseInt(value, 10)) > -1
        },
        /**
         * Render the icon with predefined size, valid values are: `xs`, `sm`, `lg`, `1x`, `2x`, `3x`, `4x`.
         * @type {string|*}
         */
        iconSize: {
            type: String,
            default: undefined,
            validator: (value) => ['lg', 'xs', 'sm', '1x', '2x', '3x', '4x'].indexOf(value) > -1
        },
        /**
         * Render Fontawesome Icon with fixed width.
         * @type {boolean|*}
         */
        iconFixed: {
            type: Boolean,
            default: false
        },
        /**
         * Apply spin animation to the icon.
         * @type {boolean|*}
         */
        iconSpin: {
            type: Boolean,
            default: false
        },
        /**
         * Apply pulse animation to the icon.
         * @type {boolean|*}
         */
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
         * Get html Button type.
         *
         * @returns {string|null} The html button type
         */
        _buttonType() {
            if (Helper.isEmpty(this.href)) {
                return this.type;
            }

            return null;
        },
        /**
         * Get computed component's styles.
         *
         * @returns {string[]} The collection of css classes
         */
        _classNames() {
            return [
                this.mode === 'icon' ? 'btn-icon' : (this.mode === 'floating' ? 'btn-floating' : 'btn'),
                this.outlined ? 'btn-outline-' + this.color : (this.flat ? 'btn-flat-' + this.color :
                    (this.transparent ? 'btn-transparent' : 'btn-' + this.color)),
                this.raised ? 'btn-raised' : '',
                this.pill ? 'rounded-pill' : (this.rounded ? 'rounded' : ''),
                this.size ? 'btn-' + this.size : '',
                this.block ? 'btn-block' : '',
                this.disabled ? 'disabled' : '',
                this.active ? 'active' : '',
                this.rippleOff ? 'md-ripple-off' : ''
            ]
        },
        /**
         * Check if ripple animation active or not.
         *
         * @returns {boolean} TRUE if ripple animation is active otherwise FALSE
         */
        _rippleWorks() {
            return !this.rippleOff && !this.disabled
        },
        /**
         * Get Button html tag name.
         *
         * @returns {string} HTML tag
         */
        _tag() {
            if (!Helper.isEmpty(this.href)) {
                return 'a';
            }

            return 'button';
        },
        /**
         * Get computed binding's properties.
         *
         * @returns {Object|*} The attributes to bind
         */
        attributes() {
            return {
                'role': 'button',
                'href': this.href,
                'class': this._classNames,
                'type': this._buttonType,
                'disabled': this._tag !== 'a' && this.disabled,
                'aria-disabled': this.disabled
            };
        },
        /**
         * Get icon binding's properties.
         *
         * @returns {Object|*} The attributes to bind
         */
        iconAttributes() {
            return {
                icon: this.icon,
                size: this.iconSize,
                fixedWidth: this.iconFixed,
                flip: this.iconFlip,
                rotation: this.iconRotation,
                spin: this.iconSpin,
                pulse: this.iconPulse,
                class: {
                    'md-icon-left': this.iconLeft && this.mode !== 'icon' && this.mode !== 'floating',
                    'md-icon-right': this.iconRight && this.mode !== 'icon' && this.mode !== 'floating',
                }
            }
        },
        /**
         * Check if icon position is in the left side of text or not.
         *
         * @returns {boolean} TRUE if icon placement is on the left side otherwise FALSE
         */
        iconLeft() {
            return this.iconPosition === 'left';
        },
        /**
         * Check if icon position is in the right side of text or not.
         *
         * @returns {boolean} TRUE if icon placement is on the right side otherwise FALSE
         */
        iconRight() {
            return this.iconPosition === 'right';
        },
    },
    methods: {
        /**
         * MouseEvent handler.
         *
         * @param {MouseEvent} event The received mouse event
         * @returns {void}
         * @private
         */
        _mouseDown(event) {
            if (this._rippleWorks) {
                this.rippleActive = event;
            }

            if (!this.disabled) {
                this.$emit('input', !this.active);
            }
            this.$listeners.mousedown && this.$listeners.mousedown(event);
        },
        /**
         * Toggle Ripple animation state.
         *
         * @param {boolean} active Ripple state to apply
         * @returns {void}
         * @private
         */
        _toggleRipple(active) {
            this.rippleActive = active;
        },
        /**
         * TouchEvent handler.
         *
         * @param {TouchEvent} event The received touch event
         * @returns {void}
         * @private
         */
        _touchMove(event) {
            if (this._rippleWorks) {
                this.rippleActive = event;
            }

            this.$listeners.touchmove && this.$listeners.touchmove(event);
        },
        /**
         * TouchEvent handler.
         *
         * @param {TouchEvent} event The received touch event
         * @returns {void}
         * @private
         */
        _touchStart(event) {
            if (this._rippleWorks) {
                this.rippleActive = event;
            }

            if (!this.disabled) {
                this.$emit('input', !this.active);
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
@import "../../../scss/functions";
@import "../../../scss/mixins";
@import "../../../scss/shared";

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
        background-color: lighten($gray-500, 20%) !important;
        border-color: lighten($gray-500, 8%) !important;
        color: $gray-700 !important;
        cursor: default;
    }

    &.btn-xs {
        font-size: .75rem;
        @include border-radius($btn-border-radius);
    }

    &.btn-sm {
        @include border-radius($btn-border-radius);
    }

    &.btn-lg {
        @include border-radius($btn-border-radius);

        &.rounded,
        &.rounded-lg {
            @include border-radius($btn-border-radius-lg !important);
        }
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

    + .btn {
        margin-left: $padding-sm;
    }
}

.btn-floating, .btn-icon {
    @include border-radius($border-radius-circle);
    @include transition($btn-transition);
    @include flexbox((display: inline-flex, flex: 0 0 auto));
    border: 1px solid;
    cursor: pointer;
    position: relative;
    line-height: 2.25rem; // 36px
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
        width: 2.375rem; // 38px;
        height: 2.375rem;
    }

    &.btn-xs {
        line-height: 1.5rem; // 24px;

        .#{$prefix}-ripple {
            width: 100%;   // 1.5rem;
            height: 100%;  // 1.5rem;
        }
    }

    &.btn-sm {
        line-height: 2rem; // 32px;

        .#{$prefix}-ripple {
            width: 2rem;
            height: 2rem;
        }
    }

    &.btn-lg {
        line-height: 3.5rem; // 56px;

        .#{$prefix}-ripple {
            width: 3.5rem;
            height: 3.5rem;
        }
    }

    .#{$prefix}-ripple-enter-active {
        @include transition-duration(1.2s);
    }
}

@each $btn_name, $color_value in $merge-theme-colors {
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
        @extend %full-rect-absolute;
        @extend %opacity-0;
        @include transition($md-transition-default);
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
