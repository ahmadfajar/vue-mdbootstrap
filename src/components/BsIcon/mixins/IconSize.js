export default {
    props: {
        /**
         * Shortcut to create icon with equal height and width.
         * @type {string|number|*}
         */
        size: {
            type: [String, Number],
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * The icon’s height in pixel.
         * @type {string|number|*}
         */
        height: {
            type: [String, Number],
            default: 24,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * The icon’s width in pixel.
         * @type {string|number|*}
         */
        width: {
            type: [String, Number],
            default: 24,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    computed: {
        /**
         * Get calculated icon's height.
         *
         * @returns {string|number} The icon height
         */
        szHeight() {
            return this.size && this.size > 0 ? this.size : this.height;
        },
        /**
         * Get calculated icon's width.
         *
         * @returns {string|number} The icon width
         */
        szWidth() {
            return this.size && this.size > 0 ? this.size : this.width;
        }
    }
}
