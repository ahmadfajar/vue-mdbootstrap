<template>
  <transition name="md-ripple" appear>
    <span class="md-ripple-wave"></span>
  </transition>
</template>

<script>
export default {
    name: 'BsWave'
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-ripple {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    -webkit-mask-image: radial-gradient(circle, #fff 100%, #000 100%);
    mask-image: radial-gradient(circle, #fff 100%, #000 100%);
}

.#{$prefix}-ripple-wave {
    @include transform(scale(2) translateZ(0));
    background: currentColor;
    border-radius: 50%;
    pointer-events: none;
    position: absolute;
    opacity: 0;
    z-index: 1;

    &.#{$prefix}-centered {
        animation-duration: 1.2s;
        top: 50%;
        left: 50%;
    }

    ~ *:not(.#{$prefix}-ripple-wave) {
        position: relative;
        z-index: 2;
    }
}

.#{$prefix}-ripple-enter-active {
    @include transition(.8s $md-transition-stand-timing);
    @include transition-property(opacity, transform);
    will-change: opacity, transform;

    &.#{$prefix}-centered {
        @include transition-duration(1.2s);
    }
}

.#{$prefix}-ripple-enter {
    @include transform(scale(.26) translateZ(0));
    opacity: .26;
}
</style>
