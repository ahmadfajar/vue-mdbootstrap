import axios, {AxiosRequestConfig} from "axios";

interface IRequestConfig extends AxiosRequestConfig {
    requestHandler: CallableFunction,
    requestErrorHandler: CallableFunction,
    responseHandler: CallableFunction,
    responseErrorHandler: CallableFunction,
}

/**
 * AxiosPlugin to simplify using Axios within VueJs framework.
 *
 * @param {*} Vue                       Vue instance
 * @param {AxiosRequestConfig} options  Configuration options
 * @returns {void}
 */
export default (Vue, options: AxiosRequestConfig) => {
    const defaultOptions: IRequestConfig = {
        // request interceptor handler
        requestHandler: config => config,
        requestErrorHandler: error => Promise.reject(error),
        // response interceptor handler
        responseHandler: response => response,
        responseErrorHandler: error => Promise.reject(error)
    };

    /**
     * @type {IRequestConfig} initOptions
     */
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

    Vue.prototype.$axios = service;
    Vue.prototype.$http = {
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
        post: (url: string, data?: object, options?: IRequestConfig) => {
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
        put: (url: string, data?: object, options?: IRequestConfig) => {
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
         * @param {string} url              API url
         * @param {Object} data             The data to be sent
         * @param {IRequestConfig} options  The configuration options
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
    }
};
