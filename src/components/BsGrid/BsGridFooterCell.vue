<template>
  <th
    :class="column.footerCls ? column.footerCls : column.columnCls"
    :style="_cellStyles"
    role="gridcell"
    x-ms-format-detection="none">
    <div class="md-grid-th-inner">
      <slot>
        {{ value === '' || value == null ? '&nbsp;' : value }}
      </slot>
    </div>
  </th>
</template>

<script>
import Helper from '../../utils/Helper';
import BsGridCell from "./BsGridCell";

export default {
    name: "BsGridFooterCell",
    extends: BsGridCell,
    inject: ['BsGrid'],
    computed: {
        /**
         * Get computed Cell value.
         *
         * @returns {string|number} Cell value
         */
        value() {
            const col = this.column;

            if (col && col.aggregate) {
                let value;
                const str = col.aggregate.toString().trim();
                const fn = Helper.isFunction(col.aggregate)
                    ? col.aggregate
                    : 'aggregate' + str.charAt(0).toUpperCase() + str.slice(1);

                if (Helper.isFunction(fn)) {
                    value = fn(col.field);
                } else if (Helper.isFunction(this.BsGrid.dataSource[fn])) {
                    value = this.BsGrid.dataSource[fn](col.field);
                } else {
                    return 'Invalid aggregate Function';
                }

                if (col.formatter) {
                    if (col.formatterOptions) {
                        return col.formatter(value, col.formatterOptions);
                    } else {
                        return col.formatter(value);
                    }
                } else {
                    return value;
                }
            } else if (col && col.footerText) {
                return col.footerText;
            }

            return '';
        }
    }
}
</script>

<style scoped>

</style>
