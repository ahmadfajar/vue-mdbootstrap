<template>
  <div :class="_classNames" :style="_styles"></div>
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsSpacer",
    props: {
        /**
         * Sets component width to fill the available space or not.
         * @type {boolean|*}
         */
        fill: {
            type: Boolean,
            default: true
        },
        /**
         * Sets component width.
         * @type {number|string|*}
         */
        width: {
            type: [Number, String],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {Object|*} Component css classes
         * @private
         */
        _classNames() {
            return {
                'flex-grow-1': this.fill && !this.width
            }
        },
        /**
         * Get component's css styles.
         *
         * @returns {Object} Inline css styles
         * @private
         */
        _styles() {
            return {
                width: this.width ? Helper.sizeUnit(this.width) : null
            }
        }
    }
}
</script>

<style scoped>

</style>
