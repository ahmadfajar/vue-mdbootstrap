import Vue from "vue";
import AbstractStore from "./AbstractStore";
import ProxyAdapter from "./ProxyAdapter";
import Helper from "../utils/Helper";
import averageBy from "lodash/meanBy";
import sumBy from "lodash/sumBy";
// import { meanBy as averageBy, sumBy } from "lodash";

/**
 * Data Store class.
 *
 * @author Ahmad Fajar
 * @since  20/07/2018 modified: 15/03/2019 20:59
 */
export default class BsStore extends AbstractStore {
    /**
     * @property {int} totalCount
     * Returns total number of items in the Store's dataset (readonly).
     */


    /**
     * Class constructor.
     *
     * @param {Object} config The configuration properties
     */
    constructor(config = {}) {
        const cfg = {
            idProperty: 'id',
            dataProperty: 'data',
            totalProperty: 'total',
            filterLogic: 'AND',
            restUrl: {
                'browse': '',
                'delete': '',
                'fetch': '',
                'save': '',
                'update': ''
            },
            ...config
        };

        super(cfg);
        this._proxy = new ProxyAdapter();
        Vue.set(this, 'totalCount', 0);

        if (this.restUrl.browse !== '') {
            if (this._config.remoteFilter === undefined) {
                this._config['remoteFilter'] = true;
            }
            if (this._config.remoteSort === undefined) {
                this._config['remoteSort'] = true;
            }
        } else {
            if (this._config.remoteFilter === undefined) {
                this._config['remoteFilter'] = false;
            }
            if (this._config.remoteSort === undefined) {
                this._config['remoteSort'] = false;
            }
        }
    }

    /**
     * Returns the data items in the Store's collection.
     *
     * @type {BsModel[]|Object[]}
     */
    get dataItems() {
        return this._items;
    }

    /**
     * Check if the Store is using server filtering or local filtering.
     *
     * @type {boolean}
     */
    get remoteFilter() {
        return this._config.remoteFilter;
    }

    /**
     * Define the server filtering configuration.
     *
     * @param {boolean} value If FALSE then using local filtering and TRUE otherwise
     */
    set remoteFilter(value) {
        this._config.remoteFilter = value;
    }

    /**
     * Check if the Store is using server sorting or local sorting.
     *
     * @type {boolean}
     */
    get remoteSort() {
        return this._config.remoteSort;
    }

    /**
     * Sets the server sorting configuration.
     *
     * @param {boolean} value If FALSE then using server sorting and TRUE otherwise
     */
    set remoteSort(value) {
        this._config.remoteSort = value;
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
     * Calculate means or average value of the Store's collection.
     *
     * @param {string} field The fieldname of the Store's collection to calculate
     * @returns {number} The average value
     */
    aggregateAvg(field) {
        return averageBy(this.dataItems, field);
    }

    /**
     * Calculate SUM or total value of the Store's collection.
     *
     * @param {string} field The fieldname of the collection to calculate
     * @returns {number} The sums value
     */
    aggregateSum(field) {
        return sumBy(this.dataItems, field);
    }

    /**
     * Append an item to the Store's dataset.
     *
     * @param {Object} item Data to append to the Store
     * @return {void}
     */
    append(item) {
        if (!Helper.isEmpty(item)) {
            this._append(item);

            if (this.totalCount < this.length) {
                Vue.set(this, 'totalCount', this.length);
            }
        }
    }

    /**
     * Assign datas to the Store's dataset.
     *
     * @param {Array|Object} datas Data to be assigned
     * @param {boolean} silent Append item silently and doesn't trigger data conversion
     * @return {void}
     */
    assignData(datas, silent = false) {
        this._assignData(datas, silent);
        Vue.set(this, 'loading', false);
        Vue.set(this, 'totalCount', this.length);
    }

    /**
     * Fetch data from the remote service with spesific ID.
     *
     * @param {string|int} id The item ID to fetch
     * @return {Promise<any>} Promise interface
     */
    fetch(id) {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let config       = {};
        let url          = this.restUrl['fetch'] || '';
        const methods    = this.proxy.requestMethods();
        const identifier = this._config.idProperty;

        if (url.includes('{id}') && !Helper.isEmpty(id)) {
            url = url.replace('{id}', id);
        } else if (!Helper.isEmpty(identifier) && !Helper.isEmpty(id)) {
            let params         = {};
            params[identifier] = id;
            config['params']   = params;
        }

        config['url']    = url;
        config['method'] = methods['fetch'];

        return this.proxy.request(config, this._checkOnLoading, this._onQuerySuccess, this._onLoadingFailure);
    }

    /**
     * Load the data locally or from the remote server.
     *
     * @param {Object[]|Object} [datas] A record or collection of records to be assigned
     * @return {Promise<any>} Promise interface
     */
    load(datas = null) {
        if (!Helper.isEmpty(datas)) {
            return new Promise(resolve => {
                this.assignData(datas);
                this.forceLocalSort().then(ret => {
                    return resolve(ret);
                });
            });
        } else {
            ProxyAdapter.checkRestUrl(this.restUrl);

            const methods = this.proxy.requestMethods();
            let config    = {
                url: this.restUrl.browse || '',
                method: methods['browse']
            };
            const params  = this.queryParams();
            if (!Helper.isEmpty(params)) {
                config['params'] = params;
            }

            return this.proxy.request(config, this._checkOnLoading, this._onQuerySuccess, this._onLoadingFailure);
        }
    }

    /**
     * Load data from the remote service and assign query parameters and configuration.
     *
     * @return {Promise<any>} Promise interface
     * @deprecated
     */
    query() {
        return this.load();
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
     * @param {string|ISorter[]|Object[]} field The field for sorting
     * @param {'asc'|'desc'} direction          The sort direction
     * @return {Promise<any>} Promise interface
     */
    sort(field = null, direction = 'asc') {
        this._createSorters(field, direction);

        if (!this.remoteSort) {
            return this.forceLocalSort();
        } else {
            return this.load();
        }
    }

}
