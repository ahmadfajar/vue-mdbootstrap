export default {
    props: {
        field: {
            type: String,
            default: undefined
        },
        label: {
            type: String,
            default: ''
        },
        columnCls: {
            type: String,
            default: undefined
        },
        textAlign: {
            type: String,
            default: undefined
        },
        headerAlign: {
            type: String,
            default: undefined
        },
        headerStyle: {
            type: Object,
            default: undefined
        },
        dataAlign: {
            type: String,
            default: undefined
        },
        dataStyle: {
            type: Object,
            default: undefined
        },
        formatter: {
            type: Function,
            default: undefined
        },
        formatterOptions: {
            type: [String, Object, Array],
            default: undefined
        },
        width: {
            type: [Number, String],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        minWidth: {
            type: [Number, String],
            default: 100,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    computed: {
        /**
         * Get computed header column styles.
         *
         * @returns {Object} Css styles to apply
         * @private
         */
        _headerStyles() {
            let styles = this.headerStyle || {};

            if (this.textAlign || this.headerAlign) {
                styles['textAlign'] = this.headerAlign || this.textAlign;
            }

            return styles;
        },
        /**
         * Get computed header/cell text-alignment.
         *
         * @returns {string} Column text alignment
         */
        textAlignment() {
            return this.textAlign || this.headerAlign;
        }
    }
}
