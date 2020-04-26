<template>
  <div class="md-combobox-list-container">
    <label v-if="showSearchBox"
           ref="search"
           class="md-combobox-search-wrapper">
      <input ref="input"
             type="text"
             autocomplete="off"
             class="md-combobox-search"
             role="textbox"
             tabindex="-1"
             :value="searchText"
             @input="filterData($event.target.value)" />
    </label>
    <bs-list :style="containerStyles">
      <template v-if="dataItems.length === 0">
        <slot name="emptyData">
          <div class="px-3 py-1">
            {{ emptyDataMessage }}
          </div>
        </slot>
      </template>
      <div v-else-if="catchFilteredItems.length === 0"
           class="px-3 py-1">
        {{ notFoundMessage }}
      </div>
      <template v-else>
        <template v-for="(item, index) in catchFilteredItems">
          <bs-list-tile :key="getUuid + index"
                        :value="catchSelectedItems.indexOf(getItemValue(item)) !== -1"
                        :disabled="disabled === true ? disabled : objectPropertyValue(item, disableField)"
                        @mousedown="e => e.preventDefault()"
                        @click="onItemClick(item)">
            <slot v-bind="{ item, index }"></slot>
          </bs-list-tile>
          <bs-divider v-if="itemSeparator && (index + 1 < catchFilteredItems.length)"
                      :key="'div-' + index" />
        </template>
      </template>
    </bs-list>
  </div>
</template>

<script>
import BsList from "../BsList/BsListView";
import BsListTile from "../BsList/BsListTile";
import BsDivider from "../BsBasic/BsDivider";
import Util from "../../utils/Helper";

export default {
    name: "BsComboboxListContainer",
    components: {
        BsDivider, BsList, BsListTile
    },
    inject: ['getItemValue', 'getItemText'],
    props: {
        active: Boolean,
        disabled: Boolean,
        itemSeparator: Boolean,
        cascadeField: {
            type: String,
            default: undefined
        },
        disableField: {
            type: String,
            default: undefined
        },
        displayField: {
            type: String,
            default: undefined
        },
        imageField: {
            type: String,
            default: undefined
        },
        valueField: {
            type: String,
            default: undefined
        },
        emptyDataMessage: {
            type: String,
            default: undefined
        },
        notFoundMessage: {
            type: String,
            default: undefined
        },
        minimumItemsForSearch: {
            type: Number,
            default: undefined
        },
        maxHeight: {
            type: Number,
            default: undefined
        },
        selectedItems: {
            type: Array,
            default: undefined
        },
        dataItems: {
            type: Array,
            default: undefined
        },
    },
    data: (vm) => ({
        filteredItems: vm.dataItems || [],
        searchText: ''
    }),
    computed: {
        catchSelectedItems() {
            return this.selectedItems.map(item => this.getItemValue(item));
        },
        catchFilteredItems() {
            if (this.active && Util.isEmpty(this.searchText)) {
                this.filteredItems = this.dataItems;
            }

            return this.filteredItems;
        },
        /**
         * Get styles for ComboBox list container.
         *
         * @return {Object|null} Container styles
         */
        containerStyles() {
            const mHeight = this.maxHeight;

            if (this.active) {
                if (this.showSearchBox) {
                    this.$nextTick(() => this.$refs.input.focus());
                }

                return {
                    maxHeight: (this.showSearchBox ? mHeight - this.$refs.search.offsetHeight : mHeight) + 'px'
                }
            } else {
                this.searchText = '';
            }

            return null;
        },
        /**
         * Check if input search box will be displayed or not.
         *
         * @return {boolean} If true then search box will be displayed
         */
        showSearchBox() {
            return this.dataItems.length > this.minimumItemsForSearch;
        }
    },
    beforeDestroy() {
        this.filteredItems = [];
    },
    methods: {
        /**
         * Generate simple UUID (non standard).
         *
         * @return {string} The uuid-v4 string
         */
        getUuid() {
            return Util.uuid();
        },
        /**
         * Check the given item is selected or not.
         *
         * @param {Object} item The item to be checked
         * @return {boolean} `True` if the checked item is in active state otherwise `False`
         */
        isActiveItem(item) {
            return this.selectedItems.includes(item);
        },
        /**
         * Get property value from the given object.
         *
         * @param {Object} item  The object to evaluate
         * @param {string} field The property name
         * @return {string|boolean|number} The value of a property
         */
        objectPropertyValue(item, field) {
            return Util.getObjectValueByPath(item, field);
        },
        /**
         * Handler when ListItem is clicked.
         *
         * @private
         * @param {Object} item The ListItem value
         * @return {void}
         */
        onItemClick(item) {
            if (this.isActiveItem(item)) {
                this.$emit('deselect', item);
            } else {
                this.$emit('select', item);
            }
        },
        /**
         * Start searching or filter data according to the given value from the searchBox.
         *
         * @private
         * @param {string} search The text to search
         * @return {void}
         */
        filterData(search) {
            if (this.active && search.length > 1) {
                this.searchText    = search;
                const s            = search.toLowerCase();
                this.filteredItems = this.dataItems.filter(item => this.getItemText(item).toLocaleLowerCase().indexOf(s) > -1);
            } else {
                this.searchText    = '';
                this.filteredItems = this.dataItems;
            }
            this.$emit('filter', this.filteredItems);
        }
    }
}
</script>

<style scoped>

</style>
