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
 * @since  20/07/2018 modified: 30/12/2020 19:38
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
     * Returns the dataset in the local storage.
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
        return averageBy((this.remotePaging ? this.dataItems : this._items), field);
    }

    /**
     * Count number of items in the local storage specified by the given criteria.
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
     * Calculate the SUM or total value from a field in the local storage.
     *
     * @param {string} field The field name of the dataset to calculate
     * @returns {number} The sums value
     */
    aggregateSum(field) {
        return sumBy((this.remotePaging ? this.dataItems : this._items), field);
    }

    /**
     * Append an item to the local storage and also save the item as a new record to the
     * remote server whenever possible. The item can be saved to the remote server,
     * if 'restUrl' property contains a 'save' key.
     *
     * @param {Object} item Data to append to the Store
     * @returns {void}
     */
    append(item) {
        if (Helper.isEmpty(item)) {
            return;
        }

        if (this._isCandidateForModel(item)) {
            Vue.set(this, 'updating', true);
            let model = this._createModel(item);

            model.save()
                .catch(error => {
                    Vue.set(this, 'hasError', true);
                    ProxyAdapter.warnResponseError(error);
                })
                .finally(() => {
                    this._items.push(model);
                    if (this.totalCount < this.length) {
                        Vue.set(this, 'totalCount', this.length);
                    } else {
                        Vue.set(this, 'totalCount', this.totalCount + 1);
                    }
                    Vue.set(this, 'updating', false);
                });
        } else if (Helper.isObject(item)) {
            Vue.set(this, 'updating', true);
            this._items.push(this._createModel(item).seal());

            if (this.totalCount < this.length) {
                Vue.set(this, 'totalCount', this.length);
            } else {
                Vue.set(this, 'totalCount', this.totalCount + 1);
            }
            Vue.set(this, 'updating', false);
        } else {
            console.error('Can not assign primitive type to the dataset.')
        }
    }

    /**
     * Replace local dataset with new data. The proses only affected the local dataset
     * and nothing is sent to the remote server.
     *
     * @param {BsModel[]|Object[]|BsModel|Object} data  The new data to be assigned
     * @param {boolean} silent                          Append the data silently and
     *                                                  don't trigger data conversion
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
     * Delete specific item from local storage as well as from remote server whenever possible.
     * The item can be deleted from the remote server, if 'restUrl' property contains a 'delete' key.
     *
     * @param {BsModel} item Model instance to be removed
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
     * Delete specific items from local storage as well as from the remote server whenever possible.
     *
     * @param {BsModel[]} items Model instances to be removed
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
     * Fetch specific item from the remote service via REST API.
     *
     * @param {string|number} id The item ID to fetch
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
     * Load data from the remote service or from the given record(s).
     *
     * @param {Object[]|Object} [data] The record(s) to be assigned
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
            const params = this.queryParams();
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
     * @param {string|ISorter[]|Object[]} field The field for sorting or ISorter objects
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
