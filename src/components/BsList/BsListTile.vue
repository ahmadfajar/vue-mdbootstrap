<template>
  <router-link v-if="hasRouter"
               :to="path"
               :class="_classNames"
               :active-class="activeClass"
               :exact="exact"
               v-on="$listeners">
    <bs-ripple class="d-flex" :disabled="_disableRipple" :active.sync="rippleActive">
      <slot></slot>
    </bs-ripple>
  </router-link>
  <a :is="_tag"
     :class="_classNames"
     :href="url"
     v-on="$listeners"
     v-else>
    <bs-ripple class="d-flex" :disabled="_disableRipple" :active.sync="rippleActive">
      <slot></slot>
    </bs-ripple>
  </a>
</template>

<script>
import BsRipple from "../BsAnimation/BsRipple";
import RouteAble from '../../mixins/RouteAble';
import ToggleAble from './mixins/ToggleAble';

export default {
    name: "BsListTile",
    components: {BsRipple},
    mixins: [RouteAble, ToggleAble],
    props: {
        /**
         * Component state.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Render ListTile as menu item.
         * @type {boolean|*}
         */
        navigable: {
            type: Boolean,
            default: false
        },
        /**
         * Enabled or disabled ripple effect.
         * @type {boolean|*}
         */
        rippleOff: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        rippleActive: false
    }),
    computed: {
        _classNames() {
            return {
                'd-flex': true,
                'md-list-tile': true,
                'md-disabled': this.disabled,
                'md-link': this._tag === 'a' && !this.disabled,
                ['md-' + this.activeClass]: !this.hasRouter && this.isActive && !this.disabled
            }
        },
        _disableRipple() {
            return this.disabled || this.rippleOff || this._tag !== 'a';
        },
        _tag() {
            return this.hasRouter || this.hasLink || this.navigable ? 'a' : 'div';
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/functions";
@import "../../../scss/mixins";

.#{$prefix}-list-tile {
  @include transition($transition-hoverable);
  @include user-select(none);
  color: inherit;
  margin: 0;
  position: relative;
  text-decoration: none;

  .#{$prefix}-list-tile-action {
    @include flexbox((display: flex, flex-direction: column, justify-content: center));

    &.#{$prefix}-action-stack {
      @include justify-content(flex-end);
    }
  }

  .#{$prefix}-list-tile-leading {
    @include justify-content(flex-start);
  }

  .#{$prefix}-list-tile-title,
  .#{$prefix}-list-tile-subtitle {
    @include transition(.3s cubic-bezier(.25, .8, .5, 1));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .#{$prefix}-list-tile-content {
    @include flexbox((display: flex, flex: 1 1 auto, flex-direction: column, justify-content: center));
    overflow: hidden;

    > .#{$prefix}-list-tile-title {
      font-size: 1rem;
      font-weight: $font-weight-normal;
    }

    > .#{$prefix}-list-tile-subtitle {
      font-size: .88rem;
    }

    &.#{$prefix}-multiline {
      > .#{$prefix}-list-tile-subtitle {
        white-space: normal;
      }
    }
  }

  > .#{$prefix}-ripple {
    padding: $padding-sm $padding-base;
    position: relative;

    > div[class^="#{$prefix}-list-tile-"] {
      &:nth-child(2),
      &:last-child:not(:first-child) {
        margin-left: $padding-sm;
      }

      &:first-child:not(:last-child) {
        margin-right: $padding-sm;
      }
    }
  }
}

@include bslist-variant(white, #fff);

@each $name, $color in $material-colors {
  @include bslist-variant($name, $color);
}

@each $name, $color in $theme-colors {
  @include bslist-variant($name, $color);
}
</style>
