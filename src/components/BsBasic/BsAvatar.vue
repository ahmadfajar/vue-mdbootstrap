<template>
  <span v-if="imgSrc"
        class="md-avatar"
        :class="imageClass">
    <img class="md-avatar"
         :class="imageClass"
         :src="imgSrc"
         :style="imageSizeStyles"
         v-on="$listeners"
         alt="" />
  </span>
  <span v-bind="_avatarClass" v-else>
    <bs-icon v-if="icon && isInternal"
             :icon="iconName"
             :size="_iconSize" />
    <font-awesome-icon v-else-if="icon" v-bind="_faAttributes" />
    <span class="md-avatar-text" v-else>{{ text }}</span>
  </span>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsIcon from "../BsIcon/BsIcon";
import Image from '../../mixins/Image';

export default {
    name: "BsAvatar",
    mixins: [Image],
    components: {FontAwesomeIcon, BsIcon},
    props: {
        icon: {
            type: String,
            default: undefined
        },
        iconRotation: {
            type: [Number, String],
            default: undefined
        },
        iconSpin: {
            type: Boolean,
            default: false
        },
        iconPulse: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: undefined
        }
    },
    computed: {
        iconName() {
            if (this.icon.substr(0, 3) === 'bs-') {
                return this.icon.substr(3);
            } else {
                return this.icon;
            }
        },
        isInternal() {
            return this.icon.substr(0, 3) === 'bs-';
        },
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
        _size() {
            if (typeof this.size === 'string') {
                return parseInt(this.size, 10);
            } else if (typeof this.size === 'number') {
                return this.size;
            } else {
                return this.size.height ? this.size.height : this.size.width;
            }
        },
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
         * Get fontAwesome icon attributes.
         *
         * @returns {Object} The icon attributes
         * @private
         */
        _faAttributes() {
            return {
                icon: this.iconName,
                rotation: this.iconRotation,
                spin: this.iconSpin,
                pulse: this.iconPulse,
                style: {
                    height: (this._iconSize - 4) + 'px',
                    width: (this._iconSize - 4) + 'px',
                }
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
