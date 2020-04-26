<template>
  <bs-ripple tag="span"
             :class="{'dropdown-toggle': dropdownToggle && !iconMode}"
             :disabled="!ripple || disabled"
             :event-trigger="false"
             :active="rippleActive"
             @update:active="active => $emit('update:rippleActive', active)">
    <span class="btn-inner">
      <slot />
    </span>
  </bs-ripple>
</template>

<script>
import BsRipple from '../BsAnimation/BsRipple';

export default {
    name: 'BsButtonContent',
    components: {BsRipple},
    props: {
        dropdownToggle: Boolean,
        disabled: Boolean,
        iconMode: Boolean,
        ripple: Boolean,
        rippleActive: {
            type: [Boolean, Event],
            default: false
        }
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.btn, .btn-floating, .btn-icon {
  .btn-inner {
    position: relative;
  }
}

.btn {
  .btn-inner {
    width: 100%;
    padding: $btn-margin-basic 1.5rem;

    > .svg-inline--fa {
      &.#{$prefix}-icon-left {
        margin-right: $btn-margin-basic;
      }

      &.#{$prefix}-icon-right {
        margin-left: $btn-margin-basic;
      }
    }
  }

  .#{$prefix}-ripple {
    &.dropdown-toggle {
      &::after {
        margin-right: $padding-base - .2;
      }

      > .btn-inner {
        padding: $btn-margin-basic ($padding-base - .2) $btn-margin-basic 1.5rem;
      }
    }
  }

  &.btn-xs {
    .btn-inner {
      line-height: 1;
      padding: .25rem $btn-margin-basic;
    }
  }

  &.btn-sm {
    .btn-inner {
      line-height: 1;
      padding: .4rem .5rem;
    }
  }

  &.btn-lg {
    .btn-inner {
      padding: $btn-margin-lg 1.5rem;
    }
  }
}
</style>
