export default {
    props: {
        /**
         * The component state.
         * @type {boolean|*}
         */
        readonly: {
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
        _readonlyAttrs() {
            return {
                readonly: this.readonly,
            }
        },
        /**
         * Get computed class names.
         *
         * @returns {Object|*} The collection of css classes
         */
        _readonlyClasses() {
            return {
                'md-readonly': this.readonly,
            }
        },
    },
}
