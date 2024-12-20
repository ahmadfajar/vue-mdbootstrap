import { RestProxyAdapter } from '@/model';
import { emptyDataErrMsg, parsingDataErrMsg, proxyErrMsg } from '@/model/AbstractStore.ts';
import type {
    IRestAdapter,
    ObjectBase,
    TCSRFConfig,
    THttpMethod,
    TModelOptions,
    TModelState,
    TRecord,
    TRestConfig,
    TRestKey,
    TRestMethodOptions,
    TUrlOption,
} from '@/types';
import { autoBind } from '@/utils/AutoBind.ts';
import Helper from '@/utils/Helper.ts';
import type {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import type { UnwrapNestedRefs } from 'vue';
import { reactive, readonly } from 'vue';

const _assignErrMsg = 'The given field does not exists in this {1}.';
const _assignValuesErrMsg = 'The given values can not be assigned to {1}.';
const _frozenObjErrMsg = 'This {1} is frozen to prevent any modification.';
const _sealedObjErrMsg = 'This {1} is sealed to prevent adding new properties.';

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
 *         update: {url: './api/users', method: 'patch'},
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
 * @since  09/07/2018 modified: 17/08/2024 02:45
 */
export default class BsModel implements ObjectBase {
    private readonly _idProperty: string;
    private readonly _dataProperty: string;
    private readonly _csrfConfig: Readonly<TCSRFConfig> | undefined;
    private readonly _data: UnwrapNestedRefs<Map<string, unknown>>;
    private readonly _proxy: IRestAdapter;
    private _restUrl: TRestConfig;
    private _schema: Map<string, unknown>;
    protected _state: TModelState;
    public state: Readonly<TModelState>;

    /**
     * Construct {@link BsModel} object instance.
     *
     * @param schema       The data model schema
     * @param adapter      Axios adapter instance
     * @param idProperty   Data model ID field name
     * @param dataProperty REST response data property
     */
    constructor(
        schema: TModelOptions | TRecord,
        adapter?: AxiosInstance | null,
        idProperty = 'id',
        dataProperty = 'data'
    ) {
        this._restUrl = {} as TRestConfig;
        this._idProperty = idProperty;
        this._dataProperty = dataProperty;

        // Add reactivity to the data.
        this._state = reactive<TModelState>({
            loading: false,
            updating: false,
            deleting: false,
            hasError: false,
        });

        this._schema = new Map();
        this._data = reactive(new Map());
        this.state = readonly(this._state);

        if (
            Object.hasOwn(schema, 'schema') &&
            Object.hasOwn(schema, 'proxy') &&
            !Helper.isEmptyObject(schema.schema) &&
            !Helper.isEmptyObject(schema.proxy)
        ) {
            const _methods = {} as TRestKey;

            for (const [key, value] of Object.entries((schema as TModelOptions).proxy)) {
                if (Helper.isObject(value)) {
                    _methods[key] = (value as TUrlOption).method;
                }
                this._restUrl[key] = Helper.isObject(value) ? value.url : value;
            }

            this._proxy = new RestProxyAdapter(adapter, _methods);
            this._initSchema((schema as TModelOptions).schema);

            if (!Helper.isEmptyObject(schema.csrfConfig)) {
                this._csrfConfig = Object.freeze(schema.csrfConfig) as Readonly<TCSRFConfig>;
            }
        } else {
            this._proxy = new RestProxyAdapter(adapter);
            this._initSchema(schema);
        }

        autoBind(this);
    }

    private _initSchema(schema: TRecord): void {
        Object.keys(schema).forEach((k) => {
            this._schema.set(k, null);
            this._data.set(k, schema[k]);
        });

        for (const key of this._schema.keys()) {
            Object.defineProperty(this, key, {
                get(): unknown {
                    return this._data.get(key);
                },
                set(value: unknown): void {
                    this._data.set(key, value);
                },
            });
        }
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
        this._schema.clear();
        this._data.clear();
    }

    assignValue(field: string, newValue: unknown): void {
        if (this._data.has(field)) {
            this.set(field, newValue);
        } else {
            console.error(_assignErrMsg.replace('{1}', this.$_class));
        }
    }

    assignValues(sources: TRecord): void {
        if (Helper.isObject(sources)) {
            Object.keys(sources).forEach((k) => {
                if (this._schema.has(k)) {
                    this.set(k, sources[k]);
                }
            });
        } else {
            console.error(_assignValuesErrMsg.replace('{1}', this.$_class));
        }
    }

    delete(): Promise<AxiosResponse> {
        if (!this.proxy) {
            throw Error(proxyErrMsg);
        }

        RestProxyAdapter.checkRestUrl(this.restUrl);

        let config: AxiosRequestConfig = {};
        const url = this.restUrl.delete ?? '';
        const methods = this.proxy.requestMethods();
        const identifier = this.get(this.idProperty) as string;

        if (methods.delete.toLowerCase() === 'delete') {
            config = {
                url: url.replace('{id}', identifier),
                method: methods.delete,
                // data: this.toObject()
            };
        } else {
            this._updateRequestConfig(config, identifier, url, 'delete');
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
        const identifier = id ?? this.get(this.idProperty);

        this._updateRequestConfig(config, identifier, url, 'fetch');

        return this.proxy.request(
            config,
            this._checkBeforeLoading,
            this._onLoadingSuccess,
            this._onLoadingFailure
        );
    }

    freeze(): Readonly<BsModel> {
        return Object.freeze(this);
    }

    get(name: string): unknown {
        return this._data.get(name);
    }

    set(name: string, value: unknown): void {
        if (!Object.isFrozen(this)) {
            if (!this._data.has(name) && !Object.isSealed(this)) {
                // if not exists and not sealed
                this._data.set(name, value);

                Object.defineProperty(this, name, {
                    get(): unknown {
                        return this._data.get(name);
                    },
                    set(v: unknown): void {
                        this._data.set(name, v);
                    },
                });
            } else if (this._data && this._data.has(name)) {
                // if already exists
                this._data.set(name, value);
            } else {
                throw Error(_sealedObjErrMsg.replace('{1}', this.$_class));
            }
        } else {
            throw Error(_frozenObjErrMsg.replace('{1}', this.$_class));
        }
    }

    getFields(): IterableIterator<string> {
        return this._schema.keys();
    }

    get idProperty(): string {
        return this._idProperty;
    }

    /**
     * @deprecated
     */
    getIdProperty(): string {
        return this._idProperty;
    }

    request(
        restKey: keyof TRestMethodOptions,
        method?: THttpMethod | null,
        params?: TRecord | null,
        data?: TRecord | null,
        successCb?: (response: AxiosResponse) => void,
        errorCb?: (error: AxiosError) => void
    ): Promise<AxiosResponse> {
        RestProxyAdapter.checkRestUrl(this.restUrl);

        let url = this.restUrl[restKey] ?? '';
        const config: AxiosRequestConfig = {};
        const parameters: TRecord = {};

        const identifier: any =
            params && Object.hasOwn(params, this.idProperty)
                ? params[this.idProperty]
                : this.get(this.idProperty);

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', identifier);
            if (params && Object.hasOwn(params, this.idProperty)) {
                delete params[this.idProperty];
            }
        } else if (!Helper.isEmpty(identifier)) {
            parameters[this.idProperty] = identifier;
        }

        config['url'] = url;
        config['method'] = method?.toLowerCase() ?? this.proxy.requestMethods()[restKey];

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
        for (const key of this._data.keys()) {
            this._data.set(key, this._schema.get(key));
        }
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
        const identifier = (data[this.idProperty] || this.get(this.idProperty)) as string;
        // console.log('identifier:', identifier);

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            Object.hasOwn(data, this.idProperty) && delete data[this.idProperty];
        }

        const config: AxiosRequestConfig = {
            url: url.replace('{id}', identifier),
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

    seal(): BsModel {
        return Object.seal(this);
    }

    toObject(): TRecord {
        const data: TRecord = {};

        for (const key of this._schema.keys()) {
            data[key] = this.get(key);
        }

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
        const identifier = (data[this.idProperty] || this.get(this.idProperty)) as string;
        // console.log('identifier:', identifier);

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            Object.hasOwn(data, this.idProperty) && delete data[this.idProperty];
        }

        const config: AxiosRequestConfig = {
            url: url.replace('{id}', identifier),
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
        const _data = response.data;
        const _assignFn = (values: TRecord) => {
            this.assignValues(values);
            // assign values that was fetched from REST response as defaults
            Object.keys(values).forEach((k) => {
                this._schema.has(k) && this._schema.set(k, values[k]);
            });

            // @ts-ignore
            Helper.isFunction(this['onAfterFetch']) && this['onAfterFetch'](values);
        };

        if (Helper.isEmpty(_data)) {
            console.warn(emptyDataErrMsg);
        } else {
            if (Object.hasOwn(_data, this.idProperty)) {
                _assignFn(_data);
            } else if (Object.hasOwn(_data, this._dataProperty)) {
                const _cdata = _data[this._dataProperty];

                if (Helper.isEmpty(_cdata)) {
                    console.warn(emptyDataErrMsg);
                } else {
                    _assignFn(_cdata);
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

        return (this._state.deleting = true);
    }

    /**
     * @returns TRUE if this data model is not in loading state.
     */
    protected _checkBeforeLoading(): boolean {
        return (this._state.loading = true);
    }

    /**
     * @returns TRUE if this data model is not in the process of
     * saving its data to the remote source
     */
    protected _checkBeforeSave(): boolean {
        if (this.updating) {
            return false;
        }

        return (this._state.updating = true);
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
        let csrfUrl = this.csrfConfig?.url ?? '';

        if (csrfUrl.includes('{name}') && !Helper.isEmpty(this.csrfConfig?.tokenName)) {
            if (this.csrfConfig?.suffix === true) {
                csrfUrl = csrfUrl.replace('{name}', this.csrfConfig.tokenName + suffix);
            } else {
                csrfUrl = csrfUrl.replace('{name}', this.csrfConfig?.tokenName as string);
            }
        }

        if (csrfUrl !== '') {
            const response = await this.proxy.adapterInstance.get(csrfUrl);
            headers['X-CSRF-TOKEN'] =
                response.data[this.csrfConfig?.dataField as string] ??
                response.data[this.csrfConfig?.responseField as string];
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
        identifier: unknown,
        url: string,
        method: keyof TRestMethodOptions
    ): void {
        const methods = this.proxy.requestMethods();

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', identifier as string);
        } else if (!Helper.isEmpty(identifier)) {
            const params: TRecord = {};
            params[this._idProperty] = identifier;
            config['params'] = params;
        }

        config['url'] = url;
        config['method'] = methods[method];
    }
}
