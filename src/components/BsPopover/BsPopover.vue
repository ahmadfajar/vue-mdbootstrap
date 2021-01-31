<template>
  <transition :name="transition">
    <div
      v-show="open"
      v-click-outside="clickOutSide"
      v-on="$listeners"
      v-resize="setPosition"
      v-scroll="{target: trigger, callback: setPosition}"
      :class="_classNames"
      :style="_styles"
      class="md-popover">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import clickOutside from "../../directives/ClickOutside";
import resize from "../../directives/WindowResize";
import scroll from "../../directives/Scroll";
import Popup from "../../mixins/Popup";
import "../../../scss/_transitions.scss";

const space = 8;

export default {
    name: "BsPopover",
    mixins: [Popup],
    directives: {clickOutside, resize, scroll},
    props: {
        /**
         * Display Popover at a position that covers the activator.
         * @type {boolean|*}
         */
        cover: {
            type: Boolean,
            default: false
        },
        /**
         * Show backdrop overlay or not.
         * @type {boolean|*}
         */
        overlay: {
            type: Boolean,
            default: false
        },
        /**
         * Popover display placement.
         * @type {string|*}
         */
        placement: {
            type: String,
            default: 'bottom-left',
            validator(value) {
                return [
                    'top', 'top-left', 'top-right',
                    'bottom', 'bottom-left', 'bottom-right',
                    'left', 'left-top', 'left-bottom',
                    'right', 'right-top', 'right-bottom'
                ].indexOf(value) !== -1;
            }
        },
        /**
         * Number of pixel to shift the Popover display position.
         * @type {number|*}
         */
        space: {
            type: Number,
            default: 0
        },
        /**
         * Transition animation when show the Popover. This animation is effected by placement prop.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: 'scale'
        },
        /**
         * HTML element to calculate the Popover display position.
         * @type {string|Object|HTMLElement|*}
         */
        trigger: {
            type: [String, Object, HTMLElement],
            default: undefined
        }
    },
    data: (vm) => ({
        actualPlacement: vm.placement,
    }),
    mounted() {
        this.setPosition();
    },
    watch: {
        open(value) {
            this.$nextTick(() => {
                if (value) {
                    this.setPosition();
                }
            });
        }
    },
    computed: {
        _classNames() {
            return [
                this.getTransitionName()
            ]
        },
        _styles() {
            return {
                'z-index': this.zIndex
            }
        }
    },
    methods: {
        clickOutSide(e) {
            if (this.trigger && this.trigger.contains(e.target)) {
                return;
            }
            this.close('clicked OutSide');
        },
        close(reason) {
            if (!this.open) {
                return;
            }

            this.$emit('update:open', false);
            this.$emit('close', reason);
        },
        getLeftPosition(width, rect) {
            let left = 0;
            const maxLeft = window.innerWidth - space - width;

            switch (this.placement) {
                case 'left':
                case 'left-top':
                case 'left-bottom':
                    left = rect.left - width - this.space;
                    if (this.cover) {
                        left += rect.width;
                    } else if (left < space) {
                        left = rect.left + rect.width + this.space;
                    }
                    break;
                case 'right':
                case 'right-top':
                case 'right-bottom':
                    left = this.cover
                        ? rect.left
                        : rect.left + rect.width > maxLeft
                            ? rect.left - width - this.space
                            : rect.left + rect.width + this.space;
                    break;
                case 'top':
                case 'bottom':
                    left = rect.left + rect.width / 2 - width / 2;
                    break;
                case 'bottom-left':
                case 'top-left':
                    left = rect.left;
                    break;
                case 'bottom-right':
                case 'top-right':
                    left = rect.left + rect.width - width;
                    break;
            }

            return left;
        },
        getTopPosition(height, rect) {
            let top = 0;
            const maxTop = window.innerHeight - space - height;
            const minTop = space;

            switch (this.placement) {
                case 'top':
                case 'top-left':
                case 'top-right':
                    top = rect.top - height - this.space;
                    if (!this.cover) {
                        if (top < minTop) {
                            top = rect.top + rect.height - this.space;
                        }
                    } else {
                        top += rect.height;
                    }
                    break;
                case 'bottom':
                case 'bottom-left':
                case 'bottom-right':
                    top = this.cover
                        ? rect.top
                        : rect.top + rect.height + this.space > maxTop
                            ? rect.top - height - this.space
                            : rect.top + rect.height + this.space;
                    break;
                case 'left':
                case 'right':
                    top = rect.top + rect.height / 2 - height / 2;
                    break;
                case 'left-top':
                case 'right-top':
                    top = rect.top;
                    break;
                case 'left-bottom':
                case 'right-bottom':
                    top = rect.top + rect.height - height;
                    break;
            }
            top = Math.min(maxTop, top);
            top = Math.max(minTop, top);

            return top;
        },
        getTransitionName() {
            if (this.actualPlacement === undefined || this.actualPlacement === '') {
                this.actualPlacement = this.placement;
            }
            return `transition-${this.actualPlacement}`;
        },
        setPosition() {
            if (!this.open || !this.$el || !this.trigger) {
                return;
            }

            const el = this.$el;
            const triggerEl = this.trigger;
            const rect = triggerEl.getBoundingClientRect();

            if (rect.top < -rect.height || rect.top > window.innerHeight) {
                this.close('overflow');
            }

            const maxTop = window.innerHeight - space - el.offsetHeight;
            const top = this.getTopPosition(el.offsetHeight, rect);
            el.style.left = this.getLeftPosition(el.offsetWidth, rect) + 'px';
            el.style.top = top + 'px';

            if (this.placement.startsWith('bottom') && maxTop < (rect.top + rect.height + this.space)) {
                this.actualPlacement = this.placement.replace('bottom', 'top');
            } else {
                this.actualPlacement = this.placement;
            }
        },
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-popover {
    position: fixed;
    max-height: 100%;
    max-width: 80%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &.transition-bottom-left {
        transform-origin: left top;
    }

    &.transition-bottom {
        transform-origin: center top;

        &.scale-enter,
        &.scale-leave-active {
            transform: scaleY(.5);
        }
    }

    &.transition-bottom-right {
        transform-origin: right top;
    }

    &.transition-top-left {
        transform-origin: left bottom;
    }

    &.transition-top {
        transform-origin: center bottom;

        &.scale-enter,
        &.scale-leave-active {
            transform: scaleY(.5);
        }
    }

    &.transition-top-right {
        transform-origin: right bottom;
    }

    &.transition-left-top {
        transform-origin: right top;
    }

    &.transition-left {
        transform-origin: right center;
    }

    &.transition-left-bottom {
        transform-origin: right bottom;
    }

    &.transition-right-top {
        transform-origin: left top;
    }

    &.transition-right {
        transform-origin: left center;
    }

    &.transition-right-bottom {
        transform-origin: left bottom;
    }
}
</style>
