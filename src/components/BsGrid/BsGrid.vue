<template>
  <div
    :class="_classNames"
    :style="_gridStyles"
    class="md-grid">
    <slot name="toolbar"></slot>
    <div :class="{'d-flex': isSmallScreen && flipOnSmallScreen}">
      <div class="md-grid-header">
        <div ref="theader" class="md-grid-header-wrap">
          <table :style="_tableStyles" role="grid">
            <colgroup v-if="!isSmallScreen || !flipOnSmallScreen">
              <col v-if="isSelectable" :style="{width: checkboxWidth + 'px'}" />
              <template v-for="(column, idx) in columnIterator">
                <col
                  v-if="column.cellData"
                  :key="'col-' + _uuid() + idx"
                  :style="_colHeaderStyles(column)" />
              </template>
            </colgroup>
            <thead role="rowgroup">
              <slot v-bind="{ items: dataItems, selectionMode: selectionMode }" name="columnheader"></slot>
              <tr v-if="!$scopedSlots['columnheader']" role="row">
                <bs-grid-column-selection
                  v-if="isSelectable"
                  :data-items="dataItems"
                  :color="selectionMode.checkboxColor" />
                <slot></slot>
              </tr>
              <bs-grid-column-filters
                v-if="filterable && !(flipOnSmallScreen && isSmallScreen)"
                :columns="columnIterator" />
            </thead>
          </table>
        </div>
      </div>
      <bs-progress v-if="isLoading && loading.type === 'bar'" v-bind="_progressLoadingAttrs" />
      <div
        ref="tcontent"
        class="md-grid-content"
        @scroll="_handleScroll">
        <table :style="_tableStyles" role="grid">
          <colgroup v-if="!isSmallScreen || !flipOnSmallScreen">
            <col v-if="isSelectable" :style="{width: checkboxWidth + 'px'}" />
            <template v-for="(column, idx) in columnIterator">
              <col
                v-if="column.cellData"
                :key="'col-' + _uuid() + idx"
                :style="_colDataStyles(column)" />
            </template>
          </colgroup>
          <tbody role="rowgroup">
            <bs-grid-row
              v-for="(item, index) in dataItems"
              :key="'row-' + index"
              :index="index"
              :item="item"
              :selection-mode="selectionMode">
              <bs-grid-cell-selection
                v-if="isSelectable"
                :item="item"
                :value="isRowSelected(item)"
                :selection-mode="selectionMode"
                @input="selected => selected ? selectRow(item) : deselectRow(item)" />
              <slot v-bind="{ columns: columnIterator, item: item, index: index }" name="datarow">
                <template v-for="column in columnIterator">
                  <component
                    v-if="column.field || column.rowNumbering"
                    :is="column.rowNumbering ? 'bs-grid-cell-numbering' : 'bs-grid-cell'"
                    :key="column.field + '-' + _uuid()"
                    :column="column"
                    :index="index"
                    :item="item" />
                </template>
              </slot>
            </bs-grid-row>
          </tbody>
        </table>
        <transition v-if="_showEmptyMessage" name="fade">
          <div class="md-grid-alert my-3 mx-3 mx-md-auto">
            <bs-alert color="warning" icon="exclamation-triangle">
              <slot name="emptyMessage">
                Sorry! No data to display here.
              </slot>
            </bs-alert>
          </div>
        </transition>
      </div>
      <div v-if="showFooter" class="md-grid-footer">
        <div ref="tfooter" class="md-grid-footer-wrap">
          <bs-grid-footer :columns="columnIterator">
            <slot
              slot="default"
              v-bind="{ columns: columnIterator }"
              name="gridfooter"></slot>
          </bs-grid-footer>
        </div>
      </div>
    </div>
    <div v-if="isLoading && loading.type === 'spinner'" class="md-grid-progress-spinner">
      <bs-progress v-bind="_progressLoadingAttrs" class="align-self-center" />
    </div>
    <div
      v-if="pageable"
      ref="footer"
      class="md-pagination">
      <bs-pagination
        v-bind="_paginationAttrs"
        @pagesize="setPageSize"
        @reload="reload"
        @gotopage="gotoPage"
        @prevpage="previousPage"
        @nextpage="nextPage" />
    </div>
  </div>
