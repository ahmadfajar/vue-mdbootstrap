<template>
  <div
    v-if="open"
    :style="_wrapperStyles"
    class="md-lightbox-wrap">
    <div :style="_toolbarStyles" class="md-lightbox-toolbar">
      <div v-if="showCounter" class="md-counter d-none d-md-flex">
        <span class="md-counter-current">{{ itemIndex + 1 }}</span>
        /
        <span class="md-counter-all">{{ totalItems }}</span>
      </div>
      <bs-spacer v-if="showToolbar" />
      <div
        v-if="showToolbar"
        class="md-toolbar-items d-flex">
        <bs-button
          v-if="toolbar['download']"
          color="light-grey"
          mode="icon"
          icon="download"
          flat
          @click="_downloadClick" />
        <bs-button
          v-if="toolbar['zoom']"
          color="light-grey"
          mode="icon"
          flat
          @click="_zoomInClick">
          <bs-icon icon="ZoomIn" size="24" />
        </bs-button>
        <bs-button
          v-if="toolbar['zoom']"
          color="light-grey"
          mode="icon"
          flat
          @click="_zoomOutClick">
          <bs-icon icon="ZoomOut" size="24" />
        </bs-button>
        <bs-button
          v-if="toolbar['rotate']"
          color="light-grey"
          mode="icon"
          flat
          @click="_rotateLeftClick">
          <bs-icon icon="RotateLeft" size="24" />
        </bs-button>
        <bs-button
          v-if="toolbar['rotate']"
          color="light-grey"
          mode="icon"
          flat
          @click="_rotateRightClick">
          <bs-icon icon="RotateRight" size="24" />
        </bs-button>
        <bs-button
          v-if="toolbar['info']"
          color="light-grey"
          mode="icon"
          flat
          @click="_infoClick">
          <bs-icon icon="InfoOutline" size="24" />
        </bs-button>
        <bs-button
          v-if="toolbar['delete']"
          color="light-grey"
          mode="icon"
          flat
          @click="_deleteClick">
          <bs-icon icon="DeleteOutline" size="24" />
        </bs-button>
        <bs-menu color="transparent" placement="bottom-right">
          <bs-button
            v-if="toolbar['menubar']"
            color="light-grey"
            mode="icon"
            flat>
            <bs-icon icon="MoreVert" size="24" />
          </bs-button>
          <template #content>
            <slot name="menubar"></slot>
          </template>
        </bs-menu>
        <div v-if="toolbar['close']" class="ml-2">
          <bs-button
            color="light-grey"
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
        <bs-button
          mode="icon"
          color="light-grey"
          size="lg"
          flat
          @click="prevSlide">
          <bs-icon
            icon="ChevronLeft"
            width="56"
            height="64" />
        </bs-button>
      </div>
      <div :style="_controlStyles" class="md-control-next">
        <bs-button
          mode="icon"
          color="light-grey"
          size="lg"
          flat
          @click="nextSlide">
          <bs-icon
            icon="ChevronRight"
            width="56"
            height="64" />
        </bs-button>
      </div>
    </div>

    <div
      :style="_imgWrapperStyles"
      ref="imgWrapper"
      class="md-lightbox-item-wrap"
      @click="_onWrapperClick">
      <transition :name="transition" :mode="transitionMode">
        <div
          v-if="itemIndex > -1"
          :key="'img-' + itemIndex"
          class="md-lightbox-item">
          <div class="md-lightbox-item-img">
            <img
              :alt="activeItem.title"
              :class="imageClass"
              :style="_imgStyles"
              :src="activeItem.imageSrc" />
          </div>
          <div
            v-if="showItemTitle"
            class="md-lightbox-item-title">
            {{ activeItem.title }}
          </div>
        </div>
      </transition>
    </div>

    <div
      v-if="showThumbnail"
      :style="_toolbarStyles"
      class="md-lightbox-thumbnail-wrap">
      <div class="md-lightbox-thumbnail-row">
        <div class="md-lightbox-thumbnails">
          <div
            v-for="(item, idx) in items"
            :key="idx"
            :class="{'md-active': itemIndex === idx}"
            class="md-thumbnail-item"
            @click="changeActive(item, idx)">
            <img
              :src="item.thumbnail"
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
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import BsMenu from "../BsMenu/BsMenu";
import Popup from "../../mixins/Popup";
import Helper from "../../utils/Helper";

