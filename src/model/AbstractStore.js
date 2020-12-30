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
 * @since  15/03/2019 modified: 30/12/2020 16:33
 */
export default class AbstractStore {
    /**
     * @property {boolean} loading
     * The Store state, whether it is loading dataset or not. (readonly)
     */

    /**
     * @property {boolean} deleting
     * The Store state, whether it is deleting dataset or not. (readonly)
     */

    /**
     * @property {boolean} updating
     * The Store state, whether it is saving/updating dataset or not. (readonly)
     */

    /**
     * @property {boolean} hasError
     * The Store state, whether there was an error when loading/deleting dataset or not. (readonly)
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
        this.clearData();
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
     * @type {AxiosInstance|Object} Axios plugin adapter
     */
    get adapterInstance() {
        return this._config.adapter;
    }

    /**
     * Returns active page number.
     *
     * @type {number}
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
        this._config.filters = Helper.isArray(newFilters)
            ? newFilters
            : (Helper.isObject(newFilters) ? [newFilters] : []);

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
     * @type {number}
     */
    get length() {
        return this.dataItems.length;
    }

    /**
     * Returns number of items within a page.
     *
     * @type {number}
     */
    get pageSize() {
        return this._pageSize;
    }

    /**
     * Define number of items within a page.
     *
     * @param {number} value Number of items within a page
     */
    set pageSize(value) {
        this._pageSize = value;
    }

    /**
     * Get proxy adapter to be used for loading data from the remote service.
     *
     * @returns {ProxyAdapter} The proxy adapter
     */
    get proxy() {
        return this._proxy;
    }

