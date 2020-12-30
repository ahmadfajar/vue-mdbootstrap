<template>
  <td
    :style="_cellStyles"
    class="md-grid-cell row-numbering"
    role="gridcell">
    <div class="md-grid-cell-inner">
      {{ value }}
    </div>
  </td>
</template>

<script>
export default {
    name: "BsGridCellNumbering",
    inject: ['BsGrid'],
    props: {
        /**
         * @property {IBsGrid} BsGrid
         */

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
            type: Number,
            default: undefined
        }
    },
    computed: {
        /**
         * Get computed Cell styles.
         *
         * @returns {Object} Css styles to apply
         * @private
         */
        _cellStyles() {
            const col = this.column;
            const styles = col && col.dataStyle ? col.dataStyle : {};

            if (col) {
                if (col.textAlign || col.dataAlign) {
                    styles['textAlign'] = col.textAlign || col.dataAlign;
                }
            }

            return styles;
        },
        /**
         * Get computed Cell value.
         *
         * @returns {number} Row number
         */
        value() {
            return ((this.BsGrid.page - 1) * this.BsGrid.pageSize) + this.index + 1;
        }
    }
}
</script>

<style scoped>

</style>
