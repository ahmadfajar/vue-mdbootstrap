<template>
  <div class="md-application-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsAppContainer",
    mounted() {
        if (this.$el) {
            const rect = this.$el.getBoundingClientRect();

            this.$VueMdb.application.left = rect.left;
            this.$VueMdb.application.top = rect.top;
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

html, body {
    height: 100%;
    text-rendering: optimizeLegibility;
    // -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    min-height: 100%;
    margin: 0;
    padding: 0;
}

.#{$prefix}-application-wrap {
    @include backface-visibility();
    @include flexbox((display: flex, flex: 1 1 auto, flex-direction: column));
    max-width: 100%;
    min-height: 100vh;
    position: relative;
}
</style>
