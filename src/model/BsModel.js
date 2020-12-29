import Vue from "vue";
import ProxyAdapter from "./ProxyAdapter";
import Helper from "../utils/Helper";
import { autobind } from "../utils/Autobind";

/**
 * Data Model for working with data and remote API.
 *
 * @example
 * let model1 = new BsModel({
 *     uid: null,
 *     username: null,
 *     displayName: null,
 *     email: null,
 *     phoneNumber: null,
 *     enabled: true,
 *     password: null
 * });
 *
 * let model2 = new BsModel({
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
 *         update: {url: './api/users', method: 'put'},
 *         delete: {url: './api/users', method: 'delete'},
 *         fetch: './api/users/{id}',
 *     },
 *     csrfConfig: {
 *         url: '/api/token/{name}',
 *         tokenName: 'token_name',
 *         dataField: 'value',
 *         suffix: false,
 *     },
 * });
 *
 * @author Ahmad Fajar
 * @since  09/07/2018 modified: 28/12/2020 19:30
 */
export default class BsModel {
    /**
     * @property {boolean} loading
     * The Model state, whether it is loading data or not. (readonly)
     */

    /**
     * @property {boolean} updating
     * The Model state, whether it is saving/updating data to the backend server or not. (readonly)
     */

    /**
     * @property {boolean} deleting
     * The Model state, whether it is deleting data or not. (readonly)
     */

    /**
     * @property {boolean} hasError
     * The Model state, whether there was an error when loading/saving/deleting data or not. (readonly)
     */

    /**
     * Action trigger after data was fetched from the remote server.
     *
     * @method onAfterFetch
     * @param {Object} data The response data
     * @returns {void}
     */

