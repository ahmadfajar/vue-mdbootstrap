<template>
  <ul v-if="child" :class="_classNames">
    <slot></slot>
  </ul>
  <nav v-else :class="_classNames">
    <ul class="nav">
      <slot></slot>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'BsSidebarNav',
    props: {
        child: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _classNames() {
            return [
                this.child ? 'nav-child' : 'md-sidebar-nav'
            ]
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-sidebar,
.#{$prefix}-side-drawer {
  > .#{$prefix}-side-drawer-inner,
  > .#{$prefix}-sidebar-inner {
    > .#{$prefix}-sidebar-nav {
      @include flexbox((display: flex, flex: 1 1 auto, flex-direction: column));
      @include transform(translate3d(0, 0, 0));
      overflow-x: hidden;
      overflow-y: auto;

      .nav-child {
        @include transition(all 0.6s);
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
      }
    }
  }
}
</style>
