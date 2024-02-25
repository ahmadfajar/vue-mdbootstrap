import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConfig } from 'vue';
import { TRecord, TRestMethodOptions } from '../../types';

export declare interface IRestAdapter {
    get adapterInstance(): AxiosInstance;

    /**
     * Perform REST request to the remote server.
     *
     * @param config    Request configuration
     * @param onRequest Promise function called before the request is made.
     * @param onSuccess Promise function called when the request is successful.
     * @param onFailure Promise function called when the request is failed.
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

/**
 * Class RestProxyAdapter which is used to load data from the remote server.
 */
export declare class RestProxyAdapter implements IRestAdapter {
    /**
     * Check if axios plugin already installed and defined not.
     *
     * @param appConfig AppConfig or Axios adapter instance
     * @throws Error If axios doesn't exist
     */
    static checkAxios(appConfig: AppConfig | AxiosInstance): void;

    /**
     * Check if Rest URL already defined or not.
     *
     * @param restUrl The Rest URL to check
     * @throws URIError If Rest Url is not defined
     */
    static checkRestUrl(restUrl: TRecord): void;

    /**
     * Log error response to the console.
     *
     * @param error The axios error object.
     */
    static warnResponseError(error: AxiosError): void;

    /**
     * Default REST request method options. Do not override this property.
     *
     * @returns REST method options
     */
    static get defaultHttpMethods(): TRestMethodOptions;

    /**
     * Class constructor.
     *
     * @param adapter      Axios adapter instance
     * @param httpMethods  Custom HTTP methods to override the default methods
     */
    constructor(adapter?: AxiosInstance, httpMethods?: object);

    get adapterInstance(): AxiosInstance;

    /**
     * Perform REST request to the server.
     *
     * @param config     Request configuration
     * @param onRequest  Promise function called before the request is made.
     * @param onSuccess  Promise function called when the request was successful.
     * @param onFailure  Promise function called when the request was failed.
     * @returns Promise interface instance
     */
    request(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void
    ): Promise<AxiosResponse>;

    /**
     * Get REST request methods options.
     *
     * @returns REST request method options
     */
    requestMethods(): TRestMethodOptions;
}
