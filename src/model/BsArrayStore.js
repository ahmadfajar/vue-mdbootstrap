import Vue from "vue";
import Helper from "../utils/Helper";
import AbstractStore from "./AbstractStore";
import averageBy from "lodash/meanBy";
import sumBy from "lodash/sumBy";
// import { meanBy as averageBy, sumBy } from "lodash";


/**
 * Class to make store's collection from Array data easier.
 *
 * @author Ahmad Fajar
 * @since  13/03/2019 modified: 15/03/2019 23:51
 */
export default class BsArrayStore extends AbstractStore {
    /**
     * Class constructor.
     *
     * @param {Object} [config]  The configuration properties
     * @param {Object[]} [datas] Collection of records to be assigned
     */
    constructor(config = {}, datas = []) {
        super(config);

        if (datas && datas.length > 0) {
            this.assignData(datas);
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

        return this._items.slice(offset, this.pageSize > 0 ? offset + this.pageSize : undefined);
    }

    /**
     * Returns total number of items in the Store's dataset.
     *
     * @type {int}
     */
    get totalCount() {
        return this._items.length;
    }

    /**
     * Returns total number of pages.
     *
     * @type {int}
     */
    get totalPages() {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    /**
     * Calculate means or average value of the Store's dataset.
     *
     * @param {string} field The fieldname to be used when calculating value
     * @returns {number} The average value
     */
    aggregateAvg(field) {
        return averageBy(this._items, field);
    }

    /**
     * Calculate SUM or total value of the Store's dataset.
     *
     * @param {string} field The fieldname to be used when calculating value
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
     * @return {void}
     */
    append(item, sorted = false) {
        if (!Helper.isEmpty(item)) {
            this._append(item);
            if (sorted === true) {
                this.sort().then();
            }
        }
    }

    /**
     * Assign datas to the Store's dataset.
     *
     * @param {Object|Object[]} datas A record or collection of records to be assigned
     * @param {boolean} silent        Append data silently and doesn't trigger data conversion
     * @return {void}
     */
    assignData(datas, silent = false) {
        this._assignData(datas, silent);
        Vue.set(this, 'loading', false);
    }

    /**
     * Load the data.
     *
     * @param {Object[]|Object} [datas] A record or collection of records to be assigned
     * @return {Promise<any>} Promise interface
     */
    load(datas = null) {
        return new Promise(resolve => {
            if (!Helper.isEmpty(datas)) {
                this.assignData(datas);
            }
            this.forceLocalSort().then(ret => {
                return resolve(ret);
            });
        });
    }

    /**
     * Sorts the data in the Store by one or more of its properties.
     *
     * @example
     *     // sort by a single field
     *     myStore.sort('myField', 'asc');
     *
     *     //sorting by multiple fields
     *     myStore.sort([
     *      {property: 'age', direction: 'desc'},
     *      {property: 'name', direction: 'asc'}
     *     ]);
     *
     * @param {string|ISorter[]|Object[]} field  The field for sorting
     * @param {'asc'|'desc'} direction           The sort direction
     * @return {Promise<any>} Promise interface
     */
    sort(field = null, direction = 'asc') {
        this._createSorters(field, direction);

        return this.forceLocalSort();
    }

}
