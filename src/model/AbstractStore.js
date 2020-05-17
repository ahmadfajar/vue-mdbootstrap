import Vue from "vue";
import BsModel from "./BsModel";
import ProxyAdapter from "./ProxyAdapter";
import Helper from "../utils/Helper";
import orderBy from "lodash/orderBy";
import { autobind } from "../utils/Autobind";

/**
 * Filter data type.
 *
 * @typedef {Object} IFilter
 * @property {string} property              Field name attribute for filter operation
 * @property {string|number|boolean} value  Filter value
 * @property {string} operator              Filter operator, default: <tt>eq</tt>
 */
/**
 * Sorter data type.
 *
 * @typedef {Object} ISorter
 * @property {string} property   Field name attribute for sorting operation
 * @property {string} direction  Sort direction, valid values: <tt>asc, desc</tt>
 */

/**
 * Class AbstractStore is superclass of {@link BsStore}, {@link BsTreeStore} and {@link BsArrayStore}.
 * It's never used directly, but offers a set of methods used by those subclasses.
 *
 * @author Ahmad Fajar
 * @since  15/03/2019 modified: 16/05/2020 3:58
 */
export default class AbstractStore {
    /**
     * @property {boolean} loading
     * Status apakah sedang memuat data atau tidak (readonly).
     */

    /**
     * @property {boolean} deleting
     * Status apakah sedang melakukan proses penghapusan data atau tidak (readonly).
     */

    /**
     * @property {boolean} updating
     * Status apakah sedang melakukan proses update data atau tidak (readonly).
     */

    /**
     * @property {boolean} hasError
     * Status apakah ada error atau tidak (readonly).
     */


    /**
     * Class constructor.
     *
     * @param {Object} [config]  The configuration properties
     */
    constructor(config = {}) {
        const cfg = {
            idProperty: undefined,
            dataProperty: undefined,
            filterLogic: 'AND',
            filters: [],
            sorts: [],
            ...config
        };

        let pgSize = -1;
        if (cfg.pageSize && !Helper.isEmpty(cfg.pageSize) && Helper.isNumber(cfg.pageSize)) {
            pgSize = cfg.pageSize;
            delete cfg.pageSize;
        } else if (cfg.pageSize) {
            delete cfg.pageSize;
        }

        Object.defineProperty(this, '_config', {
            value: cfg,
            writable: true,
            configurable: false,
            enumerable: false
        });

        this._currentPage = 1;
        this._pageSize    = pgSize;
        this._filters     = Helper.isArray(cfg.filters) ? cfg.filters : [];
        this._filterItems = [];
        this._items       = [];

        autobind(this);
        this.removeAll();
    }

    /**
     * Get the class name of this instance.
     *
     * @type {string}
     */
    get $_class() {
        return (Object.getPrototypeOf(this)).constructor.name;
    }

    /**
     * Returns the axios plugin adapter.
     *
     * @type {AxiosInstance|Function} Axios plugin adapter
     */
    get adapterInstance() {
        return this._config.adapter;
    }

    /**
     * Returns active page number.
     *
     * @type {int}
     */
    get currentPage() {
        return this._currentPage;
    }

    /**
     * Returns the default filters.
     *
     * @type {IFilter[]}
     */
    get defaultFilters() {
        if (!Helper.isArray(this._config.filters)) {
            return [];
        } else {
            return this._config.filters;
        }
    }

    /**
     * Assign default filters to used.
     *
     * @param {IFilter[]|Object[]|IFilter|Object} newFilters Default filters to be used
     */
    set defaultFilters(newFilters) {
        this._config.filters = Helper.isArray(newFilters) ? newFilters : (Helper.isObject(newFilters) ? [newFilters] : []);

        const oldFilters = this.filters.filter(flt => {
            let found = false;
            for (const filter of this._config.filters) {
                if (flt.property === filter.property) {
                    found = true;
                    break;
                }
            }

            return found === false;
        });

        this.setFilters(oldFilters, true);
    }

    /**
     * Returns collection of filters to be used.
     *
     * @type {IFilter[]}
     */
    get filters() {
        return this._filters;
    }

