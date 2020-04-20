<template>
  <div class="md-switch" :class="['md-switch-' + color, checkClassname]">
    <label v-if="$slots.default && labelPosition === 'left'"
           class="md-switch-label md-label-left"
           :class="labelClass"
           :for="id"
           @click.prevent="toggleCheck">
      <slot />
    </label>
    <div class="md-switch-content">
      <div class="md-switch-inner" @click.stop="toggleCheck">
        <div class="md-switch-thumb">
          <bs-ripple :active.sync="rippleActive" :disabled="disabled" centered>
            <input :id="id" type="checkbox" v-bind="{ id, name, disabled, required, value }" />
          </bs-ripple>
        </div>
      </div>
    </div>
    <label v-if="$slots.default && labelPosition === 'right'"
           class="md-switch-label md-label-right"
           :class="labelClass"
           :for="id"
           @click.prevent="toggleCheck">
      <slot />
    </label>
  </div>
</template>

<script>
import BsRipple from '../BsAnimation/BsRipple';
import Checkbox from './mixins/Checkbox';
import Helper from "../../utils/Helper";

export default {
    name: "BsSwitch",
    components: {BsRipple},
    mixins: [Checkbox],
    props: {
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        labelPosition: {
            type: String,
            default: 'right',
            validator(value) {
                return ['left', 'right'].indexOf(value) !== -1;
            }
        },
        labelClass: {
            type: [String, Array],
            default: undefined
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/controls";

.#{$prefix}-switch {
    @include display-flex();
    position: relative;

    &:not(.#{$prefix}-disabled) {
        > .#{$prefix}-switch-content {
            cursor: pointer;
        }
    }

    > .#{$prefix}-switch-content {
        display: inline-flex;
        padding-left: 6px;
        margin: $md-switch-margin;

        > .#{$prefix}-switch-inner {
            background-color: $grey-lighten-1;
            height: $md-switch-height;
            min-width: $md-switch-width;
            width: $md-switch-width;
            margin: 3px 0;
            align-items: center;
            position: relative;
            @include display-flex();
            @include border-radius($md-switch-height);
            @include transition($md-transition-stand);

            > .#{$prefix}-switch-thumb {
                background-color: $grey-lighten-5;
                height: $md-switch-size;
                width: $md-switch-size;
                position: relative;
                @include border-radius($border-radius-circle);
                @include transition($md-transition-stand);
                @include box-shadow($md-switch-shadows);

                &:before {
                    content: " ";
                    height: $md-switch-touch-size;
                    width: $md-switch-touch-size;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    z-index: 11;
                    @include transform(translate(-50%, -50%));
                }

                .#{$prefix}-ripple {
                    height: $md-switch-touch-size !important;
                    width: $md-switch-touch-size !important;
                    left: 50% !important;
                    top: 50% !important;
                    position: absolute;
                    @include border-radius($border-radius-circle);
                    @include transform(translate(-50%, -50%));

                }

                input {
                    left: -999em;
                    position: absolute;
                }
            }
        }
    }

    .#{$prefix}-switch-label {
        @include user-select(none);
        // line-height: $md-switch-size;
        // height: $md-switch-size;
        margin-bottom: 0;
        position: relative;
        padding-left: 0;
        padding-top: 1rem;

        &.#{$prefix}-label-left {
            padding-right: 15px;
        }

        &.#{$prefix}-label-right {
            padding-right: 1rem;
        }
    }

    &.#{$prefix}-checked {
        .#{$prefix}-switch-thumb {
            @include transform(translate3d(15px, 0, 0));
        }
    }

    &.#{$prefix}-required {
        label:after {
            @include transform(translateX(calc(100% + 2px)));
            content: "*";
            line-height: 1em;
            position: absolute;
            right: 0;
            top: 2px;
            vertical-align: top;
        }
    }

    &.#{$prefix}-disabled {
        > .#{$prefix}-switch-inner {
            background-color: $grey-lighten-2;

            > .#{$prefix}-switch-thumb {
                @include box-shadow(0 2px 1px -1px rgba(#000, .2), 0 1px 1px 0 rgba(#000, .14), 0 1px 3px 0 rgba(#000, .12));
                background-color: $grey-lighten-1;
            }
        }
    }
}

@each $name, $color in $theme-colors {
    @include make-switch($name, $color);
}
</style>
