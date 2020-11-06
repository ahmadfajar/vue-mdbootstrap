import Helper from "../../../utils/Helper";

export default {
    props: {
        /**
         * The column object for this Cell.
         * @type {Object}
         */
        column: {
            type: Object,
            default: undefined
        },
        /**
         * The row item object for this Cell.
         * @type {Object}
         */
        item: {
            type: Object,
            default: undefined
        },
        /**
         * The row index position.
         * @type {number|string|*}
         */
        index: {
            type: [Number, String],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        }
    },
    computed: {
        /**
         * Get computed Cell styles.
         *
         * @returns {Object} Cell styles to apply
         * @private
         */
        _cellStyles() {
            const col    = this.column;
            const styles = col && col.dataStyle ? col.dataStyle : {};

            if (col) {
                if (col.textAlign || col.dataAlign) {
                    styles['textAlign'] = col.dataAlign || col.textAlign;
                }
            }

            return styles;
        },
        /**
         * Check if this Cell has custom formatter or not.
         *
         * @returns {boolean} TRUE if cell has formatter function
         */
        hasFormatter() {
            return this.column && this.column.formatter;
        },
        /**
         * Get computed Cell value.
         *
         * @returns {Object|*} Cell value
         */
        value() {
            const col = this.column;

            if (this.item && col) {
                const value = Helper.getObjectValueByPath(this.item, col.field);

                if (col.formatter) {
                    if (col.formatterOptions) {
                        return col.formatter(value, col.formatterOptions, this.item);
                    } else {
                        return col.formatter(value, this.item);
                    }
                } else {
                    return value;
                }
            }

            return '';
        }
    }
}
