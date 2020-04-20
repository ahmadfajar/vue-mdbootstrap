<template>
  <bs-container v-if="app" :tag="tag" :app="app">
    <div class="md-content-wrap">
      <slot></slot>
    </div>
  </bs-container>
  <div v-else :is="tag" class="md-content-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsContent",
    props: {
        app: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'div'
        },
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-content-wrap {
    @include flex(1 1 auto);
    max-width: 100%;
    position: relative;
}
</style>
