import type {AxiosError, AxiosInstance} from "axios";
import {orderBy} from "lodash";
import {reactive, readonly} from "vue";
import type {
    IAbstractStore,
    IBsModel,
    IRestAdapter,
    TDataStoreConfig,
    TDataStoreState,
    TFilterOperator,
    TFilterOption,
    TModelOptions,
    TQueryParameter,
    TRecord,
    TRestConfig,
    TRestUrlOption,
    TSortDirection,
    TSortOption
} from "../types";
import Helper from "../utils/Helper";
import BsModel from "./BsModel";
import RestProxyAdapter from "./RestProxyAdapter";


/**
 * Class AbstractStore is superclass of {@link BsStore}, {@link BsTreeStore} and {@link BsArrayStore}.
 * It's never used directly, but offers a set of methods used by those subclasses.
 *
 * @author Ahmad Fajar
 * @since  15/03/2019 modified: 13/03/2023 01:47
 */
export default class AbstractStore implements IAbstractStore {
    private _config: TDataStoreConfig;
    private _filters: TFilterOption[];
    private _items: IBsModel[];
    protected _proxy: IRestAdapter | undefined;
    protected _state: TDataStoreState;
    protected _filteredItems: IBsModel[];
    public storeState: TDataStoreState;

    /**
     * Check if the given item is a data model or not.
     *
     * @param {BsModel|Object} item The item to check
     * @returns {boolean} TRUE if the given item is a data model otherwise FALSE
     */
    static isModel(item: object) {
        return item instanceof BsModel;
    }

    static isCandidateForFilterOption(item: TRecord): boolean {
        return Object.keys(item).every(k => ['property', 'value', 'operator'].includes(k));
    }

    static isCandidateForSortOption(item: TRecord): boolean {
        return Object.keys(item).every(k => ['property', 'direction'].includes(k));
    }

    /**
     * Class constructor.
     *
     * @param {TDataStoreConfig} [config]  The configuration properties
     */
    constructor(config = {}) {
        const cfg: TDataStoreConfig = {
            idProperty: undefined,
            dataProperty: undefined,
            totalProperty: undefined,
            filterLogic: 'AND',
            filters: [],
            sortOptions: [],
            ...config
        };

        let pgSize = -1;
        if (cfg.pageSize && !Helper.isEmpty(cfg.pageSize) && Helper.isNumber(cfg.pageSize)) {
            pgSize = <number>cfg.pageSize;
            delete cfg.pageSize;
        } else if (cfg.pageSize) {
            delete cfg.pageSize;
        }

        this._config = cfg;
        this._filters = Helper.isArray(cfg.filters) ? cfg.filters : [];
        this._filteredItems = [];
        this._items = [];

        // Add reactivity to the state.
        this._state = reactive<TDataStoreState>({
            loading: false,
            updating: false,
            deleting: false,
            hasError: false,
            currentPage: 1,
            pageSize: pgSize,
            length: 0,
            totalCount: 0,
        });
        this.storeState = readonly(this._state);
    }

    get $_class(): string {
        return (Object.getPrototypeOf(this)).constructor.name;
    }

    destroy() {
        this.clear();
        this._filters = [];
        this._filteredItems = [];
        // @ts-ignore
        delete this._config;
    }

