export default {
    props: {
        /**
         * The component state, active or not.
         * @type {boolean|*}
         */
        active: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        /**
         * Get computed class names.
         *
         * @returns {Object|*} The collection of css classes
         */
        _activeClasses() {
            return {
                'md-active': this.active && !this.disabled,
            }
        },
    },
}