    /**
     * Assign collection of filters to be used.
     *
     * @param {IFilter[]|Object[]|IFilter|Object} newFilters The filters to be used
     */
    set filters(newFilters) {
        this._filters     = Helper.isArray(newFilters) ? newFilters : Helper.isObject(newFilters) ? [newFilters] : [];
        this._filterItems = [];
    }

    /**
     * Returns the number of items in the active page.
     *
     * @type {int}
     */
    get length() {
        return this.dataItems.length;
    }

    /**
     * Returns number of items within a page.
     *
     * @type {int}
     */
    get pageSize() {
        return this._pageSize;
    }

    /**
     * Define number of items within a page.
     *
     * @param {int} value Number of items within a page
     */
    set pageSize(value) {
        this._pageSize = value;
    }

    /**
     * Get proxy adapter to be used for loading data from the remote server.
     *
     * @return {ProxyAdapter} The proxy adapter
     */
    get proxy() {
        return this._proxy;
    }

    /**
     * Overrides REST URL configuration in the form <code>{key: name}</code>, where the keys are:
     * <tt>'save', 'fetch', 'delete', 'update'</tt>.
     *
     * @example
     * return {
     *    'browse': '/api/user',
     *    'fetch': '/api/user/{id}',
     *    'save': '/api/user/save'
     *    'update': '/api/user/update/{id}'
     * }
     *
     * @return {Object} REST url configuration
     */
    get restUrl() {
        return this._config.restUrl;
    }

    /**
     * Returns sorter's object collection to be used when sorting the Store's dataset.
     *
     * @type {ISorter[]}
     */
    get sorters() {
        if (!Helper.isArray(this._config.sorts)) {
            return [];
        } else {
            return this._config.sorts;
        }
    }

    /**
     * Assign sorter's object collection.
     *
     * @param {ISorter[]|ISorter} sorters The sorts method
     */
    set sorters(sorters) {
        this._config.sorts = Helper.isArray(sorters) ? sorters : Helper.isObject(sorters) ? [sorters] : [];
    }

    /**
     * Append an item to the Store's dataset.
     *
     * @param {Object} item Data to append to the Store
     * @return {void}
     * @protected
     */
    _append(item) {
        if (this._isCandidateForModel(item)) {
            this._items.push(this._createModel(item));
        } else if (Helper.isObject(item)) {
            this._items.push(item);
        } else {
            console.error('Can not assign primitive type to the collection.')
        }
    }

    /**
     * Assign datas to the Store's dataset.
     *
     * @param {Object|Object[]} data A record or collection of records to be assigned
     * @param {boolean} silent       Append data silently and doesn't trigger data conversion
     * @return {void}
     * @protected
     */
    _assignData(data, silent = false) {
        Vue.set(this, 'loading', true);
        const items = Helper.isArray(data) ? data : Helper.isObject(data) ? [data] : [];

        if (silent) {
            this._items = items;
        } else {
            this._items = [];
            items.forEach(v => {
                if (Helper.isArray(v)) {
                    this._items.push(Object.freeze(v));
                } else if (this._isCandidateForModel(v)) {
                    this._items.push(this._createModel(v));
                } else if (Helper.isObject(v)) {
                    this._items.push(v);
                } else {
                    console.error('Can not assign primitive type to the collection.')
                }
            });
        }
    }

    /**
     * Assign values from response's object.
     *
     * @param {Object} response Response object
     * @return {void}
     * @protected
     */
    _assignFromResponse(response) {
        const responseData = response.data;

        if (Helper.isEmpty(responseData)) {
            console.warn('Server returns empty data.');
        } else if (this._config) {
            if (responseData.hasOwnProperty(this._config.dataProperty)) {
                this.assignData(responseData[this._config.dataProperty]);
                if (responseData[this._config.totalProperty]) {
                    Vue.set(this, 'totalCount', responseData[this._config.totalProperty]);
                }
            } else {
                console.warn('Unable to parse data coming from server.');
            }
        }
    }

    /**
     * Create new DataModel from the given object.
     *
     * @param {Object} item The data to convert
     * @return {BsModel} Data model
     * @protected
     */
    _createModel(item) {
        return new BsModel(item, this.adapterInstance, this._config.idProperty, this._config.dataProperty);
    }

