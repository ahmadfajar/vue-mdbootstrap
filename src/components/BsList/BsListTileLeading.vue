<template>
  <div class="md-list-tile-leading"
       :class="_classNames"
       :style="_styles">
    <slot></slot>
    <template v-if="!$slots.default">
      <bs-avatar v-if="imgSrc"
                 :img-src="imgSrc"
                 :circle="circle"
                 :rounded="rounded"
                 :size="size" />
      <bs-icon v-else-if="icon && isInternal"
               :icon="iconName"
               :size="iconSize" />
      <font-awesome-icon v-else-if="icon"
                         :icon="iconName"
                         :style="_iconStyles" />
    </template>
  </div>
</template>

<script>
import BsAvatar from "../BsBasic/BsAvatar";
import Image from "../../mixins/Image";

export default {
    name: "BsListTileLeading",
    components: {BsAvatar},
    mixins: [Image],
    props: {
        /**
         * The icon to display as avatar. Use prefix `"bs-"` to use internal icon,
         * otherwise use valid [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|Array|*}
         */
        icon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * The image location to place inside component.
         * @type {string|*}
         */
        imgSrc: {
            type: String,
            default: undefined
        },
    },
    computed: {
        _classNames() {
            return {
                'align-self-center': this.center,
                'md-has-icon': this.icon
            }
        },
        _iconStyles() {
            if (this.icon && (!this.size || parseInt(this.size, 10) === 48)) {
                return {
                    height: '20px',
                    width: '20px'
                }
            }
            return this.imageSizeStyles;
        },
        _styles() {
            if (this.icon && (!this.size || parseInt(this.size, 10) === 48)) {
                return {
                    height: '24px',
                    width: '24px'
                }
            }

            return {
                width: this.imageSizeStyles.width
            };
        },
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
        iconSize() {
            if (!this.size || parseInt(this.size, 10) === 48) {
                return 24;
            }

            return this.imageSizeStyles.width;
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
    },
}
</script>

<style scoped>

</style>
