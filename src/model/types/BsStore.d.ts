import { AxiosInstance, AxiosResponse } from 'axios';
import { TRecord } from '../../types';
import {
    AbstractStore,
    BsModel,
    IBsModel,
    TDataStoreConfig,
    TSortDirection,
    TSortOption,
} from '../types';

export declare type TMessageResponse = {
    success: boolean;
    message: string;
};

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
 */
export declare class BsStore extends AbstractStore {
    /**
     * Construct {@link BsStore} object instance.
     *
     * @param config  The configuration properties
     * @param adapter Axios adapter instance
     */
    constructor(config: TDataStoreConfig, adapter?: AxiosInstance | null);

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
    append(item: TRecord): void;

    /**
     * Replace internal dataset with new data. The proses only affected the internal dataset
     * and nothing is sent to the remote server.
     *
     * @param data   The new data to be assigned
     * @param silent Append the data silently and don't trigger data conversion
     */
    assignData(data: unknown, silent?: boolean): void;

    /**
     * Delete specific item from internal dataset as well as from remote server whenever possible.
     * The item can be deleted from the remote server, if 'restUrl' property contains a 'delete' key.
     *
     * @param item Data Model instance to be removed
     */
    delete<T extends BsModel>(item: T): Promise<AxiosResponse | TMessageResponse>;

    /**
     * Delete specific items from internal dataset as well as from remote
     * server whenever possible. The items can be deleted from the remote
     * server, if 'restUrl' property contains a 'delete' key.
     *
     * @param items Collection of data Model instances to be removed
     */
    deletes<T extends BsModel>(items: T[]): Promise<TMessageResponse>;

    /**
     * Fetch single item from the remote server via REST API and
     * replace internal dataset with the one comes from the remote service.
     *
     * @param id The item ID to fetch
     */
    fetch(id: string | number): Promise<AxiosResponse>;

    /**
     * Load data from the remote server or assign new data directly.
     * The internal dataset will be replaced by the loaded data.
     *
     * @param data The new data to replace the internal dataset
     */
    load(data?: unknown): Promise<IBsModel[] | AxiosResponse>;

    /**
     * Load data from the remote server and assign query parameters and configuration.
     *
     * @deprecated
     * Use `load` instead.
     */
    query(): Promise<IBsModel[] | AxiosResponse>;

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
        direction?: TSortDirection
    ): Promise<IBsModel[]>;
}

export declare interface IBsStore extends BsStore {}
