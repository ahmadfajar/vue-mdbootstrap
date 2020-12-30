<template>
  <bs-container
    v-if="app"
    :app="app"
    :tag="tag">
    <div class="md-content-wrap">
      <slot></slot>
    </div>
  </bs-container>
  <div
    :is="tag"
    v-else
    class="md-content-wrap">
    <slot></slot>
  </div>
</template>

<script>
import BsContainer from "./BsContainer";

export default {
    name: "BsContent",
    components: {BsContainer},
    props: {
        /**
         * Mount this container as part of application content container or just ordinary container.
         * If mount as part of application content container, then it will adapt to SidebarDrawer and Appbar size.
         * @type {boolean|*}
         */
        app: {
            type: Boolean,
            default: false
        },
        /**
         * Html tag used to render the container.
         * @type {string|*}
         */
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
