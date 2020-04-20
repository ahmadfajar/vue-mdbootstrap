<template>
  <aside :is="tag"
         :class="_classNames"
         :style="_styles"
         v-resize="_resize"
         class="md-side-drawer">
    <div class="md-side-drawer-inner" :class="{'md-shadow': shadow}">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import PopupManager from "../../utils/PopupManager";
import resize from "../../directives/WindowResize";
import Helper from '../../utils/Helper';
import ScreenSize from "../../mixins/ScreenSize";
import { getZIndex } from "../../mixins/Popup";

export default {
    name: 'BsSideDrawer',
    directives: {resize},
    mixins: [ScreenSize],
    props: {
        color: {
            type: String,
            default: 'light-grey'
        },
        tag: {
            type: String,
            default: 'aside'
        },
        clipped: {
            type: Boolean,
            default: false
        },
        mini: {
            type: Boolean,
            default: false
        },
        open: {
            type: Boolean,
            default: true
        },
        shadow: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: 240,
            validator: v => !isNaN(parseInt(v, 10))
        },
        miniWidth: {
            type: [Number, String],
            default: 55,
            validator: v => !isNaN(parseInt(v, 10))
        },
        modalWidth: {
            type: [Number, String],
            default: 300,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    data: () => ({
        isMobile: false,
        overlay: true,
        overlayClose: true,
        overlayColor: '#000',
        overlayOpacity: 0.4,
        overlayZIndex: getZIndex(),
        zIndex: getZIndex(),
        listItems: []
    }),
    computed: {
        /**
         * Get component's class names.
         *
         * @return {Object} Component css classes
         * @private
         */
        _classNames() {
            return {
                ['bg-' + this.color]: this.color,
                'md-mini': this.mini && this.open,
                'md-open': this.isMobile && this.open,
                'md-close': this.isMobile && !this.open
            }
        },
        /**
         * Get component's css styles.
         *
         * @return {Object|null} Inline css styles
         * @private
         */
        _styles() {
            const top = this.$VueMdb.application.top;
            const properties = {
                width: this.width ? Helper.sizeUnit(this.width) : null,
                height: this.isMobile ? '100%' : (this.clipped ? 'calc(100% - ' + this.clipHeight + 'px)' : '100%'),
                transform: 'translateX(-' + (this.width ? Helper.sizeUnit(this.width) : '0px') + ')',
                'z-index': this.clipped ? 1000 : null
            };

            if (this.isMobile && this.open) {
                return {
                    ...properties,
                    height: '100%',
                    width: Helper.sizeUnit(this.modalWidth),
                    transform: 'translateX(0px)',
                    'z-index': this.zIndex,
                };
            } else if (this.mini && this.miniWidth) {
                return {
                    ...properties,
                    width: Helper.sizeUnit(this.miniWidth),
                    transform: 'translateX(0px)',
                    'margin-top': this.clipped ? Helper.sizeUnit(this.clipHeight) : Helper.sizeUnit(top),
                };
            } else if (this.width && this.open) {
                return {
                    ...properties,
                    transform: 'translateX(0px)',
                    'margin-top': this.clipped ? Helper.sizeUnit(this.clipHeight) : Helper.sizeUnit(top),
                };
            }

            return properties;
        },
        /**
         * Get tinggi area yang akan di cut/clipped.
         *
         * @return {number} Tinggi area yang akan di cut/clipped
         */
        clipHeight() {
            return this.$VueMdb.application.top + this.$VueMdb.application.appbarHeight;
        }
    },
    watch: {
        open(value) {
            if (value) {
                if (this.isMobile) {
                    this._setZIndex();
                    PopupManager.open(this);
                }

                this.$VueMdb.application.sideDrawerWidth = this.width;
            } else {
                PopupManager.close(this);
                this.$VueMdb.application.sideDrawerWidth = 0;
            }
        },
        mini(value) {
            if (value) {
                this.$VueMdb.application.sideDrawerWidth = this.miniWidth;
            } else {
                this.$VueMdb.application.sideDrawerWidth = this.width;
            }
        }
    },
    provide() {
        return {
            listItems: this.listItems
        }
    },
    created() {
        this.$VueMdb.application.sideDrawerWidth = this.width;
    },
    beforeDestroy() {
        if (this.isMobile) {
            PopupManager.close(this);
        }
        this.listItems = null;
    },
    methods: {
        /**
         * Event handler when overlay is clicked.
         *
         * @event open Triggers open event with value TRUE or FALSE
         * @return {void}
         * @private
         */
        overlayClick() {
            if (!this.overlay || !this.overlayClose || !this.open) {
                return;
            }
            this.$emit('open', false);

            if (!this.isMobile) {
                this.$nextTick(() => {
                    this.$emit('open', true);
                });
            }
        },
        /**
         * Event handler when document body is resized.
         *
         * @event open Triggers open event with value TRUE or FALSE
         * @return {void}
         * @private
         */
        _resize() {
            if (this.screenMaxMd.matches) {
                this.isMobile = true;
                this.$emit('open', false);
            } else {
                this.isMobile = false;
                this.$emit('open', true);
            }
        },
        /**
         * Sets Element z-index.
         *
         * @return {void}
         * @private
         */
        _setZIndex() {
            if (!this.zIndex) {
                this.zIndex = getZIndex();
            }
            if (!this.overlayZIndex) {
                this.overlayZIndex = getZIndex();
            }
        }
    }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-side-drawer {
    @include box-sizing(border-box);
    @include box-shadow(0px 0px 10px 0 rgba(0, 0, 0, .6));
    @include transition($transition-duration-base $md-transition-default-timing);
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: $zindex-fixed;

    &.#{$prefix}-close {
        @include box-shadow(none);
    }

    .#{$prefix}-side-drawer-inner {
        @include flexbox((display:flex, flex-direction: column));
        height: 100%;
        overflow: hidden;
        position: relative;

        a {
            color: inherit;

            &:hover,
            &:focus,
            &:active {
                color: $sidebar-hover-textcolor;
                text-decoration: none;
            }
        }
    }

    .divider {
        border-bottom: 1px solid rgba(200, 200, 200, 0.16);
    }

    @include media-breakpoint-up(lg) {
        @include box-shadow(none);
    }
}
</style>
