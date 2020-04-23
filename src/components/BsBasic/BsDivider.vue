<template>
  <hr class="md-divider" :class="_classNames" :style="_styles" />
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsDivider",
    props: {
        dark: {
            type: Boolean,
            default: false
        },
        leftIndent: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        rightIndent: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        thickness: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
    },
    computed: {
        /**
         * Get component's class names.
         *
         * @return {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                this.dark ? 'md-divider--dark' : 'md-divider--light'
            ]
        },
        /**
         * Get component's inline css styles.
         *
         * @return {Object} Inline css styles
         * @private
         */
        _styles() {
            return {
                marginLeft: this.leftIndent ? Helper.sizeUnit(this.leftIndent) : null,
                marginRight: this.rightIndent ? Helper.sizeUnit(this.rightIndent) : null,
                height: this.thickness ? Helper.sizeUnit(this.thickness) : null,
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-divider {
  background-color: rgba($black, 0.12);
  border: none;
  display: block;
  height: 1px;
  min-height: 1px;
  margin-bottom: 0;
  margin-top: 0;
  width: 100%;
  flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;

  &.#{$prefix}-divider--dark {
    background-color: hsla(0, 0%, 100%, 0.12);
  }
}
</style>
