import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ObjectBase, TRecord} from "../../types";

export declare type THttpMethod =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE';

export declare type TRestMethodOptions = {
    browse: THttpMethod;
    fetch: THttpMethod;
    save: THttpMethod;
    update: THttpMethod;
    delete: THttpMethod;
}

export declare type TUrlOption = {
    url: string;
    method: string;
}

export declare type TRestUrlOption = {
    [P in keyof TRestMethodOptions]?: TUrlOption | string;
};

export declare type TRestConfig = Record<keyof TRestMethodOptions, string>;

export declare type TCSRFConfig = {
    url?: string;
    tokenName?: string;
    dataField?: string;
    /**
     * Backward compatibility.
     */
    responseField?: string;
    suffix?: boolean;
}

export declare type TModelOptions = {
    schema: TRecord,
    proxy: TRestUrlOption;
    csrfConfig?: TCSRFConfig;
}

export declare type TModelState = {
    loading: boolean;
    updating: boolean;
    deleting: boolean;
    hasError: boolean;
}

export declare interface IRestAdapter {
    get adapterInstance(): AxiosInstance;

    /**
     * Perform REST request to the remote server.
     *
     * @param config    Request configuration
     * @param onRequest Promise function called before the request is made.
     * @param onSuccess Promise function called when the request is successful.
     * @param onFailure Promise function called when the request is failed.
     */
    request(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void,
    ): Promise<AxiosResponse>;

    /**
     * Get REST request methods options.
     */
    requestMethods(): TRestMethodOptions;
}

export declare interface IBsModel extends ObjectBase {
    /**
     * Returns the reactive state of the DataModel.
     */
    readonly state: TModelState;

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
     * Get/Override CSRF configuration in the form <code>{key: value}</code>, where the keys are:
     * <tt>'url', 'tokenName', 'dataField', 'suffix'</tt>.
     *
     * @example
     * return {
     *    'url'       : '/api/token/{name}',
     *    'tokenName' : 'token_name',
     *    'dataField' : 'token',
     *    'suffix'    : false
     * }
     */
    get csrfConfig(): TCSRFConfig | undefined;

    /**
     * Get REST proxy adapter which is used to work with remote service.
     */
    get proxy(): IRestAdapter;

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
     * Assign new value to an existing field name.
     *
     * @param field     The field name
     * @param newValue  The new value
     */
    assignValue(field: string, newValue: unknown): void;

    /**
     * Assign new value to some existing fields.
     *
     * @param sources Object with format key-value pairs
     */
    assignValues(sources: TRecord): void;

    /**
     * Get a field value.
     *
     * @param name The field name.
     */
    get(name: string): never;

    /**
     * Define or sets a field with new value.
     * If the field doesn't exist, then it will be appended.
     *
     * @param name The field name.
     * @param value The field value.
     * @throws Error If this data model is frozen.
     */
    set(name: string, value: unknown): void;

    /**
     * Get all the field names.
     */
    getFields(): string[];

    /**
     * Get ID field name for this data model.
     */
    getIdProperty(): string;

    /**
     * Perform delete record that already exists on the remote service via REST API.
     */
    delete(): Promise<AxiosResponse>;

    /**
     * Perform fetch or read record from remote service via REST API.
     *
     * @param id The item ID
     */
    fetch(id?: string | number): Promise<AxiosResponse>;

    /**
     * Perform custom HTTP request to the remote service via REST API.
     *
     * @param restKey    The key from restUrl property
     * @param method     Any valid HTTP method, likes: `get`, `post`, `delete`, `put`, `patch`.
     *                   The default is `get`.
     * @param params     Parameters to append when invoke rest request
     * @param data       Data to append when invoke rest request
     * @param successCb  Promise function to be called when the request is successful
     * @param errorCb    Promise function to be called when the request is failed
     */
    request(
        restKey: keyof TRestConfig,
        method: THttpMethod,
        params?: TRecord,
        data?: TRecord,
        successCb?: (response: AxiosResponse) => void,
        errorCb?: (error: AxiosError) => void,
    ): Promise<AxiosResponse>;

