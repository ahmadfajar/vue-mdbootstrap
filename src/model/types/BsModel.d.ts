import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { IBsModel, IRestAdapter, TCSRFConfig, THttpMethod, TModelOptions, TModelState, TRecord, TRestConfig } from '../../types';

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
 * @since  09/07/2018 modified: 24/06/2023 14:21
 */
export default class BsModel implements IBsModel {
    /**
     * Action triggered after data was fetched from the remote server.
     *
     * @method onAfterFetch
     * @param {AxiosResponse} data The response data
     * @returns {void}
     */
    private readonly _proxyErrMsg;
    private readonly _assignErrMsg;
    private readonly _assignValuesErrMsg;
    private readonly _frozenObjErrMsg;
    private readonly _sealedObjErrMsg;
    private readonly _emptyDataErrMsg;
    private readonly _parsingDataErrMsg;
    private readonly _idProperty;
    private readonly _dataProperty;
    private readonly _csrfConfig;
    private readonly _restUrl;
    private _data;
    private _schema;
    private _proxy;
    protected _state: TModelState;
    state: TModelState;
    /**
     * Class constructor.
     *
     * @param schema       The data model schema
     * @param adapter      Axios adapter instance
     * @param idProperty   Data model ID field name
     * @param dataProperty REST response data property
     */
    constructor(schema: TRecord | TModelOptions, adapter?: AxiosInstance, idProperty?: string, dataProperty?: string);
    private _initProps;
    get $_class(): string;
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
    get csrfConfig(): Readonly<TCSRFConfig> | undefined;
    get proxy(): IRestAdapter;
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
    get restUrl(): TRestConfig;
    get loading(): boolean;
    get updating(): boolean;
    get deleting(): boolean;
    get hasError(): boolean;
    destroy(): void;
    assignValue(field: string, newValue: unknown): void;
    assignValues(sources: TRecord): void;
    delete(): Promise<AxiosResponse>;
    fetch(id?: string | number): Promise<AxiosResponse>;
    freeze(): Readonly<IBsModel>;
    get(name: string): never;
    set(name: string, value: unknown): void;
    getFields(): string[];
    getIdProperty(): string;
    request(restKey: keyof TRestConfig, method?: THttpMethod, params?: TRecord, data?: TRecord, successCb?: (response: AxiosResponse) => void, errorCb?: (error: AxiosError) => void): Promise<AxiosResponse>;
    reset(): void;
    resetState(): void;
    save(): Promise<AxiosResponse>;
    seal(): IBsModel;
    toJSON(): TRecord;
    update(): Promise<AxiosResponse>;
    /**
     * Assign data from the remote source to this model.
     *
     * @param response A response object
     */
    private _assignFromResponse;
    /**
     * @returns TRUE if this data model is not in delete state.
     */
    private _checkBeforeDelete;
    /**
     * @returns TRUE if this data model is not in loading state.
     */
    private _checkBeforeLoading;
    /**
     * @returns TRUE if this data model is not in the process of
     * saving its data to the remote source
     */
    private _checkBeforeSave;
    /**
     * A callback when delete request is failed.
     *
     * @param error The error object
     */
    private _onDeleteFailure;
    /**
     * A callback when delete request is successful.
     */
    private _onDeleteSuccess;
    /**
     * A callback when remote data is failed to load.
     *
     * @param error The error object
     */
    private _onLoadingFailure;
    /**
     * A callback when remote data is successfully loaded.
     *
     * @param response A response object
     */
    private _onLoadingSuccess;
    /**
     * A callback when saving data to the remote source is failed.
     *
     * @param error The error object
     */
    private _onSaveFailure;
    /**
     * A callback when data is successfully saved to the remote source.
     *
     * @param response A response object
     */
    private _onSaveSuccess;
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
    private _requestWithToken;
    /**
     * Update request configuration.
     *
     * @param config      Request configuration to be updated
     * @param identifier  The value to be included in the configuration
     * @param url         API URL
     * @param method      Request method: delete, fetch, save, update
     */
    private _updateRequestConfig;
}
