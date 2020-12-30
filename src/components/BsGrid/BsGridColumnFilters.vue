<template>
  <tr>
    <td v-if="BsGrid.enableRowSelect()">
      <bs-button
        v-if="columns[0].filterable.immediate === false"
        color="secondary"
        size="sm"
        @click="_doFilter">
        <font-awesome-icon icon="search" />
      </bs-button>
      <span v-else>&nbsp;</span>
    </td>
    <td
      v-for="(column, idx) in columns"
      :class="{'border-right': column.rowNumbering}"
      :key="BsGrid.uuid() + idx">
      <div v-if="column.filterable.enabled && _hasFieldName(idx)" class="md-field d-flex">
        <input
          v-bind="_inputAttrs(idx)"
          @change="_onChangeValue($event.target.value, idx)"
          @keydown="_onKeyDown($event, idx)" />
        <div
          v-if="column.filterable.placeholder"
          :class="_fieldClass(idx)"
          class="md-field-placeholder text-grey-400">
          <font-awesome-icon icon="search" />
        </div>
        <bs-button
          v-else-if="column.filterable.button"
          color="secondary"
          size="sm"
          @click="_doFilter">
          <font-awesome-icon icon="search" />
        </bs-button>
      </div>
      <bs-button
        v-else-if="column.filterable.button"
        color="secondary"
        size="sm"
        block
        @click="_doFilter">
        <font-awesome-icon icon="search" />
      </bs-button>
      <span v-else>&nbsp;</span>
    </td>
  </tr>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsButton from "../BsButton/BsButton";
import Helper from "../../utils/Helper";

export default {
    name: "BsGridColumnFilters",
    components: {FontAwesomeIcon, BsButton},
    inject: ['BsGrid'],
    props: {
        columns: {
            type: Array,
            default: undefined
        }
    },
    data: () => ({
        values: []
    }),
    created() {
        for (let i = 0; i < this.columns.length; i++) {
            this.values.push({index: i, keyword: null});
        }
    },
    beforeDestroy() {
        this.values = null;
    },
    methods: {
        /**
         * @property {IBsGrid} BsGrid
         */

        _fieldClass(index) {
            return {
                'd-none': (this.values[index].keyword !== '' && this.values[index].keyword != null)
            }
        },
        _hasFieldName(index) {
            const column = this.columns[index];

            return (!Helper.isEmpty(column.filterable.field) || !Helper.isEmpty(column.field));
        },
        /**
         * Get input field binding attributes.
         *
         * @param {int} index Column index
         * @returns {Object} Input field attributes
         * @private
         */
        _inputAttrs(index) {
            return {
                'type': 'text',
                'value': this.values[index].keyword,
                'class': 'form-control form-control-sm'
            }
        },
        /**
         * Filter existing dataItems with available filters.
         *
         * @returns {void}
         * @private
         */
        _doFilter() {
            let filters = [];

            for (const item of this.values) {
                const column = this.columns[item.index];

                if (!Helper.isEmpty(item.keyword) && item.keyword.trim().length >= column.filterable.minlength) {
                    if (Helper.isObject(column.filterable)) {
                        filters.push({
                            property: (column.filterable.field || column.field),
                            value: item.keyword.trim(),
                            operator: (column.filterable.operator || 'eq')
                        });
                    } else if (column.filterable === true) {
                        filters.push({property: column.field, value: item.keyword.trim(), operator: 'eq'});
                    }
                }
            }
            if (!Helper.isEmpty(filters)) {
                this.BsGrid.filter(filters);
            } else {
                this.BsGrid.filter(null);
            }
        },
        /**
         * Update input field value and fire input events.
         *
         * @param {string|number} value The input value
         * @param {int} index           Column index
         * @returns {void}
         * @private
         */
        _onChangeValue(value, index) {
            this.values[index].keyword = value;

            if (this.columns[index].filterable.immediate) {
                this._doFilter();
            }
        },
        /**
         * Handler when input field receive keypress.
         *
         * @param {KeyboardEvent} event The received event
         * @param {int} index           Column index
         * @returns {void}
         * @private
         */
        _onKeyDown(event, index) {
            if (event.key && event.key.toLowerCase() === 'enter') {
                this.values[index].keyword = event.target.value;

                if (this.columns[index].filterable.immediate === false) {
                    this._doFilter();
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-grid {
    .#{$prefix}-field {
        > .#{$prefix}-field-placeholder {
            position: absolute;
            left: 8px;
            top: 6px;
        }

        input[type='text']:focus {
            ~ .#{$prefix}-field-placeholder {
                display: none;
            }
        }
    }
}
</style>
