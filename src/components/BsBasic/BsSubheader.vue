<template>
  <div :class="_classNames" class="md-subheader">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsSubheader",
    props: {
        /**
         * Define explicitly when placed inside element that has dark background color.
         * @type {boolean|*}
         */
        dark: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                this.dark ? 'subheader--dark' : 'subheader--light'
            ]
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-subheader {
    @include flexbox((display: flex, align-items: center));
    font-size: 1rem;
    font-weight: normal;
    height: 48px;
    padding: 0 16px;

    &.subheader--dark {
        color: rgba($white, .8);
    }

    &.subheader--light {
        color: $gray-600;
    }
}
</style>
