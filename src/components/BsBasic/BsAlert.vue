<template>
  <transition :name="transition">
    <div
      v-if="show"
      :class="_classNames"
      role="alert">
      <div v-if="icon" class="alert-icon">
        <font-awesome-icon :icon="icon" />
      </div>
      <div :class="{'ml-3' : icon}" class="flex-fill">
        <slot></slot>
      </div>
      <bs-button
        v-if="dismissible"
        class="close ml-auto"
        color="gray"
        flat
        mode="icon"
        size="sm"
        @click="hide">
        <bs-icon icon="close" />
      </bs-button>
    </div>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import "../../../scss/_transitions.scss";

export default {
    name: "BsAlert",
    components: {BsButton, BsIcon, FontAwesomeIcon},
    props: {
        /**
         * Alert color
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'primary'
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
         * The icon to display inside alert component.
         * See {@link [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free)} for valid icon name.
         * @type {string|*}
         */
        icon: {
            type: [String, Array],
            default: undefined
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
         * @returns {string[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                'alert',
                'd-flex',
                'align-items-center',
                this.dismissible ? 'alert-dismissible' : '',
                this.outlined ? 'alert-outline-' + this.color : '',
                this.color && !this.outlined ? 'alert-' + this.color : ''
            ]
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
        hide() {
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
        font-size: 1.5rem;
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
</style>
