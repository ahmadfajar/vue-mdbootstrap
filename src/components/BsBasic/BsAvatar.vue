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
        /**
         * The icon to display as avatar. Use prefix `"bs-"` to use internal icon,
         * otherwise use valid [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        icon: {
            type: String,
            default: undefined
        },
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * See [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome) for more information.
         * @type {string|number|*}
         */
        iconRotation: {
            type: [Number, String],
            default: undefined,
            validator: v => [90, 180, 270].includes(parseInt(v, 10))
        },
        /**
         * Apply **spin** animation to the icon.
         * See [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome) for more information.
         * @type {boolean|*}
         */
        iconSpin: {
            type: Boolean,
            default: false
        },
        /**
         * Apply **pulse** animation to the icon.
         * See [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome) for more information.
         * @type {boolean|*}
         */
        iconPulse: {
            type: Boolean,
            default: false
        },
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
         * Get computed icon name (real icon name).
         *
         * @returns {string} The icon name
         */
        iconName() {
            if (this.icon.substr(0, 3) === 'bs-') {
                return this.icon.substr(3);
            } else {
                return this.icon;
            }
        },
        /**
         * Check whether the icon name is internal icon or from
         * [FontAwesome Icon](https://fontawesome.com/icons?d=gallery&s=solid&m=free).
         *
         * @returns {boolean} `TRUE` if icon name is internal, otherwise `FALSE`
         */
        isInternal() {
            return this.icon.substr(0, 3) === 'bs-';
        },
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
         * Get fontAwesome icon attributes.
         *
         * @returns {Object|*} The icon attributes
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
