import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { ObjectBase, TRecord } from '../../types';
import type {
    BsModel,
    IBsModel,
    IRestAdapter,
    TBsModel,
    TCSRFConfig,
    TModelState,
    TRestConfig,
    TRestUrlOption
} from '../types';

export declare type TFilterLogic = 'AND' | 'OR';

export declare type TFilterOperator =
    | 'eq' | 'neq'
    | 'gt' | 'gte'
    | 'lt' | 'lte'
    | 'contains' | 'fts' | 'tsquery'
    | 'startsWith' | 'startswith'
    | 'startWith' | 'startwith'
    | 'endsWith' | 'endswith'
    | 'endWith' | 'endwith'
    | 'notin' | 'in';

export declare type TFilterOption = {
    /**
     * Field name attribute for filter operation.
     */
    property: string;
    /**
     * Filter value.
     */
    value: string | number | boolean;
    /**
     * Filter operator, default: <tt>eq</tt>.
     */
    operator: TFilterOperator;
}

export declare type TSortDirection = 'asc' | 'desc';

export declare type TSortOption = {
    /**
     * Field name attribute for sorting operation.
     */
    property: string;

    /**
     * @deprecated
     * Use `property` instead.
     */
    field?: string;

    /**
     * Sort direction, valid values: <tt>asc, desc</tt>
     */
    direction: TSortDirection;
}

export declare type TQueryParameter = {
    page?: number;
    limit?: number;
    filters?: TFilterOption[];
    sorts?: TSortOption[];
    logic: TFilterLogic;
}

export declare type TDataStoreConfig = TRecord & {
    idProperty: string | undefined;
    dataProperty: string | undefined;
    totalProperty: string | undefined;
    pageSize?: number;
    remoteFilter?: boolean;
    remotePaging?: boolean;
    remoteSort?: boolean;
    restProxy?: TRestUrlOption;
    csrfConfig?: TCSRFConfig;
    filterLogic: TFilterLogic;
    filters: TFilterOption[];
    sortOptions: TSortOption[];
}

export declare type TDataStoreState = TModelState & {
    length: number;
    totalCount: number;
    currentPage: number;
}

export declare interface IAbstractStore extends ObjectBase {
    /**
     * Returns the reactive state of the DataStore.
     */
    readonly storeState: TDataStoreState;

    /**
     * Get the class name of this instance.
     */
    get $_class(): string;

    /**
     * Readonly data Model state, whether it is still loading data or not.
     */
    get loading(): boolean;

    /**
     * Readonly data Model state, whether it is still in the process of
     * saving/updating data to the remote server or not.
     */
    get updating(): boolean;

    /**
     * Readonly data Model state, whether it is still in the process of deleting
     * data from the remote server or not.
     */
    get deleting(): boolean;

    /**
     * Readonly data Model state, whether there was an error when
     * loading/saving/deleting data or not.
     */
    get hasError(): boolean;

    /**
     * Get REST proxy adapter which is used to work with remote service.
     */
    get proxy(): IRestAdapter | undefined;

    /**
     * Returns the axios plugin adapter.
     */
    get adapterInstance(): AxiosInstance | undefined;

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
    get restUrl(): TRestConfig | undefined;

    /**
     * Returns active page number (base-1 index).
     */
    get currentPage(): number;

    /**
     * Get or Set the number of items within a page.
     */
    get pageSize(): number;

    set pageSize(value: number);

    /**
     * Returns the number of items on the active page.
     */
    get length(): number;

    /**
     * Returns total number of items in the Store's dataset. (readonly)
     */
    get totalCount(): number;

    /**
     * Returns total number of pages.
     */
    get totalPages(): number;

    /**
     * Get or set the default filters.
     */
    get defaultFilters(): TFilterOption[];

    set defaultFilters(newFilters: TFilterOption[] | TFilterOption);

    /**
     * Get or Set collection of filters to be used.
     */
    get filters(): TFilterOption[];

    set filters(newFilters: TFilterOption[] | TFilterOption);

    /**
     * Add a filter to the Store.
     *
     * @param field     The field name to which the filter will be applied.
     * @param value     The filter value
     * @param operator  Filter operator to be used, valid values: `eq`, `neq`, `gt`, `gte`,
     *                  `lt`, `lte`, `in`, `notin`, `startwith`, `endwith`, `contains`, `fts`
     */
    addFilter(
        field: string,
        value: string | number | boolean,
        operator: TFilterOperator,
    ): this;

