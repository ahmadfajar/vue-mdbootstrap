<template>
  <tr role="row" :class="_rowClasses">
    <slot></slot>
  </tr>
</template>

<script>
export default {
    name: "BsGridRow",
    inject: ['BsGrid'],
    props: {
        /**
         * The row item object.
         * @type {Object|*}
         */
        item: {
            type: Object,
            default: undefined
        },
        /**
         * The row index position.
         * @type {number|*}
         */
        index: {
            type: Number,
            default: undefined
        },
        /**
         * The row selection mode.
         * @type {Object|*}
         */
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
