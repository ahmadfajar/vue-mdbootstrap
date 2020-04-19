<template>
  <tr role="row" :class="_rowClasses">
    <slot />
  </tr>
</template>

<script>
export default {
    name: "BsGridRow",
    inject: ['BsGrid'],
    props: {
        item: {
            type: Object,
            default: undefined
        },
        index: {
            type: Number,
            default: undefined
        },
        selectionMode: {
            type: Object,
            default: undefined
        }
    },
    computed: {
        _rowClasses() {
            return [
                this.index % 2 === 0 ? 'md-grid-row' : 'md-grid-row-alt',
                this.isSelected ? 'md-state-' + this.selectionMode.checkboxColor : ''
            ]
        },
        isSelected() {
            return this.BsGrid.selectedItems.includes(this.item);
        }
    }
}
</script>

<style lang="scss">
  @import "../../../scss/colors";
  @import "../../../scss/variables";
  @import "../../../scss/mixins";

  @each $name, $color in $theme-colors {
    @include grid-rowstate-variant($name, $color);
  }
</style>
