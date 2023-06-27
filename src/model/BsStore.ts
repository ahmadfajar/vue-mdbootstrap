import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { meanBy, sumBy } from 'lodash';
import { AbstractStore, RestProxyAdapter } from '../model';
import type { IBsModel, IBsStore, TRecord, TSortDirection, TSortOption, TSuccessResponse } from '../types';
import Helper from '../utils/Helper';

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
 * @since  20/07/2018 modified: 27/06/2023 00:06
 */
export default class BsStore extends AbstractStore implements IBsStore {
    /**
     * Class constructor.
     *
     * @param config  The configuration properties
     * @param adapter Axios adapter instance
     */
    constructor(config: TRecord, adapter?: AxiosInstance) {
        const initialCfg = {
            idProperty: 'id',
            dataProperty: 'data',
            totalProperty: 'total',
            filterLogic: 'AND',
            restProxy: {
                'browse': '',
                'delete': '',
                'fetch': '',
                'save': '',
                'update': ''
            },
            ...config
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
        const page = (this.currentPage > 0 && this.currentPage <= this.totalPages) ? this.currentPage - 1 : 0;
        const offset = this.pageSize > 0 ? (page * this.pageSize) : 0;

        if (!this.remoteFilter && this.filters.length > 0) {
            if (this._filteredItems.length === 0) {
                this._filteredItems = this.localFilter();
            }
            const result = this._filteredItems.slice(
                offset,
                this.pageSize > 0 ? (offset + this.pageSize) : undefined
            );
            this._state.length = result.length;

            return result;
        }

        if (!this.remotePaging) {
            const result = this._items.slice(
                offset,
                this.pageSize > 0 ? (offset + this.pageSize) : undefined
            );
            this._state.length = result.length;

            return result;
        }

        return this._items;
    }

    get remoteFilter(): boolean {
        return <boolean>this._config.remoteFilter;
    }

    set remoteFilter(value: boolean) {
        this._config.remoteFilter = value;
    }

    get remotePaging(): boolean {
        return <boolean>this._config.remotePaging;
    }

    set remotePaging(value: boolean) {
        this._config.remotePaging = value;
    }

    get remoteSort(): boolean {
        return <boolean>this._config.remoteSort;
    }

    set remoteSort(value: boolean) {
        this._config.remoteSort = value;
    }

    aggregateAvg(field: string): number {
        return meanBy((this.remotePaging ? this.dataItems : this._items), field);
    }

    aggregateCountBy(field: string, value: unknown): number {
        let results: IBsModel[];

        if (this.remotePaging) {
            results = this.dataItems.filter(item => {
                return value === Helper.getObjectValueByPath(item, field);
            });
        } else {
            results = this._items.filter(item => {
                return value === Helper.getObjectValueByPath(item, field);
            });
        }

        return results.length;
    }

    aggregateSum(field: string): number {
        return sumBy((this.remotePaging ? this.dataItems : this._items), field);
    }

    append(item: never): void {
        if (Helper.isEmpty(item)) {
            return;
        }

        const _finalizeAppend = () => {
            this._state.totalCount++;
            this._state.length = this._items.length;

            if (this._state.totalCount < this._state.length) {
                this._state.totalCount = this._items.length;
            }

            this._state.updating = false;
        }
        this._state.hasError = false;

        if (this.isCandidateForModel(item)) {
            // Got correct entity object.
            // Persist the given item to the remote service before
            // store it on the internal dataset.
            this._state.updating = true;
            const model = this.createModel(item);

            model.save()
                .catch(error => {
                    this._state.hasError = true;
                    RestProxyAdapter.warnResponseError(error);
                })
                .finally(() => {
                    this._items.push(model);
                    _finalizeAppend();
                });
        } else if (Helper.isObject(item)) {
            // Got incorrect entity object, just store it on the internal dataset.
            this._state.updating = true;
            this._items.push(this.createModel(item).seal());
            _finalizeAppend();
        } else {
            console.error(this._appendErrMsg);
        }
    }

    assignData(data: unknown[] | unknown, silent = false): void {
        this._assignData(data, silent);

        if (!this.remoteSort && this.sorters.length > 0) {
            this._items = this.localSort();
        }
        this._onLoadingSuccess();
    }

    delete(item: IBsModel): Promise<AxiosResponse | TSuccessResponse> {
        this._state.deleting = true;

        if (
            AbstractStore.isModel(item) &&
            !Helper.isEmpty(item.restUrl?.delete)
        ) {
            return new Promise((resolve, reject) => {
                item.delete()
                    .then((response) => {
                        this.remove(item);
                        this._state.deleting = false;
                        this._state.hasError = false;
                        resolve(response);
                    })
                    .catch((error) => {
                        this._state.deleting = false;
                        this._state.hasError = true;
                        reject(error);
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
                        message: 'Item has been removed from local store.'
                    });
                } catch (e) {
                    this._state.deleting = false;
                    this._state.hasError = true;
                    reject(e);
                }
            });
        }
    }

