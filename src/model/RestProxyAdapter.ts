import { useAxiosPlugin } from '@/mixins/CommonApi.ts';
import { vueAppAxiosPluginError } from '@/model/Constants.ts';
import type { RestKey, RestMethodOptions } from '@/model/types';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import type { AppConfig } from 'vue';

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
    onFailure: (error: AxiosError) => void
  ): Promise<AxiosResponse>;

  /**
   * Get REST request methods options.
   */
  requestMethods(): RestMethodOptions;
}

/**
 * Class RestProxyAdapter which is used to load data from the remote server.
 *
 * @author Ahmad Fajar
 * @since  20/07/2018 modified: 30/04/2026 17:39
 */
export class RestProxyAdapter implements IRestAdapter {
  private readonly _adapter: AxiosInstance;
  private readonly _httpMethods: TRecord;

  /**
   * Check if axios plugin already installed and defined not.
   *
   * @param appConfig AppConfig or Axios adapter instance
   * @throws Error If axios doesn't exist
   */
  static checkAxios(appConfig: AppConfig | AxiosInstance) {
    if (!appConfig) {
      throw Error('Parameter "appConfig" must be an "AxiosInstance" or "Vue AppConfig".');
    }
    if (
      'globalProperties' in appConfig &&
      appConfig.globalProperties &&
      !appConfig.globalProperties.$http &&
      !appConfig.globalProperties.$axios
    ) {
      throw Error(vueAppAxiosPluginError);
    }
    if (
      'get' in appConfig &&
      !Helper.isFunction(appConfig['get']) &&
      'post' in appConfig &&
      !Helper.isFunction(appConfig['post'])
    ) {
      throw Error(
        'Axios is not defined. ' +
          'Please define it in the constructor before using RestProxyAdapter.'
      );
    }
  }

  /**
   * Check if Rest URL already defined or not.
   *
   * @param restUrl The Rest URL to check
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
   * @param error The axios error object.
   */
  static warnResponseError(error: AxiosError) {
    if (error.response) {
      console.warn('Request failed with status code: ', error.response.status);
    } else if (error.request) {
      console.warn(error.request);
    } else {
      console.warn(error.message ? error.message : error);
    }
  }

  /**
   * Default REST request method options. Do not override this property.
   *
   * @returns REST method options
   */
  static get defaultHttpMethods(): RestMethodOptions {
    return {
      browse: 'get',
      fetch: 'get',
      save: 'post',
      update: 'post',
      delete: 'delete',
    };
  }

  /**
   * Class constructor.
   *
   * @param adapter      Axios adapter instance
   * @param httpMethods  Custom HTTP methods to override the default methods
   */
  constructor(adapter?: AxiosInstance | null, httpMethods = {} as RestKey) {
    // Resolve and pick axios adapter from any available sources
    this._adapter = adapter ?? useAxiosPlugin() ?? axios;
    // Define custom http methods
    this._httpMethods = httpMethods;
  }

  get adapterInstance(): AxiosInstance {
    if (this._adapter) {
      return this._adapter;
    }

    throw Error(vueAppAxiosPluginError);
  }

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
  ): Promise<AxiosResponse> {
    RestProxyAdapter.checkAxios(this._adapter);

    return new Promise((resolve, reject) => {
      const check = !Helper.isEmpty(config) && !Helper.isEmpty(config.url);
      if (!check) {
        reject(new Error('Not enough information to send request to remote service.'));
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
          .catch((error: AxiosError) => {
            if (Helper.isFunction(onFailure)) {
              onFailure(error);
            }
            reject(error);
          });
      } else {
        const message = 'Client is busy handling previous request.';
        console.warn(message);
        reject(new Error(message));
      }
    });
  }

  /**
   * Get REST request methods options.
   *
   * @returns REST request method options
   */
  requestMethods(): RestMethodOptions & RestKey {
    return {
      ...RestProxyAdapter.defaultHttpMethods,
      ...this._httpMethods,
    };
  }
}
