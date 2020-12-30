<template>
  <td
    :class="column ? column.columnCls : null"
    :style="_cellStyles"
    class="md-grid-cell"
    role="gridcell">
    <div class="md-grid-cell-inner">
      <slot>
        <div v-if="hasFormatter" v-html="value"></div>
        <template v-else>
          {{ value === '' || value === null ? '&nbsp;' : value }}
        </template>
      </slot>
    </div>
  </td>
</template>

<script>
import Cell from "./mixins/Cell";

export default {
    name: "BsGridCell",
    mixins: [Cell]
}
</script>

<style scoped>

</style>
