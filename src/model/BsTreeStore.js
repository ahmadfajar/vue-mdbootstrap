import Vue from "vue";
import AbstractStore from "./AbstractStore";
import ProxyAdapter from "./ProxyAdapter";
import Helper from "../utils/Helper";

/**
 * Class to make tree dateset from remote server easier.
 *
 * @author Ahmad Fajar
 * @since  15/03/2019 modified: 24/05/2019 2:26
 */
export default class BsTreeStore extends AbstractStore {
    /**
     * @property {int} totalCount
     * Returns total number of root items in the Store's dataset (readonly).
     */


    /**
     * Class constructor.
     *
     * @param {Object} config The configuration properties
     */
    constructor(config = {}) {
        const cfg = {
            idProperty: 'id',
            dataProperty: 'data',
            totalProperty: 'total',
            childrenFieldmap: 'children',
            filterLogic: 'AND',
            restUrl: {
                'browse': '',
                'delete': '',
                'fetch': '',
                'save': '',
                'update': ''
            },
            ...config
        };

        super(cfg);
        this._proxy = new ProxyAdapter();
        Vue.set(this, 'totalCount', 0);
    }

    /**
     * Returns the data items in the Store's collection.
     *
     * @type {BsModel[]|Object[]}
     */
    get dataItems() {
        return this._items;
    }

    /**
     * Append an item to the Store's dataset.
     *
     * @param {Object} item Data to append to the Store
     * @return {void}
     */
    append(item) {
        if (!Helper.isEmpty(item)) {
            this._append(item);

            if (this.totalCount < this.length) {
                Vue.set(this, 'totalCount', this.length);
            }
        }
    }

    /**
     * Append collection of data to a Node as child nodes.
     *
     * @param {Object[]|Object} data       The data to add as children
     * @param {BsModel|Object} parentNode  The parent Node
     * @param {boolean} clearOnAppend      Remove any existing children before append
     * @return {void}
     */
    appendChild(data, parentNode, clearOnAppend = false) {
        const datas = Helper.isArray(data) ? data : Helper.isObject(data) ? [data] : [];

        if (!Helper.isArray(parentNode[this._config.childrenFieldmap]) || clearOnAppend) {
            parentNode[this._config.childrenFieldmap] = [];
        }

        datas.forEach(v => {
            if (this._isCandidateForModel(v)) {
                parentNode[this._config.childrenFieldmap].push(this._createModel(v));
            } else if (Helper.isObject(v)) {
                parentNode[this._config.childrenFieldmap].push(v);
            } else {
                console.error('Can not assign primitive type to the parent node.')
            }
        });
    }

    /**
     * Assign datas to the Store's dataset.
     *
     * @param {Object[]|Object} datas The data to be assigned
     * @param {boolean} silent Append item silently and doesn't trigger data conversion
     * @return {void}
     */
    assignData(datas, silent = false) {
        this._assignData(datas, silent);
        Vue.set(this, 'loading', false);
        Vue.set(this, 'totalCount', this.length);
    }

    /**
     * Load data from the remote server.
     *
     * @return {Promise<any>} Promise interface
     */
    load() {
        ProxyAdapter.checkRestUrl(this.restUrl);

        const methods = this.proxy.requestMethods();
        const params  = this.queryParams();
        let config    = {
            url: this.restUrl.browse || '',
            method: methods['browse']
        };

        if (!Helper.isEmpty(params)) {
            config['params'] = params;
        }
        this._selectedParent = null;

        return this.proxy.request(config, this._checkOnLoading, this._onQuerySuccess, this._onLoadingFailure);
    }

    /**
     * Fetch items children from the remote server.
     *
     * @param {BsModel|Object} item The parent item
     * @return {Promise<any>} Promise interface
     */
    loadChildren(item) {
        ProxyAdapter.checkRestUrl(this.restUrl);

        let config       = {};
        let url          = this.restUrl['fetch'] || '';
        const methods    = this.proxy.requestMethods();
        const identifier = this._config.idProperty;

        if (url.includes('{id}') && !Helper.isEmpty(identifier) && !Helper.isEmpty(item[identifier])) {
            url = url.replace('{id}', item[identifier]);
        } else if (!Helper.isEmpty(identifier) && !Helper.isEmpty(item[identifier])) {
            let params         = {};
            params[identifier] = item[identifier];
            config['params']   = params;
        } else {
            throw new Error('Parent item must have an ID!');
        }

        config['url']        = url;
        config['method']     = methods['fetch'];
        this._selectedParent = item;

        return this.proxy.request(config, this._checkOnLoading, this._onLoadChildSuccess, this._onLoadingFailure);
    }

    /**
     * Assign children from response's object.
     *
     * @param {Object} response Response object
     * @return {void}
     * @private
     */
    _assignChildrenFromResponse(response) {
        const responseData = response.data;

        if (Helper.isEmpty(responseData)) {
            console.warn('Server returns empty data.');
        } else {
            if (responseData.hasOwnProperty(this._config.dataProperty)) {
                this.appendChild(responseData[this._config.dataProperty], this._selectedParent, true);
            } else {
                console.warn('Unable to parse data coming from server.');
            }
        }
    }

    /**
     * Callbacks function on success loading items children from remote server.
     *
     * @param {Response} response Response object
     * @return {void}
     * @private
     */
    _onLoadChildSuccess(response) {
        this._assignChildrenFromResponse(response);
        this._onLoadingSuccess();
        this._selectedParent = null;
    }

}
