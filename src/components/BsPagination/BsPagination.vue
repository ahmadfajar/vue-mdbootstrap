<template>
  <div class="md-pagination-wrapper d-flex">
    <div class="col-lg-7">
      <div class="d-flex align-items-center">
        <bs-button
          :disabled="!navFirstPageEnabled"
          color="secondary"
          flat
          mode="icon"
          size="sm"
          @click="$emit('gotopage', 1)">
          <bs-icon icon="first_page" />
        </bs-button>
        <bs-button
          :disabled="!navFirstPageEnabled"
          color="secondary"
          flat
          mode="icon"
          size="sm"
          @click="$emit('prevpage')">
          <bs-icon icon="chevron_left" />
        </bs-button>
        <label class="d-inline-block mb-0 mx-1">
          <input
            v-model.lazy.number="currentPage"
            :readonly="totalPages < 2"
            class="form-control form-control-sm md-pagination-control"
            type="text" />
        </label>
        <bs-button
          :disabled="!navLastPageEnabled"
          color="secondary"
          flat
          mode="icon"
          size="sm"
          @click="$emit('nextpage')">
          <bs-icon icon="chevron_right" />
        </bs-button>
        <bs-button
          :disabled="!navLastPageEnabled"
          color="secondary"
          flat
          mode="icon"
          size="sm"
          @click="$emit('gotopage', totalPages)">
          <bs-icon icon="last_page" />
        </bs-button>
        <div class="md-pagination-pager d-md-flex align-items-center pl-2 d-none">
          <bs-combobox
            v-model="itemPerPage"
            :data-source="configuration.paging"
            :popover-min-width="70"
            outlined />
          <span class="md-pagination-text text-nowrap pl-2">{{ configuration.messages.pager }}</span>
        </div>
        <div class="flex-fill d-lg-none text-right">
          <bs-button
            color="secondary"
            flat
            icon="sync-alt"
            mode="icon"
            size="sm"
            @click="$emit('reload')" />
        </div>
      </div>
    </div>
    <div class="col-lg-5 d-none d-lg-block text-right">
      <span class="md-pagination-text pr-2">{{ _pageInfo }}</span>
      <bs-button
        color="secondary"
        flat
        icon="sync-alt"
        mode="icon"
        size="sm"
        @click="$emit('reload')" />
    </div>
  </div>
</template>

<script>
import BsButton from "../BsButton/BsButton";
import BsCombobox from "../BsField/BsCombobox";
import BsIcon from "../BsIcon/BsIcon";
import Helper from "../../utils/Helper";
import ceil from "lodash/ceil";
import mergeWith from "lodash/mergeWith";
import BsArrayStore from "../../model/BsArrayStore";

export default {
    name: "BsPagination",
    components: {BsButton, BsCombobox, BsIcon},
    props: {
        dataItems: {
            type: Array,
            default: undefined
        },
        page: {
            type: [Number, String],
            default: 1,
            validator: (v) => !isNaN(parseInt(v, 10))
        },
        pageable: {
            type: [Boolean, Object],
            default: undefined
        },
        pageSize: {
            type: [Number, String],
            default: 10,
            validator: (v) => !isNaN(parseInt(v, 10))
        },
        totalItems: {
            type: Number,
            default: undefined
        }
    },
    computed: {
        /**
         * Get information of current page.
         *
         * @returns {string} Information message
         * @private
         */
        _pageInfo() {
            if (this.dataItems.length > 0) {
                let msg = this.configuration.messages.display;
                const pg = this.currentPage - 1;
                const nA = (pg * this.itemPerPage) + 1;
                const nB = (pg * this.itemPerPage) + this.dataItems.length;
                const nC = this.totalItems;

                msg = msg.replace('{0}', nA).replace('{1}', nB).replace('{2}', nC);

                return msg;
            } else {
                return this.configuration.messages.empty;
            }
        },
        /**
         * Get pagination configuration.
         *
         * @returns {Object} Pager's configuration
         */
        configuration() {
            const source = Helper.isObject(this.pageable) ? this.pageable : {};
            const config = {
                messages: {
                    display: '{0}-{1} of {2} items',
                    empty: 'No data to display',
                    pager: 'items per page'
                },
                paging: [10, 15, 25, 50, [-1, 'All']]
            };

            const result = mergeWith(config, source, (v1, v2) => {
                if (Array.isArray(v1) && Array.isArray(v2)) {
                    return v2;
                }
            });
            const pager = new BsArrayStore(null, {idProperty: 'value'});

            for (const el of result.paging) {
                if (Helper.isArray(el)) {
                    pager.append({value: el[0], text: el[1]});
                } else {
                    pager.append({value: el, text: el});
                }
            }
            result.paging = {proxy: pager};

            return result;
        },
        /**
         * Get/Set current page property.
         */
        currentPage: {
            get() {
                return this.page;
            },
            set(value) {
                this.$emit('gotopage', value);
            }
        },
        /**
         * Get/Set property number of items to display.
         */
        itemPerPage: {
            get() {
                return this.pageSize;
            },
            set(value) {
                this.$emit('pagesize', value);
            }
        },
        navFirstPageEnabled() {
            return this.currentPage > 1;
        },
        navLastPageEnabled() {
            return this.currentPage < this.totalPages;
        },
        totalPages() {
            return ceil(this.totalItems / this.itemPerPage);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-pagination-wrapper {
    position: relative;
    overflow: hidden;
    padding-top: .8rem;
    padding-bottom: .8rem;
    width: 100%;

    .#{$prefix}-pagination-control {
        font-size: 14px;
        width: 44px;
        min-height: 36px;
    }

    .#{$prefix}-pagination-text {
        color: $table-header-color;
        // font-size: .875rem;
    }

    .btn-icon {
        margin-right: 0;
    }

    .#{$prefix}-pagination-pager {
        min-width: 160px;
    }

    .#{$prefix}-combobox {
        > .#{$prefix}-field-wrapper {
            font-size: .875rem;

            > .#{$prefix}-field-ctrl {
                > .#{$prefix}-field-inner {
                    padding-left: 0;

                    > fieldset {
                        padding: 0;
                    }

                    > .#{$prefix}-field-input-wrapper {
                        min-height: fit-content;
                        padding-left: $padding-base;

                        > .#{$prefix}-combobox-input {
                            padding: .4rem 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
