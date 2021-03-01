<template>
  <span
    v-if="imgSrc"
    :class="imageClass"
    class="md-avatar">
    <img
      v-on="$listeners"
      :class="imageClass"
      :src="imgSrc"
      :style="imageSizeStyles"
      alt="" />
  </span>
  <span v-bind="_avatarClass" v-else>
    <bs-icon
      v-if="icon && isInternal"
      v-bind="_bsIconAttributes" />
    <font-awesome-icon v-else-if="icon" v-bind="_faAttributes" />
    <span v-else class="md-avatar-text">{{ text }}</span>
  </span>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsIcon from "../BsIcon/BsIcon";
import Image from '../../mixins/Image';
import IconMixin from "./mixins/IconMixin";

export default {
    name: "BsAvatar",
    components: {FontAwesomeIcon, BsIcon},
    mixins: [Image, IconMixin],
    props: {
        /**
         * The image location to place inside component.
         * @type {string|*}
         */
        imgSrc: {
            type: String,
            default: undefined
        },
        /**
         * The text to display inside the component.
         * Use short text (1 to 3 characters) to properly display it. The text will be transformed to uppercase.
         * @type {string|*}
         */
        text: {
            type: String,
            default: undefined
        },
    },
    computed: {
        /**
         * Get computed component's css names and inline styles.
         *
         * @returns {Object|*} The collection of css classes and inline styles
         * @private
         */
        _avatarClass() {
            return {
                class: {
                    ...this.imageClass,
                    'md-avatar': true,
                    'p-2': this.circle && !this.rounded && this._size > 72
                },
                style: {
                    height: this.imageSizeStyles.height,
                    width: this.imageSizeStyles.width,
                }
            }
        },
        /**
         * Get BsIcon binding attributes.
         *
         * @returns {Object|*} The icon attributes
         * @private
         */
        _bsIconAttributes() {
            return {
                ...this.iconAttributes,
                size: this._iconSize
            }
        },
        /**
         * Get fontAwesome icon attributes.
         *
         * @returns {Object|*} The icon attributes
         * @private
         */
        _faAttributes() {
            return {
                ...this.iconAttributes,
                style: {
                    height: (this._iconSize - 4) + 'px',
                    width: (this._iconSize - 4) + 'px',
                }
            }
        },
        /**
         * Get computed icon's size.
         *
         * @returns {number} The icon size
         * @private
         */
        _iconSize() {
            if (this._size > 72) {
                return this._size - 20;
            } else if (this._size > 32) {
                return this._size - 12;
            } else {
                return this._size - 8;
            }
        },
        /**
         * Get computed component size.
         *
         * @returns {number} The component size
         * @private
         */
        _size() {
            if (typeof this.size === 'string') {
                return parseInt(this.size, 10);
            } else if (typeof this.size === 'number') {
                return this.size;
            } else {
                return this.size.height ? this.size.height : this.size.width;
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-avatar {
    @include flexbox((display: inline-flex, align-items: center, justify-content: center));
    font-weight: 400;
    font-size: 1rem;
    line-height: 1;
    max-width: 100%;
    vertical-align: middle;
    position: relative;

    > .#{$prefix}-avatar-text {
        @include flexbox((display: flex, align-items: center, justify-content: center));
        font-weight: $font-weight-bold;
        font-size: inherit;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-transform: uppercase;
    }
}
</style>