</template>

<script>
/**
 * BsGrid interface.
 *
 * @typedef {Object} IBsGrid
 * @property {Object[]} columns         The collection of columns
 * @property {Object[]} selectedItems   Collection of selected rows
 * @property {number} page              Current page or active page
 * @property {number} pageSize          Number of rows in a page
 * @property {number} totalCount        Total number of items in the Store's dataset
 * @property {boolean} enableSort       Enable sort (Readonly)
 * @property {BsStore|BsArrayStore} dataSource  Grid data source
 * @property {number} checkboxWidth       Checkbox width
 * @property {boolean} flipOnSmallScreen  Flip Grid on small screen
 * @property {ISorter} sort               Sorter property
 * @property {number} tableWidth          Table width (Readonly)
 * @property {function(field: string, direction: string)} doSort   Sort dataset based on the given field name.
 * @property {function(filters: IFilter[], logic: string=null)} filter  Filter dataset based on the given filter.
 * @property {function(eventName: string, ...[*])} fireEvent  Triggers event.
 * @property {function(standard: boolean)} uuid  Create UUID, if params is `TRUE` then standard UUID v4 will be created.
 */

import BsGridRow from './BsGridRow';
import BsGridCell from './BsGridCell';
import BsGridCellNumbering from "./BsGridCellNumbering";
import BsGridCellSelection from './BsGridCellSelection';
import BsGridColumnFilters from "./BsGridColumnFilters";
import BsGridColumnSelection from './BsGridColumnSelection';
import BsGridFooter from "./BsGridFooter";
import BsPagination from '../BsPagination/BsPagination';
import BsProgress from '../BsAnimation/BsProgress';
import BsAlert from '../BsBasic/BsAlert';
import BsStore from '../../model/BsStore';
import BsArrayStore from "../../model/BsArrayStore";
import Common from "../../mixins/Common";
import ScreenSize from '../../mixins/ScreenSize';
import Grid from "./mixins/Grid";
import Helper from '../../utils/Helper';
import sum from 'lodash/sum';
import { addResizeListener, removeResizeListener } from '../../utils/ResizeListener';

