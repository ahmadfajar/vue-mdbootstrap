import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import orderBy from 'lodash/orderBy';
import { reactive, readonly } from 'vue';
import { BsModel, RestProxyAdapter } from '../model';
import type {
    IBsModel,
    IRestAdapter,
    ObjectBase,
    TBsModel,
    TDataStoreConfig,
    TDataStoreState,
    TFilterLogic,
    TFilterOperator,
    TFilterOption,
    TModelOptions,
    TQueryParameter,
    TRecord,
    TRestConfig,
    TRestUrlOption,
    TSortDirection,
    TSortOption,
} from '../types';
import { autoBind } from '../utils/AutoBind';
import Helper from '../utils/Helper';

export const appendErrMsg = 'Can not assign primitive type to the dataset.';
export const proxyErrMsg = 'Unable to send request to remote server if REST proxy is not defined.';
export const emptyDataErrMsg = 'Server returns empty data.';
export const parsingDataErrMsg = 'Unable to parse data coming from server.';

/**
 * Class AbstractStore is superclass of {@link BsArrayStore}, and {@link BsStore}.
 * It's never used directly, but offers a set of
 * methods used by those subclasses.
 *
 * @author Ahmad Fajar
 * @since  15/03/2019 modified: 01/03/2024 21:09
 */
export default abstract class AbstractStore implements ObjectBase {
    protected _config: TDataStoreConfig;
    protected _filters: TFilterOption[];
    protected _filteredItems: TBsModel[];
    protected _items: TBsModel[];
    protected _proxy: IRestAdapter | undefined;
    protected _state: TDataStoreState;
    public storeState: Readonly<TDataStoreState>;

    /**
     * Check if the given item is a data model or not.
     *
     * @param item The item to check
     * @returns TRUE if the given item is a data model otherwise FALSE
     */
    static isModel(item: unknown): item is BsModel {
        return item instanceof BsModel;
    }

    static isCandidateForFilterOption(item: TRecord): item is TFilterOption {
        return Object.keys(item).every((k) =>
            ['property', 'value', 'operator', 'type'].includes(k)
        );
    }

    static isCandidateForSortOption(item: TRecord): item is TSortOption {
        return Object.keys(item).every((k) => ['property', 'direction'].includes(k));
    }

    /**
     * Class constructor.
     *
     * @param config  The configuration properties
     */
    protected constructor(config: TDataStoreConfig = {}) {
        const initialCfg: TDataStoreConfig = {
            idProperty: undefined,
            dataProperty: undefined,
            totalProperty: undefined,
            filterLogic: 'AND',
            filters: [],
            sortOptions: [],
            ...config,
        };
        initialCfg.pageSize =
            initialCfg.pageSize && Helper.isNumber(initialCfg.pageSize) ? initialCfg.pageSize : -1;

        this._config = initialCfg;
        this._filteredItems = [] as TBsModel[];
        this._items = [] as TBsModel[];

        if (!Helper.isEmpty(initialCfg.filters)) {
            const filters = this.createFilters(initialCfg.filters);
            this._filters = filters;
            this._config.filters = filters;
        } else {
            this._filters = [];
        }

        // Add reactivity to the state.
        this._state = reactive<TDataStoreState>({
            loading: false,
            updating: false,
            deleting: false,
            hasError: false,
            currentPage: 1,
            length: 0,
            totalCount: 0,
        });
        this.storeState = readonly(this._state);
        autoBind(this);
    }

    get $_class(): string {
        return Object.getPrototypeOf(this).constructor.name;
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
            for (const item of <TBsModel[]>this._items) {
                if (AbstractStore.isModel(item)) {
                    item.destroy();
                }
            }
        }

