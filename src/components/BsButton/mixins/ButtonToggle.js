export default {
    props: {
        /**
         * The color to apply to the component.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'default'
        },
        /**
         * Render Button with flat style or not.
         * @type {boolean|*}
         */
        flat: {
            type: Boolean,
            default: false
        },
        /**
         * Place icon at `left` (before text) or at `right` (after text).
         * @type {string|*}
         */
        iconPosition: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right'].indexOf(value) > -1;
            }
        },
        /**
         * The number of items stored in the collection.
         * @type {Array|*}
         */
        items: {
            type: Array,
            default: undefined
        },
        /**
         * Allow multiple choice or not.
         * @type {boolean|*}
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * Render Button with outlined style or not.
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Render component with raised style or not.
         * @type {boolean|*}
         */
        raised: {
            type: Boolean,
            default: false
        },
        /**
         * The button size, see {@link [Bootstrap](https://getbootstrap.com/docs/4.5/components/buttons/#sizes)} for details
         * @type {string|*}
         */
        size: {
            type: String,
            default: undefined,
            validator: (value) => ['xs', 'sm', 'lg'].indexOf(value) !== -1
        },
        /**
         * Color to apply when Button is active or selected.
         * @type {string|*}
         */
        toggleColor: {
            type: String,
            default: undefined
        },
        /**
         * The input value to be monitored by `v-model`.
         * @type {string|boolean|Number|Array|*}
         */
        value: {
            type: [String, Number, Boolean, Array],
            default: undefined
        }
    }
}