    clear() {
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
     * @deprecated
     * Use `clear` instead.
     *
     * @returns {void}
     */
    clearData(): void {
        this.clear();
    }

    get loading(): boolean {
        return this._state.loading;
    }

    get updating(): boolean {
        return this._state.updating;
    }

    get deleting(): boolean {
        return this._state.deleting;
    }

    get hasError(): boolean {
        return this._state.hasError;
    }

    get adapterInstance(): AxiosInstance | undefined {
        return this._proxy?.adapterInstance;
    }

    get proxy(): IRestAdapter | undefined {
        return this._proxy;
    }

    /**
     * Get REST URL configuration in the form <code>{key: url}</code>,
     * where the keys are: <tt>'save', 'fetch', 'delete', 'update'</tt>.
     *
     * @example
     * return {
     *    'save'  : '/api/user/create',
     *    'fetch' : '/api/user/{id}',
     *    'update': '/api/user/{id}/save',
     *    'delete': '/api/user/{id}/delete'
     * }
     */
    get restUrl(): TRestConfig | undefined {
        return <TRestConfig>(this._config._restUrl || this._config.restProxy);
    }

    get currentPage(): number {
        return this._state.currentPage;
    }

    get length(): number {
        return this._state.length;
    }

    get totalCount(): number {
        return this._state.totalCount;
    }

    get pageSize(): number {
        return this._state.pageSize;
    }

    set pageSize(value: number) {
        this._state.pageSize = value;
    }

    get totalPages(): number {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    // get storeState(): TDataStoreState {
    //     return this._state;
    // }

    get defaultFilters(): TFilterOption[] {
        if (!Helper.isArray(this._config.filters)) {
            return [];
        } else {
            return this._config.filters;
        }
    }

    set defaultFilters(values: TFilterOption[] | TFilterOption) {
        this._config.filters = Array.isArray(values)
            ? values
            : (
                Helper.isObject(values) && AbstractStore.isCandidateForFilterOption(values)
                    ? [values] : []
            );

        const newFilters = this.filters.filter(flt => {
            let found = false;
            for (const filter of this._config.filters) {
                if (flt.property === filter.property) {
                    found = true;
                    break;
                }
            }

            return !found;
        });

        this.setFilters(newFilters, true);
    }

    get filters(): TFilterOption[] {
        return this._filters;
    }

    set filters(newFilters: TFilterOption[] | TFilterOption) {
        this._filters = this.createFilters(newFilters);
        this._filteredItems = [];
    }

    addFilter(
        field: string,
        value: string | number | boolean,
        operator?: TFilterOperator,
    ): AbstractStore {
        this.filters.push(<TFilterOption>{
            'property': field,
            'value': value,
            'operator': (!Helper.isEmpty(operator) ? operator?.toLowerCase : 'eq')
        });
        this._filteredItems = [];

        return this;
    }

    setFilters(
        newFilters: TFilterOption[] | TFilterOption,
        includeDefault = false,
    ): AbstractStore {
        if (Array.isArray(newFilters)) {
            this.filters = includeDefault ? newFilters.concat(this.defaultFilters) : newFilters;
        } else if (Helper.isObject(newFilters) && AbstractStore.isCandidateForFilterOption(newFilters)) {
            this.filters = includeDefault ? [newFilters].concat(this.defaultFilters) : [newFilters];
        } else {
            this.filters = includeDefault ? this.defaultFilters : [];
        }

        return this;
    }

    setFilterLogic(logic: unknown): AbstractStore {
        if (typeof logic === 'string' && logic.trim() !== '') {
            const trimmed = logic.trim().toUpperCase();

            if (trimmed === 'AND' || trimmed === 'OR') {
                this._config.filterLogic = trimmed;
            }
        }

        return this;
    }

    get sorters(): TSortOption[] {
        return this._config.sortOptions;
    }

    set sorters(sortOptions: TSortOption[] | TSortOption) {
        this._config.sortOptions = this.createSorters(sortOptions);
    }

    resetState(): void {
        this._state.loading = false;
        this._state.updating = false;
        this._state.deleting = false;
        this._state.hasError = false;
    }

    find(property: string, value: unknown, startIndex = 0): IBsModel | undefined {
        return this._items.find((item, idx) =>
            item.get(property) === value && idx >= startIndex
        );
    }

    findBy(
        predicate: (value: IBsModel, index: number) => boolean,
    ): IBsModel | undefined {
        return this._items.find(predicate);
    }

    findIndex(
        property: string,
        value: unknown,
        startIndex = 0
    ): number {
        return this._items.findIndex((item, idx) =>
            item.get(property) === value && idx >= startIndex
        );
    }

    localFilter(): IBsModel[] {
        if (this.filters.length > 0) {
            return this._items.filter(item => {
                const equals = [];

                for (const flt of this.filters) {
                    const itemValue = <never>Helper.getObjectValueByPath(item, flt.property);
                    const operator = <TFilterOperator>flt.operator.toLowerCase();

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
                    } else if (operator === 'notin' && Array.isArray(flt.value)) {
                        equals.push(flt.value.includes(itemValue) === false);
                    } else if (operator === 'in' && Array.isArray(flt.value)) {
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

    localSort(): IBsModel[] {
        const fields: string[] = [];
        const orders: string[] = [];

        for (const sorter of this.sorters) {
            fields.push(<string>(sorter.property || sorter.field));
            orders.push(sorter.direction.toLowerCase());
        }

        if (fields.length > 0 && orders.length > 0) {
            // @ts-ignore
            return orderBy(this._items, fields, orders);
        }

        return this._items;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    page(value: number): AbstractStore {
        this._state.currentPage = value;
        return this;
    }

    previousPage(): AbstractStore {
        if (this.currentPage > 1) {
            return this.page(this.currentPage - 1);
        } else {
            return this.page(this.currentPage);
        }
    }

    nextPage(): AbstractStore {
        if (this.currentPage < this.totalPages) {
            return this.page(this.currentPage + 1);
        } else {
            return this.page(this.currentPage);
        }
    }

    isCandidateForModel(item: object): boolean {
        return Helper.isObject(item)
            && !Helper.isEmpty(this._config.idProperty)
            && Object.hasOwn(item, <string>this._config.idProperty);
    }

    remove(items: IBsModel[] | IBsModel): void {
        if (Array.isArray(items)) {
            for (const item of items) {
                this.remove(item);
            }
        } else if (AbstractStore.isModel(items) || this.isCandidateForModel(items)) {
            const idProperty = <string>this._config.idProperty;
            const index = this.findIndex(idProperty, items.get(idProperty));
            (index > -1) && this.removeAt(index);
        } else {
            throw Error('Item must be instance of BsModel.');
        }
    }

    removeAt(index: number, count = 1): void {
        if (index < 0) {
            throw Error("Parameter 'index' is out of bound.");
        }
        if (count < 0) {
            throw Error("Parameter 'count' must be greater than '0'.");
        }

        const length = count + 1;
        this._state.deleting = true;

        for (let i = 0; i < length; i++) {
            const item = this._items[index + i];
            if (AbstractStore.isModel(item)) {
                item.destroy();
            }
        }

        this._items.splice(index, count);
        const newLength = this._items.length;
        const oldTotal = this._state.totalCount;

        if (this._state.totalCount <= this._state.length) {
            this._state.totalCount = newLength;
        } else {
            this._state.totalCount = oldTotal - count;
        }

        this._state.length = newLength;
        this._state.deleting = false;
    }

    setPageSize(value: number): AbstractStore {
        this.pageSize = value;
        return this;
    }

    setSorters(sortOptions: TSortOption[] | TSortOption): AbstractStore {
        this.sorters = sortOptions;
        return this;
    }

    createFilters(values: TFilterOption | TFilterOption[]): TFilterOption[] {
        const filters: TFilterOption[] = [];

        if (Array.isArray(values)) {
            for (const flt of values) {
                if ((typeof flt === "object") && AbstractStore.isCandidateForFilterOption(flt)) {
                    filters.push({
                        'property': flt.property,
                        'value': flt.value,
                        'operator': <TFilterOperator>(
                            !Helper.isEmpty(flt.operator) ? flt.operator.toLowerCase() : "eq"
                        )
                    });
                }
            }
        } else if ((typeof values === "object") && AbstractStore.isCandidateForFilterOption(values)) {
            filters.push({
                'property': values.property,
                'value': values.value,
                'operator': <TFilterOperator>(
                    !Helper.isEmpty(values.operator) ? values.operator.toLowerCase() : "eq"
                )
            });
        }

        return filters;
    }

    createSorters(
        values: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection = 'asc',
    ): TSortOption[] {
        const sorters: TSortOption[] = [];
        const createOption = (opt: TSortOption) => {
            return {
                'property': <string>(opt.property || opt.field),
                'direction': <TSortDirection>(
                    opt.direction && !Helper.isEmpty(opt.direction)
                        ? opt.direction.toLowerCase()
                        : direction.toLowerCase()
                )
            }
        }

        if (Array.isArray(values)) {
            for (const fld of values) {
                if ((typeof fld === "object") && AbstractStore.isCandidateForSortOption(fld)) {
                    sorters.push(createOption(fld));
                } else if ((typeof fld === "string") && !Helper.isEmpty(fld)) {
                    sorters.push({
                        'property': fld,
                        'direction': <TSortDirection>direction.toLowerCase()
                    });
                }
            }
        } else if ((typeof values === "object") && AbstractStore.isCandidateForSortOption(values)) {
            sorters.push(createOption(values));
        } else if ((typeof values === "string") && !Helper.isEmpty(values)) {
            sorters.push({
                'property': values,
                'direction': <TSortDirection>direction.toLowerCase()
            });
        }

        return sorters;
    }

    createModel(item: TRecord): IBsModel {
        const proxyCfg: TRestUrlOption = {};

        if (this.restUrl) {
            if (!Helper.isEmpty(this.restUrl.delete)) {
                proxyCfg.delete = this.restUrl.delete;
            }
            if (!Helper.isEmpty(this.restUrl.update)) {
                proxyCfg.update = this.restUrl.update;
            }
            if (!Helper.isEmpty(this.restUrl.save)) {
                proxyCfg.save = this.restUrl.save;
            }
        }

        if (Helper.isEmptyObject(proxyCfg)) {
            return new BsModel(item, this.adapterInstance, this._config.idProperty, this._config.dataProperty);
        } else {
            const schema: TModelOptions = {
                schema: item,
                proxy: proxyCfg
            };
            if (!Helper.isEmptyObject(this._config.csrfConfig)) {
                schema.csrfConfig = <never>this._config.csrfConfig;
            }

            return new BsModel(schema, this.adapterInstance, this._config.idProperty, this._config.dataProperty);
        }
    }

    queryParams(): TQueryParameter {
        const params: TQueryParameter = {
            logic: this._config.filterLogic
        };

        let check = Helper.isNumber(this.currentPage) && this.currentPage > 0;

        if (check) {
            params.page = this.currentPage;
        }
        check = Helper.isNumber(this.pageSize) && this.pageSize > 0;
        if (check) {
            params.limit = this.pageSize;
        }
        if (!Helper.isEmpty(this.filters)) {
            params.filters = this.filters;
        }
        if (!Helper.isEmpty(this.sorters)) {
            params.sorts = this.sorters;
        }

        return params;
    }

    /**
     * Append an item to the local dataset.
     *
     * @param {Object} item    Data to append to the dataset
     * @param {boolean} force  Force adds even if the data supplied
     *                         is not suitable for the Data Model
     * @param {boolean} silent Append data silently and doesn't trigger length counting
     * @returns {void}
     */
    protected _append(item: never, force = true, silent = false): void {
        if (this.isCandidateForModel(item)) {
            this._items.push(this.createModel(item));
            if (!silent) {
                this._state.totalCount++;
                this._state.length++;
            }
        } else if (force && !Helper.isPrimitive(item)) {
            if (Helper.isObject(item)) {
                this._items.push(this.createModel(item).seal());
            } else {
                this._items.push(Object.seal(item));
            }
            if (!silent) {
                this._state.totalCount++;
                this._state.length++;
            }
        } else {
            console.error('Can not assign primitive type to the dataset.')
        }
    }

    /**
     * Assign data to the local dataset and replace the old dataset.
     *
     * @param {Object|Object[]} source A record or collection of records to be assigned
     * @param {boolean} silent         Append data silently and doesn't trigger data conversion
     * @returns {void}
     */
    protected _assignData(source: never | never[], silent = false): void {
        if (!Array.isArray(source) || !Helper.isObject(source)) {
            this._state.loading = false;
            this._state.hasError = true;

            throw Error("The input 'source' must be an Object or an Array.");
        }

        this._state.loading = true;
        const items = Array.isArray(source) ? source : [source];

        if (silent) {
            this._items = items;
        } else {
            this._items = [];
            items.forEach(v => {
                this._append(v, true, true);
            });
        }

        this._state.length = this._items.length;
        this._state.totalCount = this._items.length;
        this._state.loading = false;
    }

    /**
     * @returns {boolean} TRUE if this data store is not in loading state.
     */
    protected _checkBeforeLoading() {
        if (this._state.loading) {
            return false;
        }

        this._state.loading = true;
        return true;
    }

    /**
     * Callback function when error loading the dataset from the remote service.
     *
     * @param {AxiosError} error The error object
     * @returns {void}
     */
    protected _onLoadingFailure(error: AxiosError) {
        this._state.loading = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * Callback function when success loading the dataset from the remote service.
     *
     * @returns {void}
     */
    protected _onLoadingSuccess() {
        this._state.loading = false;
        this._state.hasError = false;
    }

}
