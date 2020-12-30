<template>
  <th
    :class="_columnCls"
    :style="_headerStyles"
    role="columnheader"
    @click="_onClick">
    <div :class="{'md-sortable': canSort}" class="md-grid-th-inner">
      <font-awesome-icon
        v-if="canSort && textAlignment === 'right'"
        :class="_sortClasses"
        icon="arrow-up" />
      {{ label }}&nbsp;
      <font-awesome-icon
        v-if="canSort && textAlignment !== 'right'"
        :class="_sortClasses"
        icon="arrow-up" />
    </div>
  </th>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Column from "./mixins/Column";
import Helper from "../../utils/Helper";

export default {
    name: "BsGridColumn",
    components: {FontAwesomeIcon},
    mixins: [Column],
    inject: ['BsGrid'],
    props: {
        /**
         * Footer css class name.
         * @type {string|*}
         */
        footerCls: {
            type: String,
            default: undefined
        },
        /**
         * Footer text.
         * @type {string|*}
         */
        footerText: {
            type: String,
            default: undefined
        },
        /**
         * Column order in the Grid rows.
         * @type {number|string|*}
         */
        order: {
            type: [Number, String],
            default: undefined,
            validator: v => !isNaN(parseInt(v, 10))
        },
        /**
         * Render this column in the Grid rows.
         * @type {boolean|*}
         */
        cellData: {
            type: Boolean,
            default: true
        },
        /**
         * Render this column as Grid row numbering.
         * @type {boolean|*}
         */
        rowNumbering: {
            type: Boolean,
            default: false
        },
        /**
         * Enable/disable column sorter.
         * @type {boolean|*}
         */
        sortable: {
            type: Boolean,
            default: true
        },
        /**
         * Jika berupa <b>Object</b> maka strukturnya adalah:
         * <pre>
         * {
         *    field: String,         // default adalah nama field yang melekat pada column
         *    operator: 'eq|neq|gt|gte|lt|lte|in|notin|startswith|endswith|contains|fts',  // default 'eq'
         *    enabled: boolean,      // enable/disable column filtering, default TRUE
         *    placeholder: boolean,  // show/hide placeholder pada textfield, default TRUE
         *    button: boolean,       // show/hide action button untuk melakukan filtering, default FALSE
         * }
         * </pre>
         */
        filterable: {
            type: [Boolean, Object],
            default: true
        },
        /**
         * Aggregate function to pass to the column footer.
         * @type {string|function|*}
         */
        aggregate: {
            type: [String, Function],
            default: undefined,
            validator: value => ['sum', 'avg'].indexOf(value) > -1 || Helper.isFunction(value)
        }
    },
    data: () => ({
        colIndex: null,
        sortDirection: 'asc'
    }),
    computed: {
        /**
         * @property {IBsGrid} BsGrid
         */

        /**
         * Get computed column css classes.
         *
         * @returns {Object} Css name to bind
         * @private
         */
        _columnCls() {
            let cls = [];

            if (this.columnCls) {
                cls.push(this.columnCls);
            }
            if (this.rowNumbering) {
                cls.push('row-numbering');
            }

            return cls;
        },
        /**
         * Get computed sortDirection icon classes.
         *
         * @returns {Object} Css name to bind
         * @private
         */
        _sortClasses() {
            return {
                'sort-asc': this.sortDir === 'asc',
                'sort-desc': this.sortDir === 'desc',
                'opacity-0': !this.sortActive,
                'opacity-100': this.sortActive
            }
        },
        /**
         * Check if this Column is sortable or not.
         *
         * @returns {boolean} TRUE if this column is sortable
         */
        canSort() {
            return this.BsGrid.enableSort && this.sortable && this.field && this.rowNumbering === false;
        },
        sortActive() {
            return this.canSort && this.field === this.BsGrid.sort.property;
        },
        /**
         * Get current sort direction.
         *
         * @returns {string} Column sort direction
         */
        sortDir() {
            if (this.canSort && this.field === this.BsGrid.sort.property) {
                return this.sortDirection;
            } else if (this.canSort) {
                return this.BsGrid.sort.direction.toLowerCase();
            }

            return '';
        }
    },
    created() {
        this._registerColumn();
    },
    methods: {
        /**
         * Event handler when column header is clicked.
         *
         * @param {MouseEvent} e The received event
         * @returns {void}
         * @private
         */
        _onClick(e) {
            this.BsGrid.fireEvent('header-click', this.colIndex, this.field, e);

            if (this.canSort) {
                this._setSortDir(this.field === this.BsGrid.sort.property && this.sortDirection === 'asc' ? 'desc' : 'asc');
                this.BsGrid.doSort(this.field, this.sortDirection);
                this.BsGrid.fireEvent('sort', this.field, e);
            }
        },
        /**
         * Register this Column to the Grid.
         *
         * @returns {void}
         * @private
         */
        _registerColumn() {
            const config = {
                field: this.field,
                operator: 'eq',
                minlength: 1,
                enabled: true,
                immediate: true,
                placeholder: true,
                button: false
            };
            let filterCfg = {};

            if (Helper.isObject(this.BsGrid.filterable) && Helper.isObject(this.filterable)) {
                filterCfg = {...config, ...this.BsGrid.filterable, ...this.filterable};
            } else if (Helper.isObject(this.BsGrid.filterable) && typeof this.filterable === 'boolean') {
                filterCfg = {...config, ...this.BsGrid.filterable, enabled: this.filterable};
            } else if (Helper.isObject(this.filterable)) {
                filterCfg = {...config, ...this.filterable};
            } else {
                filterCfg = {...config, enabled: this.filterable};
            }
            if (filterCfg.button === true) {
                filterCfg.placeholder = false;
            }

            const len = this.BsGrid.columns.length;
            this.BsGrid.columns.push({
                field: this.field,
                label: this.label,
                width: this.width,
                minWidth: this.minWidth,
                sortable: this.sortable,
                aggregate: this.aggregate,
                columnCls: this.columnCls,
                filterable: filterCfg,
                footerCls: this.footerCls,
                footerText: this.footerText,
                formatter: this.formatter,
                formatterOptions: this.formatterOptions,
                rowNumbering: this.rowNumbering,
                textAlign: this.textAlign,
                dataAlign: this.dataAlign,
                dataStyle: this.dataStyle,
                headerAlign: this.headerAlign,
                headerStyle: this.headerStyle,
                cellData: this.cellData,
                order: this.order ? parseInt(this.order, 10) : len
            });
            this.BsGrid.columns = Helper.sortArrayObj(this.BsGrid.columns, 'order');

            this.colIndex = this.order ? parseInt(this.order, 10) : len;
        },
        /**
         * Set grid sort direction.
         *
         * @param {string} direction The sort direction
         * @returns {void}
         * @private
         */
        _setSortDir(direction) {
            this.BsGrid.sort.property = this.field;
            this.BsGrid.sort.direction = direction;
            this.sortDirection = direction;
        }
    }
}
</script>

<style scoped>

</style>
