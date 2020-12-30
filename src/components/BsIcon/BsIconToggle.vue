<template>
  <span
    v-on="$listeners"
    class="md-toggle-icon"
    @click="toggleClick">
    <font-awesome-icon :icon="toggleEye" fixed-width />
  </span>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: "BsIconToggle",
    components: {FontAwesomeIcon},
    model: {
        prop: 'value',
        event: 'toggle'
    },
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
         * Value monitored by `v-model` to maintain icon state.
         * @type {boolean|*}
         */
        value: {
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
            if (this.value) {
                return this.toggleIcon;
            }

            return this.icon;
        }
    },
    methods: {
        toggleClick() {
            this.$emit('toggle', !this.value);
        }
    },
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-toggle-icon {
    cursor: pointer;
}
</style>
