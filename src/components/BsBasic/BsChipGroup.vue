<template>
  <div :class="{'md-chip-group--column': column}" class="md-chip-group">
    <div
      v-if="_showSliderArrows" 
      class="md-chip-slide-prev">
      <transition name="fade">
        <bs-button
          :color="arrowsColor"
          :disabled="!_hasPrev"
          mode="icon"
          flat
          @click="_scrollTo('prev')">
          <bs-icon 
            icon="chevron-left"
            size="24" />
        </bs-button>
      </transition>
    </div>
    <div ref="wrapper" class="md-chip-group-slider">
      <div ref="content" class="md-chip-group-content">
        <template v-for="item in items">
          <bs-chip
            :key="item.text"
            v-bind="_chipAttrs(item)"
            @click="_chipClick(item)"
            @close="$emit('item-close', item)">
            {{ item.text }}
          </bs-chip>
        </template>
      </div>
    </div>
    <div
      v-if="_showSliderArrows" 
      class="md-chip-slide-next">
      <transition name="fade">
        <bs-button
          :color="arrowsColor"
          :disabled="!_hasNext"
          mode="icon"
          flat
          @click="_scrollTo('next')">
          <bs-icon 
            icon="chevron-right"
            size="24" />
        </bs-button>
      </transition>
    </div>
  </div>
</template>

<script>
import BsChip from "./BsChip";
import BsButton from "../BsButton/BsButton";

