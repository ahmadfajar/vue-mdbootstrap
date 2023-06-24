import type { AxiosInstance, AxiosResponse } from 'axios';
import type { IBsModel, IBsStore, TRecord, TSortDirection, TSortOption, TSuccessResponse } from '../../types';
import AbstractStore from './AbstractStore';

/**
 * Data Store class to work with collection of entity objects and remote API.
 *
 * @example
 * const dsStore = new BsStore({
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
 * @since  20/07/2018 modified: 24/06/2023 14:36
 */
export default class BsStore extends AbstractStore implements IBsStore {
    /**
     * Class constructor.
     *
     * @param config  The configuration properties
     * @param adapter Axios adapter instance
     */
    constructor(config: TRecord, adapter?: AxiosInstance);
    get dataItems(): IBsModel[];
    get remoteFilter(): boolean;
    set remoteFilter(value: boolean);
    get remotePaging(): boolean;
    set remotePaging(value: boolean);
    get remoteSort(): boolean;
    set remoteSort(value: boolean);
    aggregateAvg(field: string): number;
    aggregateCountBy(field: string, value: unknown): number;
    aggregateSum(field: string): number;
    append(item: never): void;
    assignData(data: unknown[] | unknown, silent?: boolean): void;
    delete(item: IBsModel): Promise<AxiosResponse | TSuccessResponse>;
    deletes(items: IBsModel[]): Promise<TSuccessResponse>;
    fetch(id: string | number): Promise<AxiosResponse>;
    load(data?: never[] | never): Promise<IBsModel[] | AxiosResponse>;
    query(): Promise<unknown>;
    sort(options: string | string[] | TSortOption | TSortOption[], direction?: TSortDirection): Promise<IBsModel[]>;
    /**
     * Assign values from REST response's object.
     *
     * @param response Response object
     */
    private _assignFromResponse;
}
