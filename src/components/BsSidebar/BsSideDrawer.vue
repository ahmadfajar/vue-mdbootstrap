<template>
  <aside
    :is="tag"
    v-resize="_resize"
    :class="_classNames"
    :style="_styles"
    class="md-side-drawer">
    <div
      :class="{'md-shadow': shadow}"
      class="md-side-drawer-inner">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import PopupManager from "../../utils/PopupManager";
import resize from "../../directives/WindowResize";
import Helper from '../../utils/Helper';
import ScreenSize from "../../mixins/ScreenSize";
import AppContainer from "../BsContainer/mixins/ParentContainer";
import { getZIndex } from "../../mixins/Popup";

export default {
    name: 'BsSideDrawer',
    directives: {resize},
    mixins: [ScreenSize, AppContainer],
    props: {
        color: {
            type: String,
            default: 'light-grey'
        },
        position: {
            type: String,
            default: 'left',
            validator: v => ['left', 'right'].includes(v)
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
            default: 250,
            validator: v => parseInt(v, 10) > 0
        },
        miniWidth: {
            type: [Number, String],
            default: 56,
            validator: v => parseInt(v, 10) > 0
        },
        modalWidth: {
            type: [Number, String],
            default: 300,
            validator: v => parseInt(v, 10) > 0
        }
    },
    data: () => ({
        appId: null,
        isMobile: false,
        overlay: true,
        overlayClose: true,
        overlayColor: '#000',
        overlayOpacity: 0.4,
        overlayZIndex: getZIndex(),
        zIndex: getZIndex(),
    }),
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {Object} Component css classes
         * @private
         */
        _classNames() {
            return {
                ['bg-' + this.color]: this.color,
                'md-mini': this.mini,
                'md-open': this.open,
                'md-close': !this.open && !this.mini
            }
        },
        /**
         * Get component's css styles.
         *
         * @returns {Object|null} Inline css styles
         * @private
         */
        _styles() {
            const properties = {
                width: Helper.sizeUnit(this.width),
                height: this.isMobile ? '100vh' : (this.clipped ? 'calc(100vh - ' + this.clipHeight + 'px)' : '100vh'),
                transform: 'translateX(-' + (this.width ? Helper.sizeUnit(this.width) : '0px') + ')',
                'z-index': this.clipped ? 1000 : null
            };

            if (this.isMobile && this.open) {
                return {
                    ...properties,
                    height: '100vh',
                    width: Helper.sizeUnit(this.modalWidth),
                    transform: 'translateX(0px)',
                    'z-index': this.zIndex,
                };
            } else if (this.mini && this.miniWidth) {
                return {
                    ...properties,
                    width: Helper.sizeUnit(this.miniWidth),
                    transform: 'translateX(0px)',
                    'margin-top': Helper.sizeUnit(this.clipHeight),
                };
            } else if (this.width && this.open) {
                return {
                    ...properties,
                    transform: 'translateX(0px)',
                    'margin-top': Helper.sizeUnit(this.clipHeight),
                };
            }

            return properties;
        },
        /**
         * Get tinggi area yang akan di cut/clipped.
         *
         * @returns {number} Tinggi area yang akan di cut/clipped
         */
        clipHeight() {
            if (this.clipped && this.appId) {
                return this.$VueMdb.apps[this.appId].top + this.$VueMdb.apps[this.appId].appbarHeight + 1;
            }

            return 0;
        }
    },
    watch: {
        open(value) {
            if (value) {
                if (this.isMobile) {
                    this._setZIndex();
                    PopupManager.open(this);
                }
                if (this.$VueMdb.getApplication(this.appId)) {
                    this.$VueMdb.apps[this.appId].sideDrawerWidth[this.position] = parseInt(this.width, 10);
                }
            } else {
                PopupManager.close(this);
                if (this.$VueMdb.getApplication(this.appId)) {
                    this.$VueMdb.apps[this.appId].sideDrawerWidth[this.position] = 0;
                }
            }
        },
        mini(value) {
            if (this.$VueMdb.getApplication(this.appId)) {
                if (value) {
                    this.$VueMdb.apps[this.appId].sideDrawerWidth[this.position] = parseInt(this.miniWidth, 10);
                } else {
                    this.$VueMdb.apps[this.appId].sideDrawerWidth[this.position] = parseInt(this.width, 10);
                }
            }
        }
    },
    mounted() {
        const me = this;

        this.$nextTick().then(() => {
            me.$VueMdb.validateApps();
            const parent = me.getParentContainer('bs-app-container', 2);

            if (parent && Helper.isObject(me.$VueMdb.getApplication(parent.uid))) {
                me.appId = parent.uid;
                me.$VueMdb.apps[me.appId].sideDrawerWidth[me.position] = parseInt(me.width, 10);
            } else {
                console.warn('<bs-side-drawer> must be wrapped by <bs-app-container>');
            }
        });
    },
    beforeDestroy() {
        if (this.isMobile) {
            PopupManager.close(this);
        }
    },
    methods: {
        /**
         * Event handler when overlay is clicked.
         *
         * @event open Triggers open event with value TRUE or FALSE
         * @returns {void}
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
         * @returns {void}
         * @private
         */
        _resize() {
            if (this.screenMaxLg.matches) {
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
         * @returns {void}
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
    @include transition($md-transition-default);
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: $zindex-fixed;

    &.#{$prefix}-close {
        @include box-shadow(none);
    }

    > .#{$prefix}-side-drawer-inner {
        @include flexbox((display:flex, flex-direction: column));
        height: 100%;
        overflow: hidden;
        position: relative;

        > .#{$prefix}-list {
            &.#{$prefix}-space-both,
            &.#{$prefix}-space-left,
            &.#{$prefix}-space-right {
                > .#{$prefix}-list-tile {
                    &.active, &.#{$prefix}-active {
                        @include border-radius($border-radius);
                    }
                }
            }
        }

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

    .#{$prefix}-list-nav {
        .#{$prefix}-nav-item {
            &:not(.#{$prefix}-parent),
            &.#{$prefix}-parent:not(.#{$prefix}-expanded) {
                margin-bottom: 2px;
                margin-top: 2px;

                > .#{$prefix}-nav-item-inner {
                    > .#{$prefix}-ripple {
                        height: 46px;
                    }
                }
            }
        }
    }

    @include media-breakpoint-up(lg) {
        @include box-shadow(none);
    }
}
</style>
