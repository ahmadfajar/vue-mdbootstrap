<template>
  <hr class="md-divider" :class="_classNames" />
</template>

<script>
export default {
    name: "BsDivider",
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
                this.dark ? 'md-divider--dark' : 'md-divider--light'
            ]
        }
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-divider {
  background-color: rgba($black, 0.12);
  border: none;
  display: block;
  height: 1px;
  min-height: 1px;
  margin-bottom: 0;
  margin-top: 0;
  width: 100%;
  flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;

  &.#{$prefix}-divider--dark {
    background-color: hsla(0, 0%, 100%, 0.12);
  }
}
</style>
