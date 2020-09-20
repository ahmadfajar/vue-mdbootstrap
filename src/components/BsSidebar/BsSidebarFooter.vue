<template>
  <div :class="_classNames" class="md-sidebar-footer">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsSidebarFooter",
    props: {
        color: {
            type: String,
            default: 'white'
        }
    },
    computed: {
        _classNames() {
            return [
                'md-list-' + this.color
            ]
        }
    }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-sidebar,
.#{$prefix}-side-drawer {
    > .#{$prefix}-sidebar-inner,
    > .#{$prefix}-side-drawer-inner {
        > .#{$prefix}-sidebar-footer {
            @include box-shadow(0 1px 0 rgba(50, 50, 50, .1) inset);
            @include transform(translate(0, 0));
            padding: 0;

            > .#{$prefix}-list-tile {
                padding: $padding-sm ($padding-base - .2);
                position: relative;

                > .#{$prefix}-list-tile-content {
                    @include transition($transition-duration-base $md-transition-default-timing);
                }
            }

            .mini-toggle {
                @include media-breakpoint-down(md) {
                    display: none;
                }
            }
        }
    }

    &.#{$prefix}-mini {
        > .#{$prefix}-sidebar-inner,
        > .#{$prefix}-side-drawer-inner {
            > .#{$prefix}-sidebar-footer {
                .#{$prefix}-list-tile-content {
                    margin-left: -240px;
                }

                .mini-toggle {
                    @include transition(all 0.3s ease 0s);
                    @include transform(rotateZ(180deg));
                }
            }
        }
    }
}
</style>
