import axios from "axios";

/**
 * AxiosPlugin to simplify using Axios within VueJs framework.
 *
 * @param {Vue} Vue         Vue instance
 * @param {Object} options  Configuration options
 * @returns {void}
 */
export default (Vue, options) => {
    const defaultOptions = {
        // request interceptor handler
        reqHandleFunc: config => config,
        reqErrorFunc: error => Promise.reject(error),
        // response interceptor handler
        resHandleFunc: response => response,
        resErrorFunc: error => Promise.reject(error)
    };

    /**
     * @type {AxiosRequestConfig|Object} initOptions
     */
    const initOptions = {
        ...defaultOptions,
        ...options
    };

    const service = axios.create(initOptions);

    // Add a request interceptor
    service.interceptors.request.use(
        config => initOptions.reqHandleFunc(config),
        error => initOptions.reqErrorFunc(error)
    );
    // Add a response interceptor
    service.interceptors.response.use(
        response => initOptions.resHandleFunc(response),
        error => initOptions.resErrorFunc(error)
    );

    Vue.prototype.$axios = service;
    Vue.prototype.$http  = {
        /**
         * Send HTTP GET to the remote server.
         *
         * @param {string} url       API url
         * @param {Object} [data]    The data to be send
         * @param {Object} [options] The configuration options
         * @returns {Promise} Promise instance
         */
        get: (url, data, options) => {
            let axiosOpt = {
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
         * @param {string} url       API url
         * @param {Object} data      The data to be send
         * @param {Object} [options] The configuration options
         * @returns {Promise} Promise instance
         */
        post: (url, data, options) => {
            let axiosOpt = {
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
         * @param {string} url       API url
         * @param {Object} data      The data to be send
         * @param {Object} [options] The configuration options
         * @returns {Promise} Promise instance
         */
        put: (url, data, options) => {
            let axiosOpt = {
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
         * @param {string} url      API url
         * @param {Object} data     The data to be send
         * @param {Object} options  The configuration options
         * @returns {Promise} Promise instance
         */
        delete: (url, data, options) => {
            let axiosOpt = {
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
