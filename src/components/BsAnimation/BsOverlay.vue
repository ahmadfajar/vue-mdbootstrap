<template>
  <transition name="fade">
    <div v-if="show"
         :style="overlayStyle"
         class="md-overlay"
         @click="handleClick"
         @touchmove="prevent">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
    name: "BsOverlay",
    props: {
        color: {
            type: String,
            default: undefined
        },
        fixed: {
            type: Boolean,
            default: false
        },
        opacity: {
            type: Number,
            default: 0.4
        },
        onClick: {
            type: Function,
            default: undefined
        },
        show: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: undefined
        }
    },
    computed: {
        overlayStyle() {
            return {
                'opacity': this.opacity,
                'background-color': this.color,
                'position': this.fixed ? 'fixed' : '',
                'z-index': this.zIndex
            };
        }
    },
    methods: {
        prevent(event) {
            event.preventDefault();
            event.stopPropagation();
        },
        handleClick() {
            if (this.onClick) {
                this.onClick();
            }
        }
    },
}
</script>

<style lang="scss">
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .#{$prefix}-overlay {
    background-color: $black;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: .4;
    position: absolute;
    z-index: 1000;
  }
</style>
