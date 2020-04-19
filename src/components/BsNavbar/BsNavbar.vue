<template>
  <nav :is="tag"
       :class="_classNames"
       :style="_styles"
       v-resize="_resize"
       class="md-navbar">
    <div class="md-navbar-content">
      <slot></slot>
    </div>
  </nav>
</template>

<script>
import ScreenSize from "../../mixins/ScreenSize";
import resize from "../../directives/WindowResize";

export default {
    name: "BsNavbar",
    directives: {resize},
    mixins: [ScreenSize],
    props: {
        clippedLeft: {
            type: Boolean,
            default: false
        },
        fixedTop: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'nav'
        },
    },
    data: () => ({
        isMobile: false
    }),
    computed: {
        _classNames() {
            return {
                'md-navbar-shadow': this.shadow,
                'sticky-top': this.fixedTop
            };
        },
        _styles() {
            if (this.fixedTop) {
                return {
                    'margin-left': this.isMobile ? 0 : (this.clippedLeft ? this.$VueBs.application.sidebarWidth + 'px' : 0)
                }
            } else {
                return {
                    'margin-left': this.clippedLeft ? this.$VueBs.application.sidebarWidth + 'px' : false
                }
            }
        }
    },
    mounted() {
        if (this.$el) {
            this.$VueBs.application.navbarHeight = this.$el.getBoundingClientRect().height;
        }
    },
    methods: {
        _resize() {
            if (this.screenMaxMd.matches) {
                this.$emit('toggle-sidebar', 'close');
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        }
    },
}
</script>

<style lang="scss">
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";
  @import "~compass-sass-mixins/lib/compass/css3";
  @import "~compass-sass-mixins/lib/compass/typography";
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .#{$prefix}-navbar {
    @include transition($transition-duration-base $md-transition-default-timing);
    @include justify-content(flex-start);
    background-color: $white;
    max-width: 100%;

    > .#{$prefix}-navbar-content {
      @include flexbox((display:flex, align-items: center, flex-direction: row));
      padding: 12px 12px 12px 8px;

      > .#{$prefix}-navbar-title {
        @include ellipsis();
        font-size: 1.7rem;
        font-weight: $font-weight-normal;
        line-height: $padding-base * 2;
        margin: 0 $padding-base;

        > a {
          color: inherit;
          text-decoration: none;
        }
      }

      > .#{$prefix}-navbar-items {
        @include display-flex();
        font-size: .88rem;
        max-width: 100%;
        padding: 0;
      }
    }

    &.#{$prefix}-navbar-shadow {
      @include box-shadow($z-depth-1);
    }
  }
</style>
