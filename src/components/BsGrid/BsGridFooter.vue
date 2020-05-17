<template>
  <table role="grid" :style="_tableStyles">
    <colgroup v-if="!isSmallScreen || !flipOnSmallScreen">
      <col v-if="BsGrid.enableRowSelect()" :style="{width: _checkboxWidth + 'px'}" />
      <col v-for="(column, idx) in columns"
           :key="'col-' + BsGrid.uuid() + idx"
           :style="_colFooterStyles(column)" />
    </colgroup>
    <tfoot role="rowgroup">
      <tr role="row">
        <th role="gridcell" v-if="BsGrid.enableRowSelect()"></th>
        <slot>
          <bs-grid-footer-cell v-for="(col, idx) in columns"
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
         * Get checkbox column width.
         *
         * @return {number} Checkbox width
         * @private
         */
        _checkboxWidth() {
            return this.BsGrid.checkboxWidth;
        },
        /**
         * Gets table styles attributes.
         *
         * @return {Object} Css styles to apply in TABLE tag
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
         * @return {boolean} TRUE if grid footer must be flipped on smallscreen device otherwise FALSE
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
         * @return {Object} Css style object
         * @private
         */
        _colFooterStyles(col) {
            return Object.assign({width: Util.sizeUnit(col.width)}, col.headerStyle || {});
        },
        /**
         * Detect screen size and recalculate footer width.
         *
         * @return {void}
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
