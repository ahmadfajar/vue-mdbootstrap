<template>
  <td class="md-grid-cell md-grid-cell-selection" role="gridcell">
    <div class="md-grid-cell-inner">
      <bs-checkbox
        v-model="selected"
        :color="selectionMode.checkboxColor"
        :disabled="!selectionMode.rowSelect || disabled"
        @change="onChange" />
    </div>
  </td>
</template>

<script>
import BsCheckbox from "../BsField/BsCheckbox";

export default {
    name: "BsGridCellSelection",
    components: {BsCheckbox},
    props: {
        value: Boolean,
        disabled: Boolean,
        item: {
            type: Object,
            default: undefined
        },
        selectionMode: {
            type: Object,
            default: undefined
        }
    },
    data: () => ({
        selected: false
    }),
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.selected = value;
            }
        }
    },
    methods: {
        onChange() {
            this.$emit('input', this.selected);
        }
    }
}
</script>

<style lang="scss">
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-grid {
    .#{$prefix}-grid-cell-selection {
        padding: 0 !important;
        width: $table-checkbox-selection-size;
        vertical-align: middle;

        .#{$prefix}-grid-cell-inner {
            font-size: $table-font-size;
            min-height: $table-checkbox-selection-size;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;

            > .#{$prefix}-checkbox {
                align-self: center;
                margin: $table-cell-padding;
            }
        }
    }
}
</style>
