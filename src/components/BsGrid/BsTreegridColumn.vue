<template>
  <th
    :class="columnCls"
    :style="_headerStyles"
    role="columnheader">
    <div class="md-grid-th-inner">
      {{ label }}&nbsp;
    </div>
  </th>
</template>

<script>
import Column from "./mixins/Column";

export default {
    name: "BsTreegridColumn",
    mixins: [Column],
    inject: ['TreeGrid'],
    data: () => ({
        colIndex: null
    }),
    created() {
        this._registerColumn();
    },
    methods: {
        _registerColumn() {
            const idx = this.TreeGrid.columns.push({
                field: this.field,
                label: this.label,
                width: this.width,
                minWidth: this.minWidth,
                columnCls: this.columnCls,
                formatter: this.formatter,
                formatterOptions: this.formatterOptions,
                textAlign: this.textAlign,
                dataAlign: this.dataAlign,
                dataStyle: this.dataStyle,
                headerAlign: this.headerAlign,
                headerStyle: this.headerStyle
            });

            this.colIndex = idx - 1;
        }
    }
}
</script>

<style scoped>

</style>
