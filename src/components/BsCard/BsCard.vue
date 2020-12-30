<template>
  <div
    :is="tag"
    v-on="$listeners"
    :class="_classNames">
    <img
      v-if="imgTopSrc"
      :alt="imgTopAlt"
      :src="imgTopSrc"
      class="card-img-top" />
    <slot></slot>
    <img
      v-if="imgBottomSrc"
      :alt="imgBottomAlt"
      :src="imgBottomSrc"
      class="card-img-bottom" />
  </div>
</template>

<script>
export default {
    name: "BsCard",
    props: {
        /**
         * Create rectangle card and removes rounded border on its corner.
         * @type {boolean|*}
         */
        flat: {
            type: Boolean,
            default: false
        },
        /**
         * Create card with shadow on its sides.
         * @type {boolean|*}
         */
        shadow: {
            type: Boolean,
            default: false
        },
        /**
         * The image URL for image placed at the top of the card.
         * @type {boolean|*}
         */
        imgTopSrc: {
            type: String,
            default: undefined
        },
        /**
         * Value for the image `alt` attribute.
         * @type {boolean|*}
         */
        imgTopAlt: {
            type: String,
            default: undefined
        },
        /**
         * The image URL for image placed at the bottom of the card.
         * @type {boolean|*}
         */
        imgBottomSrc: {
            type: String,
            default: undefined
        },
        /**
         * Value for the image `alt` attribute.
         * @type {boolean|*}
         */
        imgBottomAlt: {
            type: String,
            default: undefined
        },
        /**
         * Html tag used to render the card.
         * @type {string|*}
         */
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
    .card-header {
        font-weight: $font-weight-bold;
    }

    .card-subtitle {
        color: $gray-700;
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
