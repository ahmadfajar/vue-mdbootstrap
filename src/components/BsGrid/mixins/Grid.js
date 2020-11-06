import Helper from "../../../utils/Helper";

export default {
    props: {
        height: {
            type: [Number, String],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        loading: {
            type: Object,
            default() {
                return {
                    // valid value: spinner, bar
                    type: 'spinner',
                    color: 'primary'
                }
            }
        },
        bordered: {
            type: Boolean,
            default: false
        },
        rowHover: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * Get computed component css classes.
         *
         * @returns {Object|*} Css names to bind
         * @private
         */
        _classNames() {
            return {
                'md-grid-bordered': this.bordered,
                'md-grid-hoverable': this.rowHover,
                'md-grid-flip': this.flipOnSmallScreen,
                'md-grid-fixed': this.isFixedHeight
            }
        },
        /**
         * Gets computed DataGrid styles.
         *
         * @returns {Object} Css styles to apply
         * @private
         */
        _gridStyles() {
            return {
                height: this.isFixedHeight ? Helper.sizeUnit(this.height) : null
            }
        },
        /**
         * Get loading progress binding attributes.
         *
         * @returns {Object} Loading progress attributes
         * @private
         */
        _progressLoadingAttrs() {
            return {
                type: this.loading.type,
                color: this.loading.color,
                diameter: 50,
                height: 3,
                stroke: 5
            }
        },
        /**
         * Display empty message notification or not.
         *
         * @returns {boolean} TRUE if display alert otherwise FALSE
         * @private
         */
        _showEmptyMessage() {
            return this.dataFetched && this.dataItems.length === 0;
        },
        /**
         * Gets table styles attributes.
         *
         * @returns {Object} Css styles to apply in TABLE tag
         * @private
         */
        _tableStyles() {
            return {
                width: Helper.sizeUnit(this.table.tableWidth)
            }
        },
        /**
         * Gets computed columns array iterator.
         *
         * @returns {Array} Grid columns
         */
        columnIterator() {
            return this.table.columns;
        },
        /**
         * Gets computed dataset.
         *
         * @returns {Object[]} Collection of items
         */
        dataItems() {
            return this.dataSource ? this.dataSource.dataItems : [];
        },
        /**
         * Check if dataset contains any data or not.
         *
         * @returns {boolean} TRUE if has any data otherwise FALSE
         */
        hasDataItems() {
            return this.dataItems && this.dataItems.length > 0;
        },
        /**
         * Check if Grid component has fixed height or not.
         *
         * @returns {boolean} TRUE if uses fixed height otherwise FALSE
         */
        isFixedHeight() {
            return this.height && parseInt(this.height, 10) > 0;
        },
        /**
         * Check if Grid is in loading state or not.
         *
         * @returns {boolean} TRUE if in loading state otherwise FALSE
         */
        isLoading() {
            return this.dataSource ? this.dataSource.loading : this.isFetching;
        }
    },
    methods: {
        /**
         * Get computed GridColumn header styles.
         *
         * @param {Object} col Column object
         * @returns {Object} Column header css styles
         * @private
         */
        _colHeaderStyles(col) {
            return Object.assign({width: Helper.sizeUnit(col.width)}, col.headerStyle || {});
        },
        /**
         * Get computed GridCell styles.
         *
         * @param {Object} col Column object
         * @returns {Object} Css style object
         * @private
         */
        _colDataStyles(col) {
            return Object.assign({width: Helper.sizeUnit(col.width)}, col.dataStyle || {});
        }
    }

}
