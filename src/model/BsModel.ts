import type {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { reactive, readonly } from 'vue';
import { RestProxyAdapter } from '../model';
import type {
    IBsModel,
    IRestAdapter,
    ObjectBase,
    TCSRFConfig,
    THttpMethod,
    TModelOptions,
    TModelState,
    TRecord,
    TRestConfig,
    TRestMethodOptions,
    TUrlOption,
} from '../types';
import { autoBind } from '../utils/AutoBind';
import Helper from '../utils/Helper';
import { emptyDataErrMsg, parsingDataErrMsg, proxyErrMsg } from './AbstractStore';

/**
 * Data Model class for working with entity object and remote API.
 *
 * @example
 * const model1 = new BsModel({
 *     uid: null,
 *     username: null,
 *     displayName: null,
 *     email: null,
 *     phoneNumber: null,
 *     enabled: true,
 *     password: null
 * }, adapter, 'uid');
 *
 * const model2 = new BsModel({
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
 * }, adapter, 'uid');
 *
 * @author Ahmad Fajar
 * @since  09/07/2018 modified: 16/12/2023 14:49
 */
export default class BsModel implements ObjectBase {
    private readonly _assignErrMsg = `The given field does not exists in this ${this.$_class}.`;
    private readonly _assignValuesErrMsg = `The given values can not be assigned to ${this.$_class}.`;
    private readonly _frozenObjErrMsg = `This ${this.$_class} is frozen to prevent any modification.`;
    private readonly _sealedObjErrMsg = `This ${this.$_class} is sealed to prevent adding new properties.`;
    private readonly _idProperty: string;
    private readonly _dataProperty: string;
    private readonly _csrfConfig: Readonly<TCSRFConfig> | undefined;
    private _restUrl: TRestConfig;
    private _data: TRecord;
    private _schema: TRecord;
    private _proxy: IRestAdapter;
    protected _state: TModelState;
    public state: TModelState;

    /**
     * Class constructor.
     *
     * @param schema       The data model schema
     * @param adapter      Axios adapter instance
     * @param idProperty   Data model ID field name
     * @param dataProperty REST response data property
     */
    constructor(
        schema: TRecord | TModelOptions,
        adapter?: AxiosInstance,
        idProperty = 'id',
        dataProperty = 'data'
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
        this.state = readonly(this._state);

        const _dt: TRecord = {};
        this.getFields().forEach((f) => {
            _dt[f] = this._schema[f];
        });
        if (!(idProperty in this._schema)) {
            _dt[idProperty] = null;
        }
        this._data = reactive(_dt);
        autoBind(this);
        // Initialize magic getters and setters.
        this._initProps();
    }

    private _initProps() {
        this.getFields().forEach((f) => {
            Object.defineProperty(this, f, {
                get(): never {
                    return this._data[f] as never;
                },
                set(v: never): void {
                    this._data[f] = v;
                },
            });
        });
    }

    get $_class(): string {
        return Object.getPrototypeOf(this).constructor.name;
    }

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
    get csrfConfig(): Readonly<TCSRFConfig> | undefined {
        return this._csrfConfig;
    }

    get proxy(): IRestAdapter {
        return this._proxy;
    }

    /**
     * Get REST URL configuration in the form <code>{key: url}</code>,
     * where the keys are: <tt>'save', 'fetch', 'delete', 'update'</tt>.
     *
     * For backward compatibility you can override this function
     * as needed on the inheritance class or put it on the constructor
     * of the inheritance class or when instantiate the model.
     *
     * @example
     * return {
     *    'save'  : '/api/user/create',
     *    'fetch' : '/api/user/{id}',
     *    'update': '/api/user/{id}/save',
     *    'delete': '/api/user/{id}/delete'
     * }
     */
    get restUrl(): TRestConfig {
        return this._restUrl;
    }

    set restUrl(option: TRestConfig) {
        this._restUrl = option;
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
        delete this._proxy;
    }

    assignValue(field: string, newValue: unknown): void {
        if (field in this._data) {
            this._data[field] = newValue;
        } else {
            console.error(this._assignErrMsg);
        }
    }

    assignValues(sources: TRecord): void {
        if (Helper.isObject(sources)) {
            this.getFields().forEach((f) => {
                Object.keys(sources).forEach((k) => {
                    if (f === k) {
                        this._data[f] = sources[k];
                    }
                });
            });
        } else {
            console.error(this._assignValuesErrMsg);
        }
    }

    delete(): Promise<AxiosResponse> {
        if (!this.proxy) {
            throw Error(proxyErrMsg);
        }

        RestProxyAdapter.checkRestUrl(this.restUrl);

        let config: AxiosRequestConfig = {};
        const url = this.restUrl.delete || '';
        const methods = this.proxy.requestMethods();
        const identifier = this.get(this.idProperty);

        if (methods.delete.toLowerCase() === 'delete') {
            config = {
                url: url.replace('{id}', <never>identifier),
                method: methods.delete,
                // data: this.toJSON()
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
        if (!this.proxy) {
            throw Error(proxyErrMsg);
        }

        RestProxyAdapter.checkRestUrl(this.restUrl);

        const config: AxiosRequestConfig = {};
        const url = this.restUrl.fetch ?? '';
        const identifier = id || this.get(this.idProperty);

        this._updateRequestConfig(config, <never>identifier, url, 'fetch');

        return this.proxy.request(
            config,
            this._checkBeforeLoading,
            this._onLoadingSuccess,
            this._onLoadingFailure
        );
    }

    freeze(): Readonly<IBsModel | BsModel> {
        return Object.freeze(this);
    }

    get(name: string): never {
        return <never>this._data[name];
    }

    set(name: string, value: unknown): void {
        if (!Object.isFrozen(this)) {
            if (!(name in this._data) && !Object.isSealed(this)) {
                // if not exists and not sealed
                this._data[name] = value;

                Object.defineProperty(this, name, {
                    get(): never {
                        return this._data[name] as never;
                    },
                    set(v: never): void {
                        this._data[name] = v;
                    },
                });
            } else if (name in this._data) {
                // if already exists
                this._data[name] = value;
            } else {
                throw Error(this._sealedObjErrMsg);
            }
        } else {
            throw Error(this._frozenObjErrMsg);
        }
    }

    getFields(): string[] {
        return Object.keys(this._schema);
    }

    get idProperty(): string {
        return this._idProperty;
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
        errorCb?: (error: AxiosError) => void
    ): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        let url = this.restUrl[restKey] ?? '';
        const config: AxiosRequestConfig = {};
        const parameters: TRecord = {};

        const identifier =
            params && Object.hasOwn(params, this.idProperty)
                ? params[this.idProperty]
                : this.get(this.idProperty);

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', <never>identifier);
            if (params && Object.hasOwn(params, this.idProperty)) {
                delete params[this.idProperty];
            }
        } else if (!Helper.isEmpty(identifier)) {
            parameters[this._idProperty] = identifier;
        }

        config['url'] = url;
        config['method'] = method.toLowerCase();

        if (!Helper.isEmptyObject(params) && !Helper.isEmptyObject(parameters)) {
            config['params'] = { ...parameters, ...params };
        } else if (!Helper.isEmptyObject(params)) {
            config['params'] = params;
        }
        if (!Helper.isEmptyObject(data)) {
            config['data'] = data;
        }

        return this._requestWithToken(
            config,
            ['post', 'put', 'patch'].includes(config['method'])
                ? this._checkBeforeSave
                : this._checkBeforeLoading,
            Helper.isFunction(successCb)
                ? successCb
                : ['post', 'put', 'patch'].includes(config['method'])
                ? this._onSaveSuccess
                : this._onLoadingSuccess,
            Helper.isFunction(errorCb)
                ? errorCb
                : ['post', 'put', 'patch'].includes(config['method'])
                ? this._onSaveFailure
                : this._onLoadingFailure
        );
    }

    reset(): void {
        this.getFields().forEach((k) => {
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
        if (!this.proxy) {
            throw Error(proxyErrMsg);
        }

        RestProxyAdapter.checkRestUrl(this.restUrl);

        const url = this.restUrl.save ?? '';
        const data = this.toObject();
        const methods = this.proxy.requestMethods();
        const identifier = data[this.idProperty];

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            delete data[this.idProperty];
        }

        const config: AxiosRequestConfig = {
            url: url.replace('{id}', <never>identifier),
            method: methods.save,
            data: data,
        };

        return this._requestWithToken(
            config,
            this._checkBeforeSave,
            this._onSaveSuccess,
            this._onSaveFailure,
            '-create'
        );
    }

    seal(): IBsModel | BsModel {
        return Object.seal(this);
    }

    toObject(): TRecord {
        const data: TRecord = {};

        this.getFields().forEach((f) => {
            data[f] = this._data[f];
        });

        return data;
    }

    update(): Promise<AxiosResponse> {
        if (!this.proxy) {
            throw Error(proxyErrMsg);
        }

        RestProxyAdapter.checkRestUrl(this.restUrl);

        const url = this.restUrl.update ?? '';
        const data = this.toObject();
        const methods = this.proxy.requestMethods();
        const identifier = data[this.idProperty];

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            delete data[this.idProperty];
        }

        const config: AxiosRequestConfig = {
            url: url.replace('{id}', <never>identifier),
            method: methods.update,
            data: data,
        };

        return this._requestWithToken(
            config,
            this._checkBeforeSave,
            this._onSaveSuccess,
            this._onSaveFailure,
            '-update'
        );
    }

    /**
     * Assign data from the remote source to this model.
     *
     * @param response A response object
     */
    protected _assignFromResponse(response: AxiosResponse): void {
        const _data = <never>response.data;
        const _assign = (values: never) => {
            this.assignValues(values);
            this.getFields().forEach((f) => (this._schema[f] = values[f]));
            // @ts-ignore
            if (Helper.isFunction(this['onAfterFetch'])) {
                // @ts-ignore
                this['onAfterFetch'](values);
            }
        };

        if (Helper.isEmpty(_data)) {
            console.warn(emptyDataErrMsg);
        } else {
            if (Object.hasOwn(_data, this.idProperty)) {
                _assign(_data);
            } else if (Object.hasOwn(_data, this._dataProperty)) {
                const cdata = _data[this._dataProperty];

                if (Helper.isEmpty(cdata)) {
                    console.warn(emptyDataErrMsg);
                } else {
                    _assign(cdata);
                }
            } else {
                console.warn(parsingDataErrMsg);
            }
        }
    }

    /**
     * @returns TRUE if this data model is not in delete state.
     */
    protected _checkBeforeDelete(): boolean {
        if (this.deleting) {
            return false;
        }

        this._state.deleting = true;
        return true;
    }

    /**
     * @returns TRUE if this data model is not in loading state.
     */
    protected _checkBeforeLoading(): boolean {
        this._state.loading = true;
        return true;
    }

    /**
     * @returns TRUE if this data model is not in the process of
     * saving its data to the remote source
     */
    protected _checkBeforeSave(): boolean {
        if (this.updating) {
            return false;
        }

        this._state.updating = true;
        return true;
    }

    /**
     * A callback when delete request is failed.
     *
     * @param error The error object
     */
    protected _onDeleteFailure(error: AxiosError): void {
        this._state.deleting = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when delete request is successful.
     */
    protected _onDeleteSuccess(): void {
        this.reset();
        this._state.deleting = false;
        this._state.hasError = false;
    }

    /**
     * A callback when remote data is failed to load.
     *
     * @param error The error object
     */
    protected _onLoadingFailure(error: AxiosError): void {
        this._state.loading = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when remote data is successfully loaded.
     *
     * @param response A response object
     */
    protected _onLoadingSuccess(response: AxiosResponse): void {
        this._assignFromResponse(response);
        this._state.loading = false;
        this._state.hasError = false;
    }

    /**
     * A callback when saving data to the remote source is failed.
     *
     * @param error The error object
     */
    protected _onSaveFailure(error: AxiosError): void {
        this._state.updating = false;
        this._state.hasError = true;
        RestProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when data is successfully saved to the remote source.
     *
     * @param response A response object
     */
    protected _onSaveSuccess(response: AxiosResponse): void {
        this._assignFromResponse(response);
        this._state.updating = false;
        this._state.hasError = false;
    }

    /**
     * Make http request and inject CSRF Token to the headers.
     *
     * @param config     Request configuration
     * @param onRequest  Callback function before the request is made
     * @param onSuccess  Callback function when the request was successful
     * @param onFailure  Callback when the request failed
     * @param suffix     Suffix to be appended to the token-name
     * @returns Promise interface
     */
    protected async _requestWithToken(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void,
        suffix = ''
    ): Promise<AxiosResponse> {
        // @ts-ignore
        const headers = { 'X-Requested-With': 'XMLHttpRequest' } as AxiosHeaders;
        let csrfUrl = this.csrfConfig?.url || '';

        if (csrfUrl.includes('{name}') && !Helper.isEmpty(this.csrfConfig?.tokenName)) {
            if (this.csrfConfig?.suffix === true) {
                csrfUrl = csrfUrl.replace('{name}', this.csrfConfig.tokenName + suffix);
            } else {
                csrfUrl = csrfUrl.replace('{name}', <string>this.csrfConfig?.tokenName);
            }
        }

        if (csrfUrl !== '') {
            const response = await this.proxy.adapterInstance.get(csrfUrl);
            headers['X-CSRF-TOKEN'] =
                response.data[<string>this.csrfConfig?.dataField] ||
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
     * @param config      Request configuration to be updated
     * @param identifier  The value to be included in the configuration
     * @param url         API URL
     * @param method      Request method: delete, fetch, save, update
     */
    private _updateRequestConfig(
        config: AxiosRequestConfig,
        identifier: never,
        url: string,
        method: keyof TRestMethodOptions
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