export default {
    name: "BsGrid",
    components: {
        BsGridCell, BsGridCellSelection, BsGridCellNumbering, BsGridColumnFilters,
        BsGridColumnSelection, BsGridRow, BsGridFooter, BsPagination, BsProgress, BsAlert
    },
    mixins: [Common, Grid, ScreenSize],
    props: {
        /**
         * Grid data sources.
         * @type {BsStore|BsArrayStore|*}
         */
        dataSource: {
            type: [BsStore, BsArrayStore],
            default: undefined
        },
        /**
         * Flip Grid component on small screen.
         * @type {boolean|*}
         */
        flipOnSmallScreen: {
            type: Boolean,
            default: true
        },
        /**
         * Enable or disable pagination.
         * @type {boolean|Object|*}
         */
        pageable: {
            type: [Boolean, Object],
            default: false
        },
        /**
         * Jika berupa <b>Object</b> maka strukturnya adalah:
         * <pre>
         * {
         *    logic: 'and|or',      // Logic yang dipakai jika filters lebih dari 1
         *    operator: 'eq|neq|gt|gte|lt|lte|in|notin|startswith|endswith|contains|fts',  // default 'eq'
         *    placeholder: boolean, // Show/hide placeholder pada textfield, default TRUE
         *    immediate: boolean,   // Jika TRUE maka filtering akan segera dilakukan setelah event 'onChange' terjadi
         *                          // jika FALSE maka filtering baru dilakukan setelah keyboard 'ENTER' ditekan
         *                          // ataupun melalui action button
         *    minlength: int,       // Minimum jumlah karakter, default 1
         * }
         * </pre>
         */
        filterable: {
            type: [Boolean, Object],
            default: false
        },
        /**
         * Enable or disable row selection.
         * @type {boolean|Object|*}
         */
        rowSelection: {
            type: [Boolean, Object],
            default: false
        },
        /**
         * Display Grid column footer at bottom or not.
         * @type {boolean|*}
         */
        showFooter: {
            type: Boolean,
            default: false
        },
        /**
         * Enable or disable column filtering feature.
         * @type {boolean|Object|*}
         */
        sortable: {
            type: [Boolean, Object],
            default: undefined
        }
    },
    data: (vm) => ({
        checkboxWidth: 48,
        columnsWidth: [],
        dataFetched: false,
        isFetching: false,
        isSmallScreen: false,
        selectionMode: {
            checkboxColor: 'pink',
            rowSelect: false
        },
        table: {
            columns: [],
            selectedItems: [],
            page: 0,
            pageSize: 10,
            totalCount: 0,
            enableSort: vm.sortable,
            dataSource: vm.dataSource,
            filterable: vm.filterable,
            checkboxWidth: vm.checkboxWidth,
            flipOnSmallScreen: vm.flipOnSmallScreen,
            sort: {property: '', direction: 'asc'},
            tableWidth: undefined,
            // methods
            /**
             * Sort the data based on the given field name.
             *
             * @param {string} field     - The field for sorting
             * @param {string} direction - The sort direction.
             */
            doSort: vm.sort,
            /**
             * Check if feature CheckBox Row selection is enabled or not.
             *
             * @returns {boolean}
             */
            enableRowSelect: vm._enableRowSelect,
            /**
             * Filter the data based on the given filters and fire event <tt>'filter'</tt> after data has been filtered.
             *
             * @param {IFilter[]} filters - Collection of filters to be used
             * @param {string} logic      - The filter logic to be used (optional)
             */
            filter: vm.filter,
            fireEvent: vm.fireEvent,
            /**
             * Generate simple/random UUID or standard UUID v4.
             *
             * @param {boolean} standard
             * @returns {string}
             */
            uuid: vm._uuid
        }
    }),
    provide() {
        const _grid = this.table;

        return {
            BsGrid: _grid
        }
    },
    computed: {
        /**
         * Get pagination binding attributes.
         *
         * @returns {Object|*} Pagination attributes
         * @private
         */
        _paginationAttrs() {
            return {
                page: this.currentPage,
                pageable: this.pageable,
                pageSize: this.pageSize,
                dataItems: this.dataItems,
                totalItems: this.totalItems
            }
        },
        /**
         * Gets current page number.
         *
         * @returns {number} Page number
         */
        currentPage() {
            return this.table.page;
        },
        /**
         * Check if feature Row selection is enabled or not.
         *
         * @returns {boolean} TRUE if row selection is enabled otherwise FALSE
         */
        isSelectable() {
            return this.selectionMode.rowSelect;
        },
        /**
         * Gets the number of items that can be display in the Grid.
         *
         * @returns {int} Default number of items within a page
         */
        pageSize() {
            return this.table.pageSize;
        },
        /**
         * Gets the selected items.
         *
         * @returns {Array} Current selected items
         */
        selectedItems() {
            return this.table.selectedItems;
        },
        /**
         * Gets total number of items.
         *
         * @returns {int} Total items
         */
        totalItems() {
            return this.dataSource ? this.dataSource.totalCount : this.table.totalCount;
        },
        /**
         * Gets the total number of pages.
         *
         * @returns {int} Total pages
         */
        totalPages() {
            return Math.ceil(this.totalItems / this.table.pageSize);
        }
    },
    created() {
        if (typeof this.rowSelection === 'boolean') {
            this.selectionMode.rowSelect = this.rowSelection;
        } else if (typeof this.rowSelection === 'object') {
            this.selectionMode.checkboxColor = this.rowSelection.checkboxColor || 'pink';
            this.selectionMode.rowSelect = this.rowSelection.rowSelect || true;
        }
        if (Helper.isObject(this.pageable) && this.pageable.pageSize && this.pageable.pageSize > 0) {
            this.table.pageSize = this.pageable.pageSize;
        }

        this.gotoPage(1);
    },
    mounted() {
        addResizeListener(this.$el, this._updateTableWidth);
        this._updateBodyHeight();
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this._updateTableWidth);
        this.columnsWidth = null;
        this.selectionMode = null;

        this.table.columns = [];
        this.table.selectedItems = [];
        this.table = null;
    },
    methods: {
        /**
         * Check if feature CheckBox Row selection is enabled or not.
         *
         * @returns {boolean} TRUE if feature CheckBox Row selection is enabled otherwise FALSE
         * @private
         */
        _enableRowSelect() {
            return this.selectionMode.rowSelect;
        },
        /**
         * Fetch data from array data source or remote server.
         *
         * @returns {void}
         * @private
         */
        _fetchData() {
            this.isFetching = true;

            if (!Helper.isEmpty(this.dataSource)) {
                if (this.dataSource.pageSize < 1 || Helper.isEmpty(this.dataSource.pageSize)) {
                    // this.dataSource.pageSize = this.table.pageSize;
                    this.dataSource.setPageSize(this.table.pageSize);
                } else {
                    this.table.pageSize = this.dataSource.pageSize;
                }

                this.dataSource
                    .page(this.table.page)
                    .load()
                    .then(() => {
                        this.dataFetched = true;
                        this.isFetching = false;
                        this.table.totalCount = this.dataSource.totalCount;
                        this.fireEvent('data-bind', this.dataSource.dataItems);
                    })
                    .catch((error) => {
                        this.dataFetched = true;
                        this.isFetching = false;
                        this.fireEvent('data-error', error);
                    });
            } else {
                this.dataFetched = false;
                this.isFetching = false;
            }
        },
        /**
         * Event handler when table body is scrolling.
         *
         * @param {Event} e The received event
         * @returns {void}
         * @private
         */
        _handleScroll(e) {
            const scrollLeft = e.target.scrollLeft;
            const theader = this.$refs.theader;
            const tfooter = this.$refs.tfooter;

            if (theader) {
                theader.scrollLeft = scrollLeft;
            }
            if (tfooter) {
                tfooter.scrollLeft = scrollLeft;
            }
        },
        /**
         * Update grid body height.
         *
         * @returns {void}
         * @private
         */
        _updateBodyHeight() {
            if (this.isFixedHeight && (!this.isSmallScreen || !this.flipOnSmallScreen)) {
                const gridHeight = this.$el.offsetHeight;
                const theaderHeight = this.$refs.theader ? this.$refs.theader.offsetHeight : 0;
                const tfooterHeight = this.$refs.tfooter ? this.$refs.tfooter.offsetHeight : 0;
                const footerHeight = this.$refs.footer ? this.$refs.footer.offsetHeight : 0;

                this.$refs.tcontent.style.height = (gridHeight - (theaderHeight + tfooterHeight + footerHeight)) + 'px';
            }
        },
        /**
         * Detect screen size and recalculate grid width.
         *
         * @returns {void}
         * @private
         */
        _updateTableWidth() {
            this.isSmallScreen = this.screenMaxSm.matches;

            if (this.$el && this.columnIterator.length > 0 && (!this.isSmallScreen || !this.flipOnSmallScreen)) {
                if (this.columnsWidth.length === 0) {
                    this.columnsWidth = this.columnIterator
                        .filter(c => c.cellData === true)
                        .map(col => col.width ? Number(col.width) : 0);
                }
                const elWidth = this.isFixedHeight
                    ? (this.$el.getBoundingClientRect().width - 18)
                    : this.$el.getBoundingClientRect().width;
                let avgColsNoWidth = 0;
                let decreaseWidth = true;
                let tmpCols = this.columnsWidth.map(col => col);
                const colsNoWidth = tmpCols.filter(c => c === 0);

                if (this.rowSelection) {
                    tmpCols.push(this.checkboxWidth);
                }

                let totWidth = sum(tmpCols);
                if (elWidth > totWidth && colsNoWidth.length > 0) {
                    avgColsNoWidth = Math.floor((elWidth - totWidth) / colsNoWidth.length);
                }

                this.table.columns = this.columnIterator.map((col, idx) => {
                    if (tmpCols[idx] === 0) {
                        const minWidth = parseInt(col.minWidth, 10);

                        if (avgColsNoWidth < minWidth) {
                            col.width = decreaseWidth ? (minWidth - 1) : minWidth;
                        } else {
                            col.width = decreaseWidth ? (avgColsNoWidth - 1) : avgColsNoWidth;
                        }
                        totWidth += col.width;
                        decreaseWidth = false;
                    }

                    return col;
                });

                this.table.tableWidth = totWidth <= elWidth ? elWidth : totWidth;
            } else {
                this.table.tableWidth = null;
            }
        },
        /**
         * Deselect a row.
         *
         * @param {Record} item The item to deselect
         * @returns {void}
         */
        deselectRow(item) {
            if (this.isRowSelected(item)) {
                this.table.selectedItems = this.table.selectedItems.filter(target => target !== item);
                this.fireEvent('deselect', item);
            }
        },
        /**
         * Filter the data based on the given filters and fire event <tt>'filter'</tt> after data has been filtered.
         *
         * @param {IFilter[]} filters Collection of filters to be used
         * @param {string} [logic]   The filter logic to be used
         * @returns {void}
         */
        filter(filters, logic = 'AND') {
            if (!Helper.isEmpty(this.dataSource)) {
                this.dataSource
                    .setFilterLogic((this.filterable && this.filterable.logic ? this.filterable.logic : logic))
                    .setFilters(filters, true);
            }

            this.table.page = 1;
            this._fetchData();
            this.fireEvent('data-filter', filters);
        },
        /**
         * Go to another page and load its data.
         *
         * @param {int} page Page number
         * @returns {void}
         */
        gotoPage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.table.page = page;
            } else {
                this.table.page = 1;
            }

            this._fetchData();
        },
        /**
         * Check if a row is selected or not.
         *
         * @param {Record} item The item to be checked
         * @returns {boolean} TRUE if the given item is selected otherwise FALSE
         */
        isRowSelected(item) {
            return this.table.selectedItems.includes(item);
        },
        /**
         * Go to next page and load its data.
         *
         * @returns {void}
         */
        nextPage() {
            if (this.table.page < this.totalPages) {
                ++this.table.page;
                this._fetchData();
            }
        },
        /**
         * Go to previous page and load its data.
         *
         * @returns {void}
         */
        previousPage() {
            if (this.table.page > 1) {
                --this.table.page;
                this._fetchData();
            }
        },
        /**
         * Reload data from the remote server.
         *
         * @returns {void}
         */
        reload() {
            this._fetchData();
        },
        /**
         * Select a row.
         *
         * @param {Record} item The selected item
         * @returns {void}
         */
        selectRow(item) {
            if (!this.isRowSelected(item)) {
                this.table.selectedItems = this.table.selectedItems.concat([item]);
                this.fireEvent('select', item);
            }
        },
        /**
         * Set default number of items to display within a page.
         *
         * @param {int} value Number of items to display
         * @returns {void}
         */
        setPageSize(value) {
            if (Helper.isEmpty(value)) {
                this.table.page = 1;
                this.table.pageSize = -1;
            } else {
                this.table.pageSize = value;
            }
            if (!Helper.isEmpty(this.dataSource)) {
                // this.dataSource.pageSize = this.table.pageSize;
                this.dataSource.setPageSize(this.table.pageSize);
            }

            this._fetchData();
        },
        /**
         * Sort the data based on the given field name.
         *
         * @param {string} field     The field for sorting
         * @param {string} direction The sort direction.
         * @returns {void}
         */
        sort(field, direction) {
            // this.dataSource.sorters = [{property: field, direction: direction.toLowerCase()}];
            this.dataSource.setSorters([{property: field, direction: direction.toLowerCase()}]);
            this._fetchData();
        }
    }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-grid,
