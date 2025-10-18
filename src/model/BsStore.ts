import { AbstractStore, RestProxyAdapter } from '@/model';
import {
  appendErrMsg,
  emptyDataErrMsg,
  parsingDataErrMsg,
  proxyErrMsg,
} from '@/model/AbstractStore.ts';
import type {
  IBsModel,
  IBsStore,
  TDataStoreConfig,
  TMessageResponse,
  TSortDirection,
  TSortOption,
} from '@/model/types';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { meanBy, sumBy } from 'lodash-es';

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
 * @since  20/07/2018 modified: 19/10/2025 05:01
 */
// @ts-expect-error: export class BsStore
export class BsStore extends AbstractStore implements IBsStore {
  /**
   * Construct {@link BsStore} object instance.
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
  constructor(config: TDataStoreConfig, adapter?: AxiosInstance | null) {
    const initialCfg: TDataStoreConfig = {
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

  get dataItems(): IBsModel[] {
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

      return result;
    }

    if (!this.remotePaging) {
      const result = this._items.slice(
        offset,
        this.pageSize > 0 ? offset + this.pageSize : undefined
      );
      this._state.length = result.length;

      return result;
    }

    return this._items;
  }

  get remoteFilter(): boolean {
    return this._config.remoteFilter as boolean;
  }

  set remoteFilter(value: boolean) {
    this._config.remoteFilter = value;
  }

  get remotePaging(): boolean {
    return this._config.remotePaging as boolean;
  }

  set remotePaging(value: boolean) {
    this._config.remotePaging = value;
  }

  get remoteSort(): boolean {
    return this._config.remoteSort as boolean;
  }

  set remoteSort(value: boolean) {
    this._config.remoteSort = value;
  }

  aggregateAvg(field: string): number {
    return meanBy(this.remotePaging ? this.dataItems : this._items, field);
  }

  aggregateCountBy(field: string, value: unknown): number {
    let results: IBsModel[];

    if (this.remotePaging) {
      results = this.dataItems.filter((item) => {
        return value === Helper.getObjectValueByPath(item, field);
      });
    } else {
      results = this._items.filter((item) => {
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
      this._items.push(this.createModel(item).seal());
      _finalizeAppend();
    } else {
      console.error(appendErrMsg);
    }
  }

  assignData(data: unknown, silent = false): void {
    this._assignData(data, silent);

    if (!this.remoteSort && this.sorters.length > 0) {
      this._items = this.localSort();
    }
    this._onLoadingSuccess();
  }

  delete(item: IBsModel): Promise<AxiosResponse | TMessageResponse> {
    this._state.deleting = true;

    if (AbstractStore.isModel(item) && !Helper.isEmpty(item.restUrl?.delete)) {
      return new Promise((resolve, reject) => {
        item
          .delete()
          .then((response) => {
            this.remove(item);
            this._state.deleting = false;
            this._state.hasError = false;
            resolve(response);
            this._fireEvent('loaded', this.dataItems);
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
          resolve({
            success: true,
            message: 'Item has been removed from local store.',
          });
          this._fireEvent('loaded', this.dataItems);
        } catch (e) {
          this._state.deleting = false;
          this._state.hasError = true;
          reject(e as Error);
        }
      });
    }
  }

  deletes(items: IBsModel[]): Promise<TMessageResponse> {
    this._state.deleting = true;
    this._state.hasError = false;

    if (Helper.isArray(items) && items.length > 0) {
      return new Promise((resolve, reject) => {
        try {
          for (const item of items) {
            if (AbstractStore.isModel(item) && !Helper.isEmpty(item.restUrl?.delete)) {
              item
                .delete()
                .then(() => this.remove(item))
                .catch((error) => {
                  throw error;
                });
            } else {
              this.remove(item);
            }
          }

          this._fireEvent('loaded', this.dataItems);

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
      throw Error(proxyErrMsg);
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

  load(data?: unknown): Promise<IBsModel[] | AxiosResponse> {
    if (data && !Helper.isEmpty(data)) {
      this._state.loading = true;

      return new Promise((resolve) => {
        this.assignData(data, false);
        this._items = this.localSort();
        resolve(this._items);
      });
    } else {
      if (!this.proxy || !this.restUrl) {
        throw Error(proxyErrMsg);
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

  query(): Promise<IBsModel[] | AxiosResponse> {
    return this.load();
  }

  sort(
    options: string | string[] | TSortOption | TSortOption[],
    direction: TSortDirection = 'asc'
  ): Promise<IBsModel[]> {
    return new Promise((resolve, reject) => {
      this.createSorters(options, direction, true);

      if (!this.remoteSort) {
        this._items = this.localSort();
        resolve(this._items);
      } else {
        this.load()
          .then(() => resolve(this._items))
          .catch((error: AxiosError) => reject(error));
        // try {
        //   await this.load();
        //   resolve(this._items);
        // } catch (e) {
        //   reject(e as AxiosError);
        // }
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
      console.warn(emptyDataErrMsg);
    } else {
      if (Object.hasOwn(responseData, this._config.dataProperty as PropertyKey)) {
        this.assignData(responseData[this._config.dataProperty as never]);

        if (this._config.totalProperty && responseData[this._config.totalProperty as never]) {
          this._state.totalCount = responseData[
            this._config.totalProperty as never
          ] as unknown as number;
        }
      } else {
        console.warn(parsingDataErrMsg);
      }
    }
  }
}
