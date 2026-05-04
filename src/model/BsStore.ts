import { AbstractStore, type DataStoreConfig } from '@/model/AbstractStore.ts';
import type { PlainModel, TBsModel } from '@/model/BsModel.ts';
import { appendError, emptyDataMessage, parsingDataError, proxyError } from '@/model/Constants.ts';
import { RestProxyAdapter } from '@/model/RestProxyAdapter.ts';
import type { SortDirection, SortOption } from '@/model/types';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import meanBy from 'lodash-es/meanBy';
import sumBy from 'lodash-es/sumBy';

export declare type MessageResponse = {
  success: boolean;
  message: string;
};

export declare interface IBsStore<T extends TRecord = TRecord> extends AbstractStore<T> {
  /**
   * Returns dataset from the active page.
   *
   * If a filter or sorter has been applied before,
   * then the returned dataset will also be affected by it.
   */
  readonly dataItems: TBsModel<T>[];

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
   * @param field The field name of the dataset to calculate.
   */
  aggregateAvg(field: string): number;

  /**
   * Count number of items in the internal dataset specified by the given criteria.
   *
   * @param field The grouping field name criteria.
   * @param value The grouping value criteria.
   */
  aggregateCountBy(field: string, value: unknown): number;

  /**
   * Calculate the SUM or total value based on the given field.
   *
   * @param field The field name to be used when calculating value.
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
   * and nothing is sent to the remote service.
   *
   * @param data   The new data to be assigned.
   * @param silent Append the data silently and don't trigger data transformer.
   */
  assignData(data: unknown, silent?: boolean): void;

  /**
   * Delete specific item from internal dataset as well as from remote service whenever possible.
   * The item can be deleted from the remote service, if 'restUrl' property contains a 'delete' key.
   *
   * @param item Data Model instance to be removed
   */
  delete<P extends TBsModel<T>>(item: P): Promise<AxiosResponse | MessageResponse>;

  /**
   * Delete specific items from internal dataset as well as from remote
   * service whenever possible. The items can be deleted from the remote
   * service, if 'restUrl' property contains a 'delete' key.
   *
   * @param items Collection of data Model instances to be removed
   */
  deletes<P extends TBsModel<T>>(items: P[]): Promise<MessageResponse>;

  /**
   * Fetch single item from the remote service via REST API and
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
  load(data?: unknown): Promise<TBsModel<T>[] | AxiosResponse>;

  /**
   * Load data from the remote server and assign query parameters and configuration.
   *
   * @deprecated
   * Use `load` instead.
   */
  query(): Promise<TBsModel<T>[] | AxiosResponse>;

  /**
   * Sorts the internal dataset with the given criteria and returns the reference
   * of the internal dataset. This method depends on `remoteSort` property.
   *
   * @example
   * // sort by a single field
   * const results = await myStore.sort('myField', 'asc');
   *
   * // sorting by multiple fields
   * const results = await myStore.sort([
   *  {property: 'age', direction: 'desc'},
   *  {property: 'name', direction: 'asc'}
   * ]);
   *
   * @param options   The field name to sort or sort method criteria.
   * @param direction The sort direction.
   */
  sort(
    options: string | string[] | SortOption | SortOption[],
    direction?: SortDirection
  ): Promise<TBsModel<T>[]>;
}

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
 *         update: {url: './api/users', method: 'patch'}
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
 * @since  20/07/2018 modified: 30/04/2026 17:17
 */
export class BsStore<T extends TRecord = TRecord> extends AbstractStore<T> implements IBsStore<T> {
  /**
   * Construct new {@link BsStore} object instance.
   *
   * @param config  The configuration properties
   * @param adapter Axios adapter instance
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
   *         update: {url: './api/users', method: 'patch'}
   *     },
   *     csrfConfig: {
   *         url: '/api/token/{name}',
   *         tokenName: 'token_name',
   *         dataField: 'value',
   *         suffix: false,
   *     },
   * });
   */
  constructor(config: DataStoreConfig, adapter?: AxiosInstance | null) {
    const initialCfg: DataStoreConfig = {
      idProperty: 'id',
      dataProperty: 'data',
      totalProperty: 'total',
      filterLogic: 'AND',
      restProxy: {
        browse: '',
        delete: '',
        fetch: '',
        save: '',
        update: '',
      },
      ...config,
    };

    super(initialCfg);
    this._proxy = new RestProxyAdapter(adapter);

    if (this.restUrl?.browse !== '') {
      this._config.remoteFilter = this._config.remoteFilter ?? true;
      this._config.remotePaging = this._config.remotePaging ?? true;
      this._config.remoteSort = this._config.remoteSort ?? true;
    } else {
      this._config.remoteFilter = this._config.remoteFilter ?? false;
      this._config.remotePaging = this._config.remotePaging ?? false;
      this._config.remoteSort = this._config.remoteSort ?? false;
    }
  }

