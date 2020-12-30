import Vue from "vue";
import Helper from "../utils/Helper";
import AbstractStore from "./AbstractStore";
import averageBy from "lodash/meanBy";
import sumBy from "lodash/sumBy";


/**
 * Class to make store's collection from Array data easier.
 *
 * @author Ahmad Fajar
 * @since  13/03/2019 modified: 18/05/2020 1:32
 */
export default class BsArrayStore extends AbstractStore {
    /**
     * Class constructor.
     *
     * @param {Object[]} [data] Collection of records to be assigned
     * @param {Object} [config] The configuration properties
     */
    constructor(data = [], config = {}) {
        super(config);

        if (data && data.length > 0) {
            this.assignData(data);
        }
    }

    /**
     * Returns dataset from the active page.
     *
     * @type {BsModel[]|Object[]}
     */
    get dataItems() {
        const page   = this.currentPage > 0 && this.currentPage <= this.totalPages ? this.currentPage - 1 : 0;
        const offset = page * this.pageSize;

        if (this.filters.length > 0) {
            if (this._filterItems.length === 0) {
                this._filterItems = this.localFilter();
            }

            return this._filterItems.slice(offset, this.pageSize > 0 ? offset + this.pageSize : undefined);
        }

        return this._items.slice(offset, this.pageSize > 0 ? offset + this.pageSize : undefined);
    }

    /**
     * Returns total number of items in the Store's dataset.
     *
     * @type {number}
     */
    get totalCount() {
        return this._items.length;
    }

    /**
     * Returns total number of pages.
     *
     * @type {number}
     */
    get totalPages() {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    /**
     * Calculate means or average value from a field in the local storage.
     *
     * @param {string} field The field name of the dataset to calculate
     * @returns {number} The average value
     */
    aggregateAvg(field) {
        return averageBy(this._items, field);
    }

    /**
     * Count number of items in the local storage specified by the given criteria.
     *
     * @param {string} field The grouping field name criteria
     * @param {*} value      The grouping value criteria
     * @returns {number} The number of items
     */
    aggregateCountBy(field, value) {
        const results = this._items.filter(item => {
            return value === Helper.getObjectValueByPath(item, field);
        });

        return results.length;
    }

    /**
     * Calculate the SUM or total value from a field in the local storage.
     *
     * @param {string} field The field name to be used when calculating value
     * @returns {number} The sum's value
     */
    aggregateSum(field) {
        return sumBy(this._items, field);
    }

    /**
     * Append an item to the Store's dataset.
     *
     * @param {Object} item     Data to append to the Store
     * @param {boolean} sorted  Sort dataset after appended
     * @returns {void}
     */
    append(item, sorted = false) {
        if (!Helper.isEmpty(item)) {
            this._append(item);
            if (sorted === true && this.sorters.length > 0) {
                this._items = this.localSort();
            }
        }
    }

    /**
     * Replace the dataset with new data.
     *
     * @param {Object|Object[]} data The new data to be assigned
     * @param {boolean} silent       Append the data silently and don't trigger data conversion
     * @returns {void}
     */
    assignData(data, silent = false) {
        this._assignData(data, silent);
        if (this.sorters.length > 0) {
            this._items = this.localSort();
        }

        Vue.set(this, 'loading', false);
    }

    /**
     * Load the dataset.
     *
     * @param {Object[]|Object} [data] A record or collection of records to be assigned
     * @returns {Promise<any>} Promise interface
     */
    load(data = null) {
        return new Promise(resolve => {
            if (!Helper.isEmpty(data)) {
                this.assignData(data);
            } else if (this.sorters.length > 0) {
                this._items = this.localSort();
            }

            return resolve(this._items);
        });
    }

    /**
     * Sorts the dataset by the given field or *ISorter* criteria.
     *
     * @example
     * // sort by a single field
     * let results = myStore.sort('myField', 'asc');
     *
     * //sorting by multiple fields
     * let results = myStore.sort([
     *  {property: 'age', direction: 'desc'},
     *  {property: 'name', direction: 'asc'}
     * ]);
     *
     * @param {string|ISorter[]|Object[]} field  The field for sorting or ISorter objects
     * @param {'asc'|'desc'} direction           The sort direction
     * @returns {Object[]} Collection
     */
    sort(field = null, direction = 'asc') {
        this._createSorters(field, direction);
        this._items = this.localSort();
        return this._items;
    }

}
