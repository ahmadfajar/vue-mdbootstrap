<template>
  <transition v-if="isProgressBar"
              name="md-progress-bar"
              appear>
    <div class="md-progress-bar" :class="progressBarClassNames" :style="progressBarStyles">
      <div class="md-progress-bar-track" :style="progressBarTrackStyle"></div>
      <div class="md-progress-bar-fill" :style="progressBarValueStyle"></div>
      <div class="md-progress-bar-buffer" :Style="progressBarBufferStyle"></div>
    </div>
  </transition>
  <transition v-else
              name="md-progress-spinner"
              appear>
    <div class="md-progress-spinner" :class="spinnerClassNames">
      <svg class="md-progress-spinner-draw"
           preserveAspectRatio="xMidYMid meet"
           focusable="false"
           :viewBox="`0 0 ${diameter} ${diameter}`"
           :style="svgStyles">
        <circle :r="circleRadius"
                :style="circleStyles"
                class="md-progress-spinner-circle"
                cx="50%"
                cy="50%" />
      </svg>
    </div>
  </transition>
</template>

<script>
import INDETERMINATE_ANIMATION_TEMPLATE from './mixins/ProgressSpinnerAnimation';

const progressSpinner = {
    styleTag: null,
    diameters: new Set()
};

export default {
    name: "BsProgress",
    props: {
        value: {
            type: Number,
            default: 0
        },
        diameter: {
            type: Number,
            default: 60
        },
        height: {
            type: Number,
            default: 5
        },
        stroke: {
            type: Number,
            default: 6
        },
        buffer: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: 'primary'
        },
        mode: {
            type: String,
            default: 'indeterminate',
            validator(value) {
                return ['determinate', 'indeterminate'].indexOf(value) !== -1;
            }
        },
        type: {
            type: String,
            default: 'spinner',
            validator(value) {
                return ['spinner', 'bar'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        hasAmountFill() {
            return this.isBuffer || this.isDeterminate
        },
        isDeterminate() {
            return this.mode.toLowerCase() === 'determinate';
        },
        isIndeterminate() {
            return this.mode.toLowerCase() !== 'determinate';
        },
        isIE() {
            if (!this.$isServer) {
                return navigator.userAgent.toLowerCase().includes('trident')
            }

            return false
        },
        isProgressBar() {
            return this.type.toLowerCase() === 'bar';
        },
        progressBarClassNames() {
            return [
                'progress-bar-' + this.color,
                this.isDeterminate ? 'md-determinate' : 'md-indeterminate'
            ]
        },
        progressBarBufferStyle() {
            if (this.hasAmountFill) {
                return `left: calc(${this.buffer}% + 8px)`;
            }

            return null;
        },
        progressBarStyles() {
            return `height: ${this.height}px`;
        },
        progressBarTrackStyle() {
            if (this.hasAmountFill) {
                return `width: ${this.buffer}%`;
            }
            return null;
        },
        progressBarValueStyle() {
            if (this.hasAmountFill) {
                return `width: ${this.value}%`;
            }
            return null;
        },
        spinnerClassNames() {
            let animationClass = 'md-progress-spinner-indeterminate';

            if (this.isIE) {
                animationClass += '-fallback';
            }

            return [
                animationClass,
                'spinner-' + this.color,
                this.isDeterminate ? 'md-determinate' : 'md-indeterminate'
            ]
        },
        svgStyles() {
            const size = `${this.diameter}px`;

            return {
                width: size,
                height: size
            }
        },
        circleStyles() {
            return {
                'stroke-dashoffset': this.circleStrokeDashOffset,
                'stroke-dasharray': this.circleStrokeDashArray,
                'stroke-width': this.circleStrokeWidth,
                'animation-name': 'md-progress-spinner-stroke-rotate-' + this.diameter
            }
        },
        circleRadius() {
            return (this.diameter - this.stroke) / 2
        },
        circleStrokeWidth() {
            return this.stroke + 'px'
        },
        circleCircumference() {
            return 2 * Math.PI * this.circleRadius
        },
        circleStrokeDashArray() {
            return this.circleCircumference + 'px'
        },
        circleStrokeDashOffset() {
            if (this.isDeterminate) {
                return this.circleCircumference * (100 - this.value) / 100 + 'px'
            }

            if (this.isIndeterminate && this.isIE) {
                return this.circleCircumference * 0.2 + 'px'
            }

            return null
        }
    },
    watch: {
        diameter() {
            this.attachStyleTag();
        }
    },
    methods: {
        getAnimationCSS() {
            return INDETERMINATE_ANIMATION_TEMPLATE
                .replace(/START_VALUE/g, `${0.95 * this.circleCircumference}`)
                .replace(/END_VALUE/g, `${0.2 * this.circleCircumference}`)
                .replace(/DIAMETER/g, `${this.diameter}`);
        },
        attachStyleTag() {
            let styleTag = progressSpinner.styleTag;

            if (!styleTag) {
                styleTag = document.getElementById('md-progress-spinner-styles');
            }

            if (!styleTag) {
                styleTag = document.createElement('style');

                styleTag.id = 'md-progress-spinner-styles';
                document.head.appendChild(styleTag);
                progressSpinner.styleTag = styleTag;
            }

            if (styleTag && styleTag.sheet) {
                styleTag.sheet.insertRule(this.getAnimationCSS(), 0);
            }

            progressSpinner.diameters.add(this.diameter);
        }
    },
    mounted() {
        this.attachStyleTag()
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/mixins";

@keyframes md-progress-spinner-rotate {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}

@keyframes md-progress-spinner-initial-rotate {
  0% {
    opacity: 0;
    transform: rotate(-90deg) translateZ(0);
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: rotate(270deg) translateZ(0);
  }
}

@keyframes md-progress-spinner-stroke-rotate-fallback {
  0% {
    transform: rotate(0)
  }
  25% {
    transform: rotate(1170deg)
  }
  50% {
    transform: rotate(2340deg)
  }
  75% {
    transform: rotate(3510deg)
  }
  100% {
    transform: rotate(4680deg)
  }
}

@keyframes md-progress-bar-indeterminate-track {
  0% {
    transform: translateX(0)
  }
  20% {
    animation-timing-function: cubic-bezier(.5, 0, .70, .5);
    transform: translateX(0)
  }
  60% {
    animation-timing-function: cubic-bezier(.30, .38, .55, .96);
    transform: translateX(83.67%)
  }
  100% {
    transform: translateX(200.61%)
  }
}

@keyframes md-progress-bar-indeterminate-track-alternate {
  0% {
    transform: scaleX(.08)
  }
  35% {
    animation-timing-function: cubic-bezier(.33, .12, .79, 1);
    transform: scaleX(.08)
  }
  70% {
    animation-timing-function: cubic-bezier(.06, .11, .6, 1);
    transform: scaleX(.66)
  }
  100% {
    transform: scaleX(.08)
  }
}

@keyframes md-progress-bar-indeterminate-fill {
  0% {
    animation-timing-function: cubic-bezier(.15, 0, .52, .41);
    transform: translateX(0)
  }
  25% {
    animation-timing-function: cubic-bezier(.31, .28, .8, .73);
    transform: translateX(37.65%)
  }
  50% {
    animation-timing-function: cubic-bezier(.4, .63, .6, .90);
    transform: translateX(84.39%)
  }
  100% {
    transform: translateX(160.28%)
  }
}

@keyframes md-progress-bar-indeterminate-fill-alternate {
  0% {
    animation-timing-function: cubic-bezier(.15, 0, .52, .41);
    transform: scaleX(.08)
  }
  20% {
    animation-timing-function: cubic-bezier(.31, .28, .8, .73);
    transform: scaleX(.46)
  }
  45% {
    animation-timing-function: cubic-bezier(.4, .63, .6, .90);
    transform: scaleX(.73)
  }
  100% {
    transform: scaleX(.08)
  }
}

@keyframes md-progress-bar-buffer {
  to {
    transform: translate3D(-8px, 0, 0);
  }
}

.#{$prefix}-progress-spinner {
  display: inline-flex;
  position: relative;

  &.#{$prefix}-indeterminate {
    animation: md-progress-spinner-rotate 2s linear infinite;

    &.#{$prefix}-progress-spinner-enter,
    &.#{$prefix}-progress-spinner-leave-active {
      transition-duration: .4s;

      .#{$prefix}-progress-spinner-draw {
        opacity: 0;
        transform: scale(.1);
      }
    }

    .#{$prefix}-progress-spinner-circle {
      animation: 4s infinite $md-transition-stand-timing;
    }
  }

  &.#{$prefix}-determinate {
    &.#{$prefix}-progress-spinner-enter-active,
    &.#{$prefix}-progress-spinner-leave-active {
      transition-duration: 2s;

      .#{$prefix}-progress-spinner-draw {
        animation: md-progress-spinner-initial-rotate 1.98s $md-transition-stand-timing forwards;
      }
    }

    .#{$prefix}-progress-spinner-draw {
      transition: none;
    }
  }

  > .#{$prefix}-progress-spinner-draw {
    overflow: visible;
    transform: scale(1) rotate(-90deg);
    transform-origin: center;
    transition: .4s $md-transition-stand-timing;
    will-change: opacity, transform;
  }

  .#{$prefix}-progress-spinner-circle {
    fill: none;
    transform-origin: center;
    transition: stroke-dashoffset .25s $md-transition-stand-timing;
    will-change: stroke-dashoffset, stroke-dasharray, stroke-width, animation-name, r;
  }
}