        this._items = [];
        this._state.totalCount = 0;
        this._state.length = 0;
        this.resetState();
    }

    /**
     * @deprecated
     * Use `clear` instead.
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
     *
     * For backward compatibility you can override this function
     * as needed on the inheritance class or put it on the constructor
     * of the inheritance class or when instantiate the model.
     */
    get restUrl(): TRestConfig | undefined {
        return <TRestConfig>(this._config.restProxy ?? this._config.restUrl);
    }

    set restUrl(option: TRestConfig) {
        this._config.restProxy = option;
    }

    get currentPage(): number {
        return this._state.currentPage;
    }

    get pageSize(): number {
        return <number>this._config.pageSize;
    }

    set pageSize(value: number) {
        this._config.pageSize = value;
    }

    get length(): number {
        return this._state.length;
    }

    get totalCount(): number {
        return this._state.totalCount;
    }

    get totalPages(): number {
        return this.pageSize > 0 ? Math.ceil(this.totalCount / this.pageSize) : 1;
    }

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
            : Helper.isObject(values) && AbstractStore.isCandidateForFilterOption(values)
              ? [values]
              : [];

        const newFilters = this.filters.filter((flt) => {
            let found = false;
            for (const filter of this._config.filters as TFilterOption[]) {
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
        type?: string
    ): this {
        const flt: TFilterOption = {
            property: field,
            value: value,
            operator: <TFilterOperator>(Helper.isEmpty(operator) ? 'eq' : operator.toLowerCase()),
        };
        if (type) {
            flt.type = type;
        }
        this.filters.push(flt);
        this._filteredItems = [];

        return this;
    }

    setFilters(newFilters: TFilterOption[] | TFilterOption, includeDefault = false): this {
        if (Array.isArray(newFilters)) {
            this.filters = includeDefault ? newFilters.concat(this.defaultFilters) : newFilters;
        } else if (
            Helper.isObject(newFilters) &&
            AbstractStore.isCandidateForFilterOption(newFilters)
        ) {
            this.filters = includeDefault ? [newFilters].concat(this.defaultFilters) : [newFilters];
        } else {
            this.filters = includeDefault ? this.defaultFilters : [];
        }

        return this;
    }

    setFilterLogic(logic: TFilterLogic): this {
        if (Helper.isString(logic) && logic.trim() !== '') {
            const trimmed = logic.trim().toUpperCase();

            if (trimmed === 'AND' || trimmed === 'OR') {
                this._config.filterLogic = trimmed;
            }
        }

        return this;
    }

    get sorters(): TSortOption[] {
        return this._config.sortOptions as TSortOption[];
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

    find(property: string, value: unknown, startIndex = 0): TBsModel | undefined {
        return this._items.find((item, idx) => item.get(property) === value && idx >= startIndex);
    }

    findBy(predicate: (value: TBsModel, index: number) => boolean): TBsModel | undefined {
        return this._items.find(predicate);
    }

    findIndex(property: string, value: unknown, startIndex = 0): number {
        return this._items.findIndex(
            (item, idx) => item.get(property) === value && idx >= startIndex
        );
    }

    localFilter(): TBsModel[] {
        if (this.filters.length > 0) {
            return this._items.filter((item) => {
                const conditions = [];

                for (const flt of this.filters) {
                    const itemValue = <never>Helper.getObjectValueByPath(item, flt.property);
                    const operator = <TFilterOperator>flt.operator.toLowerCase();

                    if (operator === 'gt') {
                        conditions.push(itemValue > <number>flt.value);
                    } else if (operator === 'gte') {
                        conditions.push(itemValue >= <number>flt.value);
                    } else if (operator === 'lt') {
                        conditions.push(itemValue < <number>flt.value);
                    } else if (operator === 'lte') {
                        conditions.push(itemValue <= <number>flt.value);
                    } else if (operator === 'neq') {
                        conditions.push(itemValue !== flt.value);
                    } else if (operator === 'contains' || flt.operator === 'fts') {
                        conditions.push(
                            String(itemValue)
                                .toLowerCase()
                                .includes(String(flt.value).toLowerCase())
                        );
                    } else if (operator === 'startswith' || flt.operator === 'startwith') {
                        conditions.push(
                            String(itemValue)
                                .toLowerCase()
                                .startsWith(String(flt.value).toLowerCase())
                        );
                    } else if (operator === 'endswith' || flt.operator === 'endwith') {
                        conditions.push(
                            String(itemValue)
                                .toLowerCase()
                                .endsWith(String(flt.value).toLowerCase())
                        );
                    } else if (operator === 'notin' && Array.isArray(flt.value)) {
                        conditions.push(!flt.value.includes(itemValue));
                    } else if (operator === 'in' && Array.isArray(flt.value)) {
                        conditions.push(flt.value.includes(itemValue));
                    } else {
                        conditions.push(itemValue === flt.value);
                    }
                }
                if (this._config.filterLogic === 'OR') {
                    return conditions.some((it) => it === true);
                } else {
                    return conditions.every((it) => it === true);
                }
            });
        } else {
            return this._items;
        }
    }

    localSort(): TBsModel[] {
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

    page(value: number): this {
        this._state.currentPage = value;
        return this;
    }

    previousPage(): this {
        if (this.currentPage > 1) {
            return this.page(this.currentPage - 1);
        } else {
            return this.page(this.currentPage);
        }
    }

    nextPage(): this {
        if (this.currentPage < this.totalPages) {
            return this.page(this.currentPage + 1);
        } else {
            return this.page(this.currentPage);
        }
    }

    isCandidateForModel(item: TRecord): boolean {
        return (
            Helper.isObject(item) &&
            !Helper.isEmpty(this._config.idProperty) &&
            Object.hasOwn(item, this._config.idProperty)
        );
    }

    remove(items: TBsModel[] | TBsModel): void {
        if (Array.isArray(items)) {
            for (const item of items) {
                this.remove(item);
            }
        } else if (this.isCandidateForModel(items) || AbstractStore.isModel(items)) {
            const idProperty = <string>this._config.idProperty;
            const index = this.findIndex(idProperty, items.get(idProperty));
            index > -1 && this.removeAt(index);
        } else {
            throw Error('Item must be instance of BsModel.');
        }
    }

    removeAt(index: number, count = 1): void {
        if (index < 0) {
            throw Error("Parameter 'index' is out of bound.");
        }
        if (count < 1) {
            throw Error("Parameter 'count' must be greater than '0'.");
        }

        const oldLength = this._items.length;
        const oldTotal = this._state.totalCount;
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

        if (oldTotal <= oldLength) {
            this._state.totalCount = newLength;
        } else {
            this._state.totalCount = oldTotal - count;
        }

        this._state.length = newLength;
        this._state.deleting = false;
    }

    setPageSize(value: number): this {
        this.pageSize = value;
        return this;
    }

    setSorters(sortOptions: TSortOption[] | TSortOption): this {
        this.sorters = sortOptions;
        return this;
    }

    createFilters(values: TFilterOption | TFilterOption[]): TFilterOption[] {
        const filters: TFilterOption[] = [];

        if (Array.isArray(values)) {
            for (const flt of values) {
                if (Helper.isObject(flt) && AbstractStore.isCandidateForFilterOption(flt)) {
                    const cFilter: TFilterOption = {
                        property: flt.property,
                        value: flt.value,
                        operator: <TFilterOperator>(
                            (Helper.isEmpty(flt.operator) ? 'eq' : flt.operator.toLowerCase())
                        ),
                    };
                    if (flt.type) {
                        cFilter.type = flt.type;
                    }
                    filters.push(cFilter);
                }
            }
        } else if (Helper.isObject(values) && AbstractStore.isCandidateForFilterOption(values)) {
            const vFilter: TFilterOption = {
                property: values.property,
                value: values.value,
                operator: <TFilterOperator>(
                    (Helper.isEmpty(values.operator) ? 'eq' : values.operator.toLowerCase())
                ),
            };
            if (values.type) {
                vFilter.type = values.type;
            }
            filters.push(vFilter);
        }

        return filters;
    }

    createSorters(
        values: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection = 'asc',
        replace = false
    ): TSortOption[] {
        const sorters: TSortOption[] = [];
        const createOption = (opt: TSortOption) => {
            return {
                property: <string>(opt.property ?? opt.field),
                direction: <TSortDirection>(
                    (opt.direction && !Helper.isEmpty(opt.direction)
                        ? opt.direction.toLowerCase()
                        : direction.toLowerCase())
                ),
            };
        };

        if (Array.isArray(values)) {
            for (const fld of values) {
                if (Helper.isObject(fld) && AbstractStore.isCandidateForSortOption(fld)) {
                    sorters.push(createOption(fld));
                } else if (Helper.isString(fld) && !Helper.isEmpty(fld)) {
                    sorters.push({
                        property: fld,
                        direction: <TSortDirection>direction.toLowerCase(),
                    });
                }
            }
        } else if (Helper.isObject(values) && AbstractStore.isCandidateForSortOption(values)) {
            sorters.push(createOption(values));
        } else if (Helper.isString(values) && !Helper.isEmpty(values)) {
            sorters.push({
                property: values,
                direction: <TSortDirection>direction.toLowerCase(),
            });
        }

        if (replace) {
            this._config.sortOptions = sorters;
        }

        return sorters;
    }

    createModel(item: TRecord): IBsModel | BsModel {
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
            return new BsModel(
                item,
                this.adapterInstance,
                this._config.idProperty,
                this._config.dataProperty
            );
        } else {
            const data: TModelOptions = {
                schema: item,
                proxy: proxyCfg,
            };
            if (!Helper.isEmptyObject(this._config.csrfConfig)) {
                data.csrfConfig = <never>this._config.csrfConfig;
            }

            return new BsModel(
                data,
                this.adapterInstance,
                this._config.idProperty,
                this._config.dataProperty
            );
        }
    }

    queryParams(): TQueryParameter {
        const params: TQueryParameter = {
            logic: this._config.filterLogic as TFilterLogic,
        };

        if (this.currentPage > 0) {
            params.page = this.currentPage;
        }
        if (this.pageSize > 0) {
            params.limit = this.pageSize;
        }
        if (!Helper.isEmpty(this.filters)) {
            params.filters = this.filters;

            if (!Helper.isEmpty(this._config.filters)) {
                const defFilters = this._config.filters.filter((flt) => {
                    let found = false;
                    for (const filter of this.filters) {
                        if (flt.property === filter.property) {
                            found = true;
                            break;
                        }
                    }

                    return !found;
                });
                if (defFilters.length > 0) {
                    params.filters = params.filters.concat(defFilters);
                }
            }
        }
        if (!Helper.isEmpty(this.sorters)) {
            params.sorts = this.sorters;
        }

        return params;
    }

    abstract load(data?: unknown): Promise<TBsModel[] | AxiosResponse>;

    /**
     * Append an item to the local dataset.
     *
     * @param item   Data to append to the dataset
     * @param force  Force adds even if the data supplied
     *               is not suitable for the Data Model
     * @param silent Append data silently and doesn't trigger length counting
     */
    protected _append(item: TRecord, force = true, silent = false): void {
        if (this.isCandidateForModel(item)) {
            this._items.push(<TBsModel>this.createModel(item));
            if (!silent) {
                this._state.totalCount++;
                this._state.length++;
            }
        } else if (force && !Helper.isPrimitive(item)) {
            if (Helper.isObject(item)) {
                this._items.push(<TBsModel>this.createModel(item).seal());
            } else {
                this._items.push(Object.seal(item));
            }
            if (!silent) {
                this._state.totalCount++;
                this._state.length++;
            }
        } else {
            console.error(appendErrMsg);
        }
    }

    /**
     * Assign data to the local dataset and replace the old dataset.
     *
     * @param source  A record or collection of records to be assigned
     * @param silent  Append data silently and doesn't trigger data conversion
     */
    protected _assignData(source: unknown, silent = false): void {
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
            items.forEach((v) => {
                this._append(v, true, true);
            });
        }

        this._state.length = this._items.length;
        this._state.totalCount = this._items.length;
    }

    /**
     * @returns TRUE if this data store is not in loading state.
     */
    protected _checkBeforeLoading(): boolean {
        if (this._state.loading) {
            return false;
        }

        this._state.loading = true;
        return true;
    }

    /**
     * Callback function when error loading the dataset from the remote service.
     *
     * @param error The error object
     */
    protected _onLoadingFailure(error: AxiosError): void {
        this._state.loading = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * Callback function when success loading the dataset from the remote service.
     */
    protected _onLoadingSuccess(): void {
        this._state.loading = false;
        this._state.hasError = false;
    }
}