export default {
    name: "BsLightbox",
    components: {BsButton, BsIcon, BsMenu},
    mixins: [Popup],
    props: {
        /**
         * Lightbox source dataset.
         * @type {Array|*}
         */
        items: {
            type: Array,
            default: undefined
        },
        /**
         * Show or hide indicator counter.
         * @type {boolean|*}
         */
        showCounter: {
            type: Boolean,
            default: true
        },
        /**
         * Show or hide active item image title.
         * @type {boolean|*}
         */
        showItemTitle: {
            type: Boolean,
            default: true
        },
        /**
         * Show or hide image thumbnails.
         * @type {boolean|*}
         */
        showThumbnail: {
            type: Boolean,
            default: true
        },
        /**
         * Show or hide toolbar buttons.
         * @type {boolean|*}
         */
        showToolbar: {
            type: Boolean,
            default: true
        },
        /**
         * Show or hide navigation controls.
         * @type {boolean|*}
         */
        showNavControl: {
            type: Boolean,
            default: true
        },
        /**
         * Additional css class name for active image.
         * @type {string|Array|*}
         */
        imageClass: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Additional css styles for active image.
         * @type {Object|*}
         */
        imageStyles: {
            type: Object,
            default: undefined
        },
        /**
         * The overlay opacity.
         * @type {number|*}
         */
        overlayOpacity: {
            type: Number,
            default: 0.9
        },
        /**
         * Default image thumbnails height.
         * @type {number|*}
         */
        thumbnailHeight: {
            type: Number,
            default: 72,
            validator: v => parseInt(v, 10) > 0
        },
        /**
         * Configure the toolbar buttons.
         * @type {Object|*}
         */
        toolbar: {
            type: Object,
            default: () => ({
                'download': false,
                'zoom': true,
                'info': true,
                'rotate': true,
                'delete': true,
                'menubar': false,
                'close': true
            })
        },
        /**
         * Transition animation name when showing the active image.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: 'slide-top-bottom'
        },
        /**
         * Controls the timing sequence of leaving/entering transitions.
         * Available modes are "out-in" and "in-out".
         * @type {string|*}
         */
        transitionMode: {
            type: String,
            default: undefined,
            validator: v => ['out-in', 'in-out'].indexOf(v) > -1
        }
    },
    data: () => ({
        activeItem: undefined,
        itemIndex: -1,
        rotate: 0,
        zoom: 1
    }),
    computed: {
        _imgWrapperStyles() {
            return {
                'height': this.showThumbnail ? 'calc(100% - ' + (this.thumbnailHeight + 2) + 'px)' : '100%',
                'z-index': this.zIndex + 1
            }
        },
        _imgStyles() {
            const scale = this.zoom !== 1 && (this.zoom < 5 || this.zoom > 0.4 ) ? 'scale(' + this.zoom + ')' : '';
            const rotation = [0, 360, -360].includes(this.rotate) ? '' : 'rotate(' + this.rotate + 'deg)';

            if (scale !== '' && rotation !== '') {
                return {
                    ...this.imageStyles,
                    transform: scale + ' ' + rotation
                }
            } else if (scale !== '') {
                return {
                    ...this.imageStyles,
                    transform: scale
                }
            } else if (rotation !== '') {
                return {
                    ...this.imageStyles,
                    transform: rotation
                }
            } else {
                return this.imageStyles;
            }
        },
        /**
         * Get navigation container's css styles.
         *
         * @returns {Object} Inline css styles
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
         * @returns {Object} Inline css styles
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
         * @returns {Object} Inline css styles
         * @private
         */
        _wrapperStyles() {
            return {
                'z-index': this.zIndex
            }
        },
        totalItems() {
            return !Helper.isArray(this.items) ? 0 : this.items.length;
        }
    },
    created() {
        // preload images
        if (this.totalItems > 0) {
            this.items.map(value => {
                const img = new Image();
                img.src = value.imageSrc;
            });
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
            this.$emit('close', 'Button close clicked');
        },
        _deleteClick() {
            this.$emit('exec-delete', this.activeItem);
        },
        _downloadClick() {
            this.$emit('exec-download', this.activeItem);
        },
        _infoClick() {
            this.$emit('exec-info', this.activeItem);
        },
        _resetZoomRotate() {
            this.rotate = 0;
            this.zoom = 1;
        },
        _rotateLeftClick() {
            if (this.rotate > -270 && this.rotate < 361) {
                this.rotate -= 90;
            } else {
                this.rotate = 0;
            }

            this.$emit('exec-rotate-left', this.activeItem);
        },
        _rotateRightClick() {
            if (this.rotate > -361 && this.rotate < 270) {
                this.rotate += 90;
            } else {
                this.rotate = 0;
            }

            this.$emit('exec-rotate-right', this.activeItem);
        },
        _zoomInClick() {
            if (this.zoom >= 1 && this.zoom < 4) {
                this.zoom += 1;
            } else if (this.zoom > 0.6 && this.zoom < 1) {
                this.zoom += 0.1;
            } else {
                this.zoom = 1;
            }

            this.$emit('exec-zoomin', this.activeItem);
        },
        _zoomOutClick() {
            if (this.zoom > 1 && this.zoom < 4) {
                this.zoom -= 1;
            } else if (this.zoom > 0.6 && this.zoom <= 1) {
                this.zoom -= 0.1;
            } else {
                this.zoom = 1;
            }

            this.$emit('exec-zoomout', this.activeItem);
        },
        changeActive(item, idx) {
            this.itemIndex = idx;
            this.activeItem = item;
            this._resetZoomRotate();
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
            this._resetZoomRotate();
            this.activeItem = this.items[this.itemIndex];
            this.$emit('change', this.activeItem, this.itemIndex);
        },
        prevSlide() {
            if (this.itemIndex === 0) {
                this.itemIndex = this.totalItems - 1;
            } else {
                this.itemIndex--;
            }
            this._resetZoomRotate();
            this.activeItem = this.items[this.itemIndex];
            this.$emit('change', this.activeItem, this.itemIndex);
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
            background: rgba($black, .4);
            color: $gray-400;
            display: block;
            line-height: normal;
            padding: 12px;
            font-size: 1.25rem;
            position: relative;
        }

        img {
            @include transition($transition-basic);
            max-width: 100%;
            max-height: 100%;
        }
    }

    > .#{$prefix}-lightbox-toolbar {
        @include flexbox((display: flex, justify-content: space-between));
        left: 0;
        top: 0;
        width: 100%;
        position: fixed;

        .#{$prefix}-toolbar-items {
            background: rgba($black, .8);
            min-width: 100px;
            padding: $padding-sm
        }

        .#{$prefix}-counter {
            color: $gray-400;
            padding: $padding-sm $padding-base;
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
