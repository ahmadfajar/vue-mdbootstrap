<template>
  <span :is="tag" :class="_classNames">
    <slot></slot>
  </span>
</template>

<script>
export default {
    name: 'BsBadge',
    props: {
        tag: {
            type: String,
            default: 'span'
        },
        color: {
            type: String,
            default: 'default-color'
        },
        type: {
            type: String,
            validator: value => ['label', 'pill'].indexOf(value) !== -1,
            default: undefined
        },
        variant: {
            type: String,
            validator: value => ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'].indexOf(value) !== -1,
            default: undefined
        }
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @return {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                'badge',
                this.type ? 'badge-' + this.type : '',
                this.variant ? 'badge-' + this.variant : 'bg-' + this.color
            ];
        }
    }
};
</script>

<style lang="scss">
  @import "~compass-sass-mixins/lib/compass/css3";
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .badge {
    @include box-shadow(none);
    color: $white !important;
    font-weight: $font-weight-bold;

    &.badge-label {
      font-size: 85%;
      font-weight: $font-weight-normal;
      padding: .25rem .6rem;
    }

    &.badge-pill {
      font-family: var(--font-family-sans-serif);
      padding: .2rem .6rem .3rem .6rem;
    }
  }
</style>