    deletes(items: IBsModel[]): Promise<TSuccessResponse> {
        this._state.deleting = true;
        this._state.hasError = false;

        if (Helper.isArray(items) && items.length > 0) {
            return new Promise((resolve, reject) => {
                try {
                    for (const item of <IBsModel[]>items) {
                        if (
                            AbstractStore.isModel(item) &&
                            !Helper.isEmpty(item.restUrl?.delete)
                        ) {
                            item.delete()
                                .then(() => this.remove(item))
                                .catch((error) => {
                                    throw error;
                                });
                        } else {
                            this.remove(item);
                        }
                    }

                    resolve({
                        success: true,
                        message: 'Items have been successfully removed.'
                    });
                } catch (e) {
                    this._state.hasError = true;
                    reject(e);
                }

                this._state.deleting = false;
            });
        } else {
            throw Error('Parameter "items" must be an array of BsModel instances.');
        }
    }

    fetch(id: string | number): Promise<AxiosResponse> {
        if (!this.proxy || !this.restUrl) {
            throw Error(this._proxyErrMsg);
        }

        RestProxyAdapter.checkRestUrl(this.restUrl);

        const config: AxiosRequestConfig = {};
        const methods = this.proxy.requestMethods();
        const identifier = <string>this._config.idProperty;
        let url = this.restUrl.fetch || '';

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
            this._checkBeforeLoading,
            this._assignFromResponse,
            this._onLoadingFailure
        );
    }

    load(data?: never[] | never): Promise<IBsModel[] | AxiosResponse> {
        if (data && !Helper.isEmpty(data)) {
            this._state.loading = true;
            return new Promise((resolve) => {
                this.assignData(data, false);
                this._items = this.localSort();
                resolve(this._items);
            });
        } else {
            if (!this.proxy || !this.restUrl) {
                throw Error(this._proxyErrMsg);
            }

            RestProxyAdapter.checkRestUrl(this.restUrl);

            const methods = this.proxy.requestMethods();
            const config: AxiosRequestConfig = {
                url: this.restUrl.browse || '',
                method: methods.browse
            };

            const params = this.queryParams();
            if (!Helper.isEmpty(params)) {
                config.params = params;
            }

            return this.proxy.request(
                config,
                this._checkBeforeLoading,
                this._assignFromResponse,
                this._onLoadingFailure,
            );
        }
    }

    query(): Promise<unknown> {
        return this.load();
    }

    async sort(
        options: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection = 'asc',
    ): Promise<IBsModel[]> {
        this.createSorters(options, direction, true);

        if (!this.remoteSort) {
            this._items = this.localSort();
            return this._items;
        } else {
            await this.load();
            return this._items;
        }
    }

    /**
     * Assign values from REST response's object.
     *
     * @param response Response object
     */
    private _assignFromResponse(response: AxiosResponse) {
        const responseData = <never>response.data;

        if (Helper.isEmpty(responseData)) {
            console.warn(this._emptyDataErrMsg);
        } else {
            if (Object.hasOwn(responseData, <string>this._config.dataProperty)) {
                this.assignData(responseData[<string>this._config.dataProperty]);

                if (this._config.totalProperty && responseData[this._config.totalProperty]) {
                    this._state.totalCount = responseData[this._config.totalProperty];
                }
            } else {
                console.warn(this._parsingDataErrMsg);
            }
        }
    }
}
