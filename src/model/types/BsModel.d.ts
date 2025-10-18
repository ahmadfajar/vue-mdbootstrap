import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ObjectBase, TRecord } from '../../types';
import { ErrorCallbackFn } from './AbstractStore';
import { IRestAdapter } from './RestProxyAdapter';

export declare type THttpMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE';

export declare type TRestMethodOptions = {
  browse: THttpMethod;
  fetch: THttpMethod;
  save: THttpMethod;
  update: THttpMethod;
  delete: THttpMethod;
};

export declare type TUrlOption = {
  url: string;
  method: THttpMethod;
};

export declare type TRestUrlOption = {
  [P in keyof TRestMethodOptions]?: TUrlOption | string;
};

export declare type TRestKey = Record<string, THttpMethod>;

export declare type TRestConfig = Record<keyof TRestMethodOptions | string, string>;

export declare type TCSRFConfig = {
  url?: string;
  tokenName?: string;
  dataField?: string;
  /**
   * @deprecated
   * Backward compatibility.
   */
  responseField?: string;
  suffix?: boolean;
};

export declare type TModelOptions = {
  schema: TRecord;
  proxy: TRestUrlOption;
  csrfConfig?: TCSRFConfig;
};

export declare type TModelState = {
  loading: boolean;
  updating: boolean;
  deleting: boolean;
  hasError: boolean;
};

export declare interface IBsModel extends ObjectBase {
  [key: string]: unknown;

  /**
   * Returns the reactive state of the DataModel.
   */
  readonly state: Readonly<TModelState>;

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
   *
   * For backward compatibility you can override this function
   * as needed on the inheritance class or put it on the constructor
   * of the inheritance class or when instantiate the model.
   */
  get csrfConfig(): Readonly<TCSRFConfig> | undefined;

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
   *
   * For backward compatibility you can override this function
   * as needed on the inheritance class or put it on the constructor
   * of the inheritance class or when instantiate the model.
   */
  get restUrl(): TRestConfig;
  set restUrl(option: TRestConfig);

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
   * @param field     The field name
   * @param newValue  The new value
   */
  assignValue(field: string, newValue: unknown): void;

  /**
   * Assign new values to some existing fields.
   *
   * This method checked the schema definition when constructing the object,
   * and only fields that exists on the schema will get assign new value.
   *
   * @param sources Object with format key-value pairs
   */
  assignValues(sources: TRecord): void;

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
   * Freeze this data model instance, makes it Readonly and prevents any modification.
   */
  freeze(): Readonly<IBsModel>;

  /**
   * Get a field value.
   *
   * @param key The field name.
   */
  get(key: string): unknown;

  /**
   * Define or sets a field with new value.
   * If the field doesn't exist, then it will be appended.
   *
   * @param key   The field name.
   * @param value The field value.
   * @throws Error If this data model is frozen.
   */
  set(key: string, value: unknown): void;

  /**
   * Get all the field names.
   */
  getFields(): IterableIterator<string>;

  /**
   * Returns the ID field name for this data model.
   */
  get idProperty(): string;

  /**
   * Get ID field name for this data model. (for backward compatibility)
   *
   * @deprecated
   */
  getIdProperty(): string;

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
    restKey: keyof TRestMethodOptions,
    method?: THttpMethod | null,
    params?: TRecord | null,
    data?: TRecord | null,
    successCb?: (response: AxiosResponse) => void,
    errorCb?: (error: AxiosError) => void
  ): Promise<AxiosResponse>;

  /**
   * Reset all fields value to their default.
   */
  reset(): void;

  /**
   * Reset this model state back to their initial states, such as `loading`, etc.
   */
  resetState(): void;

  /**
   * Persist new record to the remote service via REST API.
   */
  save(): Promise<AxiosResponse>;

  /**
   * Seal this data model instance, preventing new properties from being added to it
   * and marking all existing properties as non-configurable.
   *
   * Values of present properties can still be changed as long as they are writable.
   */
  seal(): IBsModel;

  /**
   * Convert field attributes that exists in the schema definition into a Javascript plain object.
   *
   * The result of this method is used on REST method like: {@link save } and {@link update }.
   *
   * This method can be overridden on inherited classes to produce the desired DTO.
   */
  toObject(): TRecord;

  /**
   * Update and persist record that already exists on the remote service via REST API.
   */
  update(): Promise<AxiosResponse>;

  /**
   * Event triggered after data was fetched from the remote server.
   * This method can be overridden on inherited classes.
   *
   * @param data The response data
   */
  onAfterFetch?(data: TRecord): void;
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
 */
export class BsModel implements IBsModel {
  protected _state: TModelState;
  public state: Readonly<TModelState>;

  [key: string]: unknown;

  /**
   * Construct {@link BsModel} object instance.
   *
   * @param schema       The data model schema
   * @param adapter      Axios adapter instance
   * @param idProperty   Data model ID field name
   * @param dataProperty REST response data property
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
   */
  constructor(
    schema: TModelOptions | TRecord,
    adapter?: AxiosInstance | null,
    idProperty?: string,
    dataProperty?: string
  );

  onAfterFetch?(_data: TRecord): void;

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

  set restUrl(option: TRestConfig);

  get loading(): boolean;

  get updating(): boolean;

  get deleting(): boolean;

  get hasError(): boolean;

  destroy(): void;

  assignValue(field: string, newValue: unknown): void;

  assignValues(sources: TRecord): void;

  delete(): Promise<AxiosResponse>;

  fetch(id?: string | number): Promise<AxiosResponse>;

  get(key: string): unknown;

  set(key: string, value: unknown): void;

  getFields(): IterableIterator<string>;

  get idProperty(): string;

  /**
   * @deprecated
   */
  getIdProperty(): string;

  request(
    restKey: keyof TRestMethodOptions,
    method?: THttpMethod | null,
    params?: TRecord | null,
    data?: TRecord | null,
    successCb?: (response: AxiosResponse) => void,
    errorCb?: ErrorCallbackFn
  ): Promise<AxiosResponse>;

  reset(): void;

  resetState(): void;

  freeze(): Readonly<IBsModel>;

  seal(): IBsModel;

  save(): Promise<AxiosResponse>;

  update(): Promise<AxiosResponse>;

  toObject(): TRecord;

  /**
   * Assign data from the remote source to this model.
   *
   * @param response A response object
   */
  protected _assignFromResponse(response: AxiosResponse): void;

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
