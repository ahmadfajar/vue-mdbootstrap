<template>
  <div class="md-card-media">
    <slot></slot>
    <div class="md-card-media-overlay" :class="_classNames" :style="_styles">
      <div class="md-card-title">
        {{ title }}
      </div>
      <div v-if="subtitle" class="md-card-subtitle">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "BsCardMedia",
    props: {
        title: {
            type: String,
            default: undefined,
            required: true
        },
        subtitle: {
            type: String,
            default: undefined
        },
        overlayTop: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        _classNames() {
            return {
                'md-overlay-top': this.overlayTop,
                'md-overlay-bottom': this.overlayTop === false
            }
        },
        _styles() {
            return {
                top: this.overlayTop ? 0 : null,
                bottom: this.overlayTop === false ? 0 : null,
            };
        }
    },
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-card-media {
  position: relative;

  > img {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: block;
    vertical-align: top;
  }

  > .#{$prefix}-card-media-overlay {
    position: absolute;
    left: 0;
    right: 0;
    padding: $padding-base;
    background-color: rgba(0,0,0,.54);

    > .#{$prefix}-card-title,
    > .#{$prefix}-card-subtitle {
      color: rgba(255,255,255, .8);
      font-weight: $font-weight-bold;
    }

    > .#{$prefix}-card-title {
      font-size: 1.5rem;
    }

    > .#{$prefix}-card-subtitle {
      font-size: 1rem;
    }
  }
}

.card {
  > .#{$prefix}-card-media {
    &:first-child {
      > img {
        @include border-top-radius($card-border-radius);
      }

      > .#{$prefix}-card-media-overlay {
        &.#{$prefix}-overlay-top {
          @include border-top-radius($card-border-radius);
        }
      }
    }
    &:last-child {
      > img {
        @include border-bottom-radius($card-border-radius);
      }
      > .#{$prefix}-card-media-overlay {
        &.#{$prefix}-overlay-bottom {
          @include border-bottom-radius($card-border-radius);
        }
      }
    }
  }
}
</style>