.#{$prefix}-treegrid {
    position: relative;
    width: 100%;

    table {
        border-collapse: separate;
        border-spacing: 0;
        height: auto;
        width: 100%;
        margin: 0;

        .#{$prefix}-grid-cell {
            &.row-numbering {
                border-right: 1px solid lighten($gray-300, 4%);
            }
        }

        th, td {
            border-top: $table-border-width solid $table-border-color;
            color: $table-text-color;
            font-size: $table-font-size;
            font-weight: $font-weight-light;
            padding: $table-cell-padding;
            vertical-align: middle;
        }

        thead, tfoot {
            th {
                @include user-select(none);
                font-weight: $font-weight-bold;
                color: $table-header-color;
                padding-top: $padding-base;
                padding-bottom: $padding-base;

                &.row-numbering {
                    border-right: 1px solid lighten($table-border-color, 20%);
                }
            }

            > tr {
                &:first-child {
                    th {
                        border-top: 0 none;
                    }
                }
            }
        }

        tbody {
            > tr {
                &:first-child {
                    td {
                        border-top: 0 none;
                    }
                }
            }
        }

        thead th, tbody td {
            &:first-child {
                padding-left: 1rem;
            }
        }
    }

    .#{$prefix}-pagination {
        border-top: 1px solid darken($table-border-color, 10%);
        position: relative;
        background-color: $white;
    }

    .#{$prefix}-grid-header,
    .#{$prefix}-grid-footer,
    .#{$prefix}-grid-content {
        position: relative;

        table {
            table-layout: fixed;
        }
    }

    .#{$prefix}-grid-header {
        background-color: $table-header-bgcolor;
        border-bottom: 1px solid darken($table-border-color, 10%);

        > .#{$prefix}-grid-header-wrap {
            position: relative;
            overflow: hidden;
            width: 100%;

            .#{$prefix}-grid-th-inner {
                overflow: hidden;
                position: relative;
                text-overflow: ellipsis;
                vertical-align: top;
                white-space: nowrap;

                &.#{$prefix}-sortable {
                    cursor: pointer;
                }

                .sort-asc, .sort-desc {
                    @include transition($transition-basic);
                    color: lighten($table-header-color, 10%);
                    display: inline-block;
                    font-size: 12px;
                }

                .sort-asc {
                    @include transform(rotateZ(0deg));
                }

                .sort-desc {
                    @include transform(rotateZ(180deg));
                }
            }
        }
    }

    .#{$prefix}-grid-footer {
        background-color: lighten($table-header-bgcolor, 2%);
        border-top: 1px solid $table-border-color;

        > .#{$prefix}-grid-footer-wrap {
            position: relative;
            overflow: hidden;
            width: 100%;

            .#{$prefix}-grid-th-inner {
                overflow: hidden;
                position: relative;
                text-overflow: ellipsis;
                vertical-align: top;
                white-space: nowrap;
                font-weight: $font-weight-bold;
            }
        }
    }

    .#{$prefix}-grid-content {
        background-color: $white;
        min-height: 100px;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;

        > .#{$prefix}-grid-alert {
            max-width: 500px;

            > .alert {
                margin-bottom: 0;
            }
        }

        .#{$prefix}-grid-cell-inner {
            overflow: hidden;
            position: relative;
            text-overflow: ellipsis;
            white-space: nowrap;

            > .svg-inline--fa {
                font-size: 18px;
            }
        }
    }

    .#{$prefix}-progress-bar {
        position: absolute;
        width: 100%;
        z-index: 100;
    }

    .#{$prefix}-grid-progress-spinner {
        @include flexbox((display: flex, justify-content: center));
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 100;
        min-height: 100px;
        max-height: 100%;
        width: 100%;
        height: 100%;
    }

    &.#{$prefix}-grid-bordered {
        .#{$prefix}-grid-header,
        .#{$prefix}-grid-content {
            th, td {
                border-right: $table-border-width solid $table-border-color;

                &:last-child {
                    border-right: none;
                }
            }
        }
    }

    &.#{$prefix}-grid-hoverable {
        .#{$prefix}-grid-content {
            .#{$prefix}-grid-row,
            .#{$prefix}-grid-row-alt {
                @include transition($transition-hoverable);

                &:hover {
                    background-color: $table-hover-bgcolor;
                }
            }
        }
    }

    &.#{$prefix}-grid-fixed {
        .#{$prefix}-grid-header {
            padding-right: 18px;

            > .#{$prefix}-grid-header-wrap {
                border-right: 1px solid darken($table-border-color, 10%);
            }
        }

        .#{$prefix}-grid-content {
            overflow-y: scroll;
        }
    }
}

