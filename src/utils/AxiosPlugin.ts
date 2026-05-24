import type { TRecord } from '@/types';
import type {
  AxiosError,
  AxiosPromise,
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import type { App, ObjectPlugin } from 'vue';

declare interface IAxiosRequestConfig extends RawAxiosRequestConfig {
  requestHandler: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  requestErrorHandler: (error: AxiosError) => Promise<AxiosError>;
  responseHandler: (response: AxiosResponse) => AxiosResponse;
  responseErrorHandler: (error: AxiosError) => Promise<AxiosError>;
}

export declare interface IHttpService {
  /**
   * Send HTTP GET to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  get(url: string, data?: TRecord, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP PATCH to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  patch(url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP POST to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  post(url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP PUT to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  put(url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig): AxiosPromise;

  /**
   * Send HTTP DELETE to the remote server.
   *
   * @param url     API url
   * @param data    The data to be sent
   * @param options Additional options
   * @returns Promise instance
   */
  delete(url: string, data?: TRecord, options?: RawAxiosRequestConfig): AxiosPromise;
}

function _axiosPlugin(options?: RawAxiosRequestConfig) {
  const defaultOptions: IAxiosRequestConfig = {
    // request interceptor handler
    requestHandler: (config: InternalAxiosRequestConfig) => config,
    requestErrorHandler: (error: AxiosError) => Promise.reject(error),
    // response interceptor handler
    responseHandler: (response: AxiosResponse) => response,
    responseErrorHandler: (error: AxiosError) => Promise.reject(error),
  };

  const initOptions: IAxiosRequestConfig = {
    ...defaultOptions,
    ...options,
  };

  const service = axios.create(initOptions);

  if (options && Object.keys(options).length > 0) {
    const _keys = Object.keys(options);

    // Register interceptor if criteria matched.
    if (
      (_keys.includes('baseURL') && _keys.length > 1) ||
      (!_keys.includes('baseURL') && _keys.length > 0)
    ) {
      // Add a request interceptor
      service.interceptors.request.use(
        (config) => initOptions.requestHandler(config),
        (error: AxiosError) => initOptions.requestErrorHandler(error)
      );
      // Add a response interceptor
      service.interceptors.response.use(
        (response) => initOptions.responseHandler(response),
        (error: AxiosError) => initOptions.responseErrorHandler(error)
      );
    }
  }

  const http: IHttpService = {
    get: (url: string, data?: TRecord, options?: RawAxiosRequestConfig) => {
      const config = {
        ...options,
        params: data,
      };

      return service.get(url, config);
    },
    patch: (url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig) => {
      if (data instanceof FormData) {
        return service.patchForm(url, data, options);
      }

      return service.patch(url, data, options);
    },
    post: (url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig) => {
      if (data instanceof FormData) {
        return service.postForm(url, data, options);
      }

      return service.post(url, data, options);
    },
    put: (url: string, data: TRecord | FormData, options?: RawAxiosRequestConfig) => {
      if (data instanceof FormData) {
        return service.putForm(url, data, options);
      }

      return service.put(url, data, options);
    },
    delete: (url: string, data?: TRecord, options?: RawAxiosRequestConfig) => {
      const config = {
        ...options,
        data: data,
      };

      return service.delete(url, config);
    },
  };

  return { service, http };
}

export const AxiosPlugin: ObjectPlugin = {
  install: (app: App, options?: IAxiosRequestConfig): void => {
    const { service, http } = _axiosPlugin(options);
    app.config.globalProperties.$axios = service;
    app.config.globalProperties.$http = http;
  },
};
