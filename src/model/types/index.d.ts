import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ObjectBase, TRecord} from "../../types";

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

export declare type TRestUrlOption = Record<keyof TRestMethodOptions, TUrlOption | string>;

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

export declare interface IRestAdapter {
    get adapterInstance(): AxiosInstance;

    /**
     * Perform REST request to the remote server.
     *
     * @param {AxiosRequestConfig} config   Request configuration
     * @param {Function} onRequest          Promise function called before the request is made.
     * @param {Function} onSuccess          Promise function called when the request is successful.
     * @param {Function} onFailure          Promise function called when the request is failed.
     */
    request(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void,
    ): Promise<AxiosResponse>;

    /**
     * Get REST request methods options.
     */
    requestMethods(): TRestMethodOptions;
}

export declare interface IBsModel extends ObjectBase {
    /**
     * Get the class name of this instance.
     */
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
    get csrfConfig(): TCSRFConfig | undefined;

    /**
     * Get REST proxy adapter which is used to work with remote service.
     */
    get proxy(): IRestAdapter;

    /**
     * Get REST URL configuration in the form <code>{key: url}</code>,
     * where the keys are: <tt>'save', 'fetch', 'delete', 'update'</tt>.
     *
     * Override this function as needed on the inheritance class.
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
     * Assign new value to an existing field name.
     *
     * @param {string} field The field name
     * @param {*} newValue   The new value
     */
    assignValue(field: string, newValue: unknown): void;

    /**
     * Assign new value to some existing fields.
     *
     * @param {TRecord} sources Object with format key-value pairs
     */
    assignValues(sources: TRecord): void;

    /**
     * Get a field value.
     *
     * @param {string} name The field name.
     */
    get(name: string): unknown | never;

    /**
     * Define or sets a field with new value.
     * If the field doesn't exist, then it will be appended.
     *
     * @param {string} name The field name.
     * @param {never} value The field value.
     * @throws Error If this data model is frozen.
     */
    set(name: string, value: unknown): void;

    /**
     * Get all the field names.
     */
    getFields(): string[];

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
     * @param {number|string} id The item ID
     */
    fetch(id?: string | number): Promise<AxiosResponse>;

    /**
     * Perform custom HTTP request to the remote service via REST API.
     *
     * @param {string} restKey      The key from restUrl property
     * @param {string} method       Any valid HTTP method, likes: `get`, `post`, `delete`, `put`, `patch`.
     *                              The default is `get`.
     * @param {Object} params       Parameters to append when invoke rest request
     * @param {Object} data         Data to append when invoke rest request
     * @param {Function} successCb  Promise function to be called when the request is successful
     * @param {Function} errorCb    Promise function to be called when the request is failed
     */
    request(
        restKey: keyof TRestConfig,
        method: THttpMethod = 'get',
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
