import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import axios from "axios";
import type {AppConfig} from "vue";
import type {IRestAdapter, TRecord, TRestMethodOptions} from "../types";
import {useAxiosPlugin} from "../mixins/CommonApi";
import Helper from "../utils/Helper";

/**
 * Class RestProxyAdapter which is used to load data from the remote server.
 *
 * @author Ahmad Fajar
 * @since  20/07/2018 modified: 23/04/2023 00:12
 */
export default class RestProxyAdapter implements IRestAdapter {
    private readonly _adapter: AxiosInstance;
    private readonly _httpMethods: TRecord;

    /**
     * Check if axios plugin already installed and defined not.
     *
     * @param {AppConfig|AxiosInstance} [appConfig] AppConfig or Axios adapter instance
     * @returns {void}
     * @throws Error If axios doesn't exist
     */
    static checkAxios(appConfig: AppConfig | AxiosInstance) {
        if (!appConfig) {
            throw Error("Parameter 'appConfig' must be an 'AxiosInstance' or 'Vue AppConfig'.");
        }
        if (
            "globalProperties" in appConfig && appConfig.globalProperties &&
            (!appConfig.globalProperties.$http && !appConfig.globalProperties.$axios)
        ) {
            throw Error("Vue Application doesn't have AxiosPlugin installed. " +
                "Please define it some where in the application before using RestProxyAdapter.");
        }
        if (
            ("get" in appConfig && !Helper.isFunction(appConfig.get)) &&
            ("post" in appConfig && !Helper.isFunction(appConfig.post))
        ) {
            throw Error("Axios is not defined. " +
                "Please define it in the constructor before using RestProxyAdapter.");
        }
    }

    /**
     * Check if Rest URL already defined or not.
     *
     * @param {Object} restUrl The Rest URL to check
     * @returns {void}
     * @throws URIError If Rest Url is not defined
     */
    static checkRestUrl(restUrl: TRecord) {
        if (Helper.isEmptyObject(restUrl)) {
            throw new URIError('REST URL is not defined yet.');
        }
    }

    /**
     * Log error response to the console.
     *
     * @param {AxiosError} error The axios error object.
     * @returns {void}
     */
    static warnResponseError(error: AxiosError) {
        if (error.response) {
            console.warn('Request failed with status code: ', error.response.status);
        } else if (error.request) {
            console.warn(error.request);
        } else {
            console.warn((error.message ? error.message : error));
        }
    }

    /**
     * Default REST request method options. Do not override this property.
     *
     * @returns {TRestMethodOptions} REST method options
     */
    static get defaultHttpMethods(): TRestMethodOptions {
        return {
            browse: 'get',
            fetch: 'get',
            save: 'post',
            update: 'post',
            delete: 'delete'
        }
    }

    /**
     * Class constructor.
     *
     * @param {AxiosInstance} adapter               Axios adapter instance
     * @param {TRestMethodOptions} [httpMethods]    Custom HTTP methods to override the default methods
     */
    constructor(adapter?: AxiosInstance, httpMethods = {}) {
        // Resolve and pick axios adapter from available sources
        this._adapter = adapter ?? (useAxiosPlugin() ?? axios);
        // Custom http methods
        this._httpMethods = httpMethods;
    }

    get adapterInstance() {
        if (this._adapter) {
            return this._adapter;
        }

        throw Error("Vue Application doesn't have AxiosPlugin installed. " +
            "Please define it some where in the application before using RestProxyAdapter.");
    }

    /**
     * Perform REST request to the server.
     *
     * @param {AxiosRequestConfig} config   Request configuration
     * @param {Function} onRequest          Promise function called before the request is made.
     * @param {Function} onSuccess          Promise function called when the request was successful.
     * @param {Function} onFailure          Promise function called when the request was failed.
     * @returns {Promise<AxiosResponse>}  Promise
     */
    request(
        config: AxiosRequestConfig,
        onRequest: () => boolean,
        onSuccess: (response: AxiosResponse) => void,
        onFailure: (error: AxiosError) => void,
    ): Promise<AxiosResponse> {
        RestProxyAdapter.checkAxios(this._adapter);

        return new Promise((resolve, reject) => {
            const check = !Helper.isEmpty(config) && !Helper.isEmpty(config.url);
            if (!check) {
                reject(new Error("Not enough information to send request to remote service."));
                return;
            }

            if (Helper.isFunction(onRequest) && onRequest()) {
                this.adapterInstance(config)
                    .then((response) => {
                        if (Helper.isFunction(onSuccess)) {
                            onSuccess(response);
                        }
                        resolve(response);
                    })
                    .catch((error) => {
                        if (Helper.isFunction(onFailure)) {
                            onFailure(error);
                        }
                        reject(error);
                    });
            } else {
                reject(new Error("Client is busy handling previous request."));
            }
        });
    }

    /**
     * Get REST request methods options.
     *
     * @returns {TRestMethodOptions} REST request method options
     */
    requestMethods(): TRestMethodOptions {
        return {
            ...RestProxyAdapter.defaultHttpMethods,
            ...this._httpMethods
        }
    }
}
