<template>
  <table :style="_tableStyles" role="grid">
    <colgroup v-if="!isSmallScreen || !flipOnSmallScreen">
      <col v-if="BsGrid.enableRowSelect()" :style="{width: _checkboxWidth + 'px'}" />
      <col
        v-for="(column, idx) in columns"
        :key="'col-' + BsGrid.uuid() + idx"
        :style="_colFooterStyles(column)" />
    </colgroup>
    <tfoot role="rowgroup">
      <tr role="row">
        <th v-if="BsGrid.enableRowSelect()" role="gridcell"></th>
        <slot>
          <bs-grid-footer-cell
            v-for="(col, idx) in columns"
            :key="col.field + '-' + idx"
            :column="col"
            :index="idx" />
        </slot>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import BsGridFooterCell from "./BsGridFooterCell";
import ScreenSize from "../../mixins/ScreenSize";
import Util from "../../utils/Helper";
import { addResizeListener, removeResizeListener } from "../../utils/ResizeListener";

export default {
    name: "BsGridFooter",
    components: {BsGridFooterCell},
    mixins: [ScreenSize],
    inject: ['BsGrid'],
    props: {
        columns: {
            type: Array,
            default: undefined
        }
    },
    data: () => ({
        isSmallScreen: false
    }),
    computed: {
        /**
         * @property {IBsGrid} BsGrid
         */

        /**
         * Get checkbox column width.
         *
         * @returns {number} Checkbox width
         * @private
         */
        _checkboxWidth() {
            return this.BsGrid.checkboxWidth;
        },
        /**
         * Gets table styles attributes.
         *
         * @returns {Object} Css styles to apply in TABLE tag
         * @private
         */
        _tableStyles() {
            return {
                width: Util.sizeUnit(this.BsGrid.tableWidth)
            }
        },
        /**
         * Flip grid footer on SmallScreen device?
         *
         * @returns {boolean} TRUE if grid footer must be flipped on small-screen device otherwise FALSE
         */
        flipOnSmallScreen() {
            return this.BsGrid.flipOnSmallScreen;
        }
    },
    mounted() {
        addResizeListener(this.$el, this._updateWidth);
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this._updateWidth);
    },
    methods: {
        /**
         * Get computed gridcolumn footer styles.
         *
         * @param {Object} col  Column object
         * @returns {Object} Css style object
         * @private
         */
        _colFooterStyles(col) {
            return Object.assign({width: Util.sizeUnit(col.width)}, col.headerStyle || {});
        },
        /**
         * Detect screen size and recalculate footer width.
         *
         * @returns {void}
         * @private
         */
        _updateWidth() {
            this.isSmallScreen = this.screenMaxSm.matches;
        },
    }
}
</script>

<style scoped>

</style>
