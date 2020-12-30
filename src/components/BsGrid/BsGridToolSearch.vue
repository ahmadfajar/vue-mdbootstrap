<template>
  <bs-search-field
    v-model="value"
    v-bind="_attributes"
    @input="_resetSearch"
    @search="_beginSearch" />
</template>

<script>
import BsSearchField from "../BsField/BsSearchField";
import Helper from "../../utils/Helper";

export default {
    name: "BsGridToolSearch",
    components: {BsSearchField},
    inject: ['BsGrid'],
    props: {
        darkMode: Boolean,
        autofocus: {
            type: Boolean,
            default: false
        },
        field: {
            type: [String, Array],
            default: undefined
        },
        minlength: {
            type: [String, Number],
            default: 3,
            validator: value => parseInt(value, 10) > 0
        },
        logic: {
            type: String,
            default: 'AND',
            validator: value => ['AND', 'OR'].indexOf(value) > -1
        },
        operator: {
            type: String,
            default: 'contains',
            validator: value => ['eq', 'neq', 'startwith', 'endwith', 'contains', 'fts'].indexOf(value) > -1
        },
        placeholder: {
            type: String,
            default: 'Search...'
        },
        innerCls: {
            type: String,
            default: undefined
        },
        name: {
            type: String,
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        value: null
    }),
    computed: {
        /**
         * Get input field computed binding's attributes.
         *
         * @returns {Object|*} Attributes to bind
         */
        _attributes() {
            return {
                darkMode: this.darkMode,
                autofocus: this.autofocus,
                innerCls: this.innerCls,
                minlength: this.minlength,
                placeholder: this.placeholder,
                disabled: this.disabled,
                readonly: this.readonly,
                name: this.name
            }
        }
    },
    methods: {
        /**
         * Start searching any record with the given term.
         *
         * @param {string} term The search term
         * @returns {void}
         * @private
         */
        _beginSearch(term) {
            if (!Helper.isEmpty(this.field) && !Helper.isEmpty(term)) {
                let filters = [];

                if (Helper.isArray(this.field)) {
                    for (const fld of this.field) {
                        filters.push({property: fld, value: term, operator: this.operator});
                    }
                } else {
                    filters.push({property: this.field, value: term, operator: this.operator});
                }

                this.BsGrid.filter(filters, this.logic);
            }
        },
        /**
         * Remove search filter.
         *
         * @returns {void}
         * @private
         */
        _resetSearch() {
            if (this.value == null || this.value === '') {
                this.BsGrid.filter(null, this.logic);
            }
        }
    }
}
</script>

<style scoped>

</style>