    /**
     * Replace old filters and apply new filters to the Store dataset.
     *
     * @param filters        The filters to apply
     * @param includeDefault Include default filters or not
     */
    setFilters(
        filters: TFilterOption[] | TFilterOption,
        includeDefault: boolean,
    ): this;

    /**
     * Define the filter logic to be used when filtering the Store’s dataset.
     *
     * @param logic The filter logic, valid values: 'AND', 'OR'
     */
    setFilterLogic(logic: unknown): this;

    /**
     * Get or Set the sorter's object collection to be used
     * when sorting the Store's dataset.
     */
    get sorters(): TSortOption[];

    set sorters(sortOptions: TSortOption[] | TSortOption);

    /**
     * Clear all data items in the local dataset.
     */
    clear(): void;

    /**
     * @deprecated
     * Use `clear` instead.
     */
    clearData(): void;

    /**
     * Reset this model state back to their initial states, ie. `loading`, etc.
     */
    resetState(): void;

    /**
     * Finds the first matching item in the local dataset by a specific field value.
     *
     * @param property    The field name to test
     * @param value       The value to match
     * @param startIndex  The index to start searching at
     */
    find(property: string, value: unknown, startIndex: number): TBsModel | undefined;

    /**
     * Finds the first matching item in the local dataset by function's predicate.
     * If the predicate returns `true`, it is considered a match.
     *
     * @param predicate  Function to execute on each value in the array
     * @returns The item of the first element in the array that satisfies
     * the provided testing function. Otherwise, `undefined` is returned.
     */
    findBy(
        predicate: (value: TBsModel, index: number) => boolean,
    ): TBsModel | undefined;

    /**
     * Finds the index of the first matching Item in the local dataset by a specific field value.
     *
     * @param property   The field name to test
     * @param value      The value to match
     * @param startIndex The index to start searching at
     * @returns The index of first match element, otherwise -1
     */
    findIndex(
        property: string,
        value: unknown,
        startIndex: number
    ): number;

    /**
     * Filter the dataset locally and returns new array with
     * all elements that pass the test.
     */
    localFilter(): TBsModel[];

    /**
     * Sorts the dataset locally and returns new sorted dataset.
     */
    localSort(): TBsModel[];

    /**
     * Check if the data in the local dataset is empty or not.
     */
    isEmpty(): boolean;

    /**
     * Sets the current active page.
     *
     * @param {number} value The new page number, based-1 index.
     */
    page(value: number): this;

    /**
     * Sets the previous page to load by the Store.
     */
    previousPage(): this;

    /**
     * Sets the next page to load by the Store.
     */
    nextPage(): this;

    /**
     * Check if the given item is a DataModel or not.
     *
     * @param {Object} item The item to check
     */
    isCandidateForModel(item: object): boolean;

    /**
     * Removes the specified item(s) from the internal dataset.
     *
     * @param items Model instance or array of model instances to be removed
     */
    remove(items: TBsModel[] | TBsModel): void;

    /**
     * Removes the model instance(s) at the given index from the internal dataset.
     *
     * @param index Starting index position
     * @param count Number of items to delete
     */
    removeAt(index: number, count: number): void;

    /**
     * Set the number of items within a page.
     *
     * @param value Number of items within a page
     */
    setPageSize(value: number): this;

    /**
     * Set sorter's criteria collection.
     *
     * @param sortOptions The sorts method criteria
     */
    setSorters(sortOptions: TSortOption[] | TSortOption): this;

    /**
     * Create an array of FilterOption criteria.
     *
     * @param values  The `FilterOption` objects
     */
    createFilters(values: TFilterOption | TFilterOption[]): TFilterOption[];

    /**
     * Create an array of SortOption criteria.
     *
     * @param values    The field for sorting or `TSortOption` objects
     * @param direction The sort direction
     * @param replace   Replace existing sort criteria or not
     */
    createSorters(
        values: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection,
        replace: boolean,
    ): TSortOption[];

    /**
     * Create new DataModel from the given object.
     *
     * @param item The data to convert
     */
    createModel(item: TRecord): IBsModel;

    /**
     * Get current query parameter's configuration.
     */
    queryParams(): TQueryParameter;

    /**
     * Load data from the remote server or from the given record(s) and
     * replace internal dataset with the new dataset.
     *
     * @param data The record(s) to be assigned
     */
    load(data?: never[] | never): Promise<TBsModel[] | AxiosResponse>;

}

/**
 * Class AbstractStore is superclass of {@link BsArrayStore}, and {@link BsStore}.
 * It's never used directly, but offers a set of
 * methods used by those subclasses.
 */