.card {
    > .#{$prefix}-grid,
    > .#{$prefix}-treegrid {
        &:first-child {
            > div[class^="#{$prefix}-grid"] {
                &:first-child:not(.#{$prefix}-grid-cell-inner) {
                    @include border-top-radius($border-radius-sm);
                }

                &:last-child:not(.#{$prefix}-grid-cell-inner) {
                    @include border-bottom-radius($border-radius-sm);
                }
            }

            > div:first-child {
                > div[class^="#{$prefix}-grid"] {
                    &:first-child:not(.#{$prefix}-grid-cell-inner) {
                        @include border-top-radius($border-radius-sm);
                    }

                    &:last-child:not(.#{$prefix}-grid-cell-inner) {
                        @include border-bottom-radius($border-radius-sm);
                    }
                }
            }
        }

        > div:last-child > div[class^="#{$prefix}-grid"],
        > div[class^="#{$prefix}-grid"] {
            &:last-child:not(.#{$prefix}-grid-cell-inner) {
                @include border-bottom-radius($border-radius-sm);
            }
        }

        .#{$prefix}-pagination {
            @include border-bottom-radius($border-radius-sm);
        }
    }

    .card-body {
        .#{$prefix}-grid,
        .#{$prefix}-treegrid {
            .#{$prefix}-grid-header {
                border-top: $table-border-width solid $table-border-color;
            }
        }
    }
}

