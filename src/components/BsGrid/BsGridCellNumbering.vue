<template>
  <td class="md-grid-cell row-numbering" role="gridcell" :style="_cellStyles">
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
        column: {
            type: Object,
            default: undefined
        },
        item: {
            type: Object,
            default: undefined
        },
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
            const col    = this.column;
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
