<template>
  <div
    :is="tag"
    :class="_classNames"
    @mousedown.passive="event => eventTrigger && startRipple(event)"
    @mouseleave.passive="_endRipple"
    @mouseup.passive="_endRipple"
    @touchcancel.passive="_endRipple"
    @touchend.passive="_endRipple"
    @touchmove.passive="event => eventTrigger && _touchMoveCheck(event)"
    @touchstart.passive="event => eventTrigger && _touchStartCheck(event)">
    <slot></slot>
    <template v-if="!disabled">
      <bs-wave
        v-for="ripple in ripples"
        :key="ripple.uuid"
        :class="_rippleClassname"
        :style="ripple.waveStyles" />
    </template>
  </div>
</template>

<script>
import raf from 'raf';
import BsWave from './BsWave';
import Helper from '../../utils/Helper';

export default {
    name: 'BsRipple',
    components: {BsWave},
    props: {
        /**
         * Ripple animation state.
         * @type {boolean|*}
         */
        active: {
            type: [Boolean, Event],
            default: false
        },
        /**
         * Start animation from center or from mouse click position.
         * If true then animation always start from center, otherwise animation
         * will start from mouse click position.
         * @type {boolean|*}
         */
        centered: {
            type: Boolean,
            default: false
        },
        /**
         * Enable or disable ripple animation.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Start animation on mousedown/touch-event.
         * @type {boolean|*}
         */
        eventTrigger: {
            type: Boolean,
            default: true
        },
        /**
         * Html tag used to render the component.
         * @type {string|*}
         */
        tag: {
            type: String,
            default: 'div'
        }
    },
    data: () => ({
        ripples: [],
        touchTimeout: null,
        eventType: null
    }),
    computed: {
        _classNames() {
            return {
                'md-ripple': true,
                'ripple-off': this.disabled
            }
        },
        _rippleClassname() {
            return {
                'md-centered': this.centered
            }
        },
    },
    watch: {
        active(handler) {
            const isBoolean = typeof handler === 'boolean';
            const isEvent   = handler.constructor.toString().match(/function (\w*)/)[1].toLowerCase() === 'mouseevent';

            if (isBoolean && this.centered && handler) {
                this.startRipple({
                    type: 'mousedown'
                })
            } else if (isEvent) {
                this.startRipple(handler);
            }

            this.$emit('update:active', false);
        }
    },
    beforeDestroy() {
        this.ripples = null;
    },
    methods: {
        _applyStyles(position, size) {
            const unitSize = Helper.sizeUnit(size);

            return {
                ...position,
                width: unitSize,
                height: unitSize
            };
        },
        _endRipple() {
            Helper.defer(() => {
                if (Helper.isArray(this.ripples) && this.ripples.length > 0) {
                    this.ripples.shift();
                }
            }, 500);
        },
        _getCenteredPosition(size) {
            const halfSize = -size / 2 + 'px';

            return {
                'margin-top': halfSize,
                'margin-left': halfSize
            }
        },
        _getSize() {
            const {offsetWidth, offsetHeight} = this.$el;

            return Math.round(Math.max(offsetWidth, offsetHeight));
        },
        _getHitPosition(event, elementSize) {
            const rect = this.$el.getBoundingClientRect();
            let top    = event.pageY;
            let left   = event.pageX;

            if (event.type === 'touchstart') {
                top  = event.changedTouches[0].pageY;
                left = event.changedTouches[0].pageX;
            }

            return {
                top: (top - rect.top - elementSize / 2 - document.documentElement.scrollTop) + 'px',
                left: (left - rect.left - elementSize / 2 - document.documentElement.scrollLeft) + 'px'
            }
        },
        _touchMoveCheck() {
            window.clearTimeout(this.touchTimeout);
        },
        _touchStartCheck(event) {
            this.touchTimeout = window.setTimeout(() => {
                this.startRipple(event);
            }, 100);
        },
        startRipple(event) {
            raf(() => {
                const {eventType, disabled, centered} = this;

                if (!disabled && (!eventType || eventType === event.type)) {
                    let position;
                    let size     = this._getSize();

                    if (centered) {
                        position = this._getCenteredPosition(size);
                    } else {
                        position = this._getHitPosition(event, size);
                    }

                    this.eventType = event.type;
                    this.ripples = [{
                        waveStyles: this._applyStyles(position, size),
                        uuid: Helper.uuid()
                    }];
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