@include media-breakpoint-down(sm) {
    .#{$prefix}-grid {
        &.#{$prefix}-grid-flip {
            .#{$prefix}-grid-header,
            .#{$prefix}-grid-footer,
            .#{$prefix}-grid-content {
                .#{$prefix}-grid-cell-selection {
                    width: auto;
                }

                table {
                    table-layout: auto;
                    display: inline-flex;

                    thead, tfoot {
                        @include flexbox((display: flex, flex-shrink: 0));

                        th {
                            color: $gray-800;
                            font-weight: $font-weight-bold;
                            text-align: left !important;
                            padding-right: 1.2rem;

                            &.row-numbering {
                                border-right: none;
                            }

                            .sort-asc, .sort-desc {
                                float: right;
                            }
                        }
                    }

                    tbody, tfoot {
                        @include display-flex();
                        position: relative;
                        overflow-x: auto;
                        overflow-y: hidden;
                    }

                    tbody {
                        td {
                            border-right: $table-border-width solid $table-border-color;

                            &.row-numbering {
                                text-align: left !important;
                            }
                        }
                    }

                    tr {
                        @include flexbox((display: flex, flex-direction: column));
                        min-width: min-content;

                        td, th {
                            display: block;
                            border-top: $table-border-width solid $table-border-color;

                            &:first-child {
                                border-top: none;
                            }
                        }

                        &:last-child {
                            td {
                                border-right: none;
                            }
                        }
                    }
                }
            }

            .#{$prefix}-grid-header {
                border-right: $table-border-width solid $table-border-color;
                border-bottom-width: 0;
                max-width: 40%;
            }

            .#{$prefix}-grid-footer {
                border-left: $table-border-width solid $table-border-color;
                border-top: 0 none;
                max-width: 30%;

                > .#{$prefix}-grid-footer-wrap {
                    overflow-x: auto;
                    overflow-y: hidden;
                }
            }
        }
    }

    .card {
        > .#{$prefix}-grid {
            &.#{$prefix}-grid-flip {
                div[class^="#{$prefix}-grid"] {
                    &:first-child {
                        @include border-top-right-radius(0);
                        @include border-bottom-left-radius($border-radius-sm);
                    }
                }

                .#{$prefix}-grid-content {
                    @include border-top-right-radius($border-radius-sm);
                }
            }
        }

        .card-body {
            .#{$prefix}-grid {
                &.#{$prefix}-grid-flip {
                    .#{$prefix}-grid-header,
                    .#{$prefix}-grid-content {
                        border-top: $table-border-width solid $table-border-color;
                    }
                }
            }
        }
    }
}
</style>