  get dataItems(): TBsModel<T>[] {
    const page =
      this.currentPage > 0 && this.currentPage <= this.totalPages ? this.currentPage - 1 : 0;
    const offset = this.pageSize > 0 ? page * this.pageSize : 0;

    if (!this.remoteFilter && this.filters.length > 0) {
      if (this._filteredItems.length === 0) {
        this._filteredItems = this.localFilter();
      }
      const result = this._filteredItems.slice(
        offset,
        this.pageSize > 0 ? offset + this.pageSize : undefined
      );
      this._state.length = result.length;

      return result as TBsModel<T>[];
    }

    if (!this.remotePaging) {
      const result = this._items.slice(
        offset,
        this.pageSize > 0 ? offset + this.pageSize : undefined
      );
      this._state.length = result.length;

      return result as TBsModel<T>[];
    }

    return this._items as TBsModel<T>[];
  }

  get remoteFilter(): boolean {
    return this._config.remoteFilter ?? false;
  }

  set remoteFilter(value: boolean) {
    this._config.remoteFilter = value;
  }

  get remotePaging(): boolean {
    return this._config.remotePaging ?? false;
  }

  set remotePaging(value: boolean) {
    this._config.remotePaging = value;
  }

  get remoteSort(): boolean {
    return this._config.remoteSort ?? false;
  }

  set remoteSort(value: boolean) {
    this._config.remoteSort = value;
  }

  aggregateAvg(field: string): number {
    return meanBy(this.remotePaging ? this.dataItems : this._items, field);
  }

  aggregateCountBy(field: string, value: unknown): number {
    let results: TBsModel<T>[];

    if (this.remotePaging) {
      results = this.dataItems.filter((item) => {
        return value === Helper.getObjectValueByPath(item, field);
      });
    } else {
      results = (this._items as TBsModel<T>[]).filter((item) => {
        return value === Helper.getObjectValueByPath(item, field);
      });
    }

    return results.length;
  }

  aggregateSum(field: string): number {
    return sumBy(this.remotePaging ? this.dataItems : this._items, field);
  }

  append(item: TRecord): void {
    if (Helper.isEmptyObject(item)) {
      return;
    }

    const _finalizeAppend = () => {
      this._state.totalCount++;
      this._state.length = this._items.length;

      if (this._state.totalCount < this._state.length) {
        this._state.totalCount = this._items.length;
      }

      this._state.updating = false;
    };

    this._state.hasError = false;

    if (this.isCandidateForModel(item)) {
      // Got correct entity object.
      // Persist the given item to the remote service before
      // store it on the internal dataset.
      this._state.updating = true;
      const model = this.createModel(item);

      model
        .save()
        .catch((error: AxiosError) => {
          this._state.hasError = true;
          RestProxyAdapter.warnResponseError(error);
        })
        .finally(() => {
          this._items.push(model);
          _finalizeAppend();
        });
    } else if (Helper.isObject(item)) {
      // Got incorrect entity object, just store as is on the internal dataset.
      this._state.updating = true;
      this._items.push(this.createModel(item as PlainModel<T>).seal() as TBsModel<T>);
      _finalizeAppend();
    } else {
      console.error(appendError);
    }
  }

  assignData(data: unknown, silent = false): void {
    this._assignData(data, silent);

    if (!this.remoteSort && this.sorters.length > 0) {
      this._items = this.localSort();
    }
    this._onLoadingSuccess();
  }

