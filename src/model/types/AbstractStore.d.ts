import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type {
    IAbstractStore,
    IBsModel,
    IRestAdapter,
    TDataStoreConfig,
    TDataStoreState,
    TFilterOperator,
    TFilterOption,
    TQueryParameter,
    TRecord,
    TRestConfig,
    TSortDirection,
    TSortOption
} from '../../types';
import BsModel from './BsModel';

/**
 * Class AbstractStore is superclass of {@link BsArrayStore}, and {@link BsStore}.
 * It's never used directly, but offers a set of
 * methods used by those subclasses.
 *
 * @author Ahmad Fajar
 * @since  15/03/2019 modified: 24/06/2023 14:04
 */
export default class AbstractStore implements IAbstractStore {
    protected readonly _appendErrMsg = 'Can not assign primitive type to the dataset.';
    protected readonly _proxyErrMsg = 'Unable to send request to remote server if REST proxy is not defined.';
    protected readonly _emptyDataErrMsg = 'Server returns empty data.';
    protected readonly _parsingDataErrMsg = 'Unable to parse data coming from server.';
    protected _config: TDataStoreConfig;
    protected _filters: TFilterOption[];
    protected _filteredItems: IBsModel[];
    protected _items: IBsModel[];
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
     *
     * @returns {void}
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

    find(property: string, value: unknown, startIndex?: number): IBsModel | undefined;

    findBy(predicate: (value: IBsModel, index: number) => boolean): IBsModel | undefined;

    findIndex(property: string, value: unknown, startIndex?: number): number;

    localFilter(): IBsModel[];

    localSort(): IBsModel[];

    isEmpty(): boolean;

    page(value: number): this;

    previousPage(): this;

    nextPage(): this;

    isCandidateForModel(item: object): boolean;

    remove(items: IBsModel[] | IBsModel): void;

    removeAt(index: number, count?: number): void;

    setPageSize(value: number): this;

    setSorters(sortOptions: TSortOption[] | TSortOption): this;

    createFilters(values: TFilterOption | TFilterOption[]): TFilterOption[];

    createSorters(values: string | string[] | TSortOption | TSortOption[], direction?: TSortDirection, replace?: boolean): TSortOption[];

    createModel(item: TRecord): IBsModel;

    queryParams(): TQueryParameter;

    load(data?: never[]): Promise<IBsModel[] | AxiosResponse>;

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
