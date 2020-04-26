<template>
  <div v-if="open"
       :style="_wrapperStyles"
       class="md-lightbox-wrap">
    <div :style="_toolbarStyles" class="md-lightbox-toolbar">
      <div v-if="showCounter" class="md-counter">
        <span class="md-counter-current">{{ itemIndex + 1 }}</span>
        /
        <span class="md-counter-all">{{ totalItems }}</span>
      </div>
      <div v-if="showToolbar"
           class="md-toolbar-items">
        <bs-button v-if="toolbar['download']"
                   color="light-grey"
                   mode="icon"
                   icon="download"
                   flat
                   @click="_downloadClick" />
        <bs-button v-if="toolbar['zoom']"
                   color="light-grey"
                   mode="icon"
                   flat
                   @click="_zoomInClick">
          <bs-icon icon="ZoomIn" size="24" />
        </bs-button>
        <bs-button v-if="toolbar['zoom']"
                   color="light-grey"
                   mode="icon"
                   flat
                   @click="_zoomOutClick">
          <bs-icon icon="ZoomOut" size="24" />
        </bs-button>
        <bs-button v-if="toolbar['info']"
                   color="light-grey"
                   mode="icon"
                   flat
                   @click="_infoClick">
          <bs-icon icon="OutlineInfo" size="24" />
        </bs-button>
        <bs-button v-if="toolbar['rotate']"
                   color="light-grey"
                   mode="icon"
                   flat
                   @click="_rotateLeftClick">
          <bs-icon icon="RotateLeft" size="24" />
        </bs-button>
        <bs-button v-if="toolbar['rotate']"
                   color="light-grey"
                   mode="icon"
                   flat
                   @click="_rotateRightClick">
          <bs-icon icon="RotateRight" size="24" />
        </bs-button>
        <bs-button v-if="toolbar['delete']"
                   color="light-grey"
                   mode="icon"
                   flat
                   @click="_deleteClick">
          <bs-icon icon="trashcan" size="24" />
        </bs-button>
        <bs-menu color="transparent" placement="bottom-right">
          <bs-button v-if="toolbar['menubar']"
                     color="light-grey"
                     mode="icon"
                     flat>
            <bs-icon icon="MoreVert" size="24" />
          </bs-button>
          <template v-slot:content>
            <slot name="menubar" />
          </template>
        </bs-menu>
        <div v-if="toolbar['close']" class="ml-2">
          <bs-button color="light-grey"
                     mode="icon"
                     flat
                     @click="_closeClick">
            <bs-icon icon="close" size="24" />
          </bs-button>
        </div>
      </div>
    </div>

    <div v-if="showNavControl" class="md-lightbox-controls">
      <div :style="_controlStyles" class="md-control-prev">
        <bs-button mode="icon"
                   color="light-grey"
                   size="lg"
                   flat
                   @click="prevSlide">
          <bs-icon icon="ChevronLeft"
                   width="56"
                   height="64" />
        </bs-button>
      </div>
      <div :style="_controlStyles" class="md-control-next">
        <bs-button mode="icon"
                   color="light-grey"
                   size="lg"
                   flat
                   @click="nextSlide">
          <bs-icon icon="ChevronRight"
                   width="56"
                   height="64" />
        </bs-button>
      </div>
    </div>

    <div :style="_imgWrapperStyles"
         ref="imgWrapper"
         class="md-lightbox-item-wrap"
         @click="_onWrapperClick">
      <transition :name="transition" :mode="transitionMode">
        <div v-if="itemIndex > -1"
             :key="'img-' + itemIndex"
             class="md-lightbox-item">
          <div class="md-lightbox-item-img">
            <img :alt="activeItem.title"
                 :src="activeItem.imageFile" />
          </div>
          <div v-if="showItemTitle"
               class="md-lightbox-item-title">
            {{ activeItem.title }}
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showThumbnail"
         :style="_toolbarStyles"
         class="md-lightbox-thumbnail-wrap">
      <div class="md-lightbox-thumbnail-row">
        <div class="md-lightbox-thumbnails">
          <div v-for="(item, idx) in items"
               :key="idx"
               :class="{'md-active': itemIndex === idx}"
               class="md-thumbnail-item"
               @click="changeActive(item, idx)">
            <img :src="item.thumbnail"
                 :alt="item.title"
                 :height="thumbnailHeight"
                 width="auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "../../mixins/Popup";
import Helper from "../../utils/Helper";