    /**
     * Reset all fields value to its default.
     */
    reset(): void;

    /**
     * Reset this model state back to their initial states, ie. `loading`, etc.
     */
    resetState(): void;

    /**
     * Persist new record to the remote service via REST API.
     */
    save(): Promise<AxiosResponse>;

    /**
     * Update and persist record that already exists on the remote service via REST API.
     */
    update(): Promise<AxiosResponse>;

    /**
     * Freeze this data model instance, makes it Readonly and prevents any modification.
     */
    freeze(): Readonly<IBsModel>;

    /**
     * Seal this data model instance, preventing new properties from being added to it
     * and marking all existing properties as non-configurable.
     *
     * Values of present properties can still be changed as long as they are writable.
     */
    seal(): IBsModel;

    /**
     * Convert field attributes into Javascript plain object.
     */
    toJSON(): TRecord;
}

export declare type TFilterLogic = "AND" | "OR";

export declare type TFilterOperator =
    | "eq" | "neq"
    | "gt" | "gte"
    | "lt" | "lte"
    | "contains" | "fts" | "tsquery"
    | "startsWith" | "startswith"
    | "startWith" | "startwith"
    | "endsWith" | "endswith"
    | "endWith" | "endwith"
    | "notin" | "in";

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

export declare type TSortDirection = "asc" | "desc";

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
    find(property: string, value: unknown, startIndex: number): IBsModel | undefined;

    /**
     * Finds the first matching item in the local dataset by function's predicate.
     * If the predicate returns `true`, it is considered a match.
     *
     * @param predicate  Function to execute on each value in the array
     * @returns The item of the first element in the array that satisfies
     * the provided testing function. Otherwise, `undefined` is returned.
     */
    findBy(
        predicate: (value: IBsModel, index: number) => boolean,
    ): IBsModel | undefined;

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
    localFilter(): IBsModel[];

    /**
     * Sorts the dataset locally and returns new sorted dataset.
     */
    localSort(): IBsModel[];

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
    remove(items: IBsModel[] | IBsModel): void;

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
    load(data?: never[] | never): Promise<IBsModel[] | AxiosResponse>;

}

export declare interface IArrayStore extends IAbstractStore {
    /**
     * Returns dataset from the active page.
     *
     * If a filter or sorter has been applied before,
     * then the returned dataset will also be affected by it.
     */
    get dataItems(): IBsModel[];

    /**
     * Calculate means or average value based on the given field.
     *
     * @param field The field name of the dataset to calculate
     */
    aggregateAvg(field: string): number;

    /**
     * Count number of items in the internal dataset specified by the given criteria.
     *
     * @param field The grouping field name criteria
     * @param value  The grouping value criteria
     */
    aggregateCountBy(field: string, value: unknown): number;

    /**
     * Calculate the SUM or total value based on the given field.
     *
     * @param field The field name to be used when calculating value
     */
    aggregateSum(field: string): number;

    /**
     * Append an item to the internal dataset and sorted if needed.
     *
     * @param item    Data to append to the Store
     * @param sorted  Sort dataset after appended
     */
    append(item: never, sorted: boolean): void;

    /**
     * Replace the dataset with new data.
     *
     * @param data   The new data to be assigned
     * @param silent Append the data silently and don't trigger data conversion
     */
    assignData(data: never[] | never, silent: boolean): void;

    /**
     * Sorts the internal dataset with the given criteria and returns
     * the reference of the internal dataset.
     *
     * @example
     * // sort by a single field
     * let results = myStore.sort('myField', 'asc');
     *
     * // sorting by multiple fields
     * let results = myStore.sort([
     *  {property: 'age', direction: 'desc'},
     *  {property: 'name', direction: 'asc'}
     * ]);
     *
     * @param options   The field for sorting or `TSortOption` objects
     * @param direction The sort direction
     */
    sort(
        options: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection,
    ): IBsModel[];
}

export declare type TSuccessResponse = {
    success: boolean;
    message: string;
}

