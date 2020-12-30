<template>
  <div
    :class="_classNames"
    :style="_styles"
    class="md-list-tile-leading">
    <slot></slot>
    <template v-if="!$slots.default">
      <bs-avatar
        v-if="imgSrc"
        :circle="circle"
        :img-src="imgSrc"
        :rounded="rounded"
        :size="size" />
      <bs-icon
        v-else-if="icon && isInternal"
        v-bind="_bsIconAttributes" />
      <font-awesome-icon
        v-else-if="icon"
        v-bind="iconAttributes"
        :style="_iconStyles" />
    </template>
  </div>
</template>

<script>
import BsAvatar from "../BsBasic/BsAvatar";
import Image from "../../mixins/Image";
import IconMixin from "../BsBasic/mixins/IconMixin";

export default {
    name: "BsListTileLeading",
    components: {BsAvatar},
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
         * Get BsIcon binding attributes.
         *
         * @returns {Object|*} The icon attributes
         * @private
         */
        _bsIconAttributes() {
            return {
                ...this.iconAttributes,
                size: this._bsIconSize
            }
        },
        _bsIconSize() {
            if (!this.size || parseInt(this.size, 10) === 48) {
                return 24;
            }

            return this.imageSizeStyles.width;
        },
    },
}
</script>

<style scoped>

</style>