  delete<P extends TBsModel<T>>(item: P): Promise<AxiosResponse | MessageResponse> {
    this._state.deleting = true;

    if (AbstractStore.isModel(item) && !Helper.isEmpty(item.restUrl?.delete)) {
      // Got correct entity object.
      // Remove the given item from the remote service before
      // removing it from the internal dataset.
      return new Promise((resolve, reject) => {
        item
          .delete()
          .then((response) => {
            this.remove(item);
            this._state.deleting = false;
            this._state.hasError = false;
            resolve(response);
            this._fireEvent('deleted', item);
          })
          .catch((error: AxiosError) => {
            this._state.deleting = false;
            this._state.hasError = true;
            reject(error);
            this._fireEvent('error', error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          this.remove(item);
          this._state.deleting = false;
          this._state.hasError = false;
          this._fireEvent('deleted', item);

          resolve({
            success: true,
            message: 'Item has been removed from local store.',
          });
        } catch (error) {
          this._state.deleting = false;
          this._state.hasError = true;
          reject(error as AxiosError);
        }
      });
    }
  }

  deletes<P extends TBsModel<T>>(items: P[]): Promise<MessageResponse> {
    this._state.deleting = true;
    this._state.hasError = false;

    if (Helper.isArray(items) && items.length > 0) {
      return new Promise((resolve, reject) => {
        try {
          for (const item of items) {
            if (AbstractStore.isModel(item) && !Helper.isEmpty(item.restUrl?.delete)) {
              // Got correct DataModel instance, deal with remote server
              item
                .delete()
                .then(() => this.remove(item))
                .catch((error) => {
                  throw error;
                });
            } else {
              // Got PlainModel, just remove it from internal dataset
              this.remove(item);
            }
          }

          this._fireEvent('deleted', items);
          resolve({
            success: true,
            message: 'Items have been successfully removed.',
          });
        } catch (error) {
          this._fireEvent('error', error as AxiosError);
          this._state.hasError = true;

          reject(error as AxiosError);
        }

        this._state.deleting = false;
      });
    } else {
      this._state.deleting = false;
      throw Error('Parameter "items" must be an array of BsModel instances.');
    }
  }

  fetch(id: string | number): Promise<AxiosResponse> {
    if (!this.proxy || !this.restUrl) {
      throw Error(proxyError);
    }

    RestProxyAdapter.checkRestUrl(this.restUrl);

    const config: AxiosRequestConfig = {};
    const methods = this.proxy.requestMethods();
    const identifier = this._config.idProperty as string;
    let url = this.restUrl.fetch ?? '';

    if (url.includes('{id}') && !Helper.isEmpty(id)) {
      url = url.replace('{id}', id.toString());
    } else if (!Helper.isEmpty(identifier) && !Helper.isEmpty(id)) {
      const params: TRecord = {};
      params[identifier] = id;
      config.params = params;
    }

    config.url = url;
    config.method = methods.fetch;

    return this.proxy.request(
      config,
      this['_checkBeforeLoading'],
      this['_assignFromResponse'],
      this['_onLoadingFailure']
    );
  }

  load(data?: unknown): Promise<TBsModel<T>[] | AxiosResponse> {
    if (data && !Helper.isEmpty(data)) {
      this._state.loading = true;

      return new Promise((resolve) => {
        this.assignData(data, false);
        this._items = this.localSort();
        resolve(this._items as TBsModel<T>[]);
      });
    } else {
      if (!this.proxy || !this.restUrl) {
        throw Error(proxyError);
      }

      RestProxyAdapter.checkRestUrl(this.restUrl);

      const methods = this.proxy.requestMethods();
      const config: AxiosRequestConfig = {
        url: this.restUrl.browse ?? '',
        method: methods.browse,
      };

      const params = this.queryParams();
      if (!Helper.isEmpty(params)) {
        config.params = params;
      }

      return this.proxy.request(
        config,
        this['_checkBeforeLoading'],
        this['_assignFromResponse'],
        this['_onLoadingFailure']
      );
    }
  }

  query(): Promise<TBsModel<T>[] | AxiosResponse> {
    return this.load();
  }

  sort(
    options: string | string[] | SortOption | SortOption[],
    direction: SortDirection = 'asc'
  ): Promise<TBsModel<T>[]> {
    return new Promise((resolve, reject) => {
      this.createSorters(options, direction, true);

      if (!this.remoteSort) {
        this._items = this.localSort();
        resolve(this._items as TBsModel<T>[]);
      } else {
        this.load()
          .then(() => resolve(this._items as TBsModel<T>[]))
          .catch((error: AxiosError) => reject(error));
      }
    });
  }

  /**
   * Assign values from REST response's object.
   *
   * @param response Response object
   */
  private _assignFromResponse(response: AxiosResponse) {
    const responseData = response.data as TRecord[];

    if (Helper.isEmpty(responseData)) {
      console.warn(emptyDataMessage);
    } else {
      if (Object.hasOwn(responseData, this._config.dataProperty as PropertyKey)) {
        this.assignData(responseData[this._config.dataProperty as never]);

        if (this._config.totalProperty && responseData[this._config.totalProperty as never]) {
          this._state.totalCount = responseData[
            this._config.totalProperty as never
          ] as unknown as number;
        }
      } else {
        console.warn(parsingDataError);
      }
    }
  }
}
