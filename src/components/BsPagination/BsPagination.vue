<template>
  <div class="md-pagination-wrapper d-flex">
    <div class="col-lg-7">
      <div class="d-flex align-items-center">
        <bs-button :disabled="!navFirstPageEnabled"
                   mode="icon"
                   color="secondary"
                   size="sm"
                   flat
                   @click="$emit('gotopage', 1)">
          <bs-icon icon="first_page" />
        </bs-button>
        <bs-button :disabled="!navFirstPageEnabled"
                   mode="icon"
                   color="secondary"
                   size="sm"
                   flat
                   @click="$emit('prevpage')">
          <bs-icon icon="chevron_left" />
        </bs-button>
        <label class="d-inline-block mb-0 mx-1">
          <input type="text"
                 class="form-control form-control-sm md-pagination-control"
                 v-model.lazy.number="currentPage"
                 :readonly="totalPages < 2" />
        </label>
        <bs-button :disabled="!navLastPageEnabled"
                   mode="icon"
                   color="secondary"
                   size="sm"
                   flat
                   @click="$emit('nextpage')">
          <bs-icon icon="chevron_right" />
        </bs-button>
        <bs-button :disabled="!navLastPageEnabled"
                   mode="icon"
                   color="secondary"
                   size="sm"
                   flat
                   @click="$emit('gotopage', totalPages)">
          <bs-icon icon="last_page" />
        </bs-button>
        <div class="md-pagination-pager d-md-flex align-items-center pl-1 d-none">
          <bs-combobox v-model="itemPerPage"
                       :items="configuration.pager"
                       :minimum-popover-width="70" />
          <span class="md-pagination-text text-nowrap pl-2">{{ configuration.messages.pager }}</span>
        </div>
        <div class="flex-fill d-lg-none text-right">
          <bs-button mode="icon"
                     color="secondary"
                     icon="sync-alt"
                     size="sm"
                     flat
                     @click="$emit('reload')" />
        </div>
      </div>
    </div>
    <div class="col-lg-5 d-none d-lg-block text-right">
      <span class="md-pagination-text pr-2">{{ _pageInfo }}</span>
      <bs-button mode="icon"
                 color="secondary"
                 icon="sync-alt"
                 size="sm"
                 flat
                 @click="$emit('reload')" />
    </div>
  </div>
</template>

<script>
import BsButton from "../BsButton/BsButton";
import BsIcon from "../BsIcon/BsIcon";
import BsCombobox from "../BsField/BsCombobox";
import Util from "../../utils/Helper";
import ceil from "lodash/ceil";
import mergeWith from "lodash/mergeWith";
// import { ceil, mergeWith } from "lodash";

export default {
    name: "BsPagination",
    components: {
        BsButton, BsIcon, BsCombobox
    },
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
         * @return {string} Information message
         * @private
         */
        _pageInfo() {
            if (this.dataItems.length > 0) {
                let msg  = this.configuration.messages.display;
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
         * @return {Object} Pager's configuration
         */
        configuration() {
            const source = Util.isObject(this.pageable) ? this.pageable : {};
            const config = {
                messages: {
                    display: '{0}-{1} of {2} items',
                    empty: 'No data to display',
                    pager: 'items per page'
                },
                pager: [10, 15, 25, 50, 75, 100, [-1, 'All']]
            };

            return mergeWith(config, source, (v1, v2) => {
                if (Array.isArray(v1) && Array.isArray(v2)) {
                    return v2;
                }
            });
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
    }

    .#{$prefix}-pagination-text {
      color: $table-header-color;
    }

    .btn-icon {
      margin-right: 0;
    }

    .#{$prefix}-pagination-pager {
      min-width: 160px;
    }

    .#{$prefix}-combobox-control-inner {
      > .#{$prefix}-combobox-input {
        @include user-select(none);
        cursor: pointer;
        padding-bottom: 0 !important;
        padding-left: 8px !important;
      }
    }
  }
</style>
