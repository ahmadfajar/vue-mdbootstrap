<template>
  <transition :name="transition">
    <div
      v-if="show"
      :class="_classNames"
      role="alert">
      <div v-if="iconName" class="alert-icon">
        <slot name="alertIcon">
          <bs-icon v-if="iconType || isInternal" v-bind="_bsIconAttributes" />
          <font-awesome-icon v-else v-bind="_faIconAttributes" />
        </slot>
      </div>
      <div :class="{'ml-3' : icon || iconType}" class="flex-fill">
        <slot></slot>
      </div>
      <bs-button
        v-if="dismissible"
        class="close ml-auto"
        color="gray"
        flat
        mode="icon"
        size="sm"
        @click="_hide">
        <bs-icon icon="close" />
      </bs-button>
    </div>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import IconMixin from "./mixins/IconMixin";
import Helper from "../../utils/Helper";
import "../../../scss/_transitions.scss";

export default {
    name: "BsAlert",
    components: {BsButton, BsIcon, FontAwesomeIcon},
    mixins: [IconMixin],
    props: {
        /**
         * Alert color
         * @type {string|*}
         */
        color: {
            type: String,
            default: undefined
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
         * Use predefined icon to create contextual alert.
         * @type {string|*}
         */
        iconType: {
            type: String,
            default: undefined,
            validator: v => ['success', 'info', 'warning', 'danger', 'help'].includes(v)
        },
        /**
         * Use predefined outline icon to create contextual alert.
         * @type {string|*}
         */
        iconOutlined: {
            type: Boolean,
            default: true
        },
        /**
         * Create outlined alert style.
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Create alert with solid fill style.
         * @type {boolean|*}
         */
        solidFill: {
            type: Boolean,
            default: false
        },
        /**
         * The component animation transition to display/hide.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: 'fade'
        },
        /**
         * The value monitored by `v-model` to display or hide the alert component.
         * @type {boolean|*}
         */
        value: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        dismiss: false
    }),
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {Object} Component css classes
         * @private
         */
        _classNames() {
            return {
                'alert d-flex': true,
                'align-items-center': true,
                'alert-dismissible': this.dismissible,
                ['md-alert-outline-' + this._colorName]: this.outlined,
                ['alert-' + this._colorName]: this._colorName && !this.outlined && !this.solidFill,
                ['md-alert-solid-' + this._colorName]: this._colorName && this.solidFill && !this.outlined,
            }
        },
        _colorName() {
            if (this.iconType) {
                if (this.iconType === 'help') {
                    return Helper.isEmpty(this.color) ? 'mdb-color' : this.color;
                } else {
                    return Helper.isEmpty(this.color) ? this.iconType : this.color;
                }
            }

            return Helper.isEmpty(this.color) ? 'primary' : this.color;
        },
        /**
         * Get BsIcon binding attributes.
         *
         * @returns {Object} The icon attributes
         * @private
         */
        _bsIconAttributes() {
            return {
                ...this.iconAttributes,
                size: 32
            }
        },
        /**
         * Get FontAwesomeIcon binding attributes.
         *
         * @returns {Object} The icon attributes
         * @private
         */
        _faIconAttributes() {
            return {
                ...this.iconAttributes,
                fixedWidth: true
            }
        },
        /**
         * Get computed icon name (real icon name).
         *
         * @returns {string} The icon name
         */
        iconName() {
            if (this.iconType) {
                switch (this.iconType) {
                    case 'help':
                        return this.iconOutlined ? 'HelpOutline' : 'Help';
                    case 'danger':
                        return this.iconOutlined ? 'ReportOutline' : 'Report';
                    case 'warning':
                        return this.iconOutlined ? 'WarningOutline' : 'Warning';
                    case 'info':
                        return this.iconOutlined ? 'InfoOutline' : 'Info';
                    default :
                        return this.iconOutlined ? 'CheckCircleOutline' : 'CheckCircle';
                }
            } else if (this.isInternal) {
                return this.icon.substr(3);
            } else {
                return this.icon;
            }
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
            this.$emit('input', false);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "~bootstrap/scss/mixins/alert";
@import "~bootstrap/scss/mixins/gradients";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/functions";
@import "../../../scss/mixins";

.alert {
    &.alert-dismissible {
        padding-right: 3.3rem;

        > .close {
            padding: .5rem;
        }
    }

    > .alert-icon {
        font-size: 1.6rem;
    }
}

@each $color, $value in $theme-colors {
    .alert-#{$color} {
        @include alert-variant(
            theme-color-level($theme-colors, $color, $alert-bg-level),
            theme-color-level($theme-colors, $color, $alert-border-level),
            theme-color-level($theme-colors, $color, $alert-color-level)
        );
    }
}

@each $color_name, $color_value in $theme-colors {
    @include make-outline-alert($color_name, theme-color-level($theme-colors, $color_name, $alert-color-level));
}

@each $color_name, $color_value in $theme-colors {
    @include make-solid-alert($color_name, $color_value);
}
</style>