export declare class AbstractStore implements IAbstractStore {
    protected readonly _appendErrMsg = 'Can not assign primitive type to the dataset.';
    protected readonly _proxyErrMsg = 'Unable to send request to remote server if REST proxy is not defined.';
    protected readonly _emptyDataErrMsg = 'Server returns empty data.';
    protected readonly _parsingDataErrMsg = 'Unable to parse data coming from server.';
    protected _config: TDataStoreConfig;
    protected _filters: TFilterOption[];
    protected _filteredItems: TBsModel[];
    protected _items: TBsModel[];
    protected _proxy: IRestAdapter | undefined;
    protected _state: TDataStoreState;
    storeState: TDataStoreState;

    /**
     * Check if the given item is a data model or not.
     *
     * @param item The item to check
     * @returns TRUE if the given item is a data model otherwise FALSE
     */
    static isModel(item: unknown): item is BsModel;

    static isCandidateForFilterOption(item: TRecord): item is TFilterOption;

    static isCandidateForSortOption(item: TRecord): item is TSortOption;

    /**
     * Class constructor.
     *
     * @param config  The configuration properties
     */
    constructor(config?: TRecord);

    get $_class(): string;

    destroy(): void;

    clear(): void;

    /**
     * @deprecated
     * Use `clear` instead.
     */
    clearData(): void;

    get loading(): boolean;

    get updating(): boolean;

    get deleting(): boolean;

    get hasError(): boolean;

    get adapterInstance(): AxiosInstance | undefined;

    get proxy(): IRestAdapter | undefined;

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
    get restUrl(): TRestConfig | undefined;

    get currentPage(): number;

    get pageSize(): number;
    set pageSize(value: number);

    get length(): number;

    get totalCount(): number;

    get totalPages(): number;

    get defaultFilters(): TFilterOption[];
    set defaultFilters(values: TFilterOption[] | TFilterOption);

    get filters(): TFilterOption[];
    set filters(newFilters: TFilterOption[] | TFilterOption);

    addFilter(field: string, value: string | number | boolean, operator?: TFilterOperator): this;

    setFilters(newFilters: TFilterOption[] | TFilterOption, includeDefault?: boolean): this;

    setFilterLogic(logic: unknown): this;

    get sorters(): TSortOption[];
    set sorters(sortOptions: TSortOption[] | TSortOption);

    resetState(): void;

    find(property: string, value: unknown, startIndex?: number): TBsModel | undefined;

    findBy(predicate: (value: TBsModel, index: number) => boolean): TBsModel | undefined;

    findIndex(property: string, value: unknown, startIndex?: number): number;

    localFilter(): TBsModel[];

    localSort(): TBsModel[];

    isEmpty(): boolean;

    page(value: number): this;

    previousPage(): this;

    nextPage(): this;

    isCandidateForModel(item: object): boolean;

    remove(items: TBsModel[] | TBsModel): void;

    removeAt(index: number, count?: number): void;

    setPageSize(value: number): this;

    setSorters(sortOptions: TSortOption[] | TSortOption): this;

    createFilters(values: TFilterOption | TFilterOption[]): TFilterOption[];

    createSorters(
        values: string | string[] | TSortOption | TSortOption[],
        direction?: TSortDirection,
        replace?: boolean
    ): TSortOption[];

    createModel(item: TRecord): TBsModel;

    queryParams(): TQueryParameter;

    load(data?: never[]): Promise<TBsModel[] | AxiosResponse>;

    /**
     * Append an item to the local dataset.
     *
     * @param item   Data to append to the dataset
     * @param force  Force adds even if the data supplied
     *               is not suitable for the Data Model
     * @param silent Append data silently and doesn't trigger length counting
     */
    protected _append(item: never, force?: boolean, silent?: boolean): void;

    /**
     * Assign data to the local dataset and replace the old dataset.
     *
     * @param source  A record or collection of records to be assigned
     * @param silent  Append data silently and doesn't trigger data conversion
     */
    protected _assignData(source: unknown | unknown[], silent?: boolean): void;

    /**
     * @returns TRUE if this data store is not in loading state.
     */
    protected _checkBeforeLoading(): boolean;

    /**
     * Callback function when error loading the dataset from the remote service.
     *
     * @param error The error object
     */
    protected _onLoadingFailure(error: AxiosError): void;

    /**
     * Callback function when success loading the dataset from the remote service.
     */
    protected _onLoadingSuccess(): void;
}
