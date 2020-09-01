<template>
  <transition name="bs-modal">
    <div v-if="open"
         class="md-modal"
         :style="_wrapperStyles"
         @click="_onWrapperClick">
      <div ref="dialog"
           :class="_classNames"
           :style="_modalStyles">
        <div v-if="isShowTitle"
             ref="titleEl"
             class="md-modal-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="md-modal-body" ref="bodyEl">
          <slot></slot>
        </div>
        <div v-if="hasFooter"
             ref="footerEl"
             class="md-modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from "../../mixins/Popup";
import Helper from "../../utils/Helper";

export default {
    name: "BsModal",
    mixins: [Popup],
    props: {
        fullscreen: Boolean,
        scrollable: Boolean,
        title: {
            type: String,
            default: undefined
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
        transition: {
            type: String,
            default: 'scale',
            validator: v => ['slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'fade', 'scale'].indexOf(v) !== -1
        }
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {Object|*} Dialog css classes
         * @private
         */
        _classNames() {
            return {
                'md-modal-inner': true,
                'md-modal-fullscreen': this.fullscreen,
                'md-modal-scrollable': this.scrollable,
                [`md-${this.transition}`]: true
            }
        },
        /**
         * Get component's css styles.
         *
         * @returns {Object} Inline css styles
         * @private
         */
        _modalStyles() {
            return {
                'max-width': this.maxWidth === 'auto' ? undefined : Helper.sizeUnit(this.maxWidth),
                'width': this.width === 'auto' ? undefined : Helper.sizeUnit(this.width)
            }
        },
        /**
         * Get component wrapper's css styles.
         *
         * @returns {Object} Inline css styles
         * @private
         */
        _wrapperStyles() {
            return {
                'z-index': this.zIndex
            }
        },
        hasCustomTitle() {
            return this.$slots.title && this.$slots.title.length > 0;
        },
        hasFooter() {
            return this.$slots.footer && this.$slots.footer.length > 0;
        },
        isShowTitle() {
            return !Helper.isEmpty(this.title) || this.hasCustomTitle;
        }
    },
    watch: {
        open(value) {
            if (!value) {
                return;
            }
            this.$nextTick(() => {
                this._setMaxHeight();
            });
        }
    },
    mounted() {
        this._setMaxHeight();
    },
    updated() {
        this.$nextTick(() => {
            this._setMaxHeight();
        });
    },
    methods: {
        _onWrapperClick(e) {
            if (this.$el !== e.target) {
                return;
            }
            this.overlayClick(e);
        },
        _setMaxHeight() {
            const dialogEl = this.$refs.dialog;

            if (!dialogEl) {
                return;
            }
            if (!this.scrollable) {
                dialogEl.style.maxHeight = '';
                return;
            }

            let contentMaxHeight = window.innerHeight - 2 * 64;
            const {titleEl, bodyEl, footerEl} = this.$refs;

            if (titleEl) {
                contentMaxHeight -= titleEl.offsetHeight;
            }
            if (footerEl) {
                contentMaxHeight -= footerEl.offsetHeight;
            }
            if (bodyEl) {
                let maxBodyHeight = contentMaxHeight;

                if (footerEl) {
                    maxBodyHeight -= footerEl.offsetHeight;
                }
                if (titleEl) {
                    maxBodyHeight -= titleEl.offsetHeight;
                }
                bodyEl.style.maxHeight = Helper.sizeUnit(maxBodyHeight);
            }

            dialogEl.style.maxHeight = Helper.sizeUnit(contentMaxHeight);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-modal {
  @include flexbox((display: flex, align-items: center, justify-content: center));
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  > .#{$prefix}-modal-inner {
    @include box-shadow(0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12));
    @include border-radius($border-radius-base);
    background-color: $white;
    font-size: inherit;
    max-width: 75%;
    padding: 0;

    &.#{$prefix}-modal-scrollable {
      .#{$prefix}-modal-body {
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }

    &.#{$prefix}-modal-fullscreen {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      max-width: 100% !important;
      width: 100% !important;
      height: 100% !important;
      max-height: 100% !important;
      border-radius: 0;

      .#{$prefix}-modal-body {
        padding: 0;
      }
    }
  }

  .#{$prefix}-modal-title {
    @include flexbox((display: flex, align-items: center, justify-content: space-between));
    color: darken($gray-900, 5%);
    font-size: 22px;
    font-weight: normal;
    line-height: normal;
    margin: 0;
    padding: $padding-base $padding-lg 1.25rem;

    + .#{$prefix}-modal-body {
      padding-top: 0;
    }
  }

  .#{$prefix}-modal-body {
    padding: $padding-lg $padding-lg 1.25rem;
    //color: $gray-700;
  }

  .#{$prefix}-modal-footer {
    @include flexbox((display: flex, align-items: center, justify-content: flex-end));
    min-height: 48px;
    padding: 8px 12px 12px 8px;

    .btn + .btn {
      margin-left: 10px;
    }
  }
}

.bs-modal-enter-active,
.bs-modal-leave-active {
  @include transition();
  transition: opacity $md-transition-easeOut;

  .#{$prefix}-modal-inner {
    &.md-slide-top,
    &.md-slide-bottom,
    &.md-slide-left,
    &.md-slide-right,
    &.md-scale {
      transition: transform $md-transition-easeOut;
    }
  }
}

.bs-modal-enter,
.bs-modal-leave-active {
  opacity: 0;
}

.bs-modal-enter,
.bs-modal-leave-active {
  .#{$prefix}-modal-inner {
    backface-visibility: hidden;

    &.md-slide-top {
      transform: translate3d(0, -100%, 0);
    }

    &.md-slide-bottom {
      transform: translate3d(0, 100%, 0);
    }

    &.md-slide-right {
      transform: translate3d(100%, 0, 0);
    }

    &.md-slide-left {
      transform: translate3d(-100%, 0, 0);
    }

    &.md-scale {
      transform: scale(0.6);
    }
  }
}
</style>