    /**
     * Check if the given data is DataModel or not.
     *
     * @param {Object} item The data item
     * @return {boolean} TRUE if data can be converted into model otherwise FALSE
     * @protected
     */
    _isCandidateForModel(item) {
        return Helper.isObject(item) && !Helper.isEmpty(this._config.idProperty) &&
            item.hasOwnProperty(this._config.idProperty);
    }

    /**
     * Add a filter to the Store.
     *
     * @param {string} field                The filter field name
     * @param {string|number|boolean|Array} value The filter value
     * @param {string} [operator]           Valid values: eq, neq, gt, gte, lt, lte, in, notin
     *                                      startwith, endwith, contains, fts, tsquery
     * @return {AbstractStore} Itself
     */
    addFilter(field, value, operator) {
        this.filters.push({'property': field, 'value': value, 'operator': operator || 'eq'});
        this._filterItems = [];

        return this;
    }

    /**
     * Destroy all data items in the Store's collection.
     *
     * @return {void}
     */
    destroy() {
        this.removeAll();
        this._config      = null;
        this._proxy       = null;
        this._filters     = [];
        this._filterItems = [];
    }

    /**
     * Filter the dataset locally.
     *
     * @return {Object[]} Collection
     */
    localFilter() {
        if (this.filters.length > 0) {
            return this._items.filter(item => {
                let equals = [];
                for (const flt of this.filters) {
                    const itemValue = Helper.getObjectValueByPath(item, flt.property);
                    const operator = flt.operator.toLowerCase();

                    if (operator === 'gt') {
                        equals.push(itemValue > flt.value);
                    } else if (operator === 'gte') {
                        equals.push(itemValue >= flt.value);
                    } else if (operator === 'lt') {
                        equals.push(itemValue < flt.value);
                    } else if (operator === 'lte') {
                        equals.push(itemValue <= flt.value);
                    } else if (operator === 'neq') {
                        equals.push(itemValue !== flt.value);
                    } else if (operator === 'contains' || flt.operator === 'fts') {
                        equals.push(String(itemValue).toLowerCase().includes(String(flt.value).toLowerCase()));
                    } else if (operator === 'startswith' || flt.operator === 'startwith') {
                        equals.push(String(itemValue).toLowerCase().startsWith(String(flt.value).toLowerCase()));
                    } else if (operator === 'endswith' || flt.operator === 'endwith') {
                        equals.push(String(itemValue).toLowerCase().endsWith(String(flt.value).toLowerCase()));
                    } else if (operator === 'notin' && Helper.isArray(flt.value)) {
                        equals.push(flt.value.includes(itemValue) === false);
                    } else if (operator === 'in' && Helper.isArray(flt.value)) {
                        equals.push(flt.value.includes(itemValue));
                    } else {
                        equals.push(itemValue === flt.value);
                    }
                }
                if (this._config.filterLogic === 'OR') {
                    return equals.some(it => it === true);
                } else {
                    return equals.every(it => it === true);
                }
            });
        } else {
            return this._items;
        }
    }

    /**
     * Sorts the dataset locally.
     *
     * @return {Object[]} Collection
     */
    localSort() {
        let fields = [];
        let orders = [];

        for (const sorter of this.sorters) {
            fields.push(sorter.property || sorter.field);
            orders.push(sorter.direction.toLowerCase());
        }

        if (fields.length > 0 && orders.length > 0) {
            return orderBy(this._items, fields, orders);
        }

        return this._items;
    }

    /**
     * Check if the data in the Store's collection is empty or not.
     *
     * @return {boolean} TRUE if the Store doesn't have any data
     */
    isEmpty() {
        return this.length === 0;
    }

    /**
     * Check if the given item is a data model or not.
     *
     * @param {BsModel|Object} item The item to check
     * @return {boolean} TRUE if the given item is a data model otherwise FALSE
     */
    static isModel(item) {
        return item instanceof BsModel;
    }

    /**
     * Sets the current active page.
     *
     * @param {int} value Page number
     * @return {AbstractStore} Itself
     */
    page(value) {
        this._currentPage = value;

        return this;
    }

    /**
     * Sets the previous page to load by the Store.
     *
     * @return {AbstractStore} Itself
     */
    previousPage() {
        if (this._currentPage > 0) {
            return this.page(this._currentPage - 1);
        } else {
            return this.page(this._currentPage);
        }
    }

