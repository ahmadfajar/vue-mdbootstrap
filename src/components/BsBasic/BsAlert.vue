<template>
  <transition :name="transition">
    <div v-if="show" :class="_classNames" role="alert">
      <div class="alert-icon">
        <font-awesome-icon v-if="icon" :icon="icon" />
      </div>
      <div class="flex-fill" :class="{'ml-3' : icon}">
        <slot></slot>
      </div>
      <bs-button v-if="dismissable"
                 class="close ml-auto"
                 color="gray"
                 mode="icon"
                 size="sm"
                 flat
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
        dismissable: Boolean,
        outlined: Boolean,
        value: {
            type: Boolean,
            default: true
        },
        icon: {
            type: [String, Array],
            default: undefined
        },
        transition: {
            type: String,
            default: 'fade'
        },
        color: {
            type: String,
            default: 'primary'
        }
    },
    data: () => ({
        dismiss: false
    }),
    computed: {
        /**
         * Get component's class names.
         *
         * @return {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                'alert',
                'd-flex',
                'align-items-center',
                this.dismissable ? 'alert-dismissible' : '',
                this.outlined ? 'alert-outline-' + this.color : '',
                this.color && !this.outlined ? 'alert-' + this.color : ''
            ]
        },
        /**
         * Check if this component is visible or not.
         *
         * @return {boolean} True if component is visible otherwise False
         */
        show() {
            return !this.dismiss && this.value;
        }
    },
    watch: {
        value(newValue) {
            if (this.dismissable && newValue === true) {
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