export default {
    name: "BsLightbox",
    mixins: [Popup],
    props: {
        items: {
            type: Array,
            default: undefined
        },
        showCounter: {
            type: Boolean,
            default: true
        },
        showItemTitle: {
            type: Boolean,
            default: true
        },
        showThumbnail: {
            type: Boolean,
            default: true
        },
        showToolbar: {
            type: Boolean,
            default: true
        },
        showNavControl: {
            type: Boolean,
            default: true
        },
        thumbnailHeight: {
            type: Number,
            default: 72,
            validator: v => !isNaN(parseInt(v, 10))
        },
        toolbar: {
            type: Object,
            default: () => ({
                'download': true,
                'zoom': true,
                'info': true,
                'rotate': true,
                'delete': true,
                'menubar': true,
                'close': true
            })
        },
        transition: {
            type: String,
            default: 'slide-fade',
            validator: v => ['fade', 'popover', 'slide-fade', 'slide-fade-reverse', 'slide-bottom-top', 'slide-top-bottom'].indexOf(v) !== -1
        },
        transitionMode: {
            type: String,
            default: undefined,
            validator: v => ['out-in', 'in-out'].indexOf(v) !== -1
        }
    },
    data: () => ({
        activeItem: undefined,
        itemIndex: -1
    }),
    computed: {
        _imgWrapperStyles() {
            return {
                'height': this.showThumbnail ? 'calc(100% - ' + (this.thumbnailHeight + 2) + 'px)' : '100%',
                'z-index': this.zIndex + 1
            }
        },
        /**
         * Get navigation container's css styles.
         *
         * @return {Object} Inline css styles
         * @private
         */
        _controlStyles() {
            return {
                'z-index': this.zIndex + 2
            }
        },
        /**
         * Get toolbar container's css styles.
         *
         * @return {Object} Inline css styles
         * @private
         */
        _toolbarStyles() {
            return {
                'z-index': this.zIndex + 3
            }
        },
        /**
         * Get component wrapper's css styles.
         *
         * @return {Object} Inline css styles
         * @private
         */
        _wrapperStyles() {
            return {
                'z-index': this.zIndex
            }
        },
        _transitionClasses() {
            return {
                [`md-${this.transition}`]: true
            }
        },
        totalItems() {
            return !Helper.isArray(this.items) ? 0 : this.items.length;
        }
    },
    watch: {
        open(value) {
            if (value && Helper.isArray(this.items) && this.items.length > 0) {
                this.itemIndex = this.itemIndex > -1 ? this.itemIndex : 0;
                this.activeItem = this.items[this.itemIndex];
            }
        }
    },
    methods: {
        _onWrapperClick(e) {
            if (this.$refs.imgWrapper !== e.target) {
                return;
            }
            this.overlayClick(e);
        },
        _closeClick() {
            this.$emit('update:open', false);
            this.$emit('close', 'Close Button');
        },
        _deleteClick() {
            this.$emit('click:delete', this.activeItem);
        },
        _downloadClick() {
            this.$emit('click:download', this.activeItem);
        },
        _infoClick() {
            this.$emit('click:info', this.activeItem);
        },
        _rotateLeftClick() {
            this.$emit('click:rotate:left', this.activeItem);
        },
        _rotateRightClick() {
            this.$emit('click:rotate:right', this.activeItem);
        },
        _zoomInClick() {
            this.$emit('click:zoomin', this.activeItem);
        },
        _zoomOutClick() {
            this.$emit('click:zoomout', this.activeItem);
        },
        changeActive(item, idx) {
            this.itemIndex = idx;
            this.activeItem = item;
            this.$emit('change', item, idx);
        },
        openAt(index) {
            this.itemIndex = index;
            this.$emit('update:open', true);
        },
        nextSlide() {
            if (this.itemIndex < (this.totalItems - 1)) {
                this.itemIndex++;

            } else {
                this.itemIndex = 0;
            }
            this.activeItem = this.items[this.itemIndex];
        },
        prevSlide() {
            if (this.itemIndex === 0) {
                this.itemIndex = this.totalItems - 1;
            } else {
                this.itemIndex--;
            }
            this.activeItem = this.items[this.itemIndex];
        },
    },
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/shared";

.#{$prefix}-lightbox-wrap {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;

  .#{$prefix}-lightbox-item-wrap {
    @include flexbox((display: flex, align-items: center, justify-content: center));
    position: relative;

    .#{$prefix}-lightbox-item {
      @include flexbox((display: flex, flex-direction: column));
      background: rgba(0, 0, 0, .3);
      max-width: 95%;
      max-height: 99%;
      position: relative;
      overflow: hidden;
    }

    .#{$prefix}-lightbox-item-img {
      height: calc(100% - 51px);
      display: block;
      overflow: hidden;
      position: relative;
    }

    .#{$prefix}-lightbox-item-title {
      color: $gray-400;
      display: block;
      line-height: 1;
      padding: 12px;
      font-size: 1.7rem;
      position: relative;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  > .#{$prefix}-lightbox-toolbar {
    @include flexbox((display: flex, flex-wrap: wrap, justify-content: space-between));
    background: rgba(0, 0, 0, .6);
    left: 0;
    top: 0;
    width: 100%;
    position: fixed;
    padding: $padding-sm .3rem $padding-sm ($padding-base + ($padding-base / 4));

    .#{$prefix}-counter,
    .#{$prefix}-toolbar-items {
      display: inline-flex;
      min-width: 100px;
    }

    .#{$prefix}-counter {
      color: $gray-400;
      padding-top: $padding-sm;
    }
  }

  > .#{$prefix}-lightbox-controls {
    > .#{$prefix}-control-prev, > .#{$prefix}-control-next {
      @include flexbox((display: flex, align-items: center));
      height: 100%;
      position: fixed;
    }

    > .#{$prefix}-control-prev {
      left: 0;
      padding-left: $padding-sm;
    }

    > .#{$prefix}-control-next {
      right: 0;
      padding-right: $padding-sm;
    }

  }

  > .#{$prefix}-lightbox-thumbnail-wrap {
    background: rgba(0, 0, 0, .5);
    left: 0;
    bottom: 0;
    width: 100%;
    position: fixed;
    padding: 0 $padding-sm;
    overflow-x: auto;

    > .#{$prefix}-lightbox-thumbnail-row {
      @include flexbox((display:flex, flex-direction:row));

      > .#{$prefix}-lightbox-thumbnails {
        @include flexbox((display: flex, flex-flow:row nowrap));

        .#{$prefix}-thumbnail-item {
          @extend %cursor-pointer;
          border: 1px solid rgba(0, 0, 0, .6);
          display: inline-block;
          opacity: .5;

          &:hover {
            opacity: 1;
          }

          &.#{$prefix}-active {
            border-color: $red-base;
            border-left-width: 2px;
            border-right-width: 2px;
            opacity: 1;
          }
        }
      }

      @include media-breakpoint-up(xl) {
        @include flexbox((justify-content: center));
      }
    }
  }
}
</style>
