<template>
  <div :class="_classNames" class="md-picker md-shadow">
    <div
      v-if="$slots.header !== undefined"
      :class="_headerClass"
      class="md-picker-header">
      <slot name="header"></slot>
    </div>
    <div :style="_styles" class="md-picker-body">
      <transition :name="transition">
        <slot></slot>
      </transition>
    </div>
    <div
      v-if="$slots.footer !== undefined"
      class="md-picker-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsPicker",
    props: {
        fullWidth: Boolean,
        landscape: Boolean,
        headerColor: {
            type: String,
            default: 'primary'
        },
        transition: {
            type: String,
            default: 'fade'
        },
        width: {
            type: [Number, String],
            default: 290,
            validator: value => parseInt(value, 10) > 0
        }
    },
    computed: {
        _classNames() {
            return {
                'md-picker-landscape': this.landscape,
                'md-picker-full': this.fullWidth
            }
        },
        _headerClass() {
            return {
                'md-picker-header-landscape': this.landscape,
                [`bg-${this.headerColor}`]: this.headerColor
            }
        },
        _styles() {
            return {
                width: this.fullWidth ? null : Helper.sizeUnit(this.width)
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/shared";

.#{$prefix}-picker {
    @include border-radius($border-radius-base);
    @include flexbox((display:inline-flex, flex-direction: column));
    background-color: $white;
    contain: layout style;
    position: relative;
    vertical-align: top;

    > .#{$prefix}-picker-header {
        color: $white;
        padding: $padding-base;
    }

    > .#{$prefix}-picker-body {
        @include flexbox((display: flex, flex: 1 0 auto, flex-direction: column, align-items: center));
        height: auto;
        overflow: hidden;
        position: relative;
        z-index: 0;

        > div {
            width: 100%;

            &.fade-transition-leave-active {
                position: absolute
            }
        }
    }

    > .#{$prefix}-picker-footer {
        @include flexbox((display: flex, align-items: center));
        padding: $padding-sm;
    }

    > * {
        &:first-child {
            @include border-top-radius($border-radius-base);
        }

        &:last-child {
            @include border-bottom-radius($border-radius-base);
        }
    }

    &.#{$prefix}-picker-full {
        @include display-flex();
    }

    &.#{$prefix}-picker-landscape {
        > .#{$prefix}-picker-header {
            @include border-right-radius(0);
            @extend %topleft-h100-absolute;
            width: 200px;
            z-index: 1;
        }

        > .#{$prefix}-picker-body,
        > .#{$prefix}-picker-footer {
            margin-left: 200px
        }
    }

}
</style>
