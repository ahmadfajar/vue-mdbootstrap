<template>
  <transition :name="transitionName">
    <div
      v-if="open"
      v-resize="setPosition"
      v-scroll="{target: trigger, callback: setPosition}"
      :class="_classNames"
      :style="_styles"
      role="tooltip">
      <div class="arrow"></div>
      <div class="md-tooltip-inner">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import resize from "../../directives/WindowResize";
import scroll from "../../directives/Scroll";
import Popup from "../../mixins/Popup";
import Helper from "../../utils/Helper";

const SPACE = 4;

export default {
    name: "BsTooltipContent",
    mixins: [Popup],
    directives: {
        resize,
        scroll
    },
    props: {
        overlay: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        maxWidth: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        placement: {
            type: String,
            default: 'bottom',
            validator: v => ['top', 'bottom', 'left', 'right'].indexOf(v) !== -1
        },
        trigger: {
            type: [Object, Element],
            default: undefined
        }
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                'md-tooltip',
                this.transitionName
            ]
        },
        /**
         * Get component's css styles.
         *
         * @returns {Object} Inline css styles
         * @private
         */
        _styles() {
            return {
                'max-width': this.maxWidth === 'auto' ? undefined : Helper.sizeUnit(this.maxWidth),
                'width': this.width === 'auto' ? undefined : Helper.sizeUnit(this.width),
                'z-index': this.zIndex
            }
        },
        transitionName() {
            return `md-tooltip-${this.placement}`;
        }
    },
    watch: {
        open(value) {
            if (value) {
                this.setPosition();
            }
        }
    },
    mounted() {
        this.setPosition();
    },
    methods: {
        /**
         * Calculate Tooltip left offset.
         *
         * @param {number} width    Element width
         * @param {DOMRect} rect Parent element size
         * @returns {number} Tooltip left offset
         */
        getLeftPosition(width, rect) {
            switch (this.placement) {
                case 'left':
                    return rect.left - width - SPACE;
                case 'right':
                    return rect.left + rect.width + SPACE;
                case 'top':
                case 'bottom':
                    return rect.left + rect.width / 2 - width / 2;
            }
        },
        /**
         * Calculate Tooltip top offset.
         *
         * @param {number} height   Element height
         * @param {DOMRect} rect Parent element size
         * @returns {number} Tooltip top offset
         */
        getTopPosition(height, rect) {
            switch (this.placement) {
                case 'top':
                    return rect.top - height - SPACE;
                case 'bottom':
                    return rect.top + rect.height + SPACE;
                case 'left':
                case 'right':
                    return rect.top + rect.height / 2 - height / 2;
            }
        },
        /**
         * Sets tooltip position.
         *
         * @returns {void}
         */
        setPosition() {
            if (!this.open || !this.$el || !this.trigger) {
                return;
            }

            const el = this.$el;
            const triggerEl = this.trigger;
            if (Helper.isFunction(el.getBoundingClientRect)) {
                const elRect = el.getBoundingClientRect();
                const rect = triggerEl.getBoundingClientRect();
                el.style.top = this.getTopPosition(elRect.height, rect) + 'px';
                el.style.left = this.getLeftPosition(elRect.width, rect) + 'px';
            }
        }
    }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-tooltip {
  @include flexbox((display: flex, align-items: center, justify-content: center));
  margin: 0;
  position: fixed;

  .arrow {
    position: absolute;
    display: block;
    width: $tooltip-arrow-width;
    height: $tooltip-arrow-height;

    &:before {
      border-color: transparent;
      border-style: solid;
      content: "";
      position: absolute;
    }
  }

  > .#{$prefix}-tooltip-inner {
    @include border-radius($tooltip-border-radius);
    @include opacity(.9);
    background-color: $tooltip-bg;
    color: $white;
    font-size: 12px;
    line-height: 22px;
    padding: 4px 10px;
    pointer-events: none;
  }
}

.#{$prefix}-tooltip-top {
  padding: $tooltip-arrow-height 0;

  .arrow {
    bottom: 0;

    &:before {
      top: 0;
      border-width: $tooltip-arrow-height ($tooltip-arrow-width / 2) 0;
      border-top-color: rgba($tooltip-arrow-color, .9);
    }
  }
}

.#{$prefix}-tooltip-right {
  padding: 0 $tooltip-arrow-height;

  .arrow {
    left: 0;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;

    &:before {
      right: 0;
      border-width: ($tooltip-arrow-width / 2) $tooltip-arrow-height ($tooltip-arrow-width / 2) 0;
      border-right-color: rgba($tooltip-arrow-color, .9);
    }
  }
}

.#{$prefix}-tooltip-bottom {
  padding: $tooltip-arrow-height 0;

  .arrow {
    top: 0;

    &::before {
      bottom: 0;
      border-width: 0 ($tooltip-arrow-width / 2) $tooltip-arrow-height;
      border-bottom-color: rgba($tooltip-arrow-color, .9);
    }
  }
}

.#{$prefix}-tooltip-left {
  padding: 0 $tooltip-arrow-height;

  .arrow {
    right: 0;
    width: $tooltip-arrow-height;
    height: $tooltip-arrow-width;

    &::before {
      left: 0;
      border-width: ($tooltip-arrow-width / 2) 0 ($tooltip-arrow-width / 2) $tooltip-arrow-height;
      border-left-color: rgba($tooltip-arrow-color, .9);
    }
  }
}

.#{$prefix}-tooltip-top-enter-active,
.#{$prefix}-tooltip-top-leave-active {
  transition: transform .3s $transition-easeOut, opacity .3s $transition-easeOut;
}

.#{$prefix}-tooltip-top-enter,
.#{$prefix}-tooltip-top-leave-active {
  @include opacity(0);
  transform: translate3d(0, 15px, 0);
}

.#{$prefix}-tooltip-bottom-enter-active,
.#{$prefix}-tooltip-bottom-leave-active {
  transition: transform .3s $transition-easeOut, opacity .3s $transition-easeOut;
}

.#{$prefix}-tooltip-bottom-enter,
.#{$prefix}-tooltip-bottom-leave-active {
  @include opacity(0);
  transform: translate3d(0, -15px, 0);
}

.#{$prefix}-tooltip-left-enter-active,
.#{$prefix}-tooltip-left-leave-active {
  transition: transform .3s $transition-easeOut, opacity .3s $transition-easeOut;
}

.#{$prefix}-tooltip-left-enter,
.#{$prefix}-tooltip-left-leave-active {
  @include opacity(0);
  transform: translate3d(24px, 0, 0);
}

.#{$prefix}-tooltip-right-enter-active,
.#{$prefix}-tooltip-right-leave-active {
  transition: transform .3s $transition-easeOut, opacity .3s $transition-easeOut;
}

.#{$prefix}-tooltip-right-enter,
.#{$prefix}-tooltip-right-leave-active {
  @include opacity(0);
  transform: translate3d(-24px, 0, 0);
}
</style>
