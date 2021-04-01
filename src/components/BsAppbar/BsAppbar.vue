<template>
  <nav
    :is="tag"
    v-resize="_resize"
    :class="_classNames"
    :style="_styles"
    class="md-appbar">
    <div class="md-appbar-content">
      <slot></slot>
    </div>
  </nav>
</template>

<script>
import ScreenSize from "../../mixins/ScreenSize";
import resize from "../../directives/WindowResize";

export default {
    name: "BsAppbar",
    directives: {resize},
    mixins: [ScreenSize],
    props: {
        /**
         * Clipped left side of the Appbar or not.
         * @type {boolean|*}
         */
        clippedLeft: {
            type: Boolean,
            default: false
        },
        /**
         * Always stick Appbar at top of the page even though user already scrolled down.
         * @type {boolean|*}
         */
        fixedTop: {
            type: Boolean,
            default: false
        },
        /**
         * Create shadow effect at the bottom of Appbar.
         * @type {boolean|*}
         */
        shadow: {
            type: Boolean,
            default: false
        },
        /**
         * Html tag used to create the Appbar.
         * @type {string|*}
         */
        tag: {
            type: String,
            default: 'nav'
        },
    },
    data: () => ({
        isMobile: false,
        smoothTransition: false
    }),
    computed: {
        _classNames() {
            return {
                'md-appbar-shadow': this.shadow,
                'md-appbar-transition': this.smoothTransition,
                'sticky-top': this.fixedTop
            };
        },
        _styles() {
            if (this.fixedTop) {
                return {
                    'margin-left': this.isMobile ? 0 : (this.clippedLeft ? this.$VueMdb.application.sideDrawerWidth + 'px' : 0)
                }
            } else {
                return {
                    'margin-left': this.clippedLeft ? this.$VueMdb.application.sideDrawerWidth + 'px' : false
                }
            }
        }
    },
    mounted() {
        if (this.$el) {
            this.$VueMdb.application.appbarHeight = this.$el.getBoundingClientRect().height;
            const me = this;

            setTimeout(function () {
                me.smoothTransition = true;
            }, 100);
        }
    },
    methods: {
        _resize() {
            if (this.screenMaxLg.matches) {
                this.$emit('toggle-drawer', 'close');
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        }
    },
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "~compass-sass-mixins/lib/compass/typography";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-appbar {
    @include justify-content(flex-start);
    background-color: $white;
    max-width: 100%;

    > .#{$prefix}-appbar-content {
        @include flexbox((display:flex, align-items: center, flex-direction: row));
        height: 64px;
        padding: 8px 12px 8px 8px;

        > .#{$prefix}-appbar-title {
            @include ellipsis();
            font-size: 1.5rem;
            font-weight: $font-weight-normal;
            line-height: normal;
            margin: 0 $padding-base;

            > a {
                color: inherit;
                text-decoration: none;
            }
        }

        > .#{$prefix}-appbar-items {
            @include display-flex();
            // font-size: .88rem;
            max-width: 100%;
            padding: 0;
        }
    }

    &.#{$prefix}-appbar-transition {
        @include transition($md-transition-default);
    }

    &.#{$prefix}-appbar-shadow {
        @include box-shadow($z-depth-1);
    }
}
</style>