    /**
     * Get/Override REST URL configuration in the form <code>{key: name}</code>, where the keys are:
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
     * @returns {Object} REST url configuration
     */
    get restUrl() {
        return this._config.restUrl || this._config.restProxy;
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
     * Append an item to the local storage.
     *
     * @param {Object} item Data to append to the Store
     * @returns {void}
     * @protected
     */
    _append(item) {
        if (this._isCandidateForModel(item)) {
            this._items.push(this._createModel(item));
        } else if (Helper.isObject(item)) {
            this._items.push(this._createModel(item).seal());
        } else {
            console.error('Can not assign primitive type to the dataset.')
        }
    }

    /**
     * Assign datas to the Store's dataset.
     *
     * @param {Object|Object[]} data A record or collection of records to be assigned
     * @param {boolean} silent       Append data silently and doesn't trigger data conversion
     * @returns {void}
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
                    this._items.push(Object.seal(v));
                } else {
                    this._append(v);
                }
            });
        }
    }

    /**
     * Assign values from response's object.
     *
     * @param {Object} response Response object
     * @returns {void}
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
     * @returns {BsModel} Data model
     * @protected
     */
    _createModel(item) {
        let proxyCfg = {};
        if (this.restUrl && !Helper.isEmpty(this.restUrl['delete'])) {
            proxyCfg['delete'] = this.restUrl['delete'];
        }
        if (this.restUrl && !Helper.isEmpty(this.restUrl['update'])) {
            proxyCfg['update'] = this.restUrl['update'];
        }
        if (this.restUrl && !Helper.isEmpty(this.restUrl['save'])) {
            proxyCfg['save'] = this.restUrl['save'];
        }
        if (Helper.isEmptyObject(proxyCfg)) {
            return new BsModel(item, this.adapterInstance, this._config.idProperty, this._config.dataProperty);
        } else {
            let schema = {
                schema: item,
                proxy: proxyCfg
            };
            if (!Helper.isEmptyObject(this._config.csrfConfig)) {
                schema['csrfConfig'] = this._config.csrfConfig;
            }

            return new BsModel(schema, this.adapterInstance, this._config.idProperty, this._config.dataProperty);
        }
    }

    /**
     * Check if the given data is DataModel or not.
     *
     * @param {Object} item The data item
     * @returns {boolean} TRUE if data can be converted into model otherwise FALSE
     * @protected
     */
    _isCandidateForModel(item) {
        return Helper.isObject(item) && !Helper.isEmpty(this._config.idProperty) &&
            item.hasOwnProperty(this._config.idProperty);
    }

    /**
     * Add a filter to the Store.
     *
     * @param {string} field                The field name to which the filter will be applied.
     * @param {string|number|boolean|Array} value The filter value
     * @param {string} [operator]           Filter operator to be used, valid values: eq, neq, gt, gte,
     *                                      lt, lte, in, notin, startwith, endwith, contains, fts, tsquery
     * @returns {AbstractStore} Itself
     */
    addFilter(field, value, operator) {
        this.filters.push({'property': field, 'value': value, 'operator': operator || 'eq'});
        this._filterItems = [];

        return this;
    }

    /**
     * Clear all data items in the local storage.
     *
     * @returns {void}
     */
    clearData() {
        if (Helper.isArray(this._items) && this._items.length > 0) {
            for (const item of this._items) {
                if (AbstractStore.isModel(item)) {
                    item.destroy();
                }
            }
        }

        this._items = [];
        this.resetState();
    }

    /**
     * Clear and destroy all data items in the local storage.
     *
     * @returns {void}
     */
    destroy() {
        this.clearData();
        this._config      = null;
        this._proxy       = null;
        this._filters     = [];
        this._filterItems = [];
    }

    /**
     * Finds the first matching Item in the local storage by a specific field value.
     * 
     * @param {string} property    The field name to test
     * @param {*} value            The value to match
     * @param {number} startIndex  The index to start searching at
     * @returns {BsModel|Object|*} An item that match the criteria
     */
    find(property, value, startIndex = 0) {
        return this._items.find((item, idx) => item[property] === value && idx >= startIndex);
    }

    /**
     * Finds the first matching Item in the local storage by function's predicate.
     * If the predicate returns `true`, it is considered a match.
     * 
     * @param {Function} predicate  Function `(item: Object, index: number) => item is match`
     * @returns {BsModel|Object|*} An item that match the criteria
     */
    findBy(predicate) {
        return this._items.find(predicate);
    }

    /**
     * Finds the index of the first matching Item in the local storage by a specific field value.
     * 
     * @param {string} property    The field name to test
     * @param {*} value            The value to match
     * @param {number} startIndex  The index to start searching at
     * @returns {number} The index of first match element, otherwise -1
     */
    findIndex(property, value, startIndex = 0) {
        return this._items.findIndex((item, idx) => item[property] === value && idx >= startIndex);
    }

    /**
     * Filter the dataset locally.
     *
     * @returns {BsModel[]|Object[]} Filtered dataset
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
     * @returns {BsModel[]|Object[]} Sorted dataset
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
     * @returns {boolean} TRUE if the Store doesn't have any data
     */
    isEmpty() {
        return this.length === 0;
    }

    /**
     * Check if the given item is a data model or not.
     *
     * @param {BsModel|Object} item The item to check
     * @returns {boolean} TRUE if the given item is a data model otherwise FALSE
     */
    static isModel(item) {
        return item instanceof BsModel;
    }

    /**
     * Sets the current active page.
     *
     * @param {number} value Page number
     * @returns {AbstractStore} Itself
     */
    page(value) {
        this._currentPage = value;

        return this;
    }

    /**
     * Sets the previous page to load by the Store.
     *
     * @returns {AbstractStore} Itself
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
     * @returns {AbstractStore} Itself
     */
    nextPage() {
        if (this._currentPage < this.totalPages) {
            return this.page(this._currentPage + 1);
        } else {
            return this.page(this._currentPage);
        }
    }

    /**
     * Removes the specified item(s) from the local storage.
     * 
     * @param {BsModel[]|Object[]|BsModel|Object} items Model instance or array of model instances to be removed
     * @returns {void}
     */
    remove(items) {
        if (Helper.isArray(items)) {
            for (const item of items) {
                this.remove(item);
            }
        } else if (AbstractStore.isModel(items) || this._isCandidateForModel(items)) {
            const idProperty = this._config.idProperty;
            const index = this.findIndex(idProperty, items[idProperty]);
            this.removeAt(index);
        } else {
            throw Error('Item must be instance of BsModel.');
        }
    }

    /**
     * Removes the model instance(s) at the given index from the local storage.
     * 
     * @param {number} index Index position
     * @param {number} count Number of items to delete
     * @returns {void}
     */
    removeAt(index, count = 1) {
        const length = count + 1;
        Vue.set(this, 'deleting', true);
        for (let i = 0; i < length; i++) {
            const item = this._items[index + i];
            if (AbstractStore.isModel(item)) {
                item.destroy();
            }
        }

        this._items.splice(index, count);
        Vue.set(this, 'deleting', false);
    }

    /**
     * Resets the Store state, ie. `loading`, etc back to their initial states.
     *
     * @returns {void}
     */
    resetState() {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'deleting', false);
        Vue.set(this, 'updating', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * Define the filter logic to be used when filtering the Store’s dataset.
     *
     * @param {string} logic The filter logic, valid values: 'AND', 'OR'
     * @returns {AbstractStore} Itself
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
     * Replace old filters and apply new filters to the Store dataset.
     *
     * @param {IFilter[]|IFilter} filters  The filters to apply
     * @param {boolean} includeDefault     Include default filters or not
     * @returns {AbstractStore} Itself
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
     * Set the number of items within a page.
     *
     * @param {number} value Number of items within a page
     * @returns {AbstractStore} Itself
     */
    setPageSize(value) {
        this._pageSize = value;
        return this;
    }

    /**
     * Set sorter's criteria collection.
     *
     * @param {ISorter|ISorter[]|Object|Object[]} sorters The sorts method criteria
     * @returns {AbstractStore} Itself
     */
    setSorters(sorters) {
        this._config.sorts = Helper.isArray(sorters) ? sorters : Helper.isObject(sorters) ? [sorters] : [];
        return this;
    }

    /**
     * Get current query parameter's configuration.
     *
     * @returns {Object} Parameter's configuration
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
     * Create an array of sorter criteria.
     *
     * @param {string|ISorter[]} field  The field for sorting or ISorter objects
     * @param {'asc'|'desc'} direction  The sort direction
     * @returns {void}
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
     * Callbacks function when start loading the dataset.
     *
     * @returns {boolean} TRUE on success
     * @protected
     */
    _checkOnLoading() {
        Vue.set(this, 'loading', true);

        return true;
    }

    /**
     * Callbacks function when error loading the dataset from the remote service.
     *
     * @param {Object} error The error object
     * @returns {void}
     * @protected
     */
    _onLoadingFailure(error) {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'hasError', true);
        ProxyAdapter.warnResponseError(error);
    }

    /**
     * Callbacks function when success loading the dataset from the remote service.
     *
     * @returns {void}
     * @protected
     */
    _onLoadingSuccess() {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * Callbacks function when success loading the dataset from the remote service.
     *
     * @param {Response} response Response object
     * @returns {void}
     * @protected
     */
    _onQuerySuccess(response) {
        this._assignFromResponse(response);
        this._onLoadingSuccess();
    }

}
