<template>
  <div class="md-subheader" :class="_classNames">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsSubheader",
    props: {
        dark: Boolean
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @return {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                this.dark ? 'md-subheader--dark' : 'md-subheader--light'
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

  &.#{$prefix}-subheader--dark {
    color: rgba($white, .8);
  }

  &.#{$prefix}-subheader--light {
    color: $gray-600;
  }
}
</style>
