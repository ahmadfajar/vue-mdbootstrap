export default {
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
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         * See [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome) for more information.
         * @type {string|*}
         */
        iconFlip: {
            type: String,
            default: undefined,
            validator: v => ['horizontal', 'vertical', 'both'].indexOf(v) !== -1
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
    },
    computed: {
        /**
         * Get fontAwesome icon attributes.
         *
         * @returns {Object|*} The icon attributes
         * @private
         */
        iconAttributes() {
            return {
                icon: this.iconName,
                flip: this.iconFlip,
                pulse: this.iconPulse,
                spin: this.iconSpin,
                rotation: this.iconRotation,
            }
        },
        /**
         * Get computed icon name (real icon name).
         *
         * @returns {string} The icon name
         */
        iconName() {
            if (this.isInternal) {
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
            return (typeof this.icon === 'string') && this.icon.substr(0, 3) === 'bs-';
        },
    },
}
