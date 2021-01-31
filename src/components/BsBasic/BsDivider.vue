<template>
  <hr
    :class="_classNames"
    :style="_styles"
    class="md-divider" />
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsDivider",
    props: {
        /**
         * Set to `TRUE` when divider is placed inside element that has dark background color.
         * @type {boolean|*}
         */
        dark: {
            type: Boolean,
            default: false
        },
        /**
         * Indentation from left side.
         * @type {string|number|*}
         */
        leftIndent: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Indentation from right side.
         * @type {string|number|*}
         */
        rightIndent: {
            type: [String, Number],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Divider thickness.
         * @type {string|number|*}
         */
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
         * @returns {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                this.dark ? 'divider--dark' : 'divider--light'
            ]
        },
        /**
         * Get component's inline css styles.
         *
         * @returns {Object} Inline css styles
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
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;

    &.divider--dark {
        background-color: rgba($white, 0.2);
    }
}
</style>
