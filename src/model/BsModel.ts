import type {AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {reactive} from "vue";
import type {
    IBsModel,
    IRestAdapter,
    TCSRFConfig,
    THttpMethod,
    TModelOptions,
    TModelState,
    TRecord,
    TRestConfig,
    TRestMethodOptions,
    TUrlOption
} from "../types";
import Helper from "../utils/Helper";
import RestProxyAdapter from "./RestProxyAdapter";

/**
 * Data Model for working with data and remote API.
 *
 * @example
 * let model1 = new BsModel({
 *     uid: null,
 *     username: null,
 *     displayName: null,
 *     email: null,
 *     phoneNumber: null,
 *     enabled: true,
 *     password: null
 * }, adapter);
 *
 * let model2 = new BsModel({
 *     schema: {
 *         uid: null,
 *         username: null,
 *         displayName: null,
 *         email: null,
 *         phoneNumber: null,
 *         enabled: true,
 *         password: null
 *     },
 *     proxy: {
 *         save: {url: './api/users', method: 'post'},
 *         update: {url: './api/users', method: 'put'},
 *         delete: {url: './api/users', method: 'delete'},
 *         fetch: './api/users/{id}',
 *     },
 *     csrfConfig: {
 *         url: '/api/token/{name}',
 *         tokenName: 'token_name',
 *         dataField: 'value',
 *         suffix: false,
 *     },
 * }, adapter);
 *
 * @author Ahmad Fajar
 * @since  09/07/2018 modified: 12/03/2023 00:41
 */
export default class BsModel implements IBsModel {
    /**
     * Action triggered after data was fetched from the remote server.
     *
     * @method onAfterFetch
     * @param {AxiosResponse} data The response data
     * @returns {void}
     */

    private readonly _idProperty: string;
    private readonly _dataProperty: string;
    private readonly _csrfConfig: Readonly<TCSRFConfig> | undefined;
    private readonly _restUrl: TRestConfig;
    private _data: TRecord;
    private _schema: TRecord;
    private _proxy: IRestAdapter;
    private _state: TModelState;

    /**
     * Class constructor.
     *
     * @param {TRecord|TModelOptions} schema  The data model schema
     * @param {AxiosInstance} adapter         Axios adapter instance
     * @param {string} [idProperty]           Data model ID field name
     * @param {string} [dataProperty]         REST response data property
     */
    constructor(
        schema: TRecord | TModelOptions,
        adapter: AxiosInstance,
        idProperty = 'id',
        dataProperty = 'data',
    ) {
        this._restUrl = {} as TRestConfig;

        if (!Helper.isEmptyObject(schema.schema) && !Helper.isEmptyObject(schema.proxy)) {
            const _methods = {} as TRecord;

            for (const [key, value] of Object.entries((<TModelOptions>schema).proxy)) {
                if (Helper.isObject(value)) {
                    _methods[key] = (<TUrlOption>value).method;
                }
                // @ts-ignore
                this._restUrl[key] = Helper.isObject(value) ? value.url : value;
            }

            this._proxy = new RestProxyAdapter(adapter, _methods);
            this._schema = Object.seal(<TRecord>schema.schema);

            if (!Helper.isEmptyObject(schema.csrfConfig)) {
                this._csrfConfig = Object.freeze(schema.csrfConfig) as Readonly<TCSRFConfig>;
            }
        } else {
            this._proxy = new RestProxyAdapter(adapter);
            this._schema = Object.seal(<TRecord>schema);
        }

        this._idProperty = idProperty;
        this._dataProperty = dataProperty;

        // Add reactivity to the data.
        this._state = reactive<TModelState>({
            loading: false,
            updating: false,
            deleting: false,
            hasError: false,
        });

        const _dt: TRecord = {};
        this.getFields().forEach(f => {
            _dt[f] = this._schema[f];
        });
        if (!(idProperty in this._schema)) {
            _dt[idProperty] = null;
        }
        this._data = reactive(_dt);

        // Initialize magic getters and setters.
        this._initProps();
    }

    private _initProps() {
        this.getFields().forEach(f => {
            Object.defineProperty(this, f, {
                get(): never {
                    return this._data[f] as never;
                },
                set(v: never): void {
                    this._data[f] = v;
                }
            })
        });
    }

    get $_class(): string {
        return (Object.getPrototypeOf(this)).constructor.name;
    }

    get csrfConfig(): TCSRFConfig | undefined {
        return this._csrfConfig;
    }

    get proxy(): IRestAdapter {
        return this._proxy;
    }

    get restUrl(): TRestConfig {
        return this._restUrl;
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

    destroy(): void {
        // @ts-ignore
        delete this._data;
        // @ts-ignore
        delete this._schema;
        // @ts-ignore
        this._proxy = undefined;
    }

    assignValue(field: string, newValue: unknown): void {
        if (field in this._data) {
            this._data[field] = newValue;
        } else {
            console.error(`The given field does not exists in this ${this.$_class}.`);
        }
    }

    assignValues(sources: TRecord): void {
        if (Helper.isObject(sources)) {
            this.getFields().forEach(f => {
                Object.keys(sources).forEach(k => {
                    if (f === k) {
                        this._data[f] = sources[k];
                    }
                })
            })
        } else {
            console.error(`The given values can not be assigned to ${this.$_class}.`);
        }
    }

    delete(): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        let config: AxiosRequestConfig = {};
        const url = this.restUrl.delete || '';
        const methods = this.proxy.requestMethods();
        const identifier = this.get(this.getIdProperty());

        if (methods.delete.toLowerCase() === 'delete') {
            config = {
                url: url.replace('{id}', <never>identifier),
                method: methods.delete,
                data: this.toJSON()
            };
        } else {
            this._updateRequestConfig(config, <never>identifier, url, 'delete');
        }

        return this._requestWithToken(
            config,
            this._checkBeforeDelete,
            this._onDeleteSuccess,
            this._onDeleteFailure,
            '-delete'
        );
    }

    fetch(id?: string | number): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        const config: AxiosRequestConfig = {};
        const url = this.restUrl.fetch || '';
        const identifier = id || this.get(this.getIdProperty());

        this._updateRequestConfig(config, <never>identifier, url, 'fetch');

        return this.proxy.request(
            config,
            this._checkBeforeLoading,
            this._onLoadingSuccess,
            this._onLoadingFailure,
        );
    }

    freeze(): Readonly<IBsModel> {
        return Object.freeze(this);
    }

    get(name: string): unknown | never {
        return this._data[name];
    }

    set(name: string, value: unknown): void {
        if (!Object.isFrozen(this)) {
            // if not exists and not sealed
            if (!(name in this._data) && !Object.isSealed(this)) {
                this._data[name] = value;

                Object.defineProperty(this, name, {
                    get(): never {
                        return this._data[name] as never;
                    },
                    set(v: never): void {
                        this._data[name] = v;
                    }
                });
            } else if (name in this._data) {
                // if already exists
                this._data[name] = value;
            }
        } else {
            throw Error(`This ${this.$_class} is frozen to prevent any modification.`)
        }
    }

    getFields(): string[] {
        return Object.keys(this._schema);
    }

    getIdProperty(): string {
        return this._idProperty;
    }

    request(
        restKey: keyof TRestConfig,
        method: THttpMethod = 'GET',
        params?: TRecord,
        data?: TRecord,
        successCb?: (response: AxiosResponse) => void,
        errorCb?: (error: AxiosError) => void,
    ): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        let url = this.restUrl[restKey] || '';
        const config: AxiosRequestConfig = {};
        const parameters: TRecord = {};

        const identifier = params && Object.hasOwn(params, this.getIdProperty())
            ? params[this.getIdProperty()]
            : this.get(this.getIdProperty());

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', <never>identifier);
            if (params && Object.hasOwn(params, this.getIdProperty())) {
                delete params[this.getIdProperty()];
            }
        } else if (!Helper.isEmpty(identifier)) {
            parameters[this._idProperty] = identifier;
        }

        config['url'] = url;
        config['method'] = method.toLowerCase();

        if (!Helper.isEmptyObject(params) && !Helper.isEmptyObject(parameters)) {
            config['params'] = {...parameters, ...params};
        } else if (!Helper.isEmptyObject(params)) {
            config['params'] = params;
        }
        if (!Helper.isEmptyObject(data)) {
            config['data'] = data;
        }

        return this._requestWithToken(
            config,
            (
                ['post', 'put', 'patch'].includes(config['method'])
                    ? this._checkBeforeSave
                    : this._checkBeforeLoading
            ),
            (
                typeof successCb === "function"
                    ? successCb
                    : (
                        ['post', 'put', 'patch'].includes(config['method'])
                            ? this._onSaveSuccess
                            : this._onLoadingSuccess
                    )
            ),
            (
                typeof errorCb === "function"
                    ? errorCb
                    : (
                        ['post', 'put', 'patch'].includes(config['method'])
                            ? this._onSaveFailure
                            : this._onLoadingFailure
                    )
            )
        );
    }

    reset(): void {
        this.getFields().forEach(k => {
            this._data[k] = this._schema[k];
        });
    }

    resetState(): void {
        this._state.loading = false;
        this._state.updating = false;
        this._state.deleting = false;
        this._state.hasError = false;
    }

    save(): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        const url = this.restUrl.save || '';
        const data = this.toJSON();
        const methods = this.proxy.requestMethods();
        const identifier = data[this.getIdProperty()];

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            delete data[this.getIdProperty()];
        }

        const config: AxiosRequestConfig = {
            url: url.replace('{id}', <never>identifier),
            method: methods.save,
            data: data
        };

        return this._requestWithToken(
            config,
            this._checkBeforeSave,
            this._onSaveSuccess,
            this._onSaveFailure,
            '-create',
        );
    }

    seal(): IBsModel {
        return Object.seal(this);
    }

    toJSON(): TRecord {
        const data: TRecord = {};

        this.getFields().forEach(f => {
            data[f] = this._data[f];
        });

        return data;
    }

    update(): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        const url = this.restUrl.update || '';
        const data = this.toJSON();
        const methods = this.proxy.requestMethods();
        const identifier = data[this.getIdProperty()];

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            delete data[this.getIdProperty()];
        }

        const config: AxiosRequestConfig = {
            url: url.replace('{id}', <never>identifier),
            method: methods.update,
            data: data
        };

        return this._requestWithToken(
            config,
            this._checkBeforeSave,
            this._onSaveSuccess,
            this._onSaveFailure,
            '-update',
        );
    }

    /**
     * Assign data from the remote source to this model.
     *
     * @param {AxiosResponse} response A response object
     * @returns {void}
     */
    private _assignFromResponse(response: AxiosResponse) {
        const _data = response.data;

        if (Helper.isEmpty(_data)) {
            console.warn('Server returns empty data.');
        } else {
            if (Object.hasOwn(_data, this.getIdProperty())) {
                this.assignValues(_data);
                this.getFields().forEach(f => this._schema[f] = _data[f]);

                // @ts-ignore
                if (Helper.isFunction(this['onAfterFetch'])) {
                    // @ts-ignore
                    this['onAfterFetch'](_data);
                }
            } else if (Object.hasOwn(_data, this._dataProperty)) {
                const cdata = _data[this._dataProperty];

                if (Helper.isEmpty(cdata)) {
                    console.warn('Server returns empty data.');
                } else {
                    this.assignValues(cdata);
                    this.getFields().forEach(f => this._schema[f] = cdata[f]);

                    // @ts-ignore
                    if (Helper.isFunction(this['onAfterFetch'])) {
                        // @ts-ignore
                        this['onAfterFetch'](cdata);
                    }
                }
            } else {
                console.warn('Unable to parse data coming from server.');
            }
        }
    }

    /**
     * @returns {boolean} TRUE if this data model is not in delete state.
     */
    private _checkBeforeDelete(): boolean {
        if (this.deleting) {
            return false;
        }

        this._state.deleting = true;
        return true;
    }

    /**
     * @returns {boolean} TRUE if this data model is not in loading state.
     */
    private _checkBeforeLoading(): boolean {
        this._state.loading = true;
        return true;
    }

    /**
     * @returns {boolean} TRUE if this data model is not in the process of
     * saving its data to the remote source
     */
    private _checkBeforeSave(): boolean {
        if (this.updating) {
            return false;
        }

        this._state.updating = true;
        return true;
    }

    /**
     * A callback when delete request is failed.
     *
     * @param {Object} error The error object
     * @returns {void}
     */
    private _onDeleteFailure(error: AxiosError): void {
        this._state.deleting = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when delete request is successful.
     *
     * @returns {void}
     */
    private _onDeleteSuccess(): void {
        this.reset();
        this._state.deleting = false;
        this._state.hasError = false;
    }

    /**
     * A callback when remote data is failed to load.
     *
     * @param {AxiosError} error The error object
     * @returns {void}
     */
    private _onLoadingFailure(error: AxiosError): void {
        this._state.loading = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when remote data is successfully loaded.
     *
     * @param {AxiosResponse} response A response object
     * @returns {void}
     * @private
     */
    private _onLoadingSuccess(response: AxiosResponse): void {
        this._assignFromResponse(response);
        this._state.loading = false;
        this._state.hasError = false;
    }

    /**
     * A callback when saving data to the remote source is failed.
     *
     * @param {AxiosError} error The error object
     * @returns {void}
     */
    private _onSaveFailure(error: AxiosError): void {
        this._state.updating = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when data is successfully saved to the remote source.
     *
     * @param {AxiosResponse} response A response object
     * @returns {void}
     */
    private _onSaveSuccess(response: AxiosResponse): void {
        this._assignFromResponse(response);
        this._state.updating = false;
        this._state.hasError = false;
    }

    /**
     * Make http request and inject CSRF Token to the headers.
     *
     * @param {AxiosRequestConfig} config   Request configuration
     * @param {Function} onRequest          Callback function before the request is made
     * @param {Function} onSuccess          Callback function when the request was successful
     * @param {Function} onFailure          Callback when the request failed
     * @param {string} suffix               Suffix to be appended to the token-name
     * @returns {Promise<*>}  Promise interface
     */
    private async _requestWithToken(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void,
        suffix = '',
    ): Promise<AxiosResponse> {
        // @ts-ignore
        const headers = {'X-Requested-With': 'XMLHttpRequest'} as AxiosHeaders;
        let csrfUrl = this.csrfConfig?.url || '';

        if (
            csrfUrl.includes('{name}') &&
            !Helper.isEmpty(this.csrfConfig?.tokenName)
        ) {
            if (this.csrfConfig?.suffix === true) {
                csrfUrl = csrfUrl.replace(
                    '{name}',
                    this.csrfConfig.tokenName + suffix,
                );
            } else {
                csrfUrl = csrfUrl.replace('{name}', <string>this.csrfConfig?.tokenName);
            }
        }

        if (csrfUrl !== '') {
            const response = await this.proxy.adapterInstance.get(csrfUrl);
            headers['X-CSRF-TOKEN'] = response.data[<string>this.csrfConfig?.dataField] ||
                response.data[<string>this.csrfConfig?.responseField];
            config['headers'] = headers;

            return this.proxy.request(config, onRequest, onSuccess, onFailure);
        } else {
            return this.proxy.request(config, onRequest, onSuccess, onFailure);
        }
    }

    /**
     * Update request configuration.
     *
     * @param {AxiosRequestConfig} config   Request configuration to be updated
     * @param {never} identifier            The value to be included in the configuration
     * @param {string} url                  API URL
     * @param {string} method               Request method: delete, fetch, save, update
     * @returns {void}
     */
    private _updateRequestConfig(
        config: AxiosRequestConfig,
        identifier: never,
        url: string,
        method: keyof TRestMethodOptions,
    ): void {
        const methods = this.proxy.requestMethods();

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', identifier);
        } else if (!Helper.isEmpty(identifier)) {
            const params: TRecord = {};
            params[this._idProperty] = identifier;
            config['params'] = params;
        }

        config['url'] = url;
        config['method'] = methods[method];
    }
}
