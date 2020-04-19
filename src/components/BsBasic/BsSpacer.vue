<template>
  <div :class="_classNames" :style="_styles"></div>
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsSpacer",
    props: {
        fill: {
            type: Boolean,
            default: true
        },
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
         * @return {Object} Component css classes
         * @private
         */
        _classNames() {
            return {
                'flex-grow-1': this.fill
            }
        },
        /**
         * Get component's css styles.
         *
         * @return {Object} Inline css styles
         * @private
         */
        _styles() {
            return {
                width: !this.fill ? Helper.sizeUnit(this.width) : null
            }
        }
    }
}
</script>

<style scoped>

</style>
