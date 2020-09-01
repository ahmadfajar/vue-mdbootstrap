import Vue from "vue";
import AbstractStore from "./AbstractStore";
import ProxyAdapter from "./ProxyAdapter";
import Helper from "../utils/Helper";
import averageBy from "lodash/meanBy";
import sumBy from "lodash/sumBy";

/**
 * Data Store for working with collection of data and remote API.
 *
 * @example
 * let dsStore = new BsStore({
 *     idProperty: 'id',
 *     dataProperty: 'data',
 *     totalProperty: 'total',
 *     pageSize: 15,
 *     restProxy: {
 *         browse: '/api/users',
 *         delete: {url: './api/users', method: 'delete'},
 *         save: {url: './api/users', method: 'post'},
 *         update: {url: './api/users', method: 'put'}
 *     },
 *     csrfConfig: {
 *         url: '/api/token/{name}',
 *         tokenName: 'token_name',
 *         dataField: 'value',
 *         suffix: false,
 *     },
 * });
 *
 * @author Ahmad Fajar
 * @since  20/07/2018 modified: 13/07/2020 00:27
 */
export default class BsStore extends AbstractStore {
    /**
     * @property {int} totalCount
     * Returns total number of items in the Store's dataset (readonly).
     */


    /**
     * Class constructor.
     *
     * @example
     * let dsStore = new BsStore({
     *     idProperty: 'id',
     *     dataProperty: 'data',
     *     totalProperty: 'total',
     *     pageSize: 15,
     *     restProxy: {
     *         browse: '/api/users',
     *         delete: {url: './api/users', method: 'delete'},
     *         save: {url: './api/users', method: 'post'},
     *         update: {url: './api/users', method: 'put'}
     *     },
     *     csrfConfig: {
     *         url: '/api/token/{name}',
     *         tokenName: 'token_name',
     *         dataField: 'value',
     *         suffix: false, 
     *     },
     * });
     *
     * @param {Object} config The configuration properties
     */
    constructor(config = {}) {
        const cfg = {
            idProperty: 'id',
            dataProperty: 'data',
            totalProperty: 'total',
            filterLogic: 'AND',
            adapter: undefined, // AxiosInstance
            restProxy: {
                'browse': '',
                'delete': '',
                'fetch': '',
                'save': '',
                'update': ''
            },
            ...config
        };

        super(cfg);
        this._proxy = new ProxyAdapter(this.adapterInstance);
        Vue.set(this, 'totalCount', 0);

        if (this.restUrl.browse !== '') {
            if (this._config.remoteFilter === undefined) {
                this._config['remoteFilter'] = true;
            }
            if (this._config.remotePaging === undefined) {
                this._config['remotePaging'] = true;
            }
            if (this._config.remoteSort === undefined) {
                this._config['remoteSort'] = true;
            }
        } else {
            if (this._config.remoteFilter === undefined) {
                this._config['remoteFilter'] = false;
            }
            if (this._config.remotePaging === undefined) {
                this._config['remotePaging'] = false;
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
        const page   = this.currentPage > 0 && this.currentPage <= this.totalPages ? this.currentPage - 1 : 0;
        const offset = page * this.pageSize;

        if (!this.remoteFilter && this.filters.length > 0) {
            if (this._filterItems.length === 0) {
                this._filterItems = this.localFilter();
            }
            Vue.set(this, 'totalCount', this._filterItems.length);
            if (!this.remotePaging) {
                return this._filterItems.slice(offset, this.pageSize > 0 ? offset + this.pageSize : undefined);
            }

            return this._filterItems;
        }
        if (!this.remotePaging) {
            return this._items.slice(offset, this.pageSize > 0 ? offset + this.pageSize : undefined);
        }

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
     * Define the filter configuration.
     *
     * @param {boolean} value If TRUE then using local filtering and FALSE otherwise
     */
    set remoteFilter(value) {
        this._config.remoteFilter = value;
    }

    /**
     * Check if the Store is using server paging or local paging.
     *
     * @type {boolean}
     */
    get remotePaging() {
        return this._config.remotePaging;
    }

    /**
     * Define the paging configuration.
     *
     * @param {boolean} value If TRUE then using server paging and FALSE otherwise
     */
    set remotePaging(value) {
        this._config.remotePaging = value;
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
     * @param {boolean} value If TRUE then using server sorting and FALSE otherwise
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
     * @param {string} field The field name of the Store's collection to calculate
     * @returns {number} The average value
     */
    aggregateAvg(field) {
        return averageBy((this.remotePaging ? this.dataItems : this._items), field);
    }

    /**
     * Count number of items in the Store's collection specified by the given criteria.
     *
     * @param {string} field The grouping field name criteria
     * @param {*} value      The grouping value criteria
     * @returns {number} The number of items
     */
    aggregateCountBy(field, value) {
        let results;
        if (this.remotePaging) {
            results = this.dataItems.filter(item => {
                return value === Helper.getObjectValueByPath(item, field);
            });
        } else {
            results = this._items.filter(item => {
                return value === Helper.getObjectValueByPath(item, field);
            });
        }

        return results.length;
    }

    /**
     * Calculate SUM or total value of the Store's collection.
     *
     * @param {string} field The field name of the collection to calculate
     * @returns {number} The sums value
     */
    aggregateSum(field) {
        return sumBy((this.remotePaging ? this.dataItems : this._items), field);
    }

    /**
     * Append an item to the Store's dataset.
     *
     * @param {Object} item Data to append to the Store
     * @returns {void}
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
     * @param {Array|Object} data Data to be assigned
     * @param {boolean} silent Append item silently and doesn't trigger data conversion
     * @returns {void}
     */
    assignData(data, silent = false) {
        this._assignData(data, silent);
        if (!this.remoteSort && this.sorters.length > 0) {
            this._items = this.localSort();
        }

        Vue.set(this, 'loading', false);
        Vue.set(this, 'totalCount', this.length);
    }

    /**
     * Removes the specified item from this local store and from remote server.
     *
     * If the specified item is not BsModel instance then the item will be
     * removed from local store only.
     *
     * @param {BsModel|Object} item Model instance to be removed
     * @returns {Promise<*>} Promise interface
     */
    delete(item) {
        const me = this;

        if (AbstractStore.isModel(item) && !Helper.isEmptyObject(item.restUrl) &&
            !Helper.isEmpty(item.restUrl['delete'])) {
            Vue.set(me, 'deleting', true);

            return new Promise((resolve, reject) => {
                return item.delete().then((response) => {
                    me.remove(item);
                    Vue.set(me, 'deleting', false);
                    return resolve(response);
                }).catch((error) => {
                    Vue.set(me, 'deleting', false);
                    return reject(error);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                try {
                    me.remove(item);
                    resolve({success: true, message: 'Item has been removed from local store.'});
                } catch (e) {
                    reject(e);
                }
            });
        }
    }

    /**
     * Removes the specified items from this local store and from remote server.
     *
     * @param {BsModel[]|Object[]} items Model instances to be removed
     * @returns {Promise<*>} Promise interface
     */
    deletes(items) {
        if (Helper.isArray(items) && items.length > 0) {
            const me = this;
            Vue.set(me, 'deleting', true);

            return new Promise((resolve, reject) => {
                try {
                    for (const item of items) {
                        if (AbstractStore.isModel(item) && !Helper.isEmptyObject(item.restUrl) &&
                            !Helper.isEmpty(item.restUrl['delete'])) {
                            item.delete().then(() => {
                                me.remove(item);
                            }).catch((error) => {
                                throw error;
                            });
                        } else {
                            me.remove(item);
                        }
                    }

                    resolve({success: true, message: 'Items have been successfully removed.'});
                } catch (e) {
                    reject(e);
                }

                Vue.set(me, 'deleting', false);
            });
        } else {
            throw Error('Items must be array of BsModel instances.');
        }
    }

    /**
     * Fetch data from the remote service with specific ID.
     *
     * @param {string|int} id The item ID to fetch
     * @returns {Promise<*>} Promise interface
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
     * @param {Object[]|Object} [data] A record or collection of records to be assigned
     * @returns {Promise<*>} Promise interface
     */
    load(data = null) {
        if (!Helper.isEmpty(data)) {
            return new Promise(resolve => {
                this.assignData(data);
                this._items = this.localSort();
                return resolve(this._items);
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
     * @returns {Promise<any>} Promise interface
     * @deprecated
     */
    query() {
        return this.load();
    }

    /**
     * Sorts the data in the Store by one or more of its properties.
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
     * @param {string|ISorter[]|Object[]} field The field for sorting
     * @param {'asc'|'desc'} direction          The sort direction
     * @returns {Object[]} Collection
     */
    sort(field = null, direction = 'asc') {
        this._createSorters(field, direction);

        if (!this.remoteSort) {
            this._items = this.localSort();
            return this._items;
        } else {
            this.load().then(() => {
                return this._items;
            });
        }
    }
}
