<template>
  <svg
    :class="imageClass"
    :height="_szHeight"
    :width="_szWidth"
    focusable="false"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    xmlns="http://www.w3.org/2000/svg">
    <title v-if="placeHolder">{{ placeHolder }}</title>
    <rect
      width="100%"
      height="100%"
      :fill="bgColor" />
    <text
      v-if="placeHolder && placeHolder !== ''"
      :fill="textColor"
      :x="xPos"
      :y="yPos">
      {{ placeHolder }}
    </text>
  </svg>
</template>

<script>
import Image from "../../mixins/Image";
import Helper from "../../utils/Helper";

export default {
    name: "BsImageHolder",
    mixins: [Image],
    props: {
        /**
         * ImageHolder height.
         * @type {string|number|*}
         */
        height: {
            type: [String, Number],
            default: undefined
        },
        /**
         * ImageHolder width.
         * @type {string|number|*}
         */
        width: {
            type: [String, Number],
            default: '100%'
        },
        /**
         * Shortcut to create ImageHolder with equal height and width.
         * @type {string|number|*}
         */
        size: {
            type: [Number, String],
            default: undefined
        },
        /**
         * ImageHolder background color, must be in html hex coloring number.
         * @type {string|*}
         */
        bgColor: {
            type: String,
            default: '#868e96'
        },
        /**
         * ImageHolder background color, must be in html hex coloring number.
         * @type {string|*}
         */
        textColor: {
            type: String,
            default: '#dee2e6'
        },
        /**
         * Short text as place holder.
         * @type {string|*}
         */
        placeHolder: {
            type: String,
            default: undefined
        },
        /**
         * Text placeholder X position.
         * @type {string|number|*}
         */
        xPos: {
            type: [String, Number],
            default: '15%'
        },
        /**
         * Text placeholder Y position.
         * @type {string|number|*}
         */
        yPos: {
            type: [String, Number],
            default: '50%'
        },
    },
    computed: {
        _szHeight() {
            if (this.size) {
                return Helper.sizeUnit(this.size);
            }

            return Helper.sizeUnit(this.height);
        },
        _szWidth() {
            if (this.size) {
                return Helper.sizeUnit(this.size);
            }

            return Helper.sizeUnit(this.width);
        }
    },
}
</script>

<style scoped>

</style>
