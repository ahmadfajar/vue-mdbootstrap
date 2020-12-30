<template>
  <div class="md-combobox-list-container">
    <label
      v-if="showSearchBox"
      ref="search"
      class="md-combobox-search-wrapper"
      :class="{['bg-' + listboxColor]: listboxColor}">
      <input
        ref="input"
        type="text"
        autocomplete="off"
        class="md-combobox-search"
        role="textbox"
        tabindex="-1"
        :value="searchText"
        @input="filterData($event.target.value, false)" />
    </label>
    <bs-list-view :style="containerStyles" :color="listboxColor">
      <bs-list-tile v-if="dataItems.length === 0">
        <slot name="emptyDataMessage"></slot>
      </bs-list-tile>
      <bs-list-tile v-else-if="filteredItems.length === 0">
        <bs-list-tile-title>{{ notFoundMessage }}</bs-list-tile-title>
      </bs-list-tile>
      <template v-else>
        <template v-for="(item, index) in filteredItems">
          <bs-list-tile
            :key="getUuid + index"
            :active="isActiveItem(item)"
            :disabled="disabled === true ? disabled : itemPropertyValue(item, disableField)"
            navigable
            @mousedown="e => e.preventDefault()"
            @click="onItemClick(item)">
            <template v-if="multiple">
              <bs-list-tile-action v-if="checkOptionPosition !== 'right'">
                <bs-checkbox
                  v-model="cacheBoolValues[index]"
                  :disabled="isDisabled(item)"
                  :color="checkOptionColor"
                  @change="onItemClick(item)" />
              </bs-list-tile-action>
              <bs-list-tile-leading
                v-if="showImage && hasProperty(item, imageField)"
                :img-src="itemPropertyValue(item, imageField)"
                :circle="circleImage"
                :rounded="roundedImage"
                :size="imageSize" />
              <bs-list-tile-content>
                <slot name="optionItem" v-bind="{ item, index }"></slot>
              </bs-list-tile-content>
              <bs-list-tile-action v-if="checkOptionPosition === 'right'">
                <bs-checkbox
                  v-model="cacheBoolValues[index]"
                  :disabled="isDisabled(item)"
                  :color="checkOptionColor"
                  @change="onItemClick(item)" />
              </bs-list-tile-action>
            </template>
            <template v-else>
              <bs-list-tile-leading
                v-if="showImage && hasProperty(item, imageField)"
                :circle="circleImage"
                :rounded="roundedImage"
                :size="imageSize"
                :img-src="itemPropertyValue(item, imageField)" />
              <bs-list-tile-content>
                <slot name="optionItem" v-bind="{ item, index }"></slot>
              </bs-list-tile-content>
            </template>
          </bs-list-tile>
          <bs-divider
            v-if="itemSeparator && (index + 1 < filteredItems.length)"
            :key="'div-' + index" />
        </template>
      </template>
    </bs-list-view>
  </div>
</template>

<script>
import BsCheckbox from "./BsCheckbox";
import BsListView from "../BsList/BsListView";
import BsListTile from "../BsList/BsListTile";
import BsListTileContent from "../BsList/BsListTileContent";
import BsListTileAction from "../BsList/BsListTileAction";
import BsListTileLeading from "../BsList/BsListTileLeading";
import BsListTileTitle from "../BsList/BsListTileTitle";
import BsDivider from "../BsBasic/BsDivider";
import Helper from "../../utils/Helper";

