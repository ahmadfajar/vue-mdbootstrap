import Helper from '../utils/Helper';

export default {
    props: {
        /**
         * Create component with circle shape.
         * @type {boolean|*}
         */
        circle: {
            type: Boolean,
            default: false
        },
        /**
         * Create component with rounded shape.
         * @type {boolean|*}
         */
        rounded: {
            type: Boolean,
            default: false
        },
        /**
         * Align item inside component at center.
         * @type {boolean|*}
         */
        center: {
            type: Boolean,
            default: false
        },
        /**
         * The component size.
         * @type {string|number|Object|*}
         */
        size: {
            type: [Number, String, Object],
            default: 48
        }
    },
    computed: {
        /**
         * Get computed class names.
         *
         * @returns {Object|*} The collection of css classes
         */
        imageClass() {
            return {
                'mx-auto d-block': this.center,
                'rounded-circle': this.circle && !this.rounded,
                'rounded': this.rounded && !this.circle,
            }
        },
        /**
         * Get computed image size for inline styles.
         *
         * @returns {Object} The inline css style
         */
        imageSizeStyles() {
            if (!this.size) {
                return null;
            }
            const primitive = (typeof this.size === 'string') || (typeof this.size === 'number');

            return {
                height: primitive ? Helper.sizeUnit(this.size) : Helper.sizeUnit(this.size.height),
                width: primitive ? Helper.sizeUnit(this.size) : Helper.sizeUnit(this.size.width)
            }
        }
    }
}
