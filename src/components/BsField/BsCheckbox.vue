<template>
  <div :class="['md-checkbox-' + color, checkClassname]" class="md-checkbox">
    <div class="md-checkbox-inner" @click.stop="toggleCheck">
      <bs-ripple
        :active.sync="rippleActive"
        :disabled="disabled"
        centered>
        <input
          v-bind="attrs"
          :indeterminate.prop="indeterminate"
          type="checkbox" />
      </bs-ripple>
    </div>
    <label
      v-if="$slots.default"
      :for="id"
      class="md-checkbox-label"
      @click.prevent="toggleCheck">
      <slot></slot>
    </label>
  </div>
</template>

<script>
import BsRipple from '../BsAnimation/BsRipple';
import Checkbox from './mixins/Checkbox';
import Helper from "../../utils/Helper";

export default {
    name: "BsCheckbox",
    components: {BsRipple},
    mixins: [Checkbox],
    props: {
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/mixins";

.#{$prefix}-checkbox {
    display: inline-flex;
    margin: $md-checkbox-margin;
    position: relative;
    width: auto;

    &:not(.#{$prefix}-disabled):not(.#{$prefix}-readonly) {
        cursor: pointer;

        .#{$prefix}-checkbox-label {
            cursor: pointer;
        }
    }

    > .#{$prefix}-checkbox-inner {
        @include border-radius(2px);
        @include transition($md-transition-stand);
        border: 2px solid rgba(#000, .54);
        height: $md-checkbox-size;
        min-width: $md-checkbox-size;
        width: $md-checkbox-size;
        position: relative;

        &:focus {
            outline: none;
        }

        &:before,
        &:after {
            @include transition($md-transition-drop);
            content: " ";
            position: absolute;
        }

        &:before {
            @include border-radius($border-radius-circle);
            @include transform(translate(-50%, -50%));
            height: $md-checkbox-touch-size;
            width: $md-checkbox-touch-size;
            left: 50%;
            top: 50%;
            z-index: 11;
        }

        &:after {
            @include transform(rotate(45deg) scale3D(.15, .15, 1));
            border: 2px solid transparent;
            border-top: 0;
            border-left: 0;
            height: 13px;
            width: 6px;
            left: 5px;
            top: 0;
            opacity: 0;
            z-index: 12;
        }

        .#{$prefix}-ripple {
            @include border-radius($border-radius-circle);
            @include transform(translate(-50%, -50%));
            height: $md-checkbox-touch-size !important;
            width: $md-checkbox-touch-size !important;
            left: 50% !important;
            top: 50% !important;
            border-radius: 50%;
        }

        input {
            left: -999em;
            position: absolute;
        }
    }

    > .#{$prefix}-checkbox-label {
        @include user-select(none);
        line-height: $md-checkbox-size;
        height: $md-checkbox-size;
        margin-bottom: 0;
        padding-left: $padding-base;
        position: relative;
    }

    &.#{$prefix}-indeterminate {
        > .#{$prefix}-checkbox-inner {
            &:after {
                @include transform(translate(-50%, -50%) !important);
                border-style: solid;
                border-width: 0 0 2px;
                width: 12px;
                height: 2px;
                left: 50%;
                top: 50%;
                opacity: 0;
                z-index: 7;
            }
        }
    }

    &.#{$prefix}-checked {
        > .#{$prefix}-checkbox-inner {
            &:after {
                @include transform(rotate(45deg) scale3D(1, 1, 1));
                @include transition($md-transition-stand);
                opacity: 1;
            }
        }
    }

    &.#{$prefix}-disabled {
        &.#{$prefix}-checked {
            > .#{$prefix}-checkbox-inner {
                border-color: transparent !important;
            }
        }

        > .#{$prefix}-checkbox-inner {
            background-color: rgba(#000, .26);
            border-color: rgba(#000, .26);

            &:after {
                border-color: $white;
            }
        }
    }

    &.#{$prefix}-required {
        label:after {
            position: absolute;
            top: 2px;
            right: 0;
            transform: translateX(calc(100% + 2px));
            content: "*";
            line-height: 1em;
            vertical-align: top;
        }
    }
}

@each $name, $color in $theme-colors {
    @include make-checkbox($name, $color);
}
</style>
