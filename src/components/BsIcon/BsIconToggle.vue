<template>
  <span class="md-toggle-icon" v-on="$listeners">
    <font-awesome-icon :icon="toggleEye" fixed-width />
  </span>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: "BsIconToggle",
    components: {FontAwesomeIcon},
    props: {
        /**
         * The default icon to display.
         * Use any valid [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        icon: {
            type: String,
            default: undefined,
            required: true
        },
        /**
         * Toggle icon state.
         * @type {boolean|*}
         */
        toggle: {
            type: Boolean,
            default: false
        },
        /**
         * The icon to display when `toggle` property is `true`.
         * Use any valid [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        toggleIcon: {
            type: String,
            default: undefined,
            required: true
        },
    },
    computed: {
        toggleEye() {
            if (this.toggle) {
                return this.toggleIcon; // 'eye-slash';
            }
            return this.icon; // 'eye';
        }
    }
}
</script>

<style lang="scss">
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .#{$prefix}-toggle-icon {
    cursor: pointer;
  }
</style>
