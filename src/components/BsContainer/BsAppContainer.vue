<template>
  <div class="md-application-wrap" :class="_classNames">
    <slot></slot>
  </div>
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsAppContainer",
    props: {
        viewportHeight: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        uid: '',
    }),
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {Object} Component css classes
         * @private
         */
      _classNames() {
          return {
              'md-viewport-height': this.viewportHeight,
          }
      }
    },
    mounted() {
        if (this.$el) {
            this.$VueMdb.validateApps();

            const rect = this.$el.getBoundingClientRect();
            this.uid = Helper.uuid(true);

            let obj = {};
            obj['left'] = rect.left;
            obj['right'] = rect.right;
            obj['top'] = rect.top;
            obj['bottom'] = rect.bottom;
            obj['height'] = rect.height;
            obj['appbarHeight'] = 0;
            obj['sideDrawerWidth'] = {
                'left': 0,  // left sideDrawer width
                'right': 0, // right sideDrawer width
            };

            this.$VueMdb.apps[this.uid] = obj;
        }
    },
    beforeDestroy() {
        if (Helper.isObject(this.$VueMdb.getApplication(this.uid))) {
            this.$VueMdb.apps[this.uid] = null;
            delete this.$VueMdb.apps[this.uid];
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
    position: relative;

    &.#{$prefix}-viewport-height {
        min-height: 100vh;
    }
}
</style>
