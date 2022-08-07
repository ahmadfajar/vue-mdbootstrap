export default {
    props: {
        /**
         * The component state: enabled or disabled.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        /**
         * Get computed binding's properties.
         *
         * @returns {Object|*} The attributes to bind
         */
        _disableAttrs() {
            return {
                disabled: this.disabled,
            }
        },
        /**
         * Get computed class names.
         *
         * @returns {Object|*} The collection of css classes
         */
        _disableClasses() {
            return {
                'md-disabled': this.disabled,
            }
        },
    },
}
