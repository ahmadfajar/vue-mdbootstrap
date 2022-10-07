import axios, {AxiosRequestConfig} from "axios";
import {App} from "vue";

interface IRequestConfig extends AxiosRequestConfig {
    requestHandler: CallableFunction,
    requestErrorHandler: CallableFunction,
    responseHandler: CallableFunction,
    responseErrorHandler: CallableFunction,
}

function _axiosPlugin(options?: AxiosRequestConfig) {
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

    const http = {
        /**
         * Send HTTP GET to the remote server.
         *
         * @param {string} url               API url
         * @param {Object} [data]            The data to be sent
         * @param {IRequestConfig} [options] The configuration options
         * @returns {Promise} Promise instance
         */
        get: (url: string, data?: object, options?: IRequestConfig) => {
            const axiosOpt = {
                ...options,
                ...{
                    method: 'get',
                    url: url,
                    params: data
                }
            };

            return service(axiosOpt)
        },
        /**
         * Send HTTP POST to the remote server.
         *
         * @param {string} url               API url
         * @param {Object} data              The data to be sent
         * @param {IRequestConfig} [options] The configuration options
         * @returns {Promise} Promise instance
         */
        post: (url: string, data: Record<string, unknown>, options?: IRequestConfig) => {
            const axiosOpt = {
                ...options,
                ...{
                    method: 'post',
                    url: url,
                    data: data
                }
            };

            return service(axiosOpt)
        },
        /**
         * Send HTTP PUT to the remote server.
         *
         * @param {string} url               API url
         * @param {Object} data              The data to be sent
         * @param {IRequestConfig} [options] The configuration options
         * @returns {Promise} Promise instance
         */
        put: (url: string, data: Record<string, unknown>, options?: IRequestConfig) => {
            const axiosOpt = {
                ...options,
                ...{
                    method: 'put',
                    url: url,
                    data: data
                }
            };

            return service(axiosOpt)
        },
        /**
         * Send HTTP DELETE to the remote server.
         *
         * @param {string} url                API url
         * @param {Object} [data]             The data to be sent
         * @param {IRequestConfig} [options]  The configuration options
         * @returns {Promise} Promise instance
         */
        delete: (url: string, data?: object, options?: IRequestConfig) => {
            const axiosOpt = {
                ...options,
                ...{
                    method: 'delete',
                    url: url,
                    data: data
                }
            };

            return service(axiosOpt)
        }
    };

    return {service, http}
}

const AxiosPlugin = {
    install: (app: App, options?: AxiosRequestConfig): void => {
        const {service, http} = _axiosPlugin(options);
        app.config.globalProperties.$axios = service;
        app.config.globalProperties.$http = http;
    }
}

export default AxiosPlugin;
