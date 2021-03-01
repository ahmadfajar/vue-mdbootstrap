<template>
  <div
    :class="_classNames"
    class="md-menu"
    @keydown="_changeListIndex">
    <div
      ref="activator"
      class="md-menu-activator"
      @click="activatorClick"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave">
      <slot></slot>
    </div>
    <bs-popover
      ref="popover"
      :class="{['bg-' + color] : color}"
      :cover="cover"
      :open="active"
      :placement="placement"
      :style="popoverStyles"
      :transition="transition"
      :trigger="trigger"
      class="md-menu-popover md-shadow-1"
      @click="_onContentClick"
      @close="hideMenu"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave">
      <slot name="content"></slot>
    </bs-popover>
  </div>
</template>

<script>
import BsPopover from "../BsPopover/BsPopover";
import MenuAble from "../../mixins/MenuAble";
import "../../../scss/utilities/_shadows.scss";

export default {
    name: "BsMenu",
    components: {BsPopover},
    mixins: [MenuAble],
    model: {
        prop: 'open',
        event: 'open'
    },
    props: {
        /**
         * Display popup menu at a position which can cover the activator.
         * @type {boolean|*}
         */
        cover: {
            type: Boolean,
            default: false
        },
        /**
         * Popup container background color.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'white',
        },
        /**
         * Popup menu display placement.
         * @type {string|*}
         */
        placement: {
            type: String,
            default: BsPopover.props.placement.default
        },
        /**
         * Transition animation when show popup menu. This animation is effected by `placement` prop.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: BsPopover.props.transition.default
        },
        /**
         * TClose or hide popup menu when content clicked.
         * @type {boolean|*}
         */
        contentClickClose: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        tiles: [],
        trigger: null
    }),
    computed: {
        _classNames() {
            return {
                'md-open': this.open,
                'md-disabled': this.disabled
            }
        },
        popoverStyles() {
            return {
                'min-width': this.trigger ? this.trigger.offsetWidth + 'px' : ''
            }
        }
    },
    watch: {
        listIndex(next, prev) {
            if (next in this.tiles) {
                const tile = this.tiles[next];
                tile.classList.add('md-active');
                this.$refs.popover.$el.scrollTop = tile.offsetTop - tile.clientHeight;
            }

            prev in this.tiles && this.tiles[prev].classList.remove('md-active');
        }
    },
    mounted() {
        this.trigger = this.$refs.activator;
    },
    methods: {
        /**
         * Keyboard event handler.
         *
         * @param {KeyboardEvent} e Keyboard event
         * @returns {void}
         * @private
         */
        _changeListIndex(e) {
            if (['arrowdown', 'arrowup', 'enter'].includes(e.key.toLowerCase())) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (['escape', 'tab'].includes(e.key.toLowerCase())) {
                this.active = false;
            }
            // For infinite scroll and autocomplete, re-evaluate children
            this._getTiles();

            if (e.key.toLowerCase() === 'arrowdown' && this.listIndex < this.tiles.length - 1) {
                this.listIndex++;
            } else if (e.key.toLowerCase() === 'arrowup' && this.listIndex > -1) {
                // Allow user to set listIndex to -1 so that the list can be un-highlighted
                this.listIndex--;
            } else if (e.key.toLowerCase() === 'enter' && this.listIndex !== -1) {
                this.tiles[this.listIndex].click();
                this.active = false;
            }
        },
        /**
         * Get list elements.
         *
         * @returns {void}
         * @private
         */
        _getTiles() {
            this.tiles = this.$refs.popover.$el.querySelectorAll('.md-list-tile');
        },
        /**
         * Handler when content body is clicked.
         *
         * @returns {void}
         * @private
         */
        _onContentClick() {
            if (this.contentClickClose) {
                this.active = false;
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-menu {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    .#{$prefix}-menu-activator {
        @include align-items(center);
        cursor: pointer;
        height: 100%;
        position: relative;

        input[readonly] {
            cursor: pointer;
        }

        .disabled & {
            cursor: default;
            pointer-events: none;
        }
    }
}

.#{$prefix}-menu-popover {
    @include border-radius($border-radius-base);

    > .#{$prefix}-list {
        @include border-radius($border-radius-base);

        .#{$prefix}-list-tile {
            > .#{$prefix}-ripple {
                min-height: 24px;
            }
        }

        .#{$prefix}-divider {
            margin-bottom: 3px;
            margin-top: 3px;
        }
    }
}

.#{$prefix}-menu-toggle-icon {
    transition: transform .3s cubic-bezier(.23, 1, .32, 1);

    .#{$prefix}-open & {
        transform: rotate(180deg);
    }
}
</style>
