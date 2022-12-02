import axios from "axios";
import type {AxiosPromise, AxiosRequestConfig} from "axios";
import type {App, Plugin as Plugin_2} from "vue";

interface IRequestConfig extends AxiosRequestConfig {
    requestHandler: CallableFunction;
    requestErrorHandler: CallableFunction;
    responseHandler: CallableFunction;
    responseErrorHandler: CallableFunction;
}

interface IHttpService {
    /**
     * Send HTTP GET to the remote server.
     *
     * @param {string} url               API url
     * @param {Object} [data]            The data to be sent
     * @param {IRequestConfig} [options] The configuration options
     * @returns {AxiosPromise} Promise instance
     */
    get: (url: string, data?: object, options?: IRequestConfig) => AxiosPromise;
    /**
     * Send HTTP POST to the remote server.
     *
     * @param {string} url               API url
     * @param {Object} data              The data to be sent
     * @param {IRequestConfig} [options] The configuration options
     * @returns {AxiosPromise} Promise instance
     */
    post: (url: string, data: Record<string, unknown>, options?: IRequestConfig) => AxiosPromise;
    /**
     * Send HTTP PUT to the remote server.
     *
     * @param {string} url               API url
     * @param {Object} data              The data to be sent
     * @param {IRequestConfig} [options] The configuration options
     * @returns {AxiosPromise} Promise instance
     */
    put: (url: string, data: Record<string, unknown>, options?: IRequestConfig) => AxiosPromise;
    /**
     * Send HTTP DELETE to the remote server.
     *
     * @param {string} url                API url
     * @param {Object} [data]             The data to be sent
     * @param {IRequestConfig} [options]  The configuration options
     * @returns {AxiosPromise} Promise instance
     */
    delete: (url: string, data?: object, options?: IRequestConfig) => AxiosPromise;
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

    const http: IHttpService = {
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

const AxiosPlugin: Plugin_2 = {
    install: (app: App, options?: AxiosRequestConfig): void => {
        const {service, http} = _axiosPlugin(options);
        app.config.globalProperties.$axios = service;
        app.config.globalProperties.$http = http;
    }
}

export default AxiosPlugin;
