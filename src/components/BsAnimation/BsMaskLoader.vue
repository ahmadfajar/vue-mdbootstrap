<template>
  <transition :name="transition">
    <div
      v-if="show"
      :style="_wrapperStyles"
      class="md-mask-loader">
      <bs-progress
        v-if="isProgress"
        :color="spinnerColor"
        :diameter="spinnerDiameter"
        :stroke="spinnerThickness"
        class="align-self-center"
        type="spinner" />
      <svg
        v-else-if="isSpinner"
        :class="_spinnerClasses"
        :style="_spinnerStyles"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        role="img"
        class="md-spinner-rotate align-self-center"
        focusable="false">
        <path :d="svgPathData" fill="currentColor" />
      </svg>
      <div
        v-else
        :class="_bsSpinnerClasses"
        :style="_bsSpinnerStyles">
      </div>
      <bs-overlay
        :color="overlayColor"
        :opacity="overlayOpacity"
        :show="show"
        :z-index="zIndex - 1" />
    </div>
  </transition>
</template>

<script>
import BsProgress from "./BsProgress";
import BsOverlay from "./BsOverlay";
import Helper from "../../utils/Helper";

export default {
    name: "BsMaskLoader",
    components: {BsProgress, BsOverlay},
    props: {
        /**
         * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
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
         * Backdrop overlay opacity value.
         * @type {number|*}
         */
        overlayOpacity: {
            type: Number,
            default: 0.4
        },
        /**
         * Backdrop overlay color.
         * @type {string|*}
         */
        overlayColor: {
            type: String,
            default: '#000'
        },
        /**
         * The animation transition to be used when displaying the mask loader.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: 'fade'
        },
        /**
         * Mask loader spinner color.
         * @type {string|*}
         */
        spinnerColor: {
            type: String,
            default: BsProgress.props.color.default
        },
        /**
         * Mask loader spinner diameter.
         * @type {number|*}
         */
        spinnerDiameter: {
            type: [Number, String],
            default: 35,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Mask loader spinner thickness.
         * @type {number|*}
         */
        spinnerThickness: {
            type: [Number, String],
            default: 5,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Mask loader spinner type.
         * @type {string|*}
         */
        spinnerType: {
            type: String,
            default: 'linear',
            validator: v => ['linear', 'progress', 'spinner', 'grow'].includes(v)
        },
        /**
         * Sets the css style `z-index` value.
         * @type {number|*}
         */
        zIndex: {
            type: [Number, String],
            default: 100,
            validator: v => !isNaN(parseInt(v, 10))
        },
    },
    data: () => ({
        svgPathData: 'M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z',
    }),
    computed: {
        _bsSpinnerStyles() {
            return {
                'border-width': this.isLinear ? Helper.sizeUnit(this.spinnerThickness) : null,
                'height': Helper.sizeUnit(this.spinnerDiameter),
                'width': Helper.sizeUnit(this.spinnerDiameter),
            }
        },
        _bsSpinnerClasses() {
            return {
                'spinner-grow': this.isGrow,
                'spinner-border': this.isLinear,
                ['text-' + this.spinnerColor]: this.spinnerColor
            }
        },
        _spinnerClasses() {
            return {
                'align-self-center': true,
                'md-spinner-rotate': true,
                ['text-' + this.spinnerColor]: this.spinnerColor
            }
        },
        _spinnerStyles() {
            return {
                'height': Helper.sizeUnit(this.spinnerDiameter),
                'width': Helper.sizeUnit(this.spinnerDiameter),
            };
        },
        _wrapperStyles() {
            return {
                'z-index': this.zIndex,
                'position': this.fixedPosition ? 'fixed' : null
            };
        },
        isLinear() {
            return this.spinnerType === 'linear';
        },
        isProgress() {
            return this.spinnerType === 'progress';
        },
        isSpinner() {
            return this.spinnerType === 'spinner';
        },
        isGrow() {
            return this.spinnerType === 'grow';
        },
    },
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-mask-loader {
    @include flexbox((display: flex, align-items: center, justify-content: center));
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: absolute;

    > .#{$prefix}-spinner-rotate {
        animation: md-progress-spinner-rotate 1.5s linear infinite;
    }
}
</style>
