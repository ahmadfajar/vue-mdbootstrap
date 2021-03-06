<template>
  <div
    :is="tag"
    v-resize="_resize"
    :style="_styles"
    class="md-container-wrap">
    <slot></slot>
  </div>
</template>

<script>
import resize from "../../directives/WindowResize";
import ScreenSize from "../../mixins/ScreenSize";
import AppContainer from "./mixins/ParentContainer";
import Helper from "../../utils/Helper";

export default {
    name: "BsContainer",
    directives: {resize},
    mixins: [ScreenSize, AppContainer],
    props: {
        /**
         * Mount this container as part of application container or just ordinary container.
         * If mount as part of application container, then it will adapt to SidebarDrawer and Appbar size.
         * @type {boolean|*}
         */
        app: {
            type: Boolean,
            default: false
        },
        /**
         * Html tag used to render the container.
         * @type {string|*}
         */
        tag: {
            type: String,
            default: 'div'
        },
    },
    data: () => ({
        appId: null,
        isMobile: false
    }),
    computed: {
        /**
         * Get component's css styles.
         *
         * @returns {Object|null} Inline css styles
         * @private
         */
        _styles() {
            if (this.app && this.appId) {
                const {left, right, sideDrawerWidth} = this.$VueMdb.apps[this.appId];

                return {
                    // paddingTop: `${top + navbarHeight}px`,
                    paddingRight: this.isMobile ? `${right}px` : `${sideDrawerWidth.right + left}px`,
                    // paddingBottom: `${footer + insetFooter + bottom}px`,
                    paddingLeft: this.isMobile ? `${left}px` : `${sideDrawerWidth.left + left}px`
                };
            }

            return null;
        }
    },
    mounted() {
        const me = this;

        this.$nextTick().then(() => {
            me.$VueMdb.validateApps();
            const parent = me.getParentContainer('bs-app-container', 3);

            if (parent && Helper.isObject(me.$VueMdb.getApplication(parent.uid))) {
                me.appId = parent.uid;
            } else if (me.app) {
                console.warn('<bs-container> must be wrapped by <bs-app-container>');
            }
        });
    },
    methods: {
        /**
         * Event handler when document body is resized.
         *
         * @returns {void}
         * @private
         */
        _resize() {
            this.isMobile = !!this.screenMaxLg.matches;
            this.$emit('resize', this.isMobile);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-container-wrap {
    @include transition($transition-duration-base $md-transition-default-timing);
    @include flexbox((display: flex, flex: 1 0 auto));
    max-width: 100%;
    position: relative;
}
</style>