export default {
    name: "BsChipGroup",
    components: {BsChip, BsButton},
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        /**
         * Css class to apply when the chip is in active state.
         * @type {string|*}
         */
        activeClass: {
            type: String,
            default: undefined
        },
        /**
         * Predefine color when Chip is in active state.
         * @type {string|*}
         */
        activeColor: {
            type: String,
            default: undefined
        },
        /**
         * The default Chips color to apply.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'light-grey'
        },
        /**
         * Show checked icon when the Chip is selected.
         * @type {boolean|*}
         */
        checkedIcon: {
            type: Boolean,
            default: false
        },
        /**
         * Enable multi rows if total width of items beyond the container width.
         * @type {boolean|*}
         */
        column: {
            type: Boolean,
            default: false
        },
        /**
         * Create Chip's avatar with circle shape.
         * @type {boolean|*}
         */
        imgCircle: {
            type: Boolean,
            default: true
        },
        /**
         * Adjust Chip's avatar size to match the Chip height by eliminating the margin around the avatar.
         * @type {boolean|*}
         */
        imgPadding: {
            type: Boolean,
            default: true
        },
        /**
         * Remove Chip's circle edges.
         * @type {boolean|*}
         */
        label: {
            type: Boolean,
            default: false
        },
        /**
         * Allow multiple selection or not.
         * @type {boolean|*}
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * Render Chips with outlined style or not.
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Create Chip with predefined size, valid values are: `sm` (small), `lg` (large).
         * @type {string|*}
         */
        size: {
            type: String,
            default: undefined,
            validator: (value) => ['sm', 'lg'].includes(value)
        },
        /**
         * Slider button color appearance.
         * @type {string|*}
         */
        arrowsColor: {
            type: String,
            default: 'secondary'
        },
        /**
         * Show slider's button or not.
         * @type {boolean|*}
         */
        sliderArrows: {
            type: Boolean,
            default: false
        },
        /**
         * The collection of `<bs-chip>` property-value.
         * @type {Array|*}
         */
        items: {
            type: Array,
            default: undefined,
            required: true
        },
        /**
         * The value monitored by `v-model` for the selected items.
         * @type {boolean|*}
         */
        value: {
            type: [Array, String, Number],
            default: undefined
        },
    },
    data: () => ({
        scrollOffset: 0,
        widths: {
            content: 0,
            wrapper: 0,
        },
    }),
    computed: {
        /**
         * Get Slider arrows status.
         *
         * @returns {boolean} Show slider arrows or not
         * @private
         */
        _showSliderArrows() {
            return this.sliderArrows && !this.column;
        },
        /**
         * Get Slider container status.
         *
         * @returns {boolean} Can slide for next item or not
         * @private
         */
        _hasNext() {
            const { content, wrapper } = this.widths;
            // Check one scroll ahead to know the width of right-most item
            return content > Math.abs(this.scrollOffset) + wrapper;
        },
        /**
         * Get Slider container status.
         *
         * @returns {boolean} Can slide for previous item or not
         * @private
         */
        _hasPrev() {
            return this.scrollOffset !== 0;
        },
    },
    watch: {
        scrollOffset(val) {
            this.$refs.content.style.transform = `translateX(${-val}px)`;
        },
    },
    mounted() {
        this._calculateWidths();
    },
    methods: {
        /**
         * Calculate slider container width and items content width.
         *
         * @returns {void}
         * @private
         */
        _calculateWidths() {
            const { content, wrapper } = this.$refs;

            this.widths = {
                content: content ? content.clientWidth : 0,
                wrapper: wrapper ? wrapper.clientWidth : 0,
            };
        },
        /**
         * Calculate scroll offset.
         *
         * @param {string} direction            Sliding direction
         * @param {Object} widths               Slider container width
         * @param {number} currentScrollOffset  Current scroll offset
         * @returns {number} Scroll offset
         * @private
         */
        _calculateNewOffset(direction, widths, currentScrollOffset) {
            const newAbsoluteOffset = currentScrollOffset + (direction === 'prev' ? -1 : 1) * widths.wrapper;

            return Math.max(Math.min(newAbsoluteOffset, widths.content - widths.wrapper), 0);
        },
        /**
         * Set chip attributes.
         *
         * @param {Object} item  Chip item
         * @returns {Object} Chip attributes
         * @private
         */
        _chipAttrs(item) {
            const matched = this.value
                ? (Array.isArray(this.value) ? this.value.includes(item.text) : this.value === item.text)
                : false;

            let attrs = {
                color: this.color,
                size: this.size,
                label: this.label,
                outlined: this.outlined,
                activeClass: this.activeClass,
                activeColor: this.activeColor,
                imgCircle: this.imgCircle,
                imgPadding: this.imgPadding,
                active: matched,
                ...item,
            }
            delete attrs['value'];
            delete attrs['text'];

            if (this.checkedIcon && matched) {
                attrs['icon'] = 'bs-checked';
            }

            return attrs;
        },
        /**
         * Handle event when a chip is clicked.
         *
         * @param {Object} item  Chip item
         * @returns {void}
         * @private
         */
        _chipClick(item) {
            if (item.disabled) {
                return;
            }

            if (this.multiple) {
                let selected = this.value || [];

                if (this.value && selected.includes(item.text)) {
                    selected = this.value.filter(v => item.text !== v);
                } else {
                    selected.push(item.text);
                }

                this.$emit('change', selected);
            } else {
                this.$emit('change', (this.value !== item.text ? item.text : null));
            }
        },
        /**
         * Handle event when a slider arrow is clicked.
         *
         * @param {string} direction  Sliding direction
         * @returns {void}
         * @private
         */
        _scrollTo(direction) {
            this.scrollOffset = this._calculateNewOffset(direction, {
                // Force reflow
                content: this.$refs.content ? this.$refs.content.clientWidth : 0,
                wrapper: this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0,
            }, this.scrollOffset);
        },
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

.#{$prefix}-chip-group-slider {
    @include flexbox((display: flex, flex: 1 1 auto));
    contain: content;
    overflow: auto hidden;

    > .#{$prefix}-chip-group-content {
        @include flexbox((display: flex, flex: 1 0 auto));
        @include transition(.3s $md-transition-stand-timing);
        padding: .25rem 0;   // 4px 0;
        position: relative;
        white-space: nowrap;

        .#{$prefix}-chip {
            margin: .25rem $padding-sm .25rem 0;
        }
    }
}

.#{$prefix}-chip-group {
    @include flexbox((display: flex, flex: 0 1 auto));
    @include transition(.3s $md-transition-stand-timing);
    position: relative;
    max-width: 100%;

    > .#{$prefix}-chip-slide-prev,
    > .#{$prefix}-chip-slide-next {
        @include flexbox((display: flex, flex: 0 1 52px, align-items: center, justify-content: center));
        min-width: 52px;
    }

    &.#{$prefix}-chip-group--column {
        .#{$prefix}-chip-group-content {
            @include flex-wrap(wrap);
            max-width: 100%;
            white-space: normal;
        }
    }

    @include media-breakpoint-up(lg) {
        > .#{$prefix}-chip-group-slider {
            overflow: hidden;
        }
    }
}
</style>
