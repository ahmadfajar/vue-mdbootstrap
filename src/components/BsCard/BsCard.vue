<template>
  <div :is="tag" :class="_classNames">
    <img v-if="imgTopSrc"
         :src="imgTopSrc"
         :alt="imgTopAlt"
         class="card-img-top" />
    <slot></slot>
    <img v-if="imgBottomSrc"
         :src="imgBottomSrc"
         :alt="imgBottomAlt"
         class="card-img-bottom" />
  </div>
</template>

<script>
export default {
    name: "BsCard",
    props: {
        flat: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        imgTopSrc: {
            type: String,
            default: undefined
        },
        imgTopAlt: {
            type: String,
            default: undefined
        },
        imgBottomSrc: {
            type: String,
            default: undefined
        },
        imgBottomAlt: {
            type: String,
            default: undefined
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        _classNames() {
            return {
                'card': true,
                'rounded-0': this.flat,
                'md-shadow': this.shadow
            }
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

.card {
  font-size: .88rem;

  div.card-header {
    font-size: 1rem;
    font-weight: 500;

    &.h4 {
      font-size: 1.3rem;
    }
  }
}

.card-group {
  @include media-breakpoint-up(sm) {
    > .card {
      &.#{$prefix}-shadow {
        @include box-shadow(none !important);
        border-width: 1px !important;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &.#{$prefix}-shadow,
    &.#{$prefix}-shadow-1,
    &.#{$prefix}-shadow-2,
    &.#{$prefix}-shadow-3,
    &.#{$prefix}-shadow-4,
    &.#{$prefix}-shadow-5 {
      @include box-shadow(none !important);
    }
  }
}
</style>
