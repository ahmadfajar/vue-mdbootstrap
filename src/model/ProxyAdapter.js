import Vue from "vue";
import Helper from "../utils/Helper";
// import AxiosPlugin from "../utils/AxiosPlugin";

// Vue.use(AxiosPlugin);

/**
 * Class ProxyAdapter which is used to load data from remote server.
 *
 * @author Ahmad Fajar
 * @since  20/07/2018 modified: 11/05/2020 1:25
 */
export default class ProxyAdapter {
    /**
     * Check if axios plugin already installed and defined not.
     *
     * @param {AxiosInstance|Function} [adapter] Axios adapter instance
     * @returns {void}
     * @throws Error If axios doesn't exists
     * @static
     */
    static checkAxios(adapter) {
        if (!Vue.prototype.$http && !Vue.prototype.$axios && !adapter) {
            if (!adapter) {
                throw Error("Axios is not defined. " +
                    "Please define it in the constructor before using ProxyAdapter.");
            } else {
                throw Error("Application doesn't have AxiosPlugin installed. " +
                    "Please define it some where in the application before using ProxyAdapter.");
            }
        }
    }

    /**
     * Check if Rest URL already defined or not.
     *
     * @param {Object} restUrl The Rest URL to check
     * @returns {void}
     * @throws URIError If Rest Url is not defined
     */
    static checkRestUrl(restUrl) {
        if (Helper.isEmptyObject(restUrl)) {
            throw new URIError('REST URL is not defined yet.');
        }
    }

    /**
     * Log error response to console.
     *
     * @param {Object} error Error object
     * @returns {void}
     * @static
     */
    static warnResponseError(error) {
        if (error.response) {
            console.warn('Request failed with status code: ', error.response.status);
        } else if (error.request) {
            console.warn(error.request);
        } else {
            console.warn((error && error.message ? error.message : error));
        }
    }

    /**
     * Default Http request method configurations. Do not override this property.
     *
     * @returns {{browse: string, fetch: string, save: string, update: string, delete: string}} Http methods
     * @static
     */
    static get defaultHttpMethods() {
        return {
            'browse': 'get',
            'fetch': 'get',
            'save': 'post',
            'update': 'post',
            'delete': 'delete'
        }
    }

    /**
     * Class constructor.
     *
     * @param {AxiosInstance|Function} [adapter] Axios adapter instance
     * @param {Object} [httpMethods]             Custom HTTP methods to override the default methods
     */
    constructor(adapter, httpMethods = {}) {
        this._adapter = adapter;
        this._httpMethods = httpMethods;
    }

    get adapterInstance() {
        if (this._adapter) {
            return this._adapter;
        }
        if (Vue.prototype.$axios) {
            return Vue.prototype.$axios;
        } else {
            throw Error("Application doesn't have AxiosPlugin installed. " +
                "Please define it some where in the application before using ProxyAdapter.");
        }
    }

    /**
     * Perform REST request to the server.
     *
     * @param {Object} config       Request configuration
     * @param {Function} onRequest  Called before the request is made.
     * @param {Function} onSuccess  Called when the request was successful.
     * @param {Function} onFailure  Called when the request failed.
     * @returns {Promise<*>}         Promise
     */
    request(config, onRequest, onSuccess, onFailure) {
        ProxyAdapter.checkAxios(this._adapter);

        return new Promise((resolve, reject) => {
            let check = !Helper.isEmpty(config) && config.url && config.url !== '';

            if (!check) {
                return;
            }

            if (Helper.isFunction(onRequest) && onRequest()) {
                this.adapterInstance(config)
                    .then((response) => {
                        if (Helper.isFunction(onSuccess)) {
                            onSuccess(response);
                        }
                        return resolve(response);
                    })
                    .catch((error) => {
                        if (Helper.isFunction(onFailure)) {
                            onFailure(error);
                        }
                        return reject(error);
                    });
            }
        });
    }

    /**
     * Get Http request methods.
     *
     * @returns {Object} Http request methods
     */
    requestMethods() {
        return {
            ...ProxyAdapter.defaultHttpMethods,
            ...this._httpMethods
        }
    }

}
