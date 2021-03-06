import Helper from "../../../utils/Helper";

export default {
    props: {
        /**
         * The html element ID.
         * @type {string|*}
         */
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        /**
         * The input field name.
         * @type {string|number|*}
         */
        name: {
            type: [String, Number],
            default: undefined
        },
        /**
         * The input field state.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The input field state.
         * @type {boolean|*}
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * Whether input field is required or not.
         * @type {boolean|*}
         */
        required: {
            type: Boolean,
            default: false
        },
        /**
         * The input value to be monitored by `v-model`.
         * @type {string|boolean|Number|Array|Object|*}
         */
        value: {
            type: [String, Boolean, Number, Object, Array],
            default: undefined
        },
    },
    computed: {
        /**
         * Get computed binding's properties.
         *
         * @returns {Object|*} The attributes to bind
         */
        cmpAttrs() {
            const attrs = {
                id: this.id,
                name: this.name,
                disabled: this.disabled,
                readonly: this.readonly,
                required: this.required
            };

            if (this.hasValue) {
                if (this.value === null || !Array.isArray(this.value) || (typeof this.value !== 'object')) {
                    attrs.value = (this.value === null || this.value === undefined) ? '' : String(this.value);
                }
            }
            return attrs;
        },
        /**
         * Get computed class names.
         *
         * @returns {Object|*} The collection of css classes
         */
        cmpAttrClasses() {
            return {
                'md-disabled': this.disabled,
                'md-readonly': this.readonly,
                'md-required': this.required
            }
        },
        /**
         * Check whether input field has value or not.
         * @returns {boolean} `TRUE` if input field has value otherwise `FALSE`
         */
        hasValue() {
            return this.$options.propsData.hasOwnProperty('value') && !Helper.isEmpty(this.value);
        }
    }
}