    /**
     * Class constructor.
     *
     * @param {Object} schema           The data model schema
     * @param {Object} [adapter]        Axios adapter instance
     * @param {string} [idProperty]     Data model ID field name
     * @param {string} [dataProperty]   REST response data property
     */
    constructor(schema, adapter, idProperty = 'id', dataProperty = 'data') {
        if (!Helper.isEmptyObject(schema.schema) && !Helper.isEmptyObject(schema.proxy)) {
            let _methods = {};
            this._restUrl = {};

            for (let [key, value] of Object.entries(schema.proxy)) {
                if (Helper.isObject(value)) {
                    _methods[key] = value.method;
                }
                this._restUrl[key] = Helper.isObject(value) ? value.url : value;
            }

            this._proxy  = new ProxyAdapter(adapter, _methods);
            this._schema = Object.seal(schema.schema);

            if (!Helper.isEmptyObject(schema.csrfConfig)) {
                this._csrfConfig = Object.freeze(schema.csrfConfig);
            }
        } else {
            this._proxy  = new ProxyAdapter(adapter);
            this._schema = Object.seal(schema);
        }

        Object.defineProperty(this, '_idProperty', {
            value: idProperty,
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(this, '_dataProperty', {
            value: dataProperty,
            writable: false,
            configurable: false,
            enumerable: false
        });

        autobind(this);
        this.reset();
        this.resetState();
    }

    /**
     * Get the class name of this instance.
     *
     * @type {string}
     */
    get $_class() {
        return (Object.getPrototypeOf(this)).constructor.name;
    }

    /**
     * Get proxy adapter that is used to work with remote service.
     *
     * @type {ProxyAdapter}
     */
    get proxy() {
        return this._proxy;
    }

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
     * @type {Object}
     */
    get csrfConfig() {
        return this._csrfConfig || {};
    }

    /**
     * Get/Override REST URL configuration in the form <code>{key: url}</code>, where the keys are:
     * <tt>'save', 'fetch', 'delete', 'update'</tt>.
     *
     * @example
     * return {
     *    'save'  : '/api/user/create',
     *    'fetch' : '/api/user/{id}',
     *    'update': '/api/user/{id}/save',
     *    'delete': '/api/user/{id}/delete'
     * }
     *
     * @type {Object}
     */
    get restUrl() {
        return this._restUrl || {};
    }

    /**
     * Assign new value to a field.
     *
     * @param {string} field The field name
     * @param {*} newVal     The new value
     * @returns {void}
     */
    assignValue(field, newVal) {
        if (field in this) {
            Vue.set(this, field, newVal);
        } else {
            console.error(`The given field does not exists in this ${this.$_class}.`);
        }
    }

    /**
     * Assign new value to some fields.
     *
     * @param {Object} newVal Object with format field-value pairs
     * @returns {void}
     */
    assignValues(newVal) {
        if (Helper.isObject(newVal)) {
            this.getFields().forEach(f => {
                Object.keys(newVal).forEach(k => {
                    if (f === k) {
                        Vue.set(this, f, newVal[k]);
                    }
                })
            })
        } else {
            console.error(`The given values can not be assigned to ${this.$_class}.`);
        }
    }

    /**
     * Perform delete record that already exists on the remote service via REST API.
     *
     * @returns {Promise<*>} Promise interface
     */
    delete() {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let config       = {};
        let url          = this.restUrl['delete'] || '';
        const methods    = this.proxy.requestMethods();
        const identifier = this[this.getIdProperty()];

        if (methods['delete'].toLowerCase() === 'delete') {
            config = {
                url: url.replace('{id}', identifier),
                method: methods['delete'],
                data: this.toJSON()
            };
        } else {
            this._updateRequestConfig(identifier, url, 'delete', config);
        }

        if (!Helper.isEmptyObject(this.csrfConfig) && !Helper.isEmpty(this.csrfConfig['url'])) {
            return this._requestWithToken(
                config, this._onDelete, this._onDeleteSuccess, this._onDeleteFailure, '-delete'
            );
        } else {
            return this.proxy.request(config, this._onDelete, this._onDeleteSuccess, this._onDeleteFailure);
        }
    }

    /**
     * Perform fetch or read record from remote service via REST API.
     *
     * @param {number|string} id The item ID
     *
     * @returns {Promise<*>} Promise interface
     */
    fetch(id = null) {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let config       = {};
        let url          = this.restUrl['fetch'] || '';
        const identifier = this[this.getIdProperty()] || id;

        this._updateRequestConfig(identifier, url, 'fetch', config);

        return this.proxy.request(config, this._checkOnLoading, this._onLoadingSuccess, this._onLoadingFailure);
    }

    /**
     * Destroy all metadata and fields in this data model.
     *
     * @returns {void}
     */
    destroy() {
        this.getFields().forEach(k => {
            this[k] = null;
            delete this[k]
        });

        this._schema = null;
        this._proxy  = null;
    }

    /**
     * Get all field names.
     *
     * @returns {string[]} Collection of field names
     */
    getFields() {
        return Object.keys(this._schema);
    }

    /**
     * Get ID field name for this data model.
     *
     * @returns {string} ID field name
     */
    getIdProperty() {
        return this._idProperty;
    }

    /**
     * Perform custom HTTP request to the remote service via REST API.
     *
     * @param {string} name               The key from restUrl property
     * @param {string} method             Any valid HTTP method, likes: `get`, `post`, `delete`, `put`, `patch`.
     *                                    The default is `get`.
     * @param {Object} params             Parameters to append when invoke rest request
     * @param {Object} data               Data to append when invoke rest request
     * @param {Function} successCallback  Callback to be called when the request is successful
     * @param {Function} errorCallback    Callback to be called when the request is failed
     *
     * @returns {Promise<*>} Promise interface
     */
    request(name, method = 'get', params = null,
            data = null, successCallback = null, errorCallback = null) {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let config     = {};
        let parameters = {};
        let url        = this.restUrl[name] || '';

        const identifier = !Helper.isEmptyObject(params) && params.hasOwnProperty(this.getIdProperty())
            ? params[this.getIdProperty()]
            : this[this.getIdProperty()];

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', identifier);
            if (!Helper.isEmptyObject(params) && params.hasOwnProperty(this.getIdProperty())) {
                delete params[this.getIdProperty()];
            }
        } else if (!Helper.isEmpty(identifier)) {
            parameters[this._idProperty] = identifier;
        }

        config['url']    = url;
        config['method'] = method.toLowerCase();

        if (!Helper.isEmptyObject(params) && !Helper.isEmptyObject(parameters)) {
            config['params'] = {...parameters, ...params};
        } else if (!Helper.isEmptyObject(params)) {
            config['params'] = params;
        }
        if (!Helper.isEmptyObject(data)) {
            config['data'] = data;
        }

        return this.proxy.request(
            config,
            (
                ['post', 'put', 'patch'].includes(config['method']) ? this._onSave : this._checkOnLoading
            ),
            (
                Helper.isFunction(successCallback)
                    ? successCallback
                    : (['post', 'put', 'patch'].includes(config['method']) ? this._onSaveSuccess : this._onLoadingSuccess)
            ),
            (
                Helper.isFunction(errorCallback)
                    ? errorCallback
                    : (['post', 'put', 'patch'].includes(config['method']) ? this._onSaveFailure : this._onLoadingFailure)
            )
        );
    }

    /**
     * Reset all fields value to its default.
     *
     * @returns {void}
     */
    reset() {
        this.getFields().forEach(k => Vue.set(this, k, this._schema[k]));
    }

    /**
     * Resets model state back to their initial states, ie. `loading`, etc.
     *
     * @returns {void}
     */
    resetState() {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'updating', false);
        Vue.set(this, 'deleting', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * Persist new record to the remote service via REST API.
     *
     * @returns {Promise<*>} Promise interface
     */
    save() {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let url          = this.restUrl['save'] || '';
        let data         = this.toJSON();
        const methods    = this.proxy.requestMethods();
        const identifier = data[this.getIdProperty()];

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            delete data[this.getIdProperty()];
        }

        const config = {
            url: url.replace('{id}', identifier),
            method: methods['save'],
            data: data
        };

        if (!Helper.isEmptyObject(this.csrfConfig) && !Helper.isEmpty(this.csrfConfig['url'])) {
            return this._requestWithToken(
                config, this._onSave, this._onSaveSuccess, this._onSaveFailure, '-create'
            );
        } else {
            return this.proxy.request(config, this._onSave, this._onSaveSuccess, this._onSaveFailure);
        }
    }

    /**
     * Update and persist record that already exists on the remote service via REST API.
     *
     * @returns {Promise<*>} Promise interface
     */
    update() {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let url          = this.restUrl['update'] || '';
        let data         = this.toJSON();
        const methods    = this.proxy.requestMethods();
        const identifier = data[this.getIdProperty()];

        if (url.includes('{id}') || Helper.isEmpty(identifier)) {
            delete data[this.getIdProperty()];
        }

        const config = {
            url: url.replace('{id}', identifier),
            method: methods['update'],
            data: data
        };

        if (!Helper.isEmptyObject(this.csrfConfig) && !Helper.isEmpty(this.csrfConfig['url'])) {
            return this._requestWithToken(
                config, this._onSave, this._onSaveSuccess, this._onSaveFailure, '-update'
            );
        } else {
            return this.proxy.request(config, this._onSave, this._onSaveSuccess, this._onSaveFailure);
        }
    }

    /**
     * Freeze this data model instance, makes it Readonly and prevents any modification.
     *
     * @returns {Readonly<BsModel>} Readonly data model
     */
    freeze() {
        return Object.freeze(this);
    }

    /**
     * Seal this data model instance, preventing new properties from being added to it
     * and marking all existing properties as non-configurable.
     * Values of present properties can still be changed as long as they are writable.
     *
     * @returns {BsModel} Sealed data model
     */
    seal() {
        return Object.seal(this);
    }

    /**
     * Convert field attributes into plain object.
     *
     * @returns {Object} Javascript plain object
     */
    toJSON() {
        let data = {};
        this.getFields().forEach(f => {
            data[f] = this[f];
        });

        return data;
    }

    /**
     * Assign data from the remote source to this model.
     *
     * @param {Object} response A response object
     * @returns {void}
     * @private
     */
    _assignFromResponse(response) {
        const _data = response.data;

        if (Helper.isEmpty(_data)) {
            console.warn('Server returns empty data.');
        } else {
            if (_data.hasOwnProperty(this.getIdProperty())) {
                this.assignValues(_data);
                this.getFields().forEach(f => this._schema[f] = _data[f]);

                if (Helper.isFunction(this['onAfterFetch'])) {
                    this['onAfterFetch'](_data);
                }
            } else if (_data.hasOwnProperty(this._dataProperty)) {
                const cdata = _data[this._dataProperty];

                if (Helper.isEmpty(cdata)) {
                    console.warn('Server returns empty data.');
                } else {
                    this.assignValues(cdata);
                    this.getFields().forEach(f => this._schema[f] = cdata[f]);

                    if (Helper.isFunction(this['onAfterFetch'])) {
                        this['onAfterFetch'](cdata);
                    }
                }
            } else {
                console.warn('Unable to parse data coming from server.');
            }
        }
    }

    /**
     * @returns {boolean} TRUE if this data model is in loading state
     * @private
     */
    _checkOnLoading() {
        Vue.set(this, 'loading', true);

        return true;
    }

    /**
     * @returns {boolean} TRUE if this data model is in delete state
     * @private
     */
    _onDelete() {
        if (this.deleting) {
            return false;
        }
        Vue.set(this, 'deleting', true);

        return true;
    }

    /**
     * A callback when delete request is failed.
     *
     * @param {Object} error The error object
     * @returns {void}
     * @private
     */
    _onDeleteFailure(error) {
        Vue.set(this, 'deleting', false);
        Vue.set(this, 'hasError', true);
        ProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when delete request is successful.
     *
     * @returns {void}
     * @private
     */
    _onDeleteSuccess() {
        this.reset();
        Vue.set(this, 'deleting', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * A callback when remote data is failed to load.
     *
     * @param {Object} error The error object
     * @returns {void}
     * @private
     */
    _onLoadingFailure(error) {
        Vue.set(this, 'loading', false);
        Vue.set(this, 'hasError', true);
        ProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when remote data is successfully loaded.
     *
     * @param {Response} response A response object
     * @returns {void}
     * @private
     */
    _onLoadingSuccess(response) {
        this._assignFromResponse(response);
        Vue.set(this, 'loading', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * @returns {boolean} TRUE if this data model is saving its data to the remote source
     * @private
     */
    _onSave() {
        if (this.updating) {
            return false;
        }
        Vue.set(this, 'updating', true);

        return true;
    }

    /**
     * A callback when saving data to the remote source is failed.
     *
     * @param {Object} error The error object
     * @returns {void}
     * @private
     */
    _onSaveFailure(error) {
        Vue.set(this, 'updating', false);
        Vue.set(this, 'hasError', true);
        ProxyAdapter.warnResponseError(error);
    }

    /**
     * A callback when data is successfully saved to the remote source.
     *
     * @param {Response} response A response object
     * @returns {void}
     * @private
     */
    _onSaveSuccess(response) {
        this._assignFromResponse(response);
        Vue.set(this, 'updating', false);
        Vue.set(this, 'hasError', false);
    }

    /**
     * Make http request and inject CSRF Token to the headers.
     *
     * @param {Object} config       Request configuration
     * @param {Function} onRequest  Callback function before the request is made
     * @param {Function} onSuccess  Callback function when the request was successful
     * @param {Function} onFailure  Callback when the request failed
     * @param {string} suffix       Suffix to be append to the token-name
     *
     * @returns {Promise<*>}         Promise interface
     * @private
     */
    async _requestWithToken(config, onRequest, onSuccess, onFailure, suffix = '') {
        let headers = {'X-Requested-With': 'XMLHttpRequest'};
        let csrfUrl = this.csrfConfig['url'] || '';

        if (csrfUrl.includes('{name}') && !Helper.isEmpty(this.csrfConfig['tokenName'])) {
            if (this.csrfConfig['suffix'] === true) {
                csrfUrl = csrfUrl.replace('{name}', this.csrfConfig['tokenName'] + suffix);
            } else {
                csrfUrl = csrfUrl.replace('{name}', this.csrfConfig['tokenName']);
            }
        }

        if (csrfUrl !== '') {
            const response          = await Vue.prototype.$http.get(csrfUrl);
            headers['X-CSRF-TOKEN'] = response.data[this.csrfConfig['dataField']] ||
                                      response.data[this.csrfConfig['responseField']];
            config['headers']       = headers;

            return this.proxy.request(config, onRequest, onSuccess, onFailure);
        } else {
            return this.proxy.request(config, onRequest, onSuccess, onFailure);
        }
    }

    /**
     * Update request configuration.
     *
     * @param {string} identifier The value to be included in the configuration
     * @param {string} url        API URL
     * @param {string} method     Request method: delete, fetch, save, update
     * @param {Object} config     Request configuration to be updated
     *
     * @returns {void}
     * @private
     */
    _updateRequestConfig(identifier, url, method, config) {
        const methods = this.proxy.requestMethods();

        if (url.includes('{id}') && !Helper.isEmpty(identifier)) {
            url = url.replace('{id}', identifier);
        } else if (!Helper.isEmpty(identifier)) {
            let params               = {};
            params[this._idProperty] = identifier;
            config['params']         = params;
        }

        config['url']    = url;
        config['method'] = methods[method];
    }

}
