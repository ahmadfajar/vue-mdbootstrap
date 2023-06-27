import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { IRestAdapter, ObjectBase, TRecord } from '../../types';

export declare type THttpMethod =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE';

export declare type TRestMethodOptions = {
    browse: THttpMethod;
    fetch: THttpMethod;
    save: THttpMethod;
    update: THttpMethod;
    delete: THttpMethod;
}

export declare type TUrlOption = {
    url: string;
    method: string;
}

export declare type TRestUrlOption = {
    [P in keyof TRestMethodOptions]?: TUrlOption | string;
};

export declare type TRestConfig = Record<keyof TRestMethodOptions, string>;

export declare type TCSRFConfig = {
    url?: string;
    tokenName?: string;
    dataField?: string;
    /**
     * Backward compatibility.
     */
    responseField?: string;
    suffix?: boolean;
}

export declare type TModelOptions = {
    schema: TRecord,
    proxy: TRestUrlOption;
    csrfConfig?: TCSRFConfig;
}

export declare type TModelState = {
    loading: boolean;
    updating: boolean;
    deleting: boolean;
    hasError: boolean;
}

export declare interface IBsModel extends ObjectBase {
    /**
     * Returns the reactive state of the DataModel.
     */
    readonly state: TModelState;

    /**
     * Get the class name of this instance.
     */
    get $_class(): string;

    /**
     * Readonly data Model state, whether it is still loading data or not.
     */
    get loading(): boolean;

    /**
     * Readonly data Model state, whether it is still in the process of
     * saving/updating data to the remote server or not.
     */
    get updating(): boolean;

    /**
     * Readonly data Model state, whether it is still in the process of deleting
     * data from the remote server or not.
     */
    get deleting(): boolean;

    /**
     * Readonly data Model state, whether there was an error when
     * loading/saving/deleting data or not.
     */
    get hasError(): boolean;

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
    get csrfConfig(): TCSRFConfig | undefined;

    /**
     * Get REST proxy adapter which is used to work with remote service.
     */
    get proxy(): IRestAdapter;

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

    /**
     * Assign new value to an existing field name.
     *
     * @param field     The field name
     * @param newValue  The new value
     */
    assignValue(field: string, newValue: unknown): void;

    /**
     * Assign new value to some existing fields.
     *
     * @param sources Object with format key-value pairs
     */
    assignValues(sources: TRecord): void;

    /**
     * Get a field value.
     *
     * @param name The field name.
     */
    get(name: string): never;

    /**
     * Define or sets a field with new value.
     * If the field doesn't exist, then it will be appended.
     *
     * @param name The field name.
     * @param value The field value.
     * @throws Error If this data model is frozen.
     */
    set(name: string, value: unknown): void;

    /**
     * Get all the field names.
     */
    getFields(): string[];

    /**
     * Returns the ID field name for this data model.
     */
    get idProperty(): string;

    /**
     * Get ID field name for this data model.
     */
    getIdProperty(): string;

    /**
     * Perform delete record that already exists on the remote service via REST API.
     */
    delete(): Promise<AxiosResponse>;

    /**
     * Perform fetch or read record from remote service via REST API.
     *
     * @param id The item ID
     */
    fetch(id?: string | number): Promise<AxiosResponse>;

    /**
     * Perform custom HTTP request to the remote service via REST API.
     *
     * @param restKey    The key from restUrl property
     * @param method     Any valid HTTP method, likes: `get`, `post`, `delete`, `put`, `patch`.
     *                   The default is `get`.
     * @param params     Parameters to append when invoke rest request
     * @param data       Data to append when invoke rest request
     * @param successCb  Promise function to be called when the request is successful
     * @param errorCb    Promise function to be called when the request is failed
     */
    request(
        restKey: keyof TRestConfig,
        method: THttpMethod,
        params?: TRecord,
        data?: TRecord,
        successCb?: (response: AxiosResponse) => void,
        errorCb?: (error: AxiosError) => void,
    ): Promise<AxiosResponse>;

    /**
     * Reset all fields value to its default.
     */
    reset(): void;

    /**
     * Reset this model state back to their initial states, ie. `loading`, etc.
     */
    resetState(): void;

    /**
     * Persist new record to the remote service via REST API.
     */
    save(): Promise<AxiosResponse>;

    /**
     * Update and persist record that already exists on the remote service via REST API.
     */
    update(): Promise<AxiosResponse>;

    /**
     * Freeze this data model instance, makes it Readonly and prevents any modification.
     */
    freeze(): Readonly<IBsModel>;

    /**
     * Seal this data model instance, preventing new properties from being added to it
     * and marking all existing properties as non-configurable.
     *
     * Values of present properties can still be changed as long as they are writable.
     */
    seal(): IBsModel;

    /**
     * Convert field attributes into Javascript plain object.
     */
    toJSON(): TRecord;
}

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
 */
export declare class BsModel implements IBsModel {
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

    get idProperty(): string;

    getIdProperty(): string;

    request(
        restKey: keyof TRestConfig,
        method?: THttpMethod,
        params?: TRecord,
        data?: TRecord,
        successCb?: (response: AxiosResponse) => void,
        errorCb?: (error: AxiosError) => void
    ): Promise<AxiosResponse>;

    reset(): void;

    resetState(): void;

    save(): Promise<AxiosResponse>;

    seal(): IBsModel;

    toJSON(): TRecord;

    update(): Promise<AxiosResponse>;

    /**
     * Action triggered after data was fetched from the remote server.
     * This method can be overridden on the inherited classes.
     *
     * @param data The response data
     */
    onAfterFetch(data: AxiosResponse): void;

    /**
     * Assign data from the remote source to this model.
     *
     * @param response A response object
     */
    protected _assignFromResponse(response): void;

    /**
     * @returns TRUE if this data model is not in delete state.
     */
    protected _checkBeforeDelete(): boolean;

    /**
     * @returns TRUE if this data model is not in loading state.
     */
    protected _checkBeforeLoading(): boolean;

    /**
     * @returns TRUE if this data model is not in the process of
     * saving its data to the remote source
     */
    protected _checkBeforeSave(): boolean;

    /**
     * A callback when delete request is failed.
     *
     * @param error The error object
     */
    protected _onDeleteFailure(error: AxiosError): void;

    /**
     * A callback when delete request is successful.
     */
    protected _onDeleteSuccess(): void;

    /**
     * A callback when remote data is failed to load.
     *
     * @param error The error object
     */
    protected _onLoadingFailure(error: AxiosError): void;

    /**
     * A callback when remote data is successfully loaded.
     *
     * @param response A response object
     */
    protected _onLoadingSuccess(response: AxiosResponse): void;

    /**
     * A callback when saving data to the remote source is failed.
     *
     * @param error The error object
     */
    protected _onSaveFailure(error: AxiosError): void;

    /**
     * A callback when data is successfully saved to the remote source.
     *
     * @param response A response object
     */
    protected _onSaveSuccess(response: AxiosResponse): void;

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
    protected _requestWithToken(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void,
        suffix?: string
    ): Promise<AxiosResponse>;
}