export declare interface IBsStore extends IAbstractStore {
    /**
     * Returns dataset from the active page.
     *
     * If a filter or sorter has been applied before,
     * then the returned dataset will also be affected by it.
     */
    get dataItems(): IBsModel[];

    /**
     * Check if the data Store is using server filtering or local filtering.
     */
    get remoteFilter(): boolean;

    /**
     * Enable or disable data Store server filtering.
     *
     * @param {boolean} value If TRUE then using local filtering and FALSE otherwise
     */
    set remoteFilter(value: boolean);

    /**
     * Check if the data Store is using server paging or local paging.
     */
    get remotePaging(): boolean;

    /**
     * Enable or disable data Store server paging.
     *
     * @param value If TRUE then using server paging and FALSE otherwise
     */
    set remotePaging(value: boolean);

    /**
     * Check if the Store is using server sorting or local sorting.
     */
    get remoteSort(): boolean;

    /**
     * Enable or disable data Store server sorting.
     *
     * @param value If TRUE then using server sorting and FALSE otherwise
     */
    set remoteSort(value: boolean);

    /**
     * Calculate means or average value based on the given field.
     *
     * @param field The field name of the dataset to calculate
     */
    aggregateAvg(field: string): number;

    /**
     * Count number of items in the internal dataset specified by the given criteria.
     *
     * @param field  The grouping field name criteria
     * @param value The grouping value criteria
     */
    aggregateCountBy(field: string, value: unknown): number;

    /**
     * Calculate the SUM or total value based on the given field.
     *
     * @param field The field name to be used when calculating value
     */
    aggregateSum(field: string): number;

    /**
     * Append an item to the internal dataset and also save the item as a new record to the
     * remote server whenever possible. The item can be saved to the remote server,
     * if 'restUrl' property contains a 'save' key.
     *
     * @param item Data to append to the internal dataset
     */
    append(item: never): void;

    /**
     * Replace internal dataset with new data. The proses only affected the internal dataset
     * and nothing is sent to the remote server.
     *
     * @param data   The new data to be assigned
     * @param silent Append the data silently and don't trigger data conversion
     */
    assignData(data: never[] | never, silent: boolean): void;

    /**
     * Delete specific item from internal dataset as well as from remote server whenever possible.
     * The item can be deleted from the remote server, if 'restUrl' property contains a 'delete' key.
     *
     * @param item Data Model instance to be removed
     */
    delete(item: IBsModel): Promise<AxiosResponse | TSuccessResponse>;

    /**
     * Delete specific items from internal dataset as well as from remote
     * server whenever possible. The items can be deleted from the remote
     * server, if 'restUrl' property contains a 'delete' key.
     *
     * @param items Collection of data Model instances to be removed
     */
    deletes(items: IBsModel[]): Promise<TSuccessResponse>;

    /**
     * Fetch single item from the remote server via REST API and
     * replace internal dataset with the one comes from the remote service.
     *
     * @param id The item ID to fetch
     */
    fetch(id: string | number): Promise<AxiosResponse>;

    /**
     * Load data from the remote server and assign query parameters and configuration.
     *
     * @deprecated Use `load` instead.
     */
    query(): Promise<unknown>;

    /**
     * Sorts the internal dataset with the given criteria and returns
     * the reference of the internal dataset.
     *
     * @example
     * // sort by a single field
     * const results = myStore.sort('myField', 'asc');
     *
     * // sorting by multiple fields
     * const results = myStore.sort([
     *  {property: 'age', direction: 'desc'},
     *  {property: 'name', direction: 'asc'}
     * ]);
     *
     * @param options   The field for sorting or `TSortOption` objects
     * @param direction The sort direction
     */
    sort(
        options: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection,
    ): Promise<IBsModel[]>;
}

export {default as AbstractStore} from './AbstractStore';
export {default as BsArrayStore} from './BsArrayStore';
export {default as BsStore} from './BsStore';
export {default as BsModel} from './BsModel';
export {default as RestProxyAdapter} from './RestProxyAdapter';