.#{$prefix}-progress-bar {
  overflow: hidden;
  position: relative;
  transform: translateZ(0) scaleY(1);
  transform-origin: center center;
  transition: opacity .3s $md-transition-default-timing, transform .4s $md-transition-default-timing;
  will-change: opacity, transform;

  &.#{$prefix}-indeterminate,
  &.#{$prefix}-query {
    .#{$prefix}-progress-bar-track {
      left: -150%;
      animation: md-progress-bar-indeterminate-track 2s infinite linear;

      &:after {
        animation: md-progress-bar-indeterminate-track-alternate 2s infinite linear;
      }
    }

    .#{$prefix}-progress-bar-fill {
      left: -55%;
      animation: md-progress-bar-indeterminate-fill 2s infinite linear;

      &:after {
        animation: md-progress-bar-indeterminate-fill-alternate 2s infinite linear;
      }
    }
  }

  &.#{$prefix}-determinate,
  &.#{$prefix}-buffer {
    .#{$prefix}-progress-bar-fill,
    .#{$prefix}-progress-bar-track,
    .#{$prefix}-progress-bar-buffer {
      transition: .25s $md-transition-stand-timing;
    }
  }

  &.#{$prefix}-determinate {
    .#{$prefix}-progress-bar-track {
      display: none;
    }
  }

  &.#{$prefix}-buffer {
    .#{$prefix}-progress-bar-buffer {
      border-top: 4px dotted;
      animation: md-progress-bar-buffer .25s infinite linear;
    }
  }

  &.#{$prefix}-query {
    transform: rotateZ(180deg);
  }

  > .#{$prefix}-progress-bar-buffer,
  > .#{$prefix}-progress-bar-track,
  > .#{$prefix}-progress-bar-fill {
    transform-origin: top left;

    &, &:after {
      width: 100%;
      height: 100%;
      position: absolute;
      will-change: transform;
    }

    &:after {
      display: inline-block;
      left: 0;
      content: " "
    }
  }
}

.#{$prefix}-progress-bar-enter,
.#{$prefix}-progress-bar-leave-active {
  opacity: .5;
  transform: translateZ(0) scaleY(0);
}

@each $name, $color in $theme-colors {
  @include make-progress-bar($name, $color);
}

@each $name, $color in $theme-colors {
  @include make-progress-spinner($name, $color);
}
</style>