    /**
     * Sets the next page to load by the Store.
     *
     * @return {AbstractStore} Itself
     */
    nextPage() {
        if (this._currentPage < this.totalPages) {
            return this.page(this._currentPage + 1);
        } else {
            return this.page(this._currentPage);
        }
    }

    /**
     * Removes all records in the Store's dataset.
     *
     * @return {void}
     */
    removeAll() {
        if (Helper.isArray(this._items) && this._items.length > 0 && AbstractStore.isModel(this._items[0])) {
            for (let item of this._items) {
                item.destroy();
            }
        }

        this._items = [];
        this.resetState();
    }

    /**
     * Resets model state, ie. `loading`, etc back to their initial states.
     *
     * @return {void}
     */
    resetState() {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'deleting', false);
        Vue.set(this, 'updating', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * Define the filter logic to be used when filtering the Store's dataset.
     *
     * @param {string} logic The filter logic, valid values: 'AND', 'OR'
     * @return {AbstractStore} Itself
     */
    setFilterLogic(logic) {
        if (typeof logic === 'string' && logic.trim() !== '') {
            const trimmed = logic.trim().toUpperCase();

            if (trimmed === 'AND' || trimmed === 'OR') {
                this._config['filterLogic'] = trimmed;
            }
        }

        return this;
    }

    /**
     * Replace old filters and apply new filters to the Store.
     *
     * @param {IFilter[]|IFilter} filters  The filters to apply
     * @param {boolean} includeDefault     Include default filters or not
     * @return {AbstractStore} Itself
     */
    setFilters(filters, includeDefault = false) {
        if (Helper.isArray(filters)) {
            this.filters = includeDefault ? filters.concat(this.defaultFilters) : filters;
        } else if (Helper.isObject(filters)) {
            this.filters = includeDefault ? [filters].concat(this.defaultFilters) : [filters];
        } else {
            this.filters = includeDefault ? this.defaultFilters : [];
        }

        return this;
    }

    /**
     * Get current query parameter's configuration.
     *
     * @return {Object} Parameter's configuration
     */
    queryParams() {
        let params = {};
        let check  = Helper.isNumber(this.currentPage) && this.currentPage > 0;

        if (check) {
            params['page'] = this.currentPage;
        }
        check = Helper.isNumber(this.pageSize) && this.pageSize > 0;
        if (check) {
            params['limit'] = this.pageSize;
        }
        if (!Helper.isEmpty(this.filters)) {
            params['filters'] = this.filters;
        }
        if (!Helper.isEmpty(this.sorters)) {
            params['sorts'] = this.sorters;
        }
        params['logic'] = this._config.filterLogic;

        return params;
    }

    /**
     * Create sorters object's collection.
     *
     * @param {string|ISorter[]} field  The field for sorting
     * @param {'asc'|'desc'} direction  The sort direction
     * @return {void}
     * @protected
     */
    _createSorters(field = null, direction = 'asc') {
        if (Helper.isArray(field)) {
            this.sorters = [];
            for (const fld of field) {
                this.sorters.push({
                    'property': fld.property || fld.field,
                    'direction': fld.direction ? fld.direction.toLowerCase() : 'asc'
                });
            }
        } else if (field !== '') {
            this.sorters = [{'property': field, 'direction': direction.toLowerCase()}];
        }
    }

    /**
     * Callbacks function on start loading data.
     *
     * @return {boolean} TRUE on success
     * @protected
     */
    _checkOnLoading() {
        Vue.set(this, 'loading', true);

        return true;
    }

    /**
     * Callbacks function on error loading data.
     *
     * @param {Object} error The error object
     * @return {void}
     * @protected
     */
    _onLoadingFailure(error) {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'hasError', true);
        ProxyAdapter.warnResponseError(error);
    }

    /**
     * Callbacks function on success loading data.
     *
     * @return {void}
     * @protected
     */
    _onLoadingSuccess() {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * Callbacks function on success loading data from remote server.
     *
     * @param {Response} response Response object
     * @return {void}
     * @protected
     */
    _onQuerySuccess(response) {
        this._assignFromResponse(response);
        this._onLoadingSuccess();
    }

}
