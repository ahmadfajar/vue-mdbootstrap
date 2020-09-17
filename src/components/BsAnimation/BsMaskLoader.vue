<template>
  <transition :name="transition">
    <div v-if="show"
         :style="_styles"
         class="md-mask-loader">
      <bs-progress :diameter="spinnerDiameter"
                   :stroke="stroke"
                   class="align-self-center"
                   type="spinner" />
      <bs-overlay :opacity="opacity"
                  :show="show"
                  :z-index="zIndex - 1" />
    </div>
  </transition>
</template>

<script>
import BsProgress from "./BsProgress";
import BsOverlay from "./BsOverlay";

export default {
    name: "BsMaskLoader",
    components: {BsProgress, BsOverlay},
    props: {
        /**
         * Use css position: `fixed` or `absolute`. If `true` then css position fixed will be used.
         * @type {boolean|*}
         */
        fixedPosition: {
            type: Boolean,
            default: false
        },
        /**
         * Mask loader state, show or hide.
         * @type {boolean|*}
         */
        show: {
            type: Boolean,
            default: false
        },
        /**
         * Overlay opacity.
         * @type {number|*}
         */
        opacity: {
            type: Number,
            default: 0.4
        },
        /**
         * The transition to be used.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: 'fade'
        },
        /**
         * Mask loader spinner diameter.
         * @type {number|*}
         */
        spinnerDiameter: {
            type: Number,
            default: 35,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Mask loader spinner thickness.
         * @type {number|*}
         */
        stroke: {
            type: Number,
            default: 5,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Mask loader css `z-index`.
         * @type {number|*}
         */
        zIndex: {
            type: Number,
            default: 100,
            validator: v => !isNaN(parseInt(v, 10))
        },
    },
    computed: {
        _styles() {
            return {
                'z-index': this.zIndex,
                'position': this.fixedPosition ? 'fixed' : null
            };
        }
    },
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-mask-loader {
    left: 0;
    top: 0;
    right: 0;
    max-height: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    display: -ms-flexbox;
    position: absolute;
    justify-content: center;
    -ms-flex-pack: center;
}
</style>