export default {
    name: "BsComboboxListContainer",
    components: {
        BsDivider, BsListView, BsListTile, BsListTileContent, BsListTileAction,
        BsListTileLeading, BsListTileTitle, BsCheckbox
    },
    inject: ['getItemValue', 'getItemText', 'hasProperty', 'itemPropertyValue'],
    props: {
        active: Boolean,
        disabled: Boolean,
        itemSeparator: Boolean,
        multiple: Boolean,
        showImage: Boolean,
        roundedImage: Boolean,
        circleImage: Boolean,
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
        listboxColor: {
            type: String,
            default: undefined
        },
        checkOptionColor: {
            type: String,
            default: undefined
        },
        checkOptionPosition: {
            type: String,
            default: undefined,
            validator(value) {
                return ['left', 'right'].indexOf(value) > -1;
            }
        },
        imageSize: {
            type: [Number, String],
            default: undefined,
            validator: value => parseInt(value, 10) > 0
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
        cacheListItems: vm.dataItems || [],
        cacheBoolValues: [],
        searchText: ''
    }),
    computed: {
        /**
         * @returns {Object[]} Collection of items that match the filter
         */
        filteredItems() {
            if (this.active && Helper.isEmpty(this.searchText)) {
                return this.dataItems;
            }

            return this.cacheListItems;
        },
        /**
         * Get styles for ComboBox list container.
         *
         * @returns {Object|null} Container styles
         */
        containerStyles() {
            const mHeight = this.maxHeight;

            if (this.active) {
                this.filterData(this.searchText, true);
                if (this.showSearchBox) {
                    this.$nextTick(() => this.$refs.input.focus());
                }

                return {
                    maxHeight: (this.showSearchBox ? mHeight - this.$refs.search.offsetHeight : mHeight) + 'px'
                }
            } else {
                this._resetSearchText();
            }

            return null;
        },
        selectedValues() {
            return this.selectedItems.map(item => this.getItemValue(item));
        },
        /**
         * Check if input search box will be displayed or not.
         *
         * @returns {boolean} If true then search box will be displayed
         */
        showSearchBox() {
            return this.dataItems.length > this.minimumItemsForSearch;
        }
    },
    beforeDestroy() {
        this.cacheListItems  = [];
        this.cacheBoolValues = [];
    },
    methods: {
        /**
         * Check if the given object has a property or not.
         *
         * @method hasProperty
         * @param {Object} item  The object to evaluate
         * @param {string} field The property name to check
         * @returns {boolean} TRUE if has the property otherwise false
         */

        /**
         * Get object property value from the given item.
         *
         * @method itemPropertyValue
         * @param {Object} item           The object to evaluate
         * @param {String|Function} field The property name
         * @returns {string|boolean|number} The property value
         */

        /**
         * Generate simple UUID (non standard).
         *
         * @returns {string} The uuid-v4 string
         */
        getUuid() {
            return Helper.uuid();
        },
        /**
         * Check the given item is selected or not.
         *
         * @param {Object} item The item to be checked
         * @returns {boolean} `True` if the checked item is in active state otherwise `False`
         */
        isActiveItem(item) {
            return this.selectedValues.includes(this.getItemValue(item));
        },
        /**
         * Check if selection for the given item must be disabled or not.
         *
         * @param {Object} item The object to evaluate
         * @returns {boolean} Item checkbox state
         */
        isDisabled(item) {
            return (this.disabled === true ? true : this.itemPropertyValue(item, this.disableField));
        },
        /**
         * Handler when ListItem is clicked.
         *
         * @private
         * @param {Object} item The ListItem value
         * @returns {void}
         */
        onItemClick(item) {
            const idx = this.filteredItems.indexOf(this.getItemValue(item));

            if (this.isActiveItem(item)) {
                this.cacheBoolValues[idx] = false;
                this.$emit('item-deselected', item);
            } else {
                this.cacheBoolValues[idx] = true;
                this.$emit('item-selected', item);
            }
        },
        /**
         * Start searching or filter data according to the given value from the searchBox.
         *
         * @private
         * @param {string} search  The text to search
         * @param {boolean} silent Trigger event or not
         * @returns {void}
         */
        filterData(search, silent = true) {
            if (this.active && search.length > 0) {
                const lowerText = search.toLowerCase();
                this.searchText = search;

                this.cacheListItems  = this.dataItems.filter(
                    item => this.getItemText(item).toLocaleLowerCase().includes(lowerText)
                );
                this.cacheBoolValues = this.cacheListItems.map(
                    item => this.selectedItems.includes(item)
                );
            } else {
                this.cacheListItems  = this.dataItems;
                this.cacheBoolValues = this.dataItems.map(
                    item => this.selectedItems.includes(item)
                );
                this._resetSearchText();
            }
            if (!silent) {
                this.$emit('data-filtered', this.cacheListItems);
            }
        },
        _resetSearchText() {
            this.searchText = '';
        }
    }
}
</script>

<style scoped>

</style>
