<template>
  <transition :name="transition">
    <div v-if="show" class="md-mask-loader" :style="_styles">
      <bs-progress class="align-self-center" :diameter="spinnerDiameter" :stroke="stroke" />
      <bs-overlay :show="show" :opacity="opacity" :z-index="zIndex - 1" />
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
        fixedPosition: Boolean,
        show: Boolean,
        opacity: {
            type: Number,
            default: 0.4
        },
        transition: {
            type: String,
            default: 'fade'
        },
        spinnerDiameter: {
            type: Number,
            default: 35,
            validator: v => !isNaN(parseInt(v, 10))
        },
        stroke: {
            type: Number,
            default: 5,
            validator: v => !isNaN(parseInt(v, 10))
        },
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
                'position': this.fixedPosition ? 'fixed' : 'absolute'
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
  z-index: 100;
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
