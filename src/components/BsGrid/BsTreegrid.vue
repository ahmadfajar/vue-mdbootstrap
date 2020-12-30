<template>
  <div
    :class="_classNames"
    :style="_gridStyles"
    class="md-treegrid">
    <slot name="toolbar"></slot>
    <div class="md-grid-header">
      <div ref="theader" class="md-grid-header-wrap">
        <table role="grid" :style="_tableStyles">
          <colgroup>
            <col
              v-for="(column, idx) in columnIterator"
              :key="'col-' + _uuid() + idx"
              :style="_colHeaderStyles(column)" />
          </colgroup>
          <thead role="rowgroup">
            <slot v-bind="{ items: dataItems }" name="columnheader"></slot>
            <tr v-if="!$scopedSlots['columnheader']" role="row">
              <slot></slot>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <bs-progress v-if="isLoading && loading.type === 'bar'" v-bind="_progressLoadingAttrs" />
    <div
      ref="tcontent"
      class="md-grid-content"
      @scroll="_handleScroll">
      <table role="treegrid" :style="_tableStyles">
        <colgroup>
          <col
            v-for="(column, idx) in columnIterator"
            :key="'col-' + _uuid() + idx"
            :style="_colDataStyles(column)" />
        </colgroup>
        <bs-treegrid-items
          ref="treeitems"
          v-slot="{ index, item, level, node }"
          :columns="columnIterator"
          :items="dataItems">
          <slot
            v-bind="{ columns: columnIterator, index: index, item: item, level: level, node: node }"
            name="datarow"></slot>
        </bs-treegrid-items>
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
    <div v-if="isLoading && loading.type === 'spinner'" class="md-grid-progress-spinner">
      <bs-progress v-bind="_progressLoadingAttrs" class="align-self-center" />
    </div>
  </div>
</template>

<script>
import BsAlert from "../BsBasic/BsAlert";
import BsProgress from "../BsAnimation/BsProgress";
import BsTreegridItems from "./BsTreegridItems";
import BsTreeStore from "../../model/BsTreeStore";
import BsArrayStore from "../../model/BsArrayStore";
import Helper from "../../utils/Helper";
import Common from "../../mixins/Common";
import Grid from "./mixins/Grid";
import sum from 'lodash/sum';
import { addResizeListener, removeResizeListener } from "../../utils/ResizeListener";

export default {
    name: "BsTreegrid",
    components: {BsTreegridItems, BsProgress, BsAlert},
    mixins: [Common, Grid],
    props: {
        childrenFieldmap: {
            type: String,
            default: 'children'
        },
        /**
         * @type {BsTreeStore|BsArrayStore|*}
         */
        dataSource: {
            type: [BsTreeStore, BsArrayStore],
            default: undefined
        },
        expandDepth: {
            type: [Number, String],
            default: 0,
            validator: v => !isNaN(parseInt(v, 10))
        },
        expanded: {
            type: Boolean,
            default: false
        },
    },
    data: (vm) => ({
        columnsWidth: [],
        dataFetched: false,
        isFetching: false,
        table: {
            columns: [],
            childrenFieldmap: vm.childrenFieldmap,
            /**
             * @type {BsTreeStore|BsArrayStore}
             */
            dataSource: vm.dataSource,
            expandDepth: vm.expandDepth,
            expanded: vm.expanded,
            tableWidth: undefined,
            // methods
            /**
             * Filter the data based on the given filters and fire event <tt>'filter'</tt> after data has been filtered.
             *
             * @param {IFilter[]} filters - Collection of filters to be used
             * @param {string} logic      - The filter logic to be used (optional)
             */
            fireEvent: vm.fireEvent
        }
    }),
    provide() {
        const _grid = this.table;

        return {
            TreeGrid: _grid
        }
    },
    created() {
        this._fetchData();
    },
    mounted() {
        addResizeListener(this.$el, this._updateTableWidth);
        this._updateBodyHeight();
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this._updateTableWidth);
        this.columnsWidth = null;
        this.table.columns = null;
        this.table = null;
    },
    methods: {
        /**
         * Fetch data from array data source or remote server.
         *
         * @returns {void}
         * @private
         */
        _fetchData() {
            this.isFetching = true;

            if (!Helper.isEmpty(this.dataSource)) {
                if (this.$refs.treeitems) {
                    this.$refs.treeitems.treeNodes = [];
                }
                this.dataSource
                    .load()
                    .then(() => {
                        this.dataFetched = true;
                        this.isFetching = false;
                        this.fireEvent('data-bind', this.dataSource.dataItems);
                        if (this.$refs.treeitems) {
                            this.$refs.treeitems.populateNodes(0, this.dataSource.dataItems);
                        }
                    })
                    .catch(error => {
                        this.dataFetched = true;
                        this.isFetching = false;
                        this.fireEvent('error', error);
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
         * Update TreeGrid body height.
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
         * Detect screen size and recalculate TreeGrid width.
         *
         * @returns {void}
         * @private
         */
        _updateTableWidth() {
            if (this.$el && this.columnIterator.length > 0) {
                if (this.columnsWidth.length === 0) {
                    this.columnsWidth = this.columnIterator.map(col => col.width ? Number(col.width) : 0);
                }
                const numCols = this.columnIterator.length;
                const elWidth = this.isFixedHeight
                    ? (this.$el.getBoundingClientRect().width - 18)
                    : this.$el.getBoundingClientRect().width;

                let avgColWidth = 0;
                let tmpCols = this.columnsWidth.map(col => col);
                let decWidth = true;
                let totWidth = sum(tmpCols);
                const colsNoWidth = tmpCols.filter(c => c === 0);

                if (elWidth > totWidth && colsNoWidth.length > 0) {
                    avgColWidth = Math.floor((elWidth - totWidth) / colsNoWidth.length);
                }

                this.table.columns = this.columnIterator.map((col, idx) => {
                    if (tmpCols[idx] === 0) {
                        const minWidth = parseInt(col.minWidth, 10);

                        if (avgColWidth < minWidth) {
                            col.width = decWidth ? (minWidth - 1) : minWidth;
                        } else if (elWidth < (totWidth + avgColWidth)) {
                            if (idx === numCols - 1) {
                                col.width = Math.max((elWidth - totWidth), minWidth) - (decWidth ? 1 : 0);
                            } else {
                                col.width = decWidth ? (minWidth - 1) : minWidth;
                            }
                        } else {
                            col.width = decWidth ? (avgColWidth - 1) : avgColWidth;
                        }
                        totWidth += col.width;
                        decWidth = false;
                    }

                    return col;
                });

                this.table.tableWidth = totWidth <= elWidth ? elWidth : totWidth;
            } else {
                this.table.tableWidth = null;
            }
        },
        /**
         * Reload data from the remote server.
         *
         * @returns {void}
         */
        reload() {
            this._fetchData();
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-treegrid {
    .#{$prefix}-grid-content {
        tr {
            @include transition($transition-basic);

            > .#{$prefix}-treegrid-cell {
                &:first-child {
                    padding-left: $table-cell-padding;
                }

                .#{$prefix}-grid-cell-inner {
                    padding-left: .2rem;
                }

                .icon-chevron-right {
                    @include transition($transition-basic);

                    &.expanded {
                        @include transform(rotateZ(90deg));
                    }
                }
            }
        }
    }
}
</style>
