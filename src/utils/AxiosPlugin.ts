import type {AxiosPromise, RawAxiosRequestConfig} from "axios";
import axios from "axios";
import type {App, Plugin as Plugin_2} from "vue";

declare interface IRequestConfig extends RawAxiosRequestConfig {
    requestHandler: CallableFunction;
    requestErrorHandler: CallableFunction;
    responseHandler: CallableFunction;
    responseErrorHandler: CallableFunction;
}

declare interface IHttpService {
    /**
     * Send HTTP GET to the remote server.
     *
     * @param {string} url                      API url
     * @param {Object} [data]                   The data to be sent
     * @param {RawAxiosRequestConfig} [options] Additional options
     * @returns {AxiosPromise} Promise instance
     */
    get: (url: string, data?: object, options?: RawAxiosRequestConfig) => AxiosPromise;
    /**
     * Send HTTP POST to the remote server.
     *
     * @param {string} url                      API url
     * @param {Object} data                     The data to be sent
     * @param {RawAxiosRequestConfig} [options] Additional options
     * @returns {AxiosPromise} Promise instance
     */
    post: (url: string, data: Record<string, unknown>, options?: RawAxiosRequestConfig) => AxiosPromise;
    /**
     * Send HTTP PUT to the remote server.
     *
     * @param {string} url                      API url
     * @param {Object} data                     The data to be sent
     * @param {RawAxiosRequestConfig} [options] Additional options
     * @returns {AxiosPromise} Promise instance
     */
    put: (url: string, data: Record<string, unknown>, options?: RawAxiosRequestConfig) => AxiosPromise;
    /**
     * Send HTTP DELETE to the remote server.
     *
     * @param {string} url                      API url
     * @param {Object} [data]                   The data to be sent
     * @param {RawAxiosRequestConfig} [options] Additional options
     * @returns {AxiosPromise} Promise instance
     */
    delete: (url: string, data?: object, options?: RawAxiosRequestConfig) => AxiosPromise;
}

function _axiosPlugin(options?: RawAxiosRequestConfig) {
    const defaultOptions: IRequestConfig = {
        // request interceptor handler
        requestHandler: (config: unknown) => config,
        requestErrorHandler: (error: unknown) => Promise.reject(error),
        // response interceptor handler
        responseHandler: (response: unknown) => response,
        responseErrorHandler: (error: unknown) => Promise.reject(error)
    };

    const initOptions: IRequestConfig = {
        ...defaultOptions,
        ...options
    };

    const service = axios.create(initOptions);

    // Add a request interceptor
    service.interceptors.request.use(
        config => initOptions.requestHandler(config),
        error => initOptions.requestErrorHandler(error)
    );
    // Add a response interceptor
    service.interceptors.response.use(
        response => initOptions.responseHandler(response),
        error => initOptions.responseErrorHandler(error)
    );

    const http: IHttpService = {
        get: (url: string, data?: object, options?: RawAxiosRequestConfig) => {
            const config = {
                ...options,
                params: data,
            };

            return service.get(url, config)
        },
        post: (url: string, data: Record<string, unknown>, options?: RawAxiosRequestConfig) => {
            return service.post(url, data, options)
        },
        put: (url: string, data: Record<string, unknown>, options?: RawAxiosRequestConfig) => {
            return service.put(url, data, options)
        },
        delete: (url: string, data?: object, options?: RawAxiosRequestConfig) => {
            const config = {
                ...options,
                data: data
            };

            return service.delete(url, config)
        }
    };

    return {service, http}
}

const AxiosPlugin: Plugin_2 = {
    install: (app: App, options?: RawAxiosRequestConfig): void => {
        const {service, http} = _axiosPlugin(options);
        app.config.globalProperties.$axios = service;
        app.config.globalProperties.$http = http;
    }
}

export default AxiosPlugin;
