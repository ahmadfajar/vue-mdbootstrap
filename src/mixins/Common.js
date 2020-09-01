import Helper from "../utils/Helper";

export default {
    methods: {
        /**
         * Generate simple/random UUID or standard UUID v4.
         *
         * @param {boolean} standard Generate standard UUID v4 or random UUID
         * @returns {string} UUID v4 or random UUID
         * @private
         */
        _uuid(standard = false) {
            return Helper.uuid(standard);
        },
        /**
         * Generate component's ID.
         *
         * @returns {string} The generated ID
         * @private
         */
        _generateId() {
            return 'bs-' + Helper.uuid(true);
        },
        /**
         * Fire the component's event.
         *
         * @param {string} eventName The event name to trigger
         * @param {*} args           The event arguments
         * @returns {void}
         */
        fireEvent(eventName, ...args) {
            this.$emit(eventName, ...args);
        }
    }
}
