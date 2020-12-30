<template>
  <th class="md-grid-cell-selection" role="columnheader">
    <div class="md-grid-cell-inner">
      <bs-checkbox
        :color="color"
        :model="allSelected"
        @change="_onChange" />
    </div>
  </th>
</template>

<script>
import BsCheckbox from "../BsField/BsCheckbox";

export default {
    name: "BsGridColumnSelection",
    components: {BsCheckbox},
    inject: ['BsGrid'],
    props: {
        color: {
            type: String,
            default: undefined
        },
        dataItems: {
            type: Array,
            default: undefined
        }
    },
    computed: {
        selectedItems() {
            return this.BsGrid.selectedItems;
        },
        allSelected() {
            if (this.selectedItems.length === 0) {
                return false;
            }

            return this.dataItems.every(item => this.selectedItems.includes(item));
        }
    },
    methods: {
        /**
         * Handle onChange event.
         *
         * @param {*} value The received value
         * @returns {void}
         * @private
         */
        _onChange(value) {
            if (value) {
                this.BsGrid.selectedItems = this.selectedItems.concat(this.dataItems.filter(item => !this.selectedItems.includes(item)));
            } else {
                this.BsGrid.selectedItems = this.selectedItems.filter(item => !this.dataItems.includes(item));
            }
        }
    }
}
</script>

<style scoped>

</style>
